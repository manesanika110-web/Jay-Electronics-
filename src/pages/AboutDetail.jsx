import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { aboutData } from '../data/siteDetails';
import { 
  Building2, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  PhoneCall, 
  ShieldCheck, 
  Users, 
  Compass, 
  Target 
} from 'lucide-react';

export default function AboutDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const item = aboutData[slug];

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-[#222222]">Page Not Found</h2>
        <p className="text-gray-600">The requested About Us page does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('/about')}
          className="bg-[#B5263F] text-white px-6 py-2.5 rounded-lg font-bold"
        >
          View About Us Overview
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      
      {/* Hero Header Banner */}
      <section className="bg-[#333333] text-white border-b-4 border-[#B5263F] py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#B5263F]" />
            <Link to="/about" className="hover:text-white transition">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#B5263F]" />
            <span className="text-[#B5263F] font-bold">{item.title}</span>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="bg-[#B5263F] p-3.5 rounded-xl text-white shadow-lg shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-[#B5263F] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block mb-1">
                JAY ELECTRONICS PVT LTD • Est. 1989
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
                {item.title}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-xl text-gray-300 max-w-3xl leading-relaxed pt-1">
            {item.tagline}
          </p>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Detailed Narrative */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E0E0E0] shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-[#222222] font-['Outfit'] border-b border-[#E0E0E0] pb-3 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#B5263F]"></span>
            {item.title} Overview
          </h2>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {item.content}
          </p>
        </div>

        {/* Highlights List */}
        {item.highlights && (
          <div className="bg-[#F5F5F5] p-6 sm:p-10 rounded-2xl border-l-4 border-[#B5263F] space-y-6">
            <h3 className="text-xl font-extrabold text-[#222222] font-['Outfit'] flex items-center gap-2">
              <Award className="w-6 h-6 text-[#B5263F]" />
              Key Pillars & Distinctions
            </h3>
            <div className="space-y-3">
              {item.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E0E0E0] shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#B5263F] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#333333]">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Corporate Office Locations Footer Box */}
        <div className="bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-xs space-y-3 text-xs text-gray-600">
          <h4 className="text-sm font-bold text-[#222222] uppercase tracking-wider">Corporate Operating Footprint:</h4>
          <p><strong className="text-[#B5263F]">Sangli Head Office:</strong> C.S. No. 60 A/2, Torna Apartments, Opp. AU Bank, Behind Vardhman Ceramics, College Corner, North Shivajinagar, Sangli 416416</p>
          <p><strong className="text-[#B5263F]">Kolhapur Regional Office:</strong> Near Renuka Pathology, Ruikar Colony, Kolhapur 416 000</p>
          <p><strong className="text-[#B5263F]">Pune Branch Office:</strong> New Sangavi, Pune 411 027</p>
        </div>

        {/* Action Call */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E0E0E0]">
          <div>
            <h4 className="text-base font-bold text-[#222222]">Explore our Full Portfolio & Engineering Capabilities</h4>
            <p className="text-xs text-gray-500">Contact our Sangli, Kolhapur, or Pune offices for project consultations.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/services')}
              className="bg-[#333333] hover:bg-black text-white px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
            >
              View Our Solutions
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#B5263F] hover:bg-[#8F1D32] text-white px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
