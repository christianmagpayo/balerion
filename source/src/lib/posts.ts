const P = 'https://balerion.ai/press/';
export const POSTS = [
  { title: 'Connecting Beyond the Booth', date: 'Oct 28, 2026', read: '6 min read', img: 'blog/connecting.png', href: P + 'connecting-beyond-the-booth' },
  { title: 'What I’m Hearing About the Next Chapter of Mortgage Intelligence', date: 'Oct 8, 2026', read: '6 min read', img: 'blog/hearing.png', href: P + 'what-i%E2%80%99m-hearing-about-the-next-chapter-of-mortgage-intelligence' },
  { title: 'Building Balerion: It Was Never Just About AI', date: 'Sep 15, 2026', read: '8 min read', img: 'blog/building.png', href: P + 'building-balerion-it-was-never-just-about-ai' },
  { title: 'Why Mortgages Need Smarter Tech: A Note From My First Month at Balerion', date: 'Sep 9, 2026', read: '7 min read', img: 'blog/first-month.png', href: P + 'why-mortgages-need-smarter-tech-a-note-from-my-first-month-at-balerion' },
  { title: 'Mortgage needs more than ChatGPT', date: 'Jul 9, 2026', read: '5 min read', img: 'blog/chatgpt.png', href: P + 'mortgage-needs-more-than-chatgpt' },
];

export type Kind = 'Blog' | 'Video' | 'Press';
export type Entry = { title: string; date: string; read: string; img: string; href: string; kind: Kind };
export const ENTRIES: Entry[] = ([
  ...POSTS.map((p) => ({ ...p, kind: 'Blog' as Kind })),
  { kind: 'Video', title: 'Intelligence Before Underwriting: Naren Krishna on Chrisman Commentary', date: 'Sep 21, 2026', read: '20:43', img: 'blog/chrisman.png', href: P + 'intelligence-before-underwriting-naren-krishna-on-chrisman-commentary' },
  { kind: 'Video', title: 'Fewer Touches. Faster Underwriting. More Capacity. | Naren Krishna, Balerion AI', date: 'Sep 3, 2026', read: '21:30', img: 'blog/fewer-touches.png', href: P + 'fewer-touches.-faster-underwriting.-more-capacity.-naren-krishna-balerion-ai' },
  { kind: 'Video', title: 'The Big Picture - How AI Is Transforming Mortgage Lending From the Ground Up', date: 'Aug 20, 2026', read: '47:25', img: 'blog/big-picture.png', href: P + 'the-big-picture---how-ai-is-transforming-mortgage-lending-from-the-ground-up' },
  { kind: 'Video', title: 'Breaking Into the Twenty-Year Startup Graveyard of Mortgage Lending', date: 'Aug 18, 2026', read: '22:26', img: 'blog/graveyard.png', href: P + 'breaking-into-the-twenty-year-startup-graveyard-of-mortgage-lending' },
  { kind: 'Press', title: 'BusinessWire: Balerion AI Raises $6M To Automate Mortgage Origination Process', date: 'Apr 20, 2026', read: '1 min read', img: 'blog/funding.png', href: P + 'balerion-raises-6m-to-close-mortgages-in-hours-not-weeks' },
] as Entry[]).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
