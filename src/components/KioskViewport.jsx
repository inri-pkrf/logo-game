import { useEffect, useState } from 'react';

// Strict 1080x1920 portrait canvas that auto-scales to fit any physical kiosk
// screen via CSS transform: scale(), with no scrollbars or edge clipping.
const VW = 1080;
const VH = 1920;

export default function KioskViewport({ children }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function fit() {
      const s = Math.min(window.innerWidth / VW, window.innerHeight / VH);
      setScale(s > 0 ? s : 1);
    }
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);
    return () => {
      window.removeEventListener('resize', fit);
      window.removeEventListener('orientationchange', fit);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: '#040d1c' }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 16%, rgba(0,168,232,0.10), transparent 55%), radial-gradient(circle at 50% 88%, rgba(255,107,0,0.14), transparent 55%)'
      }} />
      <div
        id="base44-viewport"
        className="relative overflow-hidden"
        style={{
          width: VW,
          height: VH,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          background: 'linear-gradient(180deg, #050d1a 0%, #0a1830 52%, #050d1a 100%)'
        }}
      >
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="absolute inset-0 scanline pointer-events-none" />

        {/* radar grid + crosshair motif */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: 0.12 }}>
          <svg width="1000" height="1000" viewBox="0 0 1000 1000" fill="none">
            <circle cx="500" cy="500" r="140" stroke="#00A8E8" strokeWidth="1.5" />
            <circle cx="500" cy="500" r="280" stroke="#00A8E8" strokeWidth="1.5" />
            <circle cx="500" cy="500" r="420" stroke="#00A8E8" strokeWidth="1.5" />
            <line x1="500" y1="60" x2="500" y2="940" stroke="#00A8E8" strokeWidth="1" />
            <line x1="60" y1="500" x2="940" y2="500" stroke="#00A8E8" strokeWidth="1" />
            <line x1="180" y1="180" x2="820" y2="820" stroke="#00A8E8" strokeWidth="0.8" />
            <line x1="820" y1="180" x2="180" y2="820" stroke="#00A8E8" strokeWidth="0.8" />
          </svg>
        </div>

        {/* corner crosshair brackets */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-6 left-6 w-14 h-14 border-l-2 border-t-2 border-[#FF6B00]/50" />
          <div className="absolute top-6 right-6 w-14 h-14 border-r-2 border-t-2 border-[#FF6B00]/50" />
          <div className="absolute bottom-6 left-6 w-14 h-14 border-l-2 border-b-2 border-[#FF6B00]/50" />
          <div className="absolute bottom-6 right-6 w-14 h-14 border-r-2 border-b-2 border-[#FF6B00]/50" />
        </div>

        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  );
}