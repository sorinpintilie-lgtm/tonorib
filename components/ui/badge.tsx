import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'fresh' | 'verified' | 'stock' | 'coral' | 'teal';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#E8EFF2] text-slate-700 border border-silver',
  fresh: 'bg-fresh-50 text-fresh border border-fresh-200',
  verified: 'bg-teal-50 text-teal border border-teal-200',
  stock: 'bg-[#E8EFF2] text-slate-700 border border-silver',
  coral: 'bg-coral-50 text-coral border border-coral-200',
  teal: 'bg-teal-50 text-teal border border-teal-200',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('badge', variantStyles[variant], className)}>
      {children}
    </span>
  );
}
