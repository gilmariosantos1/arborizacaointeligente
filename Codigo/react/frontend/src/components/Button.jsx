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
  href = null,
  to = null,
  component: Component = null,
  target = '_self',
  ...props 
}) {
  const btnClass = `${styles.btn} ${styles[variant]} ${styles[size]} ${isFullWidth ? styles.fullWidth : ''} ${className}`;
  
  // Se for um componente como Link do React Router
  if (Component && to) {
    return (
      <Component 
        to={to}
        className={btnClass}
        {...props}
      >
        {children}
      </Component>
    )
  }
  
  // Se for um link externo (href)
  if (href) {
    return (
      <a 
        href={href}
        className={btnClass}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    )
  }
  
  // Padrão: button normal
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
