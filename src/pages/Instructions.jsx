import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hand, Target, Lightbulb, CheckCircle2, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

const STEPS = [
  { icon: Hand, title: 'גררו לוגו', text: 'בצד ימין מוצגים לוגואות היחידות. גררו כל לוגו אל תחום האחריות המתאים בצד השני.' },
  { icon: Target, title: 'התאימו לתפקיד', text: 'כל תחום כולל תיאור פעולתי ללא שם היחידה. קראו וזהו איזה לוגו מתאים לתפקיד.' },
  { icon: CheckCircle2, title: 'משוב מיידי', text: 'התאמה נכונה נועלת את הלוגו עם עובדה לימודית. טעות מחזירה את הלוגו עם הסבר.' },
  { icon: Lightbulb, title: 'רמז והתקדמות', text: 'סרגל ההתקדמות מציג כמה הושלמו. נתקעתם? לחצו על כפתור הרמז להדגשת התאמה אפשרית.' }
];

export default function Instructions() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col">
      <Header subtitle="איך משחקים" />
      <div className="flex-1 flex flex-col justify-end px-12 overflow-y-auto">
        <div className="mx-auto max-w-[760px] w-full pb-6">
          <h2 className="text-[32px] font-extrabold text-white mb-1 text-glow-cyan">הוראות המשחק</h2>
          <p className="text-[16px] text-white/55 mb-6">ארבעה צעדים פשוטים להכרת פיקוד העורף</p>

          <div className="grid gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-5 rounded-2xl glass-panel p-5"
                >
                  <div className="flex-shrink-0 flex items-center justify-center rounded-xl bg-[#00A8E8]/10 border-2 border-[#00A8E8]/50 text-[#00A8E8] glow-soft-cyan" style={{ width: 64, height: 64 }}>
                    <Icon size={30} strokeWidth={1.75} />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display text-[14px] font-bold text-[#FF6B00]">צעד {i + 1}</span>
                      <h3 className="text-[20px] font-extrabold text-white">{s.title}</h3>
                    </div>
                    <p className="mt-1.5 text-[15px] leading-snug text-white/70 text-balance">{s.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-12 flex flex-col items-center">
        <button
          onClick={() => navigate('/game')}
          className="w-full max-w-[760px] flex items-center justify-center gap-3 rounded-full bg-[#FF6B00] border-2 border-[#FF6B00] py-5 glow-orange"
        >
          <span className="text-[24px] font-extrabold text-white text-glow-orange">בואו נתחיל לשחק!</span>
          <ArrowLeft size={26} className="text-white" />
        </button>
        <button
          onClick={() => navigate('/')}
          className="mt-3 text-[14px] font-bold text-white/45 hover:text-[#00A8E8]"
        >
          חזרה למסך הפתיחה
        </button>
      </div>

      <div className="flex-1" />
    </div>
  );
}