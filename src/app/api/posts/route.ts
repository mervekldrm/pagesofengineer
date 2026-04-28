import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { savePost, deletePost, getAllPosts } from '@/lib/posts'

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e)
    console.error('GET /api/posts error:', errorMsg)
    console.error('GET /api/posts error full:', e)
    return NextResponse.json({ error: 'Yazılar alınırken hata oluştu: ' + errorMsg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    console.warn('POST /api/posts: Unauthorized access attempt')
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { slug, content, ...frontmatter } = body
    console.log('POST /api/posts with slug:', slug)
    
    if (!slug) {
      console.warn('POST /api/posts: No slug provided')
      return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 })
    }
    
    await savePost(slug, frontmatter, content || '')
    console.log('POST /api/posts: Successfully saved slug:', slug)
    return NextResponse.json({ ok: true, slug })
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e)
    console.error('POST /api/posts error:', errorMsg)
    console.error('POST /api/posts error full:', e)
    return NextResponse.json({ error: 'Yazı kaydedilirken hata oluştu: ' + errorMsg }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) {
    console.warn('DELETE /api/posts: Unauthorized access attempt')
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    console.log('DELETE /api/posts with slug:', slug)
    
    if (!slug) {
      console.warn('DELETE /api/posts: No slug provided')
      return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 })
    }

    await deletePost(slug)
    console.log('DELETE /api/posts: Successfully deleted slug:', slug)
    return NextResponse.json({ ok: true })
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e)
    console.error('DELETE /api/posts error:', errorMsg)
    console.error('DELETE /api/posts error full:', e)
    return NextResponse.json({ error: 'Yazı silinirken hata oluştu: ' + errorMsg }, { status: 500 })
  }
}
