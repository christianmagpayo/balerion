import { Eyebrow, d, BASE } from '@/components/site-chrome';

const INVESTORS = [
  { name: 'Kleiner Perkins', logo: 'investors/kleiner.svg', href: 'https://www.kleinerperkins.com/', h: 'h-9' },
  { name: 'Pruven Capital', logo: 'investors/pruven.svg', href: 'https://www.pruvencap.com/', h: 'h-7' },
  { name: 'Formation VC', logo: 'investors/formation.svg', href: 'https://www.formationvc.com/', h: 'h-5' },
  { name: 'BoxGroup', logo: 'investors/box.svg', href: 'https://www.boxgroup.com/', h: 'h-9' },
];

export function Investors() {
  return (
    <section className="relative border-t border-white/10" aria-labelledby="investors-heading">
      <div className="home-section-spacing mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow>Investors</Eyebrow>
        <h2 id="investors-heading" className="reveal font-display mt-5 text-3xl md:text-4xl">Designed to scale. <em className="text-ember">Backed by the best.</em></h2>
        <ul className="mt-10 grid grid-cols-2 lg:grid-cols-4 rounded-3xl border border-white/10 bg-ink/90 overflow-hidden">
          {INVESTORS.map((v, i) => (
            <li key={v.name} className={`reveal border-white/10 ${i % 2 ? 'border-l' : ''} ${i > 0 ? 'lg:border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''}`} style={d(i * 90)}>
              <a href={v.href} target="_blank" rel="noreferrer" aria-label={v.name} data-testid={`link-investor-${i}`} className="group flex h-28 md:h-36 items-center justify-center px-6 hover:bg-ember/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember">
                <img src={`${BASE}${v.logo}`} alt={v.name} className={`${v.h} w-auto max-w-[80%] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
