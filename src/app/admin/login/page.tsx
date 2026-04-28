'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Kullanıcı adı veya şifre hatalı.')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.icon}>📖</span>
          <h1>Admin Paneli</h1>
          <p>Pages of Engineer</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="merve"
              required
              autoFocus
            />
          </div>
          <div>
            <label>Şifre</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap →'}
          </button>
        </form>
      </div>
    </div>
  )
}
