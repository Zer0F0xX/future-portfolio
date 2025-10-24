export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  industry: string;
  year: number;
  problem: string;
  approach: string;
  outcome: string;
  media?: string[]; // URLs to images/videos
  tags: string[];
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: 'sentient-support-mesh',
    title: 'Sentient Support Mesh',
    summary: 'Architected an agentic system for autonomous customer care across 18 languages with transparent interventions.',
    industry: 'E-commerce & Service',
    year: 2047,
    problem: 'A global e-commerce client faced rising customer support costs and inconsistent service quality across different regions and languages. Human agents were overwhelmed, and resolution times were slow.',
    approach: 'I led the architecture of a multi-agent AI system. We used a "human-in-the-loop" design, where AI handled 80% of inquiries autonomously but could seamlessly escalate to human experts for complex emotional or ethical issues. The system was designed with explainable AI (XAI) principles, so users could understand why a decision was made.',
    outcome: 'Achieved a 24-point lift in Customer Satisfaction (CSAT), reduced human agent escalations by 63%, and was adopted by four global brands within the first year. The system provided a consistent, high-quality experience 24/7.',
    tags: ['Service Design', 'AI Governance', 'E-commerce', 'Multi-agent Systems'],
    links: [{ label: 'View Case Study', href: '#' }],
  },
  {
    slug: 'neon-atlas',
    title: 'Neon Atlas',
    summary: 'Reimagined city navigation as a living holographic layer for a major automotive consortium.',
    industry: 'Automotive & Civic Tech',
    year: 2049,
    problem: 'Modern in-car navigation systems were cluttered and disconnected from the living city. Drivers were missing real-time civic alerts, cultural events, and dynamic environmental data, leading to inefficient and unenjoyable journeys.',
    approach: 'As the lead architect, I designed a spatial OS that projected a holographic layer of data onto the driver\'s field of view. We integrated real-time data streams from municipal services, event APIs, and environmental sensors. The UI was designed to be ambient and non-intrusive, using light, color, and sound to convey information without distracting the driver.',
    outcome: 'User engagement with civic and cultural data increased by 182%. The system maintained a strict 12ms latency budget and was successfully deployed in four international megacities, becoming the new standard for premium EV navigation.',
    tags: ['Automotive', 'Spatial UI', 'Civic Tech', 'Real-time Data'],
    links: [{ label: 'Live Demo', href: '#' }],
  },
  {
    slug: 'signal-stewardship',
    title: 'Signal Stewardship',
    summary: 'Designed a consent and telemetry framework for a leading advocacy group to protect user privacy in adaptive experiences.',
    industry: 'Advocacy & Non-profit',
    year: 2048,
    problem: 'A non-profit organization that builds mental health applications was struggling with user trust. Users were hesitant to share the personal data needed to power the adaptive features, fearing misuse or lack of control.',
    approach: 'I developed a framework called "Signal Stewardship." It was built on the principles of progressive consent and data transparency. We created UI patterns that clearly explained what data was being collected and why, and gave users granular control to opt-out of specific telemetry at any time via a "transparency dashboard." The design was calming, clear, and empowering.',
    outcome: 'The new framework led to a 40% increase in user opt-in for adaptive features and became a new ethical standard cited in industry publications. It proved that a user-centric approach to privacy could build trust and improve the efficacy of data-driven applications.',
    tags: ['Advocacy', 'Ethical AI', 'UX Design', 'Privacy'],
    links: [{ label: 'Read the Framework', href: '#' }],
  },
];

export const getProjectBySlug = (slug: string) => {
  return projects.find((p) => p.slug === slug);
};
