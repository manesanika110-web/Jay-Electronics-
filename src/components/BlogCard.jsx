import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Calendar, Tag, Send, Check } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function BlogCard({ blog }) {
  const { toggleLike, addComment } = useData();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(blog.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="bg-white border border-[#E0E0E0] hover:border-[#B5263F]/40 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden mb-6">
      
      {/* 1. Header: Author & Metadata (Instagram/Facebook Header Style) */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-[#F8FAFC]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#B5263F] bg-[#222222] p-0.5 shrink-0">
            <img 
              src={blog.avatar || '/images/cctv_hero_bg.jpg'} 
              alt={blog.author}
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1E293B] font-['Outfit'] leading-tight">
              {blog.author}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
              <span>{blog.authorRole || 'Corporate Engineering'}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#B5263F] font-medium">
                <Calendar className="w-3 h-3 text-[#B5263F]" />
                {blog.date}
              </span>
            </div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#B5263F] bg-rose-50 border border-rose-200">
          <Tag className="w-2.5 h-2.5 text-[#B5263F]" />
          {blog.category}
        </span>
      </div>

      {/* 2. Blog Title */}
      <div className="px-4 pt-3 pb-2">
        <h3 className="text-base sm:text-lg font-extrabold text-[#1E293B] font-['Outfit'] leading-snug hover:text-[#B5263F] transition-colors">
          {blog.title}
        </h3>
      </div>

      {/* 3. Compact Main Image */}
      {blog.image && (
        <div className="relative max-h-64 overflow-hidden bg-gray-950 border-y border-gray-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-64 object-cover hover:scale-102 transition-transform duration-500"
          />
        </div>
      )}

      {/* 4. Social Feed Caption */}
      <div className="px-4 py-3 space-y-2">
        <div className={`text-xs sm:text-sm text-[#475569] leading-relaxed whitespace-pre-line ${
          !isExpanded ? 'line-clamp-3' : ''
        }`}>
          {blog.caption}
        </div>

        {blog.caption && blog.caption.length > 180 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-bold text-[#B5263F] hover:text-[#8F1D32] tracking-wide uppercase focus:outline-none cursor-pointer"
          >
            {isExpanded ? 'Show Less ▲' : 'Read Full Post ▼'}
          </button>
        )}
      </div>

      {/* 5. Instagram/Facebook Toolbar (Like, Comment, Share) */}
      <div className="px-4 py-2.5 border-t border-gray-100 bg-[#F8FAFC] flex items-center justify-between text-xs font-bold text-[#475569]">
        <div className="flex items-center gap-5">
          <button
            onClick={() => toggleLike(blog.id)}
            className={`flex items-center gap-1.5 transition-colors ${
              blog.userLiked ? 'text-[#B5263F]' : 'hover:text-[#B5263F]'
            }`}
          >
            <Heart className={`w-4 h-4 ${blog.userLiked ? 'fill-[#B5263F] text-[#B5263F]' : 'text-[#B5263F]'}`} />
            <span>{blog.likes || 0} Likes</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 hover:text-[#B5263F] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#B5263F]" />
            <span>{(blog.comments ? blog.comments.length : 0)} Comments</span>
          </button>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 hover:text-[#B5263F] transition-colors bg-white px-2.5 py-1 rounded-md border border-gray-200 text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#B5263F]" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* 6. Comments Section */}
      {showComments && (
        <div className="p-3.5 bg-white border-t border-gray-100 space-y-3 animate-fadeIn">
          <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-[#1E293B]">
            Comments ({(blog.comments ? blog.comments.length : 0)})
          </h5>

          {blog.comments && blog.comments.length > 0 ? (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {blog.comments.map((c) => (
                <div key={c.id} className="bg-[#F8FAFC] p-2.5 rounded-lg border border-gray-100 text-xs space-y-0.5">
                  <span className="font-extrabold text-[#B5263F] block">{c.user}</span>
                  <p className="text-[#334155]">{c.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-gray-400 italic">No comments yet. Be the first to reply!</p>
          )}

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 text-xs px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-[#B5263F] focus:outline-none text-[#1E293B]"
            />
            <button
              type="submit"
              className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs px-3.5 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Post</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
