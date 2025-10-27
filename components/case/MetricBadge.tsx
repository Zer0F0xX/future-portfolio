/**
 * MetricBadge Component
 * Animated metric display with optional icon
 * WCAG 2.2 AA compliant with semantic markup
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface MetricBadgeProps {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  color?: 'cyan' | 'magenta' | 'white';
  delay?: number;
  className?: string;
}

export function MetricBadge({
  label,
  value,
  description,
  icon,
  color = 'cyan',
  delay = 0,
  className = '',
}: MetricBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const colorClasses = {
    cyan: {
      border: 'border-neonCyan',
      text: 'text-neonCyan',
      glow: 'shadow-neonCyan/20',
    },
    magenta: {
      border: 'border-irisMagenta',
      text: 'text-irisMagenta',
      glow: 'shadow-irisMagenta/20',
    },
    white: {
      border: 'border-white',
      text: 'text-white',
      glow: 'shadow-white/20',
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      ref={ref}
      className={`
        group relative overflow-hidden rounded-lg border-2 bg-deepVoid/50 p-6
        backdrop-blur-sm transition-all duration-700
        ${colors.border}
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        hover:scale-105 hover:bg-deepVoid/80 hover:shadow-lg ${colors.glow}
        ${className}
      `}
      role="article"
      aria-label={`${label}: ${value}`}
    >
      {/* Background gradient */}
      <div
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10
          ${color === 'cyan' ? 'bg-gradient-to-br from-neonCyan to-transparent' : ''}
          ${color === 'magenta' ? 'bg-gradient-to-br from-irisMagenta to-transparent' : ''}
          ${color === 'white' ? 'bg-gradient-to-br from-white to-transparent' : ''}
        `}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Icon (if provided) */}
        {icon && (
          <div className="mb-4 text-3xl" aria-hidden="true">
            {icon}
          </div>
        )}

        {/* Value */}
        <div
          className={`
            font-display text-4xl font-bold uppercase tracking-wider md:text-5xl
            ${colors.text}
          `}
        >
          {value}
        </div>

        {/* Label */}
        <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {description}
          </p>
        )}
      </div>

      {/* Hover shine effect */}
      <div
        className={`
          pointer-events-none absolute -left-full top-0 h-full w-1/2
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          transition-transform duration-1000 group-hover:translate-x-[300%]
        `}
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * MetricBadgeGroup Component
 * Grid layout for multiple metrics with staggered animations
 */

interface MetricBadgeGroupProps {
  metrics: Array<{
    label: string;
    value: string;
    description?: string;
    icon?: string;
    color?: 'cyan' | 'magenta' | 'white';
  }>;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function MetricBadgeGroup({
  metrics,
  columns = 3,
  className = '',
}: MetricBadgeGroupProps) {
  const gridClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={`
        grid grid-cols-1 gap-6
        ${gridClasses[columns]}
        ${className}
      `}
      role="list"
      aria-label="Project metrics"
    >
      {metrics.map((metric, index) => (
        <div key={index} role="listitem">
          <MetricBadge
            {...metric}
            delay={index * 100}
          />
        </div>
      ))}
    </div>
  );
}
