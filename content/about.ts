export type AboutContent = {
  name: string;
  tagline: string;
  bio: string[];
  skills: {
    category: string;
    items: string[];
  }[];
  philosophy: {
    title: string;
    principles: string[];
  };
  avatar?: string;
};

export const aboutContent: AboutContent = {
  name: 'PAID',
  tagline: 'Architect of Adaptive Experiences',
  bio: [
    'I design systems that think, feel, and respond—interfaces that adapt to the people who use them, not the other way around.',
    'My work exists at the intersection of human-centered design, artificial intelligence, and ethical governance. I believe technology should be a trusted partner, not a black box.',
    'From multi-agent customer care systems to holographic urban navigation, I craft experiences that are as intelligent as they are empathetic.',
    'I\'ve spent the last decade building adaptive frameworks for global brands, civic organizations, and advocacy groups—always with a focus on transparency, consent, and user empowerment.',
  ],
  skills: [
    {
      category: 'Design & Research',
      items: [
        'UX Architecture',
        'Service Design',
        'Design Systems',
        'User Research',
        'Prototyping',
        'Accessibility (WCAG 2.2 AA)',
      ],
    },
    {
      category: 'Technology',
      items: [
        'React/Next.js',
        'Three.js/WebGL',
        'TypeScript',
        'AI/ML Systems',
        'Real-time Data',
        'Spatial UI',
      ],
    },
    {
      category: 'Strategy',
      items: [
        'Ethical AI',
        'Privacy Frameworks',
        'Consent Design',
        'Multi-agent Systems',
        'Data Governance',
        'Product Strategy',
      ],
    },
  ],
  philosophy: {
    title: 'Principles of Adaptive Design',
    principles: [
      'Transparency over opacity — Users should always know what's happening and why.',
      'Consent over coercion — Data collection must be voluntary, granular, and reversible.',
      'Empowerment over automation — Technology should augment human agency, not replace it.',
      'Empathy over efficiency — The best systems understand context, emotion, and cultural nuance.',
      'Openness over exclusivity — Ethical frameworks and tools should be shared, not hoarded.',
    ],
  },
};
