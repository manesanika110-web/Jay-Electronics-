import React from 'react';
import { MapPin, Cpu, CheckCircle2, Building2, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project, onClick }) {
  return (
    <div 
      onClick={() => onClick && onClick(project)}
      className="relative bg-white border border-slate-200/90 hover:border-[#B5263F]/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#B5263F]/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-1"
    >
      <div>
        {/* Project Thumbnail Image */}
        <div className="relative h-52 overflow-hidden bg-slate-950 border-b border-slate-100">
          <img
            src={project.image || '/images/city_surveillance.jpg'}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-[#B5263F] text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-md backdrop-blur-md uppercase tracking-wider">
            {project.category}
          </div>
        </div>

        {/* Card Header & Content */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#B5263F] mb-2 uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#B5263F]" />
            <span>{project.location}</span>
          </div>

          <h3 className="text-xl font-bold text-[#222222] font-['Outfit'] mb-2.5 group-hover:text-[#B5263F] transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
            {project.details}
          </p>

          <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl p-3.5 space-y-2 mb-2 group-hover:bg-rose-50/30 group-hover:border-rose-100 transition-colors">
            <div className="flex items-start gap-2 text-xs text-slate-800">
              <Cpu className="w-4 h-4 text-[#B5263F] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-700">Technology: </span>
                <span className="text-slate-800 font-medium">{project.technology}</span>
              </div>
            </div>

            {project.stats && (
              <div className="flex items-center gap-2 text-xs text-[#B5263F] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B5263F] shrink-0" />
                <span>{project.stats}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#B5263F]" />
          <span>JAY ELECTRONICS PVT LTD</span>
        </span>

        <span className="text-xs font-extrabold text-[#B5263F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
