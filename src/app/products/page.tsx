import ProductsList from '@/components/features/ProductsList';
import PageHero from '@/components/features/PageHero';

export default function ProductsPage() {
  return (
    <div className="w-full min-h-screen pt-20">
      <PageHero 
        title="Our Products" 
        subtitle="Advanced Technology Solutions for Sports Venues"
        background="bg-gradient-to-r from-[#0A1F44] to-[#0052CC]"
      />
      <ProductsList />
    </div>
  );
} 