'use client';

import type { CSSProperties, MouseEventHandler } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: { backgroundColor: '#3b82f6', color: '#ffffff', border: '2px solid #3b82f6' },
  secondary: { backgroundColor: '#ffffff', color: '#374151', border: '2px solid #d1d5db' },
  danger: { backgroundColor: '#ef4444', color: '#ffffff', border: '2px solid #ef4444' },
  ghost: { backgroundColor: 'transparent', color: '#374151', border: '2px solid transparent' },
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '4px 12px', fontSize: '12px', borderRadius: '4px' },
  md: { padding: '8px 20px', fontSize: '14px', borderRadius: '6px' },
  lg: { padding: '12px 28px', fontSize: '16px', borderRadius: '8px' },
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontWeight: 600,
        fontFamily: 'inherit',
        transition: 'opacity 0.15s',
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {loading ? '로딩 중...' : label}
    </button>
  );
}
