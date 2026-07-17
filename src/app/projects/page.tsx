import styles from './page.module.css'
import Link from 'next/link'
import { TOPIC_PALETTE, inferTopicKey, topicLabelFromKey, type TopicKey } from '../../lib/shared'
import FilterToolbar from '../../components/FilterToolbar'

export const metadata = { title: 'Projeler — Pages of Engineer' }
export const revalidate = 60 // ISR - revalidate every 60 seconds

import { getAllProjects } from '../../lib/projects'

type ProjectsPageProps = {
  searchParams?: {
    topic?: string
    category?: string
  }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const projects = await getAllProjects()

  const requestedTopic = (searchParams?.topic || '').toLowerCase()
  const selectedTopic = TOPIC_PALETTE.some(topic => topic.key === requestedTopic)
    ? (requestedTopic as TopicKey)
    : undefined
  const selectedCategory = (searchParams?.category || '').trim()

  const filteredProjects = projects.filter((project) => {
    if (selectedTopic) return inferTopicKey(project.category) === selectedTopic
    if (selectedCategory) return project.category === selectedCategory
    return true
  })
  const activeFilterLabel = selectedTopic ? topicLabelFromKey(selectedTopic) : selectedCategory

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
              label: 'Kategoriler',
              items: TOPIC_PALETTE.map((topic) => ({
                label: topic.label,
                href: `/projects?topic=${topic.key}`,
                active: selectedTopic === topic.key,
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
