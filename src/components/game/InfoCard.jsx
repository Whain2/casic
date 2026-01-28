import React from 'react';
import { Crown, Bomb } from '../icons/index.jsx';
import { cn } from '../../lib/cn.js';

export function CrownsCard({ crownCount, className }) {
  return (
    <div
      className={cn(
        'rounded-xl p-4 w-40',
        className
      )}
      style={{ backgroundColor: '#30354B' }}
    >
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
          <Crown className="w-7 h-7 text-amber-400" fill="currentColor" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-sm mb-1">Короны</h3>
        <p className="text-slate-400 text-xs leading-tight mb-3">
          Открывай ячейки с коронами
        </p>
        <div className="flex items-center justify-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-lg text-sm font-bold">
          <Crown className="w-4 h-4" fill="currentColor" />
          <span>{crownCount}</span>
        </div>
      </div>
    </div>
  );
}

export function MinesCard({ mineCount, className }) {
  return (
    <div
      className={cn(
        'rounded-xl p-4 w-40',
        className
      )}
      style={{ backgroundColor: '#30354B' }}
    >
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
          <Bomb className="w-7 h-7 text-red-400" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-sm mb-1">Мины</h3>
        <p className="text-slate-400 text-xs leading-tight mb-3">
          Количество мин на игровом поле
        </p>
        <div className="flex items-center justify-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-bold">
          <Bomb className="w-4 h-4" />
          <span>{mineCount}</span>
        </div>
      </div>
    </div>
  );
}
