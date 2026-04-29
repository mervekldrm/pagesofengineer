import Link from 'next/link'
import styles from '../page.module.css'
import { getAllPosts } from '../../lib/posts'
import { getAllProjects } from '../../lib/projects'
import type { PostMeta, ProjectMeta } from '../../lib/shared'

export const revalidate = 60

export default async function ExplorePage() {
  const posts = await getAllPosts()
  const projects = await getAllProjects()

  const items: Array<PostMeta & { __type: 'post' } | ProjectMeta & { __type: 'project' }> = [
    ...posts.map(p => ({ ...p, __type: 'post' } as any)),
    ...projects.map(p => ({ ...p, __type: 'project' } as any)),
  ]

  items.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1>Ne Var? — Yazılar & Projeler</h1>
            <p className={styles.sub}>Hem yayınladığım yazılar hem de projeler burada, tarihe göre sıralı.</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/blog" className="btn btn-outline">Yazılara git</Link>
            <Link href="/projects" className="btn btn-ghost">Projeler</Link>
          </div>
        </div>

        <div className={styles.grid}>
          {items.map((it: any, i: number) => (
            <div key={`${it.__type}-${it.slug}`} style={{ animationDelay: `${i * 0.05}s` }}>
              <Link href={it.__type === 'post' ? `/blog/${it.slug}` : `/projects/${it.slug}`} className={styles.card}>
                <div className={styles.cardTop} style={{ background: it.color || 'transparent' }}>
                  <span className={styles.cardEmoji}>{it.coverEmoji}</span>
                  <span className={styles.cardType}>{it.__type === 'post' ? 'Yazı' : 'Proje'}</span>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{it.title}</h2>
                  <p className={styles.cardDesc}>{it.excerpt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
