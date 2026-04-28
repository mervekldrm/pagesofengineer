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
    console.error('Save project error:', e)
    return NextResponse.json({ error: 'Proje kaydedilirken hata oluştu' }, { status: 500 })
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
    console.error('Delete project error:', e)
    return NextResponse.json({ error: 'Proje silinirken hata oluştu' }, { status: 500 })
  }
}
