import { useState } from 'react';
import { Copy, Check, Search, ChevronRight } from 'lucide-react';
import { SUMMARY, FINDINGS, type Finding } from './data';

function CopyBtn({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      setDone(true);
      setError(false);
      setTimeout(() => setDone(false), 1400);
    } catch {
      setError(true);
    }
  };
  return (
    <span className="relative inline-flex">
      <button type="button" className="pv-icon-btn" aria-label={`Copy ${label}`} data-testid={`button-copy-${label.toLowerCase().replace(/\s/g, '-')}`} onClick={copy}>
        {done ? <Check size={11} aria-hidden /> : <Copy size={11} aria-hidden />}
      </button>
      <span role="status" className={error ? 'absolute right-0 top-full z-10 w-36 rounded bg-ink p-2 text-[10px] text-bone' : 'sr-only'}>
        {error ? 'Copy unavailable. Select the text to copy it.' : done ? `${label} copied` : ''}
      </span>
    </span>
  );
}

export function LoanSummary() {
  return (
    <aside className="pv-card p-3.5" aria-label="Loan summary">
      <div className="flex items-center justify-between"><span className="pv-label">Loan summary</span><CopyBtn value={SUMMARY.map((s) => `${s.label}: ${s.value}`).join('\n')} label="loan summary" /></div>
      <dl className="mt-3 space-y-2.5">
        {SUMMARY.map((s) => (
          <div key={s.label}>
            <dt className="text-[10.5px] text-bone/80">{s.label}</dt>
            <dd className="mt-0.5 flex items-center justify-between gap-2 text-[11px] text-bone/55 whitespace-pre-line" data-testid={`text-summary-${s.label.toLowerCase().replace(/\s/g, '-')}`}>
              <span className="min-w-0 break-words whitespace-pre-line">{s.caret && <ChevronRight size={9} className="inline -mt-0.5 mr-0.5" aria-hidden />}{s.value}</span>
              {s.copy && <CopyBtn value={s.value} label={s.label} />}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function ActionItems() {
  const groups: [Finding['sev'], string][] = [['critical', 'Critical'], ['review', 'Need review']];
  return (
    <aside className="pv-card p-3" aria-label="Action items">
      <div className="pv-label">Action items</div>
      <div className="pv-search mt-2.5" aria-hidden="true">
        <Search size={12} aria-hidden className="text-bone/40" />
        <span className="text-[11px] text-bone/40">Search action items</span>
      </div>
      <div>
        {groups.map(([sev, name]) => {
          const list = FINDINGS.filter((f) => f.sev === sev);
          if (!list.length) return null;
          return (
            <div key={sev} className="mt-3">
              <div className={`text-[9.5px] font-medium tracking-wider uppercase flex items-center gap-1.5 ${sev === 'critical' ? 'pv-crit' : 'text-ember'}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />{list.length} {name}
              </div>
              <ul className="mt-1">
                {list.map((f) => (
                  <li key={f.id} className="border-b border-white/[0.06] last:border-0">
                    <div data-testid={`text-finding-${f.id}`} className="pv-item">
                      <span className="text-[11px] leading-snug text-bone/85">{f.t}</span>
                      <span className="pv-tag shrink-0">{f.tag}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

