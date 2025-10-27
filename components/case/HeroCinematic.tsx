/**
 * HeroCinematic Component
 * Award-grade hero section with parallax and micro-interactions
 * 10-second hook with visual hierarchy
 * WCAG 2.2 AA compliant with reduced motion support
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface HeroCinematicProps {
  title: string;
  tagline: string;
  role: string;
  dateRange: string;
  coverImage?: string;
  coverVideo?: string;
  tags: string[];
  featured?: boolean;
  readingTime?: number;
}

export function HeroCinematic({
  title,
  tagline,
  role,
  dateRange,
  coverImage,
  coverVideo,
  tags,
  featured = false,
  readingTime,
}: HeroCinematicProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, -rect.top / rect.height);
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const parallaxTransform = prefersReducedMotion
    ? 'translateY(0)'
    : `translateY(${scrollY * 50}px)`;

  const fadeOpacity = prefersReducedMotion ? 1 : Math.max(0, 1 - scrollY * 1.5);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-deepVoid"
      aria-label="Project hero section"
    >
      {/* Background Media */}
      {(coverImage || coverVideo) && (
        <div
          className="absolute inset-0 z-0"
          style={{ transform: parallaxTransform }}
        >
          {coverVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              aria-hidden="true"
            >
              <source src={coverVideo} type="video/mp4" />
            </video>
          ) : coverImage ? (
            <Image
              src={coverImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : null}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-deepVoid/30 via-deepVoid/60 to-deepVoid" />
          <div className="absolute inset-0 bg-gradient-to-r from-deepVoid/50 via-transparent to-deepVoid/50" />
        </div>
      )}

      {/* Content */}
      <div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32"
        style={{ opacity: fadeOpacity }}
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Metadata */}
          <div
            className={`
              mb-8 flex flex-wrap items-center justify-center gap-4 text-sm
              transition-all duration-1000
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            <span className="font-display uppercase tracking-wider text-neonCyan/70">
              {role}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
            <time className="text-slate-400">{dateRange}</time>
            {featured && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
                <span className="rounded-full bg-neonCyan/20 px-3 py-1 text-xs uppercase tracking-wider text-neonCyan">
                  Featured
                </span>
              </>
            )}
            {readingTime && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
                <span className="text-slate-400">{readingTime} min read</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1
            className={`
              font-display text-5xl font-bold uppercase leading-tight tracking-wider
              text-neonCyan transition-all duration-1000 delay-100
              md:text-7xl lg:text-8xl
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            `}
          >
            {title}
          </h1>

          {/* Tagline */}
          <p
            className={`
              mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-200
              transition-all duration-1000 delay-200
              md:text-2xl
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            `}
          >
            {tagline}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div
              className={`
                mt-10 flex flex-wrap items-center justify-center gap-3
                transition-all duration-1000 delay-300
                ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
              `}
              role="list"
              aria-label="Project technologies"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  role="listitem"
                  className="
                    rounded-full border border-irisMagenta/30 bg-deepVoid/50 px-4 py-2
                    text-sm backdrop-blur-sm transition-all
                    hover:border-irisMagenta hover:bg-irisMagenta/10
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Scroll indicator */}
          <div
            className={`
              mt-20 transition-all duration-1000 delay-500
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            `}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-500">
                Scroll to explore
              </span>
              <div
                className="h-12 w-6 rounded-full border-2 border-slate-600"
                aria-hidden="true"
              >
                <div
                  className={`
                    mx-auto mt-2 h-2 w-2 rounded-full bg-neonCyan
                    ${prefersReducedMotion ? '' : 'animate-bounce'}
                  `}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deepVoid to-transparent" />
    </section>
  );
}

/**
 * HeroMinimal Component
 * Simplified hero for content-first presentations
 */

interface HeroMinimalProps {
  title: string;
  description: string;
  metadata?: {
    label: string;
    value: string;
  }[];
}

export function HeroMinimal({ title, description, metadata }: HeroMinimalProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <header className="border-b border-neonCyan/20 pb-16 pt-32">
      {/* Metadata */}
      {metadata && metadata.length > 0 && (
        <div
          className={`
            mb-8 flex flex-wrap items-center gap-4 text-sm
            transition-all duration-700
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          {metadata.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              {index > 0 && (
                <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
              )}
              <span className="font-display uppercase tracking-wider text-neonCyan/70">
                {item.label}
              </span>
              <span className="text-slate-400">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Title */}
      <h1
        className={`
          font-display text-4xl uppercase tracking-wider text-neonCyan
          transition-all duration-700 delay-100
          md:text-5xl lg:text-6xl
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}
      >
        {title}
      </h1>

      {/* Description */}
      <p
        className={`
          mt-6 max-w-3xl text-xl leading-relaxed text-slate-300
          transition-all duration-700 delay-200
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}
      >
        {description}
      </p>
    </header>
  );
}
