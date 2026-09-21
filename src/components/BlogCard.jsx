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
    <article className="bg-white border border-[#E0E0E0] hover:border-[#B5263F] rounded-2xl shadow-sm hover:shadow transition-all duration-300 overflow-hidden mb-8">
      
      {/* 1. Header: Author / Profile info */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#E0E0E0] bg-[#F5F5F5]/60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#B5263F] bg-[#222222] p-0.5 shrink-0">
            <img 
              src={blog.avatar || '/images/cctv_hero_bg.jpg'} 
              alt={blog.author}
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#222222] font-['Outfit'] leading-tight">
              {blog.author}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
              <span>{blog.authorRole || 'Corporate Engineering'}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#B5263F] font-medium">
                <Calendar className="w-3 h-3 text-[#B5263F]" />
                {blog.date}
              </span>
            </div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-[#B5263F] bg-[#B5263F]/10 border border-[#B5263F]/30">
          <Tag className="w-3 h-3 text-[#B5263F]" />
          {blog.category}
        </span>
      </div>

      {/* 2. Blog Title & Main Post Image */}
      <div className="p-4 sm:p-5 pb-2">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#222222] font-['Outfit'] leading-snug mb-3 hover:text-[#B5263F] transition-colors">
          {blog.title}
        </h3>
      </div>

      {blog.image && (
        <div className="relative max-h-100 overflow-hidden bg-gray-950 border-y border-[#E0E0E0]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
          />
        </div>
      )}

      {/* 3. Social Feed Caption */}
      <div className="p-4 sm:p-6 space-y-3">
        <div className={`text-sm sm:text-base text-[#555555] leading-relaxed whitespace-pre-line ${
          !isExpanded ? 'line-clamp-4' : ''
        }`}>
          {blog.caption}
        </div>

        {blog.caption && blog.caption.length > 250 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-[#B5263F] hover:text-[#8F1D32] tracking-wide uppercase focus:outline-none cursor-pointer"
          >
            {isExpanded ? 'Show Less ▲' : 'Read Full Post / Expand Caption ▼'}
          </button>
        )}
      </div>

      {/* 4. Social Engagement Toolbar (Like, Comment, Share) */}
      <div className="px-4 sm:px-6 py-3 border-t border-[#E0E0E0] bg-[#F5F5F5]/40 flex items-center justify-between text-xs font-semibold text-[#555555]">
        
        <div className="flex items-center gap-6">
          <button
            onClick={() => toggleLike(blog.id)}
            className={`flex items-center gap-1.5 transition-colors ${
              blog.userLiked ? 'text-[#B5263F] font-bold' : 'hover:text-[#B5263F]'
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
          className="flex items-center gap-1.5 hover:text-[#B5263F] transition-colors bg-white px-3 py-1.5 rounded border border-[#E0E0E0]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span className="text-green-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#B5263F]" />
              <span>Share Post</span>
            </>
          )}
        </button>
      </div>

      {/* 5. Comments Drawer Section */}
      {showComments && (
        <div className="p-4 sm:p-5 bg-white border-t border-[#E0E0E0] space-y-4 animate-fadeIn">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#222222]">
            Discussion / Comments ({blog.comments ? blog.comments.length : 0})
          </h5>

          {blog.comments && blog.comments.length > 0 ? (
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {blog.comments.map((c) => (
                <div key={c.id} className="bg-[#F5F5F5] p-3 rounded-lg border border-[#E0E0E0] text-xs space-y-1">
                  <span className="font-bold text-[#B5263F]">{c.user}</span>
                  <p className="text-[#555555]">{c.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No comments yet. Be the first to share feedback!</p>
          )}

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 text-xs px-3 py-2 rounded-lg bg-white border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-[#222222]"
            />
            <button
              type="submit"
              className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-bold text-xs px-4 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
}

