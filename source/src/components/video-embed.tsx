import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { BASE } from '@/components/site-chrome';

const SRC = 'https://pub-a1d93bf5d1514dd58b18617074e23def.r2.dev/KP_PP_Balerion_SOCIAL.webm';

export function VideoEmbed({ title, src = SRC, poster = `${BASE}team/raise-poster.png` }: { title: string; src?: string; poster?: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const start = () => { setOn(true); requestAnimationFrame(() => ref.current?.play().catch(() => {})); };
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-ink">
      <video ref={ref} src={src} poster={poster} preload="none" controls={on} playsInline title={title} className="absolute inset-0 h-full w-full object-cover" data-testid="video-raise" />
      {!on && (
        <button onClick={start} aria-label={`Play video: ${title}`} data-testid="button-play-video" className="group absolute inset-0 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember">
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full bg-ember text-ink shadow-[0_0_0_10px_hsl(var(--ember)/.2)] group-hover:scale-110 transition-transform">
            <Play size={28} fill="currentColor" className="ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}
