'use client';

import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export interface CardProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  loading?: boolean;
}

const skeletonBase: CSSProperties = {
  backgroundColor: '#e5e7eb',
  borderRadius: '4px',
};

export function Card({ title, description, badge, footer, children, onClick, loading }: CardProps) {
  const cardStyle: CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    width: '320px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    cursor: onClick ? 'pointer' : 'default',
  };

  if (loading) {
    return (
      <div style={cardStyle}>
        <div style={{ ...skeletonBase, height: '20px', width: '60%', marginBottom: '10px' }} />
        <div style={{ ...skeletonBase, height: '14px', width: '80%', marginBottom: '6px' }} />
        <div style={{ ...skeletonBase, height: '14px', width: '50%' }} />
      </div>
    );
  }

  return (
    <div style={cardStyle} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111827' }}>{title}</h3>
        {badge}
      </div>
      {description && (
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>
          {description}
        </p>
      )}
      {children && <div style={{ marginTop: '12px' }}>{children}</div>}
      {footer && (
        <div
          style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
