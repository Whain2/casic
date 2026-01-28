import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from '../icons/index.jsx';
import { useGameStore } from '../../store/gameStore.js';

export function MultiplierNav() {
  const history = useGameStore(s => s.history);

  const reversedHistory = [...history].reverse();
  const maxVisible = 3;

  const [startIndex, setStartIndex] = useState(Math.max(0, reversedHistory.length - maxVisible));

  useEffect(() => {
    setStartIndex(Math.max(0, reversedHistory.length - maxVisible));
  }, [history.length, reversedHistory.length]);

  const visibleHistory = reversedHistory.slice(startIndex, startIndex + maxVisible);

  const canGoLeft = startIndex > 0;
  const canGoRight = startIndex + maxVisible < reversedHistory.length;

  const handleLeft = () => {
    if (canGoLeft) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleRight = () => {
    if (canGoRight) {
      setStartIndex(startIndex + 1);
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button
        onClick={handleLeft}
        disabled={!canGoLeft}
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
        style={{ backgroundColor: '#1C1F2E' }}
      >
        <ArrowLeft className="w-5 h-5 text-slate-400" />
      </button>

      <div className="flex gap-3">
        {visibleHistory.map((entry) => (
          <div
            key={entry.id}
            className={`px-8 py-3 rounded-xl font-bold text-lg ${
              entry.won ? 'text-emerald-400' : 'text-red-400'
            }`}
            style={{ backgroundColor: '#1C1F2E' }}
          >
            {entry.multiplier.toFixed(3)}x
          </div>
        ))}
      </div>

      <button
        onClick={handleRight}
        disabled={!canGoRight}
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
        style={{ backgroundColor: '#1C1F2E' }}
      >
        <ArrowRight className="w-5 h-5 text-slate-400" />
      </button>
    </div>
  );
}
