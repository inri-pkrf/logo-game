import { useState } from 'react';

// Tactical draggable unit logo card. Shows the live emblem image; if it fails
// to load (blocked URL), a styled fallback with an emoji + the unit name keeps
// the game fully playable. The unit NAME is always shown as text.
export default function UnitCard({ unit, dragging, ghost, compact }) {
  const [imgError, setImgError] = useState(false);
  const size = compact ? 64 : 80;

  const visual = (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {unit.img && !imgError ? (
        <img
          src={unit.img}
          alt={unit.name}
          className="relative object-contain"
          style={{ maxWidth: size, maxHeight: size }}
          draggable={false}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-[30px] leading-none">🛡️</span>
      )}
    </div>
  );

  if (compact) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center rounded-lg border-2 border-[#00A8E8]/50 bg-[#0a1f3d] glow-soft-cyan overflow-hidden" style={{ width: size, height: size }}>
          {visual}
        </div>
        <span className="text-[15px] font-extrabold text-white leading-tight max-w-[150px]">{unit.name}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center gap-4 rounded-2xl glass-panel tech-border brackets px-4 py-3 transition-all duration-200 no-touch ${
        dragging ? 'opacity-25' : 'hover:glow-soft-cyan'
      } ${ghost ? 'glow-orange scale-[1.04]' : ''}`}
      style={{ touchAction: 'none' }}
    >
      <div className="flex items-center justify-center rounded-xl border-2 border-[#00A8E8]/45 bg-[#0a1f3d] overflow-hidden" style={{ width: size, height: size }}>
        {visual}
      </div>
      <div className="text-right">
        <div className="text-[18px] font-extrabold text-white leading-tight max-w-[190px]">{unit.name}</div>
        <div className="text-[12px] font-semibold text-[#00A8E8]/70 tracking-wide">פיקוד העורף</div>
      </div>
    </div>
  );
}