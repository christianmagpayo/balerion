import { Fragment, useEffect, useState, type ReactNode } from 'react';
import './hero-flow.css';

const STEPS = [
  { n: '01', t: 'Documents', s: 'Loan file arrives' },
  { n: '02', t: 'Balerion agents', s: 'Read · connect · validate' },
  { n: '03', t: 'Intelligence', s: 'Checks · calculations · conditions' },
  { n: '04', t: 'Human review', s: 'Review & sign off' },
];
const DUR = 3000;
const ember = 'hsl(var(--ember))';

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(m.matches);
    const f = () => setR(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return r;
}

function Docs({ on }: { on: boolean }) {
  return (
    <div className="relative h-full w-[120px]">
      {[-10, -4, 3, 9].map((r, i) => (
        <div key={i} className={`${on ? 'hf-doc' : ''} absolute top-2 h-[58px] w-[46px] rounded-[5px] border border-bone/20 bg-[hsl(0_0%_13%)] p-1.5`}
          style={{ left: `${6 + i * 20}px`, transform: `rotate(${r}deg)`, ['--r' as string]: `${r}deg`, ['--d' as string]: `${i * 0.14}s` }}>
          {[85, 60, 75, 50].map((w, j) => <div key={j} className="mb-1 h-[2px] rounded bg-bone/25" style={{ width: `${w}%` }} />)}
          <div className="mt-1.5 h-[2px] w-[45%] rounded bg-ember/70" />
        </div>
      ))}
    </div>
  );
}

function Agents() {
  const pts: [number, number][] = [[14, 36], [44, 16], [72, 50], [100, 22], [126, 38]];
  return (
    <div className="relative h-full w-full max-w-[150px] overflow-hidden rounded-lg border border-ember/40 bg-ember/[.07]">
      <div className="hf-sweep absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
      <svg viewBox="0 0 140 72" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <path d={`M${pts.map((p) => p.join(' ')).join(' L')}`} stroke={ember} strokeOpacity=".55" fill="none" className="flow" />
        {pts.map(([x, y], i) => <circle key={x} cx={x} cy={y} r="4" fill={ember} className="hf-pulse" style={{ ['--d' as string]: `${i * 0.25}s` }} />)}
      </svg>
    </div>
  );
}

function Bars({ on }: { on: boolean }) {
  return (
    <div className="w-full max-w-[150px] space-y-2.5">
      {([[92, true], [64, false], [78, false]] as const).map(([w, hot], i) => (
        <div key={i} className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${hot ? 'bg-ember' : 'bg-bone/40'}`} />
          <div className="h-[5px] flex-1 overflow-hidden rounded bg-bone/10">
            <div className={`${on ? 'hf-grow' : ''} h-full rounded ${hot ? 'bg-ember' : 'bg-bone/45'}`} style={{ width: `${w}%`, ['--d' as string]: `${i * 0.2}s` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Human({ on }: { on: boolean }) {
  return (
    <div className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full border border-ember/50 bg-ember/10">
      <svg width="26" height="26" viewBox="0 0 16 16" className="text-bone/85" aria-hidden><circle cx="8" cy="5" r="3" fill="currentColor" /><path d="M2 15c0-3.3 2.7-5 6-5s6 1.7 6 5" fill="currentColor" /></svg>
      <span className={`${on ? 'hf-stamp' : ''} absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-ember text-ink`}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </div>
  );
}

function Arrow({ lit, active, vertical }: { lit: boolean; active: boolean; vertical?: boolean }) {
  return (
    <div className={`hf-arrow ${active ? 'hf-arrow-active' : ''} flex items-center justify-center ${vertical ? 'h-6 md:hidden' : 'hidden md:flex w-9'}`} style={{ opacity: lit ? 1 : 0.35 }} aria-hidden>
      <div className={`relative ${vertical ? 'rotate-90' : ''}`}>
        <svg width="34" height="16" viewBox="0 0 34 16"><path d="M1 5h22V1l10 7-10 7v-4H1z" fill="hsl(var(--ember) / .18)" stroke="hsl(var(--ember) / .6)" strokeLinejoin="round" /></svg>
        {active && <span className="hf-travel absolute left-0 top-[6px] h-1 w-1 rounded-full bg-ember" />}
      </div>
    </div>
  );
}

export function HeroFlow() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const shown = reduced ? 3 : step;
  const auto = !reduced;

  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => {
      if (step === 3) { setStep(0); setCycle((c) => c + 1); } else setStep(step + 1);
    }, step === 3 ? DUR + 1400 : DUR);
    return () => clearTimeout(id);
  }, [step, auto, cycle]);

  const visuals: ReactNode[] = [<Docs on={shown >= 0} />, <Agents />, <Bars on={shown >= 2} />, <Human on={shown >= 3} />];

  return (
    <figure className="mt-[31px] w-full" data-testid="figure-hero-flow" data-playing={auto}>
      <div className="relative overflow-hidden rounded-2xl border border-ember/25 bg-ink/80 p-3 md:p-5 shadow-[0_20px_80px_-30px_hsl(var(--ember)/.15)]">
        <div className="pointer-events-none absolute -bottom-20 h-40 w-1/2 rounded-full bg-ember/10 blur-3xl transition-transform duration-700" style={{ transform: `translateX(${shown * 33}%)` }} />
        <ol key={cycle} className="relative flex flex-col md:flex-row md:items-stretch" aria-label="Balerion flow: documents arrive, Balerion agents read, connect and validate, intelligence is generated, and a human reviews and signs off.">
          {STEPS.map((s, i) => {
            const active = i === shown, done = i < shown;
            return (
              <Fragment key={s.n}>
                {i > 0 && <><Arrow lit={i <= shown} active={i === shown && auto} /><Arrow vertical lit={i <= shown} active={i === shown && auto} /></>}
                <li className="min-w-0 flex-1">
                  <div aria-current={active ? 'step' : undefined} data-testid={`flow-step-${s.n}`}
                    className={`hf-card relative flex h-full w-full items-center gap-4 overflow-hidden rounded-xl border p-3 text-left md:flex-col md:items-start md:gap-3 md:p-4 ${active ? 'hf-on border-ember/60 bg-ember/[.06]' : done ? 'hf-done border-bone/12 bg-[hsl(0_0%_8%)]' : 'hf-off border-bone/10 bg-[hsl(0_0%_8%)]'}`}>
                    <div className="flex h-[76px] w-[120px] shrink-0 items-center justify-center md:w-full">{i <= shown ? visuals[i] : <div className="h-full w-full rounded-lg border border-dashed border-bone/10" />}</div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className={`hf-stage-number font-mono text-[10px] ${active || done ? 'text-ember' : 'text-bone/35'}`}>{s.n}</span>
                        <span className="hf-stage-title text-[14px] font-medium text-bone">{s.t}</span>
                      </div>
                      <p className="mt-1 font-mono text-[10.5px] tracking-wide text-bone/50">{s.s}</p>
                    </div>
                    {active && auto && <span className="hf-progress absolute bottom-0 left-0 h-[2px] w-full bg-ember" style={{ ['--dur' as string]: `${i === 3 ? DUR + 1400 : DUR}ms` }} />}
                  </div>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
