'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { marked } from 'marked'
import { resolveCoverImageUrl, slugify, type Post } from '../../lib/shared'
import styles from './PostEditor.module.css'

interface Props {
  initialPost?: Partial<Post>
  isEdit?: boolean
}

const EMOJIS = ['📝', '🧬', '☁️', '🧪', '🤖', '🔬', '💻', '📖', '🎵', '🔭', '🌱', '⚡', '🎯', '🚀', '💡']
const CATEGORIES = [
  { name: 'Notebook', emoji: '🗒️' },
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
  const [tags, setTags] = useState((initialPost?.tags || []).join(', '))
  const [emoji, setEmoji] = useState(initialPost?.coverEmoji || '📝')
  const [coverImageUrl, setCoverImageUrl] = useState(initialPost?.coverImageUrl || '')
  const resolvedCoverImageUrl = resolveCoverImageUrl(coverImageUrl)
  const [published, setPublished] = useState(initialPost?.published !== false)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')
  const contentInputRef = useRef<HTMLTextAreaElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

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

    // When publishing (not draft), always set published to true
    const isPublished = !asDraft

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          slug,
          title,
          excerpt,
          content,
          tags: tags.split(',').map((t: string) => t.trim()).filter(Boolean),
          coverEmoji: emoji,
          coverImageUrl: resolvedCoverImageUrl || undefined,
          published: isPublished,
          date: initialPost?.date || new Date().toISOString(),
        }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        const d = await res.json()
        console.error('POST /api/posts error response:', d)
        setError(d.error || `HTTP ${res.status}: Bir hata oluştu.`)
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error('POST /api/posts exception:', msg)
      setError(`Hata: ${msg}`)
    }

    setSaving(false)
  }

  const previewHtml = marked.parse(content) as string

  function insertAtCursor(text: string) {
    const input = contentInputRef.current
    const start = input?.selectionStart ?? content.length
    const end = input?.selectionEnd ?? content.length
    const needsLeadingBreak = start > 0 && content[start - 1] !== '\n'
    const needsTrailingBreak = end < content.length && content[end] !== '\n'
    const value = `${content.slice(0, start)}${needsLeadingBreak ? '\n\n' : ''}${text}${needsTrailingBreak ? '\n\n' : ''}${content.slice(end)}`

    setContent(value)
    requestAnimationFrame(() => {
      const cursorPosition = start + (needsLeadingBreak ? 2 : 0) + text.length
      input?.focus()
      input?.setSelectionRange(cursorPosition, cursorPosition)
    })
  }

  function selectImage() {
    imageInputRef.current?.click()
  }

  function insertImage(event: React.ChangeEvent<HTMLInputElement>) {
    const [file] = Array.from(event.target.files || [])
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Lütfen bir görsel dosyası seçin.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Görsel en fazla 5 MB olabilir.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const imageUrl = reader.result
      if (typeof imageUrl !== 'string') return
      const altText = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ')
      insertAtCursor(`![${altText}](${imageUrl})`)
      setError('')
    }
    reader.onerror = () => setError('Görsel okunamadı. Lütfen tekrar deneyin.')
    reader.readAsDataURL(file)
  }

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
            <label>Kapak Resmi (URL)</label>
            <input 
              type="text" 
              value={coverImageUrl} 
              onChange={e => setCoverImageUrl(e.target.value)} 
              placeholder="https://example.com/image.jpg" 
            />
            {resolvedCoverImageUrl && (
              <div style={{ marginTop: '8px', borderRadius: '4px', overflow: 'hidden', maxHeight: '150px' }}>
                <img src={resolvedCoverImageUrl} alt="Kapak Önizlemesi" referrerPolicy="no-referrer" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
            )}
          </div>
          <div className={styles.sideSection}>
            <label>Etiketler (virgülle ayır)</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="python, bioinformatics, cloud" />
          </div>
          <div className={styles.sideSection}>
            <label>Slug (URL)</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="rna-seq-pipeline" />
            <p className={styles.hint}>
              Notebook notları için etiketlere <strong>notebook</strong> ekle. Diğer yazılar blogda görünür.
            </p>
          </div>
          <div className={styles.sideSection}>
            <label>Not İçi Görsel</label>
            <p className={styles.hint}>Markdown ile notlarin arasina gorsel ekleyebilirsin:</p>
            <code className={styles.miniCode}>![Gorsel aciklamasi](https://ornek.com/foto.jpg)</code>
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
            <div className={styles.contentEditor}>
              <div className={styles.contentActions}>
                <button type="button" onClick={selectImage} className={styles.imageButton}>
                  + Fotoğraf ekle
                </button>
                <span>İmlecin bulunduğu yere eklenir · En fazla 5 MB</span>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={insertImage}
                  className={styles.fileInput}
                  aria-label="Not içine fotoğraf ekle"
                />
              </div>
              <textarea
                ref={contentInputRef}
                className={styles.contentInput}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder={`# Baslik\n\nYazina buradan basla... Markdown kullanabilirsin.\n\n## Alt baslik\n\nParagraf metni.\n\n![Gorsel aciklamasi](https://ornek.com/foto.jpg)\n\n\`\`\`python\n# Kod blogu\nprint("Merhaba!")\n\`\`\``}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
