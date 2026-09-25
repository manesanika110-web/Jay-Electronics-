import React from 'react';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function ServiceCard({ service, onLearnMore }) {
  const IconComponent = Icons[service.icon] || Icons.Shield;

  return (
    <div className="relative bg-white border border-slate-200/90 hover:border-[#B5263F]/50 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-[#B5263F]/5 transition-all duration-300 flex flex-col justify-between group overflow-hidden transform hover:-translate-y-1">
      {/* Subtle top indicator accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B5263F] to-[#8F1D32] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        {/* Glowing Icon Box */}
        <div className="w-13 h-13 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#B5263F] mb-5 group-hover:bg-[#B5263F] group-hover:text-white group-hover:border-[#B5263F] transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:shadow-[#B5263F]/20">
          <IconComponent className="w-6 h-6 stroke-[2.2]" />
        </div>

        <h3 className="text-xl font-bold text-[#222222] font-['Outfit'] mb-2.5 group-hover:text-[#B5263F] transition-colors leading-snug">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
          {service.shortDesc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100/80 group-hover:bg-rose-50 group-hover:text-[#B5263F] px-3 py-1 rounded-md border border-slate-200/60 group-hover:border-rose-200 transition-colors">
          {service.category}
        </span>

        <button
          onClick={() => onLearnMore(service)}
          className="text-xs font-extrabold text-[#B5263F] hover:text-[#8F1D32] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer py-1 px-2 rounded-lg hover:bg-rose-50/50"
        >
          <span>Learn More</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
