"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Globe, Award, Users, Zap, Heart, Clock, CheckCircle, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-32 bg-gradient-to-b from-[#000821] to-[#001338] overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/about/hero-background.jpg"
              alt="Team Background"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000821]/80 to-[#001338]/80"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>
        
        {/* Circle decorations */}
        <div className="absolute -top-[400px] -right-[400px] w-[800px] h-[800px] rounded-full border-2 border-[#0052CC]/10"></div>
        <div className="absolute -bottom-[400px] -left-[400px] w-[800px] h-[800px] rounded-full border-2 border-[#0052CC]/10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 bg-[#0052CC]/20 text-[#4A9FFF] rounded-full text-sm font-medium mb-6">
              OUR STORY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              We're Building The Future of <span className="text-[#4A9FFF]">Sports Technology</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, TechSports has been at the forefront of innovation, creating cutting-edge solutions that transform sports venues and elevate the experience for fans and athletes alike.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-10 w-full sm:w-auto px-4 sm:px-0">
              <Link 
                href="/contact" 
                className="bg-[#0052CC] hover:bg-[#0039A6] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#0052CC]/30 flex items-center justify-center text-sm sm:text-base"
              >
                Contact Us <ChevronRight size={18} className="ml-1" />
              </Link>
              <Link 
                href="/products" 
                className="bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-[14px] rounded-full transition-all duration-300 text-sm sm:text-base"
              >
                Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Overview */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/about/company-overview.jpg"
                  alt="Sports Technology in Action"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000821]/60 to-transparent"></div>
              </div>
              
              {/* Stats overlay - 移动端优化 */}
              <div className="absolute -right-4 md:-right-8 -bottom-4 md:-bottom-8 bg-white shadow-xl rounded-2xl p-4 md:p-6 max-w-[280px] md:max-w-[300px]">
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <div>
                    <div className="text-[#0052CC] text-2xl md:text-4xl font-bold mb-0.5 md:mb-1">15+</div>
                    <div className="text-gray-600 text-xs md:text-sm">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-[#0052CC] text-2xl md:text-4xl font-bold mb-0.5 md:mb-1">500+</div>
                    <div className="text-gray-600 text-xs md:text-sm">Venues Equipped</div>
                  </div>
                  <div>
                    <div className="text-[#0052CC] text-2xl md:text-4xl font-bold mb-0.5 md:mb-1">20+</div>
                    <div className="text-gray-600 text-xs md:text-sm">Countries</div>
                  </div>
                  <div>
                    <div className="text-[#0052CC] text-2xl md:text-4xl font-bold mb-0.5 md:mb-1">95%</div>
                    <div className="text-gray-600 text-xs md:text-sm">Client Retention</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-medium py-1.5 px-4 rounded-full mb-4 border border-blue-100/50">
                <Globe size={16} className="mr-2" />
                GLOBAL INNOVATION
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pioneering Sports Technology Since 2008
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                TechSports began with a simple mission: to revolutionize how technology is integrated into sports venues around the world. What started as a small team of passionate engineers has grown into a global leader in sports technology solutions.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Today, our products and services power some of the world's most iconic stadiums and arenas, from major league facilities to community venues. Our commitment to innovation, quality, and exceptional service has made us the partner of choice for sports organizations seeking to create unforgettable experiences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-[#0052CC]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Award Winning</h3>
                    <p className="text-gray-600 text-sm">Recognized with 20+ industry awards for our innovative technology solutions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-[#0052CC]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
                    <p className="text-gray-600 text-sm">Our team of 200+ specialists includes engineers, designers, and sports industry veterans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-medium py-1.5 px-4 rounded-full mb-4 border border-blue-100/50">
              <Heart size={16} className="mr-2" />
              OUR VALUES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Core Values That Drive Us
            </h2>
            <p className="text-gray-600">
              At TechSports, these principles guide everything we do—from how we design our products to how we interact with our clients and each other.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-[#0052CC]" />,
                title: "Innovation",
                description: "We're committed to pushing the boundaries of what's possible in sports technology, constantly seeking new solutions to improve the fan and athlete experience."
              },
              {
                icon: <Users className="h-8 w-8 text-[#0052CC]" />,
                title: "Collaboration",
                description: "We believe the best results come from working closely with our clients and partners, creating solutions that meet their unique needs and challenges."
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-[#0052CC]" />,
                title: "Excellence",
                description: "We hold ourselves to the highest standards in everything we do, from product development to customer support, ensuring quality and reliability."
              },
              {
                icon: <Heart className="h-8 w-8 text-[#0052CC]" />,
                title: "Passion",
                description: "Our love for sports and technology drives us to create solutions that enhance the experience for fans, athletes, and organizations worldwide."
              },
              {
                icon: <Globe className="h-8 w-8 text-[#0052CC]" />,
                title: "Global Perspective",
                description: "We embrace diversity and recognize the global nature of sports, designing solutions that work across cultures and communities."
              },
              {
                icon: <Award className="h-8 w-8 text-[#0052CC]" />,
                title: "Integrity",
                description: "We operate with honesty, transparency, and ethical practices, building trust and lasting relationships with our clients and partners."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Meet Our Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-medium py-1.5 px-4 rounded-full mb-4 border border-blue-100/50">
              <Users size={16} className="mr-2" />
              OUR TEAM
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet the Minds Behind TechSports
            </h2>
            <p className="text-gray-600">
              Our diverse team of experts brings together decades of experience in sports, technology, engineering, and design to create innovative solutions that transform the industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Chief Executive Officer",
                image: "/images/about/team/sarah-johnson.jpg",
                bio: "With 20+ years of experience in sports technology, Sarah has led TechSports to become an industry leader since co-founding the company in 2008."
              },
              {
                name: "David Chen",
                role: "Chief Technology Officer",
                image: "/images/about/team/david-chen.jpg",
                bio: "David oversees all technological developments at TechSports, bringing his background in computer engineering and passion for sports to drive innovation."
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Product Design",
                image: "/images/about/team/michael-rodriguez.jpg",
                bio: "Michael leads our design team, ensuring all TechSports products combine cutting-edge functionality with intuitive, user-friendly design."
              },
              {
                name: "Aisha Patel",
                role: "Global Sales Director",
                image: "/images/about/team/aisha-patel.jpg",
                bio: "With a background in professional sports management, Aisha has expanded TechSports' presence to over 20 countries worldwide."
              },
              {
                name: "James Wilson",
                role: "Chief Operations Officer",
                image: "/images/about/team/james-wilson.jpg",
                bio: "James ensures the smooth operation of all TechSports divisions, bringing his experience from both the technology and sports industries."
              },
              {
                name: "Elena Gomez",
                role: "Head of Research",
                image: "/images/about/team/elena-gomez.jpg",
                bio: "Elena leads our research team, exploring emerging technologies and their potential applications in the sports industry."
              },
              {
                name: "Robert Kim",
                role: "Client Success Director",
                image: "/images/about/team/robert-kim.jpg",
                bio: "Robert ensures all our clients receive exceptional support and training, maintaining our industry-leading 95% client retention rate."
              },
              {
                name: "Olivia Thompson",
                role: "Marketing Director",
                image: "/images/about/team/olivia-thompson.jpg",
                bio: "Olivia leads our marketing strategies, showcasing TechSports' innovations to sports organizations around the world."
              }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-md mb-6 aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000821]/90 via-[#000821]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex gap-2 mb-4">
                      <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-[#0052CC] transition-colors duration-300">
                        <Linkedin size={16} className="text-white" />
                      </a>
                      <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-[#0052CC] transition-colors duration-300">
                        <Twitter size={16} className="text-white" />
                      </a>
                      <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-[#0052CC] transition-colors duration-300">
                        <Mail size={16} className="text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-[#0052CC] font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company History Timeline */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-[400px] -right-[400px] w-[800px] h-[800px] rounded-full border-2 border-[#0052CC]/10"></div>
        <div className="absolute -bottom-[400px] -left-[400px] w-[800px] h-[800px] rounded-full border-2 border-[#0052CC]/10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-medium py-1.5 px-4 rounded-full mb-4 border border-blue-100/50">
              <Clock size={16} className="mr-2" />
              OUR JOURNEY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The TechSports Story
            </h2>
            <p className="text-gray-600">
              From our humble beginnings to becoming a global leader in sports technology, our journey has been defined by innovation, perseverance, and a passion for enhancing the sports experience.
            </p>
          </div>
          
          <div className="relative pl-8 border-l-2 border-[#0052CC]/30 max-w-3xl mx-auto">
            {[
              {
                year: "2008",
                title: "TechSports Founded",
                description: "Sarah Johnson and David Chen establish TechSports with a vision to revolutionize sports technology."
              },
              {
                year: "2010",
                title: "First Major Stadium Contract",
                description: "Secured our first major contract to provide technology solutions for a premier league stadium in Europe."
              },
              {
                year: "2012",
                title: "Launch of VenueConnect™ Platform",
                description: "Released our flagship product, transforming how venues manage their operations and fan engagement."
              },
              {
                year: "2014",
                title: "International Expansion",
                description: "Opened offices in Asia and Europe, beginning our global expansion journey."
              },
              {
                year: "2016",
                title: "100th Venue Milestone",
                description: "Celebrated equipping our 100th sports venue with TechSports technology."
              },
              {
                year: "2018",
                title: "Sports Technology Innovation Award",
                description: "Received the prestigious Global Sports Technology Innovation Award for our FanExperience platform."
              },
              {
                year: "2020",
                title: "Virtual Fan Engagement Solutions",
                description: "Developed innovative solutions enabling remote fan participation during global challenges."
              },
              {
                year: "2023",
                title: "500+ Venues Worldwide",
                description: "Reached the milestone of powering over 500 sports venues across 20+ countries."
              }
            ].map((milestone, index) => (
              <div key={index} className="mb-16 relative">
                <div className="absolute -left-[41px] w-20 h-20 bg-blue-50 rounded-full border-4 border-white flex items-center justify-center shadow-md">
                  <span className="text-[#0052CC] font-bold">{milestone.year}</span>
                </div>
                <div className="pt-2 pl-16">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-[#0052CC]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <Image
                src="/images/about/stadium-background.jpg"
                alt="Stadium"
                fill
                style={{ objectFit: 'cover' }}
                sizes="50vw"
              />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="md:max-w-lg text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to Transform Your Venue?</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-0">
                  Join hundreds of sports organizations worldwide who trust TechSports to deliver cutting-edge technology solutions. Let's create amazing experiences together.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
                <Link 
                  href="/contact" 
                  className="bg-[#0052CC] hover:bg-[#0039A6] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#0052CC]/30 flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
                >
                  Contact Us <ChevronRight size={18} className="ml-1" />
                </Link>
                <Link 
                  href="/products" 
                  className="bg-transparent border-2 border-[#0052CC] text-[#0052CC] font-semibold px-6 sm:px-8 py-2.5 sm:py-[14px] rounded-full hover:bg-blue-50 transition-all duration-300 flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
                >
                  View Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Office Locations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-medium py-1.5 px-4 rounded-full mb-4 border border-blue-100/50">
              <MapPin size={16} className="mr-2" />
              GLOBAL PRESENCE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Offices Worldwide
            </h2>
            <p className="text-gray-600">
              With headquarters and regional offices across the globe, we provide localized support and expertise to clients on every continent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                city: "Boston",
                country: "United States",
                address: "100 Technology Square, Boston, MA 02142",
                type: "Global Headquarters"
              },
              {
                city: "London",
                country: "United Kingdom",
                address: "25 Innovation Way, London, EC2A 4PX",
                type: "European Headquarters"
              },
              {
                city: "Singapore",
                country: "Singapore",
                address: "78 Shenton Way, #15-02, Singapore 079120",
                type: "Asia-Pacific Headquarters"
              },
              {
                city: "Sydney",
                country: "Australia",
                address: "420 George Street, Sydney, NSW 2000",
                type: "Regional Office"
              },
              {
                city: "Tokyo",
                country: "Japan",
                address: "Shibuya Scramble Square, 2-24-12 Shibuya, Tokyo",
                type: "Regional Office"
              },
              {
                city: "Berlin",
                country: "Germany",
                address: "Friedrichstraße 68, 10117 Berlin",
                type: "Regional Office"
              }
            ].map((office, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-md transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-[#0052CC]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{office.city}</h3>
                    <p className="text-gray-600">{office.country}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{office.address}</p>
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium py-1 px-2 rounded">
                  {office.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </main>
  );
} 