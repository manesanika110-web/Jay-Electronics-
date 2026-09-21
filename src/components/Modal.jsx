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
      className="fixed inset-0 z-[9999] bg-black/65 flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-hidden"
      onClick={onClose}
    >
      {/* Modal Container - Large Horizontal Card Centered */}
      <div 
        className="relative bg-white border-2 border-[#B5263F] rounded-2xl shadow-2xl w-full max-w-4xl sm:max-w-5xl max-h-[85vh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at Top */}
        <div className="bg-[#333333] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#B5263F]/40 shrink-0">
          <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white pr-3 leading-snug">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#B5263F] transition cursor-pointer shrink-0 ml-2"
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


