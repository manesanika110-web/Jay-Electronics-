import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { solutionsData } from '../data/siteDetails';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, 
  Shield,
  CheckCircle2, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  Building2, 
  PhoneCall, 
  Camera,
  Network,
  Lock,
  Flame,
  Headphones,
  Tv,
  Monitor,
  Sun,
  Wrench,
  Radio,
  Cpu,
  Cable,
  Volume2,
  Folder,
  Cloud,
  Zap,
  Sparkles,
  Server,
  CloudSun,
  Eye,
  Car,
  Moon,
  Smartphone,
  Thermometer,
  MapPin,
  Check,
  Search,
  RotateCw,
  Sliders,
  FileCheck,
  Clock,
  ThumbsUp
} from 'lucide-react';

const iconMap = {
  Camera,
  Network,
  Lock,
  PhoneCall,
  Flame,
  Headphones,
  Tv,
  Monitor,
  Sun,
  Wrench,
  Shield,
  ShieldCheck,
  Radio,
  Cpu,
  Cable,
  Volume2
};

const ALIAS_MAP = {
  'cctv': 'cctv-surveillance',
  'cctv-surveillance': 'cctv-surveillance',
  'ip-cctv-analog-cctv-solutions': 'cctv-surveillance',
  'networking': 'networking-solutions',
  'networking-solutions': 'networking-solutions',
  'lan-wan-networking': 'networking-solutions',
  'access-control': 'access-control',
  'access-control-systems': 'access-control',
  'video-door-phones': 'video-door-phones',
  'vdp': 'video-door-phones',
  'fire-alarm-systems': 'fire-alarm-systems',
  'fire-security': 'fire-alarm-systems',
  'fire-security-projects': 'fire-alarm-systems',
  'epabx-intercom': 'epabx-intercom',
  'epabx': 'epabx-intercom',
  'epabx-ip-pbx': 'epabx-intercom',
  'epabx-ip-pbx-systems': 'epabx-intercom',
  'audio-visual-solutions': 'audio-visual-solutions',
  'audio-visual': 'audio-visual-solutions',
  'audio-video-solutions': 'audio-visual-solutions',
  'led-display-solutions': 'led-display-solutions',
  'led-display': 'led-display-solutions',
  'led': 'led-display-solutions',
  'active-led-boards': 'led-display-solutions',
  'active-led-board-systems': 'led-display-solutions',
  'solar-security-solutions': 'solar-security-solutions',
  'solar-security': 'solar-security-solutions',
  'solar': 'solar-security-solutions',
  'solar-projects': 'solar-security-solutions',
  'annual-maintenance-contract': 'annual-maintenance-contract',
  'amc': 'annual-maintenance-contract',
  'city-surveillance-projects': 'city-surveillance-projects',
  'city-surveillance': 'city-surveillance-projects',
  'structured-cabling': 'structured-cabling',
  'structured-lan-telecom-cabling': 'structured-cabling',
  'office-automation': 'office-automation',
  'office-automation-systems': 'office-automation',
  'telecommunication': 'telecommunication',
  'telecommunication-projects': 'telecommunication'
};

export default function SolutionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { services, openQuoteModal } = useData();

  const normalizedSlug = slug ? slug.toLowerCase().trim() : '';
  const targetKey = ALIAS_MAP[normalizedSlug] || normalizedSlug;

  const staticSolution = solutionsData[targetKey] || solutionsData[normalizedSlug];

  const dynamicService = (services || []).find(s => {
    if (!s) return false;
    const sSlug = (s.slug || s.id || '').toLowerCase();
    const sTitleSlug = (s.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return sSlug === normalizedSlug || sSlug === targetKey || sTitleSlug === normalizedSlug || sTitleSlug === targetKey;
  });

  let solution = null;

  if (dynamicService || staticSolution) {
    const title = dynamicService?.title || staticSolution?.title || 'Solution Detail';
    const category = dynamicService?.category || staticSolution?.category || 'Engineering Solutions';
    const tagline = dynamicService?.shortDesc || dynamicService?.tagline || staticSolution?.tagline || '';
    const overview = dynamicService?.fullDesc || dynamicService?.overview || staticSolution?.overview || '';
    const iconName = dynamicService?.icon || dynamicService?.iconName || staticSolution?.iconName || 'ShieldCheck';

    const authorizedBrands = staticSolution?.authorizedBrands || [
      { name: 'CP PLUS (Aditya Infotech Ltd.)', detail: 'Authorized Dealer & Integration Partner.' },
      { name: 'Matrix Comsec Pvt. Ltd.', detail: 'Authorized Dealer & Enterprise Hardware Partner.' }
    ];

    const keyFeatures = dynamicService?.features || staticSolution?.keyFeatures || [
      'Enterprise Turnkey System Engineering',
      'ISO 9001:2015 Quality Installation Standards',
      '24/7 SLA Engineering Backup & Spare Parts'
    ];

    const majorProjects = staticSolution?.majorProjects || [
      'Turnkey Government & Enterprise System Integration Projects in Sangli, Kolhapur & Pune.'
    ];

    solution = {
      title,
      category,
      tagline,
      overview,
      iconName,
      authorizedBrands,
      keyFeatures,
      majorProjects
    };
  }

  if (!solution) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-[#5C0000]">Solution Not Found</h2>
        <p className="text-[#6B6B6B]">The requested solution page does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('/solutions')}
          className="bg-[#5C0000] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5C0000] transition-all cursor-pointer shadow-md"
        >
          View All Solutions
        </button>
      </div>
    );
  }

  const IconComponent = iconMap[solution.iconName] || ShieldCheck;

  // =========================================================================
  // CUSTOM REDESIGN FOR "CCTV & VIDEO SURVEILLANCE SOLUTIONS" PAGE
  // Matching Reference Mockup Image media_1790847589124.jpg
  // =========================================================================
  if (targetKey === 'cctv-surveillance') {
    return (
      <div className="w-full space-y-12 pb-16 bg-[#F8FAFC] animate-fadeIn">
        
        {/* 1. HERO BANNER (Compact Height) */}
        <section className="relative min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] flex items-center justify-center overflow-hidden">
          {/* Background Skyline Image with City Scrim */}
          <div className="absolute inset-0">
            <img
              src="/images/cctv_hero_bg.jpg"
              alt="CCTV & Video Surveillance Banner Background"
              className="w-full h-full object-cover object-center opacity-90 brightness-110 contrast-105"
            />
          </div>

          {/* Light Overlay Scrim so Image is Clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-5 sm:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left Column: Title & Buttons */}
              <div className="space-y-4 text-left max-w-3xl">
                {/* Security Badge Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-red-900/40 text-rose-200 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-200" />
                  <span>SECURITY & SURVEILLANCE</span>
                </div>

                {/* Main Headline */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['Outfit'] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-none">
                    CCTV & Video <span className="text-[#800000] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">Surveillance Solutions</span>
                  </h1>
                  <span className="text-xs sm:text-sm font-semibold text-slate-300 block mt-1">
                    (IP CCTV / Analog CCTV Solutions)
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Enterprise-grade IP & Analog video security systems with AI analytics & city surveillance capability.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={openQuoteModal}
                    className="bg-[#800000] hover:bg-white text-white hover:text-[#800000] font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all border border-red-900/40 flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Request Quote / Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:+919822012345"
                    className="bg-slate-900/70 hover:bg-white text-white hover:text-[#800000] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-slate-700 flex items-center gap-2 transition-all backdrop-blur-md shadow-md"
                  >
                    <PhoneCall className="w-4 h-4 text-rose-200" />
                    <span>Call Technical Helpdesk (+91 98220 12345)</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. EXECUTIVE SOLUTION OVERVIEW & PRODUCT RANGE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#800000] text-white border border-red-900/40 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Command Room Photo */}
              <div className="lg:col-span-6">
                <div className="w-full h-72 sm:h-84 rounded-2xl overflow-hidden shadow-md border border-red-900/40 relative bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                    alt="Control Room Video Wall Operator"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right Column: Overview Text & 6 Product Range Cards */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="w-10 h-1 bg-white rounded-full mb-1"></div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                  Executive Solution <span className="text-rose-200">Overview</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  Jay Electronics Private Limited (JEPL) is an <strong className="text-rose-200">Authorized Dealer & Premier Systems Integrator</strong> for world-class video surveillance systems.
                </p>

                {/* Product Range Grid (6 Cards in 2 Columns) */}
                <div className="pt-2">
                  <h4 className="text-xs font-extrabold text-rose-200 uppercase tracking-wider mb-2 font-['Outfit']">
                    Product Range:
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="bg-[#5C0000] border border-red-900/40 rounded-xl p-3 flex items-center gap-3 shadow-2xs hover:bg-white transition-all group">
                      <div className="w-9 h-9 rounded-full bg-[#800000] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#5C0000]">
                        <Camera className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-white font-['Outfit'] group-hover:text-[#800000]">IP CCTV Systems</h5>
                        <p className="text-[10px] text-slate-300 font-medium group-hover:text-slate-600">(Network-based 4K Cameras)</p>
                      </div>
                    </div>

                    <div className="bg-[#5C0000] border border-red-900/40 rounded-xl p-3 flex items-center gap-3 shadow-2xs hover:bg-white transition-all group">
                      <div className="w-9 h-9 rounded-full bg-[#800000] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#5C0000]">
                        <RotateCw className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-white font-['Outfit'] group-hover:text-[#800000]">PTZ Cameras</h5>
                        <p className="text-[10px] text-slate-300 font-medium group-hover:text-slate-600">(360-Degree Pan-Tilt-Zoom Cameras)</p>
                      </div>
                    </div>

                    <div className="bg-[#5C0000] border border-red-900/40 rounded-xl p-3 flex items-center gap-3 shadow-2xs hover:bg-white transition-all group">
                      <div className="w-9 h-9 rounded-full bg-[#800000] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#5C0000]">
                        <Camera className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-white font-['Outfit'] group-hover:text-[#800000]">HD Analog Cameras</h5>
                        <p className="text-[10px] text-slate-300 font-medium group-hover:text-slate-600">(High-Definition Cameras)</p>
                      </div>
                    </div>

                    <div className="bg-[#5C0000] border border-red-900/40 rounded-xl p-3 flex items-center gap-3 shadow-2xs hover:bg-white transition-all group">
                      <div className="w-9 h-9 rounded-full bg-[#800000] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#5C0000]">
                        <Sliders className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-white font-['Outfit'] group-hover:text-[#800000]">Varifocal Cameras</h5>
                        <p className="text-[10px] text-slate-300 font-medium group-hover:text-slate-600">(Adjustable Lens Cameras)</p>
                      </div>
                    </div>

                    <div className="bg-[#5C0000] border border-red-900/40 rounded-xl p-3 flex items-center gap-3 shadow-2xs hover:bg-white transition-all group">
                      <div className="w-9 h-9 rounded-full bg-[#800000] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#5C0000]">
                        <Car className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-white font-['Outfit'] group-hover:text-[#800000]">AI-Powered ANPR</h5>
                        <p className="text-[10px] text-slate-300 font-medium group-hover:text-slate-600">(Automatic Number Plate Recognition)</p>
                      </div>
                    </div>

                    <div className="bg-[#5C0000] border border-red-900/40 rounded-xl p-3 flex items-center gap-3 shadow-2xs hover:bg-white transition-all group">
                      <div className="w-9 h-9 rounded-full bg-[#800000] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#5C0000]">
                        <Thermometer className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-white font-['Outfit'] group-hover:text-[#800000]">Thermal Imaging</h5>
                        <p className="text-[10px] text-[#slate-300] group-hover:text-slate-600 font-medium">(Thermal Cameras for Temperature Scanning)</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 3. AUTHORIZED DEALERSHIPS & STRATEGIC OEM PARTNERS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8E6E6] rounded-3xl p-6 sm:p-8 border border-[#800000]/20 shadow-md text-slate-900 space-y-6 relative overflow-hidden">
            <div className="space-y-2 text-left">
              <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] tracking-tight text-[#5C0000]">
                Authorized Dealerships & <span className="text-[#800000]">Strategic OEM Partners</span>
              </h3>
            </div>

            {/* 3 Partner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1: CP PLUS */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-[#800000] transition-all space-y-3 text-left group">
                <div className="bg-white rounded-xl p-3 h-14 flex items-center justify-center shadow-md border border-slate-100">
                  <span className="text-xl font-black text-[#C8102E] font-['Outfit'] tracking-wider">CP PLUS</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#5C0000] group-hover:text-[#800000] font-['Outfit'] transition-colors">Aditya Infotech Ltd.</h4>
                  <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed mt-1 transition-colors">
                    Authorized dealer for AI-driven video surveillance hardware and software solutions.
                  </p>
                </div>
              </div>

              {/* Card 2: MATRIX COMSEC */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-[#800000] transition-all space-y-3 text-left group">
                <div className="bg-white rounded-xl p-3 h-14 flex items-center justify-center shadow-md border border-slate-100">
                  <span className="text-xl font-black text-[#00529B] font-['Outfit'] tracking-wider">MATRIX</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#5C0000] group-hover:text-[#800000] font-['Outfit'] transition-colors">Matrix Comsec Pvt. Ltd.</h4>
                  <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed mt-1 transition-colors">
                    Authorized dealer for enterprise-grade IP video surveillance nodes, NVRs, and VMS integration.
                  </p>
                </div>
              </div>

              {/* Card 3: DAHUA & HONEYWELL */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-[#800000] transition-all space-y-3 text-left group">
                <div className="bg-white rounded-xl p-3 h-14 flex items-center justify-center gap-4 shadow-md border border-slate-100">
                  <span className="text-base font-black text-[#E31837] font-['Outfit']">dahua</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-base font-black text-[#EE3124] font-['Outfit']">Honeywell</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#5C0000] group-hover:text-[#800000] font-['Outfit'] transition-colors">Dahua & Honeywell</h4>
                  <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed mt-1 transition-colors">
                    High-definition 4MP / 4K cameras, thermal cameras, and thermal monitoring systems.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. KEY SYSTEM CAPABILITIES & TECHNICAL FEATURES (6 Cards Grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-left space-y-2">
            <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
              Key System Capabilities & <span className="text-[#800000]">Technical Features</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                num: '01',
                title: 'High-Resolution 4MP & 4K Cameras',
                desc: 'Varifocal and PTZ cameras for high-clarity video capture.',
                icon: Camera
              },
              {
                num: '02',
                title: 'AI ANPR Technology',
                desc: 'Automated vehicle license plate scanning and recording system.',
                icon: Car
              },
              {
                num: '03',
                title: 'Control Room & VMS Integration',
                desc: 'Seamless integration with central police & control room video wall and VMS software.',
                icon: Monitor
              },
              {
                num: '04',
                title: 'Night-Vision & Full-Color',
                desc: 'Night-vision cameras delivering crisp, full-color footage even in total darkness.',
                icon: Moon
              },
              {
                num: '05',
                title: 'Remote Mobile & Cloud Monitoring',
                desc: '24/7 live monitoring via mobile app and secure cloud integration.',
                icon: Smartphone
              },
              {
                num: '06',
                title: 'Thermal & Fever Detection',
                desc: 'Thermal cameras for body temperature scanning at hospitals and high-traffic public areas.',
                icon: Thermometer
              }
            ].map((card) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={card.num}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl p-4 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between text-center relative overflow-hidden h-full"
                >
                  <div>
                    {/* Icon Circle */}
                    <div className="w-12 h-12 rounded-full bg-[#5C0000] text-white flex items-center justify-center mx-auto mb-3 border border-slate-700 shadow-md group-hover:bg-[#0055FF] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <CardIcon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#0055FF] transition-colors block mb-1">
                      {card.num}
                    </span>

                    <h3 className="text-xs font-extrabold text-[#5C0000] font-['Outfit'] group-hover:text-[#0055FF] transition-colors leading-snug mb-1.5">
                      {card.title}
                    </h3>

                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. MAJOR EXECUTED PROJECTS (4 Cards Grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-left space-y-2">
            <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
              Major Executed <span className="text-[#800000]">Projects</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
            {[
              {
                title: 'Paithan City (Chhatrapati Sambhajinagar)',
                desc: 'City surveillance system with 91 ANPR, PTZ, and 4MP Varifocal cameras.',
                image: '/images/city_surveillance.jpg'
              },
              {
                title: 'Tasgaon City (Sangli)',
                desc: '96 High-resolution 4MP cameras and IP-based Public Address (PA) system.',
                image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Hinjawadi IT Park (Pune)',
                desc: '96 High-resolution 4MP city surveillance cameras.',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Ichalkaranji (Kolhapur)',
                desc: '261 High-resolution 4MP camera city surveillance network.',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={openQuoteModal}
                className="bg-[#4A0000] border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg hover:border-[#800000] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="h-36 overflow-hidden relative bg-slate-900 border-b border-slate-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 space-y-1 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-black font-['Outfit'] text-rose-200">
                      <MapPin className="w-3.5 h-3.5 text-rose-200 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. BOTTOM CALL TO ACTION (CTA) BOX */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#5C0000] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#800000] flex flex-col space-y-6 shadow-xl relative overflow-hidden text-left">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#800000]/10 border border-[#800000]/30 text-rose-200 flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-8 h-8 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] text-white">
                    Ready to Get Your CCTV Project Executed?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
                    Get expert guidance for your CCTV project with site survey, technical planning and project estimate.
                  </p>
                </div>
              </div>

              <button
                onClick={openQuoteModal}
                className="bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#3B0000] text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg border border-red-900/40 shrink-0 cursor-pointer active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Request Quote / Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom 5 Feature Pillars Line */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs font-bold text-slate-300">
              <div className="flex items-center justify-center gap-1.5">
                <FileCheck className="w-4 h-4 text-rose-200" />
                <span>Site Survey</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Sliders className="w-4 h-4 text-rose-200" />
                <span>Technical Planning</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Shield className="w-4 h-4 text-rose-200" />
                <span>Custom Solution</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-200" />
                <span>On-Time Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <ThumbsUp className="w-4 h-4 text-rose-200" />
                <span>Reliable Support</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    );
  }

  // =========================================================================
  // CUSTOM PIXEL-PERFECT REDESIGN FOR "ACTIVE LED BOARD SYSTEMS" PAGE
  // Matching Reference Mockup Image media_1790846685894.png
  // =========================================================================
  if (targetKey === 'led-display-solutions') {
    return (
      <div className="w-full space-y-12 pb-16 bg-[#F8FAFC] animate-fadeIn">
        
        {/* 1. HERO BANNER (Compact Height) */}
        <section className="relative min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/cctv_hero_bg.jpg"
              alt="Active LED Display Banner Background"
              className="w-full h-full object-cover object-center opacity-90 brightness-110 contrast-105"
            />
          </div>

          {/* Light Overlay Scrim so Image is Clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-5 sm:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Title & Buttons */}
              <div className="lg:col-span-6 space-y-4 text-left">
                {/* Category Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-red-900/40 text-rose-200 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md">
                  <Folder className="w-3.5 h-3.5 fill-[#800000] text-transparent" />
                  <span>VISUAL INFRASTRUCTURE</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['Outfit'] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight">
                  Active LED Board <span className="text-[#800000] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">System</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Active LED video walls, outdoor digital billboards, and indoor fine-pitch command displays.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={openQuoteModal}
                    className="bg-[#800000] hover:bg-[#111111] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all border border-red-900/40 flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Request Quote / Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:+919822012345"
                    className="bg-slate-900/70 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-slate-700 flex items-center gap-2 transition-all backdrop-blur-md shadow-md"
                  >
                    <PhoneCall className="w-4 h-4 text-rose-200" />
                    <span>Call Technical Helpdesk (+91 98220 12345)</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Outdoor Billboard Image Visual */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="w-full max-w-lg h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/60 relative bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                    alt="Active Outdoor LED Display Billboard"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#800000] text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                    SMART CITY LED
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. EXECUTIVE SOLUTION OVERVIEW (Two-Column Section) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Indoor Control Room Photo */}
              <div className="lg:col-span-6">
                <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-slate-200 relative bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                    alt="Command & Control Room LED Video Wall"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right Column: Overview Text & Category Pill */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="w-10 h-1 bg-[#800000] rounded-full mb-1"></div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
                  Executive Solution <span className="text-[#800000]">Overview</span>
                </h2>

                <p className="text-xs sm:text-sm text-[#6B6B6B] font-medium leading-relaxed">
                  Active LED Display Solutions by Jay Electronics Pvt. Ltd. (JEPL) is a key solution in our <strong className="text-[#5C0000]">Visual Infrastructure</strong> division. We provide high-quality Active LED Displays for smart city command and control rooms, municipal information boards, traffic update boards and commercial outdoor digital billboards.
                </p>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2F2F2]/80 border border-blue-200 text-[#5C0000] text-xs font-bold shadow-xs">
                    <Folder className="w-4 h-4 text-[#800000]" />
                    <span>Category: Visual Infrastructure</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. KEY SYSTEM CAPABILITIES & TECHNICAL FEATURES (5 Cards Grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-left space-y-2">
            <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
              Key System Capabilities & <span className="text-[#800000]">Technical Features</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                num: '01',
                title: 'Indoor Fine-Pitch LED Video Walls',
                desc: 'Bezel-free high-refresh rate LED video walls for control rooms and command centers.',
                icon: Monitor
              },
              {
                num: '02',
                title: 'Weatherproof Outdoor Displays',
                desc: 'High-brightness LED boards resistant to sun, rain and dust.',
                icon: Sun
              },
              {
                num: '03',
                title: 'Active LED Information Boards',
                desc: 'Digital boards for municipal, highways and smart cities with real-time information.',
                icon: Tv
              },
              {
                num: '04',
                title: 'Cloud Content Management',
                desc: 'Simplified and central content recovery via cloud software.',
                icon: Cloud
              },
              {
                num: '05',
                title: 'Energy Efficient Design',
                desc: 'Low power consumption and low heat dissipation for long life.',
                icon: Sparkles
              }
            ].map((card) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={card.num}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl p-4 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between text-center relative overflow-hidden h-full"
                >
                  <div>
                    {/* Icon Circle */}
                    <div className="w-12 h-12 rounded-full bg-[#5C0000] text-white flex items-center justify-center mx-auto mb-3 border border-slate-700 shadow-md group-hover:bg-[#0055FF] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <CardIcon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#0055FF] transition-colors block mb-1">
                      {card.num}
                    </span>

                    <h3 className="text-xs font-extrabold text-[#5C0000] font-['Outfit'] group-hover:text-[#0055FF] transition-colors leading-snug mb-1.5">
                      {card.title}
                    </h3>

                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. AUTHORIZED TECHNOLOGY PARTNERS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#5C0000] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl text-white flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 text-left max-w-xl">
              <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] tracking-tight">
                Authorized Technology <span className="text-[#800000]">Partners</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Sony, Samsung & Indigenous OEM Partners — High-refresh rate LED modules, 4K video processors and digital signage controllers.
              </p>
            </div>

            {/* Brand Logo Cards */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 shrink-0">
              <div className="bg-[#4A0000] border border-slate-700/80 px-6 py-3.5 rounded-xl font-black tracking-widest text-lg text-white shadow-inner hover:border-[#800000] transition-colors flex items-center justify-center min-w-[120px]">
                SONY
              </div>
              <div className="bg-[#4A0000] border border-slate-700/80 px-6 py-3.5 rounded-xl font-black tracking-widest text-lg text-white shadow-inner hover:border-[#800000] transition-colors flex items-center justify-center min-w-[140px]">
                SAMSUNG
              </div>
              <div className="bg-[#4A0000] border border-slate-700/80 px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-300 shadow-inner hover:border-[#800000] transition-colors flex items-center justify-center min-w-[160px] text-center">
                INDIGENOUS OEM PARTNERS
              </div>
            </div>
          </div>
        </section>

        {/* 5. MAJOR PROJECTS & APPLICATIONS (3 Image Cards Grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-left space-y-2">
            <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
              Major Projects & <span className="text-[#800000]">Applications</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Smart City Command & Control Centers',
                desc: 'Real-time video monitoring for smart cities.',
                image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Municipal Corporations',
                desc: 'Information and announcement boards for municipalities.',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Traffic & Highway Displays',
                desc: 'Digital VMS boards for traffic and road safety.',
                image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={openQuoteModal}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image Container */}
                  <div className="h-48 sm:h-52 overflow-hidden relative bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Floating Round Orange Icon Badge */}
                    <div className="w-10 h-10 rounded-full bg-[#800000] text-white flex items-center justify-center shadow-lg border-2 border-white absolute -bottom-5 left-4 z-10">
                      <Monitor className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="pt-7 px-5 pb-5 space-y-2 text-left">
                    <h3 className="text-base font-extrabold text-[#5C0000] font-['Outfit'] group-hover:text-[#800000] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-5 pb-4 pt-1 flex justify-end">
                  <div className="w-7 h-7 rounded-full bg-[#5C0000] text-white flex items-center justify-center text-xs shadow-xs group-hover:bg-[#800000] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>



      </div>
    );
  }

  // DEFAULT RENDER FOR OTHER SOLUTIONS
  return (
    <div className="w-full space-y-12 pb-16 animate-fadeIn">
      
      {/* Hero Header Banner (Compact Height) */}
      <section className="bg-[#F8E6E6] text-slate-900 border-b-4 border-[#800000] py-5 sm:py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#800000]/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-3 text-left">
          
          <div className="flex items-center gap-4 pt-1">
            <div className="bg-[#800000] p-3 rounded-2xl text-white border border-red-900/40 shadow-lg shrink-0">
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-[#800000] uppercase tracking-widest bg-white/80 px-3 py-0.5 rounded-full border border-red-200 inline-block mb-1 shadow-xs">
                {solution.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
                {solution.title}
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 max-w-3xl leading-relaxed font-normal">
            {solution.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={openQuoteModal}
              className="bg-[#800000] hover:bg-[#5C0000] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer border border-red-900/40"
            >
              <span>Request Quote / Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+919822012345"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-slate-700 transition-all flex items-center gap-2 shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-rose-200" />
              <span>Call Technical Helpdesk (+91 98220 12345)</span>
            </a>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Solution Overview Card */}
        <div className="stitch-card p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl font-extrabold text-[#5C0000] font-['Outfit'] border-b border-slate-200 pb-3 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#800000]"></span>
            Executive Solution Overview
          </h2>
          <p className="text-base text-slate-700 leading-relaxed font-normal">
            {solution.overview}
          </p>
        </div>

        {/* Authorized Brands & OEM Alliances */}
        {solution.authorizedBrands && solution.authorizedBrands.length > 0 && (
          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border-l-4 border-[#800000] border border-slate-200 space-y-6 shadow-xs">
            <h3 className="text-xl font-extrabold text-[#5C0000] font-['Outfit'] flex items-center gap-2">
              <Award className="w-6 h-6 text-[#800000]" />
              Authorized Dealerships & Strategic OEM Partners
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.authorizedBrands.map((brand, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-base font-bold text-[#5C0000]">{brand.name}</h4>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] leading-normal font-normal">{brand.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key System Capabilities & Technical Features (Reference Card Grid) */}
        {solution.keyFeatures && solution.keyFeatures.length > 0 && (
          <section className="space-y-6">
            <div className="text-left space-y-2">
              <div className="w-10 h-1 bg-[#800000] rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
                Key System Capabilities & <span className="text-[#800000]">Technical Features</span>
              </h2>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
              solution.keyFeatures.length >= 6 ? 'lg:grid-cols-6' : solution.keyFeatures.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
            } gap-4`}>
              {solution.keyFeatures.map((feat, i) => {
                const num = String(i + 1).padStart(2, '0');
                let cardTitle = '';
                let cardDesc = '';
                let CardIcon = ShieldCheck;

                if (typeof feat === 'object' && feat !== null) {
                  cardTitle = feat.title || feat.name || '';
                  cardDesc = feat.desc || feat.detail || '';
                  CardIcon = feat.icon || IconComponent || ShieldCheck;
                } else {
                  const text = String(feat).trim();
                  if (text.includes(':')) {
                    const parts = text.split(':');
                    cardTitle = parts[0].trim();
                    cardDesc = parts.slice(1).join(':').trim();
                  } else if (text.includes(' - ')) {
                    const parts = text.split(' - ');
                    cardTitle = parts[0].trim();
                    cardDesc = parts.slice(1).join(' - ').trim();
                  } else {
                    cardTitle = text;
                    cardDesc = '';
                  }

                  // Pick appropriate Lucide icon based on keyword or index
                  const lowerText = text.toLowerCase();
                  if (lowerText.includes('camera') || lowerText.includes('cctv') || lowerText.includes('video') || lowerText.includes('anpr') || lowerText.includes('vision') || lowerText.includes('night')) {
                    CardIcon = Camera;
                  } else if (lowerText.includes('network') || lowerText.includes('lan') || lowerText.includes('wan') || lowerText.includes('wi-fi') || lowerText.includes('port')) {
                    CardIcon = Network;
                  } else if (lowerText.includes('fiber') || lowerText.includes('cable') || lowerText.includes('cabling') || lowerText.includes('rack')) {
                    CardIcon = Cable;
                  } else if (lowerText.includes('biometric') || lowerText.includes('access') || lowerText.includes('lock') || lowerText.includes('card') || lowerText.includes('barrier') || lowerText.includes('turnstile')) {
                    CardIcon = Lock;
                  } else if (lowerText.includes('fire') || lowerText.includes('smoke') || lowerText.includes('alarm') || lowerText.includes('flame') || lowerText.includes('suppression')) {
                    CardIcon = Flame;
                  } else if (lowerText.includes('epabx') || lowerText.includes('pbx') || lowerText.includes('phone') || lowerText.includes('intercom') || lowerText.includes('voip') || lowerText.includes('extension')) {
                    CardIcon = Headphones;
                  } else if (lowerText.includes('solar') || lowerText.includes('power') || lowerText.includes('battery') || lowerText.includes('energy') || lowerText.includes('green')) {
                    CardIcon = Sun;
                  } else if (lowerText.includes('display') || lowerText.includes('led') || lowerText.includes('wall') || lowerText.includes('screen') || lowerText.includes('vms') || lowerText.includes('projector') || lowerText.includes('whiteboard')) {
                    CardIcon = Monitor;
                  } else if (lowerText.includes('server') || lowerText.includes('cloud') || lowerText.includes('storage') || lowerText.includes('nas') || lowerText.includes('database')) {
                    CardIcon = Server;
                  } else if (lowerText.includes('amc') || lowerText.includes('maintenance') || lowerText.includes('repair') || lowerText.includes('sla') || lowerText.includes('cleaning')) {
                    CardIcon = Wrench;
                  } else {
                    const fallbackIcons = [ShieldCheck, Cpu, Zap, Sparkles, Folder, CheckCircle2];
                    CardIcon = fallbackIcons[i % fallbackIcons.length];
                  }
                }

                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl p-4 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between text-center relative overflow-hidden h-full"
                  >
                    <div>
                      {/* Top Navy Icon Circle */}
                      <div className="w-12 h-12 rounded-full bg-[#5C0000] text-white flex items-center justify-center mx-auto mb-3 border border-slate-700 shadow-md group-hover:bg-[#0055FF] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        <CardIcon className="w-6 h-6 stroke-[2]" />
                      </div>

                      {/* Numbering */}
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#0055FF] transition-colors block mb-1">
                        {num}
                      </span>

                      {/* Title */}
                      <h3 className="text-xs sm:text-sm font-extrabold text-[#5C0000] font-['Outfit'] group-hover:text-[#0055FF] transition-colors leading-snug mb-1.5">
                        {cardTitle}
                      </h3>

                      {/* Description */}
                      {cardDesc && (
                        <p className="text-[11px] text-[#6B6B6B] font-medium leading-relaxed">
                          {cardDesc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Major Projects Executed */}
        {solution.majorProjects && solution.majorProjects.length > 0 && (
          <div className="stitch-card p-6 sm:p-10 space-y-6">
            <h3 className="text-2xl font-extrabold text-[#5C0000] font-['Outfit'] flex items-center gap-2 border-b border-slate-200 pb-3">
              <Building2 className="w-6 h-6 text-[#800000]" />
              Major Executed Projects & Portfolio Highlights
            </h3>
            <div className="space-y-3">
              {solution.majorProjects.map((proj, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border-l-4 border-[#800000] border border-slate-200">
                  <ChevronRight className="w-4 h-4 text-[#800000] shrink-0 mt-1" />
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">{proj}</p>
                </div>
              ))}
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
