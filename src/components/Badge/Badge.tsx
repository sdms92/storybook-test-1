import type { CSSProperties } from 'react';

export type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, CSSProperties> = {
  default: { backgroundColor: '#f3f4f6', color: '#374151' },
  info: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  success: { backgroundColor: '#dcfce7', color: '#15803d' },
  warning: { backgroundColor: '#fef9c3', color: '#a16207' },
  error: { backgroundColor: '#fee2e2', color: '#b91c1c' },
};

export function Badge({ label, variant = 'default', dot = false }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 10px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 500,
        ...variantStyles[variant],
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </span>
  );
}
