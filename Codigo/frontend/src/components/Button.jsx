import styles from '../styles/Button.module.css'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  isFullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) {
  const btnClass = `${styles.btn} ${styles[variant]} ${styles[size]} ${isFullWidth ? styles.fullWidth : ''} ${className}`;
  
  return (
    <button 
      className={btnClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
