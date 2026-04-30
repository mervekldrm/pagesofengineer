export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
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
        return `https://drive.google.com/uc?export=view&id=${fileId}`
      }
    }

    return trimmedUrl
  } catch {
    return trimmedUrl
  }
}
