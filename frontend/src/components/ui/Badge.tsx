import { memo } from 'react';
import type { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-50 text-primary-700",
  secondary: "bg-slate-100 text-slate-700",
  accent: "bg-accent-50 text-accent-600",
  outline: "border border-slate-200 text-slate-600"
};

export const Badge = memo<BadgeProps>(function Badge({
  children,
  variant = 'primary',
  className = ''
}) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
});