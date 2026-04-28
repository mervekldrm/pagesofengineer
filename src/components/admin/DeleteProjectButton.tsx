 'use client'
 import React from 'react'

 export default function DeleteProjectButton({ slug }: { slug: string }) {
  async function handle() {
    if (!confirm('Projeyi silmek istediğinizden emin misiniz?')) return
    const res = await fetch(`/api/projects?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' })
    if (res.ok) location.reload()
    else alert('Silme başarısız oldu')
  }

  return (
    <button onClick={handle} className="btn btn-danger" style={{ padding: '0.3rem 0.8rem', fontSize: '13px' }}>Sil</button>
  )
}
