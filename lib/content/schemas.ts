// File: lib/content/schemas.ts
import { z } from 'zod';

// Schema for Project Metrics
const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string().optional(),
});

// Schema for Project Links
const linkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});

// Main Project Schema
export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  stack: z.array(z.string()),
  dates: z.object({
    start: z.string(),
    end: z.string(),
  }),
  media: z.array(z.string()).optional(), // URLs to images/videos
  metrics: z.array(metricSchema).optional(),
  links: z.array(linkSchema).optional(),
  published: z.boolean().default(true),
});
export type Project = z.infer<typeof projectSchema>;


// Schema for Experiment Logs
export const logSchema = z.object({
  id: z.number(),
  date: z.string().transform((str) => new Date(str)),
  title: z.string(),
  tags: z.array(z.string()),
  published: z.boolean().default(true),
  slug: z.string(),
});
export type Log = z.infer<typeof logSchema>;


// Schema for Essays
export const essaySchema = z.object({
  slug: z.string(),
  title: z.string(),
  synopsis: z.string(),
  cover: z.string().optional(), // URL to cover image
  keywords: z.array(z.string()),
  published: z.boolean().default(true),
});
export type Essay = z.infer<typeof essaySchema>;
