import { isAuthenticated } from '../../../lib/auth'
import { redirect } from 'next/navigation'
import PostEditor from '../../../components/admin/PostEditor'

export const metadata = { title: 'Yeni Yazı — Admin' }

export default function NewPostPage() {
  if (!isAuthenticated()) redirect('/admin/login')

  return <PostEditor />
}
