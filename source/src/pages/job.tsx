import { useEffect, useState, type KeyboardEvent } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Nav, Footer, Eyebrow } from '@/components/site-chrome';
import { JOBS, type JobDescription } from '@/lib/careers';
import { JobApplicationForm, emptyApplication, type ApplicationValues } from '@/components/job-application-form';
import NotFound from '@/pages/not-found';
import type { ApplicationInput } from '@workspace/api-client-react';

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

export default function Job() {
  const { slug } = useParams<{ slug: string }>();
  const job = JOBS.find((item) => item.id === slug);
  useEffect(() => {
    if (!job) return;
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    const title = `${job.title} | Balerion Careers`;
    document.title = title;
    const undo = [
      ['name', 'description', `Join Balerion as a ${job.title} in San Francisco. Read the full job description and apply.`],
      ['property', 'og:title', title],
      ['property', 'og:description', `Explore the ${job.title} opportunity at Balerion AI.`],
    ].map(([attr, key, value]) => {
      let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      const created = !meta;
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(attr, key); document.head.appendChild(meta); }
      const previous = meta.getAttribute('content');
      meta.setAttribute('content', value);
      return () => { if (created) meta.remove(); else if (previous !== null) meta.setAttribute('content', previous); };
    });
    return () => { document.title = previousTitle; undo.forEach((restore) => restore()); };
  }, [job]);
  if (!job?.description) return <NotFound />;
  return <JobView key={job.id} roleId={job.id as ApplicationInput['roleId']} title={job.title} description={job.description} />;
}

function JobView({ roleId, title, description }: { roleId: ApplicationInput['roleId']; title: string; description: JobDescription }) {
  const [tab, setTab] = useState<'overview' | 'application'>(() => window.location.hash === '#application' ? 'application' : 'overview');
  const [values, setValues] = useState<ApplicationValues>(emptyApplication);
  const tabs = ['overview', 'application'] as const;
  const comp = description.sections.find((s) => s.title === 'Compensation');
  const meta: [string, string][] = [['Location', 'San Francisco, CA'], ['Employment type', 'Full-time'], ['Location type', 'Onsite'], ['Department', 'Engineering']];
  if (comp?.items) meta.push(['Compensation', comp.items.filter((i) => /salary|equity/i.test(i)).join(' · ')]);
  meta.push(['Updated', description.updated]);
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    const next = e.key === 'Home' ? 'overview' : e.key === 'End' ? 'application' : tab === 'overview' ? 'application' : 'overview';
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };
  const go = (t: 'overview' | 'application') => { setTab(t); document.getElementById(`tab-${t}`)?.scrollIntoView({ block: 'nearest' }); };
  return (
    <div className="grain min-h-[100dvh] bg-background text-bone">
      <Nav page="careers" />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-[140px] md:px-8">
        <Link href="/careers" className={`mb-8 inline-flex items-center gap-2 rounded-sm text-sm text-bone/60 hover:text-ember ${focus}`}><ArrowLeft size={14} /> All positions</Link>
        <div className="border-b border-white/10 pb-8">
          <Eyebrow>Careers · Engineering</Eyebrow>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl" data-testid="text-job-title">{title}</h1>
          {description.roleTitle && <p className="mt-3 text-ember">{description.roleTitle}</p>}
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr] md:gap-14">
          <aside className="md:sticky md:top-32 md:self-start">
            <dl className="grid grid-cols-2 gap-x-6 md:grid-cols-1" data-testid="list-job-meta">
              {meta.map(([k, v]) => (
                <div key={k} className="border-t border-white/10 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">{k}</dt>
                  <dd className="mt-1.5 text-sm text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <div className="min-w-0">
            <div role="tablist" aria-label="Job sections" className="flex gap-8 border-b border-white/10">
              {tabs.map((t) => (
                <button key={t} id={`tab-${t}`} role="tab" type="button" aria-selected={tab === t} aria-controls={`panel-${t}`} tabIndex={tab === t ? 0 : -1} onClick={() => setTab(t)} onKeyDown={onKey}
                  className={`relative -mb-px border-b-2 pb-3 text-sm capitalize transition-colors ${tab === t ? 'border-ember text-bone' : 'border-transparent text-bone/50 hover:text-bone/80'} ${focus}`} data-testid={`tab-${t}`}>{t}</button>
              ))}
            </div>
            <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" hidden={tab !== 'overview'} tabIndex={0} className="pt-8 focus-visible:outline-none">
              <div className="max-w-2xl space-y-10">
                {description.sections.map((section, index) => (
                  <section key={section.title} aria-labelledby={`job-section-${index}`}>
                    <h2 id={`job-section-${index}`} className="mb-3 font-display text-2xl">{section.title}</h2>
                    {section.paragraph && <p className="whitespace-pre-line text-[15px] leading-relaxed text-bone/70">{section.title === 'How to Apply' ? 'Use the Application tab to share your contact details, resume, and links.' : section.paragraph}</p>}
                    {section.items && <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-bone/70">{section.items.map((item) => <li key={item} className="flex gap-3"><span className="mt-[0.7em] h-px w-3 shrink-0 bg-ember" />{item}</li>)}</ul>}
                  </section>
                ))}
                <button type="button" onClick={() => go('application')} className={`inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-medium text-ink hover:bg-ember/80 ${focus}`} data-testid="button-apply">Apply for this role <ArrowUpRight size={15} /></button>
              </div>
            </div>
            <div id="panel-application" role="tabpanel" aria-labelledby="tab-application" hidden={tab !== 'application'} className="max-w-2xl pt-8">
              <JobApplicationForm roleId={roleId} values={values} onChange={setValues} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
