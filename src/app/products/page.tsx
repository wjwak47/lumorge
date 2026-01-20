import ProductsList from '@/components/features/ProductsList';

export default function ProductsPage() {
  return (
    <div className="w-full min-h-screen pt-20">
      {/* 极简Hero */}
      <section className="w-full py-24 bg-[#0A1628] relative overflow-hidden">
        {/* 微妙的背景光效 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563EB]/10 rounded-full blur-[150px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            LED Display Solutions
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
            Premium technology for world-class venues
          </p>
        </div>
      </section>

      <ProductsList />
    </div>
  );
}