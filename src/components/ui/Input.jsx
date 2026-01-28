import React from 'react';
import { cn } from '../../lib/cn.js';


export function Input({
  icon,
  prefix,
  className,
  ...props
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
      )}
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 font-bold">
          {prefix}
        </span>
      )}
      <input
        className={cn(
          'w-full rounded-xl bg-slate-800 border border-slate-700',
          'py-3 text-white text-lg font-bold',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'placeholder-slate-500',
          
          icon && 'pl-10 pr-4',
          prefix && 'pl-9 pr-4',
          !icon && !prefix && 'px-4',
          
          className
        )}
        {...props}
      />
    </div>
  );
}
