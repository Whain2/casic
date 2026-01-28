import React from 'react';
import { useGameStore } from '../../store/gameStore.js';
import { cn } from '../../lib/cn.js';

export function GameHistory() {
  const history = useGameStore(s => s.history);
  
  if (history.length === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto">
      <span className="text-slate-500 text-sm whitespace-nowrap font-medium">
        История:
      </span>
      
      <div className="flex gap-2">
        {history.slice(0, 12).map(entry => (
          <div
            key={entry.id}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap',
              'transition-all',
              
              entry.won && [
                'bg-emerald-500/20 text-emerald-400',
                'border border-emerald-500/30',
              ],
              
              !entry.won && [
                'bg-red-500/20 text-red-400',
                'border border-red-500/30',
              ],
            )}
          >
            {entry.won ? `${entry.multiplier.toFixed(2)}x` : '💥'}
          </div>
        ))}
      </div>
    </div>
  );
}
