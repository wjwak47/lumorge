"use client";
import { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, MapPin, Mail, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getSettings } from "@/utils/api";
import { getCachedSettings } from "@/utils/settingsCache";

// 默认的页脚链接，当API没有返回数据时使用
const DEFAULT_FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "News", href: "/resources" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  solutions: [
    { label: "LED Displays", href: "/products/smart-led" },
    { label: "Audio Systems", href: "/products#audio" },
    { label: "Arena Control", href: "/products/arena-control" },
    { label: "Sports Venues", href: "/applications/sports" },
    { label: "Stadium Integration", href: "/applications/stadium" },
  ],
};

export default function Footer() {
  // 添加状态来存储页脚设置
  const [footerSettings, setFooterSettings] = useState({
    company_desc: 'Innovative technology solutions for sports venues worldwide since 2008.',
    address: 'San Francisco, CA, USA',
    email: 'info@lumorge.com',
    phone: '+1 (888) TECH-SPT',
    social_facebook: '#',
    social_twitter: '#',
    social_linkedin: '#',
    social_instagram: '#',
    social_youtube: '#',
    copyright: `© ${new Date().getFullYear()} Lumorge`,
    privacy_url: '/privacy',
    terms_url: '/terms'
  });
  
  // 添加错误状态跟踪
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // 获取页脚设置
  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        setIsLoading(true);
        setFetchError(false);
        console.log('Fetching footer settings...');
        
        // 首先从缓存获取设置
        const cachedData = getCachedSettings();
        if (cachedData) {
          setFooterSettings({
            company_desc: cachedData.footer_company_desc || footerSettings.company_desc,
            address: cachedData.footer_address || footerSettings.address,
            email: cachedData.footer_email || footerSettings.email,
            phone: cachedData.footer_phone || footerSettings.phone,
            social_facebook: cachedData.footer_social_facebook || footerSettings.social_facebook,
            social_twitter: cachedData.footer_social_twitter || footerSettings.social_twitter,
            social_linkedin: cachedData.footer_social_linkedin || footerSettings.social_linkedin,
            social_instagram: cachedData.footer_social_instagram || footerSettings.social_instagram,
            social_youtube: cachedData.footer_social_youtube || footerSettings.social_youtube,
            copyright: cachedData.footer_copyright || footerSettings.copyright,
            privacy_url: cachedData.footer_privacy_url || footerSettings.privacy_url,
            terms_url: cachedData.footer_terms_url || footerSettings.terms_url
          });
          console.log('Using cached settings from settingsCache module');
          setIsLoading(false);
          
          // 在后台尝试更新缓存，但不等待结果
          getSettings([
            'footer_company_desc',
            'footer_address',
            'footer_email',
            'footer_phone',
            'footer_social_facebook',
            'footer_social_twitter',
            'footer_social_linkedin',
            'footer_social_instagram',
            'footer_social_youtube',
            'footer_copyright',
            'footer_privacy_url',
            'footer_terms_url'
          ]).then(newData => {
            if (newData && Object.keys(newData).length > 0) {
              // 只有当返回的数据与缓存不同时才更新状态
              setFooterSettings({
                company_desc: newData.footer_company_desc || footerSettings.company_desc,
                address: newData.footer_address || footerSettings.address,
                email: newData.footer_email || footerSettings.email,
                phone: newData.footer_phone || footerSettings.phone,
                social_facebook: newData.footer_social_facebook || footerSettings.social_facebook,
                social_twitter: newData.footer_social_twitter || footerSettings.social_twitter,
                social_linkedin: newData.footer_social_linkedin || footerSettings.social_linkedin,
                social_instagram: newData.footer_social_instagram || footerSettings.social_instagram,
                social_youtube: newData.footer_social_youtube || footerSettings.social_youtube,
                copyright: newData.footer_copyright || footerSettings.copyright,
                privacy_url: newData.footer_privacy_url || footerSettings.privacy_url,
                terms_url: newData.footer_terms_url || footerSettings.terms_url
              });
              console.log('Background update of footer settings complete');
            }
          }).catch(err => {
            console.log('Background update of settings failed, using cache', err);
          });
          
          return;
        }
        
        // 如果没有缓存，则从API获取设置
        const data = await getSettings([
          'footer_company_desc',
          'footer_address',
          'footer_email',
          'footer_phone',
          'footer_social_facebook',
          'footer_social_twitter',
          'footer_social_linkedin',
          'footer_social_instagram',
          'footer_social_youtube',
          'footer_copyright',
          'footer_privacy_url',
          'footer_terms_url'
        ]);
        
        console.log('Footer settings received from API:', data);
        
        if (data) {
          const newSettings = {
            company_desc: data.footer_company_desc || footerSettings.company_desc,
            address: data.footer_address || footerSettings.address,
            email: data.footer_email || footerSettings.email,
            phone: data.footer_phone || footerSettings.phone,
            social_facebook: data.footer_social_facebook || footerSettings.social_facebook,
            social_twitter: data.footer_social_twitter || footerSettings.social_twitter,
            social_linkedin: data.footer_social_linkedin || footerSettings.social_linkedin,
            social_instagram: data.footer_social_instagram || footerSettings.social_instagram,
            social_youtube: data.footer_social_youtube || footerSettings.social_youtube,
            copyright: data.footer_copyright || footerSettings.copyright,
            privacy_url: data.footer_privacy_url || footerSettings.privacy_url,
            terms_url: data.footer_terms_url || footerSettings.terms_url
          };
          
          setFooterSettings(newSettings);
          console.log('Footer settings updated from API');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch footer settings:', error);
        setFetchError(true);
        setIsLoading(false);
        // 使用默认值，已经在useState中设置
      }
    };
    
    fetchFooterSettings();
  }, []);

  return (
    <footer className="relative overflow-hidden">
      {/* Wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" 
          className="relative block w-full h-[60px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-white"></path>
        </svg>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing orbs */}
        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-blue-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[30%] right-[15%] w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-[60%] left-[50%] w-56 h-56 rounded-full bg-purple-500/10 blur-3xl animate-pulse-fast"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>

      <div className="bg-gradient-to-br from-[#0A1F44] via-[#0D2F6B] to-[#051630] pt-24 pb-10 relative z-10">
        <div className="container mx-auto max-w-[1200px] px-6">
          {/* Main content area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            {/* Company info */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-gradient-to-r from-blue-500/80 to-blue-800/80 backdrop-blur-xl p-7 rounded-xl shadow-[0_10px_20px_-5px_rgba(0,0,255,0.3)] transform hover:scale-[1.02] transition-all duration-300 border border-white/10">
                <div className="text-white font-bold text-3xl tracking-tighter mb-5 flex items-center gap-2">
                  <div className="relative">
                    <span className="text-white">LU</span>
                    <div className="absolute -right-1 -top-1 w-6 h-6 bg-blue-500 rounded-full blur-md animate-ping opacity-70"></div>
                  </div>
                  <div className="bg-white text-blue-700 px-2 py-0.5 rounded shadow-lg transform -rotate-2">MORGE</div>
                </div>
                <p className="text-white/90 pr-4 mb-5 text-lg">
                  {footerSettings.company_desc}
                </p>
                
                {/* Contact info with animations */}
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-3 text-white/90 hover:text-white group transition-all hover:translate-x-1 duration-300">
                    <div className="p-2 bg-blue-500/30 group-hover:bg-blue-500/80 rounded-lg shadow-md transition-all group-hover:shadow-blue-500/50">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <span className="text-sm">{footerSettings.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90 hover:text-white group transition-all hover:translate-x-1 duration-300">
                    <div className="p-2 bg-blue-500/30 group-hover:bg-blue-500/80 rounded-lg shadow-md transition-all group-hover:shadow-blue-500/50">
                      <Phone size={16} className="text-white" />
                    </div>
                    <span className="text-sm">{footerSettings.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90 hover:text-white group transition-all hover:translate-x-1 duration-300">
                    <div className="p-2 bg-blue-500/30 group-hover:bg-blue-500/80 rounded-lg shadow-md transition-all group-hover:shadow-blue-500/50">
                      <Mail size={16} className="text-white" />
                    </div>
                    <span className="text-sm">{footerSettings.email}</span>
                  </div>
                </div>
                
                {/* Animated decoration element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border border-blue-300/30 animate-spin-slow"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border border-white/10 animate-spin-reverse-slow"></div>
              </div>
            </div>
            
            {/* Links section */}
            <div className="md:col-span-7 grid grid-cols-2 gap-x-10 gap-y-8">
              <div className="p-6 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors duration-300 shadow-lg hover:shadow-blue-500/10 group">
                <h4 className="text-white font-medium text-lg mb-5 flex items-center group-hover:text-blue-300 transition-colors">
                  <span className="w-2 h-7 bg-gradient-to-b from-blue-400 to-blue-600 inline-block mr-3 rounded-full group-hover:h-10 transition-all duration-500"></span>
                  Company
                </h4>
                <ul className="space-y-3">
                  {DEFAULT_FOOTER_LINKS.company.map((item, index) => (
                    <li key={item.label}>
                      <Link 
                        href={item.href} 
                        className="text-gray-300 hover:text-blue-300 flex items-center group text-sm transition-all duration-300 hover:translate-x-2"
                      >
                        <span className="w-0 h-0.5 bg-blue-500 mr-2 group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Corner decoration */}
                <div className="absolute bottom-2 right-2 w-10 h-10 border-r-2 border-b-2 border-blue-500/20 rounded-br-xl"></div>
              </div>
              
              <div className="p-6 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors duration-300 shadow-lg hover:shadow-blue-500/10 group">
                <h4 className="text-white font-medium text-lg mb-5 flex items-center group-hover:text-blue-300 transition-colors">
                  <span className="w-2 h-7 bg-gradient-to-b from-blue-400 to-blue-600 inline-block mr-3 rounded-full group-hover:h-10 transition-all duration-500"></span>
                  Solutions
                </h4>
                <ul className="space-y-3">
                  {DEFAULT_FOOTER_LINKS.solutions.map((item) => (
                    <li key={item.label}>
                      <Link 
                        href={item.href} 
                        className="text-gray-300 hover:text-blue-300 flex items-center group text-sm transition-all duration-300 hover:translate-x-2"
                      >
                        <span className="w-0 h-0.5 bg-blue-500 mr-2 group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Corner decoration */}
                <div className="absolute bottom-2 right-2 w-10 h-10 border-r-2 border-b-2 border-blue-500/20 rounded-br-xl"></div>
              </div>
            </div>
          </div>
          
          {/* Social links and copyright */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-10 border-t border-white/10">
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={16} />, href: footerSettings.social_facebook, color: "from-blue-500 to-blue-700" },
                { icon: <Twitter size={16} />, href: footerSettings.social_twitter, color: "from-cyan-500 to-blue-500" },
                { icon: <Linkedin size={16} />, href: footerSettings.social_linkedin, color: "from-blue-600 to-indigo-600" },
                { icon: <Instagram size={16} />, href: footerSettings.social_instagram, color: "from-pink-500 to-purple-600" },
                { icon: <Youtube size={16} />, href: footerSettings.social_youtube, color: "from-red-500 to-red-700" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className={`p-2.5 bg-gradient-to-br ${social.color} backdrop-blur-lg shadow-xl rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3 relative group`}
                >
                  <div className="text-white relative z-10">
                    {social.icon}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-full px-5 py-2.5 shadow-inner">
              <span className="text-xs text-blue-100/90">{footerSettings.copyright}</span>
              <div className="w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-pulse"></div>
              <Link href={footerSettings.privacy_url} className="text-xs text-gray-400 hover:text-white transition-colors relative group">
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <div className="w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-pulse"></div>
              <Link href={footerSettings.terms_url} className="text-xs text-gray-400 hover:text-white transition-colors relative group">
                Terms
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add style for animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 15s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-fast {
          animation: pulse-fast 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </footer>
  );
} 