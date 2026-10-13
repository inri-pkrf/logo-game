import { motion } from 'framer-motion';

// Neon particle burst on a correct drop.
const PARTICLES = Array.from({ length: 18 });

export default function Sparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-20">
      {PARTICLES.map((_, i) => {
        const angle = (i / PARTICLES.length) * Math.PI * 2;
        const dist = 60 + (i % 3) * 28;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        const cyan = i % 2 === 0;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: 9, height: 9,
              backgroundColor: cyan ? '#00A8E8' : '#FF6B00',
              boxShadow: cyan ? '0 0 10px #00A8E8' : '0 0 10px #FF6B00'
            }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x, y, scale: 0.2 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}