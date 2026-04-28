'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PostMeta } from '@/lib/shared'
import styles from './page.module.css'

export default function BlogPage() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setPosts(data)
        
        // Extract all unique tags
        const tags = Array.from(new Set(data.flatMap((p: PostMeta) => p.tags))).sort()
        setAllTags(tags)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  const filteredPosts = selectedTags.length === 0 
    ? posts 
    : posts.filter(post => selectedTags.some(tag => post.tags.includes(tag)))

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <h1>Blog ✍️</h1>
            <p className={styles.subtitle}>Yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1>Blog ✍️</h1>
          <p className={styles.subtitle}>Öğrendiklerim, denediklerim, düşündüklerim.</p>
        </div>

        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>📭 Henüz blog yazısı yok. Yakında burada bir şeyler belirecek!</p>
          </div>
        ) : (
          <>
            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className={styles.tagFilter}>
                <div className={styles.tagFilterLabel}>Etiketlere göre filtrele:</div>
                <div className={styles.tagCheckboxes}>
                  {allTags.map(tag => (
                    <label key={tag} className={styles.tagCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className={styles.empty}>
                <p>🔍 Seçilen etiketlere uygun yazı bulunamadı.</p>
              </div>
            ) : (
              <>
                {/* Featured post */}
                {filteredPosts[0] && (
                  <Link href={`/blog/${filteredPosts[0].slug}`} className={styles.featured}>
                    <div className={styles.featuredEmoji}>{filteredPosts[0].coverEmoji}</div>
                    <div>
                      <span className="tag-pill">{filteredPosts[0].category}</span>
                      <h2 className={styles.featuredTitle}>{filteredPosts[0].title}</h2>
                      <p className={styles.featuredExcerpt}>{filteredPosts[0].excerpt}</p>
                      <div className={styles.meta}>
                        <span>{new Date(filteredPosts[0].date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span>·</span>
                        <span>{filteredPosts[0].readTime} dk okuma</span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Rest */}
                <div className={styles.grid}>
                  {filteredPosts.slice(1).map((post, i) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card} style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className={styles.cardEmoji}>{post.coverEmoji}</div>
                      <div className={styles.cardBody}>
                        <span className="tag-pill">{post.category}</span>
                        <h3 className={styles.cardTitle}>{post.title}</h3>
                        <p className={styles.cardExcerpt}>{post.excerpt}</p>
                        <div className={styles.meta}>
                          <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</span>
                          <span>{post.readTime} dk</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
