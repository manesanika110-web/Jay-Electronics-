import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { aboutData } from "../data/siteDetails";
import { useData } from "../context/DataContext";
import {
  Building2,
  CheckCircle2,
  Award,
  ChevronRight,
  Shield,
  MapPin,
  Settings,
  Target,
  Eye,
  ShieldCheck,
  Users,
  PhoneCall,
  ArrowRight,
  Calendar,
  Building,
  Clock,
  UserCheck,
  Headphones,
  Sparkles,
  Network,
  Wrench,
  Camera,
  Folder
} from "lucide-react";

export default function AboutDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { aboutCards, openQuoteModal } = useData();

  const cardFromContext = (aboutCards || []).find(
    (c) => c.slug === slug || c.id === slug
  );
  const item = cardFromContext || aboutData[slug] || aboutData["company-profile"];

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-[#0B182B]">Page Not Found</h2>
        <p className="text-slate-600">The requested About Us page does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('/about')}
          className="bg-[#5C0000] text-white px-6 py-3 rounded-full font-bold hover:bg-[#5C0000] transition-all cursor-pointer shadow-md"
        >
          View About Us Overview
        </button>
      </div>
    );
  }

  // Render specific layout based on current page slug
  const currentSlug = item.slug || slug || "company-profile";

  return (
    <div className="w-full space-y-8 pt-6 sm:pt-8 pb-16 bg-[#F8FAFC] animate-fadeIn">
      
      {/* Main Content Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ==================================================
            1. COMPANY PROFILE LAYOUT
        ================================================== */}
        {currentSlug === "company-profile" && (
          <div className="space-y-10">
            
            {/* Top 2-Column Split: Image (Left) vs Description & Intro (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
              
              {/* Left Side: Professional Company / JEPL Image */}
              <div className="lg:col-span-5">
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-2 border-slate-200 relative bg-[#0B182B] group">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                    alt="Jay Electronics Private Limited Headquarters"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#0B182B]/90 backdrop-blur-md text-rose-200 border border-[#800000]/40 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                    <img src="/images/je_logo.png" alt="JE Logo" className="h-4 w-auto object-contain" />
                    <span>ESTABLISHED 1989</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#800000] text-slate-950 font-black text-[10px] px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
                    ISO 9001:2015 CERTIFIED
                  </div>
                </div>
              </div>

              {/* Right Side: Introduction & Detailed Description */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#800000] text-xs font-bold uppercase tracking-wider">
                  <Folder className="w-3.5 h-3.5 text-[#800000]" />
                  <span>COMPANY PROFILE</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B182B] font-['Outfit'] tracking-tight">
                  Jay Electronics <span className="text-[#800000]">Pvt. Ltd.</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                  Founded in 1989 by a qualified Electronics and Telecommunications Engineer, Jay Electronics Private Limited (JEPL) has grown into a premier technology integrator and infrastructure service provider with over <strong className="text-[#0B182B]">35+ years of engineering leadership</strong>.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  We specialize in end-to-end design, installation, civil works, optical fiber deployment, and maintenance of high-availability CCTV surveillance systems, enterprise IP-PBX telecom exchanges, LAN/WAN networking grids, audio-visual automation, and solar security setups across Maharashtra.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={openQuoteModal}
                    className="bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#111111] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2 border border-[#800000]/40"
                  >
                    <span>Get In Touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate('/about/our-story')}
                    className="bg-white hover:bg-[#0055FF] text-[#0055FF] hover:text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full border-2 border-[#0055FF] flex items-center gap-2 transition-all cursor-pointer shadow-md group"
                  >
                    <span>Read Our Story</span>
                    <ChevronRight className="w-4 h-4 text-[#0055FF] group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>

            </div>

            {/* Below Description: Key Highlights Section */}
            <div className="space-y-6">
              <div className="text-left space-y-2">
                <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B182B] font-['Outfit'] tracking-tight">
                  Key <span className="text-[#800000]">Highlights</span>
                </h2>
              </div>

              {/* 6 Clean Attractive Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Card 1 */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0B182B] text-white flex items-center justify-center shadow-md group-hover:bg-[#0055FF] group-hover:text-white transition-colors">
                    <ShieldCheck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] group-hover:text-[#0055FF] transition-colors">
                      ISO 9001:2015 Certified
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Certified Quality Management System delivering zero-defect installations and high quality benchmarks.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0B182B] text-white flex items-center justify-center shadow-md group-hover:bg-[#0055FF] group-hover:text-white transition-colors">
                    <Calendar className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] group-hover:text-[#0055FF] transition-colors">
                      35+ Years Engineering Legacy
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Founded in 1989 by a qualified Electronics & Telecommunications Engineer in Sangli.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0B182B] text-white flex items-center justify-center shadow-md group-hover:bg-[#0055FF] group-hover:text-white transition-colors">
                    <Award className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] group-hover:text-[#0055FF] transition-colors">
                      Authorized OEM Partnerships
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Authorized dealers for CP PLUS, Matrix Comsec, Dahua, Honeywell, Panasonic & D-Link.
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0B182B] text-white flex items-center justify-center shadow-md group-hover:bg-[#0055FF] group-hover:text-white transition-colors">
                    <Settings className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] group-hover:text-[#0055FF] transition-colors">
                      Turnkey Execution Capabilities
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Civil works, fiber optic splicing, equipment sourcing, and 24/7 SLA maintenance under one roof.
                    </p>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0B182B] text-white flex items-center justify-center shadow-md group-hover:bg-[#0055FF] group-hover:text-white transition-colors">
                    <Building className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] group-hover:text-[#0055FF] transition-colors">
                      500+ Executed Projects
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Turnkey integration for Government Collectorates, Police Stations, Hospitals, Courts & MIDCs.
                    </p>
                  </div>
                </div>

                {/* Card 6 */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0B182B] text-white flex items-center justify-center shadow-md group-hover:bg-[#0055FF] group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B182B] font-['Outfit'] group-hover:text-[#0055FF] transition-colors">
                      3 Operating Regional Hubs
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      Sangli (Head Office), Kolhapur (Regional Office), and Pune (Branch Office).
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==================================================
            2. OUR STORY LAYOUT (Only Owner Info & Branch Locations)
        ================================================== */}
        {currentSlug === "our-story" && (
          <div className="space-y-10">
            
            {/* Section 1: Owner / Founder Information & Portrait */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side: Owner / Founder Portrait */}
                <div className="lg:col-span-5">
                  <div className="w-full h-84 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-2 border-slate-700 relative bg-[#0B182B]">
                    <img
                      src="/images/founder.jpg"
                      alt="Founder & Managing Director - Jay Electronics Pvt. Ltd."
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B182B] via-[#0B182B]/85 to-transparent p-5 text-left">
                      <span className="text-rose-200 font-bold text-xs uppercase tracking-widest block">LEADERSHIP & VISION</span>
                      <h4 className="text-lg font-extrabold text-white font-['Outfit']">Founder & Managing Director</h4>
                      <p className="text-xs text-slate-300 font-medium">Electronics & Telecommunications Engineer</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Owner Information & Introduction */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
                  <span className="text-xs font-bold text-[#800000] uppercase tracking-widest block font-['Outfit']">OUR STORY & FOUNDER</span>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B182B] font-['Outfit'] tracking-tight">
                    35+ Years of Engineering Vision
                  </h2>

                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                    Jay Electronics Private Limited was founded in 1989 in Sangli by a qualified Electronics and Telecommunications Engineer as a self-employed engineering venture.
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Starting with core PBX and telecommunication installations, our founder guided the company into structured LAN/WAN networking, fiber optic laying, audio-visual automation, and pioneering city surveillance projects for municipal corporations and police departments across Sangli, Kolhapur, Pune, and Sambhajinagar.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-blue-100 text-xs sm:text-sm text-[#0B182B] font-semibold italic border-l-4 border-l-[#800000]">
                    "From a small engineering initiative to a trusted systems integrator, our commitment remains constant — bridging world-class technology with flawless local execution."
                  </div>
                </div>

              </div>
            </div>

            {/* Section 2: Company Branches & Office Locations */}
            <div className="space-y-6">
              <div className="text-left space-y-2">
                <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B182B] font-['Outfit'] tracking-tight">
                  Company Branches & <span className="text-[#800000]">Office Locations</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Branch 1: Sangli Head Office */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 text-left hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center shadow-md">
                    <MapPin className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#800000] uppercase tracking-widest block font-['Outfit']">HEAD OFFICE</span>
                  <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit']">Sangli Head Office</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    C.S. No. 60 A/2, Torna Apartments, Opp. AU Bank, Behind Vardhman Ceramics, College Corner, North Shivajinagar, Sangli 416416
                  </p>
                  <p className="text-xs text-[#800000] font-bold pt-1">Phone: +91 98220 12345</p>
                </div>

                {/* Branch 2: Kolhapur Regional Office */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 text-left hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center shadow-md">
                    <Building2 className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#800000] uppercase tracking-widest block font-['Outfit']">REGIONAL OFFICE</span>
                  <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit']">Kolhapur Regional Office</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Near Renuka Pathology, Ruikar Colony, Kolhapur 416 000
                  </p>
                  <p className="text-xs text-[#800000] font-bold pt-1">Sales & Regional Technical Support</p>
                </div>

                {/* Branch 3: Pune Branch Office */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 text-left hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center shadow-md">
                    <Building className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#800000] uppercase tracking-widest block font-['Outfit']">BRANCH OFFICE</span>
                  <h3 className="text-base font-extrabold text-[#0B182B] font-['Outfit']">Pune Branch Office</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    New Sangavi, Pune 411 027
                  </p>
                  <p className="text-xs text-[#800000] font-bold pt-1">Turnkey Infrastructure Projects Unit</p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==================================================
            3. LEADERSHIP LAYOUT
        ================================================== */}
        {currentSlug === "leadership" && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm text-left space-y-4">
              <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
              <h2 className="text-2xl font-black text-[#0B182B] font-['Outfit']">Leadership</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
                Our leadership team brings 35+ years of telecommunication and systems integration experience, driving innovation across City Surveillance, Smart Infrastructure, and Enterprise Security.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 space-y-3 hover:border-[#800000] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0B182B] font-['Outfit']">Managing Founder</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">35+ years experience. Electronics & Telecommunications Engineer.</p>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 space-y-3 hover:border-[#800000] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0B182B] font-['Outfit']">Service Engineering Managers</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Certified engineers in network routing and optical fiber domains.</p>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 space-y-3 hover:border-[#800000] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0B182B] font-['Outfit']">Sales & Project Heads</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Experts in municipal tenders and turnkey infrastructure projects.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            4. OUR TEAM LAYOUT
        ================================================== */}
        {currentSlug === "our-team" && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm text-center max-w-4xl mx-auto space-y-3">
              <div className="w-10 h-1 bg-[#800000] rounded-full mx-auto"></div>
              <h2 className="text-2xl font-black text-[#0B182B] font-['Outfit']">Our Team</h2>
              <p className="text-sm sm:text-base font-extrabold text-[#0B182B] font-['Outfit'] leading-relaxed">
                Our success is driven by a passionate, highly skilled team of sales engineers, network architects, certified fiber technicians, and 24/7 customer service engineers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group text-left space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center shadow-md">
                  <Users className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-black text-[#0B182B] font-['Outfit'] uppercase leading-snug">
                  Sales & Pre-Sales Engineering
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Technical design, site survey, and BOM estimation.
                </p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group text-left space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center shadow-md">
                  <UserCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-black text-[#0B182B] font-['Outfit'] uppercase leading-snug">
                  Certified Installation Engineers
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Fiber splicing, CCTV rigging, EPABX programming, and AV acoustic tuning.
                </p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group text-left space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#0B182B] text-rose-200 flex items-center justify-center shadow-md">
                  <Headphones className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-black text-[#0B182B] font-['Outfit'] uppercase leading-snug">
                  24/7 AMC Support Desk
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Dedicated service helpdesk for immediate incident response and resolution.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fallback Layout for Unmatched Slugs */}
        {!["company-profile", "our-story", "leadership", "our-team"].includes(currentSlug) && (
          <div className="space-y-8 text-left">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
              <h2 className="text-2xl font-extrabold text-[#0B182B] font-['Outfit'] border-b border-slate-200 pb-3">
                {item.title} Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                {item.content}
              </p>
            </div>
          </div>
        )}

        {/* Action Call Banner */}
        {!["company-profile", "our-story"].includes(currentSlug) && (
          <div className="bg-[#0055FF] hover:bg-[#5C0000] transition-colors duration-500 text-white rounded-3xl p-6 sm:p-8 border-2 border-[#800000] flex flex-wrap items-center justify-between gap-4 shadow-xl text-left">
            <div>
              <h4 className="text-base font-black font-['Outfit'] text-white">Explore Our Engineering Capabilities</h4>
              <p className="text-xs text-slate-300">Contact our Sangli, Kolhapur, or Pune offices for project consultations.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/solutions')}
                className="bg-[#800000] hover:bg-[#5C0000] text-slate-950 px-5 py-2.5 rounded-full text-xs font-black cursor-pointer transition-all shadow-md"
              >
                View Our Solutions
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full text-xs font-bold border border-slate-600 cursor-pointer transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
