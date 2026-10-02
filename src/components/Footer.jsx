import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, ChevronRight, Award, CheckCircle, Lock } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Footer() {
  const { homeFooter } = useData();

  return (
    <footer className="bg-[#E5E5E5] text-[#111111] border-t-4 border-[#800000] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-300">
          
          {/* Col 1: Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="je-logo-wrapper h-11 sm:h-12 shrink-0">
                <img src="/images/je_logo.png" alt="JAY ELECTRONICS Logo" className="h-full w-auto object-contain" />
              </div>
              <span className="text-xs text-[#800000] font-bold tracking-wider uppercase border-l border-slate-300 pl-3">
                {homeFooter?.establishedText || 'Established 1989'}
              </span>
            </div>
            
            <p className="text-sm text-[#555555] leading-relaxed pr-4 font-normal">
              {homeFooter?.aboutText || 'Founded in 1989 by a self-employed Electronics & Telecom Engineer. Premier provider of IP/Analog CCTV, City Surveillance, Structured Networking, EPABX Telecommunication, and Audio/Video Projects.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-300 shadow-xs">
                <Award className="w-4 h-4 text-[#800000]" />
                <span className="text-xs font-semibold text-[#111111]">{homeFooter?.badge1 || '35+ Years Excellence'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-300 shadow-xs">
                <CheckCircle className="w-4 h-4 text-[#800000]" />
                <span className="text-xs font-semibold text-[#111111]">{homeFooter?.badge2 || 'Turnkey Execution'}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-[#111111] font-['Outfit'] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#800000]"></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Major Projects', path: '/projects' },
                { name: 'Tech Feed / Blog', path: '/blog' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-[#800000] transition-colors flex items-center gap-1.5 group text-[#555555] font-medium"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#800000] group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-base font-bold text-[#111111] font-['Outfit'] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#800000]"></span>
              Core Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-[#555555] font-medium">
              <li className="hover:text-[#800000] transition cursor-pointer">IP & Analog CCTV Systems</li>
              <li className="hover:text-[#800000] transition cursor-pointer">LAN / WAN Networking</li>
              <li className="hover:text-[#800000] transition cursor-pointer">EPABX & IP-PBX Systems</li>
              <li className="hover:text-[#800000] transition cursor-pointer">Audio / Video Solutions</li>
              <li className="hover:text-[#800000] transition cursor-pointer">City Surveillance Projects</li>
              <li className="hover:text-[#800000] transition cursor-pointer">Solar Power Projects</li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-base font-bold text-[#111111] font-['Outfit'] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#800000]"></span>
              Corporate Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#555555]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#800000] shrink-0 mt-1" />
                <span className="text-xs text-[#555555] font-medium">
                  {homeFooter?.address || 'Head Office: Electronics & Telecom Complex, Maharashtra, India'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#800000] shrink-0" />
                <a href={`tel:${homeFooter?.phone || '+919822012345'}`} className="hover:text-[#800000] transition text-xs font-medium text-[#111111]">
                  {homeFooter?.phone || '+91 98220 12345 / 0233-230000'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#800000] shrink-0" />
                <a href={`mailto:${homeFooter?.email || 'info@jayelectronics.com'}`} className="hover:text-[#800000] transition text-xs font-medium text-[#111111]">
                  {homeFooter?.email || 'info@jayelectronics.com'}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#555555] gap-4">
          <p>{homeFooter?.copyright || '© JAY ELECTRONICS PVT LTD. All Rights Reserved.'}</p>
          <div className="flex items-center gap-4">
            <span className="text-[#800000] font-bold">{homeFooter?.tagline || 'Surveillance • Telecom • Networking • A/V'}</span>
            <Link to="/admin-login" className="text-[#555555] hover:text-[#800000] transition flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
