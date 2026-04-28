'use client'
import React from 'react'

export default function DeletePostButton({ slug }: { slug: string }) {
  async function handle() {
    if (!confirm('Blog yazısını silmek istediğinizden emin misiniz?')) return
    try {
      const res = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}`, { 
        method: 'DELETE',
        credentials: 'include'
      })
      if (res.ok) {
        location.reload()
      } else {
        const data = await res.json()
        alert(data.error || 'Silme başarısız oldu')
      }
    } catch (e) {
      alert('Bir hata oluştu: ' + (e instanceof Error ? e.message : 'Bilinmeyen hata'))
    }
  }

  return (
    <button onClick={handle} className="btn btn-danger" style={{ padding: '0.3rem 0.8rem', fontSize: '13px' }}>Sil</button>
  )
}
