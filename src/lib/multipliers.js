import { TOTAL_CELLS, HOUSE_EDGE } from './constants.js';

export function calculateMultiplier(mineCount, revealedCount) {
  if (revealedCount === 0) return 1;
  
  const safeCells = TOTAL_CELLS - mineCount;
  let probability = 1;
  
  for (let i = 0; i < revealedCount; i++) {
    probability *= (safeCells - i) / (TOTAL_CELLS - i);
  }
  
  const multiplier = (1 / probability) * (1 - HOUSE_EDGE);
  return Math.floor(multiplier * 100) / 100;
}

export function getNextMultiplier(mineCount, revealedCount) {
  return calculateMultiplier(mineCount, revealedCount + 1);
}

export function getMaxMultiplier(mineCount) {
  const maxRevealed = TOTAL_CELLS - mineCount;
  return calculateMultiplier(mineCount, maxRevealed);
}

export const MULTIPLIER_TABLES = {};

[3, 5, 10, 24].forEach(mineCount => {
  const maxRevealed = TOTAL_CELLS - mineCount;
  MULTIPLIER_TABLES[mineCount] = [];
  
  for (let revealed = 0; revealed <= maxRevealed; revealed++) {
    MULTIPLIER_TABLES[mineCount][revealed] = calculateMultiplier(mineCount, revealed);
  }
});
