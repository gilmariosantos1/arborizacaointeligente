import styles from '../styles/Card.module.css'

export default function Card({ 
  children, 
  variant = 'default',
  hasImage = false,
  className = '',
  ...props 
}) {
  return (
    <div 
      className={`${styles.card} ${styles[variant]} ${hasImage ? styles.hasImage : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
