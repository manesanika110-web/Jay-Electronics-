import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import FloatingActions from './components/FloatingActions';
import QuoteModal from './components/QuoteModal';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SolutionDetail from './pages/SolutionDetail';
import AboutDetail from './pages/AboutDetail';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function AppContent() {
  const { isQuoteModalOpen, closeQuoteModal } = useData();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] text-[#222222]">
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/:slug" element={<AboutDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Services />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </PageTransition>
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <FloatingActions />}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

