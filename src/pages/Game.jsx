import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, Home, CheckCircle2, X } from 'lucide-react';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import ZoneCard from '@/components/ZoneCard';
import LogoTile from '@/components/LogoTile';
import Sparkles from '@/components/Sparkles';
import HomeButton from '@/components/HomeButton';
import { getPairs } from '@/data/gameData';
import { loadSettings, saveBest, loadBest } from '@/lib/storage';
import { playCorrect, playWrong, playWin, setSoundEnabled } from '@/lib/sound';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Convert screen (client) coords to the local 1080x1920 viewport coordinate
// space, because #app-viewport is CSS-scaled and becomes the containing
// block for absolutely-positioned children.
function toLocal(clientX, clientY) {
  const vp = document.getElementById('app-viewport');
  if (!vp) return { x: clientX, y: clientY };
  const r = vp.getBoundingClientRect();
  const s = (r.width / 1080) || 1;
  return { x: (clientX - r.left) / s, y: (clientY - r.top) / s };
}

export default function Game() {
  const navigate = useNavigate();
  const settings = loadSettings();
  const difficulty = 'medium';
  const soundOn = settings.sound !== false;

  useEffect(() => { setSoundEnabled(soundOn); }, [soundOn]);

  const pairs = useMemo(() => getPairs(difficulty), [difficulty]);
  const unitsById = useMemo(() => Object.fromEntries(pairs.map(p => [p.unit.id, p.unit])), [pairs]);
  const zonesById = useMemo(() => Object.fromEntries(pairs.map(p => [p.zone.id, p.zone])), [pairs]);
  const zoneOfUnit = useMemo(() => Object.fromEntries(pairs.map(p => [p.unit.id, p.zone.id])), [pairs]);
  const unitOfZone = useMemo(() => Object.fromEntries(pairs.map(p => [p.zone.id, p.unit.id])), [pairs]);

  const [bankOrder, setBankOrder] = useState(() => shuffle(pairs.map(p => p.unit.id)));
  const [zoneOrder, setZoneOrder] = useState(() => shuffle(pairs.map(p => p.zone.id)));
  const [placements, setPlacements] = useState({});
  const [wrongZones, setWrongZones] = useState(() => new Set());
  const [correctFirstTry, setCorrectFirstTry] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [sparkleZone, setSparkleZone] = useState(null);
  const [hoverZone, setHoverZone] = useState(null);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [dragging, setDragging] = useState(null); // {unitId, x, y, clientX, clientY, pointerId}
  const finishedRef = useRef(false);
  const zoneRefs = useRef({});

  const total = pairs.length;
  const completed = Object.keys(placements).length;

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(t);
  }, [startTime]);

  useEffect(() => {
    if (completed === total && total > 0 && !finishedRef.current) {
      finishedRef.current = true;
      playWin();
      const score = Math.round((correctFirstTry / total) * 100);
      if (score > loadBest()) saveBest(score);
      const t = setTimeout(() => navigate('/results', {
        state: { score, correctFirstTry, total, elapsed, difficulty, pairs }
      }), 1700);
      return () => clearTimeout(t);
    }
  }, [completed, total]);

  const hitZone = useCallback((clientX, clientY) => {
    for (const zid of zoneOrder) {
      const el = zoneRefs.current[zid];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) {
        if (!placements[zid]) return zid;
      }
    }
    return null;
  }, [zoneOrder, placements]);

  const handleDrop = useCallback((unitId, clientX, clientY) => {
    const zoneId = hitZone(clientX, clientY);
    if (!zoneId) return;
    if (unitId === unitOfZone[zoneId]) {
      const firstTry = !wrongZones.has(zoneId);
      setPlacements(p => ({ ...p, [zoneId]: unitId }));
      setBankOrder(b => b.filter(id => id !== unitId));
      if (firstTry) setCorrectFirstTry(c => c + 1);
      setFeedback({ type: 'correct', zoneId, message: 'כל הכבוד! התאמה נכונה.' });
      setSparkleZone(zoneId);
      setTimeout(() => setSparkleZone(null), 1100);
      if (soundOn) playCorrect();
    } else {
      setWrongZones(s => new Set(s).add(zoneId));
      setFeedback({ type: 'wrong', zoneId, message: 'לא מדויק — נסו שוב.' });
      if (soundOn) playWrong();
    }
    setTimeout(() => setFeedback(null), 3600);
  }, [hitZone, unitOfZone, wrongZones, soundOn]);

  function onPointerDownUnit(e, unitId) {
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    const { x, y } = toLocal(e.clientX, e.clientY);
    setDragging({ unitId, x, y, clientX: e.clientX, clientY: e.clientY, pointerId: e.pointerId });
  }
  function onPointerMoveUnit(e) {
    if (!dragging || e.pointerId !== dragging.pointerId) return;
    const { x, y } = toLocal(e.clientX, e.clientY);
    setDragging(d => d ? { ...d, x, y, clientX: e.clientX, clientY: e.clientY } : d);
    setHoverZone(hitZone(e.clientX, e.clientY));
  }
  function onPointerUpUnit(e) {
    if (!dragging || e.pointerId !== dragging.pointerId) return;
    const { unitId, clientX, clientY, pointerId } = dragging;
    try { e.currentTarget.releasePointerCapture(pointerId); } catch {}
    setDragging(null);
    setHoverZone(null);
    handleDrop(unitId, clientX, clientY);
  }

  function restart() {
    setBankOrder(shuffle(pairs.map(p => p.unit.id)));
    setZoneOrder(shuffle(pairs.map(p => p.zone.id)));
    setPlacements({});
    setWrongZones(new Set());
    setCorrectFirstTry(0);
    setFeedback(null);
    setSparkleZone(null);
    setHoverZone(null);
    setDragging(null);
    setStartTime(Date.now());
    setElapsed(0);
    finishedRef.current = false;
  }

  return (
    <div className="h-full w-full flex flex-col animate-fade-in">
      <Header subtitle="גררו לוגו ← התאימו לתחום האחריות" />

      <div className="mx-auto max-w-[1000px] w-full px-5">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1 min-w-0">
            <ProgressBar completed={completed} total={total} elapsed={elapsed} />
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={restart}
              className="flex items-center gap-2 rounded-full glass border-2 border-white/20 px-5 py-3 text-[16px] font-extrabold text-white hover:border-[#00A8E8] transition-all no-touch"
              style={{ touchAction: 'none' }}
            >
              <RotateCcw size={20} /> התחל מחדש
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center rounded-full glass border-2 border-white/20 p-3 text-white hover:border-[#00A8E8] transition-all no-touch"
              style={{ touchAction: 'none' }}
            >
              <Home size={20} />
            </button>
          </div>
        </div>

        <div className="mt-2 h-9 flex items-center justify-center">
          {feedback && (
            <div
              className={`flex items-center gap-2 rounded-full border-2 px-5 py-1.5 text-[15px] font-bold animate-fade-in ${
                feedback.type === 'correct'
                  ? 'bg-[#00A8E8]/15 border-[#00A8E8] text-[#00A8E8] glow-soft-cyan'
                  : 'bg-[#FF6B00]/15 border-[#FF6B00] text-[#FF6B00] glow-orange'
              }`}
            >
              {feedback.type === 'correct' ? <CheckCircle2 size={18} /> : <X size={18} />}
              <span className="text-[16px]">{feedback.message}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-center">
        {/* zones */}
        <div className="mx-auto w-full max-w-[1000px] px-5">
          <div className="mb-1.5 text-center text-[13px] font-extrabold text-[#00A8E8]/70 tracking-widest uppercase">תחומי אחריות — התאימו את הלוגו</div>
          <div className="grid grid-cols-2 gap-2.5">
            {zoneOrder.map((zoneId) => {
              const zone = zonesById[zoneId];
              const placedUnitId = placements[zoneId];
              const isCorrect = placedUnitId === unitOfZone[zoneId];
              return (
                <div key={zoneId} ref={(el) => { zoneRefs.current[zoneId] = el; }} className="relative">
                  <ZoneCard zone={zone} hover={hoverZone === zoneId && !placedUnitId} placedUnit={placedUnitId ? unitsById[placedUnitId] : null} correct={isCorrect} feedback={feedback} sparkle={sparkleZone === zoneId} />
                  {sparkleZone === zoneId && <Sparkles />}
                </div>
              );
            })}
          </div>
        </div>

        {/* bank */}
        <div className="mt-4 pb-2">
          <div className="mx-auto max-w-[1000px] w-full px-5">
            <div className="mb-1.5 text-center text-[13px] font-extrabold text-[#00A8E8]/70 tracking-widest uppercase">בנק הלוגואים — גררו אל ההגדרה</div>
            <div className="grid grid-cols-3 gap-3 place-items-center py-1">
              {bankOrder.map((unitId) => (
                <div key={unitId} onPointerDown={(e) => onPointerDownUnit(e, unitId)} onPointerMove={onPointerMoveUnit} onPointerUp={onPointerUpUnit} onPointerCancel={onPointerUpUnit} className="no-touch" style={{ touchAction: 'none' }}>
                  <LogoTile unit={unitsById[unitId]} dragging={dragging?.unitId === unitId} />
                </div>
              ))}
              {bankOrder.length === 0 && (<div className="text-center text-[14px] font-bold text-[#00A8E8]/50">כל הלוגואות שובצו ✓</div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pb-4 pt-1">
        <HomeButton />
      </div>

      {/* floating ghost (dragged logo) — positioned in viewport-local coords */}
      {dragging && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{ left: dragging.x, top: dragging.y, transform: 'translate(-50%,-50%) scale(1.08)' }}
        >
          <LogoTile unit={unitsById[dragging.unitId]} ghost />
        </div>
      )}
    </div>
  );
}