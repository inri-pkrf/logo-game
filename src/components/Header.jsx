import Emblem from '@/components/Emblem';

// Tactical top bar: College (top-right), title (center), Pikud HaOref (top-left).
// Content is centered within a max-width column on the large kiosk canvas.
export default function Header({ subtitle }) {
  return (
    <header className="w-full pt-7 pb-4">
      <div className="mx-auto max-w-[960px] px-6">
        <div className="flex items-center justify-between gap-6">
          <Emblem variant="college" />
          <div className="text-center min-w-0">
            <h1 className="font-display text-[40px] font-bold tracking-wider text-white text-glow-cyan uppercase whitespace-nowrap">
              לוגו של אחריות
            </h1>
            {subtitle && (
              <p className="text-[16px] font-semibold text-[#00A8E8]/75 -mt-0.5 tracking-wide">{subtitle}</p>
            )}
          </div>
          <Emblem variant="pikud" />
        </div>
        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#00A8E8]/40 to-transparent" />
      </div>
    </header>
  );
}