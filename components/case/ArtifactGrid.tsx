/**
 * ArtifactGrid Component
 * Responsive masonry-style grid for project artifacts
 * Supports images, videos, and interactive embeds
 * WCAG 2.2 AA compliant with keyboard navigation
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export type ArtifactType = 'image' | 'video' | 'embed';

export interface Artifact {
  type: ArtifactType;
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
  featured?: boolean;
}

interface ArtifactGridProps {
  artifacts: Artifact[];
  layout?: 'masonry' | 'grid';
  className?: string;
}

/**
 * ArtifactItem Component
 * Individual artifact with hover effects and modal support
 */
function ArtifactItem({
  artifact,
  index,
  onExpand,
}: {
  artifact: Artifact;
  index: number;
  onExpand: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 50);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
  };

  const aspectRatio = artifact.aspectRatio || 'video';

  return (
    <div
      ref={ref}
      className={`
        group relative overflow-hidden rounded-lg border border-slate-700/50
        transition-all duration-700
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        ${artifact.featured ? 'md:col-span-2' : ''}
        hover:border-neonCyan/50 hover:shadow-xl hover:shadow-neonCyan/10
      `}
    >
      <div className={aspectClasses[aspectRatio]}>
        {artifact.type === 'image' && (
          <>
            <Image
              src={artifact.src}
              alt={artifact.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={artifact.featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-deepVoid/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        )}

        {artifact.type === 'video' && (
          <video
            src={artifact.src}
            loop
            muted
            playsInline
            autoPlay
            className="h-full w-full object-cover"
            aria-label={artifact.alt}
          />
        )}

        {artifact.type === 'embed' && (
          <iframe
            src={artifact.src}
            title={artifact.alt}
            className="h-full w-full"
            loading="lazy"
          />
        )}
      </div>

      {/* Caption overlay */}
      {artifact.caption && (
        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-deepVoid to-deepVoid/95 p-4 transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-sm leading-relaxed text-slate-200">
            {artifact.caption}
          </p>
        </div>
      )}

      {/* Expand button */}
      <button
        onClick={onExpand}
        className="
          absolute right-3 top-3 rounded-full bg-deepVoid/90 p-2
          opacity-0 transition-all duration-300
          hover:bg-neonCyan hover:text-deepVoid
          group-hover:opacity-100
          focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-neonCyan focus:ring-offset-2 focus:ring-offset-deepVoid
        "
        aria-label={`Expand ${artifact.alt}`}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </button>
    </div>
  );
}

/**
 * LightboxModal Component
 * Full-screen artifact viewer
 */
function LightboxModal({
  artifact,
  onClose,
}: {
  artifact: Artifact | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (artifact) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [artifact, onClose]);

  if (!artifact) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-deepVoid/95 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Artifact lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-3 text-white transition-colors hover:bg-neonCyan hover:text-deepVoid focus:outline-none focus:ring-2 focus:ring-neonCyan"
        aria-label="Close lightbox"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div
        className="relative max-h-[90vh] max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {artifact.type === 'image' && (
          <div className="relative">
            <Image
              src={artifact.src}
              alt={artifact.alt}
              width={1200}
              height={800}
              className="h-auto max-h-[80vh] w-auto rounded-lg"
              priority
            />
          </div>
        )}

        {artifact.type === 'video' && (
          <video
            src={artifact.src}
            controls
            autoPlay
            className="max-h-[80vh] rounded-lg"
            aria-label={artifact.alt}
          />
        )}

        {/* Caption */}
        {artifact.caption && (
          <p className="mt-4 text-center text-slate-300">
            {artifact.caption}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Main ArtifactGrid Component
 */
export function ArtifactGrid({
  artifacts,
  layout = 'grid',
  className = '',
}: ArtifactGridProps) {
  const [expandedArtifact, setExpandedArtifact] = useState<Artifact | null>(null);

  const layoutClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    masonry: 'columns-1 md:columns-2 gap-6 space-y-6',
  };

  return (
    <>
      <div
        className={`${layoutClasses[layout]} ${className}`}
        role="list"
        aria-label="Project artifacts"
      >
        {artifacts.map((artifact, index) => (
          <div key={index} role="listitem">
            <ArtifactItem
              artifact={artifact}
              index={index}
              onExpand={() => setExpandedArtifact(artifact)}
            />
          </div>
        ))}
      </div>

      <LightboxModal
        artifact={expandedArtifact}
        onClose={() => setExpandedArtifact(null)}
      />
    </>
  );
}

/**
 * SingleArtifact Component
 * Standalone artifact display with optional border
 */
export function SingleArtifact({
  artifact,
  className = '',
  noBorder = false,
}: {
  artifact: Artifact;
  className?: string;
  noBorder?: boolean;
}) {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-lg
        ${noBorder ? '' : 'border border-slate-700/50'}
        ${className}
      `}
    >
      <div className="relative aspect-video">
        {artifact.type === 'image' && (
          <Image
            src={artifact.src}
            alt={artifact.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        )}
        {artifact.type === 'video' && (
          <video
            src={artifact.src}
            loop
            muted
            playsInline
            autoPlay
            className="h-full w-full object-cover"
            aria-label={artifact.alt}
          />
        )}
      </div>
      {artifact.caption && (
        <p className="mt-3 text-center text-sm text-slate-400">
          {artifact.caption}
        </p>
      )}
    </div>
  );
}
