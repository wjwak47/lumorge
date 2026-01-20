import Image from "next/image";
import Hero from '@/components/features/Hero';
import ProductShowcase from '@/components/features/ProductShowcase';
import ApplicationGrid from '@/components/features/ApplicationGrid';
import FeaturesSection from '@/components/features/FeaturesSection';
import NewsSection from '@/components/features/NewsSection';
import ContactHelpSection from '@/components/features/ContactHelpSection';
import NewsHighlights from '@/components/features/NewsHighlights';
import FeaturedProducts from '@/components/features/FeaturedProducts';

export default function Home() {
  return (
    <div className="w-full min-h-screen pt-20">
      {/* 恢复原始首页横幅 */}
      <Hero />
      <ProductShowcase />
      <FeaturedProducts />
      <ApplicationGrid />
      <NewsHighlights />
      <FeaturesSection />
      <ContactHelpSection />
    </div>
  );
}
