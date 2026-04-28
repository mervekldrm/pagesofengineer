import { isAuthenticated } from '../../../lib/auth'
import { getPost } from '../../../lib/posts'
import { redirect, notFound } from 'next/navigation'
import PostEditor from '../../../components/admin/PostEditor'

export const metadata = { title: 'Yazıyı Düzenle — Admin' }
export const dynamic = 'force-dynamic'

interface EditPageProps {
  searchParams: { slug?: string }
}

export default async function EditPostPage({ searchParams }: EditPageProps) {
  if (!isAuthenticated()) redirect('/admin/login')

  const { slug } = searchParams
  if (!slug) redirect('/admin')

  const post = await getPost(slug)
  if (!post) notFound()

  return <PostEditor initialPost={post} isEdit />
}
