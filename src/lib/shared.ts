export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  /** Legacy storage field kept only for existing database rows. */
  category?: string
  tags: string[]
  coverEmoji?: string
  coverImageUrl?: string
  published: boolean
  readTime?: number
}

export interface Post extends PostMeta {
  content: string
}

export interface ProjectMeta extends PostMeta {
  status: string
  link: string
  color: string
}

export type TopicKey = 'dusunce' | 'siir' | 'teknik' | 'biyoinformatik' | 'kariyer' | 'gunluk'

export const TOPIC_PALETTE: ReadonlyArray<{ key: TopicKey; label: string; color: string; aliases: readonly string[] }> = [
  {
    key: 'dusunce',
    label: 'Düşünce',
    color: 'var(--accent-primary)',
    aliases: ['dusunce', 'dusunceler', 'fikir', 'fikirler', 'deneme', 'yorum', 'thought'],
  },
  {
    key: 'siir',
    label: 'Şiir',
    color: 'var(--mint-soft)',
    aliases: ['siir', 'poem', 'poetry', 'edebiyat'],
  },
  {
    key: 'teknik',
    label: 'Teknik',
    color: 'var(--peach-soft)',
    aliases: ['teknik', 'software', 'yazilim', 'coding', 'code', 'muhendislik', 'engineering', 'algoritma'],
  },
  {
    key: 'biyoinformatik',
    label: 'Biyoinformatik',
    color: 'var(--coral-soft)',
    aliases: ['biyoinformatik', 'bioinformatics', 'genomik', 'genomics', 'biyoenformatik'],
  },
  {
    key: 'kariyer',
    label: 'Kariyer',
    color: 'var(--sun-soft)',
    aliases: ['kariyer', 'career', 'staj', 'internship', 'is-hayati', 'is'],
  },
  {
    key: 'gunluk',
    label: 'Günlük',
    color: 'var(--cloud-pale)',
    aliases: ['gunluk', 'yasam', 'hayat', 'daily', 'notlar', 'notes'],
  },
]

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim()
}

export function isNotebookEntry(input: { tags?: string[] }): boolean {
  const normalizedTags = (input.tags || []).map(tag => normalizeText(tag))

  const notebookTagKeywords = ['notebook', 'not', 'notes', 'quicknote', 'quick-note']

  if (normalizedTags.some(tag => notebookTagKeywords.includes(tag))) {
    return true
  }

  return false
}

export function inferTopicKey(category?: string): TopicKey | undefined {
  const normalized = normalizeText(category || '')
  if (!normalized) return undefined

  for (const topic of TOPIC_PALETTE) {
    if (topic.aliases.some(alias => normalized.includes(alias))) {
      return topic.key
    }
  }

  return undefined
}

export function topicLabelFromKey(key?: string): string {
  const found = TOPIC_PALETTE.find(topic => topic.key === key)
  return found?.label || 'Kategori'
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function resolveCoverImageUrl(url?: string): string {
  if (!url) return ''

  const trimmedUrl = url.trim()
  if (!trimmedUrl) return ''

  try {
    const parsedUrl = new URL(trimmedUrl)

    if (parsedUrl.hostname.includes('drive.google.com')) {
      const fileIdFromPath = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/)?.[1]
      const fileIdFromQuery = parsedUrl.searchParams.get('id')
      const fileId = fileIdFromPath || fileIdFromQuery

      if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`
      }
    }

    return trimmedUrl
  } catch {
    return trimmedUrl
  }
}
