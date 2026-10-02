import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  PhoneCall,
  Landmark,
  Building,
  Briefcase,
  Factory,
  GraduationCap,
  Hospital,
  Home as HomeIcon,
  Headphones,
  Wrench,
  ShieldCheck,
  Settings,
  MapPin,
  Users,
  Calendar,
  Camera,
  Network,
  Lock,
  Flame,
  Tv,
  Trophy,
  Handshake,
  Cpu,
  FileText,
} from "lucide-react";
import { useData } from "../context/DataContext";
import Modal from "../components/Modal";

// ScrollReveal Wrapper Component
const ScrollReveal = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const ICON_MAP = {
  Award, CheckCircle2, Users, Landmark, Building, Briefcase, Factory, GraduationCap, Hospital,
  Home: HomeIcon, Headphones, Wrench, ShieldCheck, Settings, MapPin, PhoneCall, Calendar,
  Camera, Network, Lock, Flame, Tv, Trophy, Handshake, Cpu, FileText
};

const getIconComponent = (iconName) => {
  if (!iconName) return Award;
  return ICON_MAP[iconName] || Award;
};

// 6 Featured Core Services matching mockup
const FEATURED_SOLUTIONS = [
  {
    id: "cctv-surveillance",
    title: "CCTV Surveillance",
    shortDesc: "24/7 monitoring for your complete safety.",
    category: "Security",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    slug: "cctv-surveillance"
  },
  {
    id: "networking-solutions",
    title: "Networking",
    shortDesc: "Reliable & secure network infrastructure.",
    category: "Infrastructure",
    icon: Network,
    image: "/images/network_rack.jpg",
    slug: "networking-solutions"
  },
  {
    id: "access-control",
    title: "Access Control",
    shortDesc: "Smart access for better security.",
    category: "Physical Security",
    icon: Lock,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    slug: "access-control"
  },
  {
    id: "epabx-intercom",
    title: "EPABX / IP-PBX",
    shortDesc: "Advanced communication solutions for your business.",
    category: "Telecommunications",
    icon: PhoneCall,
    image: "/images/telecom_av.jpg",
    slug: "epabx-intercom"
  },
  {
    id: "fire-alarm-systems",
    title: "Fire Alarms",
    shortDesc: "Early detection, maximum protection.",
    category: "Life Safety",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    slug: "fire-alarm-systems"
  },
  {
    id: "audio-visual-solutions",
    title: "Audio Visual Systems",
    shortDesc: "Better communication, Greater collaboration.",
    category: "AV Systems",
    icon: Tv,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    slug: "audio-visual-solutions"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { 
    services, openQuoteModal, banners, 
    homeStats, homeWhoWeAre, homeAmcHeader, homeAmcCards, homeWhyChoose, homeBrands 
  } = useData();

  const [selectedService, setSelectedService] = useState(null);
  const [selectedAmc, setSelectedAmc] = useState(null);

  const activeBanners = (banners && banners.length > 0)
    ? banners.filter(b => b.isActive).sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  const displayBanners = activeBanners.length > 0 ? activeBanners : [
    {
      id: 'default-1',
      imageUrl: '/images/cctv_hero_bg.jpg',
      badgeText: 'ESTABLISHED 1989 • ELECTRONICS & TELECOM',
      title: 'Securing Businesses. Empowering Connectivity. Delivering Excellence Since 1989.',
      btn1Text: 'Get Free Site Survey',
      btn1Action: 'openQuoteModal',
      btn2Text: 'Request Quotation',
      btn2Action: 'openQuoteModal',
      btn3Text: 'Call Now',
      btn3Action: 'tel:+919822012345'
    }
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    if (displayBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % displayBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayBanners.length]);

  const activeIndex = currentHeroIndex < displayBanners.length ? currentHeroIndex : 0;
  const currentBanner = displayBanners[activeIndex] || displayBanners[0];

  const handleCtaClick = (action) => {
    if (!action) return;
    if (action === 'openQuoteModal' || action === 'quote' || action === 'survey') {
      openQuoteModal();
    } else if (action.startsWith('tel:') || action.startsWith('mailto:') || action.startsWith('http')) {
      window.location.href = action;
    } else if (action.startsWith('/')) {
      navigate(action);
    } else {
      openQuoteModal();
    }
  };

  const nextBanner = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % displayBanners.length);
  };

  const prevBanner = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + displayBanners.length) % displayBanners.length);
  };

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-16 bg-[#F2F2F2]">
      
      {/* ==================================================
          1. HERO CAROUSEL SECTION (Clean Slider Images Only)
      ================================================== */}
      <section className="relative min-h-[220px] xs:min-h-[280px] sm:min-h-[480px] lg:min-h-[520px] flex items-center justify-center bg-[#5C0000] overflow-hidden">
        {/* Carousel Background Images (Clear & Bright) */}
        {displayBanners.map((banner, idx) => (
          <div key={banner.id || idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <img
              src={banner.imageUrl || '/images/cctv_hero_bg.jpg'}
              alt={`JAY Electronics Hero ${idx + 1}`}
              className="w-full h-full object-contain sm:object-cover object-center max-sm:bg-[#5C0000] opacity-100 brightness-105 contrast-105"
            />
          </div>
        ))}

        {/* Carousel Indicator Dots */}
        {displayBanners.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 z-20 flex items-center justify-center gap-2">
            {displayBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-[#800000] shadow-md"
                    : "w-2.5 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ==================================================
          2. FLOATING STATISTICS SECTION (Trust Bar - Img 1 Color Theme + Img 2 Text & Numbers)
      ================================================== */}
      <ScrollReveal className="-mt-12 sm:-mt-16 lg:-mt-20 relative z-30">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-8 shadow-xl backdrop-blur-xl">
            
            {/* Desktop View: Grid (Exactly current desktop layout) */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {(homeStats && homeStats.length > 0 ? homeStats : [
                { id: 'stat-1', iconName: 'Award', value: '35+', label: 'Years of Excellence' },
                { id: 'stat-2', iconName: 'CheckCircle2', value: '1000+', label: 'Projects Completed' },
                { id: 'stat-3', iconName: 'Users', value: '500+', label: 'Happy Clients' },
                { id: 'stat-4', iconName: 'Landmark', value: '50+', label: 'Government Projects' },
                { id: 'stat-5', iconName: 'Building', value: '100+', label: 'Corporate Customers' }
              ]).map((stat, idx) => {
                const StatIcon = getIconComponent(stat.iconName);
                return (
                  <div
                    key={stat.id || idx}
                    className={`flex flex-col items-center text-center p-2 group ${idx > 0 ? 'pt-4 md:pt-2' : ''} ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                  >
                    {/* Blue Icon Container (Image 1 Color Theme) */}
                    <div className="w-13 h-13 rounded-full bg-[#F2F2F2] text-[#800000] flex items-center justify-center mb-3 shadow-xs border border-gray-200 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <StatIcon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {/* Dark Navy Number (Image 2 Content + Image 1 Style) */}
                    <span className="text-3xl sm:text-4xl font-black font-['Outfit'] text-[#5C0000] tracking-tight group-hover:scale-105 transition-transform">
                      {stat.value}
                    </span>

                    {/* Uppercase Text Label (Image 2 Content + Image 1 Style) */}
                    <span className="text-xs sm:text-sm font-bold text-[#6B6B6B] uppercase tracking-wider mt-1.5 leading-snug max-w-[170px]">
                      {stat.label}
                    </span>
                    {stat.sublabel && (
                      <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                        {stat.sublabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile View ONLY: Smooth Continuous Horizontal Auto-Scroll (Right to Left Marquee) */}
            <div className="block md:hidden overflow-hidden w-full py-1 no-scrollbar">
              <div className="animate-marquee-left flex gap-4 w-max">
                {[
                  ...(homeStats && homeStats.length > 0 ? homeStats : [
                    { id: 'stat-1', iconName: 'Award', value: '35+', label: 'Years of Excellence' },
                    { id: 'stat-2', iconName: 'CheckCircle2', value: '1000+', label: 'Projects Completed' },
                    { id: 'stat-3', iconName: 'Users', value: '500+', label: 'Happy Clients' },
                    { id: 'stat-4', iconName: 'Landmark', value: '50+', label: 'Government Projects' },
                    { id: 'stat-5', iconName: 'Building', value: '100+', label: 'Corporate Customers' }
                  ]),
                  ...(homeStats && homeStats.length > 0 ? homeStats : [
                    { id: 'stat-1', iconName: 'Award', value: '35+', label: 'Years of Excellence' },
                    { id: 'stat-2', iconName: 'CheckCircle2', value: '1000+', label: 'Projects Completed' },
                    { id: 'stat-3', iconName: 'Users', value: '500+', label: 'Happy Clients' },
                    { id: 'stat-4', iconName: 'Landmark', value: '50+', label: 'Government Projects' },
                    { id: 'stat-5', iconName: 'Building', value: '100+', label: 'Corporate Customers' }
                  ])
                ].map((stat, idx) => {
                  const StatIcon = getIconComponent(stat.iconName);
                  return (
                    <div
                      key={`mobile-stat-${stat.id || idx}-${idx}`}
                      className="w-44 shrink-0 flex flex-col items-center text-center p-3 bg-slate-50/90 border border-slate-200/90 rounded-2xl shadow-xs"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#F2F2F2] text-[#800000] flex items-center justify-center mb-2 shadow-xs border border-gray-200">
                        <StatIcon className="w-5 h-5 stroke-[2.2]" />
                      </div>

                      <span className="text-2xl font-black font-['Outfit'] text-[#5C0000] tracking-tight">
                        {stat.value}
                      </span>

                      <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mt-1 leading-snug max-w-[140px]">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          3. WHO WE ARE SECTION (Matching Reference Image)
      ================================================== */}
      <ScrollReveal>
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
            
            {/* Background Corporate Building Image on Far Right with Smooth Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none hidden lg:block opacity-30">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Corporate Architecture"
                className="w-full h-full object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              
              {/* Left Column: Intro & CTA */}
              <div className="lg:col-span-5 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 text-[#B45309] text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                  <span>Corporate Legacy & Reach</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B182B] font-['Outfit'] tracking-tight">
                  Who We Are
                </h2>

                <p className="text-sm sm:text-base text-[#6B6B6B] font-normal leading-relaxed">
                  Since 1989, JEPL has been a trusted name in system integration and infrastructure solutions. We specialize in delivering advanced security, communication and technology solutions to a wide range of industries, ensuring safety, efficiency and long-term value.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => navigate('/about')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#800000] text-[#5C0000] hover:bg-[#5C0000] hover:text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Categories */}
              <div className="lg:col-span-7">
                
                {/* Desktop View: Existing 3-Column Split View (Exact original layout) */}
                <div className="hidden sm:grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  
                  {/* Col 1 */}
                  <div className="space-y-4 sm:pr-3 py-1">
                    {/* Item 1: Business */}
                    <div 
                      className="flex flex-col items-center text-center p-3 sm:p-4 group cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-all"
                      onClick={() => navigate('/solutions')}
                    >
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <Building className="w-8 h-8 stroke-[1.8]" />
                      </div>
                      <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit'] mt-3 group-hover:text-[#0055FF] transition-colors">
                        Business
                      </h3>
                      <p className="text-xs text-[#6B6B6B] font-medium leading-snug mt-0.5">
                        Offices & Commercial Towers
                      </p>
                    </div>

                    {/* Horizontal Separator */}
                    <div className="border-t border-slate-100 pt-4">
                      {/* Item 4: Hospitals */}
                      <div 
                        className="flex flex-col items-center text-center p-3 sm:p-4 group cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-all"
                        onClick={() => navigate('/solutions')}
                      >
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#0D9488] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                          <Hospital className="w-8 h-8 stroke-[1.8]" />
                        </div>
                        <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit'] mt-3 group-hover:text-[#0055FF] transition-colors">
                          Hospitals
                        </h3>
                        <p className="text-xs text-[#6B6B6B] font-medium leading-snug mt-0.5">
                          Healthcare & Clinics
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="space-y-4 sm:px-3 py-1">
                    {/* Item 2: Industries */}
                    <div 
                      className="flex flex-col items-center text-center p-3 sm:p-4 group cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-all"
                      onClick={() => navigate('/solutions')}
                    >
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <Factory className="w-8 h-8 stroke-[1.8]" />
                      </div>
                      <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit'] mt-3 group-hover:text-[#0055FF] transition-colors">
                        Industries
                      </h3>
                      <p className="text-xs text-[#6B6B6B] font-medium leading-snug mt-0.5">
                        Factories & MIDC Units
                      </p>
                    </div>

                    {/* Horizontal Separator */}
                    <div className="border-t border-slate-100 pt-4">
                      {/* Item 5: Government */}
                      <div 
                        className="flex flex-col items-center text-center p-3 sm:p-4 group cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-all"
                        onClick={() => navigate('/solutions')}
                      >
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                          <Landmark className="w-8 h-8 stroke-[1.8]" />
                        </div>
                        <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit'] mt-3 group-hover:text-[#0055FF] transition-colors">
                          Government
                        </h3>
                        <p className="text-xs text-[#6B6B6B] font-medium leading-snug mt-0.5">
                          Municipal & Police Grids
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="space-y-4 sm:pl-3 py-1 col-span-2 sm:col-span-1">
                    {/* Item 3: Schools */}
                    <div 
                      className="flex flex-col items-center text-center p-3 sm:p-4 group cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-all"
                      onClick={() => navigate('/solutions')}
                    >
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-8 h-8 stroke-[1.8]" />
                      </div>
                      <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit'] mt-3 group-hover:text-[#0055FF] transition-colors">
                        Schools
                      </h3>
                      <p className="text-xs text-[#6B6B6B] font-medium leading-snug mt-0.5">
                        Institutes & Campuses
                      </p>
                    </div>

                    {/* Horizontal Separator */}
                    <div className="border-t border-slate-100 pt-4">
                      {/* Item 6: Residential */}
                      <div 
                        className="flex flex-col items-center text-center p-3 sm:p-4 group cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-all"
                        onClick={() => navigate('/solutions')}
                      >
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                          <HomeIcon className="w-8 h-8 stroke-[1.8]" />
                        </div>
                        <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit'] mt-3 group-hover:text-[#0055FF] transition-colors">
                          Residential
                        </h3>
                        <p className="text-xs text-[#6B6B6B] font-medium leading-snug mt-0.5">
                          Gated Societies & Villas
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Mobile View ONLY: 2 Columns x 3 Rows Grid */}
                <div className="grid grid-cols-2 gap-3 sm:hidden">
                  
                  {/* Icon 1: Business */}
                  <div 
                    className="flex flex-col items-center text-center p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 cursor-pointer active:scale-95 transition-all"
                    onClick={() => navigate('/solutions')}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shadow-md">
                      <Building className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] mt-2.5">
                      Business
                    </h3>
                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-snug mt-0.5">
                      Offices & Commercial Towers
                    </p>
                  </div>

                  {/* Icon 2: Industries */}
                  <div 
                    className="flex flex-col items-center text-center p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 cursor-pointer active:scale-95 transition-all"
                    onClick={() => navigate('/solutions')}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-md">
                      <Factory className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] mt-2.5">
                      Industries
                    </h3>
                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-snug mt-0.5">
                      Factories & MIDC Units
                    </p>
                  </div>

                  {/* Icon 3: Schools */}
                  <div 
                    className="flex flex-col items-center text-center p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 cursor-pointer active:scale-95 transition-all"
                    onClick={() => navigate('/solutions')}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                      <GraduationCap className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] mt-2.5">
                      Schools
                    </h3>
                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-snug mt-0.5">
                      Institutes & Campuses
                    </p>
                  </div>

                  {/* Icon 4: Hospitals */}
                  <div 
                    className="flex flex-col items-center text-center p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 cursor-pointer active:scale-95 transition-all"
                    onClick={() => navigate('/solutions')}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#0D9488] text-white flex items-center justify-center shadow-md">
                      <Hospital className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] mt-2.5">
                      Hospitals
                    </h3>
                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-snug mt-0.5">
                      Healthcare & Clinics
                    </p>
                  </div>

                  {/* Icon 5: Government */}
                  <div 
                    className="flex flex-col items-center text-center p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 cursor-pointer active:scale-95 transition-all"
                    onClick={() => navigate('/solutions')}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shadow-md">
                      <Landmark className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] mt-2.5">
                      Government
                    </h3>
                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-snug mt-0.5">
                      Municipal & Police Grids
                    </p>
                  </div>

                  {/* Icon 6: Residential */}
                  <div 
                    className="flex flex-col items-center text-center p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 cursor-pointer active:scale-95 transition-all"
                    onClick={() => navigate('/solutions')}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-md">
                      <HomeIcon className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] mt-2.5">
                      Residential
                    </h3>
                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-snug mt-0.5">
                      Gated Societies & Villas
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          4. OUR SOLUTIONS & SERVICES (Matching Image Mockup)
      ================================================== */}
      <ScrollReveal>
        <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8E6E6] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md border border-[#800000]/20 space-y-8">
            
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#800000]/20 pb-5">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-[#800000]/10 border border-[#800000]/30 text-[#800000] text-xs font-bold uppercase tracking-wider inline-block mb-2">
                  Core Capabilities
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
                  Our Solutions & Services
                </h2>
              </div>
              
              <Link
                to="/solutions"
                className="bg-[#800000] hover:bg-[#5C0000] text-white border border-red-900/40 font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer w-fit"
              >
                <span>View All 11 Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Desktop View: Grid (Exact original desktop mockup layout) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_SOLUTIONS.map((item) => {
                const CardIcon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between border border-slate-100 group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/solutions/${item.slug}`)}
                  >
                    <div>
                      {/* Image Thumbnail Container */}
                      <div className="h-44 overflow-hidden relative bg-slate-900">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                        
                        {/* Round Icon Badge Overlaid on bottom left */}
                        <div className="w-10 h-10 rounded-full bg-[#5C0000] text-white flex items-center justify-center shadow-md border-2 border-white absolute -bottom-5 left-4 z-10">
                          <CardIcon className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="pt-7 px-5 pb-4 space-y-2">
                        <h3 className="text-lg font-black text-slate-900 font-['Outfit'] group-hover:text-[#800000] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed">
                          {item.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Footer link */}
                    <div className="px-5 pb-5">
                      <span className="text-xs font-bold text-[#800000] hover:text-[#5C0000] inline-flex items-center gap-1">
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile View ONLY: Smooth Continuous Horizontal Auto-Scroll (Right to Left Marquee) */}
            <div className="block md:hidden overflow-hidden w-full py-2 no-scrollbar">
              <div className="animate-marquee-left flex gap-4 w-max">
                {[...FEATURED_SOLUTIONS, ...FEATURED_SOLUTIONS].map((item, idx) => {
                  const CardIcon = item.icon;
                  return (
                    <div
                      key={`mobile-sol-${item.id}-${idx}`}
                      className="w-[280px] shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between border border-slate-100 group transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/solutions/${item.slug}`)}
                    >
                      <div>
                        {/* Image Thumbnail Container - Responsive Image Fit */}
                        <div className="h-44 overflow-hidden relative bg-slate-900">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain bg-slate-900 group-hover:scale-105 transition-transform duration-500 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                          
                          {/* Round Icon Badge */}
                          <div className="w-10 h-10 rounded-full bg-[#5C0000] text-white flex items-center justify-center shadow-md border-2 border-white absolute -bottom-5 left-4 z-10">
                            <CardIcon className="w-5 h-5 stroke-[2]" />
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="pt-7 px-5 pb-4 space-y-2 text-left">
                          <h3 className="text-base font-black text-slate-900 font-['Outfit'] group-hover:text-[#800000] transition-colors leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed">
                            {item.shortDesc}
                          </p>
                        </div>
                      </div>

                      {/* Footer link */}
                      <div className="px-5 pb-5 text-left">
                        <span className="text-xs font-bold text-[#800000] inline-flex items-center gap-1">
                          <span>Learn More</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          5. AMC — ANNUAL MAINTENANCE CONTRACT (Matching Reference Image)
      ================================================== */}
      <ScrollReveal>
        <section id="amc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            
            {/* Centered Header Row */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 text-[#B45309] text-xs font-bold uppercase tracking-wider mx-auto">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span>Comprehensive Support & Maintenance</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B182B] font-['Outfit'] tracking-tight">
                AMC - Annual Maintenance Contract
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                Keep your systems running at optimal performance with our reliable and comprehensive AMC services.
              </p>
            </div>

            {/* 4 AMC Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              {(homeAmcCards && homeAmcCards.length > 0 ? homeAmcCards : [
                {
                  id: 'amc-1',
                  title: 'Fire Alarm AMC',
                  description: 'Regular inspection & safety checks.',
                  iconName: 'Flame',
                  image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 'amc-2',
                  title: 'Networking AMC',
                  description: 'Network health & performance support.',
                  iconName: 'Network',
                  image: '/images/network_rack.jpg'
                },
                {
                  id: 'amc-3',
                  title: 'CCTV AMC',
                  description: '24/7 monitoring & preventive maintenance.',
                  iconName: 'Camera',
                  image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 'amc-4',
                  title: 'Access Control AMC',
                  description: 'Biometric, gate barrier & door lock maintenance.',
                  iconName: 'Lock',
                  image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'
                }
              ]).slice(0, 4).map((amc, idx) => {
                const AmcIcon = getIconComponent(amc.iconName);
                return (
                  <div
                    key={amc.id || idx}
                    onClick={() => setSelectedAmc(amc)}
                    className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Image with Icon Badge */}
                      <div className="h-36 rounded-xl overflow-hidden relative bg-slate-900">
                        <img
                          src={amc.image || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80'}
                          alt={amc.title}
                          className="w-full h-full object-contain sm:object-cover bg-slate-900 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="w-10 h-10 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-md border-2 border-white absolute -bottom-4 left-3 z-10">
                          <AmcIcon className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="pt-3 text-left space-y-1">
                        <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit'] group-hover:text-[#D97706] transition-colors leading-snug">
                          {amc.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-normal leading-relaxed">
                          {amc.description}
                        </p>
                      </div>
                    </div>

                    {/* Read More link */}
                    <div className="pt-3 text-left border-t border-slate-100 mt-2">
                      <span className="text-xs font-bold text-[#0055FF] group-hover:text-[#800000] inline-flex items-center gap-1 transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Right CTA Button: Opens Get a Quote Modal */}
            <div className="flex justify-end pt-2">
              <button
                onClick={openQuoteModal}
                className="bg-gradient-to-r from-[#D97706] via-[#CA8A04] to-[#B45309] hover:from-[#B45309] hover:to-[#78350F] text-white font-black text-xs sm:text-sm px-7 py-3 rounded-full shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 group active:scale-95"
              >
                <span>View AMC Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          6. BRANDS SECTION (OEM Partners Auto-Scroll Marquee)
      ================================================== */}
      <ScrollReveal>
        <section id="brands" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#800000]/10 border border-[#800000]/30 text-[#800000] text-xs font-bold uppercase tracking-wider inline-block">
                Technology OEM Partners
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B182B] font-['Outfit'] tracking-tight">
                Brands
              </h2>
            </div>

            {/* Continuous Marquee Container: Scrollable Left-to-Right */}
            <div className="overflow-hidden w-full py-3 no-scrollbar">
              <div className="animate-marquee-right flex gap-6">
                {[
                  ...(homeBrands && homeBrands.length > 0 ? homeBrands : []),
                  ...(homeBrands && homeBrands.length > 0 ? homeBrands : []),
                  ...(homeBrands && homeBrands.length > 0 ? homeBrands : []),
                ].map((brand, idx) => (
                  <div
                    key={idx}
                    onClick={openQuoteModal}
                    className="shrink-0 w-56 h-28 flex flex-col justify-center items-center bg-white border-2 border-slate-200 hover:border-[#800000] rounded-2xl p-4 text-center transition-all duration-300 group shadow-md hover:shadow-xl cursor-pointer hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-[#5C0000] text-white flex items-center justify-center text-xs font-black shadow-sm group-hover:bg-[#800000] transition-colors">
                        {brand.name ? brand.name.charAt(0) : 'B'}
                      </div>
                      <span className="text-base font-black text-[#0B182B] font-['Outfit'] group-hover:text-[#800000] transition-colors tracking-wide">
                        {brand.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#800000] bg-[#F8E6E6] border border-[#800000]/20 px-3 py-0.5 rounded-full uppercase tracking-wider">
                      {brand.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtext */}
            <div className="text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                ← Hover to pause & explore authorized OEM products →
              </span>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          7. OUR TEAM SECTION (4 Corporate Member Cards)
      ================================================== */}
      <ScrollReveal>
        <section id="our-team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#800000] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-red-900/40 space-y-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#800000]/20 border border-[#800000]/40 text-rose-200 text-xs font-bold uppercase tracking-wider inline-block">
                Leadership & Experts
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
                Our Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl mx-auto pt-1">
                Dedicated sales engineers, network architects, and 24/7 technical support specialists delivering excellence since 1989.
              </p>
            </div>

            {/* 4 Team Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: "member-1",
                  name: "Founder & Managing Director",
                  role: "Electronics & Telecom Visionary",
                  image: "/images/team_1.jpg",
                  desc: "35+ years leading turnkey telecommunication, city surveillance, and infrastructure projects across Maharashtra."
                },
                {
                  id: "member-2",
                  name: "Senior Network Architect",
                  role: "Lead Systems & Fiber Engineer",
                  image: "/images/team_2.jpg",
                  desc: "Specialist in enterprise LAN/WAN design, optical fiber splicing, and multi-location IP-PBX networks."
                },
                {
                  id: "member-3",
                  name: "Surveillance Project Head",
                  role: "City Surveillance Lead",
                  image: "/images/team_3.jpg",
                  desc: "Manages 4K camera deployments, ANPR grids, and police control room video wall integrations."
                },
                {
                  id: "member-4",
                  name: "AMC & Support Operations Head",
                  role: "24/7 Service Desk Lead",
                  image: "/images/team_4.jpg",
                  desc: "Directs SLA incident response, quarterly maintenance visits, and emergency spare part replacements."
                }
              ].map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 group transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    {/* Photo Container */}
                    <div className="h-40 sm:h-44 overflow-hidden relative bg-slate-900">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-contain sm:object-cover object-top sm:object-center bg-slate-900 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B182B] via-transparent to-transparent opacity-80"></div>
                      <span className="absolute bottom-2.5 left-2.5 bg-[#800000] text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                        {member.role}
                      </span>
                    </div>

                    {/* Member Details */}
                    <div className="p-4 text-left space-y-1.5">
                      <h3 className="text-sm sm:text-base font-extrabold text-[#0B182B] font-['Outfit'] group-hover:text-[#800000] transition-colors leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                        {member.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Accent */}
                  <div className="px-4 pb-3 pt-1 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      JAY ELECTRONICS
                    </span>
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-[#0B182B] group-hover:bg-[#800000] group-hover:text-white flex items-center justify-center transition-colors">
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* AMC Detail Modal */}
      <Modal
        isOpen={!!selectedAmc}
        onClose={() => setSelectedAmc(null)}
        title={selectedAmc?.title || ""}
      >
        {selectedAmc && (
          <div className="space-y-5">
            <div className="h-48 rounded-2xl overflow-hidden bg-[#5C0000] border-2 border-[#800000]/30 relative">
              <img src={selectedAmc.image} alt={selectedAmc.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <span className="absolute bottom-3 left-3 text-xs font-extrabold text-white bg-[#5C0000] px-3 py-1 rounded-lg">
                JAY ELECTRONICS SLA GUARANTEE
              </span>
            </div>

            <p className="text-sm text-[#6B6B6B] leading-relaxed font-normal">
              {selectedAmc.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                SLA Standard Deliverables
              </h4>
              <ul className="space-y-2 text-xs text-slate-800">
                {selectedAmc.features?.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedAmc(null)}
                className="px-4 py-2.5 text-xs font-bold text-[#6B6B6B] hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setSelectedAmc(null);
                  openQuoteModal();
                }}
                className="bg-[#5C0000] hover:bg-[#5C0000] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Sign Up for AMC Maintenance
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
