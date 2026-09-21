import React from 'react';
import { Shield, Award, Cpu, CheckCircle2, Target, Compass, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#333333] text-white p-8 sm:p-12 rounded-2xl border-2 border-[#B5263F] shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#333333] text-xs font-bold uppercase tracking-wider">
            <img src="/images/je_logo.png" alt="JE Logo" className="h-4 w-auto object-contain" />
            <span>FOUNDED IN 1989</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            About JAY ELECTRONICS PVT LTD
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Over three decades of engineering excellence in Surveillance, Telecommunication, Networking, and Audio/Video Projects.
          </p>
        </div>
      </div>

      {/* Grid of Structured Company Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Company Introduction */}
        <div className="lg:col-span-7 bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center text-[#B5263F]">
            <Award className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-[#222222] font-['Outfit']">
            Company Introduction
          </h2>

          <div className="space-y-3 text-sm text-[#555555] leading-relaxed">
            <p className="font-semibold text-[#222222]">
              JAY ELECTRONICS was founded in 1989 by a self-employed Electronics & Telecom Engineer.
            </p>
            <p>
              Over the past 35+ years, the organization has evolved into a premier engineering firm delivering end-to-end technology integration across municipal corporations, law enforcement, judicial complexes, government collectorates, sub-district hospitals, and corporate clients.
            </p>
            <p>
              Our operations are powered by a dedicated team of experienced sales professionals, system design engineers, and responsive field service support technicians focused on high availability and seamless project execution.
            </p>
          </div>
        </div>

        {/* Our Experience */}
        <div className="lg:col-span-5 bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center text-[#B5263F]">
            <Users className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-[#222222] font-['Outfit']">
            Our Experience
          </h2>

          <p className="text-sm text-[#555555] leading-relaxed">
            With decades of field experience, JAY ELECTRONICS has successfully built long-standing relationships with satisfied institutional clients throughout Maharashtra.
          </p>

          <div className="space-y-2 pt-2">
            {[
              '35+ Years in Active Engineering Operation',
              'Turnkey City Surveillance Deployments',
              'Experienced Field Service & Support Staff',
              'Proven Execution in Government & Judicial Hubs'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#222222] bg-[#F5F5F5] p-2.5 rounded border border-[#E0E0E0]">
                <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Our Expertise Card */}
      <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#B5263F] text-white flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-[#222222] font-['Outfit']">
            Our Key Engineering Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'IP & Analog CCTV Systems', desc: '4K IP cameras, thermal imaging, ANPR analytics, and command room VMS.' },
            { title: 'LAN/WAN Networking', desc: 'Fiber optic backbones, managed Layer 2/3 switching, enterprise firewalls.' },
            { title: 'EPABX / IP-PBX Systems', desc: 'Voice PBX platforms, SIP trunks, intercom cabling, and call routing.' },
            { title: 'Audio / Video Solutions', desc: 'Smart boardroom AV, public address systems, digital signage control.' },
            { title: 'LED Display Boards', desc: 'Indoor/outdoor active LED displays and variable traffic message signs.' },
            { title: 'Telecom Infrastructure', desc: 'Structured cabling, optical fiber splicing, and radio repeater links.' },
            { title: 'Security & Surveillance', desc: 'Perimeter protection, biometric access, and jail security grids.' },
            { title: 'Solar Power Projects', desc: 'Standalone solar CCTV poles and rooftop off-grid energy setups.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#F5F5F5] p-4 rounded-xl border border-[#E0E0E0] space-y-1.5">
              <h3 className="text-sm font-bold text-[#222222] font-['Outfit']">{item.title}</h3>
              <p className="text-xs text-[#555555] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-[#B5263F]" />
            <h3 className="text-xl font-bold text-[#222222] font-['Outfit']">
              Our Mission
            </h3>
          </div>
          <p className="text-sm text-[#555555] leading-relaxed">
            To engineer reliable, durable, and technologically advanced security, telecommunication, and networking solutions that protect municipal infrastructure and empower modern enterprises with seamless communication.
          </p>
        </div>

        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-[#B5263F]" />
            <h3 className="text-xl font-bold text-[#222222] font-['Outfit']">
              Our Approach
            </h3>
          </div>
          <p className="text-sm text-[#555555] leading-relaxed">
            We prioritize field-tested hardware components, rigid cabling standards, and thorough quality inspection. Every deployment is backed by comprehensive site assessment and committed maintenance support.
          </p>
        </div>

      </div>

    </div>
  );
}

