import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, ChevronRight, ShieldCheck, ArrowRight, Search } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Dropdown states for Desktop
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  // Accordion states for Mobile
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { openQuoteModal, aboutCards, services } = useData();

  const aboutTimeoutRef = useRef(null);
  const solutionsTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setAboutDropdownOpen(false);
    setSolutionsDropdownOpen(false);
    setMobileAboutOpen(false);
    setMobileSolutionsOpen(false);
  }, [location]);

  const defaultSolutionsItems = [
    { name: 'CCTV Surveillance', path: '/solutions/cctv-surveillance' },
    { name: 'Networking Solutions', path: '/solutions/networking-solutions' },
    { name: 'Access Control', path: '/solutions/access-control' },
    { name: 'Video Door Phones', path: '/solutions/video-door-phones' },
    { name: 'Fire Alarm Systems', path: '/solutions/fire-alarm-systems' },
    { name: 'EPABX & Intercom', path: '/solutions/epabx-intercom' },
    { name: 'Audio Visual Solutions', path: '/solutions/audio-visual-solutions' },
    { name: 'LED Display Solutions', path: '/solutions/led-display-solutions' },
    { name: 'Solar Security Solutions', path: '/solutions/solar-security-solutions' },
    { name: 'Annual Maintenance Contract', path: '/solutions/annual-maintenance-contract' },
  ];

  const defaultAboutItems = [
    { name: 'Company Profile', path: '/about/company-profile' },
    { name: 'Our Story', path: '/about/our-story' },
  ];

  const aboutItems = defaultAboutItems;

  const solutionsItems = (services && services.length > 0)
    ? services.map(s => ({ name: s.title, path: `/solutions/${s.slug || s.id}` }))
    : defaultSolutionsItems;

  const isActive = (path) => location.pathname === path;
  const isParentActive = (prefix) => location.pathname.startsWith(prefix);

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 150);
  };

  const handleSolutionsMouseEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsDropdownOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setSolutionsDropdownOpen(false);
    }, 150);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 ${
      scrolled ? 'shadow-md py-2' : 'py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group py-1">
            <div className="je-logo-wrapper h-10 sm:h-12 shrink-0">
              <img src="/images/je_logo.png" alt="JEPL Logo" className="h-full w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* 1. Home */}
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                isActive('/')
                  ? 'text-[#800000] bg-[#F8E6E6] font-black shadow-xs'
                  : 'text-slate-800 hover:text-[#800000] hover:bg-slate-100/80'
              }`}
            >
              Home
            </Link>

            {/* 2. About Us */}
            <div 
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button
                onClick={() => navigate('/about')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                  isParentActive('/about')
                    ? 'text-[#800000] bg-[#F8E6E6] font-black shadow-xs'
                    : 'text-slate-800 hover:text-[#800000] hover:bg-slate-100/80'
                }`}
              >
                <span>About us</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-[#800000]' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-scaleUp border-t-2 border-t-[#800000]">
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#800000] hover:bg-[#F8E6E6] border-b border-slate-100 flex items-center justify-between"
                  >
                    <span>Company Overview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {aboutItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2 text-xs font-semibold transition-colors ${
                        isActive(item.path)
                          ? 'text-[#800000] bg-[#F8E6E6] font-bold border-l-4 border-[#800000]'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#800000]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Solutions */}
            <div 
              className="relative"
              onMouseEnter={handleSolutionsMouseEnter}
              onMouseLeave={handleSolutionsMouseLeave}
            >
              <button
                onClick={() => navigate('/solutions')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                  isParentActive('/solutions') || isParentActive('/services')
                    ? 'text-[#800000] bg-[#F8E6E6] font-black shadow-xs'
                    : 'text-slate-800 hover:text-[#800000] hover:bg-slate-100/80'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180 text-[#800000]' : ''}`} />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-scaleUp border-t-2 border-t-[#800000]">
                  <Link
                    to="/solutions"
                    className="block px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#800000] hover:bg-[#F8E6E6] border-b border-slate-100 flex items-center justify-between"
                  >
                    <span>All Engineering Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2 text-xs font-semibold transition-colors ${
                        isActive(item.path)
                          ? 'text-[#800000] bg-[#F8E6E6] font-bold border-l-4 border-[#800000]'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#800000]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Projects */}
            <Link
              to="/projects"
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                isActive('/projects')
                  ? 'text-[#800000] bg-[#F8E6E6] font-black shadow-xs'
                  : 'text-slate-800 hover:text-[#800000] hover:bg-slate-100/80'
              }`}
            >
              Projects
            </Link>

            {/* 5. Blogs */}
            <Link
              to="/blog"
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                isActive('/blog')
                  ? 'text-[#800000] bg-[#F8E6E6] font-black shadow-xs'
                  : 'text-slate-800 hover:text-[#800000] hover:bg-slate-100/80'
              }`}
            >
              Blogs
            </Link>

            {/* 6. Contact */}
            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                isActive('/contact')
                  ? 'text-[#800000] bg-[#F8E6E6] font-black shadow-xs'
                  : 'text-slate-800 hover:text-[#800000] hover:bg-slate-100/80'
              }`}
            >
              Contact
            </Link>

          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={openQuoteModal}
              className="bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#111111] text-white font-extrabold text-xs px-5 py-2.5 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer border border-[#800000]/40 flex items-center gap-1.5"
            >
              <span>Get Quote</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#800000] hover:bg-slate-100/70 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#800000]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t border-slate-200/80 pt-3 animate-fadeIn bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              
              {/* Home */}
              <Link
                to="/"
                className={`px-4 py-2.5 rounded-xl text-base font-medium ${
                  isActive('/')
                    ? 'text-[#800000] bg-[#F8E6E6]/80 font-bold border-l-4 border-[#800000]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                Home
              </Link>

              {/* About Us Mobile Accordion */}
              <div>
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-slate-50">
                  <Link
                    to="/about"
                    className={`text-base font-medium ${
                      isParentActive('/about') ? 'text-[#800000] font-bold' : 'text-slate-700'
                    }`}
                  >
                    About Us
                  </Link>
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="p-1 rounded text-[#800000] hover:bg-slate-200"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {mobileAboutOpen && (
                  <div className="pl-6 space-y-1 border-l-2 border-[#800000] ml-4 py-1">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block py-2 text-sm font-semibold ${
                          isActive(item.path) ? 'text-[#800000] font-bold' : 'text-slate-600 hover:text-[#800000]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions Mobile Accordion */}
              <div>
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-slate-50">
                  <Link
                    to="/solutions"
                    className={`text-base font-medium ${
                      isParentActive('/solutions') || isParentActive('/services') ? 'text-[#800000] font-bold' : 'text-slate-700'
                    }`}
                  >
                    Solutions
                  </Link>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="p-1 rounded text-[#800000] hover:bg-slate-200"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {mobileSolutionsOpen && (
                  <div className="pl-6 space-y-1 border-l-2 border-[#800000] ml-4 py-1">
                    {solutionsItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block py-2 text-sm font-semibold ${
                          isActive(item.path) ? 'text-[#800000] font-bold' : 'text-slate-600 hover:text-[#800000]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects */}
              <Link
                to="/projects"
                className={`px-4 py-2.5 rounded-xl text-base font-medium ${
                  isActive('/projects')
                    ? 'text-[#800000] bg-[#F8E6E6]/80 font-bold border-l-4 border-[#800000]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                Projects
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                className={`px-4 py-2.5 rounded-xl text-base font-medium ${
                  isActive('/blog')
                    ? 'text-[#800000] bg-[#F8E6E6]/80 font-bold border-l-4 border-[#800000]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                Blog
              </Link>

              {/* Contact Us */}
              <Link
                to="/contact"
                className={`px-4 py-2.5 rounded-xl text-base font-medium ${
                  isActive('/contact')
                    ? 'text-[#800000] bg-[#F8E6E6]/80 font-bold border-l-4 border-[#800000]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                Contact Us
              </Link>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col gap-2 px-2">
              <a
                href="tel:+919822012345"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200"
              >
                <Phone className="w-4 h-4 text-[#800000]" />
                <span>Call Us (+91 98220 12345)</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  openQuoteModal();
                }}
                className="w-full bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#111111] text-white font-bold text-sm py-2.5 rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer border border-[#800000]/40"
              >
                <span>Get a Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
