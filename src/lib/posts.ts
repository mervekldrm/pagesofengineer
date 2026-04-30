import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { PostMeta, Post } from './shared'
import { getSupabaseAdminClient } from './supabase'

const postsDir = path.join(process.cwd(), 'content/posts')

type PostRecord = Post & {
  readTime: number
}

function toRecord(row: any): PostRecord {
  return {
    slug: row.slug,
    title: row.title || 'Başlıksız',
    date: row.date || new Date().toISOString(),
    excerpt: row.excerpt || '',
    category: row.category || 'Genel',
    tags: Array.isArray(row.tags) ? row.tags : row.tags || [],
    coverEmoji: row.coveremoji || row.coverEmoji || '📝',
    coverImageUrl: row.cover_image_url || row.coverImageUrl,
    published: row.published === true || row.published === 'true',
    readTime: row.readtime || row.readTime || 1,
    content: row.content || '',
  }
}

function toMeta(record: PostRecord): PostMeta {
  const { content: _content, ...meta } = record
  return meta
}

async function ensureLocalDir() {
  await fs.mkdir(postsDir, { recursive: true })
}

async function readLocalRecords(): Promise<PostRecord[]> {
  await ensureLocalDir()
  const files = (await fs.readdir(postsDir)).filter(file => file.endsWith('.md'))
  const records = await Promise.all(
    files.map(async file => {
      const raw = await fs.readFile(path.join(postsDir, file), 'utf-8')
      const { data, content } = matter(raw)
      const wordCount = content.split(/\s+/).filter(Boolean).length
      return {
        slug: file.replace('.md', ''),
        title: data.title || 'Başlıksız',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        category: data.category || 'Genel',
        tags: data.tags || [],
        coverEmoji: data.coverEmoji || '📝',
        coverImageUrl: data.coverImageUrl,
        published: data.published !== false,
        readTime: Math.max(1, Math.ceil(wordCount / 200)),
        content,
      } as PostRecord
    })
  )

  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

async function writeLocalRecord(slug: string, frontmatter: Partial<PostMeta>, content: string) {
  await ensureLocalDir()
  const fm = matter.stringify(content, {
    title: frontmatter.title,
    date: frontmatter.date || new Date().toISOString(),
    excerpt: frontmatter.excerpt || '',
    category: frontmatter.category || 'Genel',
    tags: frontmatter.tags || [],
    ...(frontmatter.coverImageUrl && { coverImageUrl: frontmatter.coverImageUrl }),
    coverEmoji: frontmatter.coverEmoji || '📝',
    published: frontmatter.published !== false,
  })
  await fs.writeFile(path.join(postsDir, `${slug}.md`), fm, 'utf-8')
}

async function deleteLocalRecord(slug: string) {
  await ensureLocalDir()
  const filePath = path.join(postsDir, `${slug}.md`)
  try {
    await fs.unlink(filePath)
  } catch {
    // ignore missing files
  }
}

async function seedDatabaseFromLocalIfNeeded() {
  const client = getSupabaseAdminClient()
  if (!client) return

  // Skip seeding in production - RLS policies prevent it, data should already exist
  if (process.env.NODE_ENV === 'production') return

  try {
    const { count, error } = await client.from('posts').select('slug', { count: 'exact', head: true })
    if (error) throw error
    if ((count ?? 0) > 0) return

    const localRecords = await readLocalRecords()
    if (localRecords.length === 0) return

    const { error: insertError } = await client.from('posts').upsert(
      localRecords.map(record => ({
        slug: record.slug,
        title: record.title,
        date: record.date,
        excerpt: record.excerpt,
        category: record.category,
        tags: record.tags,
        coveremoji: record.coverEmoji,
        published: record.published,
        readtime: record.readTime,
        content: record.content,
      })),
      { onConflict: 'slug' }
    )

    if (insertError) throw insertError
  } catch (err) {
    console.warn('Failed to seed Supabase database:', err)
    // Silently fail - we'll use local markdown fallback
  }
}

export async function getAllPosts(publishedOnly = true): Promise<PostMeta[]> {
  const client = getSupabaseAdminClient()
  if (client) {
    try {
      await seedDatabaseFromLocalIfNeeded()
      const { data, error } = await client.from('posts').select('*').order('date', { ascending: false })
      if (error) throw error
      const records = (data ?? []).map(toRecord)
      const filtered = publishedOnly ? records.filter(post => post.published) : records
      return filtered.map(toMeta)
    } catch (err) {
      console.warn('Supabase query failed, falling back to local markdown:', err)
      // Fall through to local fallback
    }
  }

  const records = await readLocalRecords()
  const filtered = publishedOnly ? records.filter(post => post.published) : records
  return filtered.map(toMeta)
}

export async function getPost(slug: string): Promise<Post | null> {
  const client = getSupabaseAdminClient()
  if (client) {
    try {
      await seedDatabaseFromLocalIfNeeded()
      const { data, error } = await client.from('posts').select('*').eq('slug', slug).maybeSingle()
      if (error) throw error
      return data ? toRecord(data) : null
    } catch (err) {
      console.warn(`Supabase query failed for post ${slug}, falling back to local markdown:`, err)
      // Fall through to local fallback
    }
  }

  const records = await readLocalRecords()
  return records.find(post => post.slug === slug) || null
}

export async function savePost(slug: string, frontmatter: Partial<PostMeta>, content: string) {
  const client = getSupabaseAdminClient()
  const record = {
    slug,
    title: frontmatter.title || 'Başlıksız',
    date: frontmatter.date || new Date().toISOString(),
    excerpt: frontmatter.excerpt || '',
    category: frontmatter.category || 'Genel',
    tags: frontmatter.tags || [],
    cover_image_url: frontmatter.coverImageUrl,
    coveremoji: frontmatter.coverEmoji || '📝',
    published: frontmatter.published !== false,
    readtime: Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)),
    content,
  }

  if (client) {
    const { error } = await client.from('posts').upsert(record, { onConflict: 'slug' })
    if (error) throw error
    return
  }

  // On production (Vercel), local fallback fails. Require Supabase.
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.')
  }

  await writeLocalRecord(slug, frontmatter, content)
}

export async function deletePost(slug: string) {
  const client = getSupabaseAdminClient()
  if (client) {
    const { error } = await client.from('posts').delete().eq('slug', slug)
    if (error) throw error
    return
  }

  // On production (Vercel), local fallback fails. Require Supabase.
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.')
  }

  await deleteLocalRecord(slug)
}

// slugify moved to src/lib/shared.ts
