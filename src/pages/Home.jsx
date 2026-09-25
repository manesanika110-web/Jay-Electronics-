import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  HeartHandshake,
  Activity,
} from "lucide-react";
import { useData } from "../context/DataContext";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";
import ContactForm from "../components/ContactForm";

// ScrollReveal Wrapper Component for Smooth Bottom-to-Top Section Reveal
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
      className={`transition-all duration-800 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12 pointer-events-none"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const { services, projects, openQuoteModal } = useData();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAmc, setSelectedAmc] = useState(null);

  const heroImages = [
    "/images/cctv_hero_bg.jpg",
    "/images/cctv_hero_bg_2.jpg",
    "/images/cctv_hero_bg_3.jpg",
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
    <div className="space-y-16 sm:space-y-24 pb-20 animate-fadeIn bg-slate-50/50">
      {/* ==================================================
          1. HERO SECTION (Clear, Bright, Sharp & Compact Hero Banner)
      ================================================== */}
      <section className="relative min-h-[500px] lg:min-h-[560px] flex items-center justify-center bg-slate-950 overflow-hidden border-b-4 border-[#B5263F] shadow-xl">
        {/* Background Images Slider - Ultra Clear, Sharp & Bright */}
        {heroImages.map((imgSrc, idx) => (
          <img
            key={imgSrc}
            src={imgSrc}
            alt={`JAY Electronics Technology & Security Visual ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              idx === currentHeroIndex
                ? "opacity-95 brightness-115 contrast-105 saturate-105"
                : "opacity-0 pointer-events-none"
            }`}
          />
        ))}

        {/* Clean, Lightweight Vignette for Pristine Contrast without Darkening Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40 backdrop-contrast-105"></div>

        {/* Hero Content Box - Compact & Balanced */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white py-12 sm:py-16 space-y-4 sm:space-y-5">
          {/* Company Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#B5263F]/50 text-[#B5263F] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-md backdrop-blur-md hover:scale-105 transition-transform">
            <img
              src="/images/je_logo.png"
              alt="JE Logo"
              className="h-4 sm:h-5 w-auto object-contain"
            />
            <span className="border-l border-slate-300 pl-2">
              ESTABLISHED 1989 • ELECTRONICS & TELECOM
            </span>
          </div>

          {/* Main Headline - Compact & Visually Dominant */}
          <h1 className="text-xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight font-['Outfit'] leading-snug sm:leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-3xl mx-auto">
            Securing Businesses. Empowering Connectivity. Delivering Excellence
            Since 1989.
          </h1>

          {/* 3 CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Button 1: Get Free Site Survey */}
            <button
              onClick={openQuoteModal}
              className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#B5263F]/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer border border-rose-500/30"
            >
              <FileText className="w-4 h-4" />
              <span>Get Free Site Survey</span>
            </button>

            {/* Button 2: Request Quotation */}
            <button
              onClick={openQuoteModal}
              className="bg-slate-900/90 hover:bg-slate-950 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer border border-slate-700 backdrop-blur-md"
            >
              <span>Request Quotation</span>
              <ArrowRight className="w-4 h-4 text-rose-400" />
            </button>

            {/* Button 3: Call Now */}
            <a
              href="tel:+919822012345"
              className="bg-white hover:bg-slate-100 text-slate-900 hover:text-[#B5263F] font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2 border border-slate-200"
            >
              <PhoneCall className="w-4 h-4 text-[#B5263F]" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Hero Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentHeroIndex
                    ? "w-6 bg-[#B5263F]"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          2. STATISTICS SECTION (Floating Modern Dashboard Bar)
      ================================================== */}
      <ScrollReveal className="-mt-12 sm:-mt-16 lg:-mt-20 relative z-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center p-3 group relative">
                <div className="w-13 h-13 rounded-2xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-all duration-300 shadow-sm border border-rose-100">
                  <Award className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                  35+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mt-1.5">
                  Years of Excellence
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center p-3 group relative pt-6 md:pt-3">
                <div className="w-13 h-13 rounded-2xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-all duration-300 shadow-sm border border-rose-100">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                  1000+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mt-1.5">
                  Projects Completed
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center p-3 group relative pt-6 md:pt-3">
                <div className="w-13 h-13 rounded-2xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-all duration-300 shadow-sm border border-rose-100">
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                  500+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mt-1.5">
                  Happy Clients
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center p-3 group relative pt-6 lg:pt-3">
                <div className="w-13 h-13 rounded-2xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-all duration-300 shadow-sm border border-rose-100">
                  <Landmark className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                  50+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mt-1.5">
                  Government Projects
                </span>
              </div>

              {/* Stat 5 */}
              <div className="flex flex-col items-center text-center p-3 group relative pt-6 lg:pt-3 col-span-2 md:col-span-1">
                <div className="w-13 h-13 rounded-2xl bg-rose-50 text-[#B5263F] flex items-center justify-center mb-3 group-hover:bg-[#B5263F] group-hover:text-white transition-all duration-300 shadow-sm border border-rose-100">
                  <Building className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-[#B5263F] tracking-tight group-hover:scale-105 transition-transform">
                  100+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mt-1.5">
                  Corporate Customers
                </span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          3. WHO WE ARE SECTION
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Sectors Container */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-10">
          {/* Heading & Intro */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest shadow-2xs">
              <Shield className="w-4 h-4 text-[#B5263F]" />
              <span>Corporate Legacy & Reach</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              Who We Are
            </h2>
            <p className="text-base sm:text-xl font-bold text-[#B5263F] leading-relaxed">
              JEPL has been delivering security, communication, and technology
              solutions for more than three decades.
            </p>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              From high-security government establishments and municipal smart
              cities to heavy industrial MIDC complexes and commercial
              enterprises, we engineer and maintain robust technology
              infrastructure tailored to diverse domain requirements.
            </p>
          </div>

          {/* 6 Sectors Display (Image 2 style with circular glow icons and text) */}
          <div className="pt-2">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[2px] w-12 sm:w-16 bg-[#B5263F]/50 rounded-full"></div>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-700 text-center font-['Outfit']">
                Sectors We Empower
              </h3>
              <div className="h-[2px] w-12 sm:w-16 bg-[#B5263F]/50 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
              {[
                {
                  name: "Business",
                  icon: Briefcase,
                  tag: "Offices & Commercial Towers",
                },
                {
                  name: "Industries",
                  icon: Factory,
                  tag: "Factories & MIDC Units",
                },
                {
                  name: "Schools",
                  icon: GraduationCap,
                  tag: "Institutes & Campuses",
                },
                {
                  name: "Hospitals",
                  icon: Hospital,
                  tag: "Healthcare & Clinics",
                },
                {
                  name: "Government",
                  icon: Landmark,
                  tag: "Municipal & Police Grids",
                },
                {
                  name: "Residential",
                  icon: HomeIcon,
                  tag: "Gated Societies & Villas",
                },
              ].map((sector, idx) => {
                const SectorIcon = sector.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    {/* Circular Icon with Soft Maroon Glow */}
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white border border-rose-100 text-[#B5263F] group-hover:bg-[#B5263F] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_24px_rgba(181,38,63,0.22)] group-hover:shadow-[0_0_30px_rgba(181,38,63,0.45)] transform group-hover:scale-105">
                      <SectorIcon className="w-9 h-9 stroke-[1.8]" />
                    </div>

                    {/* Sector Title */}
                    <h4 className="text-base font-extrabold text-slate-900 font-['Outfit'] mt-3.5 group-hover:text-[#B5263F] transition-colors">
                      {sector.name}
                    </h4>

                    {/* Sector Subtitle Text */}
                    <p className="text-xs text-slate-500 font-medium leading-snug mt-1 max-w-[140px] mx-auto">
                      {sector.tag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Turnkey Solution Subsection */}
          <div className="pt-8 border-t border-slate-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#B5263F] block mb-1">
                  End-To-End Methodology
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                  Turnkey Solution
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium leading-relaxed">
                Complete end-to-end solutions from consultation to installation,
                training, and maintenance through a single technology partner.
              </p>
            </div>

            {/* Horizontal Flow Steps */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  icon: Headphones,
                  desc: "Site BOQ & Needs Analysis",
                },
                {
                  step: "02",
                  title: "Design",
                  icon: Cpu,
                  desc: "Architecture & OEM Specs",
                },
                {
                  step: "03",
                  title: "Installation",
                  icon: Wrench,
                  desc: "Cabling & Mounting",
                },
                {
                  step: "04",
                  title: "Testing",
                  icon: ShieldCheck,
                  desc: "Quality & Stress Audit",
                },
                {
                  step: "05",
                  title: "Training",
                  icon: Users,
                  desc: "Staff Operational Handover",
                },
                {
                  step: "06",
                  title: "Maintenance",
                  icon: Settings,
                  desc: "SLA Support & AMC",
                },
              ].map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="relative bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between aspect-square group hover:border-[#B5263F] transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#B5263F]/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white bg-rose-950/80 border border-rose-900/60 px-2.5 py-1 rounded-md font-mono">
                        {item.step}
                      </span>
                      <ItemIcon className="w-5 h-5 text-slate-400 group-hover:text-[#B5263F] transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-['Outfit'] text-white">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-snug mt-1.5">
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
      </ScrollReveal>

      {/* ==================================================
          4. TURNKEY TECHNOLOGY & SECURITY INFRASTRUCTURE
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full text-xs font-extrabold text-[#B5263F] uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                <span>High-Reliability Execution</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Outfit'] leading-tight">
                Turnkey Technology & Security Infrastructure
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-semibold text-slate-800 pt-2">
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 hover:border-rose-300 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#B5263F] shrink-0" />
                  <span>35+ Years Engineering Expertise</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 hover:border-rose-300 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#B5263F] shrink-0" />
                  <span>Government & Municipal Projects</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 hover:border-rose-300 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#B5263F] shrink-0" />
                  <span>Optical Fiber & 4K IP CCTV</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 hover:border-rose-300 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#B5263F] shrink-0" />
                  <span>Dedicated Technical Support</span>
                </div>
              </div>
            </div>

            {/* High Tech Surveillance Image Frame */}
            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[340px] bg-slate-950 border-l border-slate-200/80 overflow-hidden group">
              <img
                src="/images/city_surveillance.jpg"
                alt="City Surveillance Command Center"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent"></div>

              {/* HUD Status Overlay */}
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-rose-500/40 text-white px-3 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>LIVE SURVEILLANCE FEED</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          5. CLEAN CTA BANNER
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#8F1D32] via-[#A02138] to-[#B5263F] rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-[#B5263F]/20 flex flex-col md:flex-row items-center justify-between gap-8 border-b-4 border-[#6e1627]">
            <div className="space-y-2 text-center md:text-left max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] leading-snug">
                Looking for a reliable technology solution?
              </h3>
              <p className="text-sm sm:text-base text-rose-100 font-medium">
                Consult with our senior electronics & telecommunication engineers
                for your facility.
              </p>
            </div>
            <button
              onClick={() => navigate("/contact")}
              className="bg-white hover:bg-slate-100 text-[#B5263F] font-black text-sm px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all shrink-0 cursor-pointer border border-rose-100"
            >
              Contact Us Today
            </button>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          6. OUR SOLUTIONS & SERVICES (6 Cards)
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <span className="text-xs font-extrabold text-[#B5263F] uppercase tracking-widest block mb-1">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
              Our Solutions & Services
            </h2>
          </div>
          <Link
            to="/solutions"
            className="text-xs font-black text-[#B5263F] hover:text-[#8F1D32] flex items-center gap-1.5 uppercase tracking-wider bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/60 transition-colors w-fit"
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
      </ScrollReveal>

      {/* ==================================================
          7. FEATURED MAJOR PROJECTS
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
            <div>
              <span className="text-xs font-extrabold text-[#B5263F] uppercase tracking-widest block mb-1">
                Verified Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
                Major Executed Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-xs font-black text-[#B5263F] hover:text-[#8F1D32] flex items-center gap-1.5 uppercase tracking-wider bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/60 transition-colors w-fit"
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
      </ScrollReveal>

      {/* ==================================================
          8. AMC — ANNUAL MAINTENANCE CONTRACT
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest shadow-2xs">
              <Wrench className="w-4 h-4 text-[#B5263F]" />
              <span>Comprehensive SLA & Post-Commissioning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              AMC
            </h2>
            <p className="text-base sm:text-xl font-bold text-[#B5263F] leading-relaxed">
              Annual Maintenance Contract — installation नंतरची नियमित
              maintenance.
            </p>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Ensure continuous operational uptime and peak performance for your
              security, networking, and telecom infrastructure with Jay
              Electronics' annual maintenance services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "preventive-maintenance",
                title: "Preventive Maintenance",
                icon: Wrench,
                image: "/images/cctv_hero_bg.jpg",
                description:
                  "Periodic camera lens cleaning, hardware inspections, alignment optimization, and structural cable testing.",
                features: [
                  "Monthly/Quarterly site inspections & optical lens cleaning",
                  "Power supply voltage & connector rust/corrosion check",
                  "Camera field-of-view alignment & focus tuning",
                  "Network cabling health & RJ45/Fiber patch cord test",
                ],
              },
              {
                id: "emergency-support",
                title: "24×7 SLA Support",
                icon: Headphones,
                image: "/images/network_rack.jpg",
                description:
                  "Rapid dispatch of certified field engineers for critical system failures, NVR outages, and fiber breaks.",
                features: [
                  "2-Hour guaranteed emergency response for critical outages",
                  "Dedicated SLA hotline & priority senior engineer dispatch",
                  "On-site standby replacement units during repairs",
                  "Fiber optic OTDR testing & immediate fusion splicing",
                ],
              },
              {
                id: "spares-replacement",
                title: "Genuine Spares Backing",
                icon: ShieldCheck,
                image: "/images/telecom_av.jpg",
                description:
                  "Direct OEM spare parts replacement for CP PLUS, Matrix, Hikvision, and D-Link equipment.",
                features: [
                  "100% Original OEM spare parts (CP PLUS, Dahua, Hikvision, Matrix)",
                  "Direct manufacturer warranty & hassle-free replacement",
                  "Replacement of damaged power adapters, POE switches & hard drives",
                  "Transparent hardware replacement logs & reports",
                ],
              },
              {
                id: "system-audits",
                title: "System Health & Audits",
                icon: Settings,
                image: "/images/city_surveillance.jpg",
                description:
                  "Quarterly firmware updates, storage log verification, cybersecurity patch audits, and performance tuning.",
                features: [
                  "Quarterly system security & performance audit reports",
                  "NVR/DVR storage recording log verification & HDD bad sector scan",
                  "OEM Firmware upgrades & cybersecurity vulnerability patch audit",
                  "Network bandwidth & IP address conflict optimization",
                ],
              },
            ].map((amc) => {
              const AmcIcon = amc.icon;
              return (
                <div
                  key={amc.id}
                  onClick={() => setSelectedAmc(amc)}
                  className="bg-slate-50/80 border border-slate-200/80 hover:border-[#B5263F]/60 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:shadow-[#B5263F]/5 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 cursor-pointer"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-slate-950">
                      <img
                        src={amc.image}
                        alt={amc.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-[#B5263F] text-white p-2.5 rounded-xl shadow-md">
                        <AmcIcon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] group-hover:text-[#B5263F] transition-colors leading-snug">
                        {amc.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {amc.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAmc(amc);
                      }}
                      className="w-full bg-white hover:bg-[#B5263F] text-slate-800 hover:text-white border border-slate-200 hover:border-[#B5263F] font-extrabold text-xs py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer"
                    >
                      <span>Read More</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================================================
          9. INDUSTRIES SERVED
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#8F1D32] via-[#A02138] to-[#B5263F] border border-rose-800 rounded-3xl p-6 sm:p-12 shadow-2xl text-white space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-2xs">
                <Building2 className="w-4 h-4 text-rose-200" />
                <span>Cross-Domain Integration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight drop-shadow-sm">
                Industries Served
              </h2>
              <p className="text-sm sm:text-base text-rose-100 max-w-2xl mx-auto leading-relaxed">
                Customized electronic security, high-speed networking, and telecom
                deployments across 12 key sectors.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
              {[
                {
                  name: "Government",
                  icon: Landmark,
                  tag: "Collectorates & Municipalities",
                },
                {
                  name: "Police",
                  icon: ShieldAlert,
                  tag: "City Surveillance & Jails",
                },
                { name: "Hospitals", icon: Hospital, tag: "Healthcare & ICUs" },
                {
                  name: "Schools",
                  icon: GraduationCap,
                  tag: "K-12 & Academy Safety",
                },
                {
                  name: "Colleges",
                  icon: BookOpen,
                  tag: "Universities & Campuses",
                },
                { name: "Banks", icon: Coins, tag: "Financial & Vault Security" },
                {
                  name: "Factories",
                  icon: Factory,
                  tag: "MIDC Industrial Facilities",
                },
                { name: "Hotels", icon: Hotel, tag: "Hospitality & Resorts" },
                {
                  name: "Warehouses",
                  icon: Warehouse,
                  tag: "Logistics & Supply Hubs",
                },
                {
                  name: "Residential Societies",
                  icon: HomeIcon,
                  tag: "Gated Housing & Villas",
                },
                {
                  name: "Retail Stores",
                  icon: ShoppingBag,
                  tag: "Malls & Outlets",
                },
                {
                  name: "Agriculture",
                  icon: Sprout,
                  tag: "Agri-Processing & Farms",
                },
              ].map((ind, idx) => {
                const IndIcon = ind.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-950/90 border border-slate-800 text-white hover:bg-white hover:text-slate-900 hover:border-white rounded-2xl p-5 text-center space-y-3 transition-all duration-300 group shadow-md hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <div className="w-13 h-13 rounded-2xl bg-white/10 text-rose-300 border border-white/10 group-hover:bg-[#B5263F] group-hover:text-white group-hover:border-[#B5263F] flex items-center justify-center mx-auto transition-all duration-300 shadow-sm">
                      <IndIcon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-slate-900 font-['Outfit'] transition-colors">
                        {ind.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 group-hover:text-slate-600 font-medium leading-snug mt-1 transition-colors">
                        {ind.tag}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          10. WHY CHOOSE JEPL
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest shadow-2xs">
              <Award className="w-4 h-4 text-[#B5263F]" />
              <span>Proven Competitive Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              Why Choose JEPL
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Key strengths and capabilities that set JAY ELECTRONICS PVT LTD
              apart as Maharashtra's leading technology partner.
            </p>
          </div>

          <div className="relative overflow-hidden w-full py-4">
            <div className="flex gap-[40px] w-max animate-marquee">
              {[
                {
                  title: "35+ Years Experience",
                  icon: Award,
                  desc: "Established in 1989 with over 3 decades of field leadership.",
                },
                {
                  title: "Qualified Engineers",
                  icon: UserCheck,
                  desc: "Led directly by Electronics & Telecommunication Engineers.",
                },
                {
                  title: "Turnkey Execution",
                  icon: Layers,
                  desc: "Single-window consultation, cabling, mounting, and setup.",
                },
                {
                  title: "PAN Maharashtra Support",
                  icon: MapPin,
                  desc: "Active branches and field service in Sangli, Kolhapur & Pune.",
                },
                {
                  title: "Government Project Experience",
                  icon: Landmark,
                  desc: "Trusted execution for Smart City, Collectorates & Police.",
                },
                {
                  title: "AMC Services",
                  icon: ShieldCheck,
                  desc: "Comprehensive post-commissioning SLA and preventative care.",
                },
                {
                  title: "Trusted Brands",
                  icon: Star,
                  desc: "Direct authorized relationships with global technology leaders.",
                },
                {
                  title: "Customized Solutions",
                  icon: Sliders,
                  desc: "Tailored architecture meeting exact client site specifications.",
                },
                {
                  title: "24×7 Emergency Support",
                  icon: PhoneCall,
                  desc: "Round-the-clock technical helpline and rapid field dispatch.",
                },
                {
                  title: "Competitive Pricing",
                  icon: DollarSign,
                  desc: "Direct OEM rates and transparent cost estimation.",
                },
                {
                  title: "35+ Years Experience",
                  icon: Award,
                  desc: "Established in 1989 with over 3 decades of field leadership.",
                },
                {
                  title: "Qualified Engineers",
                  icon: UserCheck,
                  desc: "Led directly by Electronics & Telecommunication Engineers.",
                },
                {
                  title: "Turnkey Execution",
                  icon: Layers,
                  desc: "Single-window consultation, cabling, mounting, and setup.",
                },
                {
                  title: "PAN Maharashtra Support",
                  icon: MapPin,
                  desc: "Active branches and field service in Sangli, Kolhapur & Pune.",
                },
                {
                  title: "Government Project Experience",
                  icon: Landmark,
                  desc: "Trusted execution for Smart City, Collectorates & Police.",
                },
                {
                  title: "AMC Services",
                  icon: ShieldCheck,
                  desc: "Comprehensive post-commissioning SLA and preventative care.",
                },
                {
                  title: "Trusted Brands",
                  icon: Star,
                  desc: "Direct authorized relationships with global technology leaders.",
                },
                {
                  title: "Customized Solutions",
                  icon: Sliders,
                  desc: "Tailored architecture meeting exact client site specifications.",
                },
                {
                  title: "24×7 Emergency Support",
                  icon: PhoneCall,
                  desc: "Round-the-clock technical helpline and rapid field dispatch.",
                },
                {
                  title: "Competitive Pricing",
                  icon: DollarSign,
                  desc: "Direct OEM rates and transparent cost estimation.",
                },
              ].map((strength, idx) => {
                const StrengthIcon = strength.icon;
                return (
                  <div
                    key={idx}
                    className="relative shrink-0 w-[240px] h-[240px] bg-slate-50/90 hover:bg-white border border-[#555555] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-[0_4px_20px_rgba(181,38,63,0.2)] hover:shadow-[0_8px_30px_rgba(181,38,63,0.35)] hover:border-[#B5263F] overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-[#B5263F] text-[#B5263F] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs border border-slate-200">
                        <StrengthIcon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] group-hover:text-[#B5263F] transition-colors leading-snug">
                        {strength.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {strength.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================================================
          11. CORE VALUES
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#8F1D32] via-[#A02138] to-[#B5263F] border border-rose-800 rounded-3xl p-6 sm:p-12 shadow-2xl text-white space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-rose-200" />
                <span>Our Guiding Principles</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight drop-shadow-sm">
                Core Values
              </h2>
              <p className="text-sm sm:text-base text-rose-100 max-w-2xl mx-auto leading-relaxed">
                The fundamental standards guiding our corporate culture,
                engineering quality, and client trust.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {[
                {
                  title: "Integrity",
                  icon: ShieldCheck,
                  desc: "Uncompromising honesty, transparency, and ethical business conduct.",
                },
                {
                  title: "Innovation",
                  icon: Lightbulb,
                  desc: "Pioneering modern IP CCTV, active LED, and fiber infrastructure.",
                },
                {
                  title: "Quality",
                  icon: Award,
                  desc: "Adhering to ISO 9001:2015 benchmarks and zero-defect installation.",
                },
                {
                  title: "Commitment",
                  icon: HeartHandshake,
                  desc: "Delivering every project on time with full single-window accountability.",
                },
                {
                  title: "Customer First",
                  icon: Users,
                  desc: "Building long-term client relationships centered on responsiveness.",
                },
                {
                  title: "Continuous Improvement",
                  icon: TrendingUp,
                  desc: "Regularly training field engineers and adopting cutting-edge tools.",
                },
                {
                  title: "Safety",
                  icon: Lock,
                  desc: "Ensuring absolute life safety and site protection across all deployments.",
                },
                {
                  title: "Teamwork",
                  icon: Users,
                  desc: "Synergy between technical designers, field technicians, and support staff.",
                },
              ].map((val, idx) => {
                const ValIcon = val.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-white/30 text-slate-900 hover:bg-slate-950 hover:text-white hover:border-slate-800 rounded-2xl p-5 space-y-3 transition-all duration-300 group shadow-md hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <div className="w-11 h-11 rounded-xl bg-rose-50 text-[#B5263F] border border-rose-100 group-hover:bg-[#B5263F] group-hover:text-white group-hover:border-[#B5263F] flex items-center justify-center transition-all duration-300 shadow-xs">
                      <ValIcon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-white font-['Outfit'] transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-normal transition-colors">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          12. BRANDS
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest shadow-2xs">
              <Cpu className="w-4 h-4 text-[#B5263F]" />
              <span>Technology OEM Partners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              Brands
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We integrate genuine products and hardware from global technology
              leaders.
            </p>
          </div>

          <div className="relative overflow-hidden w-full py-2">
            <div className="flex gap-[40px] w-max animate-marquee">
              {[
                {
                  name: "CP PLUS",
                  category: "Authorized Dealer • Video Security",
                },
                { name: "Dahua", category: "HD IP CCTV & Thermal Imaging" },
                {
                  name: "Hikvision",
                  category: "Video Surveillance Infrastructure",
                },
                { name: "TP-Link", category: "Networking & SDN Gateways" },
                { name: "Cisco", category: "Enterprise Switches & Routing" },
                { name: "Netgear", category: "Managed Switches & NAS Storage" },
                { name: "Dell", category: "Servers & Control Room Computing" },
                { name: "Honeywell", category: "Addressable Fire Alarm Systems" },
                { name: "Bosch", category: "Life Safety & Public Address" },
                {
                  name: "Matrix",
                  category: "Authorized Dealer • EPABX & Access",
                },
                {
                  name: "CP PLUS",
                  category: "Authorized Dealer • Video Security",
                },
                { name: "Dahua", category: "HD IP CCTV & Thermal Imaging" },
                {
                  name: "Hikvision",
                  category: "Video Surveillance Infrastructure",
                },
                { name: "TP-Link", category: "Networking & SDN Gateways" },
                { name: "Cisco", category: "Enterprise Switches & Routing" },
                { name: "Netgear", category: "Managed Switches & NAS Storage" },
                { name: "Dell", category: "Servers & Control Room Computing" },
                { name: "Honeywell", category: "Addressable Fire Alarm Systems" },
                { name: "Bosch", category: "Life Safety & Public Address" },
                {
                  name: "Matrix",
                  category: "Authorized Dealer • EPABX & Access",
                },
              ].map((brand, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-center items-center shrink-0 min-w-[200px] h-[140px] bg-slate-50/80 hover:bg-white border border-[#222222] hover:border-[#B5263F] rounded-[18px] p-4 text-center space-y-2 transition-all duration-300 group shadow-md hover:shadow-xl hover:shadow-[#B5263F]/15 cursor-pointer transform hover:-translate-y-1"
                >
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-12 w-auto object-contain mx-auto"
                    />
                  ) : (
                    <div className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit'] group-hover:text-[#B5263F] transition-colors tracking-wide text-center">
                      {brand.name}
                    </div>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 group-hover:border-rose-200 group-hover:text-[#B5263F] transition-colors text-center">
                    {brand.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================================================
          13. OUR 8-STEP DELIVERY PROCESS
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#8F1D32] via-[#A02138] to-[#B5263F] border border-rose-800 rounded-3xl p-6 sm:p-12 shadow-2xl text-white space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-2xs">
                <Layers className="w-4 h-4 text-rose-200" />
                <span>Structured Execution Workflow</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight drop-shadow-sm">
                Our 8-Step Delivery Process
              </h2>
              <p className="text-sm sm:text-base text-rose-100 max-w-2xl mx-auto leading-relaxed">
                A systematic project implementation roadmap delivering zero-defect
                installations on schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: "01",
                  title: "Site Survey",
                  icon: MapPin,
                  desc: "On-site physical audit, mapping camera field-of-view & network points.",
                },
                {
                  num: "02",
                  title: "Requirement Analysis",
                  icon: FileText,
                  desc: "Evaluating coverage objectives, bandwidth specs & security risks.",
                },
                {
                  num: "03",
                  title: "System Design",
                  icon: Cpu,
                  desc: "Architecting IP node topology, storage calculation & fiber paths.",
                },
                {
                  num: "04",
                  title: "Proposal & BOQ",
                  icon: Sliders,
                  desc: "Submitting accurate Bill of Quantities (BOQ) with transparent OEM pricing.",
                },
                {
                  num: "05",
                  title: "Installation",
                  icon: Wrench,
                  desc: "Professional cabling, pole/wall mounting, rack setup & device rigging.",
                },
                {
                  num: "06",
                  title: "Testing & Commissioning",
                  icon: ShieldCheck,
                  desc: "Comprehensive system stress tests, video clarity check & latency audit.",
                },
                {
                  num: "07",
                  title: "Handover & Training",
                  icon: UserCheck,
                  desc: "Staff operational walkthrough, software manual & admin handover.",
                },
                {
                  num: "08",
                  title: "AMC & Lifelong Support",
                  icon: Headphones,
                  desc: "Regular preventive maintenance, firmware updates & 24/7 helpline.",
                },
              ].map((step) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="bg-slate-950/90 border border-slate-800 text-white hover:bg-white hover:text-slate-900 hover:border-white rounded-2xl p-6 space-y-4 transition-all duration-300 group shadow-md hover:shadow-2xl flex flex-col justify-between transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#B5263F] bg-rose-50 border border-rose-200/80 group-hover:bg-[#B5263F] group-hover:text-white group-hover:border-[#B5263F] px-3 py-1 rounded-md font-mono transition-colors">
                        Step {step.num}
                      </span>
                      <StepIcon className="w-5 h-5 text-rose-300 group-hover:text-[#B5263F] transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white group-hover:text-slate-900 font-['Outfit'] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-300 group-hover:text-slate-600 leading-relaxed mt-2 font-normal transition-colors">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          14. TESTIMONIALS / CLIENT FEEDBACK
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest shadow-2xs">
              <MessageSquare className="w-4 h-4 text-[#B5263F]" />
              <span>Client Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              Client Feedback
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Review Card 1 */}
            <div className="bg-slate-50/60 border border-slate-200/80 rounded-3xl p-7 sm:p-9 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl hover:shadow-slate-900/5 hover:border-slate-300 transition-all">
              <div className="space-y-4">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                {/* Quote Text */}
                <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed font-normal">
                  "JEPL has managed our co-operative bank's 32-branch CCTV
                  security and centralized cloud storage for over eight years.
                  Their technician response during routine RBI audits is prompt
                  and thoroughly professional."
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                  PK
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-['Outfit'] leading-tight">
                    Pravin Kulkarni
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    General Manager • Banking Sector
                  </p>
                </div>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-slate-50/60 border border-slate-200/80 rounded-3xl p-7 sm:p-9 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl hover:shadow-slate-900/5 hover:border-slate-300 transition-all">
              <div className="space-y-4">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                {/* Quote Text */}
                <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed font-normal">
                  "Deploying structured fiber cabling across an operating
                  automobile foundry was complex. JEPL executed the underground
                  conduits without halting a single minute of shift
                  manufacturing. Exemplary execution."
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80">
                <div className="w-12 h-12 rounded-2xl bg-[#B5263F] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                  SD
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-['Outfit'] leading-tight">
                    Sanjay Deshmukh
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    VP Operations • Kolhapur Auto Castings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================================================
          15. CTA SECTION
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#8F1D32] via-[#A02138] to-[#B5263F] rounded-3xl p-8 sm:p-14 text-white shadow-2xl shadow-[#B5263F]/20 flex flex-col md:flex-row items-center justify-between gap-8 border-b-4 border-[#6e1627]">
            <div className="space-y-3.5 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider border border-white/20">
                <Shield className="w-4 h-4 text-rose-300" />
                <span>Get Expert Consultation</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-['Outfit'] leading-tight drop-shadow-sm">
                Need a reliable technology partner?
              </h2>
              <p className="text-lg sm:text-xl font-bold text-rose-100">
                Contact JEPL today.
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Speak with our senior Electronics & Telecommunication Engineers
                for turnkey project design, BOQ estimates, and free site surveys.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#B5263F] font-black text-sm px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 transform hover:-translate-y-0.5 border border-rose-100"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={openQuoteModal}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-slate-700 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Get a Quote</span>
                <FileText className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================================================
          16. CONTACT SECTION
      ================================================== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#B5263F] text-xs font-extrabold uppercase tracking-widest shadow-2xs">
                <PhoneCall className="w-4 h-4 text-[#B5263F]" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                Contact Us
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Connect with JAY ELECTRONICS PVT LTD headquarters for tenders,
                project inquiries, and technical consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Column: Contact Cards & Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-5">
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] border-b border-slate-200/80 pb-4 flex items-center gap-2.5">
                    <Building2 className="w-5 h-5 text-[#B5263F]" />
                    <span>Corporate Head Office</span>
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                    {/* Address */}
                    <div className="flex items-start gap-3.5">
                      <MapPin className="w-5 h-5 text-[#B5263F] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-slate-900">
                          JAY ELECTRONICS PVT LTD
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Electronics & Telecommunication Hub,
                          <br />
                          Sangli - Kolhapur Highway Corridor, Maharashtra, India.
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3.5 pt-3 border-t border-slate-200/80">
                      <Phone className="w-5 h-5 text-[#B5263F] shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-slate-900">
                          Phone / Telephone
                        </h4>
                        <a
                          href="tel:+919822012345"
                          className="text-xs font-bold text-[#B5263F] hover:underline block mt-0.5"
                        >
                          +91 98220 12345 / 0233-230000
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3.5 pt-3 border-t border-slate-200/80">
                      <Mail className="w-5 h-5 text-[#B5263F] shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-slate-900">
                          Official Email
                        </h4>
                        <a
                          href="mailto:info@jayelectronics.com"
                          className="text-xs font-bold text-[#B5263F] hover:underline block mt-0.5"
                        >
                          info@jayelectronics.com
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-3.5 pt-3 border-t border-slate-200/80">
                      <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-slate-900">
                          WhatsApp Connect
                        </h4>
                        <a
                          href="https://wa.me/919822012345?text=Hello%20JAY%20Electronics%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <span>Chat on +91 98220 12345</span>
                        </a>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-center gap-3.5 pt-3 border-t border-slate-200/80">
                      <Clock className="w-5 h-5 text-[#B5263F] shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-slate-900">
                          Business Hours
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Monday - Saturday: 9:30 AM - 7:00 PM
                        </p>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="flex items-center gap-3.5 pt-3 border-t border-slate-200/80">
                      <Headphones className="w-5 h-5 text-[#B5263F] shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-slate-900">
                          24/7 Emergency Support
                        </h4>
                        <p className="text-xs font-bold text-[#B5263F] mt-0.5">
                          SLA Hotline: +91 98220 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Map Box */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#B5263F]" />
                    <span>Sangli Headquarters Location Map</span>
                  </h4>
                  <div className="h-60 rounded-xl overflow-hidden border border-slate-200/80 relative bg-slate-950 shadow-inner">
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
      </ScrollReveal>

      {/* Service Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ""}
      >
        {selectedService && (
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-xs font-bold text-[#B5263F] uppercase tracking-wider">
                Category: {selectedService.category}
              </span>
              <span className="text-xs font-bold text-slate-500">
                JAY ELECTRONICS PVT LTD
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Deliverables & Technical Features
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-800">
                {selectedService.features?.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0 mt-0.5" />
                    <span className="font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 text-xs font-extrabold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  setSelectedService(null);
                  openQuoteModal();
                }}
                className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Request Quotation for Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Project Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ""}
      >
        {selectedProject && (
          <div className="space-y-5">
            <div className="h-52 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shrink-0">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="bg-[#B5263F] text-white px-3.5 py-1.5 rounded-lg shadow-2xs uppercase tracking-wider">
                Category: {selectedProject.category}
              </span>
              <span className="bg-slate-100 text-slate-800 border border-slate-200 px-3.5 py-1.5 rounded-lg">
                Location: {selectedProject.location}
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {selectedProject.details}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5 text-xs text-slate-800">
              <div>
                <span className="font-bold text-slate-900">
                  Deployed Technology:{" "}
                </span>
                <span className="text-slate-700 font-medium">
                  {selectedProject.technology}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-900">
                  Scope / Highlights:{" "}
                </span>
                <span className="text-[#B5263F] font-bold">
                  {selectedProject.stats}
                </span>
              </div>
            </div>

            <div className="pt-3 flex justify-end border-t border-slate-200">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 text-xs font-extrabold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* AMC Detail Modal */}
      <Modal
        isOpen={!!selectedAmc}
        onClose={() => setSelectedAmc(null)}
        title={selectedAmc?.title || ""}
      >
        {selectedAmc && (() => {
          const AmcIcon = selectedAmc.icon;
          return (
            <div className="space-y-5">
              <div className="relative h-52 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shrink-0">
                <img
                  src={selectedAmc.image}
                  alt={selectedAmc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-[#B5263F] text-white px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-2">
                  {AmcIcon && <AmcIcon className="w-4 h-4 text-white shrink-0" />}
                  <span>Annual Maintenance Contract (AMC)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                {AmcIcon && (
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#B5263F] border border-rose-100 flex items-center justify-center shrink-0 shadow-xs">
                    <AmcIcon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] leading-snug">
                    {selectedAmc.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    JAY ELECTRONICS PVT LTD
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {selectedAmc.description}
              </p>

              {selectedAmc.features && (
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    AMC Coverage & Technical Scope
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-800">
                    {selectedAmc.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200">
                <button
                  onClick={() => setSelectedAmc(null)}
                  className="px-5 py-2.5 text-xs font-extrabold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    setSelectedAmc(null);
                    openQuoteModal();
                  }}
                  className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Request Quotation for AMC</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
