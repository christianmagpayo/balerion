import { d, Eyebrow } from '@/components/site-chrome';
import { UserRound, UserRoundPen, UserRoundCog, UserRoundCheck } from 'lucide-react';
import { HeroFlow } from '@/components/hero-flow';
import './loan-file-story.css';

const BONE = 'hsl(var(--bone)';
const EMBER = 'rgb(123,165,184)';
const ROLES = [
  { k: 'b', label: 'Borrower', x: 50, icon: UserRound },
  { k: 'lo', label: 'Loan officer', x: 150, icon: UserRoundPen },
  { k: 'p', label: 'Processor', x: 250, icon: UserRoundCog },
  { k: 'u', label: 'Underwriter', x: 350, icon: UserRoundCheck },
];
const Y = 120;
const R = 17;
const FLOW_DOT_RADIUS = 3.2;
const FWD = (i: number) => `M${ROLES[i].x + R + 4} ${Y} H${ROLES[i + 1].x - R - 6}`;
// backward clarification arcs (right to left, below the line)
const LOOPS = [
  { d: `M150 ${Y + R + 2} C 140 178, 60 178, 50 ${Y + R + 2}` },
  { d: `M350 ${Y + R + 2} C 340 178, 260 178, 250 ${Y + R + 2}` },
  { d: `M250 ${Y + R + 2} C 240 178, 160 178, 150 ${Y + R + 2}` },
];

function Roles({ strained, ready }: { strained?: boolean; ready?: boolean }) {
  return (
    <>
      {ROLES.map((r, i) => (
        <g key={r.k}>
          <r.icon
            x={r.x - R}
            y={Y - R}
            width={R * 2}
            height={R * 2}
            stroke={ready && i === 3 ? EMBER : `${BONE} / .85)`}
            strokeWidth={1.5}
            className={strained && i > 0 ? 'lfs-strain' : undefined}
            style={{ animationDelay: `${-i * 0.9}s` }}
            aria-hidden="true"
          />
          <text x={r.x} y={Y - R - 12} textAnchor="middle" fontSize="10.5" fill={`${BONE} / .85)`} className="lfs-role">{r.label}</text>
        </g>
      ))}
    </>
  );
}

function Forward({ prefix }: { prefix: string }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={FWD(i)} stroke={`${BONE} / .6)`} strokeWidth="1.3" fill="none" className="lfs-fwd" markerEnd={`url(#${prefix}-arrow)`} />
        </g>
      ))}
    </>
  );
}

function Defs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L8 4 L0 8 Z" fill={`${BONE} / .7)`} />
      </marker>
      <marker id={`${prefix}-arrow-back`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L8 4 L0 8 Z" fill={EMBER} />
      </marker>
    </defs>
  );
}

// Independent illustrative timing keeps right-side adjustments from changing the left.
const RIGHT_CYCLE_SECONDS = 6;
const LEFT_CYCLE_SECONDS = 30;
// Left: pause at LO, P, U (longer each stage), then sequential return arcs.
const L_TIMES = '0;.0933;.1733;.2667;.3867;.48;.64;1';
const L_POINTS = '0;.140565;.140565;.28113;.28113;.421695;.421695;1';

export function LoanFileStory() {
  return (
    <section className="relative border-t border-white/10" aria-labelledby="cost-heading">
      <div className="home-section-spacing mx-auto max-w-7xl px-5 md:px-8">
      <Eyebrow>How Balerion Works</Eyebrow>
      <h2 id="cost-heading" className="reveal font-display mt-5 text-3xl md:text-4xl lg:text-[clamp(1.5rem,2.5vw,2.25rem)] lg:whitespace-nowrap">
        Built to reason through guidelines, not rely on <em className="text-ember">hand-coded rules.</em>
      </h2>
      <p className="reveal mt-6 text-bone/65 lg:text-[clamp(0.75rem,1.05vw,0.875rem)] lg:whitespace-nowrap" style={d(100)}>
        Balerion agents understand each loan’s context and apply lending guidelines in real time, unlike traditional systems that rely on manually maintained rules and guidelines.
      </p>
      <div id="how-it-works" className="scroll-mt-28"><HeroFlow /></div>
      </div>
    </section>
  );
}

export function LoanWorkflowComparison({ className = 'mt-10 rounded-3xl border border-white/10 overflow-hidden' }: { className?: string }) {
  return (
      <div className={className}>
        <div className="grid grid-cols-1">
          {/* Before */}
          <figure className="relative px-5 py-6 sm:px-7 border-b border-white/10">
            <figcaption className="flex items-center gap-3 text-sm font-medium text-white"><span className="font-mono text-[11px] text-bone/40">01</span>Underwriting Today<span className="h-px flex-1 bg-white/10" /></figcaption>
            <svg viewBox="0 80 400 100" className="lfs-svg mx-auto mt-5 w-full h-auto" role="img" aria-labelledby="lfs-before-t lfs-before-d">
              <title id="lfs-before-t">Today: repeated handoffs</title>
              <desc id="lfs-before-d">The file pauses for longer reviews at the loan officer, processor, and underwriter. Questions then travel backward from underwriter to processor, processor to loan officer, and loan officer to borrower.</desc>
              <Defs prefix="lfs-before" />
              <Forward prefix="lfs-before" />
              <Roles strained />
              {LOOPS.map((l, i) => (
                <g key={i}>
                  <path d={l.d} fill="none" stroke={EMBER} strokeOpacity=".75" strokeWidth="1.2" className="lfs-back" markerEnd="url(#lfs-before-arrow-back)" />
                </g>
              ))}
              <circle r={FLOW_DOT_RADIUS} fill={EMBER} className="lfs-dot">
                <animateMotion
                  dur={`${LEFT_CYCLE_SECONDS}s`}
                  repeatCount="indefinite"
                  calcMode="linear"
                  keyTimes={L_TIMES}
                  keyPoints={L_POINTS}
                  path="M50 120 H350 V139 C340 178,260 178,250 139 C240 178,160 178,150 139 C140 178,60 178,50 139 V120 Z"
                />
              </circle>
            </svg>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5 text-xs sm:text-sm font-medium text-white" aria-label="Traditional underwriting outcomes">
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap"><span className="lfs-outcome-arrow lfs-outcome-up text-ember" aria-hidden="true">↑</span><span><span className="sr-only">Higher </span>Cost</span></li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap"><span className="lfs-outcome-arrow lfs-outcome-up font-bold text-ember" aria-hidden="true">↑</span><span><span className="sr-only">Longer </span>Review time</span></li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap"><span className="lfs-outcome-arrow lfs-outcome-up font-bold text-ember" aria-hidden="true">↑</span><span><span className="sr-only">More </span>Rework</span></li>
            </ul>
          </figure>

          {/* After */}
          <figure className="relative px-5 py-6 sm:px-7 bg-white/[0.02]">
            <figcaption className="flex items-center gap-3 text-sm font-medium text-white"><span className="font-mono text-[11px]" style={{ color: EMBER }}>02</span><span>Underwriting with <strong className="font-bold text-ember">Balerion</strong></span><span className="h-px flex-1" style={{ background: 'rgba(123,165,184,0.35)' }} /></figcaption>
            <svg viewBox="0 80 400 155" className="lfs-svg mx-auto mt-5 w-full h-auto" role="img" aria-labelledby="lfs-after-t lfs-after-d">
              <title id="lfs-after-t">With Balerion: issues flagged at submission</title>
              <desc id="lfs-after-d">Balerion identifies gaps when the borrower submits files, before they reach the loan officer, and helps resolve issues early. The borrower and loan officer can address flagged issues before the file moves to the processor and underwriter, arriving closer to review-ready.</desc>
              <Defs prefix="lfs-after" />
              <Forward prefix="lfs-after" />
              <Roles ready />
              {/* Balerion checks submitted files between borrower and loan officer. */}
              <line x1="100" y1={Y - 9} x2="100" y2={Y + 9} stroke={EMBER} strokeWidth="2" />
              <path d={`M100 ${Y + 9} V153 M100 168 V198`} fill="none" stroke={EMBER} strokeWidth="1.2" strokeDasharray="1 4" strokeLinecap="round" strokeOpacity=".65" />
              <g className="lfs-permanent-label">
                <rect x="5" y="198" width="184" height="30" rx="8" fill="rgba(123,165,184,0.08)" stroke={EMBER} />
                <text x="97" y="217" textAnchor="middle" fontSize="9" fill={EMBER}>Balerion identifies gaps early</text>
              </g>
              <path d="M150 141 C135 167,65 167,50 141" fill="none" stroke={EMBER} strokeWidth="1.2" strokeOpacity=".8" className="lfs-back" markerEnd="url(#lfs-after-arrow-back)" />
              <circle r={FLOW_DOT_RADIUS} fill={EMBER} className="lfs-dot">
                <animateMotion
                  dur={`${RIGHT_CYCLE_SECONDS}s`}
                  repeatCount="indefinite"
                  calcMode="paced"
                  path="M50 120 H150 V141 C135 167,65 167,50 141 V120 H350"
                />
              </circle>
              <text x="350" y={Y + R + 20} textAnchor="middle" fontSize="8" fill={EMBER}>Sign off ready</text>
            </svg>
            <ul className="mt-7 flex items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-white" aria-label="Balerion outcomes">
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap"><span className="lfs-outcome-arrow lfs-outcome-down text-ember" aria-hidden="true">↓</span><span><span className="sr-only">Lower </span>Cost</span></li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap"><span className="lfs-outcome-arrow lfs-outcome-down font-bold text-ember" aria-hidden="true">↓</span><span><span className="sr-only">Shorter </span>Review time</span></li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap"><span className="lfs-outcome-arrow lfs-outcome-down font-bold text-ember" aria-hidden="true">↓</span><span><span className="sr-only">Less </span>Rework</span></li>
            </ul>
          </figure>
        </div>
      </div>

  );
}
