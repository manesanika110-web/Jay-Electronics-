import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import { 
  LayoutGrid, 
  Eye, 
  Camera, 
  ShieldCheck, 
  Network, 
  PhoneCall, 
  Tv, 
  Building2, 
  MapPin, 
  Cpu, 
  Check, 
  X, 
  ArrowRight,
  Folder,
  BarChart3,
  Settings,
  CheckCircle2
} from 'lucide-react';

export default function Projects() {
  const { projects, openQuoteModal } = useData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalImage, setActiveModalImage] = useState(null);

  // 8 Filter Categories matching reference mockup
  const filterCategories = [
    { id: 'All', name: 'All', icon: LayoutGrid },
    { id: 'City Surveillance', name: 'City Surveillance', icon: Eye },
    { id: 'CCTV Surveillance', name: 'CCTV Surveillance', icon: Camera },
    { id: 'COVID-19 Surveillance', name: 'COVID-19 Surveillance', icon: ShieldCheck },
    { id: 'LAN Networking', name: 'LAN Networking', icon: Network },
    { id: 'EPABX / Telephone', name: 'EPABX / Telephone', icon: PhoneCall },
    { id: 'Audio / Video', name: 'Audio / Video', icon: Tv },
    { id: 'Infrastructure', name: 'Infrastructure', icon: Building2 },
  ];

  // Helper for category project count
  const getCategoryCount = (catId) => {
    if (!projects) return 0;
    if (catId === 'All') return projects.length;
    return projects.filter(p => 
      p.category && (p.category.toLowerCase().includes(catId.toLowerCase()) || catId.toLowerCase().includes(p.category.toLowerCase()))
    ).length;
  };

  const filteredProjects = !projects ? [] : (activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category && (p.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(p.category.toLowerCase()))));

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setActiveModalImage(project.image || '/images/city_surveillance.jpg');
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setActiveModalImage(null);
  };

  // Generate 4 gallery thumbnails for modal
  const getModalGallery = (project) => {
    if (!project) return [];
    if (project.gallery && project.gallery.length >= 4) return project.gallery.slice(0, 4);
    return [
      project.image || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
      '/images/city_surveillance.jpg',
      '/images/network_rack.jpg',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
    ];
  };

  return (
    <div className="w-full space-y-10 pb-16 bg-[#F2F2F2] animate-fadeIn">
      
      {/* ==================================================
          1. HERO BANNER
      ================================================== */}
      <section className="relative min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] flex items-center justify-center bg-[#5C0000] overflow-hidden">
        {/* Background Skyline Image with Sunset Scrim */}
        <div className="absolute inset-0">
          <img
            src="/images/cctv_hero_bg.jpg"
            alt="JEPL Executed Projects Skyline"
            className="w-full h-full object-cover object-center opacity-85 brightness-110 contrast-105"
          />
        </div>

        {/* Subtle Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8 space-y-3 text-left">
          
          {/* Executive Portfolio Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#142338] border border-red-900/50 text-rose-200 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md">
            <Folder className="w-3.5 h-3.5 fill-[#800000] text-transparent" />
            <span>EXECUTIVE PORTFOLIO</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['Outfit'] text-white max-w-3xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Major Executed <span className="text-[#800000] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">Projects</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-semibold max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Real municipal city surveillance grids, government headquarters, judicial courts, and hospital telecommunication deployments.
          </p>

        </div>
      </section>

      {/* ==================================================
          2. CATEGORY FILTER BAR (Matching Reference Mockup)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {filterCategories.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = activeFilter === cat.id;
              const count = getCategoryCount(cat.id);
              const countText = `${count} ${count === 1 ? 'Project' : 'Projects'}`;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex flex-col items-center text-center p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#800000] text-white shadow-md font-bold scale-[1.02]'
                      : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 hover:text-[#800000] border border-slate-200/70'
                  }`}
                >
                  <CatIcon className={`w-5 h-5 mb-1.5 stroke-[2] ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  <span className="text-xs font-extrabold font-['Outfit'] leading-tight truncate w-full">
                    {cat.name}
                  </span>
                  <span className={`text-[10px] font-semibold mt-1 ${isSelected ? 'text-white/90' : 'text-slate-400'}`}>
                    {countText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          3. PROJECT CARDS GRID (3-Column Layout)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleOpenModal}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <p className="text-base font-bold text-[#5C0000]">No projects found matching category "{activeFilter}".</p>
            <p className="text-xs text-slate-500 mt-1">Try selecting another filter option from the bar above.</p>
          </div>
        )}
      </section>

      {/* ==================================================
          4. PROJECT DETAILS MODAL (Matching AMC Modal Component Style)
      ================================================== */}
      <Modal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        title={selectedProject?.title || "Project Details"}
      >
        {selectedProject && (
          <div className="space-y-6 text-left">
            
            {/* Top Large Project Image with Badges */}
            <div className="h-56 sm:h-72 rounded-2xl overflow-hidden relative shadow-md bg-slate-900 border border-slate-200">
              <img
                src={activeModalImage || selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Category Pill Top Left */}
              <span className="absolute top-3 left-3 text-xs font-extrabold text-white bg-[#800000] px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                <Folder className="w-3.5 h-3.5 fill-white text-transparent" />
                <span>{selectedProject.category}</span>
              </span>

              {/* Location Tag Bottom Left */}
              <span className="absolute bottom-3 left-3 text-xs font-extrabold text-white bg-[#5C0000]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-rose-300" />
                <span>{selectedProject.location}</span>
              </span>
            </div>

            {/* 4 Gallery Thumbnails Row */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Project Gallery Views
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {getModalGallery(selectedProject).map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveModalImage(imgUrl)}
                    className={`h-16 sm:h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      activeModalImage === imgUrl ? 'border-[#800000] scale-105 shadow-md' : 'border-slate-200 hover:border-[#800000]/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Gallery view ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Project Overview / Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Project Overview & Execution Scope
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {selectedProject.details}
              </p>
            </div>

            {/* 2 Spec Grid Boxes: Deployed Technology & Project Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Box 1: Deployed Technology */}
              <div className="bg-[#F0F7FF] border border-blue-100 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span>Deployed Technology</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>IP CCTV & 4K Surveillance Cameras</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>High-Speed Optical Fiber Backbone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>Central Command & Control Software</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>ANPR & Video Analytics Integration</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: Key Achievements */}
              <div className="bg-[#F0F7FF] border border-blue-100 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span>Key Project Deliverables</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>Multi-Location Grid Coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>24/7 Monitoring & Police Control Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>Redundant Fiber Ring Connectivity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>Turnkey SLA Support & Maintenance</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Footer JEPL Branding & Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <div className="je-logo-wrapper h-6 shrink-0 px-1.5 py-0.5 border border-slate-200 bg-white rounded">
                  <img src="/images/je_logo.png" alt="JEPL Logo" className="h-full w-auto object-contain" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-600 tracking-wider uppercase font-['Outfit']">
                  JAY ELECTRONICS PVT LTD — SYSTEMS INTEGRATOR
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    handleCloseModal();
                    openQuoteModal();
                  }}
                  className="bg-[#5C0000] hover:bg-[#800000] text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Get Quote for Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
}


