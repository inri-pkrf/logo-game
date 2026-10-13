import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight, Award } from 'lucide-react';
import Header from '@/components/Header';
import { loadSettings, saveSettings, loadBest } from '@/lib/storage';
import { DIFFICULTY_LABELS } from '@/data/gameData';
import { setSoundEnabled, playClick } from '@/lib/sound';

export default function Settings() {
  const navigate = useNavigate();
  const [s, setS] = useState(loadSettings());
  const [best, setBest] = useState(loadBest());

  useEffect(() => { setSoundEnabled(s.sound !== false); }, [s.sound]);

  const update = (patch) => {
    const next = { ...s, ...patch };
    setS(next);
    saveSettings(next);
  };

  const Toggle = ({ on, onClick }) => (
    <button
      onClick={onClick}
      className={`relative rounded-full border-2 transition-all no-touch ${on ? 'bg-[#00A8E8]/20 border-[#00A8E8] glow-soft-cyan' : 'bg-white/5 border-white/20'}`}
      style={{ width: 72, height: 38, touchAction: 'none' }}
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 rounded-full border-2 transition-all ${on ? 'bg-[#00A8E8] border-[#00A8E8] right-2' : 'bg-white/40 border-white/30 right-[34px]'}`}
        style={{ width: 24, height: 24 }}
      />
    </button>
  );

  return (
    <div className="h-full w-full flex flex-col">
      <Header subtitle="תפריט והגדרות" />
      <div className="flex-1 px-12 pb-6 overflow-y-auto">
        <div className="mx-auto max-w-[680px] space-y-4">
          <div className="flex items-center gap-4 rounded-2xl glass-panel p-5 glow-orange">
            <div className="flex items-center justify-center rounded-xl bg-[#FF6B00]/15 border-2 border-[#FF6B00] text-[#FF6B00]" style={{ width: 60, height: 60 }}>
              <Award size={30} />
            </div>
            <div className="text-right flex-1">
              <div className="text-[14px] font-bold text-white/60">שיא אישי</div>
              <div className="font-display text-[34px] font-bold text-[#FF6B00] text-glow-orange leading-none">{best}<span className="text-[18px] text-white/60">/100</span></div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl glass-panel p-5">
            <div className="flex items-center gap-3 text-right">
              {s.sound ? <Volume2 size={26} className="text-[#00A8E8]" /> : <VolumeX size={26} className="text-white/40" />}
              <div>
                <div className="text-[18px] font-extrabold text-white">אפקטים קוליים</div>
                <div className="text-[13px] text-white/55">צלילי משוב עדינים</div>
              </div>
            </div>
            <Toggle on={s.sound} onClick={() => { update({ sound: !s.sound }); if (!s.sound) playClick(); }} />
          </div>

          <div className="rounded-2xl glass-panel p-5">
            <div className="text-[18px] font-extrabold text-white mb-3 text-right">רמת קושי</div>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => update({ difficulty: key })}
                  className={`rounded-xl border-2 py-4 text-[17px] font-extrabold transition-all no-touch ${s.difficulty === key ? 'bg-[#00A8E8]/15 border-[#00A8E8] text-[#00A8E8] glow-soft-cyan' : 'bg-white/5 border-white/15 text-white/65'}`}
                  style={{ touchAction: 'none' }}
                >
                  {label}
                  <span className="block text-[12px] font-medium opacity-60">{key === 'easy' ? '4 יחידות' : key === 'medium' ? '6 יחידות' : '8 יחידות'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl glass-panel p-5 text-right">
            <div className="text-[14px] font-bold text-[#00A8E8] mb-1.5">קרדיטים</div>
            <p className="text-[13px] leading-snug text-white/65">
              משחק חינוכי פרי פיתוח עבור המכללה הלאומית לאיתנות ישראלית, בשיתוף פיקוד העורף. התוכן מותאם להוראת תפקידי ומבנה פיקוד העורף לציבור הרחב.
            </p>
          </div>
        </div>
      </div>

      <div className="px-12 pb-7">
        <button
          onClick={() => navigate('/')}
          className="w-full max-w-[680px] mx-auto flex items-center justify-center gap-2 rounded-full glass border-2 border-[#00A8E8]/40 py-4 text-[17px] font-extrabold text-[#00A8E8] hover:glow-soft-cyan transition-all"
        >
          <ArrowRight size={22} /> חזרה למסך הפתיחה
        </button>
      </div>
    </div>
  );
}