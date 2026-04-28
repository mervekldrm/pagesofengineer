import { isAuthenticated } from '../../../lib/auth'
import { getProject } from '../../../lib/projects'
import { redirect, notFound } from 'next/navigation'
import ProjectEditor from '../../../components/admin/ProjectEditor'

export const metadata = { title: 'Projeyi Düzenle — Admin' }
export const dynamic = 'force-dynamic'

interface EditPageProps { searchParams: { slug?: string } }

export default async function EditProjectPage({ searchParams }: EditPageProps) {
  if (!isAuthenticated()) redirect('/admin/login')
  const { slug } = searchParams
  if (!slug) redirect('/admin')
  const project = await getProject(slug)
  if (!project) notFound()
  return <ProjectEditor initialProject={project} isEdit />
}
