import { useEffect, useId, useState } from 'react';
import { HeroFlow } from './hero-flow';
import './product-flow.css';

const INPUTS = [
  ['Form 1003', 'Application'], ['Paystubs · W-2', 'Income'],
  ['Bank statements', 'Assets'], ['Credit report', 'Liabilities'],
  ['Appraisal', 'Collateral'], ['More loan documents', ''],
];
const REASONING = [
  'Document understanding', 'Evidence retrieval', 'Cross-file validation',
  'Guideline application', 'Source-grounded answers', 'Uncertainty & escalation',
];
const OUTPUTS = [
  ['Calculations', ['DTI · LTV · income']],
  ['Checks', ['Cross-document', 'consistency']],
  ['Conditions', ['Source a large deposit']],
] as const;
const ROW_Y = INPUTS.map((_, i) => 100 + i * 40);
const OUT_Y = [100, 180, 260];
const BLUE = 'hsl(var(--ember))';
const BONE = 'hsl(var(--bone))';
const FRAMES = [
  { x: 8, width: 234, title: 'Documents' },
  { x: 320, width: 300, title: 'Balerion agents' },
  { x: 684, width: 232, title: 'Intelligence' },
  { x: 990, width: 190, title: 'Human review' },
];
const SPANS = [[250, 312], [628, 676], [924, 982]] as const;
const MID_Y = 196.5;
const arrow = (start: number, end: number) =>
  `M${start} ${MID_Y - 7} H${end - 18} V${MID_Y - 17} L${end} ${MID_Y} L${end - 18} ${MID_Y + 17} V${MID_Y + 7} H${start} Z`;

/** Later framed workflow: one animated arrow between each bounded stage. */
export function ProductFlow() {
  const id = useId();
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      clearInterval(timer);
      setStage(preference.matches ? -1 : 0);
      if (!preference.matches) timer = setInterval(() => setStage((current) => (current + 1) % FRAMES.length), 3000);
    };
    start();
    preference.addEventListener('change', start);
    return () => { clearInterval(timer); preference.removeEventListener('change', start); };
  }, []);
  const title = `${id}-title`;
  const desc = `${id}-desc`;
  const partClass = (index: number) => `product-flow-part ${stage >= 0 && stage !== index ? 'is-muted' : ''}`;
  return (
    <figure className="product-flow mt-10" data-testid="figure-product-sankey">
      <div className="hidden overflow-hidden rounded-2xl border border-ember/25 bg-ink/80 p-2 md:block md:p-5">
        <svg viewBox="0 0 1200 352" className="block h-auto w-full" role="img" aria-labelledby={`${title} ${desc}`}>
          <title id={title}>How Balerion reasons across a loan file</title>
          <desc id={desc}>Loan documents connect to the Balerion agentic reasoning layer. It produces calculations, checks, and conditions, which flow into human review and sign-off. These connections represent a conceptual workflow, not measured quantities.</desc>
          {FRAMES.map((frame, i) => (
            <g key={frame.title} className={partClass(i)}>
              <text x={frame.x + 12} y="28" fontSize="10.5" letterSpacing="1.5" fill="hsl(var(--bone) / .6)" className={`product-flow-label ${stage === i ? 'is-active' : ''}`} fontFamily="JetBrains Mono, monospace"><tspan fill={BLUE}>0{i + 1}</tspan> {frame.title.toUpperCase()}</text>
              <rect x={frame.x} y="58" width={frame.width} height="277" rx="12" fill="hsl(0 0% 10%)" stroke="hsl(var(--ember) / .4)" className={`product-flow-stage ${stage === i ? 'is-active' : ''}`} data-active={stage === i} data-testid={`product-flow-stage-${i + 1}`} />
            </g>
          ))}
          {SPANS.map(([start, end], i) => {
            const length = end - start;
            const gradient = `${id}-sweep-${i}`;
            return (
              <g key={i}>
                <defs>
                  <linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1={start} x2={end} y1="0" y2="0">
                    <stop offset="0" stopColor={BLUE} stopOpacity=".12" />
                    <stop offset=".5" stopColor={BLUE} stopOpacity=".8" />
                    <stop offset="1" stopColor={BLUE} stopOpacity=".12" />
                    <animateTransform attributeName="gradientTransform" type="translate" from={`${-length} 0`} to={`${length} 0`} dur="2.4s" begin={`${i * .4}s`} repeatCount="indefinite" />
                  </linearGradient>
                </defs>
                <path d={arrow(start, end)} fill="hsl(var(--ember) / .16)" stroke="hsl(var(--ember) / .6)" strokeLinejoin="round" />
                <path d={arrow(start, end)} fill={`url(#${gradient})`} className={`product-flow-sweep ${stage === i + 1 ? 'is-active' : ''}`} />
              </g>
            );
          })}
          {INPUTS.map(([name, category], i) => (
            <g key={name} transform={`translate(20 ${ROW_Y[i] - 15})`} className={partClass(0)}>
              <rect width="210" height="30" rx="7" fill="hsl(0 0% 6%)" stroke="hsl(var(--bone) / .16)" />
              <rect y="9" width="2" height="12" rx="1" fill={BLUE} />
              <text x="12" y="19.5" fontSize="12" fill={BONE}>{name}</text>
              {category && <text x="200" y="19" textAnchor="end" fontSize="8" letterSpacing=".6" fill="hsl(var(--bone) / .45)">{category.toUpperCase()}</text>}
            </g>
          ))}
          {REASONING.map((label, i) => (
            <g key={label} transform={`translate(342 ${ROW_Y[i] - 15})`} className={partClass(1)}>
              <rect width="256" height="30" rx="7" fill="hsl(0 0% 4%)" stroke="hsl(var(--bone) / .1)" />
              <text x="12" y="19" fontSize="9" fill={BLUE}>0{i + 1}</text>
              <text x="34" y="19.5" fontSize="12" fill="hsl(var(--bone) / .9)">{label}</text>
            </g>
          ))}
          {OUTPUTS.map(([label, lines], i) => (
            <g key={label} transform={`translate(700 ${OUT_Y[i] - 30})`} className={partClass(2)}>
              <rect width="200" height="60" rx="8" fill="hsl(0 0% 6%)" stroke="hsl(var(--bone) / .16)" />
              <text x="14" y="20" fontSize="9.5" letterSpacing="1.5" fill={BLUE}>{label.toUpperCase()}</text>
              {lines.map((line, j) => <text key={line} x="14" y={(lines.length === 1 ? 41 : 36) + j * 14} fontSize="12" fill="hsl(var(--bone) / .85)">{line}</text>)}
            </g>
          ))}
          <g transform="translate(1004 85)" className={partClass(3)}>
            <text x="14" y="65" fontSize="10" letterSpacing="1.5" fill={BLUE}>HUMAN</text>
            <text x="14" y="98" fontFamily="Fraunces, serif" fontSize="21" fill={BONE}>Review and</text>
            <text x="14" y="125" fontFamily="Fraunces, serif" fontSize="21" fill={BONE}>sign off</text>
          </g>
          <path d="M1085 235 V277" stroke="hsl(var(--ember) / .6)" strokeWidth="1" className={partClass(3)} />
          <g transform="translate(1004 280)" className={partClass(3)}>
            <rect width="162" height="35" rx="8" fill={BLUE} />
            <text x="81" y="22" textAnchor="middle" fontSize="12" fontWeight="600" fill="hsl(var(--ink))">Underwritten loan</text>
          </g>
        </svg>
      </div>
      <div className="md:hidden"><HeroFlow /></div>
    </figure>
  );
}
