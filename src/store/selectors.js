import { useGameStore } from './gameStore.js';
import { useBalanceStore } from './balanceStore.js';
import { calculateWin } from '../lib/gameLogic.js';
import { getNextMultiplier } from '../lib/multipliers.js';
import { TOTAL_CELLS } from '../lib/constants.js';

export function useCanBet() {
  const phase = useGameStore(s => s.phase);
  const betAmount = useGameStore(s => s.betAmount);
  const balance = useBalanceStore(s => s.balance);
  
  return phase === 'idle' && betAmount <= balance && betAmount > 0;
}

export function usePotentialWin() {
  const betAmount = useGameStore(s => s.betAmount);
  const multiplier = useGameStore(s => s.currentMultiplier);
  
  return calculateWin(betAmount, multiplier);
}

export function useNextMultiplier() {
  const mineCount = useGameStore(s => s.mineCount);
  const revealedCount = useGameStore(s => s.revealedCount);
  
  return getNextMultiplier(mineCount, revealedCount);
}

export function useCanCashout() {
  const phase = useGameStore(s => s.phase);
  const revealedCount = useGameStore(s => s.revealedCount);
  
  return phase === 'playing' && revealedCount > 0;
}

export function useGameProgress() {
  const revealedCount = useGameStore(s => s.revealedCount);
  const mineCount = useGameStore(s => s.mineCount);
  
  const maxSafe = TOTAL_CELLS - mineCount;
  return (revealedCount / maxSafe) * 100;
}

export function useRemainingSafeCells() {
  const revealedCount = useGameStore(s => s.revealedCount);
  const mineCount = useGameStore(s => s.mineCount);
  
  return TOTAL_CELLS - mineCount - revealedCount;
}
