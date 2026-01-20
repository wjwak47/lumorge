"use client";

interface PageHeroProps {
  title: string;
  subtitle: string;
  background?: string;
  height?: 'sm' | 'md' | 'lg';
}

export default function PageHero({ title, subtitle, background = "bg-[#0A1F44]", height = 'md' }: PageHeroProps) {
  const sizeClasses = (() => {
    switch (height) {
      case 'sm':
        return 'pt-16 pb-12 md:pt-20 md:pb-16 min-h-[220px] md:min-h-[260px]';
      case 'lg':
        return 'pt-28 pb-24 md:pt-36 md:pb-32 min-h-[380px] md:min-h-[460px]';
      case 'md':
      default:
        return 'pt-20 pb-16 md:pt-24 md:pb-20 min-h-[300px] md:min-h-[360px]';
    }
  })();
  return (
    <section className={`w-full ${sizeClasses} ${background} relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/5"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1200px]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
} 