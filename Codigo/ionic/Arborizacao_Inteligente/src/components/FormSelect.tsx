import React from 'react';
import styles from '../styles/FormInput.module.css';

type FormSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

export default function FormSelect({
  label,
  value,
  onChange,
  id,
  name,
  children,
  required = false,
  error = '',
  className = '',
}: FormSelectProps) {
  const selectClass = [styles.input, error ? styles.error : '', className].filter(Boolean).join(' ');

  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={selectClass}
      >
        {children}
      </select>

      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}