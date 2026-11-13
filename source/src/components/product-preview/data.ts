import { LOAN, money, MONTHLY_DEBT, DTI, LTV } from './scenario';

export const TABS = ['Loan Data', 'Documents', 'Document Checks (6)', 'AUS Results', 'Audit Trail'] as const;
export type Tab = (typeof TABS)[number];

export const SUMMARY: { label: string; value: string; copy?: boolean; caret?: boolean }[] = [
  { label: 'Loan number', value: LOAN.number, copy: true },
  { label: 'Borrower name', value: LOAN.borrower, caret: true },
  { label: 'Loan ID', value: LOAN.id, copy: true },
  { label: 'Loan amount', value: money(LOAN.amount) },
  { label: 'Property', value: LOAN.property },
  { label: 'Loan officer', value: LOAN.officer },
  { label: 'Note rate', value: `${LOAN.noteRate}%` },
  { label: 'Loan purpose', value: LOAN.purpose },
  { label: 'Loan program', value: LOAN.program },
];

export type Status = 'pass' | 'fail' | 'conditions';
export type Metric = { id: string; k: string; v: string; status?: Status; desc: string; note?: string; rows?: [string, string][] };

export const METRICS: Metric[] = [
  { id: 'dti', k: 'DTI', v: DTI, status: 'pass', desc: 'Monthly debt compared with income', note: 'Income committed to debt; measures repayment capacity.' },
  { id: 'ltv', k: 'LTV', v: LTV, desc: 'Loan amount compared with property value', rows: [['Loan Amount', money(LOAN.amount, true)], ['Sales Price', money(LOAN.salesPrice, true)], ['Appraised Value', money(LOAN.appraisedValue, true)]] },
  { id: 'qmi', k: 'QMI', v: money(LOAN.income), desc: 'Verified qualifying monthly income', note: 'Eligible monthly income used to qualify the borrower and calculate DTI.' },
  { id: 'fico', k: 'FICO', v: String(LOAN.fico), desc: 'Representative borrower credit score', rows: [[LOAN.borrower, String(LOAN.fico)], [LOAN.coBorrower, String(LOAN.coBorrowerFico)]] },
];

export type Panel = { id: string; title: string; big?: string; status?: Status; rows: [string, string][] };
export const DEBT: Panel = { id: 'debt', title: 'Monthly Debt', big: money(MONTHLY_DEBT), rows: [['PITIA', money(LOAN.pitia)], ['Liabilities', money(LOAN.liabilities)], ['REO', money(LOAN.reo)]] };
export const BANK: Panel = { id: 'bank', title: 'Bank Analysis', status: 'fail', rows: [['Accounts', String(LOAN.accounts)], ['Statement transactions', String(LOAN.transactions)], ['NSFs', '0 (0 unresolved)'], ['Large deposits', `${LOAN.largeDeposits} (${LOAN.unresolvedDeposits} unresolved)`]] };
export const CREDIT: Panel = { id: 'credit', title: 'Credit Analysis', status: 'conditions', rows: [['Payment-bearing tradelines', '9'], ['Revolving', `${money(LOAN.revolvingBalance)} bal · ${money(LOAN.revolvingPayment)}/mo`], ['Largest Debt', `${money(LOAN.largestDebtBalance)} bal · ${money(LOAN.largestDebtPayment)}/mo`]] };

export type Finding = { id: string; t: string; tag: string; sev: 'critical' | 'review'; msg: string; evidence: string; next: string };
export const FINDINGS: Finding[] = [
  { id: 'deposits', t: 'Large deposits sourced', tag: 'Assets', sev: 'critical', msg: 'Source documentation is still required for one large deposit.', evidence: `Bank Analysis flags ${LOAN.largeDeposits} large deposits, ${LOAN.unresolvedDeposits} still unresolved.`, next: 'Request source documentation for the unresolved deposit.' },
  { id: 'flood-term', t: 'CLR2 - Flood Ins Term Must be 12 Months minimum', tag: 'Property', sev: 'critical', msg: 'The policy shows 11 months; this program requires at least 12.', evidence: 'An 11-month flood insurance term does not meet the 12-month minimum.', next: 'Request updated flood insurance declarations covering at least 12 months.' },
  { id: 'recurring', t: 'Recurring debits disclosed as liabilities', tag: 'Credit', sev: 'review', msg: 'Recurring debits require a reviewer to confirm liability disclosure.', evidence: `${LOAN.transactions} statement transactions compared with disclosed liabilities of ${money(LOAN.liabilities)}/mo.`, next: 'Confirm each recurring debit is disclosed or explained.' },
  { id: 'income', t: 'Qualifying income matches loan file', tag: 'Income', sev: 'review', msg: 'Income has been corrected; underwriter sign-off is pending.', evidence: `Current QMI is ${money(LOAN.income)} and calculated DTI is ${DTI}.`, next: 'Confirm the corrected income against supporting documents.' },
  { id: 'price', t: 'Purchase price consistency across documents', tag: 'Loan Data', sev: 'review', msg: 'Purchase price has been corrected; reviewer sign-off is pending.', evidence: `Sales contract and loan file show ${money(LOAN.salesPrice, true)}. Appraised value is separately ${money(LOAN.appraisedValue, true)}.`, next: 'Sign off on the corrected purchase price.' },
  { id: 'haz-date', t: 'CLR2 - Haz Ins Effective Date Missing', tag: 'Property', sev: 'review', msg: 'The hazard insurance effective date is missing from the loan file.', evidence: 'No hazard insurance effective date has been entered.', next: 'Request hazard insurance showing the effective date.' },
];

export const FINDING_COUNTS = {
  critical: FINDINGS.filter((f) => f.sev === 'critical').length,
  review: FINDINGS.filter((f) => f.sev === 'review').length,
};
export const ANALYSIS_RESULT = `${FINDING_COUNTS.critical} critical, ${FINDING_COUNTS.review} need review`;
