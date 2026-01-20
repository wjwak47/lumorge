import { applicationApi } from '@/utils/api';
import ApplicationDetail from './ApplicationDetail';

// Generate static params for static export
export async function generateStaticParams() {
  const result = await applicationApi.getPublicApplications();
  const applications = result.data || [];
  return applications.map((app: any) => ({
    slug: app.slug || String(app.id),
  }));
}

// Server Component
export default async function ApplicationDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <ApplicationDetail slug={slug} />;
} 