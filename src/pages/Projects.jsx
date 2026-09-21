import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import { Shield, Filter, MapPin, Cpu, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'City Surveillance',
    'CCTV Surveillance',
    'COVID-19 Surveillance',
    'LAN Networking',
    'EPABX / Telephone',
    'Audio / Video',
    'Infrastructure'
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#333333] text-white p-8 sm:p-12 rounded-2xl border-2 border-[#B5263F] shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#333333] text-xs font-bold uppercase tracking-wider">
            <img src="/images/je_logo.png" alt="JE Logo" className="h-4 w-auto object-contain" />
            <span>EXECUTIVE PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Major Executed Projects
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Real municipal city surveillance grids, government headquarters, judicial courts, and hospital telecommunication deployments.
          </p>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="bg-white border border-[#E0E0E0] rounded-xl p-3 sm:p-4 flex flex-wrap items-center gap-2 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#222222] mr-2 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-[#B5263F]" />
          <span>Filter By Category:</span>
        </div>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === cat
                ? 'bg-[#B5263F] text-white shadow'
                : 'bg-[#F5F5F5] text-[#555555] hover:bg-[#E0E0E0] border border-[#E0E0E0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E0E0E0]">
          <p className="text-sm text-gray-500">No projects found matching category "{activeFilter}".</p>
        </div>
      )}

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-4">
            <div className="h-44 sm:h-52 rounded-lg overflow-hidden bg-gray-900 border-2 border-[#B5263F] shrink-0">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="bg-[#B5263F] text-white px-3 py-1 rounded">
                Category: {selectedProject.category}
              </span>
              <span className="bg-[#F5F5F5] text-[#333333] border border-[#E0E0E0] px-3 py-1 rounded flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B5263F]" />
                Location: {selectedProject.location}
              </span>
            </div>

            <p className="text-sm text-[#555555] leading-relaxed">
              {selectedProject.details}
            </p>

            <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#E0E0E0] space-y-2 text-xs text-[#222222]">
              <div className="flex items-start gap-2">
                <Cpu className="w-4 h-4 text-[#B5263F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800">Deployed Technology Specs: </span>
                  <span className="text-gray-700">{selectedProject.technology}</span>
                </div>
              </div>

              {selectedProject.stats && (
                <div className="flex items-center gap-2 text-[#B5263F] font-semibold pt-1 border-t border-[#E0E0E0]">
                  <CheckCircle2 className="w-4 h-4 text-[#B5263F]" />
                  <span>{selectedProject.stats}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}

