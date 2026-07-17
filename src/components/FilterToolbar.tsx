import Link from 'next/link'
import styles from './FilterToolbar.module.css'

type FilterItem = {
  label: string
  href: string
  active?: boolean
}

type FilterSection = {
  label: string
  items: FilterItem[]
}

type FilterToolbarProps = {
  activeLabel?: string
  clearHref: string
  sections: FilterSection[]
}

export default function FilterToolbar({ activeLabel, clearHref, sections }: FilterToolbarProps) {
  return (
    <div className={styles.toolbar}>
      {activeLabel && (
        <div className={styles.activeRow}>
          <span className={styles.activePrefix}>Secili:</span>
          <span className="tag-pill">{activeLabel}</span>
          <Link href={clearHref} className={styles.clearLink}>Temizle</Link>
        </div>
      )}

      {sections
        .filter((section) => section.items.length > 0)
        .map((section) => (
          <div key={section.label} className={styles.section}>
            <span className={styles.sectionLabel}>{section.label}</span>
            <div className={styles.sectionItems}>
              {section.items.map((item) => (
                <Link
                  key={`${section.label}-${item.label}`}
                  href={item.href}
                  className={`${styles.chip} ${item.active ? styles.chipActive : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
