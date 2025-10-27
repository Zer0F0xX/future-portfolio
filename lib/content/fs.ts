/**
 * File System Content Loaders
 * SSG-compatible loaders with Zod validation
 * Build fails if content doesn't match schema
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import {
  projectSchema,
  logSchema,
  essaySchema,
  ContentItem,
  type Project,
  type Log,
  type Essay,
} from './schemas';

const contentDir = path.join(process.cwd(), 'content');

/**
 * Generate excerpt from MDX content
 * Takes first paragraph or 160 characters
 */
function generateExcerpt(content: string, maxLength = 160): string {
  // Remove MDX components and markdown syntax
  const plainText = content
    .replace(/{[^}]+}/g, '') // Remove JSX
    .replace(/#+\s/g, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .trim();

  // Get first paragraph
  const firstParagraph = plainText.split('\n\n')[0];

  // Truncate if needed
  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }

  return firstParagraph.substring(0, maxLength).trim() + '...';
}

/**
 * Calculate reading time from content
 * Average reading speed: 200 words per minute
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generic content loader with validation
 * Throws if schema validation fails (build-time safety)
 */
async function loadContent<T extends z.ZodTypeAny>(
  dir: string,
  schema: T
): Promise<Array<ContentItem<z.infer<T>>>> {
  const fullDir = path.join(contentDir, dir);

  if (!fs.existsSync(fullDir)) {
    console.warn(`[Content Loader] Directory not found: ${fullDir}`);
    return [];
  }

  const files = fs.readdirSync(fullDir).filter((file) => {
    const ext = path.extname(file);
    return ext === '.mdx' || ext === '.md';
  });

  if (files.length === 0) {
    console.warn(`[Content Loader] No content files found in: ${fullDir}`);
    return [];
  }

  const allContent: Array<ContentItem<z.infer<T>>> = [];

  for (const file of files) {
    const fullPath = path.join(fullDir, file);

    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Parse with Zod schema (throws on validation error)
      const parsedData = schema.parse({
        ...data,
        slug: data.slug || path.basename(file, path.extname(file)),
      });

      // Generate excerpt and reading time
      const excerpt = generateExcerpt(content);
      const readingTime = calculateReadingTime(content);

      allContent.push({
        ...parsedData,
        content,
        excerpt,
        readingTime: parsedData.readingTime || readingTime,
      } as ContentItem<z.infer<T>>);
    } catch (error) {
      console.error(`[Content Loader] Error loading ${file}:`, error);
      throw error; // Fail build on invalid content
    }
  }

  // Filter published items
  return allContent.filter((item: any) => item.published !== false);
}

// ==================== Projects ====================

/**
 * Get all published projects
 * Sorted by date (newest first)
 */
export async function getProjects(): Promise<Array<ContentItem<Project>>> {
  const projects = await loadContent('projects', projectSchema);

  return projects.sort((a, b) => {
    // Sort by start date (descending)
    const dateA = new Date(a.dates.start);
    const dateB = new Date(b.dates.start);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get featured projects for homepage
 */
export async function getFeaturedProjects(): Promise<Array<ContentItem<Project>>> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string): Promise<ContentItem<Project> | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

/**
 * Get all project slugs (for static generation)
 */
export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}

// ==================== Logs ====================

/**
 * Get all published experiment logs
 * Sorted by date (newest first)
 */
export async function getLogs(): Promise<Array<ContentItem<Log>>> {
  const logs = await loadContent('logs', logSchema);

  return logs.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });
}

/**
 * Get logs by tag
 */
export async function getLogsByTag(tag: string): Promise<Array<ContentItem<Log>>> {
  const logs = await getLogs();
  return logs.filter((log) => log.tags.includes(tag));
}

/**
 * Get all unique tags from logs
 */
export async function getLogTags(): Promise<string[]> {
  const logs = await getLogs();
  const tagSet = new Set<string>();

  logs.forEach((log) => {
    log.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Get log by slug
 */
export async function getLogBySlug(slug: string): Promise<ContentItem<Log> | undefined> {
  const logs = await getLogs();
  return logs.find((log) => log.slug === slug);
}

// ==================== Essays ====================

/**
 * Get all published essays
 * Sorted by date (newest first)
 */
export async function getEssays(): Promise<Array<ContentItem<Essay>>> {
  const essays = await loadContent('essays', essaySchema);

  return essays.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });
}

/**
 * Get featured essays for homepage
 */
export async function getFeaturedEssays(): Promise<Array<ContentItem<Essay>>> {
  const essays = await getEssays();
  return essays.filter((e) => e.featured);
}

/**
 * Get essay by slug
 */
export async function getEssayBySlug(slug: string): Promise<ContentItem<Essay> | undefined> {
  const essays = await getEssays();
  return essays.find((e) => e.slug === slug);
}

/**
 * Get all essay slugs (for static generation)
 */
export async function getEssaySlugs(): Promise<string[]> {
  const essays = await getEssays();
  return essays.map((e) => e.slug);
}

/**
 * Search essays by keyword
 */
export async function searchEssays(query: string): Promise<Array<ContentItem<Essay>>> {
  const essays = await getEssays();
  const lowerQuery = query.toLowerCase();

  return essays.filter((essay) => {
    return (
      essay.title.toLowerCase().includes(lowerQuery) ||
      essay.synopsis.toLowerCase().includes(lowerQuery) ||
      essay.keywords.some((k) => k.toLowerCase().includes(lowerQuery)) ||
      essay.content.toLowerCase().includes(lowerQuery)
    );
  });
}

// ==================== Indexers ====================

/**
 * Get content index for search
 * Returns all content with metadata for search/filtering
 */
export async function getContentIndex() {
  const [projects, logs, essays] = await Promise.all([
    getProjects(),
    getLogs(),
    getEssays(),
  ]);

  return {
    projects: projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      type: 'project' as const,
      excerpt: p.excerpt,
      keywords: p.stack,
      url: `/work/${p.slug}`,
    })),
    logs: logs.map((l) => ({
      slug: l.slug,
      title: l.title,
      type: 'log' as const,
      excerpt: l.excerpt,
      keywords: l.tags,
      url: `/lab/${l.slug}`,
    })),
    essays: essays.map((e) => ({
      slug: e.slug,
      title: e.title,
      type: 'essay' as const,
      excerpt: e.excerpt,
      keywords: e.keywords,
      url: `/writing/${e.slug}`,
    })),
  };
}

/**
 * Get all content sorted by date
 */
export async function getAllContent() {
  const [projects, logs, essays] = await Promise.all([
    getProjects(),
    getLogs(),
    getEssays(),
  ]);

  const allItems = [
    ...projects.map((p) => ({
      ...p,
      type: 'project' as const,
      date: new Date(p.dates.start),
    })),
    ...logs.map((l) => ({ ...l, type: 'log' as const })),
    ...essays.map((e) => ({ ...e, type: 'essay' as const })),
  ];

  return allItems.sort((a, b) => b.date.getTime() - a.date.getTime());
}
