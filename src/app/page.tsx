import Hero from '@/components/features/Hero';
import ProductShowcase from '@/components/features/ProductShowcase';
import ApplicationGrid from '@/components/features/ApplicationGrid';
import FeaturesSection from '@/components/features/FeaturesSection';
import NewsHighlights from '@/components/features/NewsHighlights';

export default function Home() {
  return (
    <div className="w-full min-h-screen pt-20">
      <Hero />
      <ProductShowcase />
      <ApplicationGrid />
      <NewsHighlights />
      <FeaturesSection />
    </div>
  );
}
