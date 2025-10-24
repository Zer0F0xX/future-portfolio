export type BaseSection = {
  title: string;
  subtitle: string;
  description: string;
  metrics?: string[];
  tags?: string[];
};

export type OrbSection =
  | (BaseSection & { bullets: string[]; link?: string })
  | (BaseSection & { link: string; bullets?: string[] });

export type OrbWorld = {
  id: string;
  title: string;
  accent: string;
  headline: string;
  body: string;
  highlights?: string[];
  voice?: string;
  sections?: OrbSection[];
};

export const bootSequence = [
  'Booting Anna Tennyson archival core …',
  'Compiling immersive interface dossiers …',
  'Synchronizing future prototypes …'
];

export const orbWorlds = [
  {
    id: 'casework',
    title: 'Case Work',
    accent: '#5AF4FF',
    headline: 'I build futures disguised as interfaces.',
    body: 'Selected engagements bending reality into responsive systems—civic platforms, spatial commerce, mixed reality storytelling.',
    highlights: ['Civic OS — adaptive policy rooms', 'HoloCommerce — volumetric retail', 'Neon Atlas — living city navigation'],
    voice: 'These projects prove imagination can be operational.',
    sections: [
      {
        title: 'Neon Atlas',
        subtitle: 'Spatial civic OS · 2049',
        description: 'Reimagined city navigation as a living holographic layer. Multi-tenant architecture served citizens, tourists, and planners in realtime.',
        metrics: ['+182% engagement lift', '12ms latency budget', 'Live in 4 megacities'],
        tags: ['Civic Tech', 'Spatial UI', 'Narrative'],
        link: '#'
      },
      {
        title: 'HoloCommerce',
        subtitle: 'Volumetric retail playbook · 2048',
        description: 'Designed an experiential retail stack—spatial merchandising, adaptive pricing, AI stylists.',
        metrics: ['Conversion +37%', 'Avg dwell 9.3 min', '5 markets'],
        tags: ['Commerce', 'XR', 'AI Copilot'],
        link: '#'
      },
      {
        title: 'Sentient Support Mesh',
        subtitle: 'AI-first service platform · 2047',
        description: 'Architected an agentic system for autonomous customer care across 18 languages with transparent interventions.',
        metrics: ['CSAT +24pts', 'Escalations -63%', 'Trusted by 4 global brands'],
        tags: ['Service Design', 'AI Governance'],
        link: '#'
      }
    ]
  },
  {
    id: 'method',
    title: 'Method',
    accent: '#FF57F6',
    headline: 'Process: Sensory · Systemic · Ship-ready.',
    body: 'From speculative research to production-grade frameworks. I choreograph teams across strategy, design, and engineering.',
    highlights: ['Temporal mapping workshops', 'AI copilots for design ops', 'Delivery rituals tuned for 60fps products'],
    voice: 'My craft is orchestrating teams that move at cinematic speed.',
    sections: [
      {
        title: 'Discovery Rituals',
        subtitle: 'Temporal mapping · XS to XL teams',
        description: 'I host time-travel workshops that align vision, constraints, and emergent signals—turning ambiguity into directional clarity.',
        bullets: ['Signal mapping canvases', 'Persona futurescapes', 'Stakeholder gameplay']
      },
      {
        title: 'Build Systems',
        subtitle: 'Production choreography',
        description: 'Integrated design-engineering pipelines with automated QA, visual regression, and biofeedback loops for experiential QA.',
        bullets: ['Shared design tokens', 'AI design ops agents', 'Shadow deployments']
      },
      {
        title: 'Launch & Sustain',
        subtitle: 'Live operations',
        description: 'Post-launch rituals: telemetry dashboards, ethical guidelines, iteration cadences. Ship speed with accountability.',
        bullets: ['Ritual playbook', 'AI governance reviews', 'Experience performance ops']
      }
    ]
  },
  {
    id: 'lab',
    title: 'Lab',
    accent: '#8C6DFF',
    headline: 'Experiments: living agents & emergent rituals.',
    body: 'Prototype playground—multi-agent dramaturgy, vocal interfaces, tangible light. These are the seeds of tomorrow’s products.',
    highlights: ['Synesthetic render engine', 'Persona twin prototypes', 'Breathing grid studies'],
    voice: 'In the lab I prototype futures before they know their names.',
    sections: [
      {
        title: 'Light Orchestra',
        subtitle: 'Synesthetic engine',
        description: 'Dynamics system mapping audio, biometric, and gesture input to volumetric light shows. Applied to immersive theatre and wellness.',
        tags: ['Volumetric', 'Audio-reactive'],
        link: '#'
      },
      {
        title: 'Persona Twins',
        subtitle: 'Narrative AI prototypes',
        description: 'Hybrid AI/human storytelling companions that rehearse future scenarios with clients.',
        tags: ['AI Agents', 'Story Craft'],
        link: '#'
      },
      {
        title: 'Breathing Grid Studies',
        subtitle: 'Embodied UI research',
        description: 'Generative shaders that respond to heart rate, voice, and presence—building empathy into ambient interfaces.',
        tags: ['Shader R&D', 'Bioresponsive'],
        link: '#'
      }
    ]
  },
  {
    id: 'protocols',
    title: 'Protocols',
    accent: '#7FFCEA',
    headline: 'Governance, ethics, and responsible AI.',
    body: 'Frameworks to keep humans in the loop: consent layers, telemetry guardrails, explainable decisioning.',
    highlights: ['Signal stewardship playbook', 'AI ritual guidelines', 'Resilience drills'],
    voice: 'Protocols keep the orbit stable; trust coded in light.',
    sections: [
      {
        title: 'Signal Stewardship',
        subtitle: 'Consent + telemetry framework',
        description: 'Design guidelines ensuring user agency in adaptive experiences: clear consent layers, revocation rituals, transparency dashboards.',
        bullets: ['Progressive consent design', 'Telemetry heatmaps', 'Ethics reviews']
      },
      {
        title: 'AI Rituals',
        subtitle: 'Operational guardrails',
        description: 'Playbooks for co-creation with AI: bias checks, rehearsal loops, escalation protocols.',
        bullets: ['Bias lab cadence', 'Copilot personas', 'Escalation matrix']
      },
      {
        title: 'Resilience Drills',
        subtitle: 'Chaos engineering for experiences',
        description: 'Stress tests for immersive systems—simulated outages, cognitive load tests, trust recovery flows.',
        bullets: ['Scenario simulation', 'Load/perf dashboards', 'Trust scorecards']
      }
    ]
  },
  {
    id: 'broadcast',
    title: 'Broadcast',
    accent: '#F7C274',
    headline: 'Writing, speaking, community building.',
    body: 'Talks, essays, residencies. Translating complex systems into narratives that invite collaboration.',
    highlights: ['Futurity keynote tour', 'Holographic essay series', 'Residency: Orbital Studio 2048'],
    voice: 'Stories make the work legible—this is how I share the signal.',
    sections: [
      {
        title: 'Futurity Keynote',
        subtitle: 'Global tour',
        description: 'A cinematic talk on crafting empathetic AI and volumetric experiences. Delivered across design summits and innovation labs.',
        link: '#'
      },
      {
        title: 'Holographic Essays',
        subtitle: 'Living publications',
        description: 'Interactive essays that readers explore in 3D space. Essays include “Sensory Governance” and “Interfaces as Rituals.”',
        link: '#'
      },
      {
        title: 'Orbital Studio Residency',
        subtitle: '2048 collaboration',
        description: 'Led a residency blending artists, engineers, and policy shapers to prototype civic rituals for orbital communities.',
        link: '#'
      }
    ]
  },
  {
    id: 'paid',
    title: 'PAID Toolkit',
    accent: '#5CFFC0',
    headline: 'Deploy your own dimensional archive.',
    body: 'Open-source engine that turns digital exhaust into holographic portfolios. Train it on your patterns; let it project your myth.',
    highlights: ['CLI + hosted templates', 'Persona synthesis model', 'Realtime narrative scorer'],
    voice: 'You’ve seen my archive—now deploy yours.',
    sections: [
      {
        title: 'Generator CLI',
        subtitle: 'From datasets to holograms',
        description: 'Parse social, code, and narrative data into live portfolio shards. Includes scrapers, parsers, content graph.',
        link: '#'
      },
      {
        title: 'Persona Synthesizer',
        subtitle: 'Vectorized narrative engine',
        description: 'Transforms trace data into cohesive bios and storytelling arcs with guardrails.',
        link: '#'
      },
      {
        title: 'Live Templates',
        subtitle: 'Hosted immersive UI',
        description: 'Drop-in Next.js + R3F templates to deploy your own dimensional archive in minutes.',
        link: '#'
      }
    ]
  }
] satisfies OrbWorld[];

export const timelinePhases = [
  {
    id: 'origins',
    label: 'Origins',
    range: '2038 – 2046',
    description: 'Learning to translate complex systems into felt experiences. Foundations, rewrites, first prototypes.'
  },
  {
    id: 'pulse',
    label: 'Pulse',
    range: '2047 – 2049',
    description: 'Operating live platforms at planetary scale. Sensing users, weaving stories, iterating in motion.'
  },
  {
    id: 'vectors',
    label: 'Vectors',
    range: '2050+',
    description: 'Speculative prototypes seeding tomorrow’s rituals. Collaborations in orbit, ocean, and beyond.'
  }
] as const;

export const legacyPanels = [
  {
    title: 'Case Timelines',
    subtitle: 'Ship logs & metrics',
    copy: 'Impact tapes from civic platforms, commerce worlds, and experiential products. Each line item includes KPIs and team formations.'
  },
  {
    title: 'Experiment Logs',
    subtitle: 'Research artifacts',
    copy: 'Documentation of prototypes, AI rituals, system sketches. Every artifact is a signal etched into memory.'
  },
  {
    title: 'Signal Board',
    subtitle: 'Talks & essays',
    copy: 'Keynotes, essays, broadcasts. Translating systemic futures into accessible narratives for collaborators and juries.'
  }
];

export const contactCopy = {
  heading: 'Your turn to deploy.',
  body: 'Ready to architect the next interface anomaly? I partner with studios, founders, and cultural labs that want cinematic, human futures.',
  cta: [
    { label: 'Email', href: 'mailto:hello@paid.ca' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/annatennyson', external: true },
    { label: 'GitHub', href: 'https://github.com/foxctrl', external: true }
  ]
};
