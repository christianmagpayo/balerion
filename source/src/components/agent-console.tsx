import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

type Agent = 'Understand' | 'Evaluate' | 'Act' | 'Human';
type Line = { agent: Agent; text: string; flag?: boolean };

const SCENARIOS: Record<string, { label: string; lines: Line[] }> = {
  pre: {
    label: 'Pre-underwriting',
    lines: [
      { agent: 'Understand', text: 'Ingested loan file — 214 pages, 31 documents classified' },
      { agent: 'Understand', text: 'Linked borrower, employer, property entities across docs' },
      { agent: 'Evaluate', text: 'Reasoning over income guidelines for conventional program' },
      { agent: 'Evaluate', text: 'YTD paystub income diverges from W-2 trend', flag: true },
      { agent: 'Evaluate', text: 'Asset seasoning satisfied across two statements' },
      { agent: 'Act', text: 'Drafted condition: written VOE with explanation of variance' },
      { agent: 'Human', text: 'Underwriter reviews evidence trail and approves condition' },
    ],
  },
  post: {
    label: 'Post-close',
    lines: [
      { agent: 'Understand', text: 'Assembled closed package — note, CD, deed, title policy' },
      { agent: 'Evaluate', text: 'Cross-checked CD fees against final terms' },
      { agent: 'Evaluate', text: 'Vesting on deed differs from title commitment', flag: true },
      { agent: 'Evaluate', text: 'Signatures and dates verified across executed docs' },
      { agent: 'Act', text: 'Opened trailing-doc request with cited page references' },
      { agent: 'Human', text: 'Post-closer confirms and sends to title' },
    ],
  },
  qc: {
    label: 'QC',
    lines: [
      { agent: 'Understand', text: 'Sampled file loaded with full origination history' },
      { agent: 'Evaluate', text: 'Re-verified DTI from source documents' },
      { agent: 'Evaluate', text: 'Non-QM bank-statement income recomputed by month' },
      { agent: 'Evaluate', text: 'Deposit on month 7 lacks sourcing', flag: true },
      { agent: 'Act', text: 'Graded finding with rationale and evidence links' },
      { agent: 'Human', text: 'QC analyst finalizes rating' },
    ],
  },
};

const LANES: Agent[] = ['Understand', 'Evaluate', 'Act', 'Human'];

export function AgentConsole() {
  const [key, setKey] = useState<keyof typeof SCENARIOS>('pre');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const lines = SCENARIOS[key].lines;
  const done = step >= lines.length;
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce && step === 0) { setStep(lines.length); return; }
    if (!playing || done) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 400 : 1300);
    return () => clearTimeout(t);
  }, [step, playing, done, lines.length]);

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' }); }, [step]);

  const select = (k: keyof typeof SCENARIOS) => { setKey(k); setStep(0); setPlaying(true); };
  const active = step > 0 && !done ? lines[step - 1].agent : null;
  const flags = lines.slice(0, step).filter((l) => l.flag).length;

  return (
    <div className="rounded-2xl border border-white/10 bg-[hsl(252_18%_9%)] text-bone overflow-hidden shadow-[0_40px_80px_-30px_hsl(var(--ember)/.15)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5 mr-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ember" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        {(Object.keys(SCENARIOS) as (keyof typeof SCENARIOS)[]).map((k) => (
          <button key={k} onClick={() => select(k)} data-testid={`button-scenario-${k}`}
            className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${key === k ? 'bg-ember text-ink' : 'text-bone/60 hover:text-bone hover:bg-white/5'}`}>
            {SCENARIOS[k].label}
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          <button onClick={() => (done ? select(key) : setPlaying((p) => !p))} aria-label={playing && !done ? 'Pause' : 'Play'} data-testid="button-console-play"
            className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {playing && !done ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button onClick={() => select(key)} aria-label="Restart" data-testid="button-console-restart" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[200px_1fr]">
        <div className="flex md:flex-col gap-2 p-4 border-b md:border-b-0 md:border-r border-white/10 overflow-x-auto">
          {LANES.map((l) => {
            const on = active === l;
            const count = lines.slice(0, step).filter((x) => x.agent === l).length;
            return (
              <div key={l} data-testid={`status-lane-${l.toLowerCase()}`}
                className={`flex-1 min-w-[120px] rounded-xl border px-3 py-2.5 transition-all duration-500 ${on ? 'border-ember bg-ember/10 translate-x-0 md:translate-x-1' : 'border-white/10'}`}>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${on ? 'bg-ember' : count ? 'bg-steel' : 'bg-white/20'}`} />
                  <span className="font-mono text-[11px] uppercase tracking-widest">{l === 'Human' ? 'Human review' : l}</span>
                </div>
                <div className="mt-1 font-mono text-[10px] text-bone/45">{on ? 'working' : count ? `${count} step${count > 1 ? 's' : ''}` : 'idle'}</div>
              </div>
            );
          })}
        </div>
        <div ref={logRef} className="h-[300px] overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed space-y-2.5" data-testid="log-console">
          {lines.slice(0, step).map((l, i) => (
            <div key={`${key}-${i}`} className="slide-in flex gap-3">
              <span className="text-bone/30 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className={`shrink-0 w-[92px] ${l.agent === 'Human' ? 'text-steel' : 'text-ember'}`}>{l.agent.toLowerCase()}</span>
              <span className={l.flag ? 'text-ink bg-ember px-1.5 rounded' : 'text-bone/85'}>{l.text}</span>
            </div>
          ))}
          {!done && <div className="flex gap-3 text-bone/40"><span>{String(step + 1).padStart(2, '0')}</span><span className="caret">_</span></div>}
          {done && <div className="pt-2 text-steel">file ready · {flags} discrepanc{flags === 1 ? 'y' : 'ies'} surfaced · human signed off</div>}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/35">
        Illustrative simulation — not live data
      </div>
    </div>
  );
}
