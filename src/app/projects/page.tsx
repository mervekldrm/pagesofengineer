import styles from './page.module.css'
import Link from 'next/link'

export const metadata = { title: 'Projeler — Pages of Engineer' }

import { getAllProjects } from '../../lib/projects'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1>Projeler 🚀</h1>
          <p className={styles.subtitle}>Ellerin değdiği, zihnin şekillendirdiği şeyler.</p>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={p.slug} style={{ animationDelay: `${i * 0.1}s` }}>
              <Link href={`/projects/${p.slug}`} className={styles.card}>
                <div className={styles.cardTop} style={{ background: p.color }}>
                  <span className={styles.cardEmoji}>{p.coverEmoji}</span>
                  <span className={p.status === 'Tamamlandı' ? styles.statusDone : styles.statusWip}>
                    {p.status === 'Tamamlandı' ? '✅' : '🔄'} {p.status}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                  <p className={styles.cardDesc}>{p.excerpt}</p>
                  <div className={styles.tags}>
                    {p.tags.map((t: string) => <span key={t} className="tag-pill">{t}</span>)}
                  </div>
                </div>
              </Link>
              <div className={styles.cardFooter}>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '13px' }}>
                  GitHub&apos;da gör →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
