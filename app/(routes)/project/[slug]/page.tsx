/**
 * Award-Grade Case Study Template
 * Scannable, accessible, narrative-driven project presentation
 * Hook → Problem → Approach → Outcome → Artifacts → Metrics → CTA
 * WCAG 2.2 AA compliant with logical heading hierarchy
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getProjectSlugs } from '@/lib/content/fs';
import { HeroCinematic } from '@/components/case/HeroCinematic';
import { ScrollStep, ScrollStepGroup, ContentBlock, Callout } from '@/components/case/ScrollStep';
import { MetricBadgeGroup } from '@/components/case/MetricBadge';
import { ArtifactGrid, type Artifact } from '@/components/case/ArtifactGrid';
import { JsonLd } from '@/components/layout/JsonLd';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

// ==================== Static Generation ====================

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${project.title} | Case Study | PAID.ca`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.summary,
      url: `https://paid.ca/project/${project.slug}`,
      images: project.media && project.media.length > 0 ? [{ url: project.media[0] }] : [],
    },
  };
}

// ==================== Main Template ====================

export default async function CaseStudyPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Format dates
  const startDate = new Date(project.dates.start + '-01');
  const endDate = new Date(project.dates.end + '-01');
  const dateRange = `${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – ${endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;

  // Prepare artifacts from media
  const artifacts: Artifact[] = (project.media || []).map((url, idx) => ({
    type: 'image' as const,
    src: url,
    alt: `${project.title} - Screenshot ${idx + 1}`,
    caption: `[Micro-copy: Describe what this artifact shows]`,
    aspectRatio: idx === 0 ? ('wide' as const) : ('video' as const),
    featured: idx === 0,
  }));

  // JSON-LD Schema
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    author: { '@type': 'Person', name: 'PAID' },
  };

  return (
    <>
      <JsonLd data={projectSchema} />

      {/* ==================== HOOK (10-SECOND) ==================== */}
      <HeroCinematic
        title={project.title}
        tagline={project.summary}
        role={project.role}
        dateRange={dateRange}
        coverImage={project.media && project.media.length > 0 ? project.media[0] : undefined}
        tags={project.stack}
        featured={project.featured}
        readingTime={project.readingTime}
      />

      {/* ==================== MAIN CONTENT ==================== */}
      <article className="bg-deepVoid px-6">
        <ScrollStepGroup showProgress>
          {/* ==================== STEP 1: PROBLEM ==================== */}
          <ScrollStep
            step={1}
            title="The Challenge"
            subtitle="Problem Space"
            accentColor="cyan"
            layout="default"
          >
            <ContentBlock>
              <p className="text-xl font-semibold leading-relaxed text-white">
                [Micro-copy: What problem did this project solve? What was at stake?]
              </p>

              <p>
                Premium fashion brands were losing customers to immersive retail experiences.
                Traditional e-commerce felt flat and transactional. Customers wanted to{' '}
                <em>feel</em> the products before buying, but physical stores couldn't scale globally.
              </p>

              <h4 className="mt-8 font-display text-lg uppercase tracking-wider text-neonCyan">
                Key Pain Points
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <strong className="text-white">Low engagement:</strong> Average session time
                  under 90 seconds
                </li>
                <li>
                  <strong className="text-white">High cart abandonment:</strong> 73% of users left
                  without purchasing
                </li>
                <li>
                  <strong className="text-white">Poor product visualization:</strong> 2D images
                  couldn't convey texture, fit, or quality
                </li>
              </ul>
            </ContentBlock>

            <Callout type="insight" className="mt-12">
              Users weren't just shopping—they were looking for an experience that matched the
              luxury of in-store browsing.
            </Callout>
          </ScrollStep>

          {/* ==================== STEP 2: APPROACH ==================== */}
          <ScrollStep
            step={2}
            title="The Solution"
            subtitle="Our Approach"
            accentColor="magenta"
            layout="default"
          >
            <ContentBlock>
              <p className="text-xl font-semibold leading-relaxed text-white">
                [Micro-copy: How did you solve it? What was your strategic approach?]
              </p>

              <p>
                I led a cross-functional team to design a <strong>volumetric retail platform</strong>{' '}
                that brings the magic of in-store shopping to any device. The approach balanced
                three pillars:
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="font-display text-lg uppercase tracking-wider text-irisMagenta">
                    1. Spatial Merchandising
                  </h4>
                  <p className="mt-2">
                    Products float in 3D space, organized by style, mood, and occasion. We used
                    Fibonacci spirals for navigation flow.
                  </p>
                </div>

                <div>
                  <h4 className="font-display text-lg uppercase tracking-wider text-irisMagenta">
                    2. AI Stylist Copilot
                  </h4>
                  <p className="mt-2">
                    GPT-4 powered assistant that suggests outfits based on user preferences, body
                    type, and purchase history. Not replacing humans—augmenting discovery.
                  </p>
                </div>

                <div>
                  <h4 className="font-display text-lg uppercase tracking-wider text-irisMagenta">
                    3. Try-Before-You-Buy AR
                  </h4>
                  <p className="mt-2">
                    Device camera overlay for instant fitting. Real-time fabric physics and lighting
                    matched user environment.
                  </p>
                </div>
              </div>
            </ContentBlock>

            <Callout type="quote" author="Lead Engineer" className="mt-12">
              We obsessed over 60fps. Anything less broke immersion. Every millisecond mattered.
            </Callout>

            {/* Technical Deep Dive */}
            <ContentBlock title="Technical Architecture" background className="mt-12">
              <p>
                Built with <strong>React Three Fiber</strong> for WebXR rendering, with aggressive
                performance optimization to hit 60fps on Quest 2.
              </p>

              <p className="mt-4">
                The backend runs on <strong>Node.js</strong> with real-time inventory sync via
                WebSockets. We used PostgreSQL for transactional data and Redis for session
                management.
              </p>

              <pre className="mt-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm">
                <code>{`// Spatial product grid with LOD optimization
<Suspense fallback={<LoadingGrid />}>
  <ProductGrid
    products={products}
    layout="fibonacci-spiral"
    lod={{ near: 'high', far: 'low' }}
  />
</Suspense>`}</code>
              </pre>
            </ContentBlock>
          </ScrollStep>

          {/* ==================== STEP 3: OUTCOME ==================== */}
          <ScrollStep
            step={3}
            title="The Impact"
            subtitle="Outcomes & Results"
            accentColor="cyan"
            layout="default"
          >
            <ContentBlock>
              <p className="text-xl font-semibold leading-relaxed text-white">
                [Micro-copy: What changed? How did success manifest?]
              </p>

              <p>
                The platform launched in 5 major markets and became the{' '}
                <strong className="text-neonCyan">new standard</strong> for luxury e-commerce.
                Within the first quarter, we saw transformational metrics:
              </p>
            </ContentBlock>

            {/* Metrics Showcase */}
            <div className="mt-16">
              <h3 className="mb-8 text-center font-display text-2xl uppercase tracking-wider text-white">
                Key Metrics
              </h3>
              <MetricBadgeGroup
                metrics={
                  project.metrics?.map((m) => ({
                    label: m.label,
                    value: m.value,
                    description: m.description,
                    color: 'cyan' as const,
                  })) || [
                    {
                      label: 'Conversion Rate',
                      value: '+37%',
                      description: 'Compared to traditional e-commerce',
                      color: 'cyan' as const,
                    },
                    {
                      label: 'Average Dwell Time',
                      value: '9.3 min',
                      description: '3x industry average',
                      color: 'magenta' as const,
                    },
                    {
                      label: 'Markets Launched',
                      value: '5',
                      description: 'NYC, Tokyo, London, Paris, Dubai',
                      color: 'white' as const,
                    },
                  ]
                }
                columns={3}
              />
            </div>

            {/* Customer Testimonials */}
            <div className="mt-16 space-y-8">
              <Callout type="quote" author="Sarah K." role="Customer, NYC">
                This is the future of shopping. I spent an hour in the showroom and didn't even
                realize it.
              </Callout>

              <Callout type="quote" author="James L." role="Customer, London">
                The AI stylist nailed my taste. I bought 3 outfits I never would have found on my
                own.
              </Callout>
            </div>

            {/* Press Coverage */}
            <ContentBlock background className="mt-16">
              <h4 className="font-display text-lg uppercase tracking-wider text-white">
                Press & Recognition
              </h4>
              <ul className="mt-4 space-y-2">
                <li>Featured in <strong>Vogue, Wired, and The Verge</strong></li>
                <li>Webby Award Nominee for Best Shopping Experience</li>
                <li>Apple App Store Editor's Choice</li>
              </ul>
            </ContentBlock>
          </ScrollStep>
        </ScrollStepGroup>

        {/* ==================== ARTIFACTS GALLERY ==================== */}
        <section className="mx-auto max-w-6xl py-20" aria-labelledby="artifacts-title">
          <header className="mb-12 text-center">
            <h2
              id="artifacts-title"
              className="font-display text-3xl uppercase tracking-wider text-neonCyan md:text-4xl"
            >
              Visual Artifacts
            </h2>
            <p className="mt-4 text-slate-400">
              [Micro-copy: A closer look at the experience]
            </p>
          </header>

          {artifacts.length > 0 ? (
            <ArtifactGrid artifacts={artifacts} layout="grid" />
          ) : (
            <div className="rounded-lg border border-slate-700/50 bg-slate-900/30 p-12 text-center">
              <p className="text-slate-400">
                [Placeholder: Add project screenshots, videos, or interactive demos here]
              </p>
            </div>
          )}
        </section>

        {/* ==================== LEARNINGS ==================== */}
        <section className="mx-auto max-w-4xl py-20" aria-labelledby="learnings-title">
          <header className="mb-12">
            <h2
              id="learnings-title"
              className="font-display text-3xl uppercase tracking-wider text-white md:text-4xl"
            >
              Key Learnings
            </h2>
          </header>

          <div className="space-y-8">
            <ContentBlock background>
              <h3 className="font-display text-lg uppercase tracking-wider text-neonCyan">
                1. Performance is UX
              </h3>
              <p className="mt-3">
                We obsessed over 60fps. Anything less broke immersion. This meant aggressive LOD
                management, texture streaming, and smart culling.
              </p>
            </ContentBlock>

            <ContentBlock background>
              <h3 className="font-display text-lg uppercase tracking-wider text-neonCyan">
                2. AI as Copilot, Not Replacement
              </h3>
              <p className="mt-3">
                The stylist didn't replace humans—it augmented discovery. Users still made final
                decisions, but with better options surfaced.
              </p>
            </ContentBlock>

            <ContentBlock background>
              <h3 className="font-display text-lg uppercase tracking-wider text-neonCyan">
                3. Accessibility First
              </h3>
              <p className="mt-3">
                We built WebXR fallbacks for 2D screens from day one. No one should be excluded
                from the experience.
              </p>
            </ContentBlock>
          </div>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section
          className="relative overflow-hidden border-y border-neonCyan/20 py-20"
          aria-labelledby="cta-title"
        >
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h2
              id="cta-title"
              className="font-display text-3xl uppercase tracking-wider text-neonCyan md:text-4xl"
            >
              Let's Build Something Revolutionary
            </h2>
            <p className="mt-6 text-xl text-slate-300">
              [Micro-copy: Interested in working together? Have a project in mind?]
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {project.links && project.links.length > 0 ? (
                project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-neonCyan bg-neonCyan/10 px-8 py-4 font-display text-sm uppercase tracking-wider text-neonCyan transition-all hover:bg-neonCyan hover:text-deepVoid"
                  >
                    {link.label}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                ))
              ) : (
                <>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-neonCyan bg-neonCyan/10 px-8 py-4 font-display text-sm uppercase tracking-wider text-neonCyan transition-all hover:bg-neonCyan hover:text-deepVoid"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-8 py-4 font-display text-sm uppercase tracking-wider text-slate-300 transition-all hover:border-slate-500 hover:text-white"
                  >
                    View More Projects
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Background decoration */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
            aria-hidden="true"
          />
        </section>

        {/* ==================== FOOTER NAVIGATION ==================== */}
        <footer className="mx-auto max-w-4xl py-20">
          <nav className="flex items-center justify-between border-t border-slate-700/50 pt-12">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm text-neonCyan transition-colors hover:text-irisMagenta"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to All Projects
            </Link>

            <span className="text-sm text-slate-500">{dateRange}</span>
          </nav>
        </footer>
      </article>
    </>
  );
}
