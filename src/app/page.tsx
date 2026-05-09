import Link from 'next/link'
import type { PostMeta, ProjectMeta } from '../lib/shared'
import { getAllPosts } from '../lib/posts'
import { getAllProjects } from '../lib/projects'
import styles from './page.module.css'

export const revalidate = 60 // ISR - revalidate every 60 seconds

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 3)
  const projects = (await getAllProjects()).slice(0, 3)

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroDesk}>
            <div className={styles.deskItems}>
              <span className={styles.deskItem} style={{ animationDelay: '0s' }}>☕</span>
              <span className={styles.deskItem} style={{ animationDelay: '0.4s' }}>📓</span>
              <span className={styles.deskItem} style={{ animationDelay: '0.8s' }}>💻</span>
              <span className={styles.deskItem} style={{ animationDelay: '1.2s' }}>🔬</span>
              <span className={styles.deskItem} style={{ animationDelay: '1.6s' }}>✏️</span>
            </div>
          </div>
        </div>

        <div className={styles.heroCenter}>
          <div className={styles.heroCard}>
            <h1 className={styles.heroTitle}>Mühendislik<br />Defterim</h1>
            <p className={styles.heroTagline}>Kodla yaz, kalemle çiz, kelimelerle anlat.</p>
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
          <h2>Neler ilgimi çekiyor? 🔭</h2>
          <div className={styles.interests}>
            {[
              { icon: '☕', label: 'Kahve & Kod', color: 'var(--mint-soft)' },
              { icon: '🛠️', label: 'Kurcaladıklarım', color: 'var(--lilac-soft)' },
              { icon: '🧠', label: 'Notlar & Fikirler', color: 'var(--pink-soft)' },
              { icon: '📖', label: 'Okuduklarım', color: 'var(--accent-bg)' },
              { icon: '🎧', label: 'Müzik', color: 'var(--peach-soft)' },
              { icon: '🌫️', label: 'Düşünceler', color: 'var(--cream2)' },
            ].map(item => (
              <div key={item.label} className={styles.interestChip} style={{ background: item.color }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <Link href="/explore" className="btn btn-ghost">Ne var? — Daha fazlası için göz at</Link>
        </div>
      </section>
    </div>
  )
}
