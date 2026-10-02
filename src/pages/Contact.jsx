import React from 'react';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Header Banner */}
      <div className="text-white rounded-3xl relative overflow-hidden shadow-xl border border-slate-700 min-h-[200px] flex items-center">
        {/* Clear Background Image with Subtle Text Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/cctv_hero_bg.jpg" 
            alt="Security Building background" 
            className="w-full h-full object-cover object-center brightness-105 contrast-105 opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-white font-bold">&gt;</span>
            <span className="text-white font-medium">Contact</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit'] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Get <span className="text-white">in</span> Touch
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            We're here to help you with your security and technology needs. Reach out to us for quotes, support, or to schedule a free site survey.
          </p>
        </div>
      </div>

      {/* 2. Top Info Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Call Us */}
        <div className="stitch-card p-5 flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full bg-[#5C0000] flex items-center justify-center text-rose-200 shrink-0 shadow-sm group-hover:scale-105 transition-transform border border-[#800000]/30">
            <Phone className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[#5C0000] text-sm font-['Outfit']">Call Us</h3>
            <a href="tel:+919822012345" className="text-xs font-semibold text-[#800000] hover:underline block truncate mt-0.5">
              +91 98220 12345
            </a>
            <p className="text-[11px] text-slate-400 mt-0.5">Mon - Sat: 9:30 AM - 6:30 PM</p>
          </div>
        </div>

        {/* Card 2: Email Us */}
        <div className="stitch-card p-5 flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full bg-[#5C0000] flex items-center justify-center text-rose-200 shrink-0 shadow-sm group-hover:scale-105 transition-transform border border-[#800000]/30">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[#5C0000] text-sm font-['Outfit']">Email Us</h3>
            <a href="mailto:info@jayelectronics.com" className="text-xs font-semibold text-[#800000] hover:underline block truncate mt-0.5">
              info@jayelectronics.com
            </a>
            <p className="text-[11px] text-slate-400 mt-0.5">24/7 Response time</p>
          </div>
        </div>

        {/* Card 3: Visit Us */}
        <div className="stitch-card p-5 flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full bg-[#5C0000] flex items-center justify-center text-rose-200 shrink-0 shadow-sm group-hover:scale-105 transition-transform border border-[#800000]/30">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[#5C0000] text-sm font-['Outfit']">Visit Us</h3>
            <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">Sangli Head Office</p>
            <p className="text-[11px] text-slate-400 mt-0.5">On site consultation for you</p>
          </div>
        </div>

        {/* Card 4: Working Hours */}
        <div className="stitch-card p-5 flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full bg-[#5C0000] flex items-center justify-center text-rose-200 shrink-0 shadow-sm group-hover:scale-105 transition-transform border border-[#800000]/30">
            <Clock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[#5C0000] text-sm font-['Outfit']">Working Hours</h3>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">Mon - Sat: 9:30 AM - 6:30 PM</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Sunday: Closed</p>
          </div>
        </div>

      </div>

      {/* 3. Main Grid (Left Form + Right Information Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form (~60% / 7 cols) */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Column: Contact Details Card (~40% / 5 cols) */}
        <div className="lg:col-span-5">
          <div className="stitch-card overflow-hidden flex flex-col">
            
            {/* Top Image Banner with Overlay Badge */}
            <div className="relative h-44 sm:h-48 overflow-hidden bg-[#5C0000]">
              <img 
                src="/images/cctv_hero_bg_3.jpg" 
                alt="Security Priority Banner" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5C0000]/90 via-transparent to-black/20"></div>

              {/* Amber Badge / Ribbon at top right */}
              <div className="absolute top-4 right-4 bg-[#800000] text-slate-950 px-4 py-2 rounded-xl shadow-lg border border-[#800000]/40/50 transform rotate-1 backdrop-blur-xs">
                <span className="font-['Outfit'] text-xs font-extrabold tracking-wide uppercase block">
                  Your Security
                </span>
                <span className="text-[10px] font-bold text-slate-900 block italic">
                  Our Priority
                </span>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 sm:p-7 space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
                  Our Contact Information
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-1.5 leading-relaxed">
                  Get in touch with our team for any inquiries, support, or customized security solutions. We are always happy to help!
                </p>
              </div>

              {/* Contact List */}
              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#5C0000] flex items-center justify-center text-rose-200 shrink-0 shadow-xs mt-0.5 border border-[#800000]/30">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone</h4>
                    <a href="tel:+919822012345" className="text-sm font-semibold text-[#5C0000] hover:text-[#800000] transition-colors block mt-0.5">
                      +91 98220 12345
                    </a>
                    <span className="text-xs text-[#6B6B6B] block">0233-230000</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#5C0000] flex items-center justify-center text-rose-200 shrink-0 shadow-xs mt-0.5 border border-[#800000]/30">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email</h4>
                    <a href="mailto:info@jayelectronics.com" className="text-sm font-semibold text-[#5C0000] hover:text-[#800000] transition-colors block mt-0.5">
                      info@jayelectronics.com
                    </a>
                  </div>
                </div>

                {/* Head Office */}
                <div className="flex items-start gap-4 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#5C0000] flex items-center justify-center text-rose-200 shrink-0 shadow-xs mt-0.5 border border-[#800000]/30">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Head Office</h4>
                    <p className="text-sm font-semibold text-[#5C0000] mt-0.5">
                      Jay Electronics Pvt Ltd
                    </p>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed mt-0.5">
                      Electronics & Telecommunication Hub,<br />
                      Sangli - Kolhapur Highway Corridor,<br />
                      Sangli - 416416, Maharashtra, India
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#5C0000] flex items-center justify-center text-rose-200 shrink-0 shadow-xs mt-0.5 border border-[#800000]/30">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Working Hours</h4>
                    <p className="text-xs font-semibold text-[#5C0000] mt-0.5">
                      Mon - Sat: 9:30 AM - 6:30 PM
                    </p>
                    <p className="text-xs text-slate-400">Sunday: Closed</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 4. Bottom Map Section */}
      <div className="stitch-card p-3 sm:p-4 relative overflow-hidden">
        <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200">
          
          {/* Embedded Map */}
          <iframe
            title="Jay Electronics Office Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61084.28892182069!2d74.55171732959828!3d16.852445100612984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc123b378033621%3A0x62957b44729f2ed2!2sSangli%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating Dark Overlay Card */}
          <div className="absolute top-4 left-4 z-10 max-w-xs sm:max-w-sm bg-[#5C0000]/95 text-white p-5 rounded-2xl shadow-xl border border-slate-800 backdrop-blur-md space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#800000] animate-ping"></div>
              <h4 className="font-extrabold text-sm sm:text-base font-['Outfit'] text-white">
                Find Us on Map
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our office location is easily accessible. Visit us anytime.
            </p>
            <a 
              href="https://maps.google.com/?q=Jay+Electronics+Sangli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#3B0000] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0 mt-2 cursor-pointer border border-red-900/40"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
