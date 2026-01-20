"use client";
import { ShieldCheck, Zap, Globe, Users2, ArrowRight } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  { title: 'Reliable', desc: '24/7 Operation', icon: ShieldCheck },
  { title: 'Advanced', desc: 'Latest Technology', icon: Zap },
  { title: 'Global', desc: '50+ Countries', icon: Globe },
  { title: 'Support', desc: '24/7 Assistance', icon: Users2 },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* CTA Card */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/90 to-[#0A1628]/80" />
          </div>

          <div className="relative z-10 p-10 md:p-16">
            <div className="max-w-2xl">
              {/* Features Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {FEATURES.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
                  >
                    <item.icon size={16} className="text-[#60A5FA]" />
                    <span className="text-white text-sm font-medium">{item.title}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-8">
                {[
                  { value: '500+', label: 'Venues' },
                  { value: '50+', label: 'Countries' },
                  { value: '15+', label: 'Years' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Content */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Venue?
              </h2>
              <p className="text-white/70 text-base mb-8 max-w-lg">
                Let's discuss how our LED solutions can elevate your experience.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white text-[#0A1628] font-semibold rounded-full hover:bg-gray-100 transition-all"
                >
                  Get Started
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}