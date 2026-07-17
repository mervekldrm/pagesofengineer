import Link from 'next/link'
import { marked } from 'marked'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '../../../lib/posts'
import { isNotebookEntry, resolveCoverImageUrl, type PostMeta } from '../../../lib/shared'
import styles from './page.module.css'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.filter((post) => isNotebookEntry(post)).map((post: PostMeta) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post || !isNotebookEntry(post)) return {}
  return { title: `${post.title} - Notebook - Pages of Engineer`, description: post.excerpt }
}

export default async function NotebookDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post || !post.published || !isNotebookEntry(post)) notFound()

  const html = marked(post.content || '') as string
  const coverImageUrl = resolveCoverImageUrl(post.coverImageUrl)

  return (
    <article className={styles.page}>
      <div className="container-narrow">
        <Link href="/notebook" className={styles.back}>← Notebook'e don</Link>

        <header className={styles.header}>
          {coverImageUrl ? (
            <div className={styles.coverWrap}>
              <img src={coverImageUrl} alt={post.title} className={styles.cover} referrerPolicy="no-referrer" />
            </div>
          ) : (
            <div className={styles.emoji}>{post.coverEmoji || '🗒️'}</div>
          )}
          {post.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
          <h1>{post.title}</h1>
          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          <div className={styles.meta}>
            <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>·</span>
            <span>{post.readTime || 1} dk</span>
          </div>
        </header>

        <div className={`${styles.content} prose`} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  )
}
