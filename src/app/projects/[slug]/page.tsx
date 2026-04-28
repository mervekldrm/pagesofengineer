import { getProject, getAllProjects } from '../../../lib/projects'
import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from './page.module.css'
import type { PostMeta } from '../../../lib/shared'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return (await getAllProjects()).map((p: PostMeta) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  if (!project) return {}
  return { title: `${project.title} — Projects — Pages of Engineer`, description: project.excerpt }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  if (!project || !project.published) notFound()

  const html = marked(project.content || '') as string

  return (
    <article className={styles.article}>
      <div className="container-narrow">
        <Link href="/projects" className={styles.back}>← Projelere dön</Link>

        <header className={styles.header}>
          <div className={styles.emoji}>{project.coverEmoji}</div>
          <div className={styles.tags}>
            <span className="tag-pill">{project.category}</span>
            {(project.tags || []).map((t: string) => (
              <span key={t} className={styles.tagSecondary}>{t}</span>
            ))}
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          {project.excerpt && <p className={styles.excerpt}>{project.excerpt}</p>}
          <div className={styles.meta}>
            <span>📅 {new Date(project.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>·</span>
            <span>Durum: {project.status}</span>
          </div>
        </header>

        <div className={`${styles.content} prose`} dangerouslySetInnerHTML={{ __html: html }} />

        <footer className={styles.footer}>
          <p>Projeyi GitHub'da görmek isterseniz <a href={project.link} target="_blank" rel="noreferrer">buraya</a> tıklayın.</p>
        </footer>
      </div>
    </article>
  )
}
