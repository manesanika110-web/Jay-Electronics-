import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { solutionsData } from '../data/siteDetails';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  Building2, 
  PhoneCall, 
  FileText,
  Camera,
  Network,
  Lock,
  Flame,
  Headphones,
  Tv,
  Monitor,
  Sun,
  Wrench
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
  Wrench
};

export default function SolutionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openQuoteModal } = useData();

  const solution = solutionsData[slug];

  if (!solution) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-[#222222]">Solution Not Found</h2>
        <p className="text-gray-600">The requested solution page does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('/services')}
          className="bg-[#B5263F] text-white px-6 py-2.5 rounded-lg font-bold"
        >
          View All Solutions
        </button>
      </div>
    );
  }

  const IconComponent = iconMap[solution.iconName] || ShieldCheck;

  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      
      {/* Hero Header Banner */}
      <section className="bg-[#222222] text-white border-b-4 border-[#B5263F] py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#B5263F]" />
            <Link to="/services" className="hover:text-white transition">Solutions</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#B5263F]" />
            <span className="text-[#B5263F] font-bold">{solution.title}</span>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="bg-[#B5263F] p-3.5 rounded-xl text-white shadow-lg shrink-0">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-[#B5263F] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block mb-1">
                {solution.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
                {solution.title}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-xl text-gray-300 max-w-3xl leading-relaxed pt-1">
            {solution.tagline}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={openQuoteModal}
              className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-sm px-6 py-3 rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Request Quote / Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+919822012345"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3 rounded-lg border border-white/20 transition flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#B5263F]" />
              <span>Call Technical Helpdesk (+91 98220 12345)</span>
            </a>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Solution Overview Card */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E0E0E0] shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-[#222222] font-['Outfit'] border-b border-[#E0E0E0] pb-3 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#B5263F]"></span>
            Executive Solution Overview
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {solution.overview}
          </p>
        </div>

        {/* Authorized Brands & OEM Alliances */}
        {solution.authorizedBrands && solution.authorizedBrands.length > 0 && (
          <div className="bg-[#F5F5F5] p-6 sm:p-10 rounded-2xl border-l-4 border-[#B5263F] space-y-6">
            <h3 className="text-xl font-extrabold text-[#222222] font-['Outfit'] flex items-center gap-2">
              <Award className="w-6 h-6 text-[#B5263F]" />
              Authorized Dealerships & Strategic OEM Partners
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.authorizedBrands.map((brand, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-[#E0E0E0] shadow-xs space-y-2">
                  <h4 className="text-base font-bold text-[#B5263F]">{brand.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-normal">{brand.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features Grid */}
        {solution.keyFeatures && (
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[#222222] font-['Outfit'] flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#B5263F]" />
              Key System Capabilities & Technical Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {solution.keyFeatures.map((feat, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-[#E0E0E0] shadow-xs hover:border-[#B5263F] transition flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B5263F] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#333333] leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Major Projects Executed (PDF Data) */}
        {solution.majorProjects && solution.majorProjects.length > 0 && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E0E0E0] shadow-sm space-y-6">
            <h3 className="text-2xl font-extrabold text-[#222222] font-['Outfit'] flex items-center gap-2 border-b border-[#E0E0E0] pb-3">
              <Building2 className="w-6 h-6 text-[#B5263F]" />
              Major Executed Projects & Portfolio Highlights
            </h3>
            <div className="space-y-3">
              {solution.majorProjects.map((proj, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-[#F5F5F5] rounded-lg border-l-4 border-[#B5263F]">
                  <ChevronRight className="w-4 h-4 text-[#B5263F] shrink-0 mt-1" />
                  <p className="text-sm font-semibold text-[#333333] leading-relaxed">{proj}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action Box */}
        <div className="bg-gradient-to-r from-[#222222] to-[#333333] text-white p-8 sm:p-10 rounded-2xl border-2 border-[#B5263F] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold font-['Outfit']">Need Turnkey Execution for {solution.title}?</h3>
            <p className="text-sm text-gray-300">Contact our certified engineering team for technical design, site surveys, and commercial proposals.</p>
          </div>
          <button
            onClick={openQuoteModal}
            className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition shrink-0 cursor-pointer"
          >
            Get Expert Estimate
          </button>
        </div>

      </div>
    </div>
  );
}
