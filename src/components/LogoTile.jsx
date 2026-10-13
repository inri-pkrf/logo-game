import { useState } from 'react';

// Prominent draggable logo card for the bottom bank. Large logo image with the
// unit name beneath, subtle drop shadow + lift on hover so it reads as a
// grabbable card. Shows a styled emoji fallback if the image is blocked.
export default function LogoTile({ unit, dragging, ghost }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className={`group flex flex-col items-center gap-1.5 rounded-2xl px-2.5 py-2 transition-all duration-200 no-touch ${
        ghost
          ? 'border-2 border-[#FF6B00] glow-orange bg-[#0a1f3d]'
          : 'border border-[#00A8E8]/35 bg-gradient-to-b from-[#0e2747] to-[#0a1f3d] hover:border-[#00A8E8] hover:-translate-y-1'
      } ${dragging ? 'opacity-30' : ''}`}
      style={{
        width: 124,
        touchAction: 'none',
        boxShadow: ghost ? undefined : '0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(0,168,232,0.12)'
      }}
    >
      <div className="flex items-center justify-center rounded-xl bg-[#07162c] border border-[#00A8E8]/20 overflow-hidden" style={{ width: 84, height: 84 }}>
        {unit.img && !imgError ? (
          <img
            src={unit.img}
            alt={unit.name}
            className="object-contain"
            style={{ maxWidth: 80, maxHeight: 80 }}
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-[30px] leading-none">🛡️</span>
        )}
      </div>
      <span className="text-[15px] font-extrabold text-white text-center leading-tight max-w-[116px]">{unit.name}</span>
    </div>
  );
}