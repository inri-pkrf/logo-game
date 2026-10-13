import { motion } from 'framer-motion';

// Tiered medal: gold/silver/bronze by score. Drops in with a spring, then
// gently swings on a loop. The score number and grade label sit in the center.
const TIERS = [
  { min: 90, label: 'מצטיין', color: '#FFD700', edge: '#b8860b', glow: 'rgba(255,215,0,0.6)' },
  { min: 70, label: 'טוב מאוד', color: '#D9DDE3', edge: '#9aa3b2', glow: 'rgba(217,221,227,0.5)' },
  { min: 50, label: 'טוב', color: '#CD7F32', edge: '#8a5520', glow: 'rgba(205,127,50,0.5)' },
  { min: 0, label: 'השתדלת', color: '#8aa0b5', edge: '#5b6b7d', glow: 'rgba(138,160,181,0.4)' }
];

export default function Medal({ score }) {
  const tier = TIERS.find(t => score >= t.min) || TIERS[TIERS.length - 1];
  return (
    <motion.div
      initial={{ y: -150, opacity: 0, rotate: -18 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 130, damping: 9, delay: 0.25 }}
      className="relative flex flex-col items-center"
    >
      {/* ribbon */}
      <div className="flex gap-1 -mb-3 z-0">
        <div style={{ width: 28, height: 58, background: 'linear-gradient(180deg,#FF6B00,#9c4400)', clipPath: 'polygon(0 0,100% 0,100% 100%,50% 78%,0 100%)' }} />
        <div style={{ width: 28, height: 58, background: 'linear-gradient(180deg,#00A8E8,#007aa8)', clipPath: 'polygon(0 0,100% 0,100% 100%,50% 78%,0 100%)' }} />
      </div>

      {/* medal disc */}
      <motion.div
        animate={{ rotate: [0, -7, 7, -4, 4, 0] }}
        transition={{ delay: 1, duration: 1.4, repeat: Infinity, repeatDelay: 2.2 }}
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: 138,
          height: 138,
          background: `radial-gradient(circle at 35% 28%, rgba(255,255,255,0.4), ${tier.color} 45%, ${tier.edge})`,
          boxShadow: `0 0 34px ${tier.glow}, inset 0 0 18px rgba(255,255,255,0.25), inset 0 -6px 14px rgba(0,0,0,0.25)`
        }}
      >
        <div className="flex items-center justify-center rounded-full border-4 border-white/35" style={{ width: 106, height: 106 }}>
          <div className="text-center">
            <div className="font-display text-[42px] leading-none font-bold text-[#0a1f3d] tabular-nums">1</div>
            <div className="text-[12px] font-extrabold text-[#0a1f3d]/75 mt-1">{tier.label}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}