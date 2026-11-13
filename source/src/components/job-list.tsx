import { ArrowUpRight } from 'lucide-react';
import { JOBS } from '@/lib/careers';
import { BASE } from '@/components/site-chrome';

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

/** Compact divided job rows with optional hash targets on the careers page. */
export function JobList({ prefix, anchors }: { prefix: string; anchors?: boolean }) {
  return (
    <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-card/60">
      {JOBS.map((job, i) => (
        <li key={job.id} id={anchors ? job.id : undefined} data-testid={`row-job-${prefix}-${job.id}`}
          className="group relative grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-3 md:px-5 transition-colors hover:bg-ember/[0.05] target:bg-ember/[0.07] scroll-mt-28">
          <span className="absolute left-0 inset-y-0 w-px origin-top scale-y-0 bg-ember transition-transform duration-500 group-hover:scale-y-100 group-target:scale-y-100" aria-hidden />
          <span className="font-mono text-[10px] text-bone/35">0{i + 1}</span>
          <div>
            <h3 id={`${prefix}-${job.id}`} className="font-display text-lg md:text-xl leading-tight text-bone" data-testid={`text-job-title-${prefix}-${job.id}`}>{job.title}</h3>
            <p className="mt-1 text-xs text-bone/50">San Francisco, CA · Onsite</p>
          </div>
          <div className="col-start-2 sm:col-start-3 flex items-center gap-4">
            <a href={`${BASE}careers/${job.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Apply for ${job.title} (opens in a new tab)`} data-testid={`button-apply-${prefix}-${job.id}`} className={`inline-flex items-center gap-1 rounded-full border border-ember/50 px-3 py-1 text-xs text-ember hover:bg-ember hover:text-ink transition-colors ${focus}`}>Apply <ArrowUpRight size={13} aria-hidden /></a>
          </div>
        </li>
      ))}
    </ul>
  );
}
