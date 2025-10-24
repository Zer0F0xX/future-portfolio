// File: lib/content/fs.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { projectSchema, logSchema, essaySchema } from './schemas';

const contentDir = path.join(process.cwd(), 'content');

type ContentItem<T> = T & {
  content: string;
};

async function loadContent<T extends z.ZodTypeAny>(
  dir: string,
  schema: T
): Promise<Array<z.infer<T> & { content: string }>> {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) {
    console.warn(`Directory not found: ${fullDir}`);
    return [];
  }

  const files = fs.readdirSync(fullDir).filter((file) => path.extname(file) === '.mdx');
  
  const allContent = files.map((file) => {
    const fullPath = path.join(fullDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const parsedData = schema.parse({
      ...data,
      slug: path.basename(file, '.mdx'),
    }) as object;

    return { ...parsedData, content };
  });

  return allContent
    .filter((item: any) => item.published)
    .sort((a: any, b: any) => {
      if (a.date && b.date) {
        return b.date.getTime() - a.date.getTime();
      }
      return 0;
    });
}

export const getProjects = () => loadContent('projects', projectSchema);
export const getLogs = () => loadContent('logs', logSchema);
export const getEssays = () => loadContent('essays', essaySchema);

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getEssayBySlug(slug: string) {
  const essays = await getEssays();
  return essays.find((e) => e.slug === slug);
}
