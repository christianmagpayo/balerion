import { useEffect, useState } from 'react';
import { Eyebrow } from '@/components/site-chrome';
import './evidence-action.css';

const STAGES: [string, string][] = [
  ['Detect', 'Find missing information and conflicts across the loan.'],
  ['Reason', 'Evaluate findings against guidelines and lender requirements.'],
  ['Explain', 'Show why it matters, backed by source evidence.'],
  ['Direct', 'Recommend next steps or route for human review.'],
  ['Re-evaluate', 'Reassess the loan as information and requirements change.'],
];

const R = 150, C = 200;
const pos = (n: number) => {
  const a = (n / STAGES.length) * Math.PI * 2 - Math.PI / 2;
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
};
const CIRC = 2 * Math.PI * R;

export function EvidenceAction({ pad }: { pad: string }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false);
  }, []);
  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % STAGES.length), 4400);
    return () => window.clearTimeout(t);
  }, [i, auto]);
  const pick = (n: number) => { setI(n); };
  const [title, body] = STAGES[i];

  return (
    <section className="border-y border-white/10 bg-ink/40" aria-labelledby="ea-h">
      <div className={pad}>
        <div className="relative">
          <div>
            <Eyebrow>From evidence to action</Eyebrow>
            <h2 id="ea-h" className="reveal mt-5 font-display text-4xl md:text-5xl lg:text-[clamp(2.25rem,3.34vw,3rem)] lg:whitespace-nowrap leading-[1.02]">Follow every finding <em className="text-ember">from evidence to action.</em></h2>
            <p className="reveal mt-4 w-full text-bone/60 leading-relaxed" style={{ ['--d' as string]: '100ms' }}>The work does not stop at an exception. Each finding is connected to the information behind it, evaluated in context, and translated into a clear next step.</p>
          </div>
        </div>

        <div className="reveal mt-7 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 lg:gap-10 items-center">
          <div>
          <ol className="space-y-1.5" aria-label="Stages">
            {STAGES.map(([t], n) => {
              const on = n === i;
              return (
                <li key={t}>
                  <button type="button" onClick={() => pick(n)} aria-current={on ? 'step' : undefined} data-testid={`button-ea-stage-${n}`}
                    className={`ea-focus ea-stage ${on ? 'is-on' : ''}`}>
                    <span className="font-mono text-[11px] text-ember tabular-nums pt-1">{String(n + 1).padStart(2, '0')}</span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl md:text-[22px] leading-tight">{t}</span>
                    </span>
                    {on && auto && <span key={i} className="ea-timer" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ol>
          </div>

          <div className="relative mx-auto w-full max-w-[380px]">
            <svg viewBox="0 0 400 400" className="w-full h-auto" aria-hidden>
              <circle cx={C} cy={C} r={R} fill="none" stroke="hsl(var(--bone) / 0.1)" strokeWidth="1" />
              <circle cx={C} cy={C} r={R} fill="none" stroke="hsl(var(--ember))" strokeWidth="1.5" strokeLinecap="round"
                className="ea-arc" style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC * (1 - (i + 1) / STAGES.length) }} transform={`rotate(-90 ${C} ${C})`} />
              {STAGES.map(([t], n) => {
                const p = pos(n), on = n === i, done = n < i;
                return (
                  <g key={t} className={`ea-node ${on ? 'is-on' : done ? 'is-done' : ''}`}>
                    {on && <circle cx={p.x} cy={p.y} r="20" fill="hsl(var(--ember) / 0.14)" />}
                    <circle cx={p.x} cy={p.y} r="12" fill="hsl(var(--ink))" stroke={on || done ? 'hsl(var(--ember))' : 'hsl(var(--bone) / 0.3)'} strokeWidth="1.5" />
                    <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize="9.5" fontFamily="var(--app-font-mono)" fill={on ? 'hsl(var(--ember))' : 'hsl(var(--bone) / 0.7)'}>{String(n + 1).padStart(2, '0')}</text>
                    <text x={p.x} y={p.y + (p.y < C - 20 ? -22 : 32)} textAnchor="middle" fontSize="12" fontFamily="var(--app-font-sans)" fill={on ? 'hsl(var(--bone))' : 'hsl(var(--bone) / 0.55)'}>{t}</text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div key={i} className="ea-center text-center w-[58%]">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ember">{String(i + 1).padStart(2, '0')} / 05</div>
                <p className="mt-2 text-[13px] leading-relaxed text-bone/80">{body}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{`Stage ${i + 1}: ${title}`}</p>
      </div>
    </section>
  );
}
