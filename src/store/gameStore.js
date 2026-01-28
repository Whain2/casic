import { create } from 'zustand';
import { DEFAULT_BET, MIN_BET, TOTAL_CELLS } from '../lib/constants.js';
import { createField, revealAllMines, revealAllGems, calculateWin } from '../lib/gameLogic.js';
import { calculateMultiplier } from '../lib/multipliers.js';
import { useBalanceStore } from './balanceStore.js';

export const useGameStore = create((set, get) => ({
  phase: 'idle',
  field: [],
  mineCount: 3,
  betAmount: DEFAULT_BET,
  revealedCount: 0,
  currentMultiplier: 1,
  history: [],
  
  setMineCount: (count) => {
    if (get().phase !== 'idle') return;
    set({ mineCount: count });
  },

  setBetAmount: (amount) => {
    if (get().phase !== 'idle') return;
    const balance = useBalanceStore.getState().balance;
    const clamped = Math.min(balance, Math.max(MIN_BET, amount));
    set({ betAmount: Math.round(clamped * 100) / 100 });
  },
  
  startGame: () => {
    const { mineCount, betAmount } = get();

    const success = useBalanceStore.getState().subtractBalance(betAmount);
    if (!success) return false;

    const field = createField(mineCount);

    set({
      phase: 'playing',
      field,
      revealedCount: 0,
      currentMultiplier: 1,
    });

    return true;
  },

  clickCell: (cellId) => {
    const { phase, field, mineCount, revealedCount, history, betAmount } = get();

    if (phase !== 'playing') return null;

    const cell = field[cellId];

    if (cell.state !== 'hidden') return null;

    const newField = [...field];

    if (cell.content === 'mine') {
      newField[cellId] = { ...cell, state: 'exploded' };
      const fieldWithMines = revealAllMines(newField);
      const finalField = revealAllGems(fieldWithMines);

      set({
        field: finalField,
        phase: 'lost',
        currentMultiplier: 0,
        history: [
          { id: Date.now(), multiplier: 0, won: false },
          ...history.slice(0, 19),
        ],
      });

      return 'mine';
    } else {
      newField[cellId] = { ...cell, state: 'revealed', revealedByPlayer: true };
      const newRevealedCount = revealedCount + 1;
      const newMultiplier = calculateMultiplier(mineCount, newRevealedCount);

      const maxSafe = TOTAL_CELLS - mineCount;
      const allRevealed = newRevealedCount >= maxSafe;

      if (allRevealed) {
        const winAmount = calculateWin(betAmount, newMultiplier);
        useBalanceStore.getState().addBalance(winAmount);

        set({
          field: newField,
          phase: 'won',
          revealedCount: newRevealedCount,
          currentMultiplier: newMultiplier,
          history: [
            { id: Date.now(), multiplier: newMultiplier, won: true },
            ...history.slice(0, 19),
          ],
        });
      } else {
        set({
          field: newField,
          revealedCount: newRevealedCount,
          currentMultiplier: newMultiplier,
        });
      }

      return 'gem';
    }
  },

  cashout: () => {
    const { phase, betAmount, currentMultiplier, revealedCount, history } = get();

    if (phase !== 'playing' || revealedCount === 0) return 0;

    const winAmount = calculateWin(betAmount, currentMultiplier);
    useBalanceStore.getState().addBalance(winAmount);

    set({
      phase: 'won',
      history: [
        { id: Date.now(), multiplier: currentMultiplier, won: true },
        ...history.slice(0, 19),
      ],
    });

    return winAmount;
  },

  reset: () => {
    const { betAmount } = get();
    const balance = useBalanceStore.getState().balance;

    let newBetAmount = betAmount;
    if (betAmount > balance) {
      newBetAmount = Math.max(MIN_BET, Math.round(balance * 100) / 100);
    }

    set({
      phase: 'idle',
      field: [],
      revealedCount: 0,
      currentMultiplier: 1,
      betAmount: newBetAmount,
    });
  },
}));
