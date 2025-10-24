// File: components/seo/StructuredData.tsx
import type { Project } from '@/lib/content/schemas';

// Helper to safely serialize and inject JSON-LD
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// JSON-LD for the Person (you)
export function PersonStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '[Your Name]', // Replace with your name
    url: process.env.NEXT_PUBLIC_SITE_URL,
    sameAs: [
      'https://github.com/your_github', // Replace
      'https://linkedin.com/in/your_linkedin', // Replace
    ],
    jobTitle: 'Futurist Web Architect',
  };
  return <JsonLd data={data} />;
}

// JSON-LD for a specific project
export function ProjectStructuredData({ project }: { project: Project }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    author: {
      '@type': 'Person',
      name: '[Your Name]', // Replace with your name
    },
    dateCreated: project.dates.start,
    datePublished: project.dates.start,
  };
  return <JsonLd data={data} />;
}
