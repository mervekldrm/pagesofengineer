import Link from 'next/link'
import { TOPIC_PALETTE, type PostMeta, type ProjectMeta } from '../lib/shared'
import { getAllPosts } from '../lib/posts'
import { getAllProjects } from '../lib/projects'
import styles from './page.module.css'

export const revalidate = 60 // ISR - revalidate every 60 seconds

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 3)
  const projects = (await getAllProjects()).slice(0, 3)

  const paletteSwatches = TOPIC_PALETTE.map(topic => ({
    label: topic.label,
    color: topic.color,
    href: `/explore?topic=${topic.key}`,
  }))

  const categoryLinks = [
    { label: 'Yazılar', href: '/blog', color: 'var(--accent-bg)', description: 'Son notlar ve fikirler' },
    ...TOPIC_PALETTE.map((topic) => ({
      label: topic.label,
      href: `/explore?topic=${topic.key}`,
      color: topic.color,
      description: 'Yazi + proje seckisi',
    })),
    { label: 'Projeler', href: '/projects', color: 'var(--mint-soft)', description: 'Ürettiklerim' },
    { label: 'Hakkımda', href: '/about', color: 'var(--peach-soft)', description: 'Kimim, ne yapıyorum' },
    { label: 'İletişim', href: '/contact', color: 'var(--coral-soft)', description: 'Bir mesaj bırak' },
    { label: 'Keşfet', href: '/explore', color: 'var(--sun-soft)', description: 'Karışık keşif alanı' },
  ]

  const heroSignals = [
    {
      title: 'Bugün',
      value: posts[0]?.title ?? 'Yeni fikirler',
      emoji: '✦',
      href: '/blog',
    },
    {
      title: 'Yakın proje',
      value: projects[0]?.title ?? 'Bir şeyler inşa ediliyor',
      emoji: '◌',
      href: '/projects',
    },
    {
      title: 'Ritim',
      value: `${posts.length + projects.length} canlı parça`,
      emoji: '✶',
      href: '/explore',
    },
  ]

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroDesk}>
            <div className={styles.heroPoster}>
              <div className={styles.posterStacks}>
                <span className={styles.posterStackOne} />
                <span className={styles.posterStackTwo} />
                <span className={styles.posterStackThree} />
              </div>
              <div className={styles.posterPalette}>
                {paletteSwatches.map((swatch, index) => (
                  <Link
                    key={swatch.label}
                    href={swatch.href}
                    className={styles.posterSwatchLink}
                    title={`${swatch.label} seçimini aç`}
                    aria-label={`${swatch.label} seçimine git`}
                  >
                    <span className={styles.posterSwatch} style={{ background: swatch.color, animationDelay: `${index * 0.08}s` }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroCenter}>
          <div className={styles.heroCard}>
            <div className={styles.heroRibbon} />
            <h1 className={styles.heroTitle}>Mühendislik<br />Defterim</h1>
            <p className={styles.heroTagline}>Kodla yaz, kalemle çiz, kelimelerle anlat.</p>
            <div className={styles.heroMiniLine}>
              {paletteSwatches.map((swatch) => (
                <Link
                  key={swatch.label}
                  href={swatch.href}
                  className={styles.heroMiniSwatchLink}
                  title={`${swatch.label} seçimini aç`}
                  aria-label={`${swatch.label} seçimine git`}
                >
                  <span className={styles.heroMiniSwatch} style={{ background: swatch.color }} />
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.heroBio}>
            <div className={styles.bioAvatar}>M</div>
            <div>
              <p className={styles.bioName}>Merhaba, ben Merve.</p>
              <p className={styles.bioText}>
                Merak ettiklerimi, hobilerimi, ürettiklerimi ve öğrendiklerimi burada paylaşıyorum.
                Burası benim dijital defterim, mühendislik yolculuğumun izlerini taşıyan bir alan.
              </p>
              <Link href="/about" className={styles.bioLink}>Hakkımda daha fazla →</Link>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroAvatar}>
            <div className={styles.avatarCircle}>
              <span style={{ fontSize: '64px' }}>👩‍💻</span>
            </div>
          </div>
          <div className={styles.heroInfo}>
            <span className={styles.infoTag}>🌱 Bu Site Neden Var?</span>
            <p>
              Burası projelerimi, düşüncelerimi ve ilhamlarımı bir araya getirdiğim kişisel alanım.
              Eğer burada bir fikirle, yazıyla ya da projeyle bağ kurarsan — ne mutlu bana.
            </p>
            <Link href="/explore" className="btn btn-primary">Ne var? — Daha fazlası için göz at</Link>
          </div>
          <div className={styles.heroSignals}>
            {heroSignals.map((signal) => (
              <Link key={signal.title} href={signal.href} className={styles.signalCard} aria-label={`${signal.title} bölümüne git`}>
                <span className={styles.signalEmoji}>{signal.emoji}</span>
                <div>
                  <p className={styles.signalTitle}>{signal.title}</p>
                  <p className={styles.signalValue}>{signal.value}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT POSTS */}
      {posts.length > 0 && (
        <section className={styles.recentSection}>
          <div className={styles.sectionHeader}>
            <h2>Son Yazılar ✍️</h2>
            <Link href="/blog" className="btn btn-outline">Tümünü gör</Link>
          </div>
          <div className={styles.postsGrid}>
            {posts.map((post: PostMeta, i: number) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.postEmoji}>{post.coverEmoji}</div>
                <span className="tag-pill">{post.category}</span>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <div className={styles.postMeta}>
                  <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>{post.readTime} dk okuma</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* RECENT PROJECTS */}
      {projects.length > 0 && (
        <section className={styles.recentSection}>
          <div className={styles.sectionHeader}>
            <h2>Son Projeler 🚀</h2>
            <Link href="/projects" className="btn btn-outline">Tümünü gör</Link>
          </div>
          <div className={styles.postsGrid}>
            {projects.map((proj: ProjectMeta, i: number) => (
              <Link key={proj.slug} href={`/projects/${proj.slug}`} className={styles.postCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.postEmoji}>{proj.coverEmoji}</div>
                <span className="tag-pill">{proj.category}</span>
                <h3 className={styles.postTitle}>{proj.title}</h3>
                <p className={styles.postExcerpt}>{proj.excerpt}</p>
                <div className={styles.postMeta}>
                  <span>{proj.status}</span>
                  <span>·</span>
                  <span>{new Date(proj.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* QUICK ABOUT */}
      <section className={styles.quickAbout}>
        <div className={styles.aboutCard}>
          <h2>Keşfedeceklerim 🔭</h2>
          <div className={styles.interests}>
            {categoryLinks.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.interestChip}
                style={{ background: item.color }}
                aria-label={`${item.label} sayfasına git`}
              >
                <span className={styles.interestTitle}>{item.label}</span>
                <span className={styles.interestDescription}>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
