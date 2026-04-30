import { getPost, getAllPosts } from '../../../lib/posts'
import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from './page.module.css'
import { resolveCoverImageUrl, type PostMeta } from '../../../lib/shared'

export const revalidate = 60 // ISR - revalidate every 60 seconds

export async function generateStaticParams() {
  return (await getAllPosts()).map((p: PostMeta) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return {}
  return { title: `${post.title} — Pages of Engineer`, description: post.excerpt }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post || !post.published) notFound()

  const html = marked(post.content) as string
  const coverImageUrl = resolveCoverImageUrl(post.coverImageUrl)

  return (
    <article className={styles.article}>
      <div className="container-narrow">
        <Link href="/blog" className={styles.back}>← Blog&apos;a dön</Link>

        <header className={styles.header}>
          {coverImageUrl ? (
            <div className={styles.imageContainer}>
              <img src={coverImageUrl} alt={post.title} className={styles.coverImage} />
            </div>
          ) : (
            <div className={styles.emoji}>{post.coverEmoji}</div>
          )}
          <div className={styles.tags}>
            <span className="tag-pill">{post.category}</span>
            {post.tags.map((t: string) => (
              <span key={t} className={styles.tagSecondary}>{t}</span>
            ))}
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          <div className={styles.meta}>
            <span>📅 {new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>·</span>
            <span>⏱️ {post.readTime} dk okuma</span>
          </div>
        </header>

        <div className={`${styles.content} prose`} dangerouslySetInnerHTML={{ __html: html }} />

        <footer className={styles.footer}>
          <p>Bu yazıyı beğendin mi? <Link href="/contact">Bana yaz</Link> ya da <Link href="/blog">diğer yazılara</Link> göz at.</p>
        </footer>
      </div>
    </article>
  )
}
