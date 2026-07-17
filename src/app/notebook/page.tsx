import Link from 'next/link'
import { getAllPosts } from '../../lib/posts'
import { isNotebookEntry, type PostMeta } from '../../lib/shared'
import styles from './page.module.css'

export const metadata = {
  title: 'Notebook - Pages of Engineer',
  description: 'Kisa notlar, ogrendiklerim ve okuma notlarim.',
}

export const revalidate = 60

export default async function NotebookPage() {
  const notebookPosts = (await getAllPosts())
    .filter((post) => isNotebookEntry(post))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className={styles.page}>
      <div className="container-narrow">
        <header className={styles.header}>
          <h1>Notebook</h1>
          <p>Kisa notlar, ogrendiklerim ve okuduklarimdan cikan satirlar.</p>
        </header>

        {notebookPosts.length === 0 ? (
          <div className={styles.empty}>
            <p>Henuz notebook notu yok. </p>
          </div>
        ) : (
          <div className={styles.list}>
            {notebookPosts.map((post: PostMeta) => (
              <Link key={post.slug} href={`/notebook/${post.slug}`} className={styles.noteCard}>
                <div className={styles.noteTop}>
                  <span className={styles.noteEmoji}>{post.coverEmoji || '🗒️'}</span>
                  {post.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt || 'Notu okumak icin tikla.'}</p>
                <div className={styles.meta}>
                  <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>{post.readTime || 1} dk</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
