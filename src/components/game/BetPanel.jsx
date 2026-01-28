import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore.js';
import { useBalanceStore } from '../../store/balanceStore.js';
import { useCanBet, useCanCashout, usePotentialWin } from '../../store/selectors.js';
import { Bomb, Coins, Sparkles, RotateCcw, Zap } from '../icons/index.jsx';
import { MIN_BET, MINE_OPTIONS } from '../../lib/constants.js';
import { cn } from '../../lib/cn.js';

export function BetPanel() {
  // game state
  const phase = useGameStore(s => s.phase);
  const betAmount = useGameStore(s => s.betAmount);
  const setBetAmount = useGameStore(s => s.setBetAmount);
  const mineCount = useGameStore(s => s.mineCount);
  const setMineCount = useGameStore(s => s.setMineCount);
  const startGame = useGameStore(s => s.startGame);
  const cashout = useGameStore(s => s.cashout);
  const reset = useGameStore(s => s.reset);
  const field = useGameStore(s => s.field);
  const clickCell = useGameStore(s => s.clickCell);

  const balance = useBalanceStore(s => s.balance);

  const potentialWin = usePotentialWin();
  const canBet = useCanBet();
  const canCashout = useCanCashout();

  const isIdle = phase === 'idle';
  const isPlaying = phase === 'playing';
  const isFinished = phase === 'won' || phase === 'lost';

  const [betInput, setBetInput] = useState(betAmount.toString());
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    setBetInput(betAmount.toString());
  }, [betAmount]);

  // manual bet input
  const handleBetInputChange = (e) => {
    let value = e.target.value.replace(',', '.');

    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBetInput(value);
      setInputError('');

      if (value !== '' && value !== '.') {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          if (numValue < MIN_BET) {
            setInputError(`Мин. ставка: ${MIN_BET}`);
          } else if (numValue > balance) {
            setInputError('Недостаточно средств');
          }
        }
      }
    }
  };

  // apply bet input 
  const handleBetInputBlur = () => {
    const numValue = parseFloat(betInput);
    if (!isNaN(numValue) && numValue >= MIN_BET) {
      setBetAmount(Math.min(numValue, balance));
    } else {
      setBetInput(betAmount.toString());
    }
    setInputError('');
  };

  const handleBetInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBetInputBlur();
      e.target.blur();
    }
  };

  const handleStartGame = () => {
    const success = startGame();
    if (!success) {
      alert('Недостаточно средств!');
    }
  };

  const handleAutoSelect = () => {
    if (phase !== 'playing') return;

    const hiddenCells = field.filter(cell => cell.state === 'hidden');
    if (hiddenCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * hiddenCells.length);
    const cellToClick = hiddenCells[randomIndex];
    clickCell(cellToClick.id);
  };

  return (
    <div
      className="flex flex-col w-[400px] rounded-xl overflow-hidden"
      style={{ backgroundColor: '#1C1F2E' }}
    >
      <div className="p-5 rounded-lg m-2" style={{ backgroundColor: '#22273A' }}>
        <div className="text-slate-400 text-sm mb-3">Количество мин</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white min-w-[50px]">
            <Bomb className="w-4 h-4 text-red-500" />
            <span className="font-bold">{mineCount}</span>
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            {MINE_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setMineCount(option)}
                disabled={!isIdle}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-bold transition-all',
                  mineCount === option
                    ? 'bg-amber-500 text-black'
                    : 'text-slate-300 hover:brightness-110',
                  !isIdle && 'opacity-50 cursor-not-allowed'
                )}
                style={{
                  backgroundColor: mineCount === option ? undefined : '#2E3549'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-lg mx-2" style={{ backgroundColor: '#22273A' }}>
        <div className="text-slate-400 text-sm mb-3">Ставка</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white min-w-[80px]">
            <Coins className="w-4 h-4 text-amber-400" />
            <input
              type="text"
              value={betInput}
              onChange={handleBetInputChange}
              onBlur={handleBetInputBlur}
              onKeyDown={handleBetInputKeyDown}
              disabled={!isIdle}
              className={cn(
                'w-16 bg-transparent border-b border-slate-500 text-white font-bold outline-none focus:border-amber-400 transition-colors',
                !isIdle && 'opacity-50 cursor-not-allowed'
              )}
              placeholder="0.1"
            />
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <button
              onClick={() => setBetAmount(Math.max(MIN_BET, betAmount / 2))}
              disabled={!isIdle}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-slate-300 hover:brightness-110',
                !isIdle && 'opacity-50 cursor-not-allowed'
              )}
              style={{ backgroundColor: '#2E3549' }}
            >
              1/2
            </button>
            <button
              onClick={() => setBetAmount(Math.min(balance, betAmount * 2))}
              disabled={!isIdle}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-slate-300 hover:brightness-110',
                !isIdle && 'opacity-50 cursor-not-allowed'
              )}
              style={{ backgroundColor: '#2E3549' }}
            >
              x2
            </button>
            <button
              onClick={() => setBetAmount(MIN_BET)}
              disabled={!isIdle}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-slate-300 hover:brightness-110',
                !isIdle && 'opacity-50 cursor-not-allowed'
              )}
              style={{ backgroundColor: '#2E3549' }}
            >
              min
            </button>
            <button
              onClick={() => setBetAmount(balance)}
              disabled={!isIdle}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-slate-300 hover:brightness-110',
                !isIdle && 'opacity-50 cursor-not-allowed'
              )}
              style={{ backgroundColor: '#2E3549' }}
            >
              max
            </button>
          </div>
        </div>
        {inputError && (
          <div className="text-red-400 text-xs mt-2">{inputError}</div>
        )}
      </div>

      <div className="p-4 space-y-3">
        {isIdle && (
          <>
            <button
              onClick={handleStartGame}
              disabled={!canBet}
              className={cn(
                'w-full py-4 rounded-xl font-bold text-lg transition-all text-white hover:brightness-110',
                !canBet && 'opacity-50 cursor-not-allowed'
              )}
              style={{ backgroundColor: '#3D89FE' }}
            >
              Играть
            </button>
            <button
              disabled={true}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all text-white opacity-50 cursor-not-allowed"
              style={{ backgroundColor: '#B3803D' }}
            >
              Авто-выбор
            </button>
          </>
        )}

        {isPlaying && (
          <>
            <button
              onClick={cashout}
              disabled={!canCashout}
              className={cn(
                'w-full py-4 rounded-xl font-bold text-lg transition-all',
                'bg-emerald-500 hover:bg-emerald-600 text-white',
                !canCashout && 'opacity-50 cursor-not-allowed'
              )}
            >
              Забрать ${potentialWin.toFixed(2)}
            </button>
            <button
              onClick={handleAutoSelect}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all text-white hover:brightness-110"
              style={{ backgroundColor: '#B3803D' }}
            >
              Авто-выбор
            </button>
          </>
        )}

        {isFinished && (
          <div className="space-y-3">
            {phase === 'won' && (
              <div className="p-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-center">
                <Sparkles className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-emerald-400 font-bold text-xl">${potentialWin.toFixed(2)}</div>
              </div>
            )}
            {phase === 'lost' && (
              <div className="p-4 bg-red-500/20 rounded-xl border border-red-500/30 text-center">
                <Zap className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-red-400 font-bold">Вы проиграли</div>
              </div>
            )}
            <button
              onClick={reset}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all text-white flex items-center justify-center gap-2 hover:brightness-110"
              style={{ backgroundColor: '#3D89FE' }}
            >
              <RotateCcw className="w-5 h-5" />
              Новая игра
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
