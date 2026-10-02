import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  Award,
  Users,
  MapPin,
  Building,
  CheckCircle2,
  Camera,
  Network,
  PhoneCall,
  Tv,
  Monitor,
  Radio,
  Lock,
  Sun,
  Target,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-16 bg-[#F2F2F2] animate-fadeIn">
      
      {/* ==================================================
          1. HERO BANNER (Compact Height)
      ================================================== */}
      <section className="relative min-h-[200px] lg:min-h-[240px] flex items-center justify-center bg-[#0055FF] overflow-hidden">
        {/* Background Skyline Image */}
        <div className="absolute inset-0">
          <img
            src="/images/cctv_hero_bg.jpg"
            alt="JEPL Background"
            className="w-full h-full object-cover object-center opacity-85 brightness-105"
          />
        </div>

        {/* Subtle Dark Scrim Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B182B]/95 via-[#0B182B]/80 to-[#0B182B]/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8 space-y-3 text-left">
          
          {/* Top Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-[#800000]/40 text-rose-200 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md">
            <img src="/images/je_logo.png" alt="JE Logo" className="h-4 w-auto object-contain" />
            <span className="border-l border-slate-700 pl-2">FOUNDED IN 1989</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-['Outfit'] text-white max-w-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            About <span className="text-[#800000]">JAY ELECTRONICS PVT LTD</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Over three decades of engineering excellence in Surveillance, Telecommunication, Networking, and Audio/Video Projects.
          </p>
        </div>
      </section>

      {/* ==================================================
          2. MAIN STORY & WHY JEPL STANDS OUT (2-Column Grid)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Our Journey */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#800000]/10 border border-[#800000]/30 text-[#800000] text-xs font-bold uppercase tracking-wider inline-block">
                Our Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
                Building a Safer, Smarter Tomorrow
              </h2>
            </div>

            <p className="text-sm text-[#6B6B6B] font-medium leading-relaxed">
              Established in 1989, <strong className="text-[#5C0000]">JAY ELECTRONICS PVT. LTD.</strong> has grown into a trusted system integrator, delivering reliable and advanced security, telecommunication, networking and audio/video solutions across Maharashtra and beyond. From Municipal Corporations to Police Stations, District Courts and Hospitals, we have successfully executed a wide range of projects, helping build safer and smarter communities.
            </p>

            {/* Photo Card with 35+ Years Badge (Matching Mockup) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2">
              <div className="sm:col-span-8 h-48 rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                  alt="JEPL Headquarters"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center h-48">
                <span className="text-4xl font-black text-[#5C0000] font-['Outfit']">35+</span>
                <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mt-1 leading-snug">
                  Years of Experience
                </span>
                <div className="w-8 h-1 bg-[#800000] rounded-full mt-3"></div>
              </div>
            </div>

          </div>

          {/* Right Column: Why JEPL Stands Out */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#800000]/10 border border-[#800000]/30 text-[#800000] text-xs font-bold uppercase tracking-wider inline-block">
                Our Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
                Why JEPL Stands Out
              </h2>
            </div>

            <div className="space-y-4">
              
              {/* Stack Item 1 */}
              <div className="bg-slate-50 border border-slate-200/80 hover:border-red-900/50 rounded-2xl p-4 flex items-start gap-4 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-[#5C0000] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-[#5C0000] font-['Outfit'] group-hover:text-[#800000] transition-colors">
                    35+ Years of Experience
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed">
                    A legacy of trust, innovation and excellence since 1989.
                  </p>
                </div>
              </div>

              {/* Stack Item 2 */}
              <div className="bg-slate-50 border border-slate-200/80 hover:border-red-900/50 rounded-2xl p-4 flex items-start gap-4 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-[#5C0000] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-[#5C0000] font-['Outfit'] group-hover:text-[#800000] transition-colors">
                    Turnkey City Surveillance Deployments
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed">
                    Successfully implemented large-scale surveillance projects for cities, institutions and industries.
                  </p>
                </div>
              </div>

              {/* Stack Item 3 */}
              <div className="bg-slate-50 border border-slate-200/80 hover:border-red-900/50 rounded-2xl p-4 flex items-start gap-4 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-[#5C0000] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-[#5C0000] font-['Outfit'] group-hover:text-[#800000] transition-colors">
                    Experienced Technical Service Team
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed">
                    Skilled engineers and dedicated support for quick and effective solutions.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          3. OUR KEY ENGINEERING EXPERTISE (Grid of 8 Cards)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#800000]/10 border border-[#800000]/30 text-[#800000] text-xs font-bold uppercase tracking-wider inline-block mb-2">
                Our Expertise
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
                Our Key Engineering Expertise
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#6B6B6B] font-medium max-w-sm">
              We provide end-to-end solutions with advanced technology, professional execution and long-term support.
            </p>
          </div>

          {/* 8 Cards Grid (Matching Mockup) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "IP & Analog CCTV Systems",
                desc: "High-resolution surveillance for complete security.",
                icon: Camera,
                slug: "cctv-surveillance"
              },
              {
                title: "LAN/WAN Networking & Fiber Optics",
                desc: "Reliable connectivity for future-ready infrastructure.",
                icon: Network,
                slug: "networking-solutions"
              },
              {
                title: "EPABX / IP-PBX Telecommunication",
                desc: "Advanced communication for seamless business.",
                icon: PhoneCall,
                slug: "epabx-intercom"
              },
              {
                title: "Audio / Video Solutions & Boardroom Setup",
                desc: "Smart collaboration for modern workplaces.",
                icon: Tv,
                slug: "audio-visual-solutions"
              },
              {
                title: "Active LED Display Boards",
                desc: "High-impact digital displays for public & commercial spaces.",
                icon: Monitor,
                slug: "led-display-solutions"
              },
              {
                title: "Telecom Infrastructure & Radio Links",
                desc: "Strong & stable communication networks.",
                icon: Radio,
                slug: "networking-solutions"
              },
              {
                title: "Security & Biometric Access",
                desc: "Controlled entry for improved safety.",
                icon: Lock,
                slug: "access-control"
              },
              {
                title: "Solar Security Power Projects",
                desc: "Sustainable power for uninterrupted security.",
                icon: Sun,
                slug: "solar-security-solutions"
              },
            ].map((item, idx) => {
              const CardIcon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigate(`/solutions/${item.slug}`)}
                  className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#800000] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group shadow-xs hover:shadow-md cursor-pointer space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#F2F2F2] text-[#800000] flex items-center justify-center shadow-xs border border-gray-200 group-hover:bg-[#0055FF] group-hover:text-white transition-all">
                      <CardIcon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <h3 className="text-sm font-extrabold text-[#5C0000] font-['Outfit'] group-hover:text-[#0055FF] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <div className="w-7 h-7 rounded-full bg-[#F2F2F2] text-[#800000] group-hover:bg-[#0055FF] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          4. MISSION & APPROACH SECTION (Dark Backdrop Split Cards)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#5C0000] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center gap-5 border border-slate-100 group">
              <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80"
                  alt="Our Mission"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2 text-left">
                <span className="px-3 py-1 rounded-full bg-[#800000]/10 border border-[#800000]/30 text-[#800000] text-[11px] font-bold uppercase tracking-wider inline-block">
                  Our Mission
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  To provide advanced security and telecommunication infrastructure for a safer and connected world.
                </p>
              </div>
            </div>

            {/* Approach Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center gap-5 border border-slate-100 group">
              <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80"
                  alt="Our Approach"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2 text-left">
                <span className="px-3 py-1 rounded-full bg-[#800000]/10 border border-[#800000]/30 text-[#800000] text-[11px] font-bold uppercase tracking-wider inline-block">
                  Our Approach
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  We focus on precision quality checks and uninterrupted AMC support for long-term reliability.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
