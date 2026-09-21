import React from 'react';
import { MapPin, Cpu, CheckCircle2, Building2 } from 'lucide-react';

export default function ProjectCard({ project, onClick }) {
  return (
    <div 
      onClick={() => onClick && onClick(project)}
      className="bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Project Thumbnail Image */}
        <div className="relative h-48 overflow-hidden bg-gray-900 border-b border-[#B5263F]/40">
          <img
            src={project.image || '/images/city_surveillance.jpg'}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute top-3 left-3 bg-[#B5263F] text-white text-xs font-extrabold px-3 py-1 rounded shadow-xs backdrop-blur-xs">
            {project.category}
          </div>
        </div>

        {/* Card Header & Content */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B5263F] mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#B5263F]" />
            <span>{project.location}</span>
          </div>

          <h3 className="text-lg font-bold text-[#222222] font-['Outfit'] mb-2 group-hover:text-[#B5263F] transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-sm text-[#555555] leading-relaxed mb-4 line-clamp-3">
            {project.details}
          </p>

          <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg p-3 space-y-2 mb-2">
            <div className="flex items-start gap-2 text-xs text-[#222222]">
              <Cpu className="w-4 h-4 text-[#B5263F] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-700">Technology: </span>
                <span className="text-gray-800">{project.technology}</span>
              </div>
            </div>

            {project.stats && (
              <div className="flex items-center gap-2 text-xs text-[#B5263F] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B5263F]" />
                <span>{project.stats}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-[#E0E0E0] flex items-center justify-between">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5 text-[#B5263F]" />
          <span>JAY ELECTRONICS PVT LTD</span>
        </span>

        <span className="text-xs font-bold text-[#B5263F] group-hover:underline">
          View Details →
        </span>
      </div>
    </div>
  );
}

