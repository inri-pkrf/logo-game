const SETTINGS_KEY = 'pikudGameSettings';
const BEST_KEY = 'pikudBestScore';

export const DEFAULT_SETTINGS = {
  sound: true,
  difficulty: 'medium',
  highContrast: false
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return { ...DEFAULT_SETTINGS, ...(raw ? JSON.parse(raw) : {}) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch {}
}

export function loadBest() {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; }
}

export function saveBest(v) {
  try { localStorage.setItem(BEST_KEY, String(Math.max(v, loadBest()))); } catch {}
}