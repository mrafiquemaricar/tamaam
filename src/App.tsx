import { useState, useEffect, useRef, useCallback } from 'react';
import { CardItem, GameMode, GameStatus, GameStats, CardContentType } from './types/game';
import { generateGameCards } from './data/wordBank';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { StartScreen } from './components/StartScreen';
import { ResultModal } from './components/ResultModal';
import { WordBankModal } from './components/WordBankModal';
import { soundManager } from './utils/sound';
import { hapticPatterns, triggerHaptic } from './utils/haptics';
import { loadUserStats, saveGameEndStats, UserStats } from './utils/storage';

export function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [gameMode, setGameMode] = useState<GameMode>(60);
  const [cardContentType, setCardContentType] = useState<CardContentType>('quran_vocab');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getIsMuted());
  const [isWordBankOpen, setIsWordBankOpen] = useState<boolean>(false);
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats());

  // Round Gameplay Metrics
  const [pairsMatched, setPairsMatched] = useState<number>(0);
  const [mismatches, setMismatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize a fresh game session
  const initGame = useCallback((mode: GameMode = gameMode, type: CardContentType = cardContentType) => {
    const totalPairs = 12;
    const newCards = generateGameCards(totalPairs, type);
    setCards(newCards);
    setPairsMatched(0);
    setMismatches(0);
    setMoves(0);
    setStreak(0);
    setBestStreak(0);

    const initialTime = mode === 'zen' ? 9999 : (mode as number);
    setTimeRemaining(initialTime);
    setGameStatus('playing');
  }, [gameMode, cardContentType]);

  // Handle Timer Countdown Loop
  useEffect(() => {
    if (gameStatus === 'playing' && gameMode !== 'zen') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setGameStatus('gameover');
            soundManager.playMismatch();
            triggerHaptic(hapticPatterns.mismatch);
            return 0;
          }
          if (prev <= 11) {
            soundManager.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, gameMode]);

  // Handle Match Event from GameBoard
  const handleMatch = (_pairId: string) => {
    setPairsMatched((prevMatched) => {
      const nextMatched = prevMatched + 1;
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      setMoves((m) => m + 1);

      // Check if all 12 pairs collected -> Victory!
      if (nextMatched === 12) {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameStatus('completed');
        soundManager.playVictory();
        triggerHaptic(hapticPatterns.victory);

        // Save round stats
        const timeBonus = gameMode === 'zen' ? 0 : timeRemaining * 10;
        const roundScore = nextMatched * 100 + timeBonus;
        const updated = saveGameEndStats(roundScore, Math.max(bestStreak, nextStreak), true, nextMatched);
        setUserStats(updated);
      }

      return nextMatched;
    });
  };

  // Handle Mismatch Event from GameBoard
  const handleMismatch = () => {
    setMismatches((prev) => prev + 1);
    setMoves((m) => m + 1);
    setStreak(0);
  };

  // Save Stats when Game Over (timer ran out)
  useEffect(() => {
    if (gameStatus === 'gameover') {
      const roundScore = pairsMatched * 100;
      const updated = saveGameEndStats(roundScore, bestStreak, false, pairsMatched);
      setUserStats(updated);
    }
  }, [gameStatus, pairsMatched, bestStreak]);

  // Toggle Mute Audio
  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Toggle Pause
  const handleTogglePause = () => {
    if (gameStatus === 'playing') {
      setGameStatus('paused');
    } else if (gameStatus === 'paused') {
      setGameStatus('playing');
    }
  };

  // Derived Game Statistics
  const totalPairs = 12;
  const accuracy = moves > 0 ? Math.round((pairsMatched / moves) * 100) : 100;
  const timeTotal = gameMode === 'zen' ? 0 : (gameMode as number);
  const timeBonus = gameMode === 'zen' ? 0 : timeRemaining * 10;
  const score = pairsMatched * 100 + (gameStatus === 'completed' ? timeBonus : 0);

  const stats: GameStats = {
    pairsMatched,
    totalPairs,
    mismatches,
    moves,
    streak,
    bestStreak,
    timeRemaining,
    timeTotal,
    score,
    accuracy,
  };

  return (
    <div className="w-full h-full flex flex-col bg-mesh-radial text-slate-100 overflow-hidden relative font-sans">
      {/* Background Subtle Geometric Watermark */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

      {/* IDLE / START SCREEN */}
      {gameStatus === 'idle' && (
        <StartScreen
          selectedMode={gameMode}
          selectedContentType={cardContentType}
          onSelectMode={(mode) => setGameMode(mode)}
          onSelectContentType={(type) => setCardContentType(type)}
          onStartGame={() => initGame(gameMode, cardContentType)}
          onOpenWordBank={() => setIsWordBankOpen(true)}
          stats={userStats}
        />
      )}

      {/* ACTIVE PLAYING / PAUSED / ENDGAME SCREEN */}
      {gameStatus !== 'idle' && (
        <div className="w-full h-full flex flex-col justify-between overflow-hidden z-10">
          <Header
            stats={stats}
            mode={gameMode}
            isPaused={gameStatus === 'paused'}
            isMuted={isMuted}
            onTogglePause={handleTogglePause}
            onToggleMute={handleToggleMute}
            onRestart={() => setGameStatus('idle')}
          />

          <main className="flex-1 relative min-h-0 overflow-hidden">
            <GameBoard
              cards={cards}
              onMatch={handleMatch}
              onMismatch={handleMismatch}
              isPaused={gameStatus === 'paused'}
            />

            {/* PAUSE OVERLAY */}
            {gameStatus === 'paused' && (
              <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 space-y-4">
                <h3 className="text-2xl font-bold text-amber-300">Game Paused</h3>
                <p className="text-xs text-slate-400">Take a breath & resume whenever you're ready.</p>
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setGameStatus('idle')}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Main Menu
                  </button>
                  <button
                    onClick={handleTogglePause}
                    className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs shadow-lg"
                  >
                    Resume Game
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* END-OF-ROUND RESULT MODAL */}
      {(gameStatus === 'completed' || gameStatus === 'gameover') && (
        <ResultModal
          stats={stats}
          mode={gameMode}
          cards={cards}
          onPlayAgain={() => initGame(gameMode, cardContentType)}
          onChangeMode={() => setGameStatus('idle')}
        />
      )}

      {/* DICTIONARY / WORD BANK MODAL */}
      {isWordBankOpen && (
        <WordBankModal onClose={() => setIsWordBankOpen(false)} />
      )}
    </div>
  );
}
