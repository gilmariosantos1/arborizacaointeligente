import styles from '../styles/FormInput.module.css'


export default function FormSelect({
  label,
  value,
  onChange,
  id,
  name,
  children,
  required = false,
  error = ''
}) {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${styles.input} ${error ? styles.error : ''}`}
      >
        {children}
      </select>

      {error && <span>{error}</span>}
    </div>
  );
}