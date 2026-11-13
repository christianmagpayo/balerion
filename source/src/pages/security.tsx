import { useEffect } from 'react';
import { ArrowUpRight, FlaskConical, GitBranch, Link2 } from 'lucide-react';
import { Nav, Footer, Eyebrow, d, BASE } from '@/components/site-chrome';
import '@/components/marketing-layout.css';

const TITLE = 'Security | Balerion — Enterprise Security and Control';
const DESC = 'SOC 2 Type II and ISO 27001 compliant. Built to Freddie Mac Section 1302.8 and Fannie Mae LL-2026-04 compliance standards.';
const TRUST = 'https://trust.balerion.ai/';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  const prev = el.getAttribute('content');
  el.setAttribute('content', value);
  return () => { if (created) el!.remove(); else if (prev !== null) el!.setAttribute('content', prev); };
}

function useSecurityMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;
    const undo = [setMeta('name', 'description', DESC), setMeta('property', 'og:title', TITLE), setMeta('property', 'og:description', DESC)];
    return () => { document.title = prevTitle; undo.forEach((u) => u()); };
  }, []);
}

/* Abstract control visual; labels sourced from pillar copy. Rendered visible immediately (no nested rise). */
const STAGES = ['Rule creation', 'Testing', 'Approval', 'Deployment', 'Subsequent changes'];
function ControlVisual() {
  return (
    <div className="rounded-2xl border border-white/10 bg-card/70 backdrop-blur-sm p-5 md:p-7" role="img" aria-label="Rule creation, testing, approval, deployment and subsequent changes">
      <ol className="relative">
        <span className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-ember/70 via-ember/30 to-white/10" aria-hidden />
        {STAGES.map((s, i) => {
          const last = i === STAGES.length - 1;
          return (
            <li key={s} className="relative grid grid-cols-[24px_1fr_auto] items-center gap-4 py-2">
              <span className={`relative grid place-items-center h-6 w-6 rounded-full border bg-ink ${last ? 'border-ember' : 'border-ember/50'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${last ? 'bg-ember' : 'bg-ember/60'}`} />
                {last && <span className="absolute inset-0 rounded-full border border-ember pulse-ring" aria-hidden />}
              </span>
              <span className={`rounded-lg border px-3 py-2 text-[13px] ${last ? 'border-ember/40 bg-ember/[0.07] text-bone' : 'border-white/10 bg-ink/50 text-bone/75'}`}>{s}</span>
              <span className="font-mono text-[10px] text-bone/35">0{i + 1}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const PILLARS = [
  { icon: FlaskConical, t: 'Test before production.', c: 'Evaluate new conditions and lender requirements in a controlled testing environment before releasing them into the production workflow.' },
  { icon: GitBranch, t: 'Manage change with confidence.', c: 'Maintain visibility into rule creation, testing, approval, deployment, and subsequent changes.' },
  { icon: Link2, t: 'Trace every decision.', c: 'Connect findings to supporting evidence, applicable requirements, system evaluations, and user actions.' },
];

export default function Security() {
  useSecurityMeta();
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0); }, []);
  return (
    <div className="grain relative isolate min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Nav page="security" />
      <main className="marketing-frame marketing-sections relative z-10 text-bone">
        <section className="relative overflow-hidden">
          <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
            <div>
              <div className="rise" style={d(60)}><Eyebrow>Enterprise security and control</Eyebrow></div>
              <h1 className="rise font-display mt-6 text-[clamp(1.9rem,3.7vw,3.25rem)] leading-[1.1]" style={d(140)} data-testid="text-security-headline">Built for <em className="text-ember">high-stakes</em><br className="hidden sm:block" /> lending decisions.</h1>
              <p className="rise mt-5 max-w-lg text-bone/65 leading-relaxed" style={d(220)} data-testid="text-security-summary">SOC 2 Type II and ISO 27001 compliant. Built to Freddie Mac Section 1302.8 and Fannie Mae LL-2026-04 compliance standards.</p>
              <div className="rise mt-8" style={d(300)}>
                <a href={TRUST} target="_blank" rel="noreferrer" data-testid="button-trust-center" className={`group inline-flex items-center gap-2 rounded-full bg-ember text-ink text-sm font-medium px-5 py-2.5 hover:bg-ember/80 transition-colors ${focus}`}>
                  Visit the Balerion Trust Center <ArrowUpRight size={15} className="group-hover:rotate-45 transition-transform motion-reduce:transition-none" />
                </a>
              </div>
            </div>
            <div className="rise" style={d(200)}><ControlVisual /></div>
          </div>
        </section>

        <section className="border-y border-white/10" aria-label="Security compliance">
          <div className="mx-auto grid max-w-5xl grid-cols-3">
            {[
              { image: 'compliance-a.png', name: 'SOC 2 Type II', alt: 'AICPA SOC 2 logo' },
              { image: 'compliance-b.png', name: 'ISO 27001', alt: 'ISO 27001 badge from the Balerion Security page' },
              { image: 'ccpa-badge.webp', name: 'CCPA', alt: 'California Consumer Privacy Act compliant badge' },
            ].map(({ image, name, alt }, i) => (
              <a key={name} href={TRUST} target="_blank" rel="noreferrer"
                className={`flex flex-col items-center justify-center gap-3 px-2 lg:flex-row lg:gap-5 lg:px-6 ${i ? 'border-l border-white/10' : ''} ${focus}`}
                aria-label={`${name} — visit the Balerion Trust Center`}>
                <img src={`${BASE}security/${image}`} alt={alt} width={104} height={104} className="h-24 w-24 md:h-[104px] md:w-[104px] shrink-0 rounded-full object-contain" />
                <span className="text-center text-sm text-bone/85 lg:text-left">{name}<span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-bone/45">Compliant</span></span>
              </a>
            ))}
          </div>
        </section>

        <section aria-label="Security controls">
          <ol className="grid md:grid-cols-3 gap-3">
            {PILLARS.map(({ icon: Icon, t, c }, i) => (
              <li key={t} className="group relative rounded-2xl border border-white/10 bg-card p-6 md:p-7 hover:border-ember/40 transition-colors duration-500" data-testid={`card-pillar-${i}`}>
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center h-11 w-11 rounded-xl border border-ember/40 bg-ember/[0.07] text-ember"><Icon size={19} strokeWidth={1.5} aria-hidden /></span>
                  <span className="font-mono text-[10px] text-bone/35">0{i + 1}</span>
                </div>
                <h2 className="mt-6 font-display text-2xl leading-tight">{t}</h2>
                <p className="mt-2 text-sm text-bone/60 leading-relaxed">{c}</p>
                <span className="absolute left-6 right-6 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-ember/70 transition-transform duration-700" aria-hidden />
              </li>
            ))}
          </ol>
        </section>
      </main>
      <div className="relative z-10"><Footer containerClassName="marketing-frame" spacingClassName="pt-0 pb-8" /></div>
    </div>
  );
}
