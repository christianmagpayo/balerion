// One fictional loan scenario shared by every public product-preview view.
export const LOAN = {
  number: 'BL201200075',
  id: 'aedcbf32-1704-401f-af24-000000000075',
  borrower: 'Aaron Taylor',
  coBorrower: 'David Taylor',
  officer: 'Daniel Reed',
  property: '123 Example Avenue,\nSan Francisco, CA 94107',
  amount: 445500,
  salesPrice: 500000,
  previousSalesPrice: 499000,
  appraisedValue: 495000,
  income: 37801,
  previousIncome: 37950,
  pitia: 2739,
  liabilities: 4224,
  reo: 7897,
  noteRate: 2.375,
  termMonths: 360,
  purpose: 'Purchase',
  program: 'AmeriHome Mortgage - FNMA 30yr Fixed >225K Bal',
  fico: 749,
  coBorrowerFico: 756,
  revolvingBalance: 105229,
  revolvingPayment: 1732,
  largestDebtBalance: 57358,
  largestDebtPayment: 573,
  accounts: 4,
  transactions: 114,
  largeDeposits: 2,
  unresolvedDeposits: 1,
  submission: 7,
  submissionDate: '12/24/2020',
  reportDate: '12/2/2020',
} as const;

export const money = (value: number, cents = false) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0,
}).format(value);
export const MONTHLY_DEBT = LOAN.pitia + LOAN.liabilities + LOAN.reo;
export const DTI = `${(MONTHLY_DEBT / LOAN.income * 100).toFixed(1)}%`;
// Purchase LTV uses the lower of sales price and appraised value.
export const LTV = `${(LOAN.amount / Math.min(LOAN.salesPrice, LOAN.appraisedValue) * 100).toFixed(0)}%`;

export const DOCUMENT_GROUPS = [
  { folder: 'Income', docs: [
    { name: `2019 W-2 ${LOAN.borrower}.pdf`, pages: 2, fields: 48 },
    { name: 'November paystubs.pdf', pages: 2, fields: 34 },
  ] },
  { folder: 'Credit Report', docs: [
    { name: 'Credit Report.pdf', pages: 6, fields: 72 },
    { name: 'supp.pdf', pages: 1, fields: 24 },
  ] },
  { folder: 'Property', docs: [
    { name: 'Appraisal.pdf', pages: 6, fields: 72 },
    { name: 'Flood insurance.pdf', pages: 2, fields: 20 },
    { name: 'Hazard insurance.pdf', pages: 2, fields: 18 },
  ] },
  { folder: 'Loan documents', docs: [
    { name: 'Loan application.pdf', pages: 3, fields: 48 },
    { name: 'Bank statements.pdf', pages: 4, fields: 114 },
    { name: 'Sales contract.pdf', pages: 4, fields: 24 },
    { name: 'HOA Addendum.png', pages: 1, fields: 8 },
    { name: 'Income verification letter.pdf', pages: 1, fields: 12 },
  ] },
];
const documents = DOCUMENT_GROUPS.flatMap((group) => group.docs);
export const DOCUMENT_TOTALS = {
  attachments: documents.length,
  pages: documents.reduce((sum, doc) => sum + doc.pages, 0),
  images: documents.filter((doc) => /\.(png|jpe?g)$/i.test(doc.name)).length,
  classified: documents.length,
  fields: documents.reduce((sum, doc) => sum + doc.fields, 0),
};
