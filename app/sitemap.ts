import { MetadataRoute } from 'next'
import { blogsData } from '@/data/blogs'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes: MetadataRoute.Sitemap = blogsData.map((blog) => ({
    url: `https://krishil-agrawal.vercel.app/blogs/${blog.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://krishil-agrawal.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://krishil-agrawal.vercel.app/blogs',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://krishil-agrawal.vercel.app/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...blogRoutes,
  ]
}
