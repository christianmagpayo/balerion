import { useState } from 'react';
import { ChevronRight, Search, X, Sparkles } from 'lucide-react';
import { FINDINGS } from './data';

type Sev = 'critical' | 'review';
type Check = { id: string; t: string; cat: string; sev: Sev; msg: string; detail: string };

const CHECKS: Check[] = FINDINGS.map((f) => ({ id: f.id, t: f.t, cat: f.tag, sev: f.sev, msg: f.msg, detail: f.evidence }));

const CATS = ['All', 'Loan Data', 'Income', 'Assets', 'Credit', 'Property'];

export function ChecksView() {
  const [cat, setCat] = useState('All');
  const [sev, setSev] = useState<Sev | null>(null);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const term = q.trim().toLowerCase();
  const list = CHECKS.filter((c) => (cat === 'All' || c.cat === cat) && (!sev || c.sev === sev) && `${c.t} ${c.msg}`.toLowerCase().includes(term));
  const count = (s: Sev) => CHECKS.filter((c) => c.sev === s).length;
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <label className="pv-search w-[230px]">
          <Search size={12} aria-hidden className="text-bone/40" /><span className="sr-only">Search document checks</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search document checks..." data-testid="input-search-checks" />
          {q && <button type="button" onClick={() => setQ('')} aria-label="Clear check search" className="pv-icon-btn !h-4 !w-4"><X size={10} aria-hidden /></button>}
        </label>
      </div>
      <div className="pv-card p-1.5 flex gap-1" role="group" aria-label="Filter by category">
        {CATS.map((c) => {
          const n = c === 'All' ? CHECKS.length : CHECKS.filter((x) => x.cat === c).length;
          return <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`pv-filter ${cat === c ? 'is-on' : ''}`} data-testid={`button-cat-${c.toLowerCase().replace(/\s/g, '-')}`}>{c} <span className="tabular-nums opacity-60">{n}</span></button>;
        })}
      </div>
      <div className="grid grid-cols-5 gap-1.5 text-[10px] uppercase tracking-wider">
        <button type="button" aria-pressed={sev === 'critical'} onClick={() => setSev((s) => (s === 'critical' ? null : 'critical'))} className={`pv-strip pv-strip-crit ${sev === 'critical' ? 'is-on' : ''}`} data-testid="button-status-critical">Critical <b>{count('critical')}</b></button>
        <button type="button" aria-pressed={sev === 'review'} onClick={() => setSev((s) => (s === 'review' ? null : 'review'))} className={`pv-strip pv-strip-rev ${sev === 'review' ? 'is-on' : ''}`} data-testid="button-status-review">Review <b>{count('review')}</b></button>
        <span className="pv-strip">Cleared <b>0</b></span>
        <span className="pv-strip">Deleted <b>0</b></span>
        <span className="pv-strip !text-ember normal-case tracking-normal"><Sparkles size={10} aria-hidden />{CHECKS.length} checks evaluated</span>
      </div>
      <p className="text-[10px] text-bone/40">Evaluated in this preview · sample data</p>
      <ul className="space-y-1.5" aria-live="polite">
        {list.map((c) => {
          const on = open === c.id;
          return (
            <li key={c.id} className={`pv-card pv-check ${c.sev === 'critical' ? 'is-crit' : 'is-rev'}`}>
              <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : c.id)} className="w-full text-left px-3 py-2 flex items-start gap-2.5" data-testid={`button-check-${c.id}`}>
                <span className={c.sev === 'critical' ? 'pv-chip-crit uppercase mt-px' : 'pv-chip-rev uppercase mt-px'}>{c.sev}</span>
                <span className="flex-1 min-w-0"><span className="block text-[12px] text-bone">{c.t}</span><span className="block mt-0.5 text-[10.5px] text-bone/50">{c.msg}</span></span>
                <span className="pv-tag mt-px">{c.cat}</span>
                <ChevronRight size={13} aria-hidden className={`mt-0.5 text-bone/45 transition-transform ${on ? 'rotate-90' : ''}`} />
              </button>
              <div className={`pv-collapse ${on ? 'is-open' : ''}`}><div className="overflow-hidden">
                <div className="mx-3 mb-2.5 pt-2 border-t border-white/[0.07] text-[10.5px] leading-relaxed text-bone/70"><span className="pv-label mr-2">Evidence</span>{c.detail}</div>
              </div></div>
            </li>
          );
        })}
        {!list.length && <li className="pv-card py-8 text-center text-[11px] text-bone/45">No checks match these filters</li>}
      </ul>
    </div>
  );
}
