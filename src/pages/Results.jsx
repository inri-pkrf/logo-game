import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import HomeButton from '@/components/HomeButton';
import Medal from '@/components/Medal';
import { getPairs } from '@/data/gameData';
import { loadSettings, loadBest, saveBest } from '@/lib/storage';
import confetti from 'canvas-confetti';

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const st = location.state || {};
  const settings = loadSettings();
  const pairs = st.pairs || getPairs(st.difficulty || settings.difficulty);

  const score = st.score ?? 0;
  const correctFirstTry = st.correctFirstTry ?? 0;
  const total = st.total ?? pairs.length;
  const elapsed = st.elapsed ?? 0;

  const [best, setBest] = useState(loadBest());
  useEffect(() => {
    if (score > best) { saveBest(score); setBest(score); }
  }, []);

  useEffect(() => {
    const colors = ['#00A8E8', '#FF6B00', '#ffffff', '#22c55e'];
    const burst = (x, y) => confetti({ particleCount: 90, spread: 75, startVelocity: 45, origin: { x, y }, colors, scalar: 1.1 });
    burst(0.18, 0.7);
    burst(0.82, 0.7);
    const t1 = setTimeout(() => burst(0.5, 0.55), 350);
    const t2 = setTimeout(() => confetti({ particleCount: 60, spread: 100, startVelocity: 35, origin: { x: 0.5, y: 0.5 }, colors }), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');
  const isPerfect = score >= 90;
  const grade = score >= 90 ? 'מצטיין' : score >= 70 ? 'טוב מאוד' : score >= 50 ? 'טוב' : 'השתדלת';
  const today = new Date().toLocaleDateString('he-IL');

  return (
    <div className="h-full w-full flex flex-col animate-fade-in">
      <Header subtitle="סיכום ותעודה" />
      <div className="flex-1 px-12 pb-6 overflow-y-auto">
        <div className="mx-auto max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl glass-panel p-5 text-center glow-cyan"
          >
            <div className="flex items-center justify-center gap-2 text-[#00A8E8]">
              <Sparkles size={22} />
              <span className="text-[15px] font-bold tracking-wide">ברוך הבא, תושב ישראל</span>
              <Sparkles size={22} />
            </div>
            <p className="mt-2.5 text-[22px] font-extrabold text-white leading-snug text-balance">
              השלמת {correctFirstTry} מתוך {total} משימות פיקוד העורף בהצלחה.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-4 relative rounded-2xl glass-panel p-6 overflow-hidden border-2 border-[#00A8E8]/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award size={24} className="text-[#FF6B00]" />
                <span className="font-display text-[15px] font-bold text-[#00A8E8] tracking-widest uppercase">תעודת הכרה</span>
              </div>
              <span className="text-[13px] font-medium text-white/50">{today}</span>
            </div>

            <div className="my-5 flex flex-col items-center justify-center gap-3">
              <Medal score={score} />
              <div className="text-center">
                <div className="text-[26px] font-extrabold text-white text-glow-cyan">{grade}</div>
                <div className="mt-1.5 flex items-center justify-center gap-5 text-[15px] font-semibold text-white/65">
                  <span>⏱ {mm}:{ss}</span>
                  <span>✓ {correctFirstTry}/{total} בניסיון ראשון</span>
                </div>
                {best > 0 && <div className="mt-1.5 text-[13px] font-medium text-[#FF6B00]">שיא אישי: {best}/100</div>}
              </div>
            </div>

            {/* action buttons — moved up, right under the medal */}
            <div className="mt-2">
              <p className="text-center text-[13px] font-medium text-[#00A8E8]/60 tracking-wide mb-3">כל ניסיון מקרב אתכם להכרה מלאה של פיקוד העורף</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/game')}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#FF6B00] border-2 border-[#FF6B00] py-4 text-[18px] font-extrabold text-white glow-orange"
                >
                  <RotateCcw size={22} /> שחק שוב
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center gap-2 rounded-full glass border-2 border-[#00A8E8]/40 py-4 text-[18px] font-extrabold text-[#00A8E8] hover:glow-soft-cyan transition-all"
                >
                  <Home size={22} /> למסך הפתיחה
                </button>
              </div>
              <div className="mt-3 flex justify-center">
                <HomeButton />
              </div>
            </div>
          </motion.div>

          <div className="mt-5">
            <h3 className="text-[18px] font-extrabold text-white mb-2.5 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#00A8E8]" /> סיכום לימודי
            </h3>
            <div className="space-y-2.5">
              {pairs.map((p, i) => {
                return (
                  <motion.div
                    key={p.unit.id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex items-start gap-3.5 rounded-xl glass p-3.5"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center rounded-lg bg-[#0a1f3d] border-2 border-[#00A8E8]/50 overflow-hidden" style={{ width: 48, height: 48 }}>
                      {p.unit.img && <img src={p.unit.img} alt={p.unit.name} className="object-contain" style={{ maxWidth: 44, maxHeight: 44 }} draggable={false} />}
                    </div>
                    <div className="text-right flex-1 min-w-0">
                      <div className="text-[16px] font-extrabold text-white">{p.unit.name}</div>
                      <div className="mt-0.5 text-[13px] leading-snug text-white/65">{p.zone.definition}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {isPerfect && (
            <div className="mt-4 rounded-xl bg-[#FF6B00]/15 border-2 border-[#FF6B00] p-3.5 text-center glow-orange">
              <span className="text-[16px] font-extrabold text-[#FF6B00] text-glow-orange">כל הכבוד! הכרתם היטב את פיקוד העורף 🛡️</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}