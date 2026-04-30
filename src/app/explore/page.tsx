import Link from 'next/link'
import styles from './page.module.css'
import { getAllPosts } from '../../lib/posts'
import { getAllProjects } from '../../lib/projects'
import type { PostMeta, ProjectMeta } from '../../lib/shared'

export const revalidate = 60

const decor = [
  { emoji: '✦', className: 'sparkOne' },
  { emoji: '◌', className: 'sparkTwo' },
  { emoji: '✺', className: 'sparkThree' },
  { emoji: '⟡', className: 'sparkFour' },
]

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
      <div className={styles.decor} aria-hidden="true">
        {decor.map((item, index) => (
          <span key={item.className} className={`${styles.spark} ${styles[item.className as keyof typeof styles]}`} style={{ animationDelay: `${index * 0.45}s` }}>
            {item.emoji}
          </span>
        ))}
      </div>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1>Burada Neler Var?</h1>
          </div>
          <div className={styles.headerActions}>
            <Link href="/blog" className="btn btn-outline">Yazılara git</Link>
            <Link href="/projects" className="btn btn-ghost">Projeler</Link>
          </div>
        </div>

        <div className={styles.grid}>
          {items.map((it: any, i: number) => (
            <div
              key={`${it.__type}-${it.slug}`}
              className={styles.cardShell}
              style={{
                animationDelay: `${i * 0.05}s`,
                ['--card-tilt' as any]: `${i % 2 === 0 ? -1 : 1}deg`,
                ['--card-float' as any]: `${i % 3 === 0 ? 10 : 14}px`,
              }}
            >
              <Link
                href={it.__type === 'post' ? `/blog/${it.slug}` : `/projects/${it.slug}`}
                className={`${styles.card} ${it.__type === 'post' ? styles.post : styles.project}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardGlow} aria-hidden="true" />
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
