import { CircleX, CircleAlert, CircleCheck } from 'lucide-react';
import { Eyebrow, d } from '@/components/site-chrome';

const OUTCOMES = [
  { key: 'red', label: 'Red', Icon: CircleX, tone: '4 62% 62%', title: 'Definitive problem', body: 'The evidence is clear. Return for correction.', action: 'Return' },
  { key: 'amber', label: 'Amber', Icon: CircleAlert, tone: '38 70% 62%', title: 'Needs judgment', body: 'AI cannot be certain. A person reviews it.', action: 'Review' },
  { key: 'green', label: 'Green', Icon: CircleCheck, tone: '150 32% 58%', title: 'Solid check', body: 'Verified against the evidence. Move forward.', action: 'Proceed' },
] as const;

export function CheckOutcomes({ pad }: { pad: string }) {
  return (
    <section className={`${pad} border-b border-white/10`} aria-labelledby="co-h">
      <Eyebrow>Check outcomes</Eyebrow>
      <h2 id="co-h" className="reveal mt-5 font-display text-4xl md:text-5xl lg:text-[clamp(2rem,3.1vw,2.75rem)] leading-[1.02]">Every check gets a clear status. <em className="text-ember">The loan decision stays yours.</em></h2>
      <p className="reveal mt-4 max-w-2xl text-bone/60 leading-relaxed" style={d(80)}>Red, Amber and Green describe individual checks, not approval or denial of a loan.</p>

      <ul className="mt-7 grid md:grid-cols-3 gap-3" aria-label="Check statuses">
        {OUTCOMES.map(({ key, label, Icon, tone, title, body, action }, i) => (
          <li key={key} data-testid={`card-outcome-${key}`} className="reveal group relative overflow-hidden rounded-xl border border-white/10 bg-ink/50 p-5 transition-colors duration-300 hover:border-white/20 motion-reduce:transition-none" style={d(120 + i * 90)}>
            <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-50 transition-transform duration-500 group-hover:scale-y-100 motion-reduce:transition-none" style={{ background: `hsl(${tone})` }} />
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: `hsl(${tone})`, borderColor: `hsl(${tone} / 0.35)`, background: `hsl(${tone} / 0.08)` }}>
                <Icon size={13} strokeWidth={2} aria-hidden /> {label}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone/45">{action}</span>
            </div>
            <h3 className="mt-4 font-display text-[22px] leading-tight">{title}</h3>
            <p className="mt-1.5 text-sm text-bone/60">{body}</p>
          </li>
        ))}
      </ul>

    </section>
  );
}
