// File: app/sitemap.ts
import { MetadataRoute } from 'next';
import { getProjects, getEssays } from '@/lib/content/fs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Get all dynamic routes
  const projects = await getProjects();
  const essays = await getEssays();

  const projectUrls = projects.map((project) => ({
    url: `${SITE_URL}/project/${project.slug}`,
    lastModified: new Date(), // In a real app, you'd use a git commit date or frontmatter date
  }));

  const essayUrls = essays.map((essay) => ({
    url: `${SITE_URL}/essay/${essay.slug}`,
    lastModified: new Date(),
  }));

  // Define static routes
  const staticUrls = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/work`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/contact`, lastModified: new Date() },
  ];

  return [...staticUrls, ...projectUrls, ...essayUrls];
}
