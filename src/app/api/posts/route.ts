import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { savePost, deletePost, getAllPosts } from '@/lib/posts'

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

  try {
    const body = await req.json()
    const { slug, content, ...frontmatter } = body
    if (!slug) return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 })
    await savePost(slug, frontmatter, content || '')
    return NextResponse.json({ ok: true, slug })
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 })

  await deletePost(slug)
  return NextResponse.json({ ok: true })
}
