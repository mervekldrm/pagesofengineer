'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TOPIC_PALETTE, inferTopicKey, topicLabelFromKey, type PostMeta, type TopicKey } from '../../lib/shared'
import styles from './page.module.css'

function BlogPageContent() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const selectedCategory = searchParams.get('category') || ''
  const requestedTopic = (searchParams.get('topic') || '').toLowerCase()
  const selectedTopic = TOPIC_PALETTE.some(topic => topic.key === requestedTopic)
    ? (requestedTopic as TopicKey)
    : undefined

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setPosts(data)
        
        // Extract all unique tags
        const tags = Array.from(new Set(data.flatMap((p: PostMeta) => p.tags))) as string[]
        setAllTags(tags.sort())
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(post => {
    const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag))
    const categoryMatch = !selectedCategory || post.category === selectedCategory
    const topicMatch = !selectedTopic || inferTopicKey(post.category) === selectedTopic
    return tagMatch && categoryMatch && topicMatch
  })

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

        {selectedCategory && (
          <div className={styles.activeCategoryRow}>
            <span className={styles.activeCategoryLabel}>Kategori:</span>
            <span className="tag-pill">{selectedCategory}</span>
            <Link href="/blog" className={styles.clearCategoryLink}>Temizle</Link>
          </div>
        )}

        {selectedTopic && (
          <div className={styles.activeCategoryRow}>
            <span className={styles.activeCategoryLabel}>Konu:</span>
            <span className="tag-pill">{topicLabelFromKey(selectedTopic)}</span>
            <Link href="/blog" className={styles.clearCategoryLink}>Temizle</Link>
          </div>
        )}

        <div className={styles.topicFilterRow}>
          {TOPIC_PALETTE.map((topic) => (
            <Link
              key={topic.key}
              href={`/blog?topic=${topic.key}`}
              className={`${styles.topicFilterChip} ${selectedTopic === topic.key ? styles.topicFilterChipActive : ''}`}
            >
              {topic.label}
            </Link>
          ))}
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
                <p>🔍 Seçilen filtrelere uygun yazı bulunamadı.</p>
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

function BlogPageFallback() {
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

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogPageFallback />}>
      <BlogPageContent />
    </Suspense>
  )
}
