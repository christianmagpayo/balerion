import { useEffect, useState } from 'react';
import { Nav, Footer, Eyebrow, useReveal, d } from '@/components/site-chrome';
import { ProductFlow } from '@/components/product-flow';
import '@/components/marketing-layout.css';
import './research.css';

const TITLE = 'Research | Balerion — Researching Models for Mortgage Underwriting';
const DESC = 'We study how models integrate evidence across lending files, apply long-form guidelines, and handle uncertainty when records conflict or are incomplete.';
const GIF = 'https://balerion-research.replit.app/media/balerion-assistant-demo-detailed.gif';
const STILL = 'https://balerion-research.replit.app/media/balerion-assistant-demo-detailed-still.png';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink';
const H2 = 'font-display text-4xl md:text-5xl leading-[1.02]';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  const prev = el.getAttribute('content');
  el.setAttribute('content', value);
  return () => { if (created) el!.remove(); else if (prev !== null) el!.setAttribute('content', prev); };
}

function useResearchMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;
    const undo = [setMeta('name', 'description', DESC), setMeta('property', 'og:title', TITLE), setMeta('property', 'og:description', DESC)];
    return () => { document.title = prevTitle; undo.forEach((u) => u()); };
  }, []);
}

function Demo() {
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [failed, setFailed] = useState(false);
  return (
    <figure className="reveal mt-10" style={d(100)}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50 mb-3">Example application</div>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-card">
        {failed ? <p role="alert" className="p-8 text-sm text-bone/70">The assistant animation could not load. <a href={GIF} target="_blank" rel="noreferrer" className={`text-ember underline ${focus}`}>Open the GIF directly</a>.</p> :
          <img src={reduced ? STILL : GIF} alt="Balerion Assistant demonstration showing mortgage document review, underwriting questions, and a source document viewer." width={2880} height={1800} onError={() => setFailed(true)} className="block w-full h-auto" data-testid="img-research-demo" />}
      </div>
    </figure>
  );
}

const QUESTIONS: [string, string][] = [
  ['How can models learn underwriting decision processes?', 'Can structured traces of evidence review, guideline application, and escalation improve multi-document reasoning?'],
  ['How are we building effective evaluations in non-verifiable domains?', 'How can expert judgment and evidence-grounded rubrics help us evaluate reasoning quality when there is no single verifiable answer?'],
  ['How should models represent uncertainty and missing evidence?', 'Can a system distinguish absent documentation, conflicting records, and policy ambiguity, then request the right follow-up?'],
  ['Do models generalize underwriting logic to unseen files?', 'Do decisions remain consistent when borrower facts, document types, or guideline versions change?'],
];

export default function Research() {
  useResearchMeta();
  useReveal();
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0); }, []);
  return (
    <div className="grain relative isolate min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Nav page="research" />
      <main id="main" className="marketing-sections relative z-10 marketing-frame">
        <section id="top" aria-labelledby="research-h1">
          <div className="rise" style={d(60)}><Eyebrow>Research</Eyebrow></div>
          <h1 id="research-h1" className="rise font-display mt-6 text-[clamp(2.2rem,4.4vw,3.75rem)] md:text-[clamp(1.75rem,3.8vw,3.25rem)] md:whitespace-nowrap leading-[1.04]" style={d(160)}>Researching Models for <em className="text-ember">Mortgage Underwriting</em></h1>
          <p className="rise mt-6 text-bone/65 text-base lg:text-[clamp(0.75rem,1.05vw,1rem)] lg:whitespace-nowrap leading-relaxed" style={d(280)}>We study how models integrate evidence across lending files, apply long-form guidelines, and handle uncertainty when records conflict or are incomplete.</p>
          <ProductFlow />
        </section>

        <section aria-labelledby="building-h">
          <Eyebrow>Application</Eyebrow>
          <h2 id="building-h" className={`reveal mt-5 ${H2}`}>What We’re Building</h2>
          <p className="reveal mt-5 max-w-3xl text-bone/65 leading-relaxed" style={d(80)}>We develop models and agentic workflows to retrieve and validate evidence across lending documents, apply guidelines, and explain their conclusions. The assistant below is one application of that work.</p>
          <Demo />
        </section>

        <section aria-labelledby="questions-h">
          <Eyebrow>Open questions</Eyebrow>
          <h2 id="questions-h" className={`reveal mt-5 ${H2}`}>Research Questions</h2>
          <ol className="mt-10 grid md:grid-cols-2 gap-x-10">
            {QUESTIONS.map(([q, a], i) => (
              <li key={q} className="reveal rs-q border-t border-white/10 py-6 grid grid-cols-[32px_1fr] gap-3" style={d(i * 80)} data-testid={`card-question-${i + 1}`}>
                <span className="font-mono text-[11px] rs-ember pt-1.5">Q{i + 1}</span>
                <div><h3 className="font-display text-xl md:text-2xl leading-snug">{q}</h3><p className="mt-2 text-sm text-bone/55 leading-relaxed">{a}</p></div>
              </li>
            ))}
          </ol>
        </section>

      </main>
      <div className="relative z-10"><Footer containerClassName="marketing-frame" spacingClassName="pt-0 pb-8" /></div>
    </div>
  );
}
