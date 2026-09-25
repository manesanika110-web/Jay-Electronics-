import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, ChevronRight, Shield } from 'lucide-react';
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
  const { openQuoteModal } = useData();

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

  const solutionsItems = [
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

  const aboutItems = [
    { name: 'Company Profile', path: '/about/company-profile' },
    { name: 'Our Story', path: '/about/our-story' },
    { name: 'Vision & Mission', path: '/about/vision-mission' },
    { name: 'Core Values', path: '/about/core-values' },
    { name: 'Why Choose JEPL', path: '/about/why-choose-jepl' },
    { name: 'Leadership', path: '/about/leadership' },
    { name: 'Our Team', path: '/about/our-team' },
  ];

  const isActive = (path) => location.pathname === path;
  const isParentActive = (prefix) => location.pathname.startsWith(prefix);

  // Mouse handlers for smooth hover dropdowns on desktop
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
    <header className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-[#E0E0E0] ${
      scrolled ? 'shadow-md py-3' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group py-1">
            <div className="je-logo-wrapper h-11 sm:h-13 shrink-0">
              <img src="/images/je_logo.png" alt="JAY Electronics Logo" className="h-full w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* 1. Home Link */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-b-2 border-[#B5263F]'
                  : 'text-[#333333] hover:text-[#B5263F] hover:bg-[#F5F5F5]'
              }`}
            >
              Home
            </Link>

            {/* 2. About Us Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button
                onClick={() => navigate('/about')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  isParentActive('/about')
                    ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-b-2 border-[#B5263F]'
                    : 'text-[#333333] hover:text-[#B5263F] hover:bg-[#F5F5F5]'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-[#B5263F]' : ''}`} />
              </button>

              {/* Desktop About Dropdown Popover */}
              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white border border-[#E0E0E0] rounded-xl shadow-xl py-2 z-50 animate-fadeIn border-t-2 border-t-[#B5263F]">
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#B5263F] hover:bg-[#F5F5F5] border-b border-gray-100"
                  >
                    Overview & All Details
                  </Link>
                  {aboutItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2.5 text-xs font-semibold transition-colors ${
                        isActive(item.path)
                          ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-l-4 border-[#B5263F]'
                          : 'text-[#333333] hover:bg-[#F5F5F5] hover:text-[#B5263F]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Solutions Dropdown (Replaced Services) */}
            <div 
              className="relative"
              onMouseEnter={handleSolutionsMouseEnter}
              onMouseLeave={handleSolutionsMouseLeave}
            >
              <button
                onClick={() => navigate('/solutions')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  isParentActive('/solutions') || isParentActive('/services')
                    ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-b-2 border-[#B5263F]'
                    : 'text-[#333333] hover:text-[#B5263F] hover:bg-[#F5F5F5]'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180 text-[#B5263F]' : ''}`} />
              </button>

              {/* Desktop Solutions Dropdown Popover */}
              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white border border-[#E0E0E0] rounded-xl shadow-xl py-2 z-50 animate-fadeIn border-t-2 border-t-[#B5263F]">
                  <Link
                    to="/solutions"
                    className="block px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#B5263F] hover:bg-[#F5F5F5] border-b border-gray-100"
                  >
                    All Engineering Solutions
                  </Link>
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2.5 text-xs font-semibold transition-colors ${
                        isActive(item.path)
                          ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-l-4 border-[#B5263F]'
                          : 'text-[#333333] hover:bg-[#F5F5F5] hover:text-[#B5263F]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Projects Link */}
            <Link
              to="/projects"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/projects')
                  ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-b-2 border-[#B5263F]'
                  : 'text-[#333333] hover:text-[#B5263F] hover:bg-[#F5F5F5]'
              }`}
            >
              Projects
            </Link>

            {/* 5. Blog Link */}
            <Link
              to="/blog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/blog')
                  ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-b-2 border-[#B5263F]'
                  : 'text-[#333333] hover:text-[#B5263F] hover:bg-[#F5F5F5]'
              }`}
            >
              Blog
            </Link>

            {/* 6. Contact Us Link */}
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-b-2 border-[#B5263F]'
                  : 'text-[#333333] hover:text-[#B5263F] hover:bg-[#F5F5F5]'
              }`}
            >
              Contact Us
            </Link>

          </nav>

          {/* Desktop Right CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919822012345"
              className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-md text-[#333333] hover:text-[#B5263F] border border-[#E0E0E0] hover:border-[#B5263F] transition-all bg-white"
            >
              <Phone className="w-3.5 h-3.5 text-[#B5263F]" />
              <span>Call Us</span>
            </a>
            <button
              onClick={openQuoteModal}
              className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-bold text-xs px-4 py-2 rounded-md shadow-sm hover:shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#333333] hover:text-[#B5263F] hover:bg-[#F5F5F5] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#B5263F]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t border-[#E0E0E0] pt-3 animate-fadeIn bg-white max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              
              {/* Home */}
              <Link
                to="/"
                className={`px-4 py-2.5 rounded-md text-base font-medium ${
                  isActive('/')
                    ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-l-4 border-[#B5263F]'
                    : 'text-[#333333] hover:bg-[#F5F5F5] hover:text-[#B5263F]'
                }`}
              >
                Home
              </Link>

              {/* About Us Mobile Accordion */}
              <div>
                <div className="flex items-center justify-between px-4 py-2.5 rounded-md hover:bg-[#F5F5F5]">
                  <Link
                    to="/about"
                    className={`text-base font-medium ${
                      isParentActive('/about') ? 'text-[#B5263F] font-bold' : 'text-[#333333]'
                    }`}
                  >
                    About Us
                  </Link>
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="p-1 rounded text-[#B5263F] hover:bg-gray-200"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {mobileAboutOpen && (
                  <div className="pl-6 space-y-1 border-l-2 border-[#B5263F] ml-4 py-1">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block py-2 text-sm font-semibold ${
                          isActive(item.path) ? 'text-[#B5263F] font-bold' : 'text-gray-600 hover:text-[#B5263F]'
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
                <div className="flex items-center justify-between px-4 py-2.5 rounded-md hover:bg-[#F5F5F5]">
                  <Link
                    to="/solutions"
                    className={`text-base font-medium ${
                      isParentActive('/solutions') || isParentActive('/services') ? 'text-[#B5263F] font-bold' : 'text-[#333333]'
                    }`}
                  >
                    Solutions
                  </Link>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="p-1 rounded text-[#B5263F] hover:bg-gray-200"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {mobileSolutionsOpen && (
                  <div className="pl-6 space-y-1 border-l-2 border-[#B5263F] ml-4 py-1">
                    {solutionsItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block py-2 text-sm font-semibold ${
                          isActive(item.path) ? 'text-[#B5263F] font-bold' : 'text-gray-600 hover:text-[#B5263F]'
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
                className={`px-4 py-2.5 rounded-md text-base font-medium ${
                  isActive('/projects')
                    ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-l-4 border-[#B5263F]'
                    : 'text-[#333333] hover:bg-[#F5F5F5] hover:text-[#B5263F]'
                }`}
              >
                Projects
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                className={`px-4 py-2.5 rounded-md text-base font-medium ${
                  isActive('/blog')
                    ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-l-4 border-[#B5263F]'
                    : 'text-[#333333] hover:bg-[#F5F5F5] hover:text-[#B5263F]'
                }`}
              >
                Blog
              </Link>

              {/* Contact Us */}
              <Link
                to="/contact"
                className={`px-4 py-2.5 rounded-md text-base font-medium ${
                  isActive('/contact')
                    ? 'text-[#B5263F] bg-[#F5F5F5] font-bold border-l-4 border-[#B5263F]'
                    : 'text-[#333333] hover:bg-[#F5F5F5] hover:text-[#B5263F]'
                }`}
              >
                Contact Us
              </Link>

            </div>

            <div className="mt-4 pt-3 border-t border-[#E0E0E0] flex flex-col gap-2 px-2">
              <a
                href="tel:+919822012345"
                className="flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold text-[#333333] bg-[#F5F5F5] border border-[#E0E0E0]"
              >
                <Phone className="w-4 h-4 text-[#B5263F]" />
                <span>Call Us (+91 98220 12345)</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  openQuoteModal();
                }}
                className="w-full bg-[#B5263F] hover:bg-[#8F1D32] text-white font-bold text-sm py-2.5 rounded-md shadow flex items-center justify-center gap-2 cursor-pointer"
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
