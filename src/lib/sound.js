// Lightweight Web Audio sound effects — no external files, kiosk-friendly.
let ctx = null;
let enabled = true;

export function setSoundEnabled(v) { enabled = !!v; }

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) ctx = new AC();
  }
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, dur, gain = 0.16, type = 'sine') {
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g);
  g.connect(c.destination);
  const t0 = c.currentTime + start;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

export function playCorrect() {
  if (!enabled) return;
  tone(660, 0, 0.28);
  tone(880, 0.12, 0.34);
}

export function playWrong() {
  if (!enabled) return;
  tone(220, 0, 0.18, 0.22, 'square');
  tone(160, 0.15, 0.26, 0.20, 'square');
}

export function playWin() {
  if (!enabled) return;
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.42, 0.15));
}

export function playClick() {
  if (!enabled) return;
  tone(440, 0, 0.08, 0.06);
}