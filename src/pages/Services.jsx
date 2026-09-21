import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ServiceCard from '../components/ServiceCard';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Shield } from 'lucide-react';

export default function Services() {
  const { services, openQuoteModal } = useData();
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#333333] text-white p-8 sm:p-12 rounded-2xl border-2 border-[#B5263F] shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#333333] text-xs font-bold uppercase tracking-wider">
            <img src="/images/je_logo.png" alt="JE Logo" className="h-4 w-auto object-contain" />
            <span>11 CORE ENGINEERING DIVISIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Our Solutions & Services
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
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
            <div className="flex items-center justify-between bg-[#F5F5F5] p-3 rounded-lg border border-[#E0E0E0]">
              <span className="text-xs font-bold text-[#B5263F] uppercase tracking-wider">
                Category: {selectedService.category}
              </span>
              <span className="text-xs font-semibold text-gray-500">
                JAY ELECTRONICS PVT LTD
              </span>
            </div>

            <p className="text-sm text-[#555555] leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#222222]">
                Deliverables & Technical Features
              </h4>
              <ul className="space-y-2 text-xs text-[#222222]">
                {selectedService.features?.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#F5F5F5] p-2.5 rounded border border-[#E0E0E0]">
                    <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-[#E0E0E0]">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  setSelectedService(null);
                  openQuoteModal();
                }}
                className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs px-5 py-2.5 rounded shadow cursor-pointer"
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

