import Link from 'next/link'
import { isNotebookEntry, type PostMeta, type ProjectMeta } from '../lib/shared'
import { getAllPosts } from '../lib/posts'
import { getAllProjects } from '../lib/projects'
import styles from './page.module.css'

export const revalidate = 60 // ISR - revalidate every 60 seconds

export default async function Home() {
  const posts = (await getAllPosts()).filter(post => !isNotebookEntry(post)).slice(0, 3)
  const projects = (await getAllProjects()).slice(0, 3)

  const paletteSwatches = [
    { label: 'Yazılar', color: 'var(--accent-bg)', href: '/blog' },
    { label: 'Projeler', color: 'var(--mint-soft)', href: '/projects' },
    { label: 'Notebook', color: 'var(--cloud-pale)', href: '/notebook' },
    { label: 'Keşfet', color: 'var(--sun-soft)', href: '/explore' },
  ]
  const legacyTopics: Array<{ label: string; key: string; color: string }> = []

  const focusAreas = [
    { label: 'Yazılar', href: '/blog', color: 'var(--accent-bg)', description: 'Son notlar ve fikirler' },
    ...legacyTopics.map((topic) => ({
      label: topic.label,
      href: '/explore',
      color: topic.color,
      description: 'Yazi + proje seckisi',
    })),
    { label: 'Projeler', href: '/projects', color: 'var(--mint-soft)', description: 'Ürettiklerim' },
    { label: 'Keşfet', href: '/explore', color: 'var(--sun-soft)', description: 'Karışık keşif alanı' },
  ]

  const heroHighlights = [
    {
      title: 'En Son',
      value: posts[0]?.title ?? 'Henüz yayınlanan yazı yok',
    },
    {
      title: 'Yakın proje',
      value: projects[0]?.title ?? 'Bir şeyler inşa ediliyor',
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
            <div className={styles.infoHighlights}>
              {heroHighlights.map((item) => (
                <div key={item.title} className={styles.highlightItem}>
                  <span className={styles.highlightTitle}>{item.title}</span>
                  <span className={styles.highlightValue}>{item.value}</span>
                </div>
              ))}
            </div>
            <Link href="/explore" className="btn btn-primary">Ne var? — Daha fazlası için göz at</Link>
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
                {post.tags.slice(0, 3).map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
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
                {proj.tags.slice(0, 3).map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
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
          <div className={styles.aboutHeader}>
            <h2>Odak Alanlarım 🔭</h2>
            <p>Site içinde tekrar etmeden en değerli bölümlere doğrudan ulaş.</p>
          </div>
          <div className={styles.focusGrid}>
            {focusAreas.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.focusCard}
                style={{ background: item.color }}
                aria-label={`${item.label} sayfasına git`}
              >
                <span className={styles.focusTitle}>{item.label}</span>
                <span className={styles.focusDescription}>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
