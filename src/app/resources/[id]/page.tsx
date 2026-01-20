import { notFound } from 'next/navigation';
import { RESOURCES } from '@/data/resources';
import ResourcePageClient from '@/components/features/ResourcePageClient';

interface ResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for static export
export async function generateStaticParams() {
  return RESOURCES.map((resource) => ({
    id: resource.id,
  }));
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  // Get ID safely for Next.js 15
  const { id: resourceId } = await params;
  
  // Find resource by ID
  const resource = RESOURCES.find(r => r.id === resourceId);
  
  // Return 404 if resource not found
  if (!resource) {
    notFound();
  }
  
  // Get related resources
  const relatedResources = RESOURCES.filter(r => 
    r.id !== resource.id && r.type === resource.type
  ).slice(0, 3);
  
  return <ResourcePageClient resource={resource} relatedResources={relatedResources} />;
}
