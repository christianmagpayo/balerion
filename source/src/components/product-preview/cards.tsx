import { ChevronDown, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import type { Metric, Panel, Status } from './data';

export function StatusBadge({ s }: { s: Status }) {
  if (s === 'pass') return <span className="pv-status pv-pass"><CheckCircle2 size={12} aria-hidden />PASS</span>;
  if (s === 'fail') return <span className="pv-status pv-fail"><AlertCircle size={12} aria-hidden />FAIL</span>;
  return <span className="pv-status pv-cond"><AlertTriangle size={12} aria-hidden />CONDITIONS</span>;
}

function Toggle({ open, onClick, label, id }: { open: boolean; onClick: () => void; label: string; id: string }) {
  return (
    <button type="button" onClick={onClick} aria-expanded={open} aria-controls={id} aria-label={`${open ? 'Collapse' : 'Expand'} ${label}`} className="pv-card-toggle absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember" data-testid={`button-toggle-${id}`}>
      <span className="pv-chev absolute right-3 top-3">
        <ChevronDown size={14} aria-hidden className={open ? '' : '-rotate-90'} />
      </span>
    </button>
  );
}

function Rows({ rows, columns = false }: { rows: [string, string][]; columns?: boolean }) {
  return (
    <dl className={columns ? 'grid grid-cols-3 gap-4' : 'space-y-1'}>
      {rows.map(([a, b]) => <div key={a} className={columns ? 'min-w-0 border-l border-white/[0.07] pl-3 first:border-0 first:pl-0' : 'flex justify-between gap-3'}><dt className="text-bone/60">{a}</dt><dd className={`tabular-nums text-bone/90 ${columns ? 'mt-1' : 'text-right'}`}>{b}</dd></div>)}
    </dl>
  );
}

export function MetricCard({ m, open, onToggle, uid }: { m: Metric; open: boolean; onToggle: () => void; uid: string }) {
  const id = `${uid}-${m.id}`;
  return (
    <div className="pv-card relative p-3" data-testid={`card-metric-${m.id}`}>
      <Toggle open={open} onClick={onToggle} label={m.k} id={id} />
      <div className="flex min-h-[18px] items-start justify-between pr-6"><span className="text-[11px] text-bone/65">{m.k}</span></div>
      <div className="text-[22px] leading-tight tabular-nums text-bone">{m.v}</div>
      <div className="h-5">{m.status && <StatusBadge s={m.status} />}</div>
      <div id={id} className={`pv-collapse ${open ? 'is-open' : ''}`}>
        <div className="overflow-hidden">
          <p className="mt-1 min-h-[28px] text-[10.5px] leading-snug text-bone/45">{m.desc}</p>
          <div className="mt-1.5 pt-1.5 border-t border-white/[0.07] text-[10.5px] leading-snug">
            {m.note && <p className="text-bone/80">{m.note}</p>}
            {m.rows && <Rows rows={m.rows} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PanelCard({ p, open, onToggle, uid, wide = false }: { p: Panel; open: boolean; onToggle: () => void; uid: string; wide?: boolean }) {
  const id = `${uid}-${p.id}`;
  return (
    <div className="pv-card relative p-3.5" data-testid={`card-panel-${p.id}`}>
      <Toggle open={open} onClick={onToggle} label={p.title} id={id} />
      <div className="flex min-h-[18px] items-start justify-between pr-6"><span className="text-[13px] text-bone">{p.title}</span></div>
      <div className="min-h-7 flex items-center">
        {p.big && <div className="text-[20px] tabular-nums text-bone leading-tight">{p.big}</div>}
        {p.status && <StatusBadge s={p.status} />}
      </div>
      <div id={id} className={`pv-collapse ${open ? 'is-open' : ''}`}>
        <div className="overflow-hidden"><div className="pt-2 text-[11px]"><Rows rows={p.rows} columns={wide} /></div></div>
      </div>
    </div>
  );
}
