import React from 'react';
import { MapPin, Cpu, Award, ArrowRight, Folder } from 'lucide-react';

export default function ProjectCard({ project, onClick }) {
  // Extract key technology and achievement strings
  const techText = project.technology || 'IP CCTV Cameras, Fiber Backbone, Command Center Software';
  const achievementText = project.stats || project.achievement || 'Multi-Location CCTV Grid & Fiber Ring';

  return (
    <div 
      onClick={() => onClick && onClick(project)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col justify-between cursor-pointer border-t-2 border-t-transparent hover:border-t-[#800000] transform hover:-translate-y-1"
    >
      <div>
        {/* Project Thumbnail Image Container */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
          <img
            src={project.image || '/images/city_surveillance.jpg'}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
          />
          
          {/* Subtle Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20"></div>

          {/* Top Left Category Pill Badge */}
          <div className="absolute top-3 left-3 bg-[#800000] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider backdrop-blur-md">
            <Folder className="w-3.5 h-3.5 fill-white text-transparent" />
            <span>{project.category}</span>
          </div>

          {/* Top Right Floating CCTV Dome Camera Graphic Overlay */}
          <div className="absolute top-2.5 right-2.5 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=100&q=80"
              alt="CCTV Overlay"
              className="w-full h-full object-cover rounded-full opacity-90"
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          
          {/* Location Badge */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#800000] uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#800000]" />
            <span>{project.location}</span>
          </div>

          {/* Project Title */}
          <h3 className="text-base sm:text-lg font-black text-[#0B182B] font-['Outfit'] leading-snug group-hover:text-[#800000] transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
            {project.details}
          </p>

          {/* Two Side-by-Side Light-Blue Feature Boxes (Matching Reference Mockup) */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            
            {/* Left Box: Technology Used */}
            <div className="bg-[#F0F7FF] border border-blue-100/90 rounded-xl p-2.5 flex flex-col justify-between space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Technology Used</span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium leading-tight line-clamp-2">
                {techText}
              </p>
            </div>

            {/* Right Box: Key Achievement */}
            <div className="bg-[#F0F7FF] border border-blue-100/90 rounded-xl p-2.5 flex flex-col justify-between space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Key Achievement</span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium leading-tight line-clamp-2">
                {achievementText}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Card Footer (Matching Mockup Footer) */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="je-logo-wrapper h-5 shrink-0 px-1 py-0.5 border border-slate-200 bg-white rounded">
            <img src="/images/je_logo.png" alt="JEPL" className="h-full w-auto object-contain" />
          </div>
          <span className="text-[10px] font-extrabold text-slate-700 tracking-wider uppercase">JAY ELECTRONICS PVT LTD</span>
        </div>

        <span className="text-xs font-bold text-blue-600 group-hover:text-[#800000] flex items-center gap-1 transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
