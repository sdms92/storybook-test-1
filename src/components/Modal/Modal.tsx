'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeWidths = { sm: '320px', md: '480px', lg: '640px' };

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}
      />
      <div
        style={{
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          width: sizeWidths[size],
          maxWidth: '90vw',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <h2
            id="modal-title"
            style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827' }}
          >
            {title}
          </h2>
          <button
            aria-label="닫기"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#6b7280',
              lineHeight: 1,
              padding: '4px',
            }}
          >
            ✕
          </button>
        </div>
        {children && <div style={{ fontSize: '14px', color: '#374151' }}>{children}</div>}
      </div>
    </div>,
    document.body
  );
}
