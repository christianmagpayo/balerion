import { useEffect, useState, type ReactNode, type CSSProperties } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { FundingBanner } from '@/components/funding-banner';

export const BASE = import.meta.env.BASE_URL;
export const DEMO = 'mailto:info@balerion.ai?subject=' + encodeURIComponent('Balerion demo request');
export const CANDIDATE = 'mailto:hiring@balerion.ai?cc=bahador@balerion.ai,naren@balerion.ai&subject=' + encodeURIComponent('Candidate introduction');
export const INVESTOR = 'mailto:info@balerion.ai?subject=' + encodeURIComponent('Investor inquiry');
export const FUNDING = 'https://www.businesswire.com/news/home/20260416928809/en/Balerion-AI-Raises-%246M-to-Close-Mortgages-in-Hours-Not-Weeks';

export const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

export function useReveal(key?: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`font-mono text-[11px] uppercase tracking-[0.25em] flex items-center gap-3 ${dark ? 'text-bone/50' : 'text-bone/60'}`}>
      <span className="h-px w-8 bg-ember" />{children}
    </div>
  );
}

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm';

const DEFAULT_CONTAINER = 'mx-auto max-w-7xl px-5 md:px-8';

export function Nav({ page = 'home' }: { page?: 'home' | 'product' | 'research' | 'team' | 'security' | 'careers' | 'press' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  const home = page === 'home';
  const close = () => setOpen(false);
  const items = (mobile: boolean) => {
    const cls = mobile ? `text-lg ${focus}` : `hover:text-bone transition-colors ${focus}`;
    return (
      <>
        <Link href="/product" onClick={close} aria-current={page === 'product' ? 'page' : undefined} data-testid={`link-nav-product${mobile ? '-mobile' : ''}`} className={`${cls} ${page === 'product' ? 'text-ember' : ''}`}>Product</Link>
        <Link href="/research" onClick={close} aria-current={page === 'research' ? 'page' : undefined} data-testid={`link-nav-research${mobile ? '-mobile' : ''}`} className={`${cls} ${page === 'research' ? 'text-ember' : ''}`}>Research</Link>
        <Link href="/team" onClick={close} aria-current={page === 'team' ? 'page' : undefined} data-testid={`link-nav-team${mobile ? '-mobile' : ''}`} className={`${cls} ${page === 'team' ? 'text-ember' : ''}`}>Team</Link>
        <Link href="/security" onClick={close} aria-current={page === 'security' ? 'page' : undefined} data-testid={`link-nav-security${mobile ? '-mobile' : ''}`} className={`${cls} ${page === 'security' ? 'text-ember' : ''}`}>Security</Link>
        <Link href="/press" onClick={close} aria-current={page === 'press' ? 'page' : undefined} data-testid={`link-nav-press${mobile ? '-mobile' : ''}`} className={`${cls} ${page === 'press' ? 'text-ember' : ''}`}>Press</Link>
      </>
    );
  };
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-white/10' : ''}`}>
      <FundingBanner href={FUNDING} />
      <div className="mx-auto w-full max-w-[1360px] px-5 md:px-8 xl:px-10 h-16 grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center text-bone">
        {home
          ? <a href="#top" data-testid="link-home" aria-label="Balerion home" className={`justify-self-start ${focus}`}><img src={`${BASE}brand/balerion-logo.svg`} alt="Balerion" className="h-6 w-auto" /></a>
          : <Link href="/" onClick={() => window.scrollTo(0, 0)} data-testid="link-home" aria-label="Balerion home" className={`justify-self-start ${focus}`}><img src={`${BASE}brand/balerion-logo.svg`} alt="Balerion" className="h-6 w-auto" /></Link>}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-5 lg:gap-8 text-sm whitespace-nowrap text-bone/70">{items(false)}</nav>
        <div className="flex items-center justify-self-end gap-2">
          <button className={`md:hidden p-2 ${focus}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} data-testid="button-menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="md:hidden bg-ink border-t border-white/10 px-5 py-4 flex flex-col gap-4 text-bone">
          {items(true)}
          {!home && <a href={DEMO} className={`rounded-full bg-ember text-ink text-center font-medium px-4 py-3 ${focus}`}>{page === 'product' ? 'Request demo' : 'Book a demo'}</a>}
        </nav>
      )}
    </header>
  );
}

export function Footer({ containerClassName = DEFAULT_CONTAINER, spacingClassName = 'pt-16 pb-10' }: { containerClassName?: string; spacingClassName?: string }) {
  return (
    <footer className="text-bone">
      <div className={`${containerClassName} ${spacingClassName}`}>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center text-sm text-bone/50">
          <img src={`${BASE}brand/balerion-logo.svg`} alt="Balerion" className="h-5 w-auto" />
          <div className="flex flex-wrap gap-6">
            <a href="https://balerion.ai/company" target="_blank" rel="noreferrer" className="hover:text-bone" data-testid="link-footer-company">Company</a>
            <Link href="/research" className="hover:text-bone" data-testid="link-footer-research">Research</Link>
            <Link href="/team" className="hover:text-bone" data-testid="link-footer-team">Team</Link>
            <Link href="/security" className="hover:text-bone" data-testid="link-footer-security">Security</Link>
            <Link href="/press" className="hover:text-bone" data-testid="link-footer-press">Press</Link>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <span className="font-mono text-xs">San Francisco, CA · {new Date().getFullYear()}</span>
            <div className="flex gap-1">
              <a href="https://www.linkedin.com/company/balerion-ai/" target="_blank" rel="noopener noreferrer" aria-label="Balerion on LinkedIn" title="LinkedIn" className={`inline-flex h-9 w-9 items-center justify-center text-bone/45 hover:text-ember hover:bg-ember/10 transition-colors ${focus}`} data-testid="link-footer-linkedin">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" /></svg>
              </a>
              <a href="https://x.com/BalerionAI" target="_blank" rel="noopener noreferrer" aria-label="Balerion on X" title="X" className={`inline-flex h-9 w-9 items-center justify-center text-bone/45 hover:text-ember hover:bg-ember/10 transition-colors ${focus}`} data-testid="link-footer-x">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
