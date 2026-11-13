import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Nav, Footer, Eyebrow, useReveal, d, DEMO, CANDIDATE, INVESTOR, FUNDING } from '@/components/site-chrome';
import { AgentConsole } from '@/components/agent-console';
import { Testimonials } from '@/components/testimonials';
import { BlogPosts } from '@/components/blog-posts';
import { Investors } from '@/components/investors';
import { LoanFileStory, LoanWorkflowComparison } from '@/components/loan-file-story';
import './home.css';


function Hero() {
  return (
    <section id="top" className="relative text-bone overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-[160px] pb-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] items-center gap-10 lg:gap-16 xl:gap-20">
        <div className="min-w-0 max-w-xl">
          <h1 className="rise font-display text-[clamp(1.9rem,3.7vw,3.25rem)] leading-[1.1]" style={d(120)}>
            Building an <span className="underline decoration-ember/70 decoration-2 underline-offset-8">agentic platform</span> to transform <em className="text-ember">mortgage underwriting.</em>
          </h1>
          <p className="rise mt-5 text-base leading-relaxed text-bone/65" style={d(520)}>
            Connects documents, data, and lending requirements to flag issues early and guide resolution. <strong className="font-semibold text-ember">Reduce costs, shorten review time,</strong>{' '}and{' '}<strong className="font-semibold text-ember">cut rework.</strong>
          </p>
          <div className="rise mt-14 md:mt-16 flex flex-wrap items-center gap-3" style={d(620)}>
            <a href={DEMO} data-testid="button-hero-request-demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
              Request Demo <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="#how-it-works" data-testid="button-hero-how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/20 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-ember/60 hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
              How it works <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <LoanWorkflowComparison className="lfs-hero-panel min-w-0 w-full max-w-[540px] mx-auto lg:mx-0 lg:justify-self-end rounded-[22px] border border-white/10 overflow-hidden" />
      </div>
      <Stats />
    </section>
  );
}

function Stats() {
  const s = [['20K+', 'loan files evaluated'], ['900+', 'document types recognized'], ['5 min', 'avg. closed-loan review'], ['$4B+', 'funded annually by our customers']];
  return (
    <div className="home-stats relative border-t border-white/10">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {s.map(([n, l], i) => (
          <div key={l} className={`reveal group px-5 md:px-8 py-8 md:py-10 border-white/10 ${i % 2 ? 'border-l' : ''} ${i === 2 ? 'md:border-l' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''}`} style={d(i * 90)} data-testid={`stat-${i}`}>
            <div className="font-display text-5xl md:text-6xl group-hover:text-ember transition-colors">{n}</div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-bone/45">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contrast() {
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-36">
      <Eyebrow>Intelligence before underwriting</Eyebrow>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="reveal rounded-3xl border border-bone/15 p-8 md:p-10">
          <div className="font-mono text-xs text-bone/55 uppercase tracking-widest">Extraction tools</div>
          <div className="font-display text-4xl md:text-5xl mt-4 text-bone/50 line-through decoration-bone/30">Read a field.</div>
          <div className="mt-10 space-y-2">
            {['gross_income: 8,412.00', 'employer: Harbor Freight Ln.', 'pay_date: 03/15'].map((t) => (
              <div key={t} className="font-mono text-sm rounded-lg bg-muted px-3 py-2 text-bone/60">{t}</div>
            ))}
          </div>
        </div>
        <div className="reveal rounded-3xl bg-ink text-bone p-8 md:p-10 relative overflow-hidden" style={d(150)}>
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-ember/15 blur-3xl" />
          <div className="relative">
            <div className="font-mono text-xs text-ember uppercase tracking-widest">Balerion agents</div>
            <div className="font-display text-4xl md:text-5xl mt-4">Understand the file.</div>
            <svg viewBox="0 0 360 120" className="mt-8 w-full" aria-hidden>
              {[[30, 30, 'Paystub'], [30, 90, 'W-2'], [180, 60, 'Guideline'], [320, 60, 'Finding']].map(([x, y, t]) => (
                <g key={t as string}>
                  <circle cx={x as number} cy={y as number} r="6" fill={t === 'Finding' ? 'hsl(var(--ember))' : 'hsl(38 30% 93%)'} />
                  <text x={x as number} y={(y as number) + 22} textAnchor="middle" fontSize="10" fill="hsl(38 30% 93% / .6)" fontFamily="JetBrains Mono">{t as string}</text>
                </g>
              ))}
              <path d="M36 30 L174 60 M36 90 L174 60 M186 60 L314 60 M30 36 L30 84" stroke="hsl(var(--ember))" strokeWidth="1.2" fill="none" className="flow" />
            </svg>
            <p className="mt-4 text-bone/65 max-w-sm">Documents, borrower data, calculations, and lender requirements. One connected view.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const STAGES = [
  { n: '01', t: 'Understand', c: 'Classify documents, extract information, and connect data across the complete loan file.', g: 'scan' },
  { n: '02', t: 'Evaluate', c: 'Cross-check information against agency guidelines, program requirements, and lender overlays.', g: 'reason' },
  { n: '03', t: 'Act', c: 'Flag discrepancies, explain why they matter, and guide remediation.', g: 'route' },
];

function LenderOutcomes() {
  const outcomes = [
    ['More capacity.', 'More loans per underwriter.'],
    ['Less friction.', 'Fewer touches. Less back-and-forth.'],
    ['Faster turnaround.', 'Faster warehouse turnover. Less borrower fallout.'],
    ['Lower cost.', 'Less manual review and fulfillment work.'],
  ];
  const audiences = [
    ['Loan originators', 'Cleaner files. Earlier.', 'Find missing information and resolve issues before underwriting.'],
    ['Correspondent lenders & investors', 'Confidence in loan quality.', 'Evaluate incoming files and surface quality feedback before costly escalations.'],
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32" aria-labelledby="outcomes-heading">
      <Eyebrow>The business outcome</Eyebrow>
      <h2 id="outcomes-heading" className="reveal font-display mt-6 max-w-4xl text-5xl md:text-7xl leading-[0.95]">Better loans.<br /><em className="text-ember">Ready for review.</em></h2>
      <p className="reveal mt-6 max-w-xl text-bone/65">Higher-quality files reach the underwriter the first time. Less rework. More time for human judgment.</p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {outcomes.map(([title, copy], i) => (
          <div key={title} className="reveal border-t border-ember/40 pt-6" style={d(i * 80)}>
            <h3 className="font-display text-3xl">{title}</h3>
            <p className="mt-3 text-sm text-bone/65">{copy}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 grid md:grid-cols-2 gap-5">
        {audiences.map(([label, title, copy], i) => (
          <div key={label} className="reveal rounded-3xl bg-card border border-bone/15 p-7 md:p-9" style={d(i * 100)}>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ember">{label}</p>
            <h3 className="font-display mt-4 text-4xl">{title}</h3>
            <p className="mt-4 max-w-md text-bone/65">{copy}</p>
          </div>
        ))}
      </div>
      <figure className="reveal mt-12 border-l-2 border-ember pl-6 max-w-3xl">
        <blockquote className="font-display text-2xl md:text-3xl">“Balerion is shifting that work upstream and automating it.”</blockquote>
        <figcaption className="mt-4 text-sm text-bone/55">David Brecher · President and CEO, FM Home Loans</figcaption>
      </figure>
    </section>
  );
}

function StageGlyph({ g }: { g: string }) {
  if (g === 'scan') return (
    <div className="relative h-40 rounded-2xl bg-ink overflow-hidden">
      <div className="absolute inset-4 grid grid-cols-4 gap-2">
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className={`rounded ${i === 5 || i === 10 ? 'bg-ember/70' : 'bg-white/10'}`} />)}
      </div>
      <div className="scan absolute left-0 right-0 top-2 h-0.5 bg-ember" style={{ ['--scan' as string]: '150px' }} />
    </div>
  );
  if (g === 'reason') return (
    <svg viewBox="0 0 240 160" className="h-40 w-full rounded-2xl bg-ink" aria-hidden>
      {[[40, 40], [40, 120], [120, 30], [120, 80], [120, 130], [200, 80]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 9 : 5} fill={i === 5 ? 'hsl(var(--ember))' : 'hsl(38 30% 93% / .7)'} />
      ))}
      <path d="M40 40 L120 30 L200 80 M40 40 L120 80 L200 80 M40 120 L120 80 M40 120 L120 130 L200 80" stroke="hsl(var(--ember) / .7)" fill="none" className="flow" />
    </svg>
  );
  return (
    <svg viewBox="0 0 240 160" className="h-40 w-full rounded-2xl bg-ink" aria-hidden>
      <circle cx="40" cy="80" r="9" fill="hsl(var(--ember))" />
      {[35, 80, 125].map((y, i) => (
        <g key={y}>
          <path d={`M48 80 C 110 80, 110 ${y}, 170 ${y}`} stroke="hsl(38 30% 93% / .4)" fill="none" className="flow" />
          <rect x="170" y={y - 11} width="54" height="22" rx="11" fill={i === 1 ? 'hsl(var(--ember))' : 'none'} stroke="hsl(38 30% 93% / .4)" />
          <text x="197" y={y + 4} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill={i === 1 ? 'hsl(0 0% 4%)' : 'hsl(38 30% 93% / .7)'}>{['condition', 'human', 'request'][i]}</text>
        </g>
      ))}
    </svg>
  );
}

function Agents() {
  return (
    <section id="agents" className="mx-auto max-w-7xl px-5 md:px-8 pb-24 md:pb-36">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Eyebrow>The agent loop</Eyebrow>
          <h2 className="reveal font-display text-5xl md:text-7xl mt-6 leading-[0.95]">Understand.<br />Evaluate. <span className="text-ember">Act.</span></h2>
        </div>
        <p className="reveal max-w-xs text-bone/60" style={d(120)}>An intelligence layer across pre-underwriting, post-close, and quality control.</p>
      </div>
      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {STAGES.map((s, i) => (
          <div key={s.n} className="reveal group rounded-3xl border border-bone/12 bg-card p-5 hover:-translate-y-1.5 hover:border-ember transition-all duration-500" style={d(i * 140)} data-testid={`card-stage-${s.n}`}>
            <StageGlyph g={s.g} />
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-mono text-xs text-ember">{s.n}</span>
              <h3 className="font-display text-3xl">{s.t}</h3>
            </div>
            <p className="mt-3 text-bone/60 text-[15px] leading-relaxed">{s.c}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Console() {
  return (
    <section id="console" className="text-bone py-24 md:py-36 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-ember/8 blur-[140px] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Eyebrow dark>Watch it work</Eyebrow>
        <h2 className="reveal font-display text-5xl md:text-7xl mt-6 max-w-3xl leading-[0.95]">One file. Many agents. <em className="text-ember">One decision trail.</em></h2>
        <p className="reveal mt-6 text-bone/55 max-w-lg" style={d(100)}>Pick a workflow. Pause it. Replay it.</p>
        <div className="reveal mt-12" style={d(200)}><AgentConsole /></div>
      </div>
    </section>
  );
}

function Discrepancy() {
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-36 grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <Eyebrow>Discrepancies, surfaced</Eyebrow>
        <h2 className="reveal font-display text-5xl md:text-6xl mt-6 leading-[0.95]">Page 14 disagrees<br />with page 187.<br /><span className="text-ember">We notice.</span></h2>
        <p className="reveal mt-6 text-bone/60 max-w-md" style={d(120)}>Agents reason across the full file, not one document at a time — bringing discrepancies into view earlier.</p>
        <p className="reveal mt-6 max-w-md text-sm text-bone/55" style={d(180)}>One complex file evaluated: <span className="text-ember">1,023 pages · 1,132+ fields · under 4 minutes.</span></p>
      </div>
      <div className="reveal relative h-[380px]" style={d(150)} aria-hidden>
        {[{ x: 0, r: -6, p: 14, v: '$8,412.00', l: 'Paystub · YTD' }, { x: 46, r: 5, p: 187, v: '$7,050.00', l: 'W-2 · monthly avg' }].map((c, i) => (
          <div key={c.p} className="absolute top-6 w-[52%] rounded-2xl border border-bone/15 bg-card p-5 shadow-[0_30px_60px_-30px_hsl(252_22%_7%/.4)] hover:rotate-0 transition-transform duration-500" style={{ left: `${c.x}%`, transform: `rotate(${c.r}deg)` }}>
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-bone/55"><span>{c.l}</span><span>p.{c.p}</span></div>
            <div className="mt-5 space-y-2">{[80, 60, 90, 45].map((w, j) => <div key={j} className="h-2 rounded bg-muted" style={{ width: `${w}%` }} />)}</div>
            <div className={`mt-5 font-mono text-lg rounded-lg px-2 py-1 inline-block ${i ? 'bg-ember text-ink' : 'bg-ink text-bone'}`}>{c.v}</div>
            <div className="mt-4 space-y-2">{[70, 85].map((w, j) => <div key={j} className="h-2 rounded bg-muted" style={{ width: `${w}%` }} />)}</div>
          </div>
        ))}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[86%] rounded-2xl bg-ink text-bone p-4 font-mono text-xs flex items-center gap-3">
          <span className="relative flex h-3 w-3"><span className="pulse-ring absolute inset-0 rounded-full bg-ember" /><span className="relative h-3 w-3 rounded-full bg-ember" /></span>
          Illustrative · income variance flagged · awaiting underwriter
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  const items = ['Pre-underwriting', 'Post-close', 'Quality control', 'Conventional', 'Non-QM', '900+ document types'];
  return (
    <section id="coverage" className="border-y border-bone/10 bg-muted/50 overflow-hidden">
      <div className="py-10 flex whitespace-nowrap">
        <div className="marquee flex shrink-0 gap-12 pr-12">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="font-display text-4xl md:text-6xl flex items-center gap-12">{t}<span className="h-3 w-3 rotate-45 bg-ember" /></span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Oversight() {
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-36">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div className="reveal order-2 md:order-1 rounded-3xl bg-ink text-bone p-8 font-mono text-sm space-y-3">
          {[['Agent proposes', 'text-bone/70'], ['Evidence attached', 'text-bone/70'], ['Human decides', 'text-ember'], ['Next action routed', 'text-steel']].map(([t, c], i) => (
            <div key={t} className="reveal flex items-center gap-4 rounded-xl border border-white/10 px-4 py-3.5 hover:border-ember transition-colors" style={d(i * 120)}>
              <span className="text-bone/30">{i + 1}</span><span className={c}>{t}</span>
            </div>
          ))}
        </div>
        <div className="order-1 md:order-2">
          <Eyebrow>Human oversight</Eyebrow>
          <h2 className="reveal font-display text-5xl md:text-7xl mt-6 leading-[0.95]">Clear actions.<br /><span className="text-ember">Human judgment.</span></h2>
          <p className="reveal mt-6 max-w-md text-bone/65">An auditable multi-agent architecture shows what needs action, what needs human review, and what can move forward.</p>
          <a href="https://trust.balerion.ai/" target="_blank" rel="noreferrer" data-testid="link-trust" className="reveal mt-8 inline-flex items-center gap-2 border-b border-bone/40 pb-1 hover:text-ember hover:border-ember transition-colors" style={d(120)}>Trust center <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const backers = ['Kleiner Perkins', 'Pruven Capital', 'Formation VC', 'BoxGroup'];
  return (
    <section id="team" className="text-bone py-24 md:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow dark>Built in Berkeley</Eyebrow>
        <div className="mt-8 grid lg:grid-cols-2 gap-14">
          <h2 className="reveal font-display text-5xl md:text-7xl leading-[0.95]">AI researchers<br /><span className="text-bone/40">+</span> mortgage operators.</h2>
          <div className="reveal" style={d(120)}>
            <p className="text-bone/60 text-lg max-w-md">Berkeley AI research meets experienced mortgage operators.</p>
            <a href="https://balerion.ai/company" target="_blank" rel="noreferrer" data-testid="link-company" className="mt-6 inline-flex items-center gap-2 text-ember hover:text-bone transition-colors">Meet the company <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="mt-20 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/40">Backed by</div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
          {backers.map((b, i) => (
            <div key={b} className="reveal border-r border-b border-white/10 px-6 py-10 font-display text-2xl md:text-3xl hover:bg-ember hover:text-ink transition-colors duration-300" style={d(i * 80)} data-testid={`text-backer-${i}`}>{b}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Join() {
  const paths = [
    { k: 'Lenders', h: 'See it on your files.', c: 'Pre-underwriting, post-close, QC.', cta: 'Book a demo', href: DEMO, ext: false },
    { k: 'Engineers', h: 'Build production agents.', c: 'Real multi-agent systems on high-stakes documents. Introduce yourself.', cta: 'Send an introduction', href: CANDIDATE, ext: false },
    { k: 'Investors', h: 'Read the announcement.', c: '$6M announced April 16, 2026.', cta: 'Funding news', href: FUNDING, ext: true, alt: { cta: 'Contact', href: INVESTOR } },
  ];
  return (
    <section id="join" className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-36">
      <Eyebrow>Your move</Eyebrow>
      <h2 className="reveal font-display text-5xl md:text-8xl mt-6 leading-[0.92]">Pick a <em className="text-ember">path.</em></h2>
      <div className="mt-14 grid lg:grid-cols-[1.3fr_1fr_1fr] gap-5">
        {paths.map((p, i) => (
          <div key={p.k} className={`reveal group relative rounded-3xl p-8 flex flex-col min-h-[300px] transition-transform duration-500 hover:-translate-y-1.5 ${i === 0 ? 'bg-ember text-ink' : 'border border-bone/15 bg-card'}`} style={d(i * 120)} data-testid={`card-path-${p.k.toLowerCase()}`}>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-60">{p.k}</div>
            <h3 className="font-display text-4xl mt-4 leading-none">{p.h}</h3>
            <p className="mt-4 opacity-70 max-w-xs">{p.c}</p>
            <div className="mt-auto pt-8 flex flex-wrap gap-4 items-center">
              <a href={p.href} {...(p.ext ? { target: '_blank', rel: 'noreferrer' } : {})} data-testid={`button-path-${p.k.toLowerCase()}`}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-colors ${i === 0 ? 'bg-ink text-bone hover:bg-ink/80' : 'bg-ink text-bone hover:bg-ember hover:text-ink'}`}>
                {p.cta} <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </a>
              {p.alt && <a href={p.alt.href} data-testid="button-path-investor-contact" className="text-sm border-b border-bone/40 hover:text-ember hover:border-ember">{p.alt.cta}</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal();
  return (
    <div ref={ref} className="grain relative isolate min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main className="home-sections relative z-10">
        <Hero />
        <LoanFileStory />
        <Testimonials />
        <BlogPosts />
        <Investors />
      </main>
      <div className="relative z-10"><Footer spacingClassName="home-section-spacing" /></div>
    </div>
  );
}
