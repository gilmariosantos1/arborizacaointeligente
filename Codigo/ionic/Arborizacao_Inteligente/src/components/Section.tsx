import React from 'react';
import styles from '../styles/Section.module.css';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'light' | 'dark';
  hasBackground?: boolean;
};

export default function Section({
  children,
  title = '',
  subtitle = '',
  variant = 'default',
  hasBackground = false,
  className = '',
  ...props
}: SectionProps) {
  const classes = [styles.section, styles[variant], hasBackground ? styles.withBg : '', className].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      <div className={styles.sectionContent}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <div className={styles.titleLine} />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
