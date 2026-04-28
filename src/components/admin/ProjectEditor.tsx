 'use client'
 import { useState } from 'react'
 import { useRouter } from 'next/navigation'
 import { slugify } from '../../lib/shared'
 import styles from './PostEditor.module.css'

interface Props {
  initialProject?: any
  isEdit?: boolean
}

const CATEGORIES = [
  { name: 'Şiir', emoji: '✨' },
  { name: 'Doğa', emoji: '🌿' },
  { name: 'Gezi', emoji: '✈️' },
  { name: 'Biyoinformatik', emoji: '🧬' },
  { name: 'Cloud', emoji: '☁️' },
  { name: 'Software Testing', emoji: '🧪' },
  { name: 'Yapay Zeka', emoji: '🤖' },
  { name: 'Yazılım', emoji: '💻' },
  { name: 'Hobiler', emoji: '🎯' },
  { name: 'Düşünceler', emoji: '💡' },
  { name: 'Genel', emoji: '📝' },
]

export default function ProjectEditor({ initialProject, isEdit }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initialProject?.title || '')
  const [slug, setSlug] = useState(initialProject?.slug || '')
  const [excerpt, setExcerpt] = useState(initialProject?.excerpt || '')
  const [content, setContent] = useState(initialProject?.content || '')
  const [category, setCategory] = useState(initialProject?.category || 'Genel')
  const [tags, setTags] = useState((initialProject?.tags || []).join(', '))
  const [emoji, setEmoji] = useState(initialProject?.coverEmoji || '📦')
  const [status, setStatus] = useState(initialProject?.status || 'Bilgi yok')
  const [link, setLink] = useState(initialProject?.link || '')
  const [color, setColor] = useState(initialProject?.color || '')
  const [published, setPublished] = useState(initialProject?.published !== false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  if (!isEdit && title && !slug) setSlug(slugify(title))

  async function save(asDraft = false) {
    if (!title.trim()) { setError('Başlık gerekli'); return }
    if (!slug.trim()) { setError('Slug gerekli'); return }
    setSaving(true); setError('')
    
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          slug,
          frontmatter: {
            title, excerpt, category, tags: tags.split(',').map((t:string)=>t.trim()).filter(Boolean),
            coverEmoji: emoji, status, link, color, published: asDraft ? false : published
          },
          content,
        }),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        const d = await res.json()
        setError(d.error || 'Bir hata oluştu.')
      }
    } catch (e) {
      setError('Bir hata oluştu: ' + (e instanceof Error ? e.message : 'Bilinmeyen hata'))
    }
    
    setSaving(false)
  }

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <button onClick={() => router.push('/admin')} className="btn btn-ghost">← Panele dön</button>
        <div className={styles.toolbarRight}>
          <button onClick={() => save(true)} className="btn btn-ghost" disabled={saving}>Taslak kaydet</button>
          <button onClick={() => save(false)} className="btn btn-primary" disabled={saving}>{saving ? 'Kaydediliyor...' : published ? '🚀 Yayınla' : '💾 Kaydet'}</button>
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className={styles.sideSection}>
            <label>Emoji</label>
            <input value={emoji} onChange={e=>setEmoji(e.target.value)} />
          </div>
          <div className={styles.sideSection}>
            <label>Kategori</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
            </select>
          </div>
          <div className={styles.sideSection}>
            <label>Durum</label>
            <input value={status} onChange={e=>setStatus(e.target.value)} />
          </div>
          <div className={styles.sideSection}>
            <label>Link</label>
            <input value={link} onChange={e=>setLink(e.target.value)} placeholder="https://github.com/..." />
          </div>
          <div className={styles.sideSection}>
            <label>Renk (CSS)</label>
            <input value={color} onChange={e=>setColor(e.target.value)} placeholder="var(--green-soft)" />
          </div>
          <div className={styles.sideSection}>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)} />
              <span>Yayında</span>
            </label>
          </div>
        </div>

        <div className={styles.main}>
          <input className={styles.titleInput} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Proje başlığı..." />
          <input className={styles.excerptInput} value={excerpt} onChange={e=>setExcerpt(e.target.value)} placeholder="Kısa özet..." />
          <textarea className={styles.contentInput} value={content} onChange={e=>setContent(e.target.value)} placeholder="Proje açıklaması..." />
        </div>
      </div>
    </div>
  )
}
