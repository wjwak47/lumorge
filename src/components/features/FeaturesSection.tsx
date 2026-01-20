"use client";
import { ShieldCheck, Zap, Globe, Users2 } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Shield: ShieldCheck,
  Zap,
  Globe,
  Users: Users2,
};

const FEATURES = [
  { title: 'Reliable Performance', desc: 'Engineered for 24/7 operation in demanding environments.', icon: 'Shield' },
  { title: 'Cutting-Edge Technology', desc: 'Stay ahead with the latest in LED display solutions.', icon: 'Zap' },
  { title: 'Global Reach', desc: 'Supporting partners and venues worldwide.', icon: 'Globe' },
  { title: 'Dedicated Support', desc: 'Expert help and service, whenever you need it.', icon: 'Users' },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            The advantages that make us the leading LED display provider
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((item) => {
            const Icon = ICON_MAP[item.icon] || ShieldCheck;
            return (
              <div key={item.title} className="text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F1F5F9] mb-6">
                  <Icon size={28} className="text-[#2563EB]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-[#0A1628] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}