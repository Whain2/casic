import React from 'react';
import { useBalanceStore } from '../../store/balanceStore.js';
import { Bomb, Coins } from '../icons/index.jsx';

export function Header() {
  const balance = useBalanceStore(s => s.balance);
  const addBalance = useBalanceStore(s => s.addBalance);
  
  return (
    <header className="flex justify-between items-center p-4 border-b border-slate-800/50">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/30">
          <Bomb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Mines</h1>
          <p className="text-xs text-slate-500">Демо версия</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => addBalance(100)}
          className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-sm font-bold hover:bg-emerald-500/30 transition-all border border-emerald-500/30"
        >
          +$100
        </button>
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700/50">
          <Coins className="w-5 h-5 text-amber-400" />
          <span className="text-white font-black text-lg">
            ${balance.toFixed(2)}
          </span>
        </div>
      </div>
    </header>
  );
}
