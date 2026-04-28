import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { saveProject, deleteProject } from '@/lib/projects'

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  
  try {
    const data = await req.json()
    if (!data.slug) return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 })
    await saveProject(data.slug, data.frontmatter || {}, data.content || '')
    return NextResponse.json({ ok: true })
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e)
    console.error('POST /api/projects error:', errorMsg)
    console.error('POST /api/projects error full:', e)
    return NextResponse.json({ error: 'Proje kaydedilirken hata oluştu: ' + errorMsg }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    if (!slug) return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 })
    await deleteProject(slug)
    return NextResponse.json({ ok: true })
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e)
    console.error('DELETE /api/projects error:', errorMsg)
    console.error('DELETE /api/projects error full:', e)
    return NextResponse.json({ error: 'Proje silinirken hata oluştu: ' + errorMsg }, { status: 500 })
  }
}
