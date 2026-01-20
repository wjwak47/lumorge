import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import { getSettings } from '@/utils/api';
import { ToastProvider } from '@/contexts/ToastContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  console.log('[Layout] Generating metadata...');
  try {
    const settings = await getSettings();
    console.log('[Layout] Settings fetched for metadata:', settings);

    const siteTitle = settings?.site_title || "TechSports - Loading...";
    const siteDescription = settings?.site_description || "Leading provider of technology for sports.";

    return {
      title: siteTitle,
      description: siteDescription,
    };
  } catch (error) {
    console.error('[Layout] Error fetching settings for metadata:', error);
    return {
      title: "TechSports - Error Loading Title",
      description: "Error loading description.",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <Header />
          <main className="min-h-screen w-full bg-white text-[#0A1F44]">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
