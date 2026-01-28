import React from 'react';
import { useGameStore } from '../../store/gameStore.js';
import { useNextMultiplier } from '../../store/selectors.js';
import { Cell } from './Cell.jsx';
import { CrownsCard, MinesCard } from './InfoCard.jsx';
import { GRID_SIZE, TOTAL_CELLS } from '../../lib/constants.js';
import { Flame } from '../icons/index.jsx';

export function GameBoard() {
  const field = useGameStore(s => s.field);
  const phase = useGameStore(s => s.phase);
  const clickCell = useGameStore(s => s.clickCell);
  const mineCount = useGameStore(s => s.mineCount);
  const revealedCount = useGameStore(s => s.revealedCount);
  const nextMultiplier = useNextMultiplier();

  const isPlaying = phase === 'playing';
  const isLost = phase === 'lost';
  const isDisabled = phase !== 'playing';
  const isEmpty = field.length === 0;

  const totalCrowns = TOTAL_CELLS - mineCount;
  const remainingCrowns = totalCrowns - revealedCount;

  return (
    <div className="flex gap-4 items-center">
      <CrownsCard crownCount={remainingCrowns} />

      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: '#22273A' }}
      >
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: '400px',
          }}
        >
          {isEmpty ? (
            // empty placeholder
            Array.from({ length: TOTAL_CELLS }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#30354B' }}
              >
                <Flame className="w-7 h-7" style={{ color: '#4E5171' }} />
              </div>
            ))
          ) : (
            // actual game cells
            field.map((cell) => (
              <Cell
                key={cell.id}
                cell={cell}
                onClick={() => clickCell(cell.id)}
                disabled={isDisabled}
                isPlaying={isPlaying}
                isLost={isLost}
                nextMultiplier={nextMultiplier}
              />
            ))
          )}
        </div>
      </div>

      <MinesCard mineCount={mineCount} />
    </div>
  );
}
