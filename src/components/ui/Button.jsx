import React from 'react';
import { cn } from '../../lib/cn.js';


export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        // base styles
        'inline-flex items-center justify-center rounded-xl font-bold',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-[0.98]',
        
        variant === 'primary' && [
          'bg-gradient-to-r from-blue-500 to-blue-600',
          'hover:from-blue-600 hover:to-blue-700',
          'text-white shadow-lg shadow-blue-500/30',
          'hover:shadow-blue-500/50',
          'focus:ring-blue-500',
        ],
        variant === 'secondary' && [
          'bg-slate-700 hover:bg-slate-600',
          'text-white',
          'focus:ring-slate-500',
        ],
        variant === 'success' && [
          'bg-gradient-to-r from-emerald-500 to-emerald-600',
          'hover:from-emerald-600 hover:to-emerald-700',
          'text-white shadow-lg shadow-emerald-500/30',
          'hover:shadow-emerald-500/50',
          'focus:ring-emerald-500',
        ],
        variant === 'danger' && [
          'bg-gradient-to-r from-red-500 to-red-600',
          'hover:from-red-600 hover:to-red-700',
          'text-white shadow-lg shadow-red-500/30',
          'focus:ring-red-500',
        ],
        variant === 'ghost' && [
          'bg-slate-800 hover:bg-slate-700',
          'text-slate-400 hover:text-white',
          'focus:ring-slate-500',
        ],
        
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2.5 text-base',
        size === 'lg' && 'px-6 py-4 text-lg',
        
        fullWidth && 'w-full',
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
