import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { JobList } from '@/components/job-list';
import { Nav, Footer, Eyebrow, d } from '@/components/site-chrome';
import { JOBS } from '@/lib/careers';

const TITLE = 'Careers | Balerion — Engineering for High-Stakes Mortgage AI';
const DESC = 'Balerion is hiring Software, Forward Deployed and AI Engineers in San Francisco to build document extraction, reliable agent workflows and evaluations for mortgage lending.';
const POST = 'https://news.ycombinator.com/item?id=49525600';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  const prev = el.getAttribute('content');
  el.setAttribute('content', value);
  return () => { if (created) el!.remove(); else if (prev !== null) el!.setAttribute('content', prev); };
}

function useCareersMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;
    const undo = [setMeta('name', 'description', DESC), setMeta('property', 'og:title', TITLE), setMeta('property', 'og:description', DESC)];
    return () => { document.title = prevTitle; undo.forEach((u) => u()); };
  }, []);
}

const WORK = ['Document extraction', 'Reliable agent workflows', 'Evaluations for mortgage lending'];
const STACK = ['Python', 'PydanticAI', 'Restate', 'Postgres', 'AWS'];
const FACTS: [string, string][] = [['Location', 'San Francisco, CA'], ['Arrangement', 'Onsite'], ['Type', 'Full-time'], ['Visa', 'Sponsorship available'], ['Relocation', 'Covered to SF']];

export default function Careers() {
  useCareersMeta();
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, []);
  return (
    <div className="grain relative isolate min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Nav page="careers" />
      <main className="relative z-10 text-bone">
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-[160px] pb-12 md:pb-16">
            <div className="rise" style={d(60)}><Eyebrow>Careers</Eyebrow></div>
            <h1 className="rise font-display mt-5 text-[clamp(1.9rem,3.7vw,3.25rem)] leading-[1.1]" style={d(140)} data-testid="text-careers-headline">Engineer AI where <em className="text-ember">every decision counts.</em></h1>
            <p className="rise mt-4 max-w-2xl text-bone/65 leading-relaxed" style={d(220)}>We build document extraction, reliable agent workflows and evaluations for mortgage lending. Research-driven, production-bound.</p>
          </div>
        </section>

        <section className="border-t border-white/10" aria-labelledby="openings-heading">
          <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-14 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <h2 id="openings-heading" className="font-display text-2xl md:text-3xl">Open positions</h2>
                <span className="font-mono text-[10px] uppercase tracking-widest text-bone/45">{JOBS.length} openings</span>
              </div>
              <JobList prefix="careers" anchors />
            </div>
            <aside aria-label="Shared role details" className="rounded-xl border border-white/10 bg-ink/60 p-4 md:p-5 text-sm">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {FACTS.map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-bone/45">{k}</dt>
                    <dd className="text-bone/85">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 pt-4 border-t border-white/10">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-bone/45">The work</h3>
                <p className="mt-1 text-bone/75">{WORK.join(' · ')}</p>
                <h3 className="mt-3 font-mono text-[10px] uppercase tracking-widest text-bone/45">Stack</h3>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {STACK.map((s) => <li key={s} className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-bone/75">{s}</li>)}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-bone/60">
                <p>Use the role’s Apply link to send your resume, GitHub, or projects to the right contact.</p>
                <a href={POST} target="_blank" rel="noreferrer" data-testid="link-original-post" className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-bone/45 hover:text-bone transition-colors ${focus}`}>Original post <ArrowUpRight size={12} aria-hidden /></a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
