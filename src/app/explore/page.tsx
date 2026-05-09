import Link from 'next/link'
import styles from './page.module.css'
import { getAllPosts } from '../../lib/posts'
import { getAllProjects } from '../../lib/projects'
import { TOPIC_PALETTE, inferTopicKey, topicLabelFromKey, type PostMeta, type ProjectMeta, type TopicKey } from '../../lib/shared'

export const revalidate = 60

const decor = [
  { emoji: '✦', className: 'sparkOne' },
  { emoji: '◌', className: 'sparkTwo' },
  { emoji: '✺', className: 'sparkThree' },
  { emoji: '⟡', className: 'sparkFour' },
]

function slugifyCategory(input: string) {
  return input
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

type ExploreItem = {
  __type: 'post' | 'project' | 'theme'
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
    topic?: string
    category?: string
  }
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const posts = await getAllPosts()
  const projects = await getAllProjects()

  const topicSet = new Set(TOPIC_PALETTE.map(topic => topic.key))
  const requestedTopic = (searchParams?.topic || '').toLowerCase()
  const selectedTopic: TopicKey | undefined = topicSet.has(requestedTopic as TopicKey)
    ? (requestedTopic as TopicKey)
    : undefined
  const selectedCategory = (searchParams?.category || '').trim()

  const filteredPosts = posts.filter((post) => {
    if (selectedTopic) return inferTopicKey(post.category) === selectedTopic
    if (selectedCategory) return post.category === selectedCategory
    return true
  })

  const filteredProjects = projects.filter((project) => {
    if (selectedTopic) return inferTopicKey(project.category) === selectedTopic
    if (selectedCategory) return project.category === selectedCategory
    return true
  })

  const postsByCategory = new Map<string, PostMeta[]>()
  for (const post of filteredPosts) {
    const key = (post.category || 'Genel').trim()
    const list = postsByCategory.get(key) || []
    list.push(post)
    postsByCategory.set(key, list)
  }

  const themeItems: ExploreItem[] = Array.from(postsByCategory.entries())
    .map(([category, list]) => {
      const latest = list[0]
      return {
        __type: 'theme' as const,
        slug: `theme-${slugifyCategory(category)}`,
        title: `${category} Dosyası`,
        excerpt: `${list.length} yazı içerir. ${latest?.title ? `Son eklenen: ${latest.title}` : ''}`.trim(),
        date: latest?.date || new Date().toISOString(),
        coverEmoji: '🧭',
        href: `/blog?category=${encodeURIComponent(category)}`,
        typeLabel: 'Tema',
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

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
    ...themeItems,
  ]

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
            {(selectedTopic || selectedCategory) && (
              <div className={styles.activeFilterRow}>
                <span className={styles.activeFilterLabel}>Seçili:</span>
                <span className="tag-pill">{selectedTopic ? topicLabelFromKey(selectedTopic) : selectedCategory}</span>
                <Link href="/explore" className={styles.clearFilterLink}>Temizle</Link>
              </div>
            )}
          </div>
          <div className={styles.headerActions}>
            <Link href="/blog" className="btn btn-outline">Yazılara git</Link>
            <Link href="/projects" className="btn btn-ghost">Projeler</Link>
          </div>
        </div>

        <div className={styles.topicRail}>
          {TOPIC_PALETTE.map((topic) => (
            <Link
              key={topic.key}
              href={`/explore?topic=${topic.key}`}
              className={`${styles.topicChip} ${selectedTopic === topic.key ? styles.topicChipActive : ''}`}
              style={{ ['--topic-color' as any]: topic.color }}
            >
              {topic.label}
            </Link>
          ))}
        </div>

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
                ['--card-tilt' as any]: `${i % 2 === 0 ? -1 : 1}deg`,
                ['--card-float' as any]: `${i % 3 === 0 ? 10 : 14}px`,
              }}
            >
              <Link
                href={it.href}
                className={`${styles.card} ${it.__type === 'post' ? styles.post : it.__type === 'project' ? styles.project : styles.theme}`}
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
