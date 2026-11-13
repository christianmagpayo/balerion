import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Nav, Footer, Eyebrow, useReveal, d, BASE } from '@/components/site-chrome';
import { TeamCircle } from '@/components/team-circle';
import { VideoEmbed } from '@/components/video-embed';
import { TEAM } from '@/lib/team';
import { JobList } from '@/components/job-list';
import '@/components/marketing-layout.css';

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Team | Balerion AI';
  }, []);
  return (
    <div ref={ref} className="grain relative isolate min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Nav page="team" />
      <main className="marketing-frame marketing-sections relative z-10 text-bone">
        <section>
          <Eyebrow>Team</Eyebrow>
          <h1 className="rise font-display mt-5 text-[clamp(1.9rem,3.7vw,3.25rem)] leading-[1.1] lg:whitespace-nowrap">AI builders and mortgage experts. <em className="text-ember">One team.</em></h1>
          <p className="rise mt-5 text-bone/65 leading-relaxed" style={d(100)}>Built by Berkeley AI researchers and experienced mortgage operators.</p>

          <div className="mt-10 grid lg:grid-cols-[1.6fr_1fr] gap-8 items-center">
            <div className="reveal">
              <VideoEmbed title="Balerion raises $6M" />
            </div>
            <div className="reveal flex flex-col items-start" style={d(150)}>
              <div className="max-w-sm space-y-4 text-sm leading-relaxed text-bone/65">
                <p className="font-display text-2xl leading-tight text-bone">A lean team. <em className="text-ember">A lot to build.</em></p>
                <p>We bring together mortgage experts, AI researchers, and engineers who build products at scale.</p>
                <p>We’re not trying to build the biggest team. We want to build one where each person makes everyone else better, and what we learn compounds over time.</p>
                <p>You’ll have room to make decisions and own what you build. We care more about doing good work together than adding layers of approval. If that’s how you like to work, we’d like to meet you.</p>
              </div>
              <a href="https://balerion.ai/press/why-we-built-balerion-ai" target="_blank" rel="noreferrer" data-testid="link-why-we-built" className="mt-4 inline-flex items-center gap-1.5 text-sm text-ember hover:text-bone transition-colors">Why we built Balerion <ArrowUpRight size={15} /></a>
              <a href="#open-roles" data-testid="link-open-positions" className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-sm text-ember hover:text-bone transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember">Join Us <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/10 overflow-hidden" aria-labelledby="crew-heading">
          <div className="relative">
            <div className="text-center">
              <div className="flex justify-center"><Eyebrow>The crew</Eyebrow></div>
              <h2 id="crew-heading" className="reveal font-display mt-5 text-3xl md:text-4xl">Every person here has <em className="text-ember">shipped production AI.</em></h2>
            </div>
            <div className="mx-auto mt-16 max-w-[1000px] grid grid-cols-2 justify-items-center gap-x-6 gap-y-16 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-20 lg:pb-10">
              {TEAM.map((m, i) => (
                <div key={m.name} className={i % 2 ? 'lg:translate-y-10' : ''}>
                  <TeamCircle m={m} size="h-32 w-32 md:h-36 md:w-36" delay={(i % 4) * 90} testId={`member-${i}`} />
                </div>
              ))}
              <a href="#open-roles" data-testid="link-you" className="reveal group flex flex-col items-center text-center lg:translate-y-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember" style={d(200)}>
                <div className="relative h-32 w-32 md:h-36 md:w-36">
                  <div className="orbit absolute -inset-3 rounded-full border border-dashed border-ember/40 group-hover:border-ember" aria-hidden />
                  <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-ember/70 bg-transparent text-ember transition-colors duration-300">
                    <span
                      role="img"
                      aria-label="Balerion dragon"
                      className="h-20 w-20 bg-current transition-transform duration-500 group-hover:scale-110"
                      style={{
                        maskImage: `url("${BASE}brand/dragon.svg")`,
                        maskSize: 'contain',
                        maskPosition: 'center',
                        maskRepeat: 'no-repeat',
                        WebkitMaskImage: `url("${BASE}brand/dragon.svg")`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: 'center',
                        WebkitMaskRepeat: 'no-repeat',
                      }}
                    />
                  </div>
                </div>
                <div className="mt-6 font-display text-xl text-ember">This can be you</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-bone/55 group-hover:text-bone">Say hello</div>
              </a>
            </div>
          </div>
        </section>
        <section id="open-roles" className="border-t border-white/10" aria-labelledby="open-roles-heading">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <div>
              <Eyebrow>Join the team</Eyebrow>
              <h2 id="open-roles-heading" className="mt-4 font-display text-3xl md:text-4xl">Join <em className="text-ember">Us</em></h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/65">We hire to compound, not to grow. If you want to build the AI products at scale, find your role here.</p>
            </div>
            <JobList prefix="team" />
          </div>
        </section>
      </main>
      <div className="relative z-10"><Footer containerClassName="marketing-frame" spacingClassName="pt-0 pb-8" /></div>
    </div>
  );
}
