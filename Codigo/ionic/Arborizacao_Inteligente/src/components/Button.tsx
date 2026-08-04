import React from 'react';
import styles from '../styles/Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isFullWidth?: boolean;
    href?: string;
    to?: string;
    component?: React.ElementType;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
  };

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  isFullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  href,
  to,
  component: Component,
  target = '_self',
  ...props
}: ButtonProps) {
  const btnClass = [
    styles.btn,
    styles[variant] ?? styles.primary,
    styles[size] ?? styles.medium,
    isFullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  if (Component && to) {
    return (
      <Component to={to} className={btnClass} {...props}>
        {children}
      </Component>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={btnClass}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={btnClass} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} type={type} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
