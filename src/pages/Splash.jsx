import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, HelpCircle, Settings, ShieldCheck } from 'lucide-react';
import Emblem from '@/components/Emblem';
import HomeButton from '@/components/HomeButton';
import { loadSettings } from '@/lib/storage';
import { setSoundEnabled } from '@/lib/sound';
import { useEffect } from 'react';

const HERO = 'https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/4e677f23b_generated_image.png';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const s = loadSettings();
    setSoundEnabled(s.sound !== false);
    if (s.highContrast) document.documentElement.classList.add('hc');
    else document.documentElement.classList.remove('hc');
  }, []);

  return (
    <div className="h-full w-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-10 pt-6">
        <Emblem variant="pikud" />
        <Emblem variant="college" />
      </div>

      {/* centered: image + title + CTA + micro copy */}
      <div className="flex-1 flex flex-col items-center justify-center px-12 text-center gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#00A8E8]/40 glow-cyan"
        >
          <img src={HERO} alt="חמל פיקוד העורף" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A24] via-transparent to-transparent" />
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full glass-strong border border-[#00A8E8]/40 px-4 py-1.5">
            <ShieldCheck size={18} className="text-[#00A8E8]" />
            <span className="text-[13px] font-extrabold text-white tracking-wide">איתנות לאומית</span>
          </div>
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[44px] font-bold tracking-wider text-white text-glow-cyan uppercase"
          >
            לוגו של אחריות
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-[18px] font-medium text-white/70 max-w-[480px] leading-relaxed text-balance mx-auto"
          >
            הכירו את יחידות ומחלקות פיקוד העורף — גררו כל לוגו אל תחום האחריות הנכון וגלו את התפקידים שמגנים על העורף האזרחי.
          </motion.p>
        </div>

        <motion.button
          onClick={() => navigate('/game')}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="animate-breathe flex items-center gap-3 rounded-full bg-[#FF6B00] border-2 border-[#FF6B00] px-12 py-5"
        >
          <Play size={30} className="text-white" fill="#ffffff" />
          <span className="text-[26px] font-extrabold text-white text-glow-orange">האם אתם מוכנים?</span>
        </motion.button>

        <p className="text-[13px] font-medium text-[#00A8E8]/70 tracking-wide">גררו · התאימו · למדו — 8 יחידות פיקוד העורף מחכות לכם</p>
      </div>

      {/* bottom: secondary actions + home */}
      <div className="flex flex-col items-center px-12 text-center pb-6 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/instructions')}
            className="flex items-center gap-2 rounded-full glass px-5 py-2.5 text-[15px] font-bold text-[#00A8E8] hover:glow-soft-cyan transition-all"
          >
            <HelpCircle size={18} /> איך משחקים
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 rounded-full glass px-5 py-2.5 text-[15px] font-bold text-[#00A8E8] hover:glow-soft-cyan transition-all"
          >
            <Settings size={18} /> הגדרות
          </button>
        </div>
        <HomeButton />
      </div>

      <footer className="px-10 pb-5 text-center">
        <p className="text-[12px] font-medium text-white/40 tracking-wide">
          המכללה הלאומית לאיתנות ישראלית · בשיתוף פיקוד העורף
        </p>
      </footer>
    </div>
  );
}