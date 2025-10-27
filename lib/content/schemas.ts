/**
 * Content Schemas
 * Zod schemas for validating Projects, Experiment Logs, and Essays
 * Build fails if content doesn't match schema
 */

import { z } from 'zod';

// ==================== Project Schema ====================

/**
 * Project Metrics Schema
 * Quantifiable outcomes and KPIs
 */
const metricSchema = z.object({
  label: z.string().min(1, 'Metric label required'),
  value: z.string().min(1, 'Metric value required'),
  description: z.string().optional(),
});

/**
 * Project Links Schema
 * External links (demos, repos, case studies)
 */
const linkSchema = z.object({
  label: z.string().min(1, 'Link label required'),
  href: z.string().url('Must be valid URL'),
  external: z.boolean().default(true),
});

/**
 * Main Project Schema
 * Full case study with problem/solution/outcome
 */
export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1, 'Title required').max(100, 'Title too long (max 100 chars)'),
  summary: z.string().min(10, 'Summary too short').max(300, 'Summary too long (max 300 chars)'),
  role: z.string().min(1, 'Role required'), // e.g. "Lead Designer", "Product Architect"
  stack: z.array(z.string()).min(1, 'At least one technology required'),
  dates: z.object({
    start: z.string().regex(/^\d{4}-\d{2}$/, 'Date format must be YYYY-MM'),
    end: z.string().regex(/^\d{4}-\d{2}$/, 'Date format must be YYYY-MM'),
  }),
  media: z.array(z.string().url()).optional(), // URLs to images/videos
  metrics: z.array(metricSchema).optional(),
  links: z.array(linkSchema).optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false), // Show on homepage
});

export type Project = z.infer<typeof projectSchema>;

// ==================== Experiment Log Schema ====================

/**
 * Experiment Log Schema
 * Lab notes, prototypes, and research artifacts
 */
export const logSchema = z.object({
  id: z.number().int().positive('ID must be positive integer'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }).transform((str) => new Date(str)),
  title: z.string().min(1, 'Title required').max(100, 'Title too long (max 100 chars)'),
  tags: z.array(z.string()).min(1, 'At least one tag required').max(10, 'Max 10 tags'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export type Log = z.infer<typeof logSchema>;

// ==================== Essay Schema ====================

/**
 * Essay Schema
 * Long-form writing with MDX content
 */
export const essaySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1, 'Title required').max(120, 'Title too long (max 120 chars)'),
  synopsis: z.string().min(10, 'Synopsis too short').max(400, 'Synopsis too long (max 400 chars)'),
  cover: z.string().url('Cover must be valid URL').optional(),
  keywords: z.array(z.string()).min(1, 'At least one keyword required').max(15, 'Max 15 keywords'),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }).transform((str) => new Date(str)),
  readingTime: z.number().int().positive().optional(), // Minutes
});

export type Essay = z.infer<typeof essaySchema>;

// ==================== Content Item with Body ====================

/**
 * Generic content item with parsed MDX body
 */
export type ContentItem<T> = T & {
  content: string; // Raw MDX content
  excerpt?: string; // Auto-generated excerpt
};

// ==================== Validation Helpers ====================

/**
 * Validate project at build time
 * Throws if invalid
 */
export function validateProject(data: unknown): Project {
  return projectSchema.parse(data);
}

/**
 * Validate log at build time
 */
export function validateLog(data: unknown): Log {
  return logSchema.parse(data);
}

/**
 * Validate essay at build time
 */
export function validateEssay(data: unknown): Essay {
  return essaySchema.parse(data);
}
