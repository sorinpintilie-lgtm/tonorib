'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'coral' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-ocean text-white hover:bg-ocean-500 hover:shadow-card-hover': variant === 'primary',
            'bg-teal text-white hover:bg-teal-500 hover:shadow-card-hover': variant === 'secondary',
            'border-2 border-ocean text-ocean hover:bg-ocean hover:text-white': variant === 'outline',
            'bg-coral text-white hover:bg-coral-600 hover:shadow-card-hover': variant === 'coral',
            'text-ocean hover:bg-ocean-50': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
