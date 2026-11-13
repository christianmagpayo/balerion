import { useEffect, useRef } from 'react';
import { Link, useRoute } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Nav, Footer, DEMO, BASE } from '@/components/site-chrome';
import { TESTIMONIALS } from '@/lib/testimonials';
import NotFound from '@/pages/not-found';

export default function CaseStudy() {
  const [, params] = useRoute('/case-studies/:slug');
  const ref = useRef<HTMLDivElement>(null);
  const t = TESTIMONIALS.find((x) => x.slug === params?.slug);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (t) document.title = `${t.company} case study | Balerion AI`;
  }, [t]);
  if (!t) return <NotFound />;
  return (
    <div ref={ref} className="grain relative isolate min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Nav page="product" />
      <main className="relative z-10 mx-auto max-w-3xl px-5 md:px-8 pt-[160px] pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-bone/60 hover:text-ember" data-testid="link-back"><ArrowLeft size={15} /> Back</Link>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-ember">Case study</p>
        <img src={`${BASE}${t.logo}`} alt={t.company} className="mt-4 h-10 w-auto" />
        <figure className="mt-8 border-l-2 border-ember pl-6">
          <blockquote className="font-display text-xl md:text-2xl leading-snug">“{t.quote}”</blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            <img src={`${BASE}${t.photo}`} alt={t.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-ember/60 ring-offset-2 ring-offset-ink" />
            <span className="text-sm"><span className="block text-bone font-medium">{t.name}</span><span className="text-bone/60">{t.role}, {t.company}</span></span>
          </figcaption>
        </figure>
        <div className="mt-12 rounded-2xl border border-white/10 bg-ink/60 p-6">
          <p className="text-bone/70">The full case study is coming soon.</p>
          <a href={DEMO} className="mt-4 inline-block rounded-full bg-ember text-ink text-sm font-medium px-4 py-2 hover:bg-ember/80">Book a demo</a>
        </div>
      </main>
      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
