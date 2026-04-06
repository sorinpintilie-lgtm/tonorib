'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-slate mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 border border-silver rounded-input bg-white text-slate placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-200',
            error && 'border-coral focus:ring-coral',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-coral">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
