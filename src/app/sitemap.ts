import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { getAllCities } from '@/lib/city-utils';
import { getFacilityIntel } from '@/lib/intelligence';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nursinghomeaudit.com';

  // 1. Fetch all facilities
  const { data: facilities } = await supabase
    .from('facilities')
    .select('id, updated_at');

  // Sync with noindex logic: Only include facilities that have intelligence data
  const indexableFacilities = (facilities || []).filter(fac => getFacilityIntel(fac.id));

  const facilityUrls = indexableFacilities.map((fac) => ({
    url: `${baseUrl}/facility/${fac.id}`,
    lastModified: fac.updated_at ? new Date(fac.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 2. Fetch all cities
  const cities = await getAllCities();
  const cityUrls = cities.map((city) => ({
    url: `${baseUrl}/city/${city.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = ['/about', '/contact', '/privacy'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...staticPages,
    ...cityUrls,
    ...facilityUrls,
  ];
}
