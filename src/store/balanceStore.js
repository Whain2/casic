import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBalanceStore = create(
  persist(
    (set, get) => ({
      balance: 1000, // demo balance
      
      addBalance: (amount) => {
        const newBalance = Math.round((get().balance + amount) * 100) / 100;
        set({ balance: newBalance });
      },
      
      subtractBalance: (amount) => {
        const current = get().balance;
        if (current < amount) return false;
        
        const newBalance = Math.round((current - amount) * 100) / 100;
        set({ balance: newBalance });
        return true;
      },
      
      setBalance: (amount) => {
        set({ balance: Math.round(amount * 100) / 100 });
      },
      
      resetBalance: () => {
        set({ balance: 1000 });
      },
    }),
    {
      name: 'mines-balance', // localStorage key
    }
  )
);
