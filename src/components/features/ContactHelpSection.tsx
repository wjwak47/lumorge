"use client";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function ContactHelpSection() {
  return (
    <section id="contact" className="w-full py-32 bg-[#0A1628] relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0F172A] to-[#1E293B] opacity-50" />

      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Ready to Transform Your Venue?
        </h2>

        <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Let us discuss how our LED display solutions can elevate your venue experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-full hover:bg-[#F1F5F9] transition-all duration-300 hover:shadow-xl hover:shadow-white/10"
          >
            Get Started
            <ArrowRight size={18} className="ml-2" />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#94A3B8]">
          <a href="mailto:sales@lumorge.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={18} />
            <span>sales@lumorge.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}