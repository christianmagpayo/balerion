import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/testimonials';
import { Eyebrow, d, BASE } from '@/components/site-chrome';

export function Testimonials() {
  return (
    <section className="relative border-t border-white/10" aria-labelledby="customers-heading">
      <div className="home-section-spacing mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow>Customers</Eyebrow>
        <h2 id="customers-heading" className="reveal font-display mt-5 text-3xl md:text-4xl">Built with lenders <em className="text-ember">who know the challenges.</em></h2>
        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          {[...TESTIMONIALS].reverse().map((t, i) => (
            <Link key={t.slug} href={`/case-studies/${t.slug}`} data-testid={`card-testimonial-${t.slug}`}
              className="reveal group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-ink/70 p-7 md:p-9 hover:border-ember/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember" style={d(i * 120)}>
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-ember/10 blur-3xl group-hover:bg-ember/20 transition-colors" />
              <div className="relative flex items-center justify-between gap-4">
                <img src={`${BASE}${t.logo}`} alt={t.company} className="h-8 w-auto max-w-[45%] object-contain object-left" />
                <span className="font-display text-6xl leading-none text-ember/60 select-none" aria-hidden>“</span>
              </div>
              <blockquote className="relative mt-3 flex-1 font-display text-lg md:text-[1.35rem] leading-snug text-bone/90">{t.quote}</blockquote>
              <div className="relative pt-6 mt-8 border-t border-white/10 flex items-center gap-4">
                <img src={`${BASE}${t.photo}`} alt={t.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-ember/60 ring-offset-2 ring-offset-ink" />
                <div className="text-sm min-w-0">
                  <div className="text-bone font-medium">{t.name}</div>
                  <div className="text-bone/55">{t.role}, {t.company}</div>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 text-sm text-ember whitespace-nowrap">Case study <ArrowUpRight size={15} className="group-hover:rotate-45 transition-transform" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
