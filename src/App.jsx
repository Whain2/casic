import React from 'react';
import { Coins } from './components/icons/index.jsx';
import { GameBoard, BetPanel, MultiplierNav } from './components/game/index.js';
import { useBalanceStore } from './store/balanceStore.js';

export default function App() {
  const balance = useBalanceStore(s => s.balance);
  const addBalance = useBalanceStore(s => s.addBalance);

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ backgroundColor: '#1C1F2E' }}>
      <header className="flex justify-end items-center p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => addBalance(100)}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-sm font-bold hover:bg-emerald-500/30 transition-all border border-emerald-500/30"
          >
            +$100
          </button>

          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: '#22273A' }}
          >
            <Coins className="w-5 h-5 text-amber-400" />
            <span className="text-white font-bold text-lg">
              ${balance.toFixed(2)}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="flex gap-6 items-start">
          <BetPanel />

          <div
            className="rounded-xl p-4 flex flex-col gap-4"
            style={{ backgroundColor: '#22273A' }}
          >
            <GameBoard />
            <MultiplierNav />
          </div>
        </div>
      </main>
    </div>
  );
}
