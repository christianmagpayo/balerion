import { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder, Search, X } from 'lucide-react';
import { SUMMARY } from './data';
import { DOCUMENT_GROUPS, DOCUMENT_TOTALS, LOAN, money } from './scenario';

const v = (label: string) => SUMMARY.find((s) => s.label === label)?.value ?? '';

const TREE = DOCUMENT_GROUPS.map((group) => ({ folder: group.folder, docs: group.docs.map((doc) => doc.name) }));

const STATS: [string, string][] = [[String(DOCUMENT_TOTALS.attachments), 'attachments'], [String(DOCUMENT_TOTALS.pages), 'pages'], [String(DOCUMENT_TOTALS.images), 'PNG/JPEG'], [String(DOCUMENT_TOTALS.classified), 'classified'], [String(DOCUMENT_TOTALS.fields), 'fields extracted']];

function SuppPage() {
  const row = (a: string, b: string, c?: string, e?: string) => (
    <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-2"><b>{a}</b><span className="min-w-0 break-words">{b}</span><b>{c}</b><span className="min-w-0 break-words">{e}</span></div>
  );
  return (
    <div className="pv-paper text-[9.5px] leading-[1.45]">
      <div className="flex items-end justify-between">
        <div><div className="text-[17px] font-bold tracking-tight italic">UCS</div><div className="text-[8px] font-semibold">UNIVERSAL CREDIT SERVICES</div></div>
        <div className="text-[13px] font-bold">SUPPLEMENTAL REPORT</div>
      </div>
      <div className="mt-2 border-t border-ink/50 pt-1.5 space-y-0.5">
        {row('FILE #', LOAN.number, 'DATE COMPLETED', LOAN.reportDate)}
        {row('SEND TO', 'Sample Lender, LLC', 'DATE ORDERED', LOAN.reportDate)}
        {row('LOAN #', v('Loan number'), 'REPOSITORIES', 'XP/TU/EF')}
        {row('PROPERTY', v('Property').replace('\n', ' '), 'LOAN TYPE', 'Conventional')}
      </div>
      <div className="mt-2 grid grid-cols-2 border-y border-ink/50 text-center font-bold py-0.5"><span>APPLICANT</span><span>CO-APPLICANT</span></div>
      <div className="mt-1 grid grid-cols-2 gap-x-3">
        <div className="space-y-0.5"><div><b>APPLICANT </b>{LOAN.borrower}</div><div><b>SUBJECT PROPERTY </b>{LOAN.property.replace('\n', ' ')}</div></div>
        <div><b>CO-APPLICANT </b>{LOAN.coBorrower}</div>
      </div>
      <div className="mt-2 border-t border-ink/50 text-center font-bold py-0.5">TRADELINES</div>
      <div className="grid grid-cols-[1.8fr_.7fr_.7fr_.9fr_.9fr_.5fr_1fr] gap-x-1 border-y border-ink/50 py-0.5 font-bold text-[8.5px]">
        <span>CREDITOR</span><span>REPORTED</span><span>OPENED</span><span>HIGH CREDIT</span><span>BALANCE</span><span>PAST DUE</span><span>STATUS</span>
      </div>
      {[['SAMPLE CREDIT LINE', '11/20', '07/20', '$60,000', money(LOAN.largestDebtBalance), '$0', 'AS AGREED'], ['SAMPLE AUTO FINANCE', '11/20', '10/20', '$25,000', '$22,400', '$0', 'AS AGREED']].map((r) => (
        <div key={r[0]} className="mt-1.5">
          <div className="grid grid-cols-[1.8fr_.7fr_.7fr_.9fr_.9fr_.5fr_1fr] gap-x-1">{r.map((c, i) => <span key={i}>{c}</span>)}</div>
          <div className="pl-2 text-[8.5px]">ABOVE ACCOUNT IS CURRENT AND NEXT PAYMENT IS DUE. VERIFIED BY CREDITOR.</div>
        </div>
      ))}
    </div>
  );
}

function GenericPage({ name }: { name: string }) {
  return (
    <div className="pv-paper text-[10px]">
      <div className="text-[13px] font-bold">{name}</div>
      <div className="mt-1 text-[9px] opacity-60">{v('Borrower name')} · {v('Loan number')}</div>
      <div className="mt-4 space-y-2">{[92, 78, 85, 64, 88, 70, 81, 56].map((w, i) => <div key={i} className="h-[6px] rounded-sm bg-ink/15" style={{ width: `${w}%` }} />)}</div>
      <p className="mt-4 text-[9px] opacity-60">Illustrative page. Document contents are not part of this preview.</p>
    </div>
  );
}

export function DocumentsView() {
  const [sel, setSel] = useState({ folder: 'Credit Report', doc: 'supp.pdf' });
  const [q, setQ] = useState('');
  const [shut, setShut] = useState<Set<string>>(new Set());
  const term = q.trim().toLowerCase();
  return (
    <div className="space-y-2.5">
      <dl className="flex items-baseline gap-5 px-0.5" data-testid="stats-documents">
        {STATS.map(([n, l]) => <div key={l} className="flex items-baseline gap-1.5"><dt className="sr-only">{l}</dt><dd className="text-[17px] font-semibold tabular-nums text-bone">{n}</dd><span className="text-[10.5px] text-bone/50">{l}</span></div>)}
      </dl>
      <div className="grid grid-cols-[1fr_236px] gap-2.5">
        <section className="pv-card overflow-hidden" aria-label="Document viewer">
          <div className="px-3.5 py-2.5 border-b border-white/[0.07]">
            <div className="text-[11.5px] text-bone/50">{sel.folder} <ChevronRight size={10} className="inline -mt-0.5" aria-hidden /> <span className="text-bone">{sel.doc}</span></div>
            {sel.doc === 'supp.pdf' && <span className="mt-1.5 inline-flex items-center gap-1.5 pv-tag">Credit Supplement <span className="rounded bg-ember/80 text-ink px-1 text-[9px]">1</span></span>}
          </div>
          <div key={sel.doc} className="pv-swap pv-viewer h-[430px] p-4">{sel.doc === 'supp.pdf' ? <SuppPage /> : <GenericPage name={sel.doc} />}</div>
        </section>
        <aside className="pv-card p-2 min-h-[505px]" aria-label="Document tree">
          <label className="pv-search">
            <Search size={12} aria-hidden className="text-bone/40" /><span className="sr-only">Search documents</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents..." data-testid="input-search-documents" />
            {q && <button type="button" onClick={() => setQ('')} aria-label="Clear document search" className="pv-icon-btn !h-4 !w-4"><X size={10} aria-hidden /></button>}
          </label>
          <div className="mt-2 space-y-1">
            {TREE.map(({ folder, docs }) => {
              const list = docs.filter((x) => x.toLowerCase().includes(term));
              if (!list.length) return null;
              const open = term !== '' || !shut.has(folder);
              return (
                <div key={folder}>
                  <button type="button" aria-expanded={open} onClick={() => setShut((s) => { const n = new Set(s); n.has(folder) ? n.delete(folder) : n.add(folder); return n; })} className="pv-row !px-1.5 !py-1.5" data-testid={`button-folder-${folder.toLowerCase().replace(/\s/g, '-')}`}>
                    <ChevronDown size={11} aria-hidden className={`text-bone/50 transition-transform ${open ? '' : '-rotate-90'}`} /><Folder size={12} aria-hidden className="text-bone/50" />
                    <span className="flex-1 text-left text-bone/85">{folder}</span><span className="pv-tag">{docs.length}</span>
                  </button>
                  {open && <ul className="pl-3">{list.map((doc) => {
                    const on = sel.doc === doc && sel.folder === folder;
                    return (
                      <li key={doc}><button type="button" aria-pressed={on} onClick={() => setSel({ folder, doc })} className={`pv-item !items-center !justify-start ${on ? 'is-on' : ''}`} data-testid={`button-doc-${doc.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                        <FileText size={12} aria-hidden className={on ? 'text-ember' : 'text-bone/40'} /><span className="text-[11px] text-bone/85 truncate">{doc}</span>
                      </button></li>
                    );
                  })}</ul>}
                </div>
              );
            })}
            {TREE.every(({ docs }) => !docs.some((x) => x.toLowerCase().includes(term))) && <p className="py-6 text-center text-[11px] text-bone/45">No documents match "{q}"</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}
