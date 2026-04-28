import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { ProjectMeta } from './shared'
import { getSupabaseAdminClient } from './supabase'

const projectsDir = path.join(process.cwd(), 'content/projects')

type ProjectRecord = ProjectMeta & {
  content: string
  readTime: number
}

function toRecord(row: any): ProjectRecord {
  return {
    slug: row.slug,
    title: row.title || 'Başlıksız',
    date: row.date || new Date().toISOString(),
    excerpt: row.excerpt || '',
    category: row.category || 'Genel',
    tags: Array.isArray(row.tags) ? row.tags : row.tags || [],
    coverEmoji: row.coverEmoji || '📦',
    published: row.published !== false,
    readTime: row.readTime || 1,
    status: row.status || 'Bilgi yok',
    link: row.link || '',
    color: row.color || 'transparent',
    content: row.content || '',
  }
}

async function ensureLocalDir() {
  await fs.mkdir(projectsDir, { recursive: true })
}

async function readLocalRecords(): Promise<ProjectRecord[]> {
  await ensureLocalDir()
  const files = (await fs.readdir(projectsDir)).filter(file => file.endsWith('.md'))
  const records = await Promise.all(
    files.map(async file => {
      const raw = await fs.readFile(path.join(projectsDir, file), 'utf-8')
      const { data, content } = matter(raw)
      const wordCount = content.split(/\s+/).filter(Boolean).length
      return {
        slug: file.replace('.md', ''),
        title: data.title || 'Başlıksız',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        category: data.category || 'Genel',
        tags: data.tags || [],
        coverEmoji: data.coverEmoji || '📦',
        published: data.published !== false,
        readTime: Math.max(1, Math.ceil(wordCount / 200)),
        status: data.status || 'Bilgi yok',
        link: data.link || '',
        color: data.color || 'transparent',
        content,
      } as ProjectRecord
    })
  )

  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

async function writeLocalRecord(slug: string, frontmatter: Partial<ProjectMeta>, content: string) {
  await ensureLocalDir()
  const fm = matter.stringify(content, {
    title: frontmatter.title,
    date: frontmatter.date || new Date().toISOString(),
    excerpt: frontmatter.excerpt || '',
    category: frontmatter.category || 'Genel',
    tags: frontmatter.tags || [],
    coverEmoji: frontmatter.coverEmoji || '📦',
    published: frontmatter.published !== false,
    status: frontmatter.status || 'Bilgi yok',
    link: frontmatter.link || '',
    color: frontmatter.color || 'transparent',
  })
  await fs.writeFile(path.join(projectsDir, `${slug}.md`), fm, 'utf-8')
}

async function deleteLocalRecord(slug: string) {
  await ensureLocalDir()
  const filePath = path.join(projectsDir, `${slug}.md`)
  try {
    await fs.unlink(filePath)
  } catch {
    // ignore missing files
  }
}

async function seedDatabaseFromLocalIfNeeded() {
  const client = getSupabaseAdminClient()
  if (!client) return

  const { count, error } = await client.from('projects').select('slug', { count: 'exact', head: true })
  if (error) throw error
  if ((count ?? 0) > 0) return

  const localRecords = await readLocalRecords()
  if (localRecords.length === 0) return

  const { error: insertError } = await client.from('projects').upsert(
    localRecords.map(record => ({
      slug: record.slug,
      title: record.title,
      date: record.date,
      excerpt: record.excerpt,
      category: record.category,
      tags: record.tags,
      coverEmoji: record.coverEmoji,
      published: record.published,
      readTime: record.readTime,
      status: record.status,
      link: record.link,
      color: record.color,
      content: record.content,
    })),
    { onConflict: 'slug' }
  )

  if (insertError) throw insertError
}

export async function getAllProjects(publishedOnly = true): Promise<ProjectMeta[]> {
  const client = getSupabaseAdminClient()
  if (client) {
    try {
      await seedDatabaseFromLocalIfNeeded()
      const { data, error } = await client.from('projects').select('*').order('date', { ascending: false })
      if (error) throw error
      const records = (data ?? []).map(toRecord)
      return publishedOnly ? records.filter(project => project.published) : records
    } catch (err) {
      console.warn('Supabase query failed for projects, falling back to local markdown:', err)
      // Fall through to local fallback
    }
  }

  const records = await readLocalRecords()
  return publishedOnly ? records.filter(project => project.published) : records
}

export async function getProject(slug: string): Promise<ProjectRecord | null> {
  const client = getSupabaseAdminClient()
  if (client) {
    try {
      await seedDatabaseFromLocalIfNeeded()
      const { data, error } = await client.from('projects').select('*').eq('slug', slug).maybeSingle()
      if (error) throw error
      return data ? toRecord(data) : null
    } catch (err) {
      console.warn(`Supabase query failed for project ${slug}, falling back to local markdown:`, err)
      // Fall through to local fallback
    }
  }

  const records = await readLocalRecords()
  return records.find(project => project.slug === slug) || null
}

export async function saveProject(slug: string, frontmatter: any, content: string) {
  const client = getSupabaseAdminClient()
  const record = {
    slug,
    title: frontmatter.title || 'Başlıksız',
    date: frontmatter.date || new Date().toISOString(),
    excerpt: frontmatter.excerpt || '',
    category: frontmatter.category || 'Genel',
    tags: frontmatter.tags || [],
    coverEmoji: frontmatter.coverEmoji || '📦',
    published: frontmatter.published !== false,
    readTime: Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)),
    status: frontmatter.status || 'Bilgi yok',
    link: frontmatter.link || '',
    color: frontmatter.color || 'transparent',
    content,
  }

  if (client) {
    const { error } = await client.from('projects').upsert(record, { onConflict: 'slug' })
    if (error) throw error
    return
  }

  await writeLocalRecord(slug, frontmatter, content)
}

export async function deleteProject(slug: string) {
  const client = getSupabaseAdminClient()
  if (client) {
    const { error } = await client.from('projects').delete().eq('slug', slug)
    if (error) throw error
    return
  }

  await deleteLocalRecord(slug)
}
