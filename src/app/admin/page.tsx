import { isAuthenticated } from '../../lib/auth'
import { getAllPosts } from '../../lib/posts'
import { getAllProjects } from '../../lib/projects'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'
import DeleteProjectButton from '../../components/admin/DeleteProjectButton'
import DeletePostButton from '../../components/admin/DeletePostButton'

export const metadata = { title: 'Admin — Pages of Engineer' }
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!isAuthenticated()) redirect('/admin/login')

  const posts = await getAllPosts(false)
  const projects = await getAllProjects(false)

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1>Admin Paneli 🛠️</h1>
            <p className={styles.sub}>Blog yazılarını yönet, yeni içerik ekle.</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/admin/new" className="btn btn-primary">+ Yeni Yazı</Link>
            <form action="/api/auth" method="POST">
              <input type="hidden" name="_action" value="logout" />
              <button type="submit" className="btn btn-ghost">Çıkış</button>
            </form>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{posts.length}</span>
            <span className={styles.statLabel}>Toplam yazı</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{posts.filter(p => p.published).length}</span>
            <span className={styles.statLabel}>Yayında</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{posts.filter(p => !p.published).length}</span>
            <span className={styles.statLabel}>Taslak</span>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Yazı</span>
            <span>Kategori</span>
            <span>Tarih</span>
            <span>Durum</span>
            <span>İşlemler</span>
          </div>
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p>Henüz yazı yok. <Link href="/admin/new">İlk yazını oluştur →</Link></p>
            </div>
          ) : posts.map(post => (
            <div key={post.slug} className={styles.tableRow}>
              <div className={styles.postInfo}>
                <span className={styles.postEmoji}>{post.coverEmoji}</span>
                <span className={styles.postTitle}>{post.title}</span>
              </div>
              <span className="tag-pill">{post.category}</span>
              <span className={styles.date}>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              <span className={post.published ? styles.published : styles.draft}>
                {post.published ? '✅ Yayında' : '📝 Taslak'}
              </span>
              <div className={styles.actions}>
                <Link href={`/admin/edit?slug=${post.slug}`} className="btn btn-ghost" style={{ padding: '0.3rem 0.8rem', fontSize: '13px' }}>Düzenle</Link>
                <Link href={`/blog/${post.slug}`} className="btn btn-ghost" style={{ padding: '0.3rem 0.8rem', fontSize: '13px' }} target="_blank">Gör</Link>
                <DeletePostButton slug={post.slug} />
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.header} style={{ marginTop: '2.5rem' }}>
          <div>
            <h2>Projeler</h2>
            <p className={styles.sub}>Projeleri yönet, yeni proje ekle.</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/admin/new-project" className="btn btn-primary">+ Yeni Proje</Link>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Proje</span>
            <span>Kategori</span>
            <span>Tarih</span>
            <span>Durum</span>
            <span>İşlemler</span>
          </div>
          {projects.length === 0 ? (
            <div className={styles.empty}>
              <p>Henüz proje yok. <Link href="/admin/new-project">İlk projeyi ekle →</Link></p>
            </div>
          ) : projects.map(proj => (
            <div key={proj.slug} className={styles.tableRow}>
              <div className={styles.postInfo}>
                <span className={styles.postEmoji}>{proj.coverEmoji}</span>
                <span className={styles.postTitle}>{proj.title}</span>
              </div>
              <span className="tag-pill">{proj.category}</span>
              <span className={styles.date}>{new Date(proj.date).toLocaleDateString('tr-TR')}</span>
              <span className={proj.status === 'Tamamlandı' ? styles.published : styles.draft}>
                {proj.status}
              </span>
              <div className={styles.actions}>
                <Link href={`/admin/edit-project?slug=${proj.slug}`} className="btn btn-ghost" style={{ padding: '0.3rem 0.8rem', fontSize: '13px' }}>Düzenle</Link>
                <a href={proj.link} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '0.3rem 0.8rem', fontSize: '13px' }}>Gör</a>
                <span style={{ marginLeft: '6px' }}><DeleteProjectButton slug={proj.slug} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
