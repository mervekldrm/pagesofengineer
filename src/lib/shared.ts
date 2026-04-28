export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  coverEmoji?: string
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
