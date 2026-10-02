import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-hidden"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl w-full max-w-4xl sm:max-w-5xl max-h-[85vh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at Top */}
        <div className="bg-[#F8E6E6] text-slate-900 px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#800000]/20 shrink-0">
          <h3 className="text-base sm:text-lg font-extrabold font-['Outfit'] text-[#5C0000] pr-3 leading-snug">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#5C0000] hover:text-white hover:bg-[#800000] transition-all cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area - Internal Vertical Scroll Only */}
        <div className="p-5 sm:p-6 flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
