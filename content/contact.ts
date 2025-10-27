export type ContactLink = {
  label: string;
  href: string;
  icon?: string;
  description?: string;
};

export type ContactContent = {
  headline: string;
  description: string;
  cta: string;
  links: ContactLink[];
  availability?: string;
  preferredMethod?: string;
};

export const contactContent: ContactContent = {
  headline: 'Let's Build Something Adaptive',
  description:
    'I'm currently available for select consulting engagements, strategic partnerships, and speaking opportunities. If you're working on adaptive experiences, ethical AI, or human-centered systems, I'd love to hear from you.',
  cta: 'Reach out via your preferred channel:',
  links: [
    {
      label: 'Email',
      href: 'mailto:hello@paid.ca',
      icon: '✉️',
      description: 'Best for project inquiries and consulting',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/paid',
      icon: '💼',
      description: 'Professional network and industry updates',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/paid',
      icon: '🐙',
      description: 'Open-source frameworks and experiments',
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/paid',
      icon: '🐦',
      description: 'Thoughts on design, AI ethics, and the future',
    },
  ],
  availability: 'Currently accepting projects for Q2 2050',
  preferredMethod: 'Email for detailed inquiries, LinkedIn for quick connects.',
};
