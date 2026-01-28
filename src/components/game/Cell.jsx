import React, { memo } from 'react';
import { cn } from '../../lib/cn.js';
import { Flame, Crown, Bomb } from '../icons/index.jsx';

export const Cell = memo(function Cell({
  cell,
  onClick,
  disabled,
  isPlaying,
  isLost,
  nextMultiplier,
}) {
  const isHidden = cell.state === 'hidden';
  const isRevealed = cell.state === 'revealed';
  const isExploded = cell.state === 'exploded';
  const isGem = cell.content === 'gem';
  const isMine = cell.content === 'mine';

  const revealedByPlayer = cell.revealedByPlayer === true;
  const isAutoRevealedGem = isGem && isRevealed && !revealedByPlayer;

  return (
    <button
      onClick={onClick}
      disabled={disabled || !isHidden}
      className={cn(
        'aspect-square rounded-xl',
        'flex items-center justify-center',
        'transition-all duration-200',
        'focus:outline-none',

        isHidden && [
          !disabled && 'hover:brightness-110 cursor-pointer',
          disabled && 'cursor-default',
        ],

        isRevealed && isGem && revealedByPlayer && 'bg-amber-500/20',
        isAutoRevealedGem && 'bg-[#30354B]',
        isRevealed && isMine && '',
        isExploded && 'bg-red-500/30',
      )}
      style={{
        backgroundColor:
          isRevealed && isGem ? undefined :
          isExploded ? undefined :
          '#30354B'
      }}      
      
    >
      {isHidden && !isPlaying && (
        <Flame className="w-7 h-7" style={{ color: '#4E5171' }} />
      )}

      {isHidden && isPlaying && (
        <span className="text-slate-400 text-sm font-bold">
          {nextMultiplier.toFixed(2)}x
        </span>
      )}

      {(isRevealed || isAutoRevealedGem) && isGem && (
        <Crown
          className={cn(
            'w-7 h-7',
          revealedByPlayer ? 'text-amber-400' : 'text-amber-300/70'
          )}
        fill="currentColor"
        />
      )}


      {(isRevealed || isExploded) && isMine && (
        <Bomb
          className={cn(
            'w-7 h-7',
            isExploded ? 'text-red-500' : 'text-slate-500'
          )}
        />
      )}
    </button>
  );
});
