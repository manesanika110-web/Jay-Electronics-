import React from 'react';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function ServiceCard({ service, onLearnMore }) {
  const IconComponent = Icons[service.icon] || Icons.Shield;

  return (
    <div className="bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center text-[#B5263F] mb-5 group-hover:bg-[#B5263F] group-hover:text-white transition-colors">
          <IconComponent className="w-6 h-6 stroke-[2]" />
        </div>

        <h3 className="text-lg font-bold text-[#222222] font-['Outfit'] mb-2 group-hover:text-[#B5263F] transition-colors">
          {service.title}
        </h3>

        <p className="text-sm text-[#555555] leading-relaxed mb-4">
          {service.shortDesc}
        </p>
      </div>

      <div className="pt-3 border-t border-[#E0E0E0] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#333333] uppercase tracking-wider bg-[#F5F5F5] px-2.5 py-1 rounded border border-[#E0E0E0]">
          {service.category}
        </span>

        <button
          onClick={() => onLearnMore(service)}
          className="text-xs font-bold text-[#B5263F] hover:text-[#8F1D32] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
        >
          <span>Learn More</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

