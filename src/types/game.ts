export type CategoryType = 'noun' | 'verb' | 'particle' | 'prophet';

export type CardContentType = 'quran_vocab' | 'visual_symbols' | 'hybrid';

export interface WordPair {
  id: string;
  arabic: string;
  english: string;
  transliteration?: string;
  category: CategoryType;
  surahReference?: string;
}

export interface SymbolPair {
  id: string;
  name: string;
  arabicLabel: string;
  englishLabel: string;
  iconKey: string;
  color: string; // Tailored accent color
}

export type CardType = 'arabic' | 'english' | 'symbol_a' | 'symbol_b' | 'hybrid_symbol' | 'hybrid_word';

export interface CardItem {
  id: string;
  pairId: string;
  type: CardType;
  mainText?: string;
  subText?: string;
  iconKey?: string;
  accentColor?: string;
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
