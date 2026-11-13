import { useState, type ReactNode } from 'react';
import { CheckCircle2, ChevronUp, ChevronDown, Minus, Plus, FileText, Sparkles } from 'lucide-react';
import { SUMMARY } from './data';
import { LOAN, money, DTI, LTV, MONTHLY_DEBT } from './scenario';

const v = (label: string) => SUMMARY.find((s) => s.label === label)?.value ?? '';

const ITEMS = [
  'Refer to all Fannie Mae Lender Letters for temporary policies applying to this loan.',
  'Close loan by the expiration date; ensure all credit documents are no more than four months old on note date.',
  `Obtain mortgage insurance with at least 25% coverage at ${LTV} LTV; verify premium accuracy.`,
  'Document omitted liabilities or mark paid at closing and resubmit to DU before closing.',
  'Verify mortgage payment history; loan ineligible if mortgage 60+ days past due currently or in last 12 months.',
  'Perform verbal employment verification for each borrower; resolve DU vendor data and validation failures.',
  'Obtain signed Form 4506-C for each borrower at or before closing.',
  'Verify liquid assets, depository assets and earnest money source; document large deposits.',
  'Address Collateral Underwriter data discrepancies and adjustment messages from appraisal review.',
];

function Grid({ rows }: { rows: [string, string][] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6">
      {rows.map(([a, b]) => <div key={a} className="grid grid-cols-[1fr_1fr] gap-2 py-1.5 border-b border-ink/10"><b className="font-semibold">{a}</b><span>{b}</span></div>)}
    </div>
  );
}
function Sec({ t, children }: { t: string; children: ReactNode }) {
  return <div className="mt-4"><div className="text-[12px] border-b border-ink/40 pb-1 mb-1">{t}</div>{children}</div>;
}

const PAGES: ReactNode[] = [
  <>
    <Grid rows={[['Borrower 1', LOAN.borrower], ['Submission Number', String(LOAN.submission)], ['Borrower 2', LOAN.coBorrower], ['Submission Date', LOAN.submissionDate], ['Lender Loan Number', LOAN.number], ['DU Version', '10.3']]} />
    <Sec t="Mortgage Information"><Grid rows={[['LTV/CLTV/HCLTV', `${LTV} / ${LTV} / ${LTV}`], ['Note Rate', v('Note rate')], ['Debt-to-Income Ratio', DTI], ['Loan Type', 'Conventional'], ['Total Loan Amount', money(LOAN.amount, true)], ['Loan Term', `${LOAN.termMonths} months`], ['Sales Price', money(LOAN.salesPrice, true)], ['Amortization Type', 'Fixed Rate'], ['Appraised Value', money(LOAN.appraisedValue, true)], ['Loan Purpose', LOAN.purpose]]} /></Sec>
    <Sec t="Property Information"><Grid rows={[['Property Address', v('Property').replace('\n', ' ')], ['Number of Units', '1']]} /></Sec>
  </>,
  <>
    <Sec t="Credit and Income"><Grid rows={[['Representative Score', String(LOAN.fico)], ['Qualifying Income', money(LOAN.income, true)], ['Total Monthly Debt', money(MONTHLY_DEBT, true)], ['Revolving Balance', money(LOAN.revolvingBalance, true)]]} /></Sec>
    <Sec t="Risk/Eligibility"><p className="py-1.5">Recommendation: Approve/Eligible. The loan is eligible for delivery provided the conditions in this report are met.</p></Sec>
  </>,
  <Sec t="Verification Messages / Approval Conditions"><ol className="list-decimal pl-4 space-y-1 py-1">{ITEMS.map((t) => <li key={t}>{t}</li>)}</ol></Sec>,
];

export function AusView() {
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  return (
    <div className="space-y-2.5">
      <div className="pv-stale !text-ember !border-ember/25 !bg-ember/10" role="status"><CheckCircle2 size={12} aria-hidden />Analysis matches the current loan data. Final approval is subject to outstanding conditions.</div>
      <div className="grid grid-cols-[0.9fr_1.1fr] gap-2.5 items-start">
        <section className="pv-card p-3.5" aria-label="DU findings summary">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-[13px] text-ember"><CheckCircle2 size={14} aria-hidden />DU: Approve/Eligible</div>
              <div className="mt-0.5 text-[10px] pv-cond">Analyzed in this preview · sample data</div>
            </div>
            <span className="pv-chip-rev inline-flex items-center gap-1 uppercase tracking-wider"><Sparkles size={9} aria-hidden />Summarized by Balerion</span>
          </div>
          <div className="mt-3 text-[11.5px] font-medium text-bone">Outstanding items from the DU findings report:</div>
          <ul className="mt-2 space-y-1.5">
            {ITEMS.map((t) => <li key={t} className="flex gap-2 text-[11px] leading-snug text-bone/75"><span className="mt-[6px] h-1 w-1 rounded-full bg-ember shrink-0" aria-hidden />{t}</li>)}
          </ul>
        </section>
        <section className="pv-card overflow-hidden" aria-label="DU findings report viewer">
          <div className="px-3.5 py-2.5 border-b border-white/[0.07]">
            <div className="flex items-center gap-1.5 text-[12px] text-bone"><FileText size={13} aria-hidden className="text-bone/60" />DU Findings Report</div>
            <div className="mt-0.5 text-[10px] text-bone/45">FINDINGS.PDF · Submission {LOAN.submission} · {LOAN.submissionDate}</div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/[0.07] text-[10.5px] text-bone/70">
            <button type="button" className="pv-icon-btn" aria-label="Previous page" disabled={page === 0} onClick={() => setPage((p) => p - 1)} data-testid="button-aus-prev"><ChevronUp size={11} aria-hidden /></button>
            <button type="button" className="pv-icon-btn" aria-label="Next page" disabled={page === PAGES.length - 1} onClick={() => setPage((p) => p + 1)} data-testid="button-aus-next"><ChevronDown size={11} aria-hidden /></button>
            <span className="tabular-nums" aria-live="polite">{page + 1} of {PAGES.length}</span>
            <span className="flex-1" />
            <button type="button" className="pv-icon-btn" aria-label="Zoom out" disabled={zoom <= 0.8} onClick={() => setZoom((z) => +(z - 0.1).toFixed(1))} data-testid="button-aus-zoom-out"><Minus size={11} aria-hidden /></button>
            <span className="tabular-nums w-9 text-center">{Math.round(zoom * 100)}%</span>
            <button type="button" className="pv-icon-btn" aria-label="Zoom in" disabled={zoom >= 1.3} onClick={() => setZoom((z) => +(z + 0.1).toFixed(1))} data-testid="button-aus-zoom-in"><Plus size={11} aria-hidden /></button>
          </div>
          <div className="pv-viewer h-[395px] p-3">
            <div key={page} className="pv-swap pv-paper text-[9.5px] origin-top-left" style={{ transform: `scale(${zoom})` }}>{PAGES[page]}<p className="mt-4 text-[8px] opacity-50">Reconstructed preview of report structure with sample data.</p></div>
          </div>
        </section>
      </div>
    </div>
  );
}
