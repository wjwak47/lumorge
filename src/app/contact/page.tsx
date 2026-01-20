"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Send, Check, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import PhoneInput from '@/components/ui/PhoneInput';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-200">
            <Check size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Message Sent!</h1>
          <p className="text-slate-500 mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
          <button
            onClick={() => setIsSuccess(false)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Send another message
            <ArrowRight size={16} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="LED Display Technology"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Ready to transform your venue? Let's discuss your LED display project.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-24">

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Phone, label: 'Call Us', value: '+1 (800) 555-0100', href: 'tel:+18005550100' },
              { icon: Mail, label: 'Email Us', value: 'sales@lumorge.com', href: 'mailto:sales@lumorge.com' },
              { icon: MapPin, label: 'Visit Us', value: 'Shenzhen, China', href: '#' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="group bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">{item.label}</div>
                  <div className="text-slate-800 font-medium">{item.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form Section */}
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* Left - Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Let's Build Together</h2>
                <p className="text-slate-500 leading-relaxed">
                  Whether you need a stadium scoreboard, retail display, or custom LED solution, our team is ready to bring your vision to life.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '500+', label: 'Venues Worldwide' },
                  { value: '15+', label: 'Years Experience' },
                  { value: '24/7', label: 'Support Available' },
                  { value: '99%', label: 'Satisfaction Rate' },
                ].map((stat, i) => (
                  <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-400 mb-4">Trusted by leading venues</p>
                <div className="flex gap-6 opacity-40">
                  <div className="text-2xl font-bold text-slate-600">FIFA</div>
                  <div className="text-2xl font-bold text-slate-600">NBA</div>
                  <div className="text-2xl font-bold text-slate-600">UEFA</div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData(p => ({ ...p, phone: value }))}
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                    >
                      <option value="">Select a topic</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="quote">Request Quote</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
