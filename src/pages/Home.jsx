import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  PhoneCall, 
  Building2, 
  Cpu, 
  FileText,
  Users,
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
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  BookOpen,
  Coins,
  Hotel,
  Warehouse,
  ShoppingBag,
  Sprout,
  UserCheck,
  Layers,
  Star,
  Sliders,
  DollarSign,
  Lightbulb,
  TrendingUp,
  Lock,
  MessageSquare,
  MessageCircle,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { useData } from '../context/DataContext';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const navigate = useNavigate();
  const { services, projects, openQuoteModal } = useData();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const heroImages = [
    '/images/cctv_hero_bg.jpg',
    '/images/cctv_hero_bg_2.jpg',
    '/images/cctv_hero_bg_3.jpg',
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // First 6 core services highlight
  const highlightServices = services.slice(0, 6);
  
  // Featured major projects (Top 3)
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="space-y-16 pb-16 animate-fadeIn">
      
      {/* ==================================================
          1. HERO SECTION (Clear, Bright & Sharp Corporate Hero Banner)
      ================================================== */}
      <section className="relative min-h-[600px] lg:min-h-[660px] flex items-center justify-center bg-gray-950 overflow-hidden border-b-4 border-[#B5263F]">
        {/* Background Images Slider - Ultra Clear, Sharp & Bright */}
        {heroImages.map((imgSrc, idx) => (
          <img
            key={imgSrc}
            src={imgSrc}
            alt={`JAY Electronics Technology & Security Visual ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 ease-in-out ${
              idx === currentHeroIndex ? 'opacity-95 brightness-110 contrast-105' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}
        {/* Subtle Scrim for Pristine Contrast without Darkening Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/35 backdrop-contrast-105"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#B5263F] text-[#B5263F] text-xs font-bold uppercase tracking-widest shadow-md">
            <img src="/images/je_logo.png" alt="JE Logo" className="h-5 w-auto object-contain" />
            <span>ESTABLISHED 1989 • ELECTRONICS & TELECOM</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] max-w-4xl mx-auto">
            Securing Businesses. Empowering Connectivity. Delivering Excellence Since 1989.
          </h1>

          {/* Short Company Information Description */}
          <div>
            <p className="text-sm sm:text-base text-white max-w-3xl mx-auto leading-relaxed bg-black/60 backdrop-blur-md py-3.5 px-6 rounded-2xl font-medium shadow-lg border border-white/15 drop-shadow">
              JAY ELECTRONICS PRIVATE LIMITED is one of Maharashtra’s trusted system integration companies specializing in Electronic Security, CCTV Surveillance, Networking Infrastructure, Audio Visual Systems, Access Control, Telecom Solutions and Smart Technology Integration.
            </p>
          </div>

          {/* 3 CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            
            {/* Button 1: Get Free Site Survey */}
            <button
              onClick={openQuoteModal}
              className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Get Free Site Survey</span>
            </button>

            {/* Button 2: Request Quotation */}
            <button
              onClick={openQuoteModal}
              className="bg-[#333333] hover:bg-black text-white font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border border-gray-600"
            >
              <span>Request Quotation</span>
              <ArrowRight className="w-4 h-4 text-[#B5263F]" />
            </button>

            {/* Button 3: Call Now */}
            <a
              href="tel:+919822012345"
              className="bg-white hover:bg-gray-100 text-[#333333] hover:text-[#B5263F] font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 border border-gray-200"
            >
              <PhoneCall className="w-4 h-4 text-[#B5263F]" />
              <span>Call Now</span>
            </a>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. STATISTICS SECTION
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center p-3 group">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-colors duration-300 shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                35+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#333333] uppercase tracking-wider mt-1">
                Years of Excellence
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center p-3 group pt-6 md:pt-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-colors duration-300 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                1000+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#333333] uppercase tracking-wider mt-1">
                Projects Completed
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center p-3 group pt-6 md:pt-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-colors duration-300 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                500+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#333333] uppercase tracking-wider mt-1">
                Happy Clients
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center p-3 group pt-6 lg:pt-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-colors duration-300 shadow-xs">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                50+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#333333] uppercase tracking-wider mt-1">
                Government Projects
              </span>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col items-center text-center p-3 group pt-6 lg:pt-3 col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-colors duration-300 shadow-xs">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                100+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#333333] uppercase tracking-wider mt-1">
                Corporate Customers
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3. WHO WE ARE SECTION
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Sectors Container */}
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Heading & Intro */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>Corporate Legacy & Reach</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              Who We Are
            </h2>
            <p className="text-base sm:text-lg font-semibold text-[#B5263F] leading-relaxed">
              JEPL has been delivering security, communication, and technology solutions for more than three decades.
            </p>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From high-security government establishments and municipal smart cities to heavy industrial MIDC complexes and commercial enterprises, we engineer and maintain robust technology infrastructure tailored to diverse domain requirements.
            </p>
          </div>

          {/* 6 Sectors Cards Grid */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#333333] text-center mb-6">
              Sectors We Empower
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              
              {/* Sector 1: Business */}
              <div className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 text-center space-y-2 transition-all duration-200 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center mx-auto transition-colors shadow-xs">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#222222] font-['Outfit']">Business</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Offices & Commercial Towers</p>
              </div>

              {/* Sector 2: Industries */}
              <div className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 text-center space-y-2 transition-all duration-200 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center mx-auto transition-colors shadow-xs">
                  <Factory className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#222222] font-['Outfit']">Industries</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Factories & MIDC Units</p>
              </div>

              {/* Sector 3: Schools */}
              <div className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 text-center space-y-2 transition-all duration-200 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center mx-auto transition-colors shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#222222] font-['Outfit']">Schools</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Institutes & Campuses</p>
              </div>

              {/* Sector 4: Hospitals */}
              <div className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 text-center space-y-2 transition-all duration-200 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center mx-auto transition-colors shadow-xs">
                  <Hospital className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#222222] font-['Outfit']">Hospitals</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Healthcare & Clinics</p>
              </div>

              {/* Sector 5: Government */}
              <div className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 text-center space-y-2 transition-all duration-200 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center mx-auto transition-colors shadow-xs">
                  <Landmark className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#222222] font-['Outfit']">Government</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Municipal & Police Grids</p>
              </div>

              {/* Sector 6: Residential */}
              <div className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 text-center space-y-2 transition-all duration-200 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center mx-auto transition-colors shadow-xs">
                  <HomeIcon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#222222] font-['Outfit']">Residential</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Gated Societies & Villas</p>
              </div>

            </div>
          </div>

          {/* Turnkey Solution Subsection */}
          <div className="pt-6 border-t border-[#E0E0E0] space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#B5263F] block">
                  End-To-End Methodology
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#222222] font-['Outfit']">
                  Turnkey Solution
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xl font-medium">
                Complete end-to-end solutions from consultation to installation, training, and maintenance through a single technology partner.
              </p>
            </div>

            {/* Horizontal Flow Steps */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { step: '01', title: 'Consultation', icon: Headphones, desc: 'Site BOQ & Needs Analysis' },
                { step: '02', title: 'Design', icon: Cpu, desc: 'Architecture & OEM Specs' },
                { step: '03', title: 'Installation', icon: Wrench, desc: 'Cabling & Mounting' },
                { step: '04', title: 'Testing', icon: ShieldCheck, desc: 'Quality & Stress Audit' },
                { step: '05', title: 'Training', icon: Users, desc: 'Staff Operational Handover' },
                { step: '06', title: 'Maintenance', icon: Settings, desc: 'SLA Support & AMC' },
              ].map((item, idx, arr) => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.step} className="relative bg-[#0F172A] text-white p-4 rounded-xl border border-gray-800 space-y-2 flex flex-col justify-between group hover:border-[#B5263F] transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white bg-white/10 px-2 py-0.5 rounded font-mono">
                        {item.step}
                      </span>
                      <ItemIcon className="w-4 h-4 text-gray-400 group-hover:text-[#B5263F] transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-['Outfit'] text-white flex items-center gap-1">
                        <span>{item.title}</span>
                        {idx < arr.length - 1 && (
                          <ChevronRight className="w-3.5 h-3.5 text-[#B5263F] hidden lg:inline-block ml-auto" />
                        )}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-medium leading-tight mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          4. TURNKEY TECHNOLOGY & SECURITY INFRASTRUCTURE
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <div className="inline-block bg-[#F5F5F5] border border-[#E0E0E0] px-3 py-1 rounded text-xs font-bold text-[#B5263F] uppercase tracking-wider">
              High-Reliability Execution
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] font-['Outfit'] leading-tight">
              Turnkey Technology & Security Infrastructure
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#222222]">
              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded border border-[#E0E0E0]">
                <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0" />
                <span>35+ Years Engineering Expertise</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded border border-[#E0E0E0]">
                <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0" />
                <span>Government & Municipal Projects</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded border border-[#E0E0E0]">
                <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0" />
                <span>Optical Fiber & 4K IP CCTV</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded border border-[#E0E0E0]">
                <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0" />
                <span>Dedicated Technical Support</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[260px] bg-gray-900 border-l border-[#E0E0E0]">
            <img
              src="/images/city_surveillance.jpg"
              alt="City Surveillance Command Center"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#222222]/30 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* ==================================================
          3. CLEAN CTA BANNER
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#8F1D32] to-[#B5263F] rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit']">
              Looking for a reliable technology solution?
            </h3>
            <p className="text-sm text-gray-100">
              Consult with our senior electronics & telecommunication engineers for your facility.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white hover:bg-[#F5F5F5] text-[#B5263F] font-extrabold text-sm px-7 py-3.5 rounded-lg shadow-md transition-all shrink-0 cursor-pointer"
          >
            Contact Us Today
          </button>
        </div>
      </section>

      {/* ==================================================
          4. OUR SOLUTIONS & SERVICES (6 Cards)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#B5263F] uppercase tracking-widest block mb-1">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] font-['Outfit']">
              Our Solutions & Services
            </h2>
          </div>
          <Link
            to="/solutions"
            className="text-xs font-bold text-[#B5263F] hover:text-[#8F1D32] flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All 11 Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onLearnMore={(s) => setSelectedService(s)}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          5. FEATURED MAJOR PROJECTS
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#B5263F] uppercase tracking-widest block mb-1">
              Verified Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] font-['Outfit']">
              Major Executed Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-xs font-bold text-[#B5263F] hover:text-[#8F1D32] flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View Full Project Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          1. AMC — ANNUAL MAINTENANCE CONTRACT
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <Wrench className="w-3.5 h-3.5" />
              <span>Comprehensive SLA & Post-Commissioning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              AMC
            </h2>
            <p className="text-base sm:text-lg font-bold text-[#B5263F] leading-relaxed">
              Annual Maintenance Contract — installation नंतरची नियमित maintenance.
            </p>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ensure continuous operational uptime and peak performance for your security, networking, and telecom infrastructure with Jay Electronics' annual maintenance services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'preventive-maintenance',
                title: 'Preventive Maintenance',
                icon: Wrench,
                image: '/images/cctv_hero_bg.jpg',
                description: 'Periodic camera lens cleaning, hardware inspections, alignment optimization, and structural cable testing.'
              },
              {
                id: 'emergency-support',
                title: '24×7 SLA Support',
                icon: Headphones,
                image: '/images/network_rack.jpg',
                description: 'Rapid dispatch of certified field engineers for critical system failures, NVR outages, and fiber breaks.'
              },
              {
                id: 'spares-replacement',
                title: 'Genuine Spares Backing',
                icon: ShieldCheck,
                image: '/images/telecom_av.jpg',
                description: 'Direct OEM spare parts replacement for CP PLUS, Matrix, Hikvision, and D-Link equipment.'
              },
              {
                id: 'system-audits',
                title: 'System Health & Audits',
                icon: Settings,
                image: '/images/city_surveillance.jpg',
                description: 'Quarterly firmware updates, storage log verification, cybersecurity patch audits, and performance tuning.'
              }
            ].map((amc) => {
              const AmcIcon = amc.icon;
              return (
                <div
                  key={amc.id}
                  className="bg-[#F5F5F5] border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-40 overflow-hidden bg-gray-900">
                      <img
                        src={amc.image}
                        alt={amc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-[#B5263F] text-white p-2 rounded-lg shadow">
                        <AmcIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="text-lg font-extrabold text-[#222222] font-['Outfit'] group-hover:text-[#B5263F] transition-colors">
                        {amc.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {amc.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      onClick={openQuoteModal}
                      className="w-full bg-white hover:bg-[#B5263F] text-[#333333] hover:text-white border border-[#E0E0E0] hover:border-[#B5263F] font-extrabold text-xs py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <span>Read More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          2. INDUSTRIES SERVED
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5" />
              <span>Cross-Domain Integration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              Industries Served
            </h2>
            <p className="text-sm text-gray-600">
              Customized electronic security, high-speed networking, and telecom deployments across 12 key sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Government', icon: Landmark, tag: 'Collectorates & Municipalities' },
              { name: 'Police', icon: ShieldAlert, tag: 'City Surveillance & Jails' },
              { name: 'Hospitals', icon: Hospital, tag: 'Healthcare & ICUs' },
              { name: 'Schools', icon: GraduationCap, tag: 'K-12 & Academy Safety' },
              { name: 'Colleges', icon: BookOpen, tag: 'Universities & Campuses' },
              { name: 'Banks', icon: Coins, tag: 'Financial & Vault Security' },
              { name: 'Factories', icon: Factory, tag: 'MIDC Industrial Facilities' },
              { name: 'Hotels', icon: Hotel, tag: 'Hospitality & Resorts' },
              { name: 'Warehouses', icon: Warehouse, tag: 'Logistics & Supply Hubs' },
              { name: 'Residential Societies', icon: HomeIcon, tag: 'Gated Housing & Villas' },
              { name: 'Retail Stores', icon: ShoppingBag, tag: 'Malls & Outlets' },
              { name: 'Agriculture', icon: Sprout, tag: 'Agri-Processing & Farms' },
            ].map((ind, idx) => {
              const IndIcon = ind.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 text-center space-y-2.5 transition-all duration-300 group shadow-2xs hover:shadow-md transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center mx-auto transition-colors duration-300 shadow-xs border border-gray-100">
                    <IndIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#222222] font-['Outfit'] group-hover:text-[#B5263F] transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                      {ind.tag}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          3. WHY CHOOSE JEPL
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>Proven Competitive Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              Why Choose JEPL
            </h2>
            <p className="text-sm text-gray-600">
              Key strengths and capabilities that set JAY ELECTRONICS PVT LTD apart as Maharashtra's leading technology partner.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: '35+ Years Experience', icon: Award, desc: 'Established in 1989 with over 3 decades of field leadership.' },
              { title: 'Qualified Engineers', icon: UserCheck, desc: 'Led directly by Electronics & Telecommunication Engineers.' },
              { title: 'Turnkey Execution', icon: Layers, desc: 'Single-window consultation, cabling, mounting, and setup.' },
              { title: 'PAN Maharashtra Support', icon: MapPin, desc: 'Active branches and field service in Sangli, Kolhapur & Pune.' },
              { title: 'Government Project Experience', icon: Landmark, desc: 'Trusted execution for Smart City, Collectorates & Police.' },
              { title: 'AMC Services', icon: ShieldCheck, desc: 'Comprehensive post-commissioning SLA and preventative care.' },
              { title: 'Trusted Brands', icon: Star, desc: 'Direct authorized relationships with global technology leaders.' },
              { title: 'Customized Solutions', icon: Sliders, desc: 'Tailored architecture meeting exact client site specifications.' },
              { title: '24×7 Emergency Support', icon: PhoneCall, desc: 'Round-the-clock technical helpline and rapid field dispatch.' },
              { title: 'Competitive Pricing', icon: DollarSign, desc: 'Direct OEM rates and transparent cost estimation.' }
            ].map((strength, idx) => {
              const StrengthIcon = strength.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 space-y-2 transition-all duration-300 group shadow-2xs hover:shadow-md"
                >
                  <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs border border-gray-100">
                    <StrengthIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#222222] font-['Outfit'] group-hover:text-[#B5263F] transition-colors">
                    {strength.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-snug">
                    {strength.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          4. CORE VALUES
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Our Guiding Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              Core Values
            </h2>
            <p className="text-sm text-gray-600">
              The fundamental standards guiding our corporate culture, engineering quality, and client trust.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Integrity', icon: ShieldCheck, desc: 'Uncompromising honesty, transparency, and ethical business conduct.' },
              { title: 'Innovation', icon: Lightbulb, desc: 'Pioneering modern IP CCTV, active LED, and fiber infrastructure.' },
              { title: 'Quality', icon: Award, desc: 'Adhering to ISO 9001:2015 benchmarks and zero-defect installation.' },
              { title: 'Commitment', icon: HeartHandshake, desc: 'Delivering every project on time with full single-window accountability.' },
              { title: 'Customer First', icon: Users, desc: 'Building long-term client relationships centered on responsiveness.' },
              { title: 'Continuous Improvement', icon: TrendingUp, desc: 'Regularly training field engineers and adopting cutting-edge tools.' },
              { title: 'Safety', icon: Lock, desc: 'Ensuring absolute life safety and site protection across all deployments.' },
              { title: 'Teamwork', icon: Users, desc: 'Synergy between technical designers, field technicians, and support staff.' }
            ].map((val, idx) => {
              const ValIcon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 space-y-2 transition-all duration-300 group shadow-2xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs border border-gray-100">
                    <ValIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#222222] font-['Outfit'] group-hover:text-[#B5263F] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          5. BRANDS
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technology OEM Partners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              Brands
            </h2>
            <p className="text-sm text-gray-600">
              We integrate genuine products and hardware from global technology leaders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'CP PLUS', category: 'Authorized Dealer • Video Security' },
              { name: 'Dahua', category: 'HD IP CCTV & Thermal Imaging' },
              { name: 'Hikvision', category: 'Video Surveillance Infrastructure' },
              { name: 'TP-Link', category: 'Networking & SDN Gateways' },
              { name: 'Cisco', category: 'Enterprise Switches & Routing' },
              { name: 'Netgear', category: 'Managed Switches & NAS Storage' },
              { name: 'Dell', category: 'Servers & Control Room Computing' },
              { name: 'Honeywell', category: 'Addressable Fire Alarm Systems' },
              { name: 'Bosch', category: 'Life Safety & Public Address' },
              { name: 'Matrix', category: 'Authorized Dealer • EPABX & Access' },
            ].map((brand, idx) => (
              <div
                key={idx}
                className="bg-[#F5F5F5] hover:bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-4 text-center space-y-2 transition-all duration-300 group shadow-2xs hover:shadow-md flex flex-col justify-center items-center h-28"
              >
                <div className="text-base sm:text-lg font-black text-[#222222] font-['Outfit'] group-hover:text-[#B5263F] transition-colors tracking-wide">
                  {brand.name}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200 group-hover:border-rose-200 group-hover:text-[#B5263F] transition-colors">
                  {brand.category}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          6. OUR 8-STEP DELIVERY PROCESS
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>Structured Execution Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              Our 8-Step Delivery Process
            </h2>
            <p className="text-sm text-gray-600">
              A systematic project implementation roadmap delivering zero-defect installations on schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Site Survey', icon: MapPin, desc: 'On-site physical audit, mapping camera field-of-view & network points.' },
              { num: '02', title: 'Requirement Analysis', icon: FileText, desc: 'Evaluating coverage objectives, bandwidth specs & security risks.' },
              { num: '03', title: 'System Design', icon: Cpu, desc: 'Architecting IP node topology, storage calculation & fiber paths.' },
              { num: '04', title: 'Proposal & BOQ', icon: Sliders, desc: 'Submitting accurate Bill of Quantities (BOQ) with transparent OEM pricing.' },
              { num: '05', title: 'Installation', icon: Wrench, desc: 'Professional cabling, pole/wall mounting, rack setup & device rigging.' },
              { num: '06', title: 'Testing & Commissioning', icon: ShieldCheck, desc: 'Comprehensive system stress tests, video clarity check & latency audit.' },
              { num: '07', title: 'Handover & Training', icon: UserCheck, desc: 'Staff operational walkthrough, software manual & admin handover.' },
              { num: '08', title: 'AMC & Lifelong Support', icon: Headphones, desc: 'Regular preventive maintenance, firmware updates & 24/7 helpline.' }
            ].map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-[#0F172A] text-white border border-gray-800 hover:border-[#B5263F] rounded-xl p-5 space-y-3 transition-all duration-300 group shadow-md hover:shadow-xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white bg-white/10 px-2.5 py-1 rounded font-mono border border-white/10">
                      Step {step.num}
                    </span>
                    <StepIcon className="w-5 h-5 text-gray-400 group-hover:text-[#B5263F] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white font-['Outfit'] group-hover:text-rose-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          7. TESTIMONIALS / CLIENT FEEDBACK
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Client Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              Client Feedback
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Review Card 1 */}
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FF9800] text-[#FF9800]" />
                  ))}
                </div>
                {/* Quote Text */}
                <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed font-normal">
                  "JEPL has managed our co-operative bank's 32-branch CCTV security and centralized cloud storage for over eight years. Their technician response during routine RBI audits is prompt and thoroughly professional."
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-3.5 pt-2 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-[#0B132B] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  PK
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#222222] font-['Outfit'] leading-tight">
                    Pravin Kulkarni
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    General Manager • Banking Sector
                  </p>
                </div>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FF9800] text-[#FF9800]" />
                  ))}
                </div>
                {/* Quote Text */}
                <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed font-normal">
                  "Deploying structured fiber cabling across an operating automobile foundry was complex. JEPL executed the underground conduits without halting a single minute of shift manufacturing. Exemplary execution."
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-3.5 pt-2 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-[#C81E3D] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  SD
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#222222] font-['Outfit'] leading-tight">
                    Sanjay Deshmukh
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    VP Operations • Kolhapur Auto Castings
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          8. CTA SECTION
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#8F1D32] via-[#A02138] to-[#B5263F] rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-[#6e1627]">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider border border-white/20">
              <Shield className="w-3.5 h-3.5 text-rose-300" />
              <span>Get Expert Consultation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] leading-tight drop-shadow-sm">
              Need a reliable technology partner?
            </h2>
            <p className="text-base sm:text-lg font-bold text-rose-100">
              Contact JEPL today.
            </p>
            <p className="text-xs sm:text-sm text-gray-200">
              Speak with our senior Electronics & Telecommunication Engineers for turnkey project design, BOQ estimates, and free site surveys.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#B5263F] font-extrabold text-sm px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto bg-[#333333] hover:bg-black text-white font-extrabold text-sm px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-600 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <span>Get a Quote</span>
              <FileText className="w-4 h-4 text-[#B5263F]" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. CONTACT SECTION
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
              Contact Us
            </h2>
            <p className="text-sm text-gray-600">
              Connect with JAY ELECTRONICS PVT LTD headquarters for tenders, project inquiries, and technical consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Contact Cards & Info */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-[#222222] font-['Outfit'] border-b border-[#E0E0E0] pb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#B5263F]" />
                  <span>Corporate Head Office</span>
                </h3>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#555555]">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#B5263F] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-[#222222]">JAY ELECTRONICS PVT LTD</h4>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        Electronics & Telecommunication Hub,<br />
                        Sangli - Kolhapur Highway Corridor, Maharashtra, India.
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                    <Phone className="w-4 h-4 text-[#B5263F] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#222222]">Phone / Telephone</h4>
                      <a href="tel:+919822012345" className="text-xs font-semibold text-[#B5263F] hover:underline block">
                        +91 98220 12345 / 0233-230000
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                    <Mail className="w-4 h-4 text-[#B5263F] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#222222]">Official Email</h4>
                      <a href="mailto:info@jayelectronics.com" className="text-xs font-semibold text-[#B5263F] hover:underline block">
                        info@jayelectronics.com
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#222222]">WhatsApp Connect</h4>
                      <a
                        href="https://wa.me/919822012345?text=Hello%20JAY%20Electronics%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#25D366] hover:underline flex items-center gap-1"
                      >
                        <span>Chat on +91 98220 12345</span>
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                    <Clock className="w-4 h-4 text-[#B5263F] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#222222]">Business Hours</h4>
                      <p className="text-xs text-gray-600">Monday - Saturday: 9:30 AM - 7:00 PM</p>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                    <Headphones className="w-4 h-4 text-[#B5263F] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#222222]">24/7 Emergency Support</h4>
                      <p className="text-xs font-semibold text-[#B5263F]">SLA Hotline: +91 98220 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map Box */}
              <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#222222] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B5263F]" />
                  <span>Sangli Headquarters Location Map</span>
                </h4>
                <div className="h-56 rounded-lg overflow-hidden border border-[#E0E0E0] relative bg-gray-900">
                  <iframe
                    title="Jay Electronics Home Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61084.28892182069!2d74.55171732959828!3d16.852445100612984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc123b378033621%3A0x62957b44729f2ed2!2sSangli%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

            </div>

            {/* Right Column: Enquiry Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>

        </div>
      </section>

      {/* Service Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ''}
      >
        {selectedService && (
          <div className="space-y-4">
            <p className="text-sm text-[#555555] leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#222222] pt-2">
              Key Features & Engineering Deliverables
            </h4>

            <ul className="space-y-2 text-xs text-[#222222]">
              {selectedService.features?.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[#F5F5F5] p-2.5 rounded border border-[#E0E0E0]">
                  <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap items-center justify-end gap-3 border-t border-[#E0E0E0]">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  openQuoteModal();
                }}
                className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs px-5 py-2.5 rounded shadow cursor-pointer"
              >
                Request Quotation for Service
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Project Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-4">
            <div className="h-44 sm:h-48 rounded-lg overflow-hidden bg-gray-900 border border-[#B5263F] shrink-0">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-[#B5263F] text-white px-3 py-1 rounded">
                Category: {selectedProject.category}
              </span>
              <span className="bg-[#F5F5F5] text-[#333333] border border-[#E0E0E0] px-3 py-1 rounded">
                Location: {selectedProject.location}
              </span>
            </div>

            <p className="text-sm text-[#555555] leading-relaxed">
              {selectedProject.details}
            </p>

            <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#E0E0E0] space-y-2 text-xs text-[#222222]">
              <div>
                <span className="font-bold">Deployed Technology: </span>
                <span>{selectedProject.technology}</span>
              </div>
              <div>
                <span className="font-bold">Scope / Highlights: </span>
                <span className="text-[#B5263F] font-semibold">{selectedProject.stats}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end border-t border-[#E0E0E0]">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Service Detail Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ''}
      >
        {selectedService && (
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-[#F5F5F5] p-3 rounded-lg border border-[#E0E0E0]">
              <span className="text-xs font-bold text-[#B5263F] uppercase tracking-wider">
                Category: {selectedService.category}
              </span>
              <span className="text-xs font-semibold text-gray-500">
                JAY ELECTRONICS PVT LTD
              </span>
            </div>

            <p className="text-sm text-[#555555] leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#222222]">
                Deliverables & Technical Features
              </h4>
              <ul className="space-y-2 text-xs text-[#222222]">
                {selectedService.features?.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#F5F5F5] p-2.5 rounded border border-[#E0E0E0]">
                    <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-[#E0E0E0]">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  setSelectedService(null);
                  openQuoteModal();
                }}
                className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs px-5 py-2.5 rounded shadow cursor-pointer"
              >
                Request Quotation for Service
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}

