import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>
          <span>📖</span> Pages of Engineer
        </p>
        <p className={styles.tagline}>Kodla yaz, kalemle çiz, kelimelerle anlat.</p>
        <div className={styles.links}>
          <Link href="/blog">Blog</Link>
          <Link href="/projects">Projeler</Link>
          <Link href="/about">Hakkımda</Link>
          <Link href="/contact">İletişim</Link>
        </div>
        <div className={styles.social}>
          <a className={styles.socialLink} href="https://github.com/mervekldrm" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
            <svg className={styles.socialIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 .297a12 12 0 00-3.794 23.4c.6.111.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.809 1.304 3.494.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.119 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.624-5.476 5.92.43.372.814 1.102.814 2.222v3.293c0 .32.217.694.825.576A12 12 0 0012 .297z" fill="currentColor" />
            </svg>
            <span className={styles.socialLabel}>GitHub</span>
          </a>

          <a className={styles.socialLink} href="https://www.linkedin.com/in/mervekaldirim/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
            <svg className={styles.socialIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.52V24H.22V8.98zM8.98 8.98h4.34v2.06h.06c.6-1.14 2.06-2.34 4.24-2.34C22.62 8.7 24 11.02 24 14.82V24h-4.52v-8.26c0-1.97-.04-4.5-2.74-4.5-2.74 0-3.16 2.14-3.16 4.36V24H8.98V8.98z" fill="currentColor" />
            </svg>
            <span className={styles.socialLabel}>LinkedIn</span>
          </a>

          <a className={styles.socialLink} href="https://www.instagram.com/pagesofengineer/" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
            <svg className={styles.socialIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm5.2-2a1.2 1.2 0 11-1.2 1.2 1.2 1.2 0 011.2-1.2z" fill="currentColor" />
            </svg>
            <span className={styles.socialLabel}>Instagram</span>
          </a>

          <a className={styles.socialLink} href="mailto:mervekaldirim45@gmail.com" aria-label="E-posta">
            <svg className={styles.socialIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M2 4h20v16H2z" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <span className={styles.socialLabel}>Mail</span>
          </a>
        </div>
        <p className={styles.copy}>© {new Date().getFullYear()} Merve — pagesofengineer.com</p>
      </div>
    </footer>
  )
}
