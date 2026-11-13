import { ArrowUpRight } from 'lucide-react';

export function FundingBanner({ href }: { href: string }) {
  return (
    <div className="funding-banner flex h-9 items-center bg-ember text-ink">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-testid="link-top-funding"
        className="flex h-full min-w-0 flex-1 items-center justify-center gap-3 overflow-hidden whitespace-nowrap px-4 text-xs sm:text-sm focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <strong>Balerion AI raises $6M</strong>
        <span className="hidden sm:inline">· Backed by Kleiner Perkins</span>
        <span className="inline-flex items-center gap-1 font-medium">Read the announcement <ArrowUpRight size={14} /></span>
      </a>
    </div>
  );
}
