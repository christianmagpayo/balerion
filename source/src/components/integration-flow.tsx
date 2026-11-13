import { BASE } from '@/components/site-chrome';
import './integration-flow.css';

/* Lanes: documents LOS -> Balerion; insights, conditions and audits Balerion -> LOS */
const IN_Y = 104;
const OUT_Y = 196;
const X0 = 150;
const X1 = 470;
const RETURNS = ['Insights', 'Conditions', 'Audits'];

function Doc({ i }: { i: number }) {
  return (
    <g className={`if-doc if-n${i}`} style={{ animationDelay: `${i * 2.7}s` }}>
      <g transform={`translate(${X0 - 9} ${IN_Y - 12})`}>
        <path d="M0 2 a2 2 0 0 1 2-2 h10 l6 6 v16 a2 2 0 0 1-2 2 h-14 a2 2 0 0 1-2-2z" fill="hsl(var(--ink))" stroke="hsl(var(--bone) / .75)" strokeWidth="1" />
        <path d="M12 0 v6 h6" fill="none" stroke="hsl(var(--bone) / .75)" strokeWidth="1" />
        <path d="M4 11 h10 M4 15 h10 M4 19 h6" stroke="hsl(var(--bone) / .45)" strokeWidth="1" />
      </g>
    </g>
  );
}

function Insight({ i }: { i: number }) {
  return (
    <g className={`if-ins if-n${i}`} style={{ animationDelay: `${1.35 + i * 2.7}s` }}>
      <g transform={`translate(${X1 - 32} ${OUT_Y - 10})`}>
        <rect width="64" height="20" rx="10" fill="hsl(var(--ink))" stroke="hsl(var(--ember))" strokeWidth="1" />
        <path d="M5 10.5 l3 3 l5-7" fill="none" stroke="hsl(var(--ember))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="17" y="13" fontSize="8" fill="hsl(var(--ember))">{RETURNS[i]}</text>
      </g>
    </g>
  );
}

function Lane({ y, dir, label, blue }: { y: number; dir: 1 | -1; label: string | string[]; blue?: boolean }) {
  const c = blue ? 'hsl(var(--ember))' : 'hsl(var(--bone) / .55)';
  const tip = dir === 1 ? X1 : X0;
  return (
    <g>
      <line x1={X0} y1={y} x2={X1} y2={y} stroke={blue ? 'hsl(var(--ember) / .3)' : 'hsl(var(--bone) / .14)'} strokeWidth="1" />
      <line x1={X0} y1={y} x2={X1} y2={y} stroke={c} strokeWidth="1" strokeDasharray="2 8" className={dir === 1 ? 'if-dash-r' : 'if-dash-l'} />
      <path d={`M${tip - dir * 7} ${y - 4.5} L${tip} ${y} L${tip - dir * 7} ${y + 4.5}`} fill="none" stroke={c} strokeWidth="1.2" />
      <text x={(X0 + X1) / 2} y={y + (blue ? 30 : -24)} textAnchor="middle" className="if-label" fill={c}>
        {(Array.isArray(label) ? label : [label]).map((line, i) => <tspan key={line} x={(X0 + X1) / 2} dy={i === 0 ? 0 : 14}>{line}</tspan>)}
      </text>
    </g>
  );
}

export function IntegrationFlow() {
  return (
    <div className="if-wrap rounded-2xl border border-white/10 bg-card p-4 md:p-6" role="img" aria-label="Documents and loan data move from your LOS into Balerion; insights, conditions, and audits move from Balerion back to your LOS">
      <svg viewBox="0 20 620 260" className="block w-full h-auto" aria-hidden>
        <defs>
          <radialGradient id="if-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--ember))" stopOpacity=".28" />
            <stop offset="100%" stopColor="hsl(var(--ember))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* LOS */}
        <rect x="10" y="40" width="130" height="220" rx="14" fill="hsl(var(--ink) / .7)" stroke="hsl(var(--bone) / .16)" />
        <text x="75" y="66" textAnchor="middle" className="if-head" fill="hsl(var(--bone) / .85)">YOUR LOS</text>
        {['Documents', 'Borrower data', 'Conditions'].map((t, n) => (
          <g key={t}>
            <rect x="29" y={86 + n * 40} width="92" height="26" rx="6" fill="hsl(var(--bone) / .03)" stroke="hsl(var(--bone) / .1)" />
            <text x="75" y={103 + n * 40} textAnchor="middle" className="if-input-row" fill="hsl(var(--bone) / .6)">{t}</text>
          </g>
        ))}
        <rect x="24" y="210" width="102" height="34" rx="7" className="if-land" fill="hsl(var(--ember) / .1)" stroke="hsl(var(--ember) / .45)" />
        <text x="75" y="224" textAnchor="middle" fontSize="9" fill="hsl(var(--ember))">
          <tspan x="75">Insights · Conditions</tspan>
          <tspan x="75" dy="13">Audits</tspan>
        </text>

        {/* Balerion */}
        <g transform="translate(100 0)">
        <circle cx="445" cy="150" r="96" fill="url(#if-glow)" className="if-pulse" />
        <rect x="380" y="40" width="130" height="220" rx="14" fill="hsl(var(--ink))" stroke="hsl(var(--ember) / .55)" />
        <circle cx="445" cy="132" r="34" fill="none" stroke="hsl(var(--ember) / .35)" strokeDasharray="3 5" className="if-ring" />
        <image href={`${BASE}brand/dragon.svg`} x="425" y="112" width="40" height="40" />
        <text x="445" y="66" textAnchor="middle" className="if-head" fill="hsl(var(--ember))">BALERION</text>
        <text x="445" y="196" textAnchor="middle" className="if-row" fill="hsl(var(--bone) / .55)">reason over</text>
        <text x="445" y="211" textAnchor="middle" className="if-row" fill="hsl(var(--bone) / .55)">the full file</text>
        </g>

        <Lane y={IN_Y} dir={1} label="DOCUMENTS + DATA IN" />
        <Lane y={OUT_Y} dir={-1} label={['INSIGHTS · CONDITIONS · AUDITS', 'BACK TO LOS']} blue />

        {[0, 1, 2].map((i) => <Doc key={i} i={i} />)}
        {[0, 1, 2].map((i) => <Insight key={i} i={i} />)}
      </svg>
    </div>
  );
}
