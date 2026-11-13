import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Play, Search, X, FileText, Newspaper } from 'lucide-react';
import { Nav, Footer, Eyebrow, d, BASE } from '@/components/site-chrome';
import { ENTRIES, type Entry, type Kind } from '@/lib/posts';

const TITLE = 'Press | Balerion — Insights & Updates';
const DESC = 'Research, case studies, and product thinking from the Balerion team.';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  const prev = el.getAttribute('content');
  el.setAttribute('content', value);
  return () => { if (created) el!.remove(); else if (prev !== null) el!.setAttribute('content', prev); };
}

type Filter = 'All' | Kind;
const FILTERS: { k: Filter; label: string }[] = [
  { k: 'All', label: 'All' }, { k: 'Blog', label: 'Writing' }, { k: 'Video', label: 'Video' }, { k: 'Press', label: 'Press' },
];
const count = (k: Filter) => (k === 'All' ? ENTRIES.length : ENTRIES.filter((e) => e.kind === k).length);
const slug = (e: Entry) => e.href.split('/').pop()!.slice(0, 40);

function KindTag({ e }: { e: Entry }) {
  const Icon = e.kind === 'Video' ? Play : e.kind === 'Press' ? Newspaper : FileText;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ember">
      <Icon size={11} aria-hidden /> {e.kind === 'Blog' ? 'Writing' : e.kind}
    </span>
  );
}

function Meta({ e }: { e: Entry }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-widest text-bone/50">
      {e.date} · {e.kind === 'Video' ? <>Watch · <span className="text-bone/75">{e.read}</span></> : e.read}
    </span>
  );
}

function Thumb({ e, cls = '' }: { e: Entry; cls?: string }) {
  return (
    <div className={`relative overflow-hidden ${cls}`}>
      <img src={`${BASE}${e.img}`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      {e.kind === 'Video' && (
        <>
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
          <span className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-ink/80 backdrop-blur px-3 py-1.5 text-xs text-bone border border-white/15">
            <span className="grid place-items-center h-5 w-5 rounded-full bg-ember text-ink"><Play size={10} fill="currentColor" aria-hidden /></span>
            Watch · <span className="font-mono">{e.read}</span>
          </span>
        </>
      )}
    </div>
  );
}

function Feature({ e }: { e: Entry }) {
  return (
    <a href={e.href} target="_blank" rel="noreferrer" data-testid={`card-press-feature-${slug(e)}`}
      className={`group card-in grid md:grid-cols-[1.35fr_1fr] overflow-hidden rounded-3xl border border-white/10 bg-card/60 hover:border-ember/60 transition-colors ${focus}`}>
      <Thumb e={e} cls="aspect-[16/9] md:aspect-auto md:min-h-[320px]" />
      <div className="flex flex-col justify-between gap-8 p-6 md:p-9">
        <div>
          <div className="flex items-center gap-3"><KindTag e={e} /><span className="h-px w-6 bg-white/15" /><span className="font-mono text-[10px] uppercase tracking-widest text-bone/40">Most recent</span></div>
          <h2 className="font-display mt-4 text-2xl md:text-[2rem] leading-[1.15]">{e.title}</h2>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Meta e={e} />
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/30 group-hover:bg-ember group-hover:border-ember group-hover:text-ink transition-colors">
            {e.kind === 'Video' ? <Play size={16} aria-hidden /> : <ArrowUpRight size={18} aria-hidden />}
          </span>
        </div>
      </div>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function Card({ e, i }: { e: Entry; i: number }) {
  return (
    <li className="card-in" style={d(Math.min(i, 8) * 60)}>
      <a href={e.href} target="_blank" rel="noreferrer" data-testid={`card-press-${slug(e)}`}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/40 hover:border-ember/60 hover:bg-card/70 transition-colors ${focus}`}>
        <Thumb e={e} cls="aspect-[16/9]" />
        <div className="flex flex-1 flex-col gap-4 p-5">
          <KindTag e={e} />
          <h3 className="font-display text-lg md:text-xl leading-snug">{e.title}</h3>
          <div className="mt-auto flex items-center justify-between gap-3 pt-2 border-t border-white/[0.07]">
            <Meta e={e} />
            <ArrowUpRight size={17} className="shrink-0 text-bone/40 group-hover:text-ember group-hover:rotate-45 transition-all motion-reduce:transition-none" aria-hidden />
          </div>
        </div>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </li>
  );
}

function Row({ e, i }: { e: Entry; i: number }) {
  return (
    <li className="card-in" style={d(Math.min(i, 8) * 50)}>
      <a href={e.href} target="_blank" rel="noreferrer" data-testid={`row-press-${slug(e)}`}
        className={`group grid grid-cols-[96px_1fr_auto] sm:grid-cols-[140px_1fr_auto] items-center gap-4 sm:gap-6 py-4 border-b border-white/10 hover:bg-white/[0.02] transition-colors ${focus}`}>
        <Thumb e={{ ...e, kind: e.kind === 'Video' ? 'Blog' : e.kind }} cls="aspect-[16/10] rounded-lg" />
        <div className="min-w-0">
          <KindTag e={e} />
          <h3 className="font-display mt-1.5 text-base md:text-lg leading-snug line-clamp-2">{e.title}</h3>
          <div className="mt-1"><Meta e={e} /></div>
        </div>
        <ArrowUpRight size={17} className="text-bone/40 group-hover:text-ember group-hover:rotate-45 transition-all motion-reduce:transition-none" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </li>
  );
}

export default function Press() {
  const [filter, setFilter] = useState<Filter>('All');
  const [q, setQ] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;
    const undo = [setMeta('name', 'description', DESC), setMeta('property', 'og:title', TITLE), setMeta('property', 'og:description', DESC)];
    if (!window.location.hash) window.scrollTo(0, 0);
    return () => { document.title = prevTitle; undo.forEach((u) => u()); };
  }, []);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return ENTRIES.filter((e) => (filter === 'All' || e.kind === filter) && (!t || `${e.title} ${e.date} ${e.kind}`.toLowerCase().includes(t)));
  }, [filter, q]);

  const showFeature = view === 'grid' && results.length > 2;
  const [feature, ...rest] = showFeature ? results : [undefined, ...results];
  const key = `${filter}|${q}|${view}`;
  const videos = ENTRIES.filter((e) => e.kind === 'Video');

  return (
    <div className="grain relative isolate min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Nav page="press" />
      <main className="relative z-10 text-bone">
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-[150px] pb-10 md:pb-14 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
            <div>
              <div className="rise" style={d(60)}><Eyebrow>Press &amp; journal</Eyebrow></div>
              <h1 className="rise font-display mt-6 text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.05]" style={d(140)} data-testid="text-press-headline">Insights &amp; <em className="text-ember">Updates</em></h1>
              <p className="rise mt-5 text-bone/65 leading-relaxed md:whitespace-nowrap" style={d(220)}>Research, case studies, and product thinking from the Balerion team.</p>
            </div>
            <div role="group" aria-label="Filter entries by type" className="rise grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-card/50 divide-x divide-white/10" style={d(280)}>
              {(['Blog', 'Video', 'Press'] as Kind[]).map((k) => (
                <button key={k} type="button" onClick={() => setFilter(k)} aria-pressed={filter === k} aria-controls="press-entries" data-testid={`button-summary-filter-${k.toLowerCase()}`}
                  className={`cursor-pointer p-4 md:p-5 text-left transition-colors motion-reduce:transition-none ${focus} ${filter === k ? 'bg-ember/15 ring-1 ring-inset ring-ember/50' : 'hover:bg-ember/[0.08]'}`}>
                  <span className={`block font-mono text-[10px] uppercase tracking-widest ${filter === k ? 'text-ember' : 'text-bone/60'}`}>{k === 'Blog' ? 'Writing' : k}</span>
                  <span className={`block font-display mt-2 text-3xl ${filter === k ? 'text-ember' : 'text-bone'}`}>{String(count(k)).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="sticky top-[100px] z-30 border-y border-white/10 bg-ink/85 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-5 md:px-8 py-3 flex flex-col md:flex-row md:items-center gap-3 justify-between">
            <div role="group" aria-label="Filter by category" className="flex gap-1.5 overflow-x-auto -mx-1 px-1">
              {FILTERS.map(({ k, label }) => {
                const on = filter === k;
                return (
                  <button key={k} type="button" onClick={() => setFilter(k)} aria-pressed={on} data-testid={`button-filter-${k.toLowerCase()}`}
                    className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors ${focus} ${on ? 'bg-ember text-ink' : 'border border-white/10 text-bone/70 hover:text-bone hover:border-ember/50'}`}>
                    {label}<span className={`font-mono text-[10px] ${on ? 'text-ink/70' : 'text-bone/40'}`}>{count(k)}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <label className="relative flex-1 md:w-72">
                <span className="sr-only">Search insights and updates</span>
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" aria-hidden />
                <input type="search" value={q} onChange={(ev) => setQ(ev.target.value)} placeholder="Search titles, dates" data-testid="input-press-search"
                  className={`w-full rounded-full border border-white/10 bg-card/60 pl-9 pr-9 py-2 text-sm text-bone placeholder:text-bone/35 focus:border-ember/60 ${focus} [&::-webkit-search-cancel-button]:hidden`} />
                {q && <button type="button" onClick={() => setQ('')} aria-label="Clear search" data-testid="button-clear-search" className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 text-bone/50 hover:text-bone ${focus}`}><X size={14} /></button>}
              </label>
              <div role="group" aria-label="Layout" className="hidden sm:flex rounded-full border border-white/10 p-0.5">
                {(['grid', 'list'] as const).map((v) => (
                  <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} data-testid={`button-view-${v}`}
                    className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${focus} ${view === v ? 'bg-bone/10 text-bone' : 'text-bone/45 hover:text-bone'}`}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section id="press-entries" className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-14" aria-label="Insights and updates">
          <p className="font-mono text-[11px] uppercase tracking-widest text-bone/45" aria-live="polite" data-testid="text-results-count">
            {results.length} {results.length === 1 ? 'entry' : 'entries'}{filter !== 'All' ? ` in ${FILTERS.find((f) => f.k === filter)!.label}` : ''}{q.trim() ? ` matching “${q.trim()}”` : ''}
          </p>

          {results.length === 0 ? (
            <div className="card-in mt-8 rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center" data-testid="state-empty">
              <Search size={22} className="mx-auto text-ember" aria-hidden />
              <h2 className="font-display mt-4 text-2xl">Nothing on that yet.</h2>
              <p className="mt-2 text-sm text-bone/55">No entries match your search. Try another term or view everything.</p>
              <button type="button" onClick={() => { setQ(''); setFilter('All'); }} data-testid="button-reset-filters" className={`mt-6 rounded-full bg-ember text-ink text-sm font-medium px-5 py-2.5 hover:bg-ember/80 transition-colors ${focus}`}>Reset filters</button>
            </div>
          ) : (
            <div key={key} className="mt-6">
              {feature && <Feature e={feature} />}
              {view === 'grid' ? (
                <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((e, i) => e && <Card key={e.href} e={e} i={i} />)}
                </ul>
              ) : (
                <ol className="border-t border-white/10">
                  {rest.map((e, i) => e && <Row key={e.href} e={e} i={i} />)}
                </ol>
              )}
            </div>
          )}
        </section>

        {filter === 'All' && !q && (
          <section className="border-t border-white/10" aria-labelledby="watch-heading">
            <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-16 grid lg:grid-cols-[1fr_2fr] gap-10">
              <div>
                <Eyebrow>Listen in</Eyebrow>
                <h2 id="watch-heading" className="reveal in font-display mt-5 text-3xl">Conversations on <em className="text-ember">mortgage intelligence.</em></h2>
                <p className="mt-3 text-sm text-bone/55">{videos.length} recorded sessions · {videos.reduce((s, v) => { const [m, sec] = v.read.split(':').map(Number); return s + m * 60 + sec; }, 0) / 60 | 0} minutes total</p>
              </div>
              <ol className="divide-y divide-white/10 border-y border-white/10">
                {videos.map((v, i) => (
                  <li key={v.href}>
                    <a href={v.href} target="_blank" rel="noreferrer" data-testid={`link-watch-${i}`} className={`group flex items-center gap-4 py-4 ${focus}`}>
                      <span className="grid place-items-center h-10 w-10 shrink-0 rounded-full border border-ember/40 text-ember group-hover:bg-ember group-hover:text-ink transition-colors"><Play size={14} aria-hidden /></span>
                      <span className="min-w-0 flex-1 text-sm md:text-base text-bone/85 group-hover:text-bone line-clamp-2">{v.title}</span>
                      <span className="font-mono text-xs text-bone/50 shrink-0">Watch · {v.read}</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </main>
      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
