import React from 'react';
import { Calendar, ArrowRight, Star } from 'lucide-react';

export default function BlogCard({ blog, onClick, isFeatured }) {
  return (
    <div 
      onClick={() => onClick && onClick(blog)}
      className="stitch-card flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      <div>
        {/* Top Image Container */}
        <div className="relative h-44 overflow-hidden bg-[#0B182B] flex items-center justify-center">
          <img
            src={blog.image || '/images/cctv_hero_bg.jpg'}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-95 group-hover:opacity-100"
          />
          {(blog.isFeatured || isFeatured) && (
            <div className="absolute top-3 left-3 bg-[#800000] text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md uppercase tracking-wider">
              <Star className="w-3 h-3 fill-slate-950" />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-2">
          {/* Meta row: Date + Category */}
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1 text-[#475569]">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {blog.date}
            </span>
            <span className="bg-[#F8E6E6] text-[#800000] px-2.5 py-0.5 rounded-md font-bold text-[11px] border border-[#800000]/30">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-extrabold text-[#0B182B] font-['Outfit'] leading-snug group-hover:text-[#800000] transition-colors line-clamp-2">
            {blog.title}
          </h3>

          {/* Caption Excerpt */}
          <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 font-normal">
            {blog.caption}
          </p>
        </div>
      </div>

      {/* Footer Read More link */}
      <div className="px-4 sm:px-5 pb-4 pt-1">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick(blog);
          }}
          className="text-xs font-bold text-[#800000] hover:text-[#800000] flex items-center gap-1 cursor-pointer group-hover:translate-x-1 transition-transform"
        >
          <span>Read More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
