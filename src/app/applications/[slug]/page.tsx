import { notFound } from 'next/navigation';
import ApplicationDetail from './ApplicationDetail';
import { FALLBACK_APPLICATIONS } from '@/data/fallbackData';

// Generate static params for static export
export async function generateStaticParams() {
  return FALLBACK_APPLICATIONS.map((app) => ({
    slug: String(app.id),
  }));
}

// Server Component
export default async function ApplicationDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  // 直接从fallback数据获取应用
  const application = FALLBACK_APPLICATIONS.find(app => String(app.id) === slug);

  if (!application) {
    notFound();
  }

  return <ApplicationDetail application={application} />;
}