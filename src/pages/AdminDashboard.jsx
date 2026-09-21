import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  LayoutDashboard, FileText, PlusCircle, FolderGit2, Mail, Settings, LogOut, 
  Trash2, Edit3, Eye, CheckCircle, Image as ImageIcon, AlertTriangle, Shield, Lock,
  Wrench, Sparkles, Check, RefreshCw, Server, Globe, Clock, Zap, ArrowRight, User, ChevronRight
} from 'lucide-react';
import Modal from '../components/Modal';

export default function AdminDashboard() {
  const { isAdmin, login, logout } = useAuth();
  const { 
    blogs, projects, services, gallery, messages, firebaseConnected,
    addBlog, updateBlog, deleteBlog,
    addProject, updateProject, deleteProject,
    addService, updateService, deleteService,
    addGalleryItem, updateGalleryItem, deleteGalleryItem,
    updateMessageStatus, deleteMessage
  } = useData();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Notification message
  const [successMsg, setSuccessMsg] = useState('');

  const triggerNotify = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // ==========================================
  // BLOG FORM STATE
  // ==========================================
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('CCTV');
  const [blogImageUrl, setBlogImageUrl] = useState('/images/cctv_hero_bg.jpg');
  const [blogCaption, setBlogCaption] = useState('');
  const [blogStatus, setBlogStatus] = useState('Published');
  const [deletingBlogId, setDeletingBlogId] = useState(null);

  // ==========================================
  // PROJECT FORM STATE
  // ==========================================
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('City Surveillance');
  const [projectLocation, setProjectLocation] = useState('Sangli, Maharashtra');
  const [projectTech, setProjectTech] = useState('IP CCTV, Fiber Backbone');
  const [projectDetails, setProjectDetails] = useState('');
  const [projectStats, setProjectStats] = useState('Verified Execution Record');
  const [projectImage, setProjectImage] = useState('/images/city_surveillance.jpg');
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // ==========================================
  // SERVICE FORM STATE
  // ==========================================
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceCategory, setServiceCategory] = useState('CCTV');
  const [serviceShortDesc, setServiceShortDesc] = useState('');
  const [serviceFullDesc, setServiceFullDesc] = useState('');
  const [serviceIcon, setServiceIcon] = useState('Camera');
  const [serviceFeatures, setServiceFeatures] = useState('');
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // ==========================================
  // GALLERY FORM STATE
  // ==========================================
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('City Surveillance');
  const [galleryImage, setGalleryImage] = useState('/images/city_surveillance.jpg');
  const [deletingGalleryId, setDeletingGalleryId] = useState(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // ==========================================
  // MESSAGE DELETE STATE
  // ==========================================
  const [deletingMsgId, setDeletingMsgId] = useState(null);

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await login(emailInput, passInput);
    if (!res.success) {
      setLoginError(res.error || 'Authentication failed');
    }
  };

  // Handle Logout & Immediate Redirect to User Panel Homepage
  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  // Image Upload Handlers
  const handleBlogImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBlogImageUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProjectImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setGalleryImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Blog CRUD Handlers
  const handleStartEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setBlogTitle(blog.title);
    setBlogCategory(blog.category);
    setBlogImageUrl(blog.image || '/images/cctv_hero_bg.jpg');
    setBlogCaption(blog.caption);
    setBlogStatus(blog.status || 'Published');
    setActiveTab('add-blog');
  };

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogCategory('CCTV');
    setBlogImageUrl('/images/cctv_hero_bg.jpg');
    setBlogCaption('');
    setBlogStatus('Published');
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogCaption.trim()) {
      alert('Please fill out both the post title and caption.');
      return;
    }

    const payload = {
      title: blogTitle,
      category: blogCategory,
      image: blogImageUrl,
      caption: blogCaption,
      status: blogStatus
    };

    if (editingBlogId) {
      updateBlog(editingBlogId, payload);
      triggerNotify('Blog post updated in Firestore!');
    } else {
      addBlog(payload);
      triggerNotify('New blog post published to Firestore!');
    }
    resetBlogForm();
    setActiveTab('blogs');
  };

  // Project CRUD Handlers
  const openNewProjectModal = () => {
    setEditingProjectId(null);
    setProjectTitle('');
    setProjectCategory('City Surveillance');
    setProjectLocation('Sangli, Maharashtra');
    setProjectTech('IP CCTV, Fiber Backbone');
    setProjectDetails('');
    setProjectStats('Verified Execution Record');
    setProjectImage('/images/city_surveillance.jpg');
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProjectId(proj.id);
    setProjectTitle(proj.title);
    setProjectCategory(proj.category);
    setProjectLocation(proj.location);
    setProjectTech(proj.technology || '');
    setProjectDetails(proj.details || '');
    setProjectStats(proj.stats || '');
    setProjectImage(proj.image || '/images/city_surveillance.jpg');
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDetails.trim()) {
      alert('Please fill out Project Title and Details.');
      return;
    }

    const payload = {
      title: projectTitle,
      category: projectCategory,
      location: projectLocation,
      technology: projectTech,
      details: projectDetails,
      stats: projectStats,
      image: projectImage
    };

    if (editingProjectId) {
      updateProject(editingProjectId, payload);
      triggerNotify('Project updated in Firestore!');
    } else {
      addProject(payload);
      triggerNotify('New Project added to Firestore!');
    }
    setIsProjectModalOpen(false);
  };

  // Service CRUD Handlers
  const openNewServiceModal = () => {
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceCategory('CCTV');
    setServiceShortDesc('');
    setServiceFullDesc('');
    setServiceIcon('Camera');
    setServiceFeatures('');
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (serv) => {
    setEditingServiceId(serv.id);
    setServiceTitle(serv.title);
    setServiceCategory(serv.category || 'CCTV');
    setServiceShortDesc(serv.shortDesc || '');
    setServiceFullDesc(serv.fullDesc || '');
    setServiceIcon(serv.icon || 'Camera');
    setServiceFeatures(serv.features ? serv.features.join('\n') : '');
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (!serviceTitle.trim() || !serviceShortDesc.trim()) {
      alert('Please fill out Service Title and Short Description.');
      return;
    }

    const featuresArray = serviceFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const payload = {
      title: serviceTitle,
      category: serviceCategory,
      shortDesc: serviceShortDesc,
      fullDesc: serviceFullDesc || serviceShortDesc,
      icon: serviceIcon,
      features: featuresArray.length > 0 ? featuresArray : ['Turnkey Implementation', '24/7 SLA Support']
    };

    if (editingServiceId) {
      updateService(editingServiceId, payload);
      triggerNotify('Service updated in Firestore!');
    } else {
      addService(payload);
      triggerNotify('New Service added to Firestore!');
    }
    setIsServiceModalOpen(false);
  };

  // Gallery CRUD Handlers
  const openNewGalleryModal = () => {
    setEditingGalleryId(null);
    setGalleryTitle('');
    setGalleryCategory('City Surveillance');
    setGalleryImage('/images/city_surveillance.jpg');
    setIsGalleryModalOpen(true);
  };

  const openEditGalleryModal = (item) => {
    setEditingGalleryId(item.id);
    setGalleryTitle(item.title);
    setGalleryCategory(item.category);
    setGalleryImage(item.image);
    setIsGalleryModalOpen(true);
  };

  const handleSaveGallery = (e) => {
    e.preventDefault();
    if (!galleryTitle.trim()) {
      alert('Please enter a title for the gallery item.');
      return;
    }

    const payload = {
      title: galleryTitle,
      category: galleryCategory,
      image: galleryImage
    };

    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, payload);
      triggerNotify('Gallery item updated in Firestore!');
    } else {
      addGalleryItem(payload);
      triggerNotify('New item added to Gallery in Firestore!');
    }
    setIsGalleryModalOpen(false);
  };

  // ==================================================
  // PROTECTED LOGIN VIEW
  // ==================================================
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border-2 border-[#B5263F] rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#333333] border-2 border-[#B5263F] flex items-center justify-center text-[#B5263F] mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#222222] font-['Outfit']">
              Admin Portal Login
            </h2>
            <p className="text-xs text-gray-500">
              JAY ELECTRONICS PVT LTD Management Control System
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-400 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#222222] uppercase mb-1">
                Admin Email / Username
              </label>
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@jayelectronics.com"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#222222] uppercase mb-1">
                Security Password
              </label>
              <input
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-sm bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold py-3 rounded-lg shadow transition cursor-pointer"
            >
              Log In to Admin Dashboard
            </button>
          </form>

          <div className="bg-[#F5F5F5] border border-[#E0E0E0] p-3 rounded-lg text-[11px] text-gray-600">
            <span className="font-bold text-[#B5263F]">Demo Access:</span> Email: <code className="text-[#222222]">admin@jayelectronics.com</code> | Password: <code className="text-[#222222]">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  // ==================================================
  // ADMIN DASHBOARD MAIN LAYOUT (STYLE NO. 5)
  // ==================================================
  return (
    <div className="min-h-screen bg-[#F4F6F9] font-['Inter'] text-[#1E293B] pb-12 animate-fadeIn">
      
      {/* 1. Top Dedicated Navigation & Control Bar (Style No. 5) */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Brand & Title */}
          <div className="flex items-center gap-4">
            <div className="h-10 shrink-0 flex items-center justify-center p-1 bg-white rounded-lg border border-gray-200 shadow-2xs">
              <img src="/images/je_logo.png" alt="JAY Electronics Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="h-7 w-px bg-gray-200 hidden sm:block"></div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-[#1E293B] font-['Outfit'] tracking-tight">
                  Admin Control Console
                </h1>
                <span className="bg-[#B5263F] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                JAY ELECTRONICS PVT LTD — Real-Time Cloud Data Management
              </p>
            </div>
          </div>

          {/* Right Status & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Firestore Status Pill */}
            <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border shadow-2xs ${
              firebaseConnected 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                : 'bg-amber-50 text-amber-700 border-amber-300'
            }`}>
              <span className={`w-2 h-2 rounded-full ${firebaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span>{firebaseConnected ? 'Firestore Connected (Live)' : 'Local Storage Sync Active'}</span>
            </div>

            {/* Visit Website Button */}
            <Link
              to="/"
              className="bg-white hover:bg-gray-50 text-[#334155] border border-gray-300 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span>Visit Website</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-[#B5263F] hover:bg-[#8F1D32] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            {/* User Profile Pill */}
            <div className="hidden lg:flex items-center gap-2.5 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left text-xs leading-tight">
                <span className="font-extrabold text-[#1E293B] block">Admin</span>
                <span className="text-[10px] text-gray-500 block font-medium">Administrator</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Body Grid Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {successMsg && (
          <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 text-xs p-4 rounded-xl flex items-center gap-2 shadow-sm animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 2. Left Sidebar Menu (Style No. 5 - Fixed Sticky Layout) */}
          <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs space-y-4 relative overflow-hidden">
              
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-gray-400 px-1 pt-1">
                <span>NAVIGATION MENU</span>
                <RefreshCw className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
              </div>

              <nav className="space-y-1.5 relative z-10">
                {[
                  { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
                  { id: 'blogs', label: 'Blogs Registry', icon: FileText, count: blogs.length },
                  { id: 'add-blog', label: editingBlogId ? 'Edit Blog Post' : 'Add New Blog', icon: PlusCircle },
                  { id: 'projects', label: 'Projects Registry', icon: FolderGit2, count: projects.length },
                  { id: 'services', label: 'Solutions & Services', icon: Wrench, count: services.length },
                  { id: 'gallery', label: 'Visual Gallery', icon: ImageIcon, count: gallery.length },
                  { id: 'messages', label: 'Client Inquiries', icon: Mail, count: messages.length },
                  { id: 'settings', label: 'Firebase Config', icon: Server },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'add-blog' && !editingBlogId) resetBlogForm();
                        setActiveTab(item.id);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isActive
                          ? 'bg-[#B5263F] text-white shadow-md'
                          : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#B5263F]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Bottom Decorative CCTV Security Art Graphic (Style No. 5) */}
              <div className="pt-6 border-t border-[#E2E8F0] space-y-3 relative z-10">
                <div className="text-[11px] text-gray-500 space-y-1 px-1">
                  <span className="font-extrabold text-[#1E293B] block">Admin Session:</span>
                  <span className="truncate block font-mono text-[#B5263F] font-semibold">admin@jayelectronics.com</span>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Right Content View Area */}
          <div className="lg:col-span-9 space-y-6">

            {/* TAB 1: DASHBOARD OVERVIEW (Style No. 5) */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* A. Welcome Hero Banner Card with Security Camera visual art */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                  
                  {/* Subtle Background Gradient Overlay */}
                  <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-rose-50/70 via-rose-50/20 to-transparent pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                      <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#1E293B] tracking-tight">
                        Welcome Back, <span className="text-[#B5263F]">Admin</span>
                      </h2>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        Manage your content, projects and services efficiently.
                      </p>
                      <div className="w-12 h-1 bg-[#B5263F] rounded-full mt-2"></div>
                    </div>

                    {/* CCTV Camera Visual Card Graphic */}
                    <div className="w-40 h-28 sm:w-56 sm:h-36 shrink-0 relative flex items-center justify-center rounded-2xl overflow-hidden shadow-md border-2 border-[#B5263F]/20">
                      <img 
                        src="/images/cctv_hero_bg.jpg" 
                        alt="CCTV Security Camera" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <span className="absolute bottom-2 left-2 text-[10px] font-extrabold text-white bg-[#B5263F] px-2.5 py-0.5 rounded shadow">
                        JE System Active
                      </span>
                    </div>
                  </div>

                </div>

                {/* B. 4 Statistics Summary Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Card 1: BLOG POSTS */}
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-xs flex items-center justify-between hover:shadow-md transition">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block">BLOG POSTS</span>
                      <div className="text-3xl font-black text-[#1E293B] font-['Outfit']">{blogs.length}</div>
                      <span className="text-[11px] text-[#B5263F] font-bold block">Live in Firestore</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#B5263F] border border-rose-100 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card 2: MAJOR PROJECTS */}
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-xs flex items-center justify-between hover:shadow-md transition">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block">MAJOR PROJECTS</span>
                      <div className="text-3xl font-black text-[#1E293B] font-['Outfit']">{projects.length}</div>
                      <span className="text-[11px] text-[#B5263F] font-bold block">Dynamic Records</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card 3: SERVICES */}
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-xs flex items-center justify-between hover:shadow-md transition">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block">SERVICES</span>
                      <div className="text-3xl font-black text-[#1E293B] font-['Outfit']">{services.length}</div>
                      <span className="text-[11px] text-[#B5263F] font-bold block">Engineering Divisions</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                      <Wrench className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card 4: INQUIRIES */}
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-xs flex items-center justify-between hover:shadow-md transition">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block">INQUIRIES</span>
                      <div className="text-3xl font-black text-[#B5263F] font-['Outfit']">{messages.length}</div>
                      <span className="text-[11px] text-[#B5263F] font-bold block">Customer Requests</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                  </div>

                </div>

                {/* C. Quick Content Management Bar */}
                <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#B5263F] flex items-center justify-center shrink-0">
                        <Edit3 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#1E293B] font-['Outfit']">
                          Quick Content Management
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          Manage your website content with ease and keep it updated.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveTab('blogs')}
                      className="text-xs font-bold text-[#B5263F] hover:text-[#8F1D32] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    
                    {/* Button 1: Create Blog Post */}
                    <button
                      onClick={() => { resetBlogForm(); setActiveTab('add-blog'); }}
                      className="bg-[#B5263F] hover:bg-[#8F1D32] text-white p-3.5 rounded-xl font-bold text-xs flex items-center justify-between shadow-xs transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        <span>Create Blog Post</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Button 2: Add Executed Project */}
                    <button
                      onClick={openNewProjectModal}
                      className="bg-[#1E293B] hover:bg-[#0F172A] text-white p-3.5 rounded-xl font-bold text-xs flex items-center justify-between shadow-xs transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-[#B5263F]" />
                        <span>Add Executed Project</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Button 3: Add Service Division */}
                    <button
                      onClick={openNewServiceModal}
                      className="bg-white hover:bg-gray-50 text-[#1E293B] border border-gray-300 p-3.5 rounded-xl font-bold text-xs flex items-center justify-between shadow-2xs transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span>Add Service Division</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>

                    {/* Button 4: Inquiries Inbox */}
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="bg-rose-50 hover:bg-rose-100 text-[#B5263F] border border-rose-200 p-3.5 rounded-xl font-bold text-xs flex items-center justify-between transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>Inquiries Inbox ({messages.length})</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>

                {/* D. Bottom Row: Recent Activity & Quick Access (2 Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left Box: Recent Activity */}
                  <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#1E293B] font-['Outfit']">Recent Activity</h3>
                        <p className="text-xs text-gray-500">Latest updates from your website content</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      {[
                        { text: 'New blog post added', time: '5 minutes ago', tag: 'Blog', color: 'bg-rose-100 text-rose-700' },
                        { text: 'Project updated: Online Bus Booking', time: '12 minutes ago', tag: 'Project', color: 'bg-blue-100 text-blue-700' },
                        { text: 'Service updated: CCTV Surveillance', time: '25 minutes ago', tag: 'Service', color: 'bg-amber-100 text-amber-700' },
                        { text: 'New inquiry received', time: '1 hour ago', tag: 'Inquiry', color: 'bg-emerald-100 text-emerald-700' },
                      ].map((act, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                          <div>
                            <span className="font-bold text-[#1E293B] block">{act.text}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{act.time}</span>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${act.color}`}>
                            {act.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Box: Quick Access Grid */}
                  <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#B5263F] flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#1E293B] font-['Outfit']">Quick Access</h3>
                        <p className="text-xs text-gray-500">Jump to your most used features</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {[
                        { id: 'blogs', name: 'Blogs', sub: 'Manage Blogs', icon: FileText, bg: 'bg-rose-50 text-[#B5263F]' },
                        { id: 'projects', name: 'Projects', sub: 'Manage Projects', icon: FolderGit2, bg: 'bg-blue-50 text-blue-600' },
                        { id: 'services', name: 'Services', sub: 'Manage Services', icon: Wrench, bg: 'bg-amber-50 text-amber-600' },
                        { id: 'gallery', name: 'Gallery', sub: 'Manage Gallery', icon: ImageIcon, bg: 'bg-purple-50 text-purple-600' },
                        { id: 'messages', name: 'Inquiries', sub: 'View Inquiries', icon: Mail, bg: 'bg-emerald-50 text-emerald-600' },
                        { id: 'settings', name: 'Firebase Config', sub: 'Database Settings', icon: Server, bg: 'bg-gray-100 text-gray-700' },
                      ].map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#B5263F] p-3.5 rounded-xl text-left transition space-y-2 group cursor-pointer shadow-2xs hover:shadow-xs"
                          >
                            <div className="flex items-center justify-between">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg}`}>
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#B5263F] transition-transform group-hover:translate-x-0.5" />
                            </div>
                            <div>
                              <span className="font-extrabold text-[#1E293B] text-xs block group-hover:text-[#B5263F] transition-colors">{item.name}</span>
                              <span className="text-[10px] text-gray-400 font-medium">{item.sub}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            )}

          {/* TAB 2: BLOG MANAGEMENT TABLE */}
          {activeTab === 'blogs' && (
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#222222] font-['Outfit']">Manage Blog Posts</h3>
                <button
                  onClick={() => { resetBlogForm(); setActiveTab('add-blog'); }}
                  className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Blog</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#222222]">
                  <thead className="bg-[#F5F5F5] border-b border-[#E0E0E0] font-bold uppercase text-gray-600">
                    <tr>
                      <th className="p-3">Thumbnail</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E0E0]">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-[#F5F5F5]/60 transition">
                        <td className="p-3">
                          <div className="w-12 h-10 rounded overflow-hidden bg-gray-900 border border-[#B5263F]">
                            <img src={b.image || '/images/cctv_hero_bg.jpg'} alt="" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="p-3 font-bold max-w-xs truncate">{b.title}</td>
                        <td className="p-3">
                          <span className="bg-[#F5F5F5] border border-[#E0E0E0] px-2 py-0.5 rounded text-[11px] font-semibold text-[#B5263F]">
                            {b.category}
                          </span>
                        </td>
                        <td className="p-3 text-gray-500">{b.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            b.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {b.status || 'Published'}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleStartEditBlog(b)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            title="Edit Post"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingBlogId(b.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ADD / EDIT BLOG FORM */}
          {activeTab === 'add-blog' && (
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-4">
                <h3 className="text-xl font-bold text-[#222222] font-['Outfit']">
                  {editingBlogId ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                {editingBlogId && (
                  <button
                    onClick={resetBlogForm}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#222222] uppercase mb-1">
                    Blog Post Title *
                  </label>
                  <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="e.g. Next-Generation Fiber Splicing Standards"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-sm bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#222222] uppercase mb-1">
                      Category *
                    </label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-sm bg-white"
                    >
                      <option value="CCTV">CCTV Surveillance</option>
                      <option value="Networking">Networking & Fiber</option>
                      <option value="Security">Security Projects</option>
                      <option value="Technology">Technology Insights</option>
                      <option value="City Surveillance">City Surveillance</option>
                      <option value="Company Updates">Company Updates</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#222222] uppercase mb-1">
                      Publication Status
                    </label>
                    <select
                      value={blogStatus}
                      onChange={(e) => setBlogStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-sm bg-white"
                    >
                      <option value="Published">Published (Live on Feed)</option>
                      <option value="Draft">Draft (Saved in Admin)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#222222] uppercase mb-1">
                    Upload Featured Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBlogImageUpload}
                      className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#B5263F] file:text-white"
                    />
                    {blogImageUrl && (
                      <div className="w-24 h-16 rounded overflow-hidden border border-[#B5263F] bg-gray-900 shrink-0">
                        <img src={blogImageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#222222] uppercase mb-1">
                    Post Content / Caption *
                  </label>
                  <textarea
                    rows="8"
                    value={blogCaption}
                    onChange={(e) => setBlogCaption(e.target.value)}
                    placeholder="Enter full multi-line post content, technical highlights..."
                    className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-sm bg-white leading-relaxed"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-sm px-6 py-3 rounded-lg shadow transition cursor-pointer"
                  >
                    {editingBlogId ? 'Update Blog Post' : 'Publish Blog Post'}
                  </button>

                  <button
                    type="button"
                    onClick={resetBlogForm}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-sm px-5 py-3 rounded-lg transition cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: PROJECTS REGISTRY */}
          {activeTab === 'projects' && (
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#222222] font-['Outfit']">Major Projects Registry</h3>
                  <p className="text-xs text-gray-500">Add, Edit, and Delete projects dynamically synced with Firestore.</p>
                </div>
                <button
                  onClick={openNewProjectModal}
                  className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div key={p.id} className="bg-[#F5F5F5] p-4 rounded-xl border border-[#E0E0E0] space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#B5263F] uppercase bg-white px-2 py-0.5 rounded border border-[#E0E0E0]">
                          {p.category}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">{p.location}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#222222] font-['Outfit']">{p.title}</h4>
                      <p className="text-[11px] text-[#555555] line-clamp-2">{p.details}</p>
                    </div>

                    <div className="pt-2 border-t border-[#E0E0E0] flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditProjectModal(p)}
                        className="px-2.5 py-1 bg-white hover:bg-gray-100 text-blue-600 border border-gray-200 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingProjectId(p.id)}
                        className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-600 border border-gray-200 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES REGISTRY */}
          {activeTab === 'services' && (
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#222222] font-['Outfit']">Engineering Solutions & Services</h3>
                  <p className="text-xs text-gray-500">Manage 11 Core Service Divisions dynamically on the website.</p>
                </div>
                <button
                  onClick={openNewServiceModal}
                  className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="bg-[#F5F5F5] p-4 rounded-xl border border-[#E0E0E0] space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#B5263F] uppercase bg-white px-2 py-0.5 rounded border border-[#E0E0E0]">
                        {s.category || 'Service'}
                      </span>
                      <h4 className="text-sm font-bold text-[#222222] font-['Outfit']">{s.title}</h4>
                      <p className="text-[11px] text-[#555555] line-clamp-2">{s.shortDesc}</p>
                    </div>

                    <div className="pt-2 border-t border-[#E0E0E0] flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditServiceModal(s)}
                        className="px-2.5 py-1 bg-white hover:bg-gray-100 text-blue-600 border border-gray-200 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingServiceId(s.id)}
                        className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-600 border border-gray-200 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#222222] font-['Outfit']">Visual Assets & Gallery</h3>
                  <p className="text-xs text-gray-500">Manage high-resolution images & project photos.</p>
                </div>
                <button
                  onClick={openNewGalleryModal}
                  className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-[#F5F5F5] rounded-xl overflow-hidden border border-[#E0E0E0] space-y-2 flex flex-col justify-between group">
                    <div className="h-32 bg-gray-900 overflow-hidden relative">
                      <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#B5263F] text-white px-2 py-0.5 rounded">
                        {g.category}
                      </span>
                    </div>

                    <div className="p-3 space-y-1">
                      <h4 className="text-xs font-bold text-[#222222] truncate">{g.title}</h4>
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-gray-200">
                        <button
                          onClick={() => openEditGalleryModal(g)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingGalleryId(g.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#222222] font-['Outfit']">Customer Inquiries Inbox</h3>
              
              {messages.length === 0 ? (
                <p className="text-xs text-gray-500">No contact messages received yet.</p>
              ) : (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="bg-[#F5F5F5] p-4 rounded-xl border border-[#E0E0E0] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E0E0E0] pb-2">
                        <div>
                          <span className="font-extrabold text-[#222222] text-sm">{m.name}</span>
                          <span className="text-xs text-[#B5263F] font-semibold ml-2">({m.subject})</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-400">{m.date}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            m.status === 'Responded' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-[#B5263F]'
                          }`}>
                            {m.status || 'Unread'}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 space-x-3">
                        <span>📧 <strong>Email:</strong> {m.email}</span>
                        <span>📞 <strong>Phone:</strong> {m.phone}</span>
                      </div>

                      <p className="text-xs text-[#555555] bg-white p-3 rounded border border-[#E0E0E0] leading-relaxed">
                        "{m.message}"
                      </p>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        {m.status !== 'Responded' && (
                          <button
                            onClick={() => {
                              updateMessageStatus(m.id, 'Responded');
                              triggerNotify('Marked inquiry as Responded!');
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Responded</span>
                          </button>
                        )}

                        <button
                          onClick={() => setDeletingMsgId(m.id)}
                          className="px-3 py-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SETTINGS & FIREBASE SETUP */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#222222] font-['Outfit']">System & Firebase Configuration</h3>
              <p className="text-xs text-gray-500">
                Firestore database and real-time listeners are active.
              </p>

              <div className="bg-[#F5F5F5] p-5 rounded-xl border border-[#E0E0E0] text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="font-bold text-[#222222]">Firebase Integration Status:</span>
                  <span className="text-emerald-700 font-extrabold bg-emerald-100 px-2.5 py-0.5 rounded">
                    Active & Connected
                  </span>
                </div>
                <div><span className="font-bold">Project Name:</span> JAY ELECTRONICS PVT LTD</div>
                <div><span className="font-bold">Database Instance:</span> Cloud Firestore (Native Mode)</div>
                <div><span className="font-bold">Real-time Collections:</span> <code>blogs</code>, <code>projects</code>, <code>services</code>, <code>messages</code>, <code>gallery</code></div>
                <div><span className="font-bold">Security Level:</span> Role-based Authentication & Data Encryption</div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>

      {/* Delete Blog Modal */}
      <Modal
        isOpen={!!deletingBlogId}
        onClose={() => setDeletingBlogId(null)}
        title="Confirm Delete Blog Post"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded border border-red-200">
            Are you sure you want to permanently delete this blog post from Cloud Firestore?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingBlogId(null)} className="px-4 py-2 text-xs font-bold text-gray-600">Cancel</button>
            <button onClick={() => { deleteBlog(deletingBlogId); setDeletingBlogId(null); triggerNotify('Blog deleted!'); }} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded">Delete</button>
          </div>
        </div>
      </Modal>

      {/* Delete Project Modal */}
      <Modal
        isOpen={!!deletingProjectId}
        onClose={() => setDeletingProjectId(null)}
        title="Confirm Delete Project"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded border border-red-200">
            Are you sure you want to delete this major project record from Firestore?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingProjectId(null)} className="px-4 py-2 text-xs font-bold text-gray-600">Cancel</button>
            <button onClick={() => { deleteProject(deletingProjectId); setDeletingProjectId(null); triggerNotify('Project deleted!'); }} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded">Delete Project</button>
          </div>
        </div>
      </Modal>

      {/* Delete Service Modal */}
      <Modal
        isOpen={!!deletingServiceId}
        onClose={() => setDeletingServiceId(null)}
        title="Confirm Delete Service"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded border border-red-200">
            Are you sure you want to delete this service division record from Firestore?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingServiceId(null)} className="px-4 py-2 text-xs font-bold text-gray-600">Cancel</button>
            <button onClick={() => { deleteService(deletingServiceId); setDeletingServiceId(null); triggerNotify('Service deleted!'); }} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded">Delete Service</button>
          </div>
        </div>
      </Modal>

      {/* Delete Gallery Modal */}
      <Modal
        isOpen={!!deletingGalleryId}
        onClose={() => setDeletingGalleryId(null)}
        title="Confirm Delete Gallery Photo"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded border border-red-200">
            Are you sure you want to delete this image from the gallery?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingGalleryId(null)} className="px-4 py-2 text-xs font-bold text-gray-600">Cancel</button>
            <button onClick={() => { deleteGalleryItem(deletingGalleryId); setDeletingGalleryId(null); triggerNotify('Gallery item deleted!'); }} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded">Delete Photo</button>
          </div>
        </div>
      </Modal>

      {/* Delete Message Modal */}
      <Modal
        isOpen={!!deletingMsgId}
        onClose={() => setDeletingMsgId(null)}
        title="Confirm Delete Message"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded border border-red-200">
            Are you sure you want to delete this customer message?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingMsgId(null)} className="px-4 py-2 text-xs font-bold text-gray-600">Cancel</button>
            <button onClick={() => { deleteMessage(deletingMsgId); setDeletingMsgId(null); triggerNotify('Message deleted!'); }} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded">Delete Message</button>
          </div>
        </div>
      </Modal>

      {/* Add / Edit Project Modal Form */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title={editingProjectId ? 'Edit Major Project' : 'Add New Executed Project'}
      >
        <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Project Title *</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Sangli Smart City Surveillance"
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#222222] uppercase mb-1">Category *</label>
              <select
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none bg-white"
              >
                <option value="City Surveillance">City Surveillance</option>
                <option value="CCTV Surveillance">CCTV Surveillance</option>
                <option value="COVID-19 Surveillance">COVID-19 Surveillance</option>
                <option value="LAN Networking">LAN Networking</option>
                <option value="EPABX / Telephone">EPABX / Telephone</option>
                <option value="Audio / Video">Audio / Video</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#222222] uppercase mb-1">Location *</label>
              <input
                type="text"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                placeholder="e.g. Sangli, Maharashtra"
                className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Deployed Technology</label>
            <input
              type="text"
              value={projectTech}
              onChange={(e) => setProjectTech(e.target.value)}
              placeholder="e.g. 4K IP CCTV, Optical Fiber Backbone"
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Project Details *</label>
            <textarea
              rows="3"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Enter comprehensive description of project scope..."
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Image Upload / URL</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProjectImageUpload}
              className="w-full text-xs text-gray-500 mb-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
            <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2 rounded font-bold text-gray-600">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded font-bold bg-[#B5263F] text-white shadow">Save Project</button>
          </div>
        </form>
      </Modal>

      {/* Add / Edit Service Modal Form */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={editingServiceId ? 'Edit Service Division' : 'Add New Service Division'}
      >
        <form onSubmit={handleSaveService} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Service Title *</label>
            <input
              type="text"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              placeholder="e.g. Thermal Imaging & AI Security"
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#222222] uppercase mb-1">Category *</label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none bg-white"
              >
                <option value="CCTV">CCTV</option>
                <option value="Networking">Networking</option>
                <option value="Telecommunication">Telecommunication</option>
                <option value="Audio/Video">Audio/Video</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Displays">Displays</option>
                <option value="Surveillance">Surveillance</option>
                <option value="Security">Security</option>
                <option value="Automation">Automation</option>
                <option value="Solar">Solar</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#222222] uppercase mb-1">Lucide Icon Name</label>
              <input
                type="text"
                value={serviceIcon}
                onChange={(e) => setServiceIcon(e.target.value)}
                placeholder="e.g. Camera, Network, Shield, Flame"
                className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Short Description *</label>
            <textarea
              rows="2"
              value={serviceShortDesc}
              onChange={(e) => setServiceShortDesc(e.target.value)}
              placeholder="Brief summary for service cards..."
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Full Detailed Overview</label>
            <textarea
              rows="3"
              value={serviceFullDesc}
              onChange={(e) => setServiceFullDesc(e.target.value)}
              placeholder="Complete overview paragraph for service modals..."
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Key Features (One feature per line)</label>
            <textarea
              rows="4"
              value={serviceFeatures}
              onChange={(e) => setServiceFeatures(e.target.value)}
              placeholder="4K Ultra HD IP Cameras&#10;Night Vision Sensors&#10;Centralized VMS Integration"
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
            <button type="button" onClick={() => setIsServiceModalOpen(false)} className="px-4 py-2 rounded font-bold text-gray-600">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded font-bold bg-[#B5263F] text-white shadow">Save Service</button>
          </div>
        </form>
      </Modal>

      {/* Add / Edit Gallery Modal Form */}
      <Modal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        title={editingGalleryId ? 'Edit Gallery Photo' : 'Add Photo to Visual Gallery'}
      >
        <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Photo Title *</label>
            <input
              type="text"
              value={galleryTitle}
              onChange={(e) => setGalleryTitle(e.target.value)}
              placeholder="e.g. Kolhapur Control Room Video Wall"
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Category *</label>
            <select
              value={galleryCategory}
              onChange={(e) => setGalleryCategory(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none bg-white"
            >
              <option value="City Surveillance">City Surveillance</option>
              <option value="CCTV">CCTV</option>
              <option value="Networking">Networking</option>
              <option value="Audio/Video">Audio/Video</option>
              <option value="Solar">Solar</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#222222] uppercase mb-1">Image Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleGalleryImageUpload}
              className="w-full text-xs text-gray-500 mb-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
            <button type="button" onClick={() => setIsGalleryModalOpen(false)} className="px-4 py-2 rounded font-bold text-gray-600">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded font-bold bg-[#B5263F] text-white shadow">Save Photo</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

