import React from 'react';
import styles from '../styles/Card.module.css';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'flat' | 'filled' | 'outlined';
  hasImage?: boolean;
};

export default function Card({
  children,
  variant = 'default',
  hasImage = false,
  className = '',
  ...props
}: CardProps) {
  const classes = [
    styles.card,
    variant === 'default' ? '' : styles[variant],
    hasImage ? styles.hasImage : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
