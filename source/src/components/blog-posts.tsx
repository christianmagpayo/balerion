import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { POSTS } from '@/lib/posts';
import { Eyebrow, d, BASE } from '@/components/site-chrome';
import { VideoEmbed } from '@/components/video-embed';

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember';

export function BlogPosts() {
  const rest = POSTS.slice(0, 4);
  return (
    <section className="relative border-t border-white/10" aria-labelledby="blog-heading">
      <div className="home-section-spacing mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Journal</Eyebrow>
            <h2 id="blog-heading" className="reveal font-display mt-5 text-3xl md:text-4xl">What we’re hearing. <em className="text-ember">What we’re building.</em></h2>
          </div>
          <Link href="/press" data-testid="link-blog-all" className={`hidden sm:inline-flex items-center gap-1.5 text-sm text-ember hover:text-bone transition-colors rounded-sm ${ring}`}>All posts <ArrowRight size={15} /></Link>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.25fr_1fr] gap-6">
          <div data-testid="card-post-lead" className="reveal flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink/90">
            <div className="relative overflow-hidden [&>div]:rounded-none [&>div]:border-0">
              <VideoEmbed
                title="Balerion AI: Building intelligence before underwriting"
                src="https://pub-a1d93bf5d1514dd58b18617074e23def.r2.dev/trimmed.webm"
                poster="https://framerusercontent.com/images/WLpdnGvyDUuSNd4LjpXGgDFZYw.jpg?width=1920&height=1080"
              />
              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ember px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">Latest video</span>
            </div>
            <div className="flex flex-1 items-end justify-between gap-6 p-6 md:p-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-ember">Balerion AI · Video</div>
                <h3 className="font-display mt-3 text-2xl md:text-3xl leading-tight">Building intelligence before underwriting.</h3>
              </div>
            </div>
          </div>

          <ol className="flex flex-col gap-3">
            {rest.map((p, i) => (
              <li key={p.href} className="reveal flex-1" style={d(i * 90)}>
                <a href={p.href} target="_blank" rel="noreferrer" data-testid={`card-post-${i}`} className={`group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-ink/90 p-3 pr-5 hover:border-ember/70 hover:bg-ink transition-colors ${ring}`}>
                  <div className="relative h-20 w-28 md:h-[88px] md:w-36 shrink-0 overflow-hidden rounded-xl">
                    <img src={`${BASE}${p.img}`} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-ember">0{i + 2} · {p.date}</div>
                    <h3 className="font-display mt-1.5 text-base md:text-lg leading-snug line-clamp-2">{p.title}</h3>
                    <div className="mt-1 text-xs text-bone/50">{p.read}</div>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-bone/40 group-hover:text-ember group-hover:rotate-45 transition-all" />
                </a>
              </li>
            ))}
          </ol>
        </div>
        <Link href="/press" data-testid="link-blog-all-mobile" className={`sm:hidden mt-6 inline-flex items-center gap-1.5 text-sm text-ember ${ring}`}>All posts <ArrowRight size={15} /></Link>
      </div>
    </section>
  );
}
