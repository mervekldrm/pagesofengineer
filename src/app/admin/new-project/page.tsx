import { isAuthenticated } from '../../../lib/auth'
import { redirect } from 'next/navigation'
import ProjectEditor from '../../../components/admin/ProjectEditor'

export const metadata = { title: 'Yeni Proje — Admin' }

export default function NewProjectPage() {
  if (!isAuthenticated()) redirect('/admin/login')
  return <ProjectEditor />
}
