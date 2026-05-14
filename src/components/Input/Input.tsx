'use client';

import type { ChangeEventHandler, FocusEventHandler } from 'react';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  disabled?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export function Input({
  label,
  placeholder,
  value,
  type = 'text',
  disabled = false,
  error,
  onChange,
  onFocus,
  onBlur,
}: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '280px' }}>
      {label && (
        <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          padding: '8px 12px',
          fontSize: '14px',
          borderRadius: '6px',
          border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
          outline: 'none',
          backgroundColor: disabled ? '#f9fafb' : '#ffffff',
          color: disabled ? '#9ca3af' : '#111827',
          cursor: disabled ? 'not-allowed' : 'text',
          fontFamily: 'inherit',
        }}
      />
      {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
    </div>
  );
}
