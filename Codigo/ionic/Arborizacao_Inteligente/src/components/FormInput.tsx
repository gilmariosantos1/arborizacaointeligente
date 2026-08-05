import React from 'react';
import styles from '../styles/FormInput.module.css';

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function FormInput({
  label,
  type = 'text',
  placeholder = '',
  required = false,
  error = '',
  value,
  onChange,
  id = '',
  name = '',
  className = '',
  ...props
}: FormInputProps) {
  const inputClass = [styles.input, error ? styles.error : '', className].filter(Boolean).join(' ');

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
        className={inputClass}
        {...props}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}
