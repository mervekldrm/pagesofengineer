'use client'
import React from 'react'

export default function DeletePostButton({ slug }: { slug: string }) {
  async function handle() {
    if (!confirm('Blog yazısını silmek istediğinizden emin misiniz?')) return
    try {
      console.log('Deleting post:', slug)
      const res = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}`, { 
        method: 'DELETE',
        credentials: 'include'
      })
      console.log('Delete response status:', res.status)
      if (res.ok) {
        console.log('Delete successful, reloading...')
        location.reload()
      } else {
        const data = await res.json()
        console.error('Delete error:', data)
        alert(data.error || 'Silme başarısız oldu')
      }
    } catch (e) {
      console.error('Delete exception:', e)
      alert('Bir hata oluştu: ' + (e instanceof Error ? e.message : 'Bilinmeyen hata'))
    }
  }

  return (
    <button onClick={handle} className="btn btn-danger" style={{ padding: '0.3rem 0.8rem', fontSize: '13px' }}>Sil</button>
  )
}
