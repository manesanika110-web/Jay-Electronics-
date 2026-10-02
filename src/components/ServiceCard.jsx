import React from 'react';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function ServiceCard({ service, onLearnMore }) {
  const IconComponent = Icons[service.icon] || Icons.Shield;

  return (
    <div className="relative bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-[#800000]/50 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-2xl hover:shadow-[#800000]/12 transition-all duration-300 flex flex-col justify-between group overflow-hidden transform hover:-translate-y-1.5">
      {/* Top indicator accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-[#0B182B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        {/* Glowing Icon Box */}
        <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-[#0B182B] group-hover:text-rose-200 group-hover:border-[#0B182B] group-hover:rotate-3 group-hover:scale-105 transition-all duration-300 shadow-xs group-hover:shadow-lg">
          <IconComponent className="w-6 h-6 stroke-[2.2]" />
        </div>

        <h3 className="text-xl font-bold text-[#0B182B] font-['Outfit'] mb-2.5 group-hover:text-[#800000] transition-colors leading-snug">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
          {service.shortDesc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100/90 group-hover:bg-[#F8E6E6] group-hover:text-[#800000] px-3 py-1 rounded-lg border border-slate-200/70 group-hover:border-[#800000]/30 transition-all">
          {service.category}
        </span>

        <button
          onClick={() => onLearnMore(service)}
          className="text-xs font-extrabold text-[#800000] hover:text-[#800000] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform cursor-pointer py-1.5 px-3 rounded-xl hover:bg-[#F8E6E6] active:scale-95"
        >
          <span>Learn More</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
