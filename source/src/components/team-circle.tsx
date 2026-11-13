import { BASE, d } from '@/components/site-chrome';
import type { Member } from '@/lib/team';

export function TeamCircle({ m, size, delay = 0, testId }: { m: Member; size: string; delay?: number; testId?: string }) {
  const a = 'var(--ember)';
  const b = 'var(--steel)';
  return (
    <div className="reveal group flex flex-col items-center text-center" style={d(delay)} data-testid={testId}>
      <div className={`relative ${size}`}>
        <div className="orbit absolute -inset-3 rounded-full border border-dashed border-ember/40 group-hover:border-ember transition-colors" aria-hidden />
        <div className="absolute -inset-1 rounded-full opacity-70 group-hover:opacity-100 blur-md transition-opacity duration-500" style={{ background: `conic-gradient(from 120deg, hsl(${a}), hsl(${b}), hsl(${a}))` }} aria-hidden />
        <div className="relative h-full w-full rounded-full p-[3px]" style={{ background: `linear-gradient(135deg, hsl(${a}), hsl(${b}))` }}>
          <div className="h-full w-full overflow-hidden rounded-full bg-ink" style={{ background: `radial-gradient(circle at 30% 25%, hsl(${a} / .55), hsl(${b} / .9) 70%, hsl(0 0% 4%))` }}>
            {!m.photo ? (
              <div className="flex h-full w-full items-center justify-center font-display text-4xl text-bone/90" aria-label={m.name}>{m.name.split(' ').map((w) => w[0]).join('')}</div>
            ) : <div className="h-full w-full bg-ink">
              <div className="h-full w-full" style={{ transform: m.photoScale ? `scale(${m.photoScale})` : undefined }}>
                <img src={`${BASE}${m.photo}`} alt={m.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" style={{ objectPosition: m.pos ?? 'center 30%' }} />
              </div>
            </div>}
          </div>
        </div>
      </div>
      <div className="mt-6 font-display text-xl leading-tight">{m.name}</div>
      <div className="mt-1 font-mono text-[10px] tracking-wide text-bone/55">{m.role}</div>
    </div>
  );
}
