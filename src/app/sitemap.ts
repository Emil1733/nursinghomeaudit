import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { getAllCities } from '@/lib/city-utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://eldershield.ai'; // Update with real domain later

  // 1. Fetch all facilities
  const { data: facilities } = await supabase
    .from('facilities')
    .select('id, updated_at');

  const facilityUrls = (facilities || []).map((fac) => ({
    url: `${baseUrl}/facility/${fac.id}`,
    lastModified: fac.updated_at ? new Date(fac.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 2. Fetch all cities
  const cities = await getAllCities();
  const cityUrls = cities.map((city) => ({
    url: `${baseUrl}/city/${encodeURIComponent(city.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...cityUrls,
    ...facilityUrls,
  ];
}
