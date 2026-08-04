import styles from '../styles/Section.module.css'

export default function Section({ 
  children, 
  title = '',
  subtitle = '',
  variant = 'default',
  hasBackground = false,
  className = '',
  ...props 
}) {
  return (
    <section 
      className={`${styles.section} ${styles[variant]} ${hasBackground ? styles.withBg : ''} ${className}`}
      {...props}
    >
      <div className={styles.sectionContent}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <div className={styles.titleLine}></div>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
