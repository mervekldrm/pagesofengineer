import Link from 'next/link'
import FilterToolbar from '../../components/FilterToolbar'
import styles from './page.module.css'
import { getAllPosts } from '../../lib/posts'
import { getAllProjects } from '../../lib/projects'

export const revalidate = 60

type ExploreItem = {
  __type: 'post' | 'project'
  slug: string
  title: string
  excerpt: string
  date: string
  coverEmoji: string
  href: string
  typeLabel: string
}

type ExplorePageProps = {
  searchParams?: {
    tag?: string
  }
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const posts = await getAllPosts()
  const projects = await getAllProjects()

  const selectedTag = (searchParams?.tag || '').trim()
  const allTags = Array.from(new Set([...posts, ...projects].flatMap(item => item.tags || []))).filter(Boolean).sort()

  const filteredPosts = posts.filter((post) => {
    return !selectedTag || post.tags.includes(selectedTag)
  })

  const filteredProjects = projects.filter((project) => {
    return !selectedTag || project.tags.includes(selectedTag)
  })

  const activeFilterLabel = selectedTag

  const items: ExploreItem[] = [
    ...filteredPosts.map((p) => ({
      __type: 'post' as const,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      coverEmoji: p.coverEmoji || '📝',
      href: `/blog/${p.slug}`,
      typeLabel: 'Yazı',
    })),
    ...filteredProjects.map((p) => ({
      __type: 'project' as const,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      coverEmoji: p.coverEmoji || '📦',
      href: `/projects/${p.slug}`,
      typeLabel: 'Proje',
    })),
  ]

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1>Keşfet</h1>
          <div className={styles.headerActions}>
            <Link href="/blog" className="btn btn-outline">Yazılara git</Link>
            <Link href="/projects" className="btn btn-ghost">Projeler</Link>
          </div>
        </div>

        <FilterToolbar
          activeLabel={activeFilterLabel}
          clearHref="/explore"
          sections={[
            {
              label: 'Etiketler',
              items: allTags.map((tag) => ({
                label: tag,
                href: `/explore?tag=${encodeURIComponent(tag)}`,
                active: selectedTag === tag,
              })),
            },
          ]}
        />

        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Bu filtreye uygun yazı veya proje bulunamadı.</p>
            <Link href="/explore" className="btn btn-outline">Tümünü göster</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((it, i: number) => (
            <div
              key={`${it.__type}-${it.slug}`}
              className={styles.cardShell}
              style={{
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <Link
                href={it.href}
                className={`${styles.card} ${it.__type === 'post' ? styles.post : styles.project}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardGlow} aria-hidden="true" />
                  <span className={styles.cardEmoji}>{it.coverEmoji}</span>
                  <span className={styles.cardType}>{it.typeLabel}</span>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{it.title}</h2>
                  <p className={styles.cardDesc}>{it.excerpt}</p>
                </div>
              </Link>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
