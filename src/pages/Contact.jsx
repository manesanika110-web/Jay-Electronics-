import React from 'react';
import ContactForm from '../components/ContactForm';
import { Shield, MapPin, Phone, Mail, Clock, Award, Building2 } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#333333] text-white p-8 sm:p-12 rounded-2xl border-2 border-[#B5263F] shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#333333] text-xs font-bold uppercase tracking-wider">
            <img src="/images/je_logo.png" alt="JE Logo" className="h-4 w-auto object-contain" />
            <span>EXECUTIVE CONTACT & CONSULTATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Contact JAY ELECTRONICS PVT LTD
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Connect with our system integration division for tenders, project estimates, optical fiber design, and surveillance consultations.
          </p>
        </div>
      </div>

      {/* Main Grid: Info cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-[#222222] font-['Outfit'] border-b border-[#E0E0E0] pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#B5263F]" />
              Corporate Address & Head Office
            </h3>

            <div className="space-y-4 text-sm text-[#555555]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B5263F] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#222222]">JAY ELECTRONICS PVT LTD</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Electronics & Telecommunication Hub,<br />
                    Sangli - Kolhapur Highway Corridor, Maharashtra, India.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                <Phone className="w-5 h-5 text-[#B5263F] shrink-0" />
                <div>
                  <h4 className="font-bold text-[#222222]">Telephone & Support Hotline</h4>
                  <a href="tel:+919822012345" className="text-xs font-semibold text-[#B5263F] hover:underline block">
                    +91 98220 12345 / 0233-230000
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                <Mail className="w-5 h-5 text-[#B5263F] shrink-0" />
                <div>
                  <h4 className="font-bold text-[#222222]">Official Email Contact</h4>
                  <a href="mailto:info@jayelectronics.com" className="text-xs font-semibold text-[#B5263F] hover:underline block">
                    info@jayelectronics.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                <Clock className="w-5 h-5 text-[#B5263F] shrink-0" />
                <div>
                  <h4 className="font-bold text-[#222222]">Working Hours</h4>
                  <p className="text-xs text-gray-600">Monday - Saturday: 9:30 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#333333] text-white border-2 border-[#B5263F] rounded-2xl p-6 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-[#B5263F] font-bold text-sm">
              <Award className="w-5 h-5" />
              <span>Turnkey Execution Commitment</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Founded in 1989 by a self-employed Electronics & Telecom Engineer, JAY ELECTRONICS has maintained an unbroken track record of client satisfaction across government and private institutions.
            </p>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>

      {/* Google Map Section */}
      <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-[#222222] font-['Outfit'] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#B5263F]" />
          Regional Project Operations & Headquarters Map
        </h3>

        <div className="h-80 rounded-xl overflow-hidden border border-[#E0E0E0] relative bg-gray-900">
          <iframe
            title="Jay Electronics Headquarters Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61084.28892182069!2d74.55171732959828!3d16.852445100612984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc123b378033621%3A0x62957b44729f2ed2!2sSangli%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>
  );
}

