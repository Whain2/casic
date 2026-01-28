import React from 'react';
import { cn } from '../../lib/cn.js';
import { MINE_OPTIONS } from '../../lib/constants.js';

export function MineSelector({ value, onChange, disabled }) {
  return (
    <div className="flex gap-2">
      {MINE_OPTIONS.map(option => (
        <button
          key={option}
          onClick={() => onChange(option)}
          disabled={disabled}
          className={cn(
            'flex-1 px-3 py-2.5 rounded-xl text-sm font-bold',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900',
            
            // selected state
            value === option && [
              'bg-gradient-to-r from-amber-500 to-orange-500',
              'text-black',
              'shadow-lg shadow-amber-500/30',
              'focus:ring-amber-500',
            ],
            
            // unselected state
            value !== option && [
              'bg-slate-800 text-slate-300',
              'hover:bg-slate-700',
              'focus:ring-slate-500',
            ],
            
            // disabled state
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
