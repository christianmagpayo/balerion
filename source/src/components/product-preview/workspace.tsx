import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, CheckCircle2, RotateCw, Download } from 'lucide-react';
import { BASE } from '@/components/site-chrome';
import { TABS, METRICS, DEBT, BANK, CREDIT, FINDINGS, SUMMARY, type Tab } from './data';
import { MetricCard, PanelCard } from './cards';
import { LoanSummary, ActionItems } from './side';
import { DocumentsView, ChecksView, AusView, AuditView } from './views';
import { LOAN } from './scenario';


function downloadReport() {
  const rows = (r: [string, string][]) => r.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('');
  const html = `<!doctype html><meta charset="utf-8"><title>Balerion preview report</title><style>body{font:14px system-ui;margin:40px;max-width:720px}td{padding:3px 12px 3px 0}h2{margin-top:28px}</style>
<p><em>Preview report generated locally from illustrative sample data.</em></p><h1>${LOAN.borrower}</h1>
<table>${rows(SUMMARY.map((s) => [s.label, s.value]))}</table>
<h2>Loan data</h2><table>${rows(METRICS.map((m) => [m.k, m.v]))}${rows(DEBT.rows)}${rows(BANK.rows)}${rows(CREDIT.rows)}</table>
<h2>Action items</h2><ul>${FINDINGS.map((f) => `<li>[${f.sev}] ${f.t} (${f.tag})</li>`).join('')}</ul>`;
  const frame = document.createElement('iframe');
  frame.title = 'Balerion preview report for printing or saving as PDF';
  frame.style.cssText = 'position:fixed;width:0;height:0;border:0;left:-9999px';
  frame.onload = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    window.setTimeout(() => frame.remove(), 60000);
  };
  frame.srcdoc = html;
  document.body.appendChild(frame);
}

export function Workspace({ uid }: { uid: string }) {
  const [tab, setTab] = useState<Tab>('Loan Data');
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [running, setRunning] = useState(false);
  const [runAt, setRunAt] = useState<Date[]>([]);
  const runs = runAt.length;
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggle = (id: string) => setClosed((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const rerun = () => {
    if (running) return;
    setRunning(true);
    timer.current = window.setTimeout(() => { setRunning(false); setRunAt((r) => [new Date(), ...r]); }, 1600);
  };
  const wide = tab === 'Documents' || tab === 'AUS Results';

  return (
    <div className="pv-app" data-testid={`workspace-${uid}`}>
      <header className="flex items-center justify-between px-6 h-12 border-b border-white/[0.07]">
        <img src={`${BASE}brand/balerion-logo.svg`} alt="Balerion" className="h-[18px] w-auto" />
        <span className="pv-avatar" aria-label="Signed-in user initials BE">BE</span>
      </header>

      <div className="px-6 pt-3.5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-bone/55"><ChevronLeft size={12} aria-hidden />Back to Review Queue</div>
          <h3 className="mt-1.5 text-[21px] text-bone tracking-tight" data-testid="text-borrower">{LOAN.borrower}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="pv-du"><CheckCircle2 size={12} aria-hidden />DU: Approve/Eligible</span>
          <button type="button" onClick={rerun} disabled={running} className="pv-btn" data-testid="button-rerun" aria-label="Re-Run: replay the local preview analysis">
            <RotateCw size={12} aria-hidden className={running ? 'pv-spin' : ''} />{running ? 'Running' : 'Re-Run'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[200px_1fr_236px] gap-3 px-6 pt-3 pb-6">
        <LoanSummary />

        <div className={`min-w-0 ${wide ? 'col-span-2' : ''}`}>
          <div role="tablist" aria-label="Loan views" className="flex border-b border-white/[0.07]">
            {TABS.map((t) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`pv-tab ${tab === t ? 'is-on' : ''}`} data-testid={`tab-${t.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{t}</button>
            ))}
          </div>
          <div className={`pv-progress ${running ? 'is-on' : ''}`} aria-hidden />
          <p className="sr-only" aria-live="polite">{running ? 'Replaying preview analysis' : runs ? `Preview analysis replayed ${runs} times` : ''}</p>

          <div className="mt-2.5 space-y-2.5">
            <div key={tab} role="tabpanel" aria-label={tab} className={`pv-swap ${running ? 'opacity-50' : ''} transition-opacity`}>
              {tab === 'Loan Data' && (
                <div className="space-y-2.5">
                  <div className="flex justify-end">
                    <button type="button" onClick={downloadReport} className="pv-btn" data-testid="button-download" title="Open the print dialog and choose Save as PDF" aria-label="Download PDF: print or save the preview report as PDF">
                      <Download size={12} aria-hidden />Download PDF
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2.5 items-stretch">
                    {METRICS.map((m) => <MetricCard key={m.id} m={m} uid={uid} open={!closed.has(m.id)} onToggle={() => toggle(m.id)} />)}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 items-stretch">
                    <PanelCard p={DEBT} uid={uid} open={!closed.has(DEBT.id)} onToggle={() => toggle(DEBT.id)} />
                    <PanelCard p={BANK} uid={uid} open={!closed.has(BANK.id)} onToggle={() => toggle(BANK.id)} />
                  </div>
                  <PanelCard p={CREDIT} uid={uid} wide open={!closed.has(CREDIT.id)} onToggle={() => toggle(CREDIT.id)} />
                </div>
              )}
              {tab === 'Documents' && <DocumentsView />}
              {tab === 'Document Checks (6)' && <ChecksView />}
              {tab === 'AUS Results' && <AusView />}
              {tab === 'Audit Trail' && <AuditView runs={runAt} />}
            </div>
          </div>
        </div>

        {!wide && <ActionItems />}
      </div>
    </div>
  );
}
