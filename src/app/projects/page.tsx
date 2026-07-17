import styles from './page.module.css'
import Link from 'next/link'
import FilterToolbar from '../../components/FilterToolbar'

export const metadata = { title: 'Projeler — Pages of Engineer' }
export const revalidate = 60 // ISR - revalidate every 60 seconds

import { getAllProjects } from '../../lib/projects'

type ProjectsPageProps = {
  searchParams?: {
    tag?: string
  }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const projects = await getAllProjects()

  const selectedTag = (searchParams?.tag || '').trim()
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags || []))).filter(Boolean).sort()

  const filteredProjects = projects.filter((project) => {
    return !selectedTag || project.tags.includes(selectedTag)
  })
  const activeFilterLabel = selectedTag

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1>Projeler 🚀</h1>
          <p className={styles.subtitle}>Ellerin değdiği, zihnin şekillendirdiği şeyler.</p>
        </div>

        <FilterToolbar
          activeLabel={activeFilterLabel}
          clearHref="/projects"
          sections={[
            {
              label: 'Etiketler',
              items: allTags.map((tag) => ({
                label: tag,
                href: `/projects?tag=${encodeURIComponent(tag)}`,
                active: selectedTag === tag,
              })),
            },
          ]}
        />

        <div className={styles.grid}>
          {filteredProjects.map((p, i) => (
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

        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p>Bu filtrede proje bulunamadı.</p>
            <Link href="/projects" className="btn btn-outline">Tümünü göster</Link>
          </div>
        )}
      </div>
    </div>
  )
}
