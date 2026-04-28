import styles from './page.module.css'

export const metadata = { title: 'İletişim — Pages of Engineer' }

const links = [
  {
    icon: '📧',
    label: 'E-posta',
    handle: 'mervekaldirim45@gmail.com',
    href: 'mailto:mervekaldirim45@gmail.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/mervekaldirim',
    href: 'https://www.linkedin.com/in/mervekaldirim/',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    handle: 'github.com/mervekldrm',
    href: 'https://github.com/mervekldrm',
  },
  {
    icon: '📸',
    label: 'Instagram',
    handle: 'instagram.com/pagesofengineer',
    href: 'https://www.instagram.com/pagesofengineer/',
  },
]

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className="container-narrow">
        <div className={styles.header}>
          <h1>İletişim 📬</h1>
          <p className={styles.subtitle}>
            Bir fikir, proje, soru ya da sadece kısa bir selam için aşağıdaki yollardan
            bana ulaşabilirsin.
          </p>
        </div>

        <div className={styles.links}>
          {links.map(link => (
            <a key={link.label} href={link.href} className={styles.linkCard} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}>
              <span className={styles.linkIcon}>{link.icon}</span>
              <div>
                <div className={styles.linkLabel}>{link.label}</div>
                <div className={styles.linkHandle}>{link.handle}</div>
              </div>
              <span className={styles.arrow}>→</span>
            </a>
          ))}
        </div>

        <div className={styles.note}>
          <span>✨</span>
          <p>
            
          </p>
        </div>
      </div>
    </div>
  )
}
