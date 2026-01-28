import { TOTAL_CELLS } from './constants.js';
import { generateMinePositions } from './random.js';
import { calculateMultiplier } from './multipliers.js';

export function createField(mineCount) {
  const minePositions = generateMinePositions(TOTAL_CELLS, mineCount);
  
  return Array.from({ length: TOTAL_CELLS }, (_, id) => ({
    id,
    state: 'hidden',
    content: minePositions.has(id) ? 'mine' : 'gem',
  }));
}

export function revealCell(field, cellId, mineCount, currentRevealedCount) {
  const cell = field[cellId];
  
  if (cell.state !== 'hidden') {
    return {
      cell,
      newPhase: 'playing',
      newMultiplier: calculateMultiplier(mineCount, currentRevealedCount),
    };
  }
  
  const updatedCell = {
    ...cell,
    state: cell.content === 'mine' ? 'exploded' : 'revealed',
  };
  
  if (cell.content === 'mine') {
    return {
      cell: updatedCell,
      newPhase: 'lost',
      newMultiplier: 0,
    };
  }
  
  const newRevealedCount = currentRevealedCount + 1;
  const newMultiplier = calculateMultiplier(mineCount, newRevealedCount);
  
  const maxSafeCells = TOTAL_CELLS - mineCount;
  const allRevealed = newRevealedCount >= maxSafeCells;
  
  return {
    cell: updatedCell,
    newPhase: allRevealed ? 'won' : 'playing',
    newMultiplier,
  };
}

export function calculateWin(betAmount, multiplier) {
  return Math.round(betAmount * multiplier * 100) / 100;
}

export function revealAllMines(field) {
  return field.map(cell =>
    cell.content === 'mine' && cell.state === 'hidden'
      ? { ...cell, state: 'revealed' }
      : cell
  );
}

export function revealAllGems(field) {
  return field.map(cell =>
    cell.content === 'gem' && cell.state === 'hidden'
      ? { ...cell, state: 'revealed', revealedByPlayer: cell.revealedByPlayer ?? false }
      : cell
  );
}

export function countHiddenGems(field) {
  return field.filter(cell => 
    cell.content === 'gem' && cell.state === 'hidden'
  ).length;
}
