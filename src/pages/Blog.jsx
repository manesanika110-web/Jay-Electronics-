import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import BlogCard from '../components/BlogCard';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Tag, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Heart, 
  MessageSquare, 
  Share2, 
  Send, 
  Check, 
  Calendar
} from 'lucide-react';

export default function Blog() {
  const { blogs, toggleLike, addComment } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  const PAGE_SIZE = 6;

  // Filter published blogs
  const publishedBlogs = (blogs || []).filter(b => b.status === 'Published');

  // Dynamic Categories from live published blogs
  const rawCategories = Array.from(new Set(publishedBlogs.map(b => b.category).filter(Boolean)));
  const categories = ['All', ...rawCategories];

  // Category Icon Mapping helper
  const getCategoryIcon = (catName) => {
    switch (catName.toLowerCase()) {
      case 'cctv': return '🎥';
      case 'networking': return '🌐';
      case 'security': return '🛡️';
      case 'technology': return '📅';
      case 'company updates': return '📄';
      case 'city surveillance': return '🏙️';
      default: return '✨';
    }
  };

  // Filter logic
  let filteredBlogs = publishedBlogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Sort logic
  if (sortBy === 'latest') {
    filteredBlogs.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  } else if (sortBy === 'oldest') {
    filteredBlogs.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  } else if (sortBy === 'popular') {
    filteredBlogs.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE) || 1;
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Latest 3 posts for sidebar
  const latestPosts = [...publishedBlogs]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 3);

  // Helper for category counts
  const getCategoryCount = (catName) => {
    if (catName === 'All') return publishedBlogs.length;
    return publishedBlogs.filter(b => b.category.toLowerCase() === catName.toLowerCase()).length;
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedBlog) return;
    addComment(selectedBlog.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8 pb-16 animate-fadeIn">
      
      {/* 1. Header Hero Section */}
      <section className="bg-[#5C0000] text-white py-12 px-4 sm:px-8 lg:px-12 relative overflow-hidden shadow-lg border-b-4 border-[#800000]">
        {/* Background camera image overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <img 
            src="/images/cctv_hero_bg.jpg" 
            alt="CCTV Background" 
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5C0000] via-[#5C0000]/80 to-transparent"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-rose-200" />
              <span className="text-rose-200 font-bold">Blogs</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
              Our <span className="text-rose-200">Blogs</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Stay updated with the latest insights, industry trends, security tips and technological advancements from JEPL.
            </p>

            {/* Underline accents */}
            <div className="flex items-center gap-1.5 pt-1">
              <div className="w-12 h-1 bg-[#800000] rounded-full"></div>
              <div className="w-6 h-1 bg-[#5C0000] rounded-full"></div>
            </div>
          </div>

          {/* Right Hero Tagline */}
          <div className="hidden lg:flex flex-col items-end text-right border-l-2 border-[#800000]/40/80 pl-6 py-2">
            <span className="text-lg font-extrabold font-['Outfit'] tracking-wide text-white leading-tight">
              Smarter Security
            </span>
            <span className="text-lg font-extrabold font-['Outfit'] tracking-wide text-rose-200 leading-tight">
              Brighter Future
            </span>
            <div className="w-10 h-1 bg-[#800000] rounded-full mt-1.5"></div>
          </div>

        </div>
      </section>

      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
        
        {/* 2. Top Filter & Sorting Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((catName) => (
              <button
                key={catName}
                onClick={() => {
                  setSelectedCategory(catName);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedCategory === catName
                    ? 'bg-gradient-to-r from-[#800000] to-[#5C0000] text-white shadow-md'
                    : 'bg-slate-100/90 hover:bg-slate-200 text-[#475569] hover:text-[#800000]'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-[#475569] focus:outline-none focus:border-[#800000] cursor-pointer"
            >
              <option value="latest">Latest Posts</option>
              <option value="oldest">Oldest Posts</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

        </div>

        {/* 3. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column / Blog Cards Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {currentBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.map((blog, idx) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    isFeatured={idx === 0 && currentPage === 1 && selectedCategory === 'All'}
                    onClick={(b) => setSelectedBlog(b)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center text-[#6B6B6B] space-y-2 shadow-2xs">
                <p className="text-base font-bold text-[#5C0000]">No blog posts found matching your search criteria.</p>
                <p className="text-xs text-[#475569]">Try changing your search term or category filter.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#6B6B6B] hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#800000] text-slate-950 shadow-md font-extrabold'
                        : 'text-[#475569] hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#6B6B6B] hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Right Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Search Box Widget */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search blogs, topics, keywords..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 focus:border-[#800000] focus:outline-none text-xs text-[#5C0000] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Blog Categories Widget */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h4 className="text-sm font-extrabold text-[#5C0000] font-['Outfit'] flex items-center gap-2 border-b border-slate-100 pb-3">
                <Tag className="w-4 h-4 text-[#800000]" />
                Blog Categories
              </h4>

              <div className="flex flex-col space-y-1.5">
                {categories.map((catName) => {
                  const isSelected = selectedCategory === catName;
                  const count = getCategoryCount(catName);

                  return (
                    <button
                      key={catName}
                      onClick={() => {
                        setSelectedCategory(catName);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#800000] to-[#5C0000] text-white shadow-md'
                          : 'text-[#475569] hover:bg-slate-50 hover:text-[#800000]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{getCategoryIcon(catName)}</span>
                        <span>{catName}</span>
                      </span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#475569]'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Latest Posts Widget */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h4 className="text-sm font-extrabold text-[#5C0000] font-['Outfit'] flex items-center gap-2 border-b border-slate-100 pb-3">
                <Clock className="w-4 h-4 text-[#800000]" />
                Latest Posts
              </h4>

              <div className="space-y-4">
                {latestPosts.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedBlog(post)}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 flex items-center justify-center">
                      <img 
                        src={post.image || '/images/cctv_hero_bg.jpg'} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-bold text-[#5C0000] group-hover:text-[#800000] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h5>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{post.date}</span>
                        <span className="bg-[#F8E6E6]/60 text-[#5C0000] px-1.5 py-0.2 rounded font-semibold text-[10px] border border-[#800000]/30">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="text-xs font-bold text-[#800000] hover:text-[#5C0000] flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Posts</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Full Blog Post Modal */}
      <Modal
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        title={selectedBlog?.title || ''}
      >
        {selectedBlog && (
          <div className="space-y-5">
            <div className="w-full max-h-[380px] min-h-[200px] rounded-2xl overflow-hidden bg-[#F2F2F2] border border-slate-200/80 flex items-center justify-center p-2.5">
              <img
                src={selectedBlog.image || '/images/cctv_hero_bg.jpg'}
                alt={selectedBlog.title}
                className="max-h-[360px] w-auto max-w-full object-contain rounded-xl shadow-2xs"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
              <div className="flex items-center gap-2 font-bold">
                <span className="bg-[#F8E6E6]/60 text-[#5C0000] px-3 py-1 rounded-xl border border-[#800000]/30">
                  Category: {selectedBlog.category}
                </span>
                <span className="text-[#475569] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {selectedBlog.date}
                </span>
              </div>
              <span className="text-xs text-[#475569] font-semibold">
                By {selectedBlog.author || 'JAY ELECTRONICS'}
              </span>
            </div>

            <div className="text-sm text-[#5C0000] leading-relaxed font-normal whitespace-pre-line space-y-3">
              {selectedBlog.caption}
            </div>

            {/* Interactive Likes & Share Bar */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#475569]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLike(selectedBlog.id)}
                  className={`flex items-center gap-1.5 cursor-pointer ${
                    selectedBlog.userLiked ? 'text-[#800000]' : 'hover:text-[#800000]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${selectedBlog.userLiked ? 'fill-[#800000] text-[#800000]' : 'text-slate-400'}`} />
                  <span>{selectedBlog.likes || 0} Likes</span>
                </button>
                <div className="flex items-center gap-1 text-[#475569]">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span>{selectedBlog.comments ? selectedBlog.comments.length : 0} Comments</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-[#475569] hover:text-[#800000] cursor-pointer"
              >
                {copied ? (
                  <span className="text-emerald-600 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> Copied Link!
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </span>
                )}
              </button>
            </div>

            {/* Comments Drawer */}
            <div className="p-4 bg-[#F2F2F2] rounded-2xl border border-slate-200/80 space-y-3">
              <h5 className="text-xs font-extrabold text-[#5C0000] uppercase tracking-wider">
                Comments ({selectedBlog.comments ? selectedBlog.comments.length : 0})
              </h5>

              {selectedBlog.comments && selectedBlog.comments.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedBlog.comments.map((c) => (
                    <div key={c.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-0.5">
                      <span className="font-bold text-[#5C0000] block">{c.user}</span>
                      <p className="text-[#5C0000]">{c.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No comments yet. Be the first to leave a thought!</p>
              )}

              <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 text-xs px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#800000] focus:outline-none text-[#5C0000]"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1 cursor-pointer shadow-sm border border-red-900/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
