import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Nav, Footer, Eyebrow, useReveal, d, DEMO } from '@/components/site-chrome';
import { ProductPreview } from '@/components/product-preview';
import { ProductFlow } from '@/components/product-flow';
import { EvidenceAction } from '@/components/evidence-action';
import { CheckOutcomes } from '@/components/check-outcomes';
import '@/components/marketing-layout.css';
import { IntegrationFlow } from '@/components/integration-flow';

const TITLE = 'Product | Balerion — The Intelligence Layer for Mortgage';
const DESC = 'Balerion continuously evaluates documents, borrower data, guidelines and lender requirements to show mortgage teams what needs attention, why it matters and what to do next.';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  const prev = el.getAttribute('content');
  el.setAttribute('content', value);
  return () => { if (created) el!.remove(); else if (prev !== null) el!.setAttribute('content', prev); };
}

function useProductMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;
    const undo = [setMeta('name', 'description', DESC), setMeta('property', 'og:title', TITLE), setMeta('property', 'og:description', DESC)];
    return () => { document.title = prevTitle; undo.forEach((u) => u()); };
  }, []);
}

const H2 = 'font-display text-4xl md:text-5xl leading-[1.02]';
/* One shared content frame + vertical rhythm for every section on this page */
const WRAP = 'marketing-frame';
const PAD = 'py-6 md:py-8';
const SPLIT = 'gap-10 lg:gap-14';

function DemoButton({ id, label = 'Request demo' }: { id: string; label?: string }) {
  return (
    <a href={DEMO} data-testid={`button-${id}`} className={`group inline-flex items-center gap-2 rounded-full bg-ember text-ink text-sm font-medium px-5 py-2.5 hover:bg-ember/80 transition-colors ${focus}`}>
      {label} <ArrowUpRight size={15} className="group-hover:rotate-45 transition-transform motion-reduce:transition-none" />
    </a>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative text-bone overflow-hidden">
      <div className="relative grid lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.5fr)] gap-8 xl:gap-10 items-center">
        <div>
          <div className="rise" style={d(60)}><Eyebrow>The Intelligence Layer for Mortgage</Eyebrow></div>
          <h1 className="rise font-display mt-6 text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05]" style={d(160)}>The entire loan.<br /><em className="text-ember">One intelligent underwrite.</em></h1>
          <div className="rise mt-8 flex flex-wrap items-center gap-5" style={d(420)}>
            <DemoButton id="hero-demo" />
            <a href="#how" data-testid="link-hero-how" className={`text-sm text-bone/70 border-b border-bone/30 pb-0.5 hover:text-ember hover:border-ember transition-colors ${focus}`}>How it works</a>
          </div>
        </div>
        <ProductPreview />
      </div>
    </section>
  );
}

/* ---------- LOS ---------- */
function Los() {
  const pts = [
    ['Works with your workflow', 'Bring intelligence into your existing workflow.'],
    ['Bidirectional integrations', 'Move loan data in and approved actions back.'],
    ['Connected information', 'Connect documents, data, and requirements.'],
    ['Searchable audit trail', 'Track who changed what, when, and why.'],
  ];
  return (
    <section className={PAD} aria-labelledby="los-h">
      <Eyebrow>Integration</Eyebrow>
      <h2 id="los-h" className="reveal mt-5 font-display text-4xl md:text-5xl lg:text-[clamp(1.9rem,3.1vw,2.75rem)] lg:whitespace-nowrap leading-[1.02]">Sits on top of your LOS. <em className="text-ember">No core-system replacement.</em></h2>
      <div className={`mt-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] ${SPLIT} items-center`}>
        <dl className="space-y-6">
          {pts.map(([t, c], i) => (
            <div key={t} className="reveal grid grid-cols-[28px_1fr] gap-3" style={d(i * 80)}>
              <span className="font-mono text-[10px] text-ember pt-1.5">0{i + 1}</span>
              <div className="min-w-0"><dt className="text-[15px] font-medium">{t}</dt><dd className="mt-1 text-sm text-bone/55 lg:whitespace-nowrap">{c}</dd></div>
            </div>
          ))}
        </dl>
      <div className="reveal" style={d(150)}><IntegrationFlow /></div>
      </div>
    </section>
  );
}

export default function Product() {
  const ref = useRef<HTMLDivElement>(null);
  useProductMeta();
  useReveal();
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0); }, []);
  return (
    <div ref={ref} className="grain relative isolate min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Nav page="product" />
      <main className={`marketing-sections relative z-10 ${WRAP}`}>
        <Hero />
        <section id="how" className={`relative ${PAD}`} aria-labelledby="product-flow-heading">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="product-flow-heading" className={`mt-5 ${H2}`}>From loan documents to <em className="text-ember">underwriting intelligence.</em></h2>
          <ProductFlow />
        </section>
        <EvidenceAction pad={PAD} />
        <CheckOutcomes pad={PAD} />
        <Los />
      </main>
      <div className="relative z-10"><Footer containerClassName={WRAP} spacingClassName="pt-0 pb-8" /></div>
    </div>
  );
}
