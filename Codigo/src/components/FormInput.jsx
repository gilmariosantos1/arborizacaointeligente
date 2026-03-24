import styles from '../styles/FormInput.module.css'

export default function FormInput({ 
  label, 
  type = 'text', 
  placeholder = '',
  required = false,
  error = '',
  value = '',
  onChange = null,
  id = '',
  name = '',
  ...props 
}) {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.error : ''}`}
        {...props}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  )
}
