export interface UserStats {
  highScore: number;
  bestStreak: number;
  gamesPlayed: number;
  gamesWon: number;
  totalMatchedPairs: number;
}

const STORAGE_KEY = 'tamaam_user_stats_v1';

const defaultStats: UserStats = {
  highScore: 0,
  bestStreak: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  totalMatchedPairs: 0,
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats;
    return { ...defaultStats, ...JSON.parse(raw) };
  } catch (e) {
    return defaultStats;
  }
}

export function saveGameEndStats(score: number, streak: number, isWon: boolean, matchedPairs: number): UserStats {
  const current = loadUserStats();
  const updated: UserStats = {
    highScore: Math.max(current.highScore, score),
    bestStreak: Math.max(current.bestStreak, streak),
    gamesPlayed: current.gamesPlayed + 1,
    gamesWon: current.gamesWon + (isWon ? 1 : 0),
    totalMatchedPairs: current.totalMatchedPairs + matchedPairs,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    // Ignore storage quota errors
  }

  return updated;
}
