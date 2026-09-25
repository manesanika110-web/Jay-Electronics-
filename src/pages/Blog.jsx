import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import BlogCard from '../components/BlogCard';
import { Search, Tag, Rss, ArrowDown } from 'lucide-react';

export default function Blog() {
  const { blogs } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayCount, setDisplayCount] = useState(5);

  const categories = [
    'All',
    'CCTV',
    'Networking',
    'Security',
    'Technology',
    'City Surveillance',
    'Company Updates'
  ];

  // Filter published blogs
  const publishedBlogs = blogs.filter(b => b.status === 'Published');

  const filteredBlogs = publishedBlogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || blog.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const visibleBlogs = filteredBlogs.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#333333] text-white p-8 sm:p-10 rounded-2xl border-2 border-[#B5263F] shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B5263F]/20 border border-[#B5263F] text-white text-xs font-bold uppercase tracking-wider">
            <Rss className="w-3.5 h-3.5 text-[#B5263F]" />
            <span>CORPORATE TECH FEED</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight">
            Engineering Updates & Technical Articles
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Stay updated with field deployment insights, city surveillance engineering, fiber networking best practices, and project updates from JAY ELECTRONICS PVT LTD.
          </p>
        </div>
      </div>

      {/* Main Layout: Feed Grid (Center feed + Fixed Right sidebar on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {visibleBlogs.length > 0 ? (
            visibleBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-12 text-center text-gray-500 space-y-2">
              <p className="text-base font-bold text-[#222222]">No posts matching your search criteria.</p>
              <p className="text-xs text-gray-500">Try adjusting your search query or selecting another category filter.</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredBlogs.length > displayCount && (
            <div className="text-center pt-4">
              <button
                onClick={() => setDisplayCount(prev => prev + 5)}
                className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow flex items-center gap-2 mx-auto cursor-pointer"
              >
                <span>Load More Engineering Updates</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Right Sidebar Column (Fixed Sticky Position on Desktop) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-1">
          
          {/* Search Box */}
          <div className="bg-white border border-[#E0E0E0] rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-extrabold text-[#222222] uppercase tracking-wider font-['Outfit'] flex items-center gap-2">
              <Search className="w-4 h-4 text-[#B5263F]" />
              Search Blog Feed
            </h4>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search topics, fiber, CCTV, IP-PBX..."
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-xs text-[#222222]"
              />
            </div>
          </div>

          {/* Category Filter List */}
          <div className="bg-white border border-[#E0E0E0] rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-extrabold text-[#222222] uppercase tracking-wider font-['Outfit'] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#B5263F]" />
              Blog Categories
            </h4>

            <div className="flex flex-col space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#B5263F] text-white font-bold shadow-xs'
                      : 'text-[#555555] hover:bg-[#F5F5F5] hover:text-[#B5263F]'
                  }`}
                >
                  <span>{cat}</span>
                  {cat === 'All' ? (
                    <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded">{publishedBlogs.length}</span>
                  ) : (
                    <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded">
                      {publishedBlogs.filter(b => b.category.toLowerCase().includes(cat.toLowerCase())).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* About Company Widget */}
          <div className="bg-[#333333] text-white border-2 border-[#B5263F] rounded-2xl p-5 shadow-md space-y-2">
            <h4 className="text-sm font-bold text-[#B5263F] font-['Outfit']">
              JAY ELECTRONICS PVT LTD
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Official technology publication of JAY ELECTRONICS. Founded in 1989 by an Electronics & Telecom Engineer.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

