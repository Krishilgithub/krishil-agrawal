import { MetadataRoute } from 'next'
import { blogsData } from '@/data/blogs'
import { projectsData } from '@/data/projects'

const BASE_URL = 'https://krishil-agrawal.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes: MetadataRoute.Sitemap = blogsData.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...blogRoutes,
    ...projectRoutes,
  ]
}
