'use client'
import React from 'react'

export default function DeletePostButton({ slug }: { slug: string }) {
  async function handle() {
    if (!confirm('Blog yazısını silmek istediğinizden emin misiniz?')) return
    const res = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' })
    if (res.ok) location.reload()
    else alert('Silme başarısız oldu')
  }

  return (
    <button onClick={handle} className="btn btn-danger" style={{ padding: '0.3rem 0.8rem', fontSize: '13px' }}>Sil</button>
  )
}
