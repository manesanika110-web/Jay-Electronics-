import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ServiceCard from '../components/ServiceCard';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function Services() {
  const { services, openQuoteModal } = useData();
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Modern Fullscreen Header Banner */}
      <div className="bg-[#F8E6E6] text-slate-900 p-8 sm:p-12 rounded-3xl border-2 border-[#800000]/20 shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#800000]/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800000] text-white text-xs font-bold uppercase tracking-wider shadow-md">
            <img src="/images/je_logo.png" alt="JE Logo" className="h-4.5 w-auto object-contain brightness-0 invert" />
            <span className="border-l border-white/40 pl-2">11 CORE ENGINEERING DIVISIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#5C0000] font-['Outfit'] tracking-tight">
            Our Solutions & Services
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Comprehensive surveillance, optical networking, telecom voice exchanges, audiovisual controls, and sustainable energy projects.
          </p>
        </div>
      </div>

      {/* Services Grid (11 Services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onLearnMore={(s) => setSelectedService(s)}
          />
        ))}
      </div>

      {/* Service Detail Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ''}
      >
        {selectedService && (
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-[#800000] uppercase tracking-wider">
                Category: {selectedService.category}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                JAY ELECTRONICS PVT LTD
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Deliverables & Technical Features
              </h4>
              <ul className="space-y-2 text-xs text-slate-800">
                {selectedService.features?.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  setSelectedService(null);
                  openQuoteModal();
                }}
                className="bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#111111] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer border border-[#800000]/40"
              >
                Request Quotation for Service
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
