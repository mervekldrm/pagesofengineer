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

function pickAccentTone(slug: string) {
  const tones = ['post-tone-indigo', 'post-tone-mint', 'post-tone-coral', 'post-tone-mango']
  const score = slug.split('').reduce((value, char) => value + char.charCodeAt(0), 0)
  return tones[score % tones.length]
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post || !post.published) notFound()

  const html = marked(post.content) as string
  const coverImageUrl = resolveCoverImageUrl(post.coverImageUrl)
  const toneClass = pickAccentTone(post.slug)

  return (
    <article className={`${styles.article} ${toneClass}`}>
      <div className={styles.layout}>
        <aside className={styles.sideRail} aria-hidden="true">
          <div className={`${styles.railCard} ${styles.railGlow} ${styles.railCardCloud}`} />
          <div className={`${styles.railCard} ${styles.railCardMint}`}>
            <div className={styles.railCardInner}>
              <div className={styles.railHeader}>
                <span className={styles.railLabel}>Yazı tonu</span>
                <span className={styles.railPill}>{post.category}</span>
              </div>
              <p className={styles.railNote}>
                {post.excerpt || 'Bu yazı, yumuşak bir ritimde okunacak şekilde tasarlandı.'}
              </p>
            </div>
          </div>
        </aside>

        <div className={styles.mainColumn}>
          <Link href="/blog" className={styles.back}>← Blog&apos;a dön</Link>

          <header className={styles.header}>
            {coverImageUrl ? (
              <div className={styles.imageContainer}>
                <img src={coverImageUrl} alt={post.title} referrerPolicy="no-referrer" className={styles.coverImage} />
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

        <aside className={styles.sideRail} aria-hidden="true">
          <div className={`${styles.railCard} ${styles.railCardCoral}`}>
            <div className={styles.railCardInner}>
              <div className={styles.railHeader}>
                <span className={styles.railLabel}>Hızlı bakış</span>
                <span className={styles.railPill}>{post.readTime} dk</span>
              </div>
              <div className={styles.railStats}>
                <div className={styles.railStat}>
                  <span className={styles.railStatValue}>{post.tags.length}</span>
                  <span className={styles.railStatLabel}>Etiket</span>
                </div>
                <div className={styles.railStat}>
                  <span className={styles.railStatValue}>{post.category}</span>
                  <span className={styles.railStatLabel}>Kategori</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.railCard}>
            <div className={styles.railCardInner}>
              <div className={styles.railHeader}>
                <span className={styles.railLabel}>Renk notları</span>
                <span className={styles.railPill}>Soft</span>
              </div>
              <div className={styles.railTags}>
                {post.tags.slice(0, 4).map((tag: string) => (
                  <span key={tag} className={styles.railMiniTag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
