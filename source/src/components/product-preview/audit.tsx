import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, FilePlus2, FolderPlus, PencilLine, RotateCw, Tags } from 'lucide-react';
import { LOAN, money, DOCUMENT_TOTALS } from './scenario';
import { ANALYSIS_RESULT } from './data';

type Kind = 'create' | 'classify' | 'document' | 'change' | 'rerun';
export type AuditEvent = {
  id: string; at: Date; actor: string; initials: string; role: string; kind: Kind;
  title: string; detail?: string; field?: string; before?: string; after?: string; sample: boolean;
};

const SAMPLE: AuditEvent[] = [
  { id: 's5', at: new Date('2020-12-24T10:06:00-08:00'), actor: 'Maya Lindqvist', initials: 'ML', role: 'Underwriter (sample)', kind: 'change', title: 'Purchase price corrected', field: 'Sales price', before: money(LOAN.previousSalesPrice), after: money(LOAN.salesPrice), detail: 'Aligned to the sales contract. Reviewer sign-off is pending.', sample: true },
  { id: 's4', at: new Date('2020-12-24T09:42:00-08:00'), actor: 'Maya Lindqvist', initials: 'ML', role: 'Underwriter (sample)', kind: 'change', title: 'Qualifying monthly income corrected', field: 'QMI', before: money(LOAN.previousIncome), after: money(LOAN.income), detail: 'Aligned to verified income documentation. Final sign-off is pending.', sample: true },
  { id: 's3', at: new Date('2020-12-23T09:25:00-08:00'), actor: 'Rafael Ortiz', initials: 'RO', role: 'Processor (sample)', kind: 'document', title: 'Document added', detail: 'supp.pdf uploaded to Credit Report.', sample: true },
  { id: 's2', at: new Date('2020-12-23T09:31:00-08:00'), actor: 'Balerion agent', initials: 'B', role: 'Classification', kind: 'classify', title: 'Documents classified', detail: `${DOCUMENT_TOTALS.attachments} attachments, ${DOCUMENT_TOTALS.pages} pages; ${DOCUMENT_TOTALS.classified} classified, ${DOCUMENT_TOTALS.fields} fields extracted.`, sample: true },
  { id: 's1', at: new Date('2020-12-23T09:12:00-08:00'), actor: LOAN.officer, initials: 'DR', role: 'Loan officer', kind: 'create', title: 'Loan file created', detail: `${LOAN.number} · ${LOAN.purpose} · ${money(LOAN.amount)}`, sample: true },
];

const ICON = { create: FolderPlus, classify: Tags, document: FilePlus2, change: PencilLine, rerun: RotateCw };
const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
const PER = 4;

export function AuditView({ runs }: { runs: Date[] }) {
  const local: AuditEvent[] = runs.map((at, i) => ({ id: `r${runs.length - i}`, at, actor: 'You', initials: 'BE', role: 'Preview user', kind: 'rerun', title: 'Analysis re-run', detail: `Local replay completed: ${ANALYSIS_RESULT}.`, sample: false }));
  const all = [...local, ...SAMPLE].sort((a, b) => b.at.getTime() - a.at.getTime());
  const pages = Math.ceil(all.length / PER);
  const [p, setP] = useState(0);
  const page = Math.min(p, pages - 1);
  const list = all.slice(page * PER, page * PER + PER);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-bone/40">Illustrative audit history · sample events are not from a real audit backend</p>
        <span className="text-[10px] text-bone/50 tabular-nums">{all.length} events · newest first</span>
      </div>
      <ol key={page} className="pv-card pv-swap px-3 py-1" aria-label={`Audit events, page ${page + 1} of ${pages}`}>
        {list.map((e, i) => {
          const Icon = ICON[e.kind];
          return (
            <li key={e.id} className="pv-audit" data-testid={`row-audit-${e.id}`}>
              <div className="relative flex flex-col items-center">
                <span className={`pv-audit-dot ${e.kind === 'rerun' ? 'is-live' : ''}`}><Icon size={11} aria-hidden /></span>
                {i < list.length - 1 && <span className="pv-audit-line" aria-hidden />}
              </div>
              <div className="min-w-0 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] text-bone">{e.title}</span>
                  <time dateTime={e.at.toISOString()} className="text-[10px] text-bone/45 tabular-nums shrink-0">{fmt.format(e.at)}</time>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[10.5px]">
                  <span className="pv-avatar !h-[18px] !w-[18px] !text-[8px]" aria-hidden>{e.initials}</span>
                  <span className="text-bone/80">{e.actor}</span><span className="text-bone/35">·</span><span className="text-bone/50">{e.role}</span>
                  {e.sample && <span className="pv-tag ml-auto">Sample</span>}
                  {!e.sample && <span className="pv-chip-rev ml-auto">This session</span>}
                </div>
                {e.before !== undefined && (
                  <div className="mt-1.5 flex items-center gap-2 text-[10.5px]">
                    <span className="font-mono text-bone/45">{e.field}</span>
                    <span className="pv-audit-before">{e.before}</span><ArrowRight size={11} className="text-ember" aria-label="changed to" />
                    <span className="pv-audit-after">{e.after}</span>
                  </div>
                )}
                {e.detail && <p className="mt-1 text-[10.5px] text-bone/55">{e.detail}</p>}
              </div>
            </li>
          );
        })}
      </ol>
      <nav className="flex items-center justify-end gap-2 text-[10.5px] text-bone/60" aria-label="Audit pages">
        <button type="button" className="pv-icon-btn" disabled={page === 0} onClick={() => setP(page - 1)} aria-label="Newer events" data-testid="button-audit-prev"><ChevronLeft size={12} aria-hidden /></button>
        <span className="tabular-nums" aria-live="polite">Page {page + 1} of {pages}</span>
        <button type="button" className="pv-icon-btn" disabled={page >= pages - 1} onClick={() => setP(page + 1)} aria-label="Older events" data-testid="button-audit-next"><ChevronRight size={12} aria-hidden /></button>
      </nav>
    </div>
  );
}
