export type Member = { name: string; role: string; photo?: string; pos?: string; photoScale?: number; hue: [string, string] };

export const TEAM: Member[] = [
  { name: 'Naren Krishna', role: 'CEO & Co-Founder', photo: 'team/naren.png', hue: ['24 88% 59%', '350 70% 45%'] },
  { name: 'Vishal Satish', role: 'CTO & Co-Founder', photo: 'team/vishal.png', hue: ['38 90% 60%', '24 80% 40%'] },
  { name: 'Bahador Saket', role: 'Founding Product Lead', photo: 'team/bahador-saket.png', photoScale: 0.88, hue: ['160 50% 45%', '24 85% 55%'] },
  { name: 'Yulius Tjahjadi', role: 'Founding Engineer', hue: ['24 70% 45%', '252 30% 15%'] },
  { name: 'Oliver Bryniarski', role: 'AI Engineer', photo: 'team/oliver.webp', hue: ['200 60% 50%', '24 80% 45%'] },
  { name: 'Shivansh Baveja', role: 'AI Engineer', photo: 'team/shivansh.jpg', pos: 'center 20%', hue: ['270 50% 55%', '24 85% 55%'] },
  { name: 'Patrick Harkins', role: 'VP of Sales', photo: 'team/patrick.webp', hue: ['24 88% 59%', '300 40% 30%'] },
  { name: 'DeLaine Nick', role: 'Marketing Strategy Lead', photo: 'team/delaine.jpg', pos: 'center 20%', hue: ['340 70% 55%', '24 85% 50%'] },
  { name: 'Devin Daly', role: 'Strategic Advisor', photo: 'team/devin-white.jpg', hue: ['45 90% 60%', '10 70% 40%'] },
];
