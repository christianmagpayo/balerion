import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import { MousePointer2 } from 'lucide-react';
import { Workspace } from './product-preview/workspace';
import './product-preview/preview.css';

const NATURAL = 1180;

function useFit() {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ s: 1, h: 0 });
  useLayoutEffect(() => {
    const o = outer.current, i = inner.current;
    if (!o || !i) return;
    const calc = () => {
      const s = Math.min(1, o.clientWidth / NATURAL);
      setFit({ s, h: Math.ceil(i.offsetHeight * s) + 2 });
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(o); ro.observe(i);
    return () => ro.disconnect();
  }, []);
  return { outer, inner, fit };
}

export function ProductPreview() {
  const { outer, inner, fit } = useFit();
  const hint = useRef<HTMLDivElement>(null);
  const hintText = useRef<HTMLSpanElement>(null);
  const showHint = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !hint.current || !hintText.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const target = event.target as HTMLElement;
    if (target.closest('aside[aria-label="Action items"]')) {
      hint.current.dataset.visible = 'false';
      return;
    }
    const control = target.closest('button, input');
    const message = control?.getAttribute('role') === 'tab'
      ? 'Click to switch tabs'
      : control?.classList.contains('pv-card-toggle')
        ? control.getAttribute('aria-expanded') === 'true' ? 'Click to collapse details' : 'Click to expand details'
        : control?.getAttribute('aria-label')?.startsWith('Copy ')
              ? 'Click to copy'
              : control ? 'Click to explore' : 'Try the tabs & cards';
    hintText.current.textContent = message;
    hint.current.dataset.visible = 'true';
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const width = hint.current.offsetWidth;
    const height = hint.current.offsetHeight;
    hint.current.style.left = `${Math.max(8, Math.min(x + 18, bounds.width - width - 8))}px`;
    hint.current.style.top = `${y + height + 24 > bounds.height ? Math.max(8, y - height - 14) : y + 20}px`;
  };
  return (
    <figure className="pv-preview relative min-w-0" data-testid="preview-product" aria-label="Interactive Balerion product demonstration" onPointerMove={showHint} onPointerLeave={() => { if (hint.current) hint.current.dataset.visible = 'false'; }} onPointerDown={() => { if (hint.current) hint.current.dataset.visible = 'false'; }}>
      <div ref={hint} className="pv-interaction-hint" aria-hidden="true">
        <MousePointer2 size={12} />
        <span ref={hintText}>Try the tabs &amp; cards</span>
      </div>
      <div ref={outer} className="pv-frame relative overflow-hidden" style={{ height: fit.h || undefined }}>
        <div ref={inner} className="absolute left-0 top-0" style={{ width: NATURAL, transform: `scale(${fit.s})`, transformOrigin: 'top left' }}>
          <Workspace uid="hero" />
        </div>
      </div>
      <figcaption className="sr-only">Illustrative product demonstration. Select tabs or expand cards to explore. Action items are display-only.</figcaption>
    </figure>
  );
}
