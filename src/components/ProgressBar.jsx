import { Check } from 'lucide-react';

export default function ProgressBar({ completed, total, elapsed }) {
  const pct = total ? (completed / total) * 100 : 0;
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[66px] leading-none font-bold text-[#00A8E8] text-glow-cyan tabular-nums">{completed}</span>
          <span className="text-[26px] font-bold text-white/55">מתוך {total} הושלמו</span>
        </div>
        <div className="flex items-center gap-2 rounded-full glass px-4 py-2">
          <span className="font-display text-[22px] font-semibold text-[#FF6B00] tabular-nums">⏱ {mm}:{ss}</span>
        </div>
      </div>
      <div className="h-4 w-full rounded-full bg-white/8 overflow-hidden border border-[#00A8E8]/15">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #00A8E8, #FF6B00, #FF6B00)', boxShadow: '0 0 16px rgba(255,107,0,0.55)' }}
        />
      </div>
      <div className="mt-3.5 flex gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${i < completed ? 'bg-[#00A8E8] glow-soft-cyan' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
}