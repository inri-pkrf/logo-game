import { useState } from 'react';
import { Check, CornerDownLeft } from 'lucide-react';

// Small logo image shown inside a zone's drop slot once matched correctly.
function SlotLogo({ unit }) {
  const [err, setErr] = useState(false);
  return (
    <div className="flex items-center justify-center" style={{ width: 72, height: 72 }}>
      {unit.img && !err ? (
        <img
          src={unit.img}
          alt={unit.name}
          className="object-contain"
          style={{ maxWidth: 72, maxHeight: 72 }}
          draggable={false}
          onError={() => setErr(true)}
        />
      ) : (
        <span className="text-[26px] leading-none">🛡️</span>
      )}
    </div>
  );
}

// Tactical glass drop zone with a spoiler-free functional definition.
// Hover is always neutral (never reveals correct/wrong) — feedback appears
// only after the drop. On a correct match the unit title is revealed.
export default function ZoneCard({ zone, hover, placedUnit, correct, feedback, sparkle }) {
  const wrong = feedback?.type === 'wrong' && feedback?.zoneId === zone.id;

  const ring = correct
    ? 'tech-border-cyan glow-cyan'
    : wrong
      ? 'border-2 border-[#FF6B00] glow-orange animate-shake'
      : hover
        ? 'border-2 border-[#00A8E8]/70 glow-soft-cyan'
        : 'tech-border';

  return (
    <div className={`relative rounded-2xl glass-panel brackets p-3 transition-all duration-300 overflow-hidden ${ring}`}>
      {correct && <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(0,168,232,0.12), transparent 60%)' }} />}

      <div className="relative flex items-stretch gap-3">
        {/* slot */}
        <div
          className={`flex-shrink-0 flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${
            placedUnit
              ? 'border-transparent bg-transparent'
              : hover
                ? 'border-[#00A8E8] bg-[#00A8E8]/10'
                : 'border-dashed border-[#00A8E8]/30 bg-[#0a1f3d]/50'
          }`}
          style={{ width: 88, height: 88 }}
        >
          {placedUnit ? (
            <div className="relative">
              <SlotLogo unit={placedUnit} />
              <span className="absolute -top-2 -left-2 flex items-center justify-center rounded-full bg-[#00A8E8] text-[#07162c] glow-cyan" style={{ width: 28, height: 28 }}>
                <Check size={16} strokeWidth={3.5} />
              </span>
            </div>
          ) : (
            <CornerDownLeft size={24} className="text-[#00A8E8]/40" strokeWidth={1.75} />
          )}
        </div>

        {/* text */}
        <div className="flex-1 min-w-0 text-right flex flex-col justify-center">
          {correct && (
            <h3 className="text-[18px] font-extrabold text-[#00A8E8] leading-tight mb-0.5 animate-reveal">{zone.title}</h3>
          )}
          <p className="text-[15px] leading-snug text-white/80 text-balance">{zone.definition}</p>
          {wrong && feedback?.message && (
            <div className="mt-1 rounded-lg bg-[#FF6B00]/15 border border-[#FF6B00]/50 px-2.5 py-1 animate-reveal self-end">
              <span className="text-[13px] font-bold text-[#FF6B00] leading-snug">{feedback.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}