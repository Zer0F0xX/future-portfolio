/**
 * ScrollStep Component
 * Scroll-triggered content reveal for narrative storytelling
 * Problem → Approach → Outcome flow
 * WCAG 2.2 AA compliant with proper heading hierarchy
 */

'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollStepProps {
  step: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  icon?: string;
  accentColor?: 'cyan' | 'magenta' | 'white';
  layout?: 'default' | 'split' | 'centered';
  className?: string;
}

export function ScrollStep({
  step,
  title,
  subtitle,
  children,
  icon,
  accentColor = 'cyan',
  layout = 'default',
  className = '',
}: ScrollStepProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const colorClasses = {
    cyan: {
      title: 'text-neonCyan',
      border: 'border-neonCyan',
      bg: 'bg-neonCyan',
      glow: 'shadow-neonCyan/20',
    },
    magenta: {
      title: 'text-irisMagenta',
      border: 'border-irisMagenta',
      bg: 'bg-irisMagenta',
      glow: 'shadow-irisMagenta/20',
    },
    white: {
      title: 'text-white',
      border: 'border-white',
      bg: 'bg-white',
      glow: 'shadow-white/20',
    },
  };

  const colors = colorClasses[accentColor];

  const layoutClasses = {
    default: 'max-w-4xl mx-auto',
    split: 'grid md:grid-cols-2 gap-12 max-w-6xl mx-auto',
    centered: 'max-w-3xl mx-auto text-center',
  };

  return (
    <section
      ref={ref}
      className={`
        relative py-20
        ${layoutClasses[layout]}
        ${className}
      `}
      aria-labelledby={`step-${step}-title`}
    >
      {/* Step indicator */}
      <div
        className={`
          mb-12 flex items-center gap-6
          transition-all duration-700 delay-100
          ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
          ${layout === 'centered' ? 'justify-center' : ''}
        `}
      >
        {/* Step number badge */}
        <div
          className={`
            flex h-16 w-16 items-center justify-center rounded-full
            border-2 font-display text-2xl font-bold
            ${colors.border} ${colors.title}
          `}
          aria-label={`Step ${step}`}
        >
          {icon || step}
        </div>

        {/* Decorative line */}
        <div
          className={`h-0.5 flex-1 ${colors.bg} opacity-20`}
          aria-hidden="true"
        />
      </div>

      {/* Header */}
      <header
        className={`
          mb-8
          transition-all duration-700 delay-200
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}
      >
        {subtitle && (
          <p className="mb-3 font-display text-sm uppercase tracking-widest text-slate-500">
            {subtitle}
          </p>
        )}
        <h2
          id={`step-${step}-title`}
          className={`
            font-display text-3xl uppercase tracking-wider
            md:text-4xl lg:text-5xl
            ${colors.title}
          `}
        >
          {title}
        </h2>
      </header>

      {/* Content */}
      <div
        className={`
          prose prose-invert prose-lg max-w-none
          transition-all duration-700 delay-300
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * ScrollStepGroup Component
 * Container for multiple connected scroll steps
 * Renders with progress indicator
 */

interface ScrollStepGroupProps {
  children: ReactNode;
  showProgress?: boolean;
  className?: string;
}

export function ScrollStepGroup({
  children,
  showProgress = true,
  className = '',
}: ScrollStepGroupProps) {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showProgress || !stepsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-step-index') || '0');
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const steps = stepsRef.current.querySelectorAll('[data-step-index]');
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, [showProgress]);

  return (
    <div className={`relative ${className}`}>
      {/* Progress indicator */}
      {showProgress && (
        <div
          className="fixed left-8 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
          aria-label="Reading progress"
        >
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`
                  h-2 w-2 rounded-full transition-all duration-300
                  ${activeStep >= index ? 'bg-neonCyan scale-125' : 'bg-slate-700'}
                `}
                aria-label={`Step ${index + 1}${activeStep >= index ? ' (active)' : ''}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Steps */}
      <div ref={stepsRef}>
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <div key={index} data-step-index={index}>
              {child}
            </div>
          ))
        ) : (
          <div data-step-index={0}>{children}</div>
        )}
      </div>
    </div>
  );
}

/**
 * ContentBlock Component
 * Reusable content block with optional visual
 */

interface ContentBlockProps {
  title?: string;
  children: ReactNode;
  visual?: ReactNode;
  visualPosition?: 'left' | 'right' | 'top';
  background?: boolean;
  className?: string;
}

export function ContentBlock({
  title,
  children,
  visual,
  visualPosition = 'right',
  background = false,
  className = '',
}: ContentBlockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const layoutClasses = {
    left: 'md:flex-row-reverse',
    right: 'md:flex-row',
    top: 'flex-col',
  };

  return (
    <div
      ref={ref}
      className={`
        relative overflow-hidden rounded-lg
        ${background ? 'border border-slate-700/50 bg-slate-900/30 p-8 backdrop-blur-sm' : ''}
        ${className}
      `}
    >
      <div
        className={`
          flex flex-col gap-8
          ${visual ? layoutClasses[visualPosition] : ''}
          ${visualPosition !== 'top' ? 'md:items-center' : ''}
        `}
      >
        {/* Content */}
        <div
          className={`
            flex-1
            transition-all duration-700
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
          `}
        >
          {title && (
            <h3 className="mb-4 font-display text-2xl uppercase tracking-wider text-white">
              {title}
            </h3>
          )}
          <div className="prose prose-invert max-w-none text-slate-300">
            {children}
          </div>
        </div>

        {/* Visual */}
        {visual && (
          <div
            className={`
              flex-1
              transition-all duration-700 delay-200
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            `}
          >
            {visual}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Callout Component
 * Highlighted quote or key insight
 */

interface CalloutProps {
  children: ReactNode;
  author?: string;
  role?: string;
  type?: 'quote' | 'insight' | 'warning';
  className?: string;
}

export function Callout({
  children,
  author,
  role,
  type = 'quote',
  className = '',
}: CalloutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const typeStyles = {
    quote: {
      border: 'border-l-4 border-irisMagenta',
      bg: 'bg-irisMagenta/5',
      icon: '"',
    },
    insight: {
      border: 'border-l-4 border-neonCyan',
      bg: 'bg-neonCyan/5',
      icon: '💡',
    },
    warning: {
      border: 'border-l-4 border-yellow-500',
      bg: 'bg-yellow-500/5',
      icon: '⚠️',
    },
  };

  const style = typeStyles[type];

  return (
    <blockquote
      ref={ref}
      className={`
        relative my-12 pl-8 pr-6 py-6
        ${style.border} ${style.bg}
        transition-all duration-700
        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
        ${className}
      `}
      role={type === 'quote' ? 'blockquote' : 'note'}
    >
      {type === 'quote' && (
        <span
          className="absolute -left-2 top-0 font-display text-6xl text-irisMagenta/20"
          aria-hidden="true"
        >
          {style.icon}
        </span>
      )}
      {type !== 'quote' && (
        <span className="absolute left-2 top-6 text-2xl" aria-hidden="true">
          {style.icon}
        </span>
      )}

      <div className="text-lg italic leading-relaxed text-slate-200">
        {children}
      </div>

      {(author || role) && (
        <footer className="mt-4 text-sm text-slate-400">
          {author && <cite className="not-italic font-semibold">{author}</cite>}
          {author && role && <span className="mx-2">·</span>}
          {role && <span>{role}</span>}
        </footer>
      )}
    </blockquote>
  );
}
