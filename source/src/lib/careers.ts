export type JobDescription = { updated: string; roleTitle?: string; sections: { title: string; paragraph?: string; items?: string[] }[] };

const compensation: JobDescription['sections'][number] = {
  title: 'Compensation',
  items: [
    'Base salary: $230K–$300K (depending on the level)',
    'Meaningful equity',
    'Daily lunch provided',
    'Equinox or wellness stipend',
    'Fun work environment with company events',
  ],
};

export const softwareDescription: JobDescription = {
  updated: 'November 2, 2026',
  sections: [
    { title: 'About Us', paragraph: 'Balerion AI. We’re an 8-person team from UC Berkeley that raised an $8M seed round from Kleiner Perkins to deploying enterprise agents in the real world starting in financial services. Our goal is to build an end-to-end agentic mortgage lending solution to enable significantly cheaper and faster loan origination. We’re already working with leading lenders moving 4B+ in loan volume and live testing with the #1 and #2 lenders in the US. We’re at an inflection point: product is live, early signals are promising, and we’re ready to invest in growth. As one of the early technical hires, you’ll report directly to the CTO to turn ideas into real, scalable products.' },
    { title: 'Role Overview', paragraph: "We're looking for a generalist Software Engineer to build the core product and infrastructure powering the next generation of AI-driven financial services. You'll own features end-to-end, from designing intuitive user interfaces to building scalable backend services and integrating cutting-edge AI capabilities into production applications. This is a high-ownership role for someone who loves building products from the ground up, moves quickly, and enjoys solving challenging engineering problems. You'll play a critical role in shaping our product, architecture, and engineering culture." },
    { title: "What You'll Do", items: [
      'Design, build, and ship end-to-end product features across frontend, backend, and infrastructure.',
      'Integrate intelligent automation into real-world product experiences, including implementing key pieces of a guideline compiler',
      'Build intuitive, performant user interfaces that make complex AI workflows accessible to enterprise users.',
      'Architect scalable backend services, APIs, and data pipelines that power mission-critical applications.',
      'Own features from initial product design through implementation, deployment, and iteration.',
      'Collaborate directly with founders, other engineers, and customers to translate product requirements into technical solutions.',
    ] },
    { title: "What We're Looking For", items: [
      'Strong software engineering fundamentals and experience building production-grade applications.',
      'Experience building backend services and APIs using Python, Java, or similar technologies.',
      'Ability to independently design, implement, and ship complex features end-to-end.',
      'Strong product intuition and attention to user experience.',
      'Excellent problem-solving skills, a bias toward action, and comfort operating in ambiguous environments.',
      'BS/MS in Computer Science or a related engineering discipline, or equivalent practical experience.',
    ] },
    { title: 'Bonus Points', items: [
      'Experience at early-stage startups or building products from 0 → 1.',
      'Experience building AI-native applications or working with LLMs and agentic systems.',
      'Experience with enterprise SaaS, complex workflows, or data-intensive applications.',
      'Strong interest in product design and user experience.',
      'Experience leading technical projects or making architectural decisions.',
    ] },
    { title: 'Why Join', items: [
      'Founding-level impact on the product and company.',
      'Equity ownership in an early-stage startup.',
      'Opportunity to shape and lead the engineering team as we grow.',
      'High-velocity growth, challenging technical problems, and significant ownership.',
    ] },
    compensation,
    { title: 'How to Apply', paragraph: "Send your resume, GitHub, or projects to hiring@balerion.ai with a short note about why you're interested." },
  ],
};

export const aiDescription: JobDescription = {
  updated: 'November 2, 2026',
  roleTitle: 'Applied AI Engineer - Agents',
  sections: [
    softwareDescription.sections[0],
    { title: 'Role Overview', paragraph: 'We’re looking for an Applied AI Engineer to tackle cutting-edge, unsolved problems at the frontier of agentic AI including but not limited to:', items: [
      'Multi-step reasoning',
      'Human-in-the-loop alignment',
      'Sparse and/or noisy rewards',
      'Precise instruction-following',
      'Autonomous context/harness search',
    ] },
    { title: 'Your Impact', paragraph: 'You will be a good fit if you thrive in fast-paced environments and enjoy building products from the ground up. You’ll play a critical role in shaping the architecture, product direction, and engineering culture of the company.' },
    { title: 'What You’ll Do', items: [
      'Design and build agents for real-world applications',
      'Improve both the underlying model capabilities and the infrastructure surrounding it',
      'Scale fleets of agents in production environments',
      'Build meaningful evals for messy, real-world domains',
      'Experiment rapidly with new models, tools, and approaches',
      'Collaborate cross-functionally to translate product requirements into AI solutions',
      'Monitor, evaluate, and continuously improve model performance',
      'Contribute to architecture decisions and technical roadmap',
    ] },
    { title: 'What We’re Looking For', items: [
      'Strong background in machine learning, deep learning, or related fields',
      'Strong foundations in linear algebra and statistics',
      'Proficiency in Python and ML libraries (e.g., PyTorch, TensorFlow, JAX)',
      'Experience with LLM training and inference frameworks (Megatron, vLLM, etc.)',
      'Experience with agentic infrastructure (context, tools, harnesses, etc.)',
      'Strong problem-solving skills and a bias toward action',
      'MS/PhD in Computer Science or a related engineering discipline OR 5+ years building AI systems in the real world',
    ] },
    { title: 'Bonus Points', items: [
      'Experience at early-stage startups',
      'Experience building products from 0 → 1',
      'Interest in product design',
      'Experience leading technical projects or teams',
    ] },
    { title: 'Why Join', items: [
      'Founding-level impact on the product and company',
      'Equity ownership in an early-stage startup',
      'Work directly with founders on key decisions',
      'Opportunity to build and lead the engineering team',
      'High-velocity growth and significant ownership',
    ] },
    compensation,
    { title: 'How to Apply', paragraph: 'Send your resume, GitHub, or projects to hiring@balerion.ai with a short note about why you’re interested.' },
  ],
};

export const forwardDeployedDescription: JobDescription = {
  updated: 'November 2, 2026',
  sections: [
    { title: 'About Us', paragraph: 'Balerion AI. We’re an 8-person team from UC Berkeley that raised an $8M seed round from Kleiner Perkins to deploying enterprise agents in the real world starting in financial services. Our goal is to build an end-to-end agentic mortgage lending solution to enable significantly cheaper and faster loan origination. We’re already working with leading lenders moving 4B+ in loan volume and live testing with the #1 and #2 lenders in the US. We’re at an inflection point: product is live, early signals are promising, and we’re ready to invest in growth. As our first FDE, you’ll report directly to the CTO to turn ideas into real, scalable products.' },
    { title: 'Role Overview', paragraph: "We're building AI that transforms mortgage lending by automating complex workflows for lenders and financial institutions. As one of our first Forward-Deployed Engineers, you'll work directly with customers to deploy AI into production, solve challenging technical problems, and shape both our product and engineering roadmap.\n\nThis is a highly technical, customer-facing role ideal for someone who enjoys writing production code, working closely with users, and owning product in fast-moving environments." },
    { title: 'Key Responsibilities', items: [
      'Partner directly with customers to understand workflows and deploy AI solutions into production.',
      'Design, build, and maintain integration points between our platform and customer systems.',
      'Write high-quality production code across the application stack to deliver customer-specific and reusable product capabilities.',
      'Debug complex technical issues and drive implementations from proof of concept to production.',
      'Translate customer feedback into product improvements, working closely with engineering and founders.',
      'Help define deployment best practices, implementation playbooks, and technical architecture as we scale.',
    ] },
    { title: 'Qualifications', items: [
      'Strong software engineering experience with the ability to build and ship production systems.',
      'Experience working directly with customers or stakeholders to deliver technical solutions.',
      'Experience in financial services, fintech, mortgage lending, banking, or other regulated industries is a plus.',
      'Excited to work in a fast-paced startup environment and take ownership of ambiguous problems.',
    ] },
    { title: 'What Success Looks Like', paragraph: 'Within your first 6–12 months, you will:', items: [
      'Successfully deploy AI solutions for multiple enterprise customers, delivering measurable business value.',
      'Establish scalable implementation practices that enable the company to support many more customers without proportionally increasing engineering effort.',
      'Become a trusted technical partner to customers, helping them adopt AI into critical lending workflows.',
      'Ship production-quality features that evolve from customer implementations into core product capabilities.',
      'Influence the product roadmap through deep customer insights and technical leadership.',
    ] },
    { title: 'Why Join Us', items: [
      'Founding-level impact on both product and growth at a category-defining fintech company',
      'Equity ownership in an early-stage startup',
      'Close collaboration with founders on key decisions',
      'Fast learning and significant ownership',
    ] },
    compensation,
    { title: 'How to Apply', paragraph: 'Send your resume or portfolio to hiring@balerion.ai with a short note about why you’re interested.' },
  ],
};

export const JOBS: { id: string; title: string; description?: JobDescription }[] = [
  { id: 'software-engineer', title: 'Software Engineer (All Levels)', description: softwareDescription },
  { id: 'forward-deployed-engineer', title: 'Forward Deployed Engineer', description: forwardDeployedDescription },
  { id: 'ai-engineer', title: 'AI Engineer', description: aiDescription },
];

export const HIRING_EMAIL = 'hiring@balerion.ai';
export const HIRING_CC = ['bahador@balerion.ai', 'naren@balerion.ai'];

export const applicationLink = (title: string, body?: string) => {
  const params = [
    'cc=' + HIRING_CC.map(encodeURIComponent).join(','),
    'subject=' + encodeURIComponent(`${title} — Balerion application`),
  ];
  if (body) params.push('body=' + encodeURIComponent(body));
  return `mailto:${HIRING_EMAIL}?` + params.join('&');
};
