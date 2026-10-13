import { useState } from 'react';

const URLS = {
  pikud: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/OrefPikudLogo.svg/250px-OrefPikudLogo.svg.png',
  college: 'https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/795772139_.png'
};

// Tactical top emblems with live image URLs + graceful fallback.
export default function Emblem({ variant = 'pikud', className = '' }) {
  const [collegeError, setCollegeError] = useState(false);

  if (variant === 'college') {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ height: 60, maxWidth: 260 }}>
        {!collegeError ? (
          <img
            src={URLS.college}
            alt="המכללה הלאומית לאיתנות ישראלית"
            className="relative object-contain"
            style={{ height: 60, maxWidth: 260 }}
            draggable={false}
            onError={() => setCollegeError(true)}
          />
        ) : (
          <div className="flex items-center gap-2 rounded-xl border-2 border-[#00A8E8]/60 bg-[#0a1f3d] px-3 py-1.5 glow-soft-cyan">
            <span className="text-[24px] leading-none">🏛️</span>
            <span className="text-[14px] font-extrabold text-white leading-tight text-right">
              המכללה הלאומית<br />לאיתנות ישראלית
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: 60, height: 60 }}>
        <span className="absolute flex items-center justify-center rounded-xl border-2 border-[#FF6B00]/70 bg-[#0a1f3d] text-[#FF6B00]" style={{ width: 60, height: 60 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" /></svg>
        </span>
        <img
          src={URLS.pikud}
          alt="פיקוד העורף"
          className="relative object-contain"
          style={{ height: 60, width: 60 }}
          draggable={false}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <div className="text-right leading-tight">
        <div className="text-[17px] font-extrabold text-[#FF6B00] text-glow-orange">פיקוד העורף</div>
        <div className="text-[12px] font-semibold text-[#00A8E8]/75">Home Front Command</div>
      </div>
    </div>
  );
}