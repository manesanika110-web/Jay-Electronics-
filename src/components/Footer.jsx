import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, ChevronRight, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-gray-300 border-t-4 border-[#B5263F] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-800">
          
          {/* Col 1: Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="je-logo-wrapper h-11 sm:h-12 shrink-0">
                <img src="/images/je_logo.png" alt="JAY ELECTRONICS Logo" className="h-full w-auto object-contain" />
              </div>
              <span className="text-xs text-[#B5263F] font-bold tracking-wider uppercase border-l border-gray-700 pl-3">
                Established 1989
              </span>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              Founded in 1989 by a self-employed Electronics & Telecom Engineer. Premier provider of IP/Analog CCTV, City Surveillance, Structured Networking, EPABX Telecommunication, and Audio/Video Projects.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-[#333333] px-3 py-1.5 rounded border border-gray-700">
                <Award className="w-4 h-4 text-[#B5263F]" />
                <span className="text-xs font-semibold text-gray-200">35+ Years Excellence</span>
              </div>
              <div className="flex items-center gap-2 bg-[#333333] px-3 py-1.5 rounded border border-gray-700">
                <CheckCircle className="w-4 h-4 text-[#B5263F]" />
                <span className="text-xs font-semibold text-gray-200">Turnkey Execution</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B5263F]"></span>
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
                    className="hover:text-[#B5263F] transition-colors flex items-center gap-1.5 group text-gray-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B5263F] group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B5263F]"></span>
              Core Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="hover:text-[#B5263F] transition cursor-pointer">IP & Analog CCTV Systems</li>
              <li className="hover:text-[#B5263F] transition cursor-pointer">LAN / WAN Networking</li>
              <li className="hover:text-[#B5263F] transition cursor-pointer">EPABX & IP-PBX Systems</li>
              <li className="hover:text-[#B5263F] transition cursor-pointer">Audio / Video Solutions</li>
              <li className="hover:text-[#B5263F] transition cursor-pointer">City Surveillance Projects</li>
              <li className="hover:text-[#B5263F] transition cursor-pointer">Solar Power Projects</li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B5263F]"></span>
              Corporate Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B5263F] shrink-0 mt-1" />
                <span className="text-xs text-gray-400">
                  Head Office: Electronics & Telecom Complex, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B5263F] shrink-0" />
                <a href="tel:+919822012345" className="hover:text-[#B5263F] transition text-xs font-medium">
                  +91 98220 12345 / 0233-230000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B5263F] shrink-0" />
                <a href="mailto:info@jayelectronics.com" className="hover:text-[#B5263F] transition text-xs font-medium">
                  info@jayelectronics.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© JAY ELECTRONICS PVT LTD. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#B5263F] font-semibold">Surveillance • Telecom • Networking • A/V</span>
            <Link to="/admin" className="text-gray-400 hover:text-[#B5263F] transition">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

