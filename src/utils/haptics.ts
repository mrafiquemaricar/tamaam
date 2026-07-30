export function triggerHaptic(pattern: number | number[] = 15) {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore haptic errors on unsupported hardware
    }
  }
}

export const hapticPatterns = {
  tap: 10,
  flip: 15,
  match: [30, 40, 50],
  mismatch: [40, 30, 40],
  victory: [50, 50, 50, 50, 100]
};
