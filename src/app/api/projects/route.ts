import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { saveProject, deleteProject } from '@/lib/projects'

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  if (!data.slug) return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 })
  await saveProject(data.slug, data.frontmatter || {}, data.content || '')
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 })
  await deleteProject(slug)
  return NextResponse.json({ ok: true })
}
