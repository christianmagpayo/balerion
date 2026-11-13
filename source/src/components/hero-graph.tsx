const DOCS = ['1003', 'W-2', 'Paystub', 'Appraisal', 'Title', 'CD', 'Bank stmt', 'VOE'];
const AGENTS = [
  { id: 'u', label: 'UNDERSTAND', x: 300, y: 110 },
  { id: 'e', label: 'EVALUATE', x: 300, y: 240 },
  { id: 'a', label: 'ACT', x: 300, y: 370 },
];
const OUT = [
  { label: 'Condition cleared', y: 140, tone: 'steel' },
  { label: 'Income mismatch flagged', y: 240, tone: 'ember' },
  { label: 'Routed to underwriter', y: 340, tone: 'bone' },
];

export function HeroGraph() {
  return (
    <svg viewBox="0 0 600 480" className="w-full h-auto" role="img" aria-label="Illustration: loan documents flowing through Understand, Evaluate and Act agents into routed outcomes">
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(12 100% 55%)" stopOpacity=".55" />
          <stop offset="100%" stopColor="hsl(12 100% 55%)" stopOpacity="0" />
        </radialGradient>
        {DOCS.map((_, i) => (
          <path key={i} id={`in${i}`} d={`M 92 ${60 + i * 48} C 190 ${60 + i * 48}, 200 ${AGENTS[i % 3].y}, 300 ${AGENTS[i % 3].y}`} />
        ))}
        <path id="ue" d="M 300 110 C 360 150, 360 200, 300 240" />
        <path id="ea" d="M 300 240 C 240 280, 240 330, 300 370" />
        {OUT.map((o, i) => (
          <path key={i} id={`out${i}`} d={`M 300 ${AGENTS[i].y} C 400 ${AGENTS[i].y}, 400 ${o.y}, 470 ${o.y}`} />
        ))}
      </defs>

      <circle cx="300" cy="240" r="210" fill="url(#core)" opacity=".35" />
      <circle cx="300" cy="240" r="170" fill="none" stroke="hsl(38 30% 93% / .08)" strokeDasharray="2 8" className="spin-slow" />

      {DOCS.map((d, i) => (
        <g key={d}>
          <use href={`#in${i}`} fill="none" stroke="hsl(38 30% 93% / .14)" strokeWidth="1" className="flow" />
          <g transform={`translate(18 ${46 + i * 48})`}>
            <rect width="74" height="28" rx="5" fill="hsl(0 0% 11%)" stroke="hsl(38 30% 93% / .16)" />
            <rect x="8" y="9" width="10" height="10" rx="2" fill="hsl(12 100% 55% / .5)" />
            <text x="24" y="18" fill="hsl(38 30% 93% / .75)" fontSize="9" fontFamily="JetBrains Mono">{d}</text>
          </g>
          <circle r="2.6" fill="hsl(38 30% 93%)" className="motion-particle">
            <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${i * 0.37}s`} repeatCount="indefinite">
              <mpath href={`#in${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      <use href="#ue" fill="none" stroke="hsl(12 100% 55% / .5)" strokeWidth="1.4" className="flow" />
      <use href="#ea" fill="none" stroke="hsl(12 100% 55% / .5)" strokeWidth="1.4" className="flow" />
      {['ue', 'ea'].map((p, i) => (
        <circle key={p} r="3.4" fill="hsl(12 100% 55%)" className="motion-particle">
          <animateMotion dur="1.8s" begin={`${i * 0.9}s`} repeatCount="indefinite"><mpath href={`#${p}`} /></animateMotion>
        </circle>
      ))}

      {OUT.map((o, i) => (
        <g key={o.label}>
          <use href={`#out${i}`} fill="none" stroke="hsl(38 30% 93% / .18)" className="flow" />
          <circle r="2.6" fill="hsl(12 100% 55%)" className="motion-particle">
            <animateMotion dur="2.4s" begin={`${0.6 + i * 0.7}s`} repeatCount="indefinite"><mpath href={`#out${i}`} /></animateMotion>
          </circle>
          <g transform={`translate(470 ${o.y - 15})`}>
            <rect width="122" height="30" rx="15" fill={o.tone === 'ember' ? 'hsl(12 100% 55%)' : 'hsl(0 0% 11%)'} stroke={o.tone === 'ember' ? 'none' : 'hsl(38 30% 93% / .2)'} />
            <text x="61" y="19" textAnchor="middle" fill={o.tone === 'ember' ? 'hsl(0 0% 4%)' : 'hsl(38 30% 93% / .85)'} fontSize="8.6" fontFamily="JetBrains Mono">{o.label}</text>
          </g>
        </g>
      ))}

      {AGENTS.map((a, i) => (
        <g key={a.id}>
          <circle cx={a.x} cy={a.y} r="26" fill="none" stroke="hsl(12 100% 55%)" className="pulse-ring" style={{ ['--d' as string]: `${i * 800}ms` }} />
          <circle cx={a.x} cy={a.y} r="26" fill="hsl(0 0% 4%)" stroke="hsl(12 100% 55%)" strokeWidth="1.5" />
          <circle cx={a.x} cy={a.y} r="6" fill="hsl(12 100% 55%)" />
          <text x={a.x + 38} y={a.y + 4} fill="hsl(38 30% 93%)" fontSize="10" letterSpacing="2" fontFamily="JetBrains Mono">{a.label}</text>
        </g>
      ))}
    </svg>
  );
}
