export type CategoryType = 'noun' | 'verb' | 'particle' | 'prophet';

export interface WordPair {
  id: string;
  arabic: string;
  english: string;
  transliteration?: string;
  category: CategoryType;
  surahReference?: string;
}

export type CardType = 'arabic' | 'english';

export interface CardItem {
  id: string;
  pairId: string;
  type: CardType;
  mainText: string;
  subText: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type GameMode = 60 | 90 | 45 | 'zen';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'completed' | 'gameover';

export interface GameStats {
  pairsMatched: number;
  totalPairs: number;
  mismatches: number;
  moves: number;
  streak: number;
  bestStreak: number;
  timeRemaining: number;
  timeTotal: number;
  score: number;
  accuracy: number;
}
