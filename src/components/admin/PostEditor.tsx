'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { marked } from 'marked'
import { slugify, type Post } from '../../lib/shared'
import styles from './PostEditor.module.css'

interface Props {
  initialPost?: Partial<Post>
  isEdit?: boolean
}

const EMOJIS = ['📝', '🧬', '☁️', '🧪', '🤖', '🔬', '💻', '📖', '🎵', '🔭', '🌱', '⚡', '🎯', '🚀', '💡']
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

export default function PostEditor({ initialPost, isEdit }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initialPost?.title || '')
  const [slug, setSlug] = useState(initialPost?.slug || '')
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '')
  const [content, setContent] = useState(initialPost?.content || '')
  const [category, setCategory] = useState(initialPost?.category || 'Genel')
  const [tags, setTags] = useState((initialPost?.tags || []).join(', '))
  const [emoji, setEmoji] = useState(initialPost?.coverEmoji || '📝')
  const [published, setPublished] = useState(initialPost?.published !== false)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit && title) {
      setSlug(slugify(title))
    }
  }, [title, isEdit])

  async function save(asDraft = false) {
    if (!title.trim()) {
      setError('Başlık gerekli')
      return
    }
    if (!slug.trim()) {
      setError('Slug gerekli')
      return
    }

    setSaving(true)
    setError('')

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug,
        title,
        excerpt,
        content,
        category,
        tags: tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        coverEmoji: emoji,
        published: asDraft ? false : published,
        date: initialPost?.date || new Date().toISOString(),
      }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const d = await res.json()
      setError(d.error || 'Bir hata oluştu.')
    }

    setSaving(false)
  }

  const previewHtml = marked.parse(content) as string

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <button onClick={() => router.push('/admin')} className="btn btn-ghost" style={{ fontSize: '13px' }}>← Panele dön</button>
        <div className={styles.toolbarRight}>
          <button onClick={() => setPreview(p => !p)} className="btn btn-ghost" style={{ fontSize: '13px' }}>
            {preview ? '✏️ Yaz' : '👁️ Önizle'}
          </button>
          <button onClick={() => save(true)} className="btn btn-ghost" disabled={saving} style={{ fontSize: '13px' }}>
            Taslak kaydet
          </button>
          <button onClick={() => save(false)} className="btn btn-primary" disabled={saving} style={{ fontSize: '13px' }}>
            {saving ? 'Kaydediliyor...' : published ? '🚀 Yayınla' : '💾 Kaydet'}
          </button>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className={styles.sideSection}>
            <label>Emoji / Kapak</label>
            <div className={styles.emojiGrid}>
              {EMOJIS.map(e => (
                <button key={e} onClick={() => setEmoji(e)} className={`${styles.emojiBtn} ${e === emoji ? styles.emojiSelected : ''}`}>{e}</button>
              ))}
            </div>
          </div>
          <div className={styles.sideSection}>
            <label>Kategori</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
            </select>
          </div>
          <div className={styles.sideSection}>
            <label>Etiketler (virgülle ayır)</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="python, bioinformatics, cloud" />
          </div>
          <div className={styles.sideSection}>
            <label>Slug (URL)</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="rna-seq-pipeline" />
            <p className={styles.hint}>pagesofengineer.com/blog/<strong>{slug || 'slug'}</strong></p>
          </div>
          <div className={styles.sideSection}>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
              <span>Yayında</span>
            </label>
          </div>
        </div>

        <div className={styles.main}>
          <input
            className={styles.titleInput}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Yazı başlığı..."
          />
          <textarea
            className={styles.excerptInput}
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Kısa özet (blog listesinde görünür)..."
            rows={2}
          />
          {preview ? (
            <div className={`${styles.preview} prose`} dangerouslySetInnerHTML={{ __html: previewHtml }} />
          ) : (
            <textarea
              className={styles.contentInput}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`# Başlık\n\nYazına buradan başla... Markdown kullanabilirsin.\n\n## Alt başlık\n\nParagraf metni.\n\n\`\`\`python\n# Kod bloğu\nprint("Merhaba!")\n\`\`\``}
            />
          )}
        </div>
      </div>
    </div>
  )
}
