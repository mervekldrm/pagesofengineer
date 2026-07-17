'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

export default function Navbar() {
  const path = usePathname()
  const links = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/blog', label: 'Blog' },
    { href: '/notebook', label: 'Notebook' },
    { href: '/projects', label: 'Projeler' },
    { href: '/about', label: 'Hakkımda' },
    { href: '/contact', label: 'İletişim' },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>📖</span>
          <span>Pages of Engineer</span>
        </Link>
        <ul className={styles.links}>
          {links.map(l => {
            const isActive = l.href === '/' ? path === '/' : path === l.href || path.startsWith(`${l.href}/`)
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
