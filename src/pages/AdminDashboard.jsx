import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  LayoutDashboard, FileText, PlusCircle, FolderGit2, Mail, Settings, LogOut, 
  Trash2, Edit3, Eye, CheckCircle, Image as ImageIcon, AlertTriangle, Shield,
  Wrench, Check, RefreshCw, Server, Globe, Clock, Zap, ArrowRight, User, ChevronRight,
  Home as HomeIcon, Building, ArrowUp, ArrowDown, Award, Menu, X
} from 'lucide-react';
import Modal from '../components/Modal';

export default function AdminDashboard() {
  const { isAdmin, currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { 
    banners, blogs, projects, services, gallery, contactMessages, contacts, quoteRequests, messages, firebaseConnected,
    homeStats, homeWhoWeAre, homeAmcHeader, homeAmcCards, homeWhyChoose, homeBrands, homeFooter,
    aboutCards, addAboutCard, updateAboutCard, deleteAboutCard,
    addBanner, updateBanner, deleteBanner, toggleBannerStatus, reorderBanner,
    updateHomeStat, addHomeStat, deleteHomeStat,
    updateHomeWhoWeAre,
    updateHomeAmcHeader, updateHomeAmcCard, addHomeAmcCard, deleteHomeAmcCard,
    updateHomeWhyChooseCard, addHomeWhyChooseCard, deleteHomeWhyChooseCard,
    updateHomeBrand, addHomeBrand, deleteHomeBrand,
    updateHomeFooter,
    addBlog, updateBlog, deleteBlog,
    addProject, updateProject, deleteProject,
    addService, updateService, deleteService,
    addGalleryItem, updateGalleryItem, deleteGalleryItem,
    updateContactStatus, updateQuoteStatus, deleteContact, deleteQuoteRequest,
    updateMessageStatus, deleteMessage
  } = useData();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login', { replace: true });
  };

  // Navigation tab state (default: 'home-banner')
  const [activeTab, setActiveTab] = useState('home-banner');
  const [activeHomeSubSection, setActiveHomeSubSection] = useState('home-banner');
  const [msgFilter, setMsgFilter] = useState('all');

  // ==========================================
  // ABOUT US CARDS STATE & HANDLERS
  // ==========================================
  const [editingAboutId, setEditingAboutId] = useState(null);
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutTagline, setAboutTagline] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const [aboutHighlights, setAboutHighlights] = useState('');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [viewingAboutCard, setViewingAboutCard] = useState(null);
  const [deletingAboutId, setDeletingAboutId] = useState(null);

  const openNewAboutModal = () => {
    setEditingAboutId(null);
    setAboutTitle('');
    setAboutTagline('');
    setAboutContent('');
    setAboutHighlights('');
    setIsAboutModalOpen(true);
  };

  const openEditAboutModal = (card) => {
    setEditingAboutId(card.id);
    setAboutTitle(card.title || '');
    setAboutTagline(card.tagline || '');
    setAboutContent(card.content || '');
    setAboutHighlights(card.highlights ? card.highlights.join('\n') : '');
    setIsAboutModalOpen(true);
  };

  const handleSaveAboutCard = (e) => {
    e.preventDefault();
    if (!aboutTitle.trim() || !aboutContent.trim()) {
      alert('Please fill out Section Title and Content.');
      return;
    }

    const payload = {
      title: aboutTitle,
      tagline: aboutTagline,
      content: aboutContent,
      highlights: aboutHighlights
    };

    if (editingAboutId) {
      updateAboutCard(editingAboutId, payload);
      triggerNotify('About Us card updated in Firestore!');
    } else {
      addAboutCard(payload);
      triggerNotify('New About Us card added to Firestore!');
    }
    setIsAboutModalOpen(false);
  };

  const handleDeleteAboutConfirm = () => {
    if (deletingAboutId) {
      deleteAboutCard(deletingAboutId);
      triggerNotify('About Us card deleted from Firestore!');
      setDeletingAboutId(null);
    }
  };

  // View Solution Modal State
  const [viewingService, setViewingService] = useState(null);

  // Home Dropdown State & Outside Click Handler
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const homeMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (homeMenuRef.current && !homeMenuRef.current.contains(event.target)) {
        setIsHomeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleHomeClick = () => {
    if (!activeTab.startsWith('home-')) {
      setActiveTab('home-banner');
      setActiveHomeSubSection('home-banner');
      setIsHomeDropdownOpen(true);
    } else {
      setIsHomeDropdownOpen(prev => !prev);
    }
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsHomeDropdownOpen(false);
    setIsMobileSidebarOpen(false);
  };

  // Notification message
  const [successMsg, setSuccessMsg] = useState('');

  const triggerNotify = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // ==========================================
  // HOME BANNER FORM STATE
  // ==========================================
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [bannerImageUrl, setBannerImageUrl] = useState('/images/cctv_hero_bg.jpg');
  const [bannerBadgeText, setBannerBadgeText] = useState('ESTABLISHED 1989 • ELECTRONICS & TELECOM');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerBtn1Text, setBannerBtn1Text] = useState('Get Free Site Survey');
  const [bannerBtn1Action, setBannerBtn1Action] = useState('openQuoteModal');
  const [bannerBtn2Text, setBannerBtn2Text] = useState('Request Quotation');
  const [bannerBtn2Action, setBannerBtn2Action] = useState('openQuoteModal');
  const [bannerBtn3Text, setBannerBtn3Text] = useState('Call Now');
  const [bannerBtn3Action, setBannerBtn3Action] = useState('tel:+919822012345');
  const [bannerOrder, setBannerOrder] = useState(1);
  const [bannerIsActive, setBannerIsActive] = useState(true);
  const [deletingBannerId, setDeletingBannerId] = useState(null);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  const handleBannerImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerImageUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openNewBannerModal = () => {
    setEditingBannerId(null);
    setBannerImageUrl('/images/cctv_hero_bg.jpg');
    setBannerBadgeText('ESTABLISHED 1989 • ELECTRONICS & TELECOM');
    setBannerTitle('');
    setBannerBtn1Text('Get Free Site Survey');
    setBannerBtn1Action('openQuoteModal');
    setBannerBtn2Text('Request Quotation');
    setBannerBtn2Action('openQuoteModal');
    setBannerBtn3Text('Call Now');
    setBannerBtn3Action('tel:+919822012345');
    setBannerOrder(banners ? banners.length + 1 : 1);
    setBannerIsActive(true);
    setIsBannerModalOpen(true);
  };

  const openEditBannerModal = (banner) => {
    setEditingBannerId(banner.id);
    setBannerImageUrl(banner.imageUrl || '/images/cctv_hero_bg.jpg');
    setBannerBadgeText(banner.badgeText || '');
    setBannerTitle(banner.title || '');
    setBannerBtn1Text(banner.btn1Text || '');
    setBannerBtn1Action(banner.btn1Action || 'openQuoteModal');
    setBannerBtn2Text(banner.btn2Text || '');
    setBannerBtn2Action(banner.btn2Action || 'openQuoteModal');
    setBannerBtn3Text(banner.btn3Text || '');
    setBannerBtn3Action(banner.btn3Action || 'tel:+919822012345');
    setBannerOrder(banner.order || 1);
    setBannerIsActive(banner.isActive !== undefined ? banner.isActive : true);
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e) => {
    e.preventDefault();
    if (!bannerImageUrl || !bannerImageUrl.trim()) {
      alert('Please select or enter a banner background image.');
      return;
    }

    const payload = {
      imageUrl: bannerImageUrl,
      badgeText: bannerBadgeText || '',
      title: bannerTitle || '',
      btn1Text: bannerBtn1Text || '',
      btn1Action: bannerBtn1Action || '',
      btn2Text: bannerBtn2Text || '',
      btn2Action: bannerBtn2Action || '',
      btn3Text: bannerBtn3Text || '',
      btn3Action: bannerBtn3Action || '',
      order: Number(bannerOrder) || 1,
      isActive: Boolean(bannerIsActive)
    };

    if (editingBannerId) {
      updateBanner(editingBannerId, payload);
      triggerNotify('Home Banner updated in Firestore!');
    } else {
      addBanner(payload);
      triggerNotify('New Home Banner created in Firestore!');
    }
    setIsBannerModalOpen(false);
  };

  const handleDeleteBannerConfirm = () => {
    if (deletingBannerId) {
      deleteBanner(deletingBannerId);
      triggerNotify('Home Banner deleted from Firestore!');
      setDeletingBannerId(null);
    }
  };

  // ==========================================
  // HOME STATS STATE & MODAL
  // ==========================================
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [editingStatId, setEditingStatId] = useState(null);
  const [statValue, setStatValue] = useState('');
  const [statLabel, setStatLabel] = useState('');
  const [statIconName, setStatIconName] = useState('Award');
  const [deletingStatId, setDeletingStatId] = useState(null);

  const openNewStatModal = () => {
    setEditingStatId(null);
    setStatValue('');
    setStatLabel('');
    setStatIconName('Award');
    setIsStatModalOpen(true);
  };

  const openEditStatModal = (stat) => {
    setEditingStatId(stat.id);
    setStatValue(stat.value || '');
    setStatLabel(stat.label || '');
    setStatIconName(stat.iconName || 'Award');
    setIsStatModalOpen(true);
  };

  const handleSaveStat = (e) => {
    e.preventDefault();
    if (!statValue.trim() || !statLabel.trim()) {
      alert('Please enter both value and label.');
      return;
    }
    const payload = { value: statValue, label: statLabel, iconName: statIconName };
    if (editingStatId) {
      updateHomeStat(editingStatId, payload);
      triggerNotify('Statistics counter updated in Firestore!');
    } else {
      addHomeStat(payload);
      triggerNotify('New statistic counter created in Firestore!');
    }
    setIsStatModalOpen(false);
  };

  const handleDeleteStatConfirm = () => {
    if (deletingStatId) {
      deleteHomeStat(deletingStatId);
      triggerNotify('Statistic counter deleted!');
      setDeletingStatId(null);
    }
  };

  // ==========================================
  // HOME WHO WE ARE FORM STATE
  // ==========================================
  const [whoWeAreBadge, setWhoWeAreBadge] = useState(homeWhoWeAre?.badgeText || 'Corporate Legacy & Reach');
  const [whoWeAreTitle, setWhoWeAreTitle] = useState(homeWhoWeAre?.title || 'Who We Are');
  const [whoWeAreSubtitle, setWhoWeAreSubtitle] = useState(homeWhoWeAre?.subtitle || 'JEPL has been delivering security, communication, and technology solutions for more than three decades.');
  const [whoWeAreDesc, setWhoWeAreDesc] = useState(homeWhoWeAre?.description || 'From high-security government establishments and municipal smart cities to heavy industrial MIDC complexes and commercial enterprises, we engineer and maintain robust technology infrastructure tailored to diverse domain requirements.');
  const [whoWeAreSectorsTitle, setWhoWeAreSectorsTitle] = useState(homeWhoWeAre?.sectorsTitle || 'Sectors We Empower');

  const handleSaveWhoWeAre = (e) => {
    e.preventDefault();
    updateHomeWhoWeAre({
      badgeText: whoWeAreBadge,
      title: whoWeAreTitle,
      subtitle: whoWeAreSubtitle,
      description: whoWeAreDesc,
      sectorsTitle: whoWeAreSectorsTitle
    });
    triggerNotify('Who We Are section updated in Firestore!');
  };

  // ==========================================
  // HOME AMC FORM STATE & CARD MODAL
  // ==========================================
  const [amcHeaderBadge, setAmcHeaderBadge] = useState(homeAmcHeader?.badgeText || 'Comprehensive SLA & Post-Commissioning');
  const [amcHeaderTitle, setAmcHeaderTitle] = useState(homeAmcHeader?.title || 'AMC');
  const [amcHeaderSubtitle, setAmcHeaderSubtitle] = useState(homeAmcHeader?.subtitle || 'Annual Maintenance Contract — installation नंतरची नियमित maintenance.');
  const [amcHeaderDesc, setAmcHeaderDesc] = useState(homeAmcHeader?.description || 'Ensure continuous operational uptime and peak performance for your security, networking, and telecom infrastructure with Jay Electronics\' annual maintenance services.');

  const handleSaveAmcHeader = (e) => {
    e.preventDefault();
    updateHomeAmcHeader({
      badgeText: amcHeaderBadge,
      title: amcHeaderTitle,
      subtitle: amcHeaderSubtitle,
      description: amcHeaderDesc
    });
    triggerNotify('AMC Header section updated in Firestore!');
  };

  const [isAmcModalOpen, setIsAmcModalOpen] = useState(false);
  const [editingAmcId, setEditingAmcId] = useState(null);
  const [amcCardTitle, setAmcCardTitle] = useState('');
  const [amcCardIconName, setAmcCardIconName] = useState('Wrench');
  const [amcCardImage, setAmcCardImage] = useState('/images/cctv_hero_bg.jpg');
  const [amcCardDesc, setAmcCardDesc] = useState('');
  const [amcCardFeaturesText, setAmcCardFeaturesText] = useState('');
  const [deletingAmcCardId, setDeletingAmcCardId] = useState(null);

  const openNewAmcModal = () => {
    setEditingAmcId(null);
    setAmcCardTitle('');
    setAmcCardIconName('Wrench');
    setAmcCardImage('/images/cctv_hero_bg.jpg');
    setAmcCardDesc('');
    setAmcCardFeaturesText('');
    setIsAmcModalOpen(true);
  };

  const openEditAmcModal = (card) => {
    setEditingAmcId(card.id);
    setAmcCardTitle(card.title || '');
    setAmcCardIconName(card.iconName || 'Wrench');
    setAmcCardImage(card.image || '/images/cctv_hero_bg.jpg');
    setAmcCardDesc(card.description || '');
    setAmcCardFeaturesText(Array.isArray(card.features) ? card.features.join('\n') : (card.features || ''));
    setIsAmcModalOpen(true);
  };

  const handleSaveAmcCard = (e) => {
    e.preventDefault();
    if (!amcCardTitle.trim()) {
      alert('Please enter a package title.');
      return;
    }
    const featuresArr = amcCardFeaturesText
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const payload = {
      title: amcCardTitle,
      iconName: amcCardIconName,
      image: amcCardImage,
      description: amcCardDesc,
      features: featuresArr
    };

    if (editingAmcId) {
      updateHomeAmcCard(editingAmcId, payload);
      triggerNotify('AMC Package updated in Firestore!');
    } else {
      addHomeAmcCard(payload);
      triggerNotify('New AMC Package created in Firestore!');
    }
    setIsAmcModalOpen(false);
  };

  const handleDeleteAmcCardConfirm = () => {
    if (deletingAmcCardId) {
      deleteHomeAmcCard(deletingAmcCardId);
      triggerNotify('AMC Package deleted!');
      setDeletingAmcCardId(null);
    }
  };

  // ==========================================
  // HOME WHY CHOOSE STATE & MODAL
  // ==========================================
  const [isWhyChooseModalOpen, setIsWhyChooseModalOpen] = useState(false);
  const [editingWhyChooseId, setEditingWhyChooseId] = useState(null);
  const [whyChooseTitle, setWhyChooseTitle] = useState('');
  const [whyChooseIconName, setWhyChooseIconName] = useState('Award');
  const [whyChooseDesc, setWhyChooseDesc] = useState('');
  const [deletingWhyChooseId, setDeletingWhyChooseId] = useState(null);

  const openNewWhyChooseModal = () => {
    setEditingWhyChooseId(null);
    setWhyChooseTitle('');
    setWhyChooseIconName('Award');
    setWhyChooseDesc('');
    setIsWhyChooseModalOpen(true);
  };

  const openEditWhyChooseModal = (card) => {
    setEditingWhyChooseId(card.id);
    setWhyChooseTitle(card.title || '');
    setWhyChooseIconName(card.iconName || 'Award');
    setWhyChooseDesc(card.desc || '');
    setIsWhyChooseModalOpen(true);
  };

  const handleSaveWhyChoose = (e) => {
    e.preventDefault();
    if (!whyChooseTitle.trim()) {
      alert('Please enter title for the card.');
      return;
    }
    const payload = { title: whyChooseTitle, iconName: whyChooseIconName, desc: whyChooseDesc };
    if (editingWhyChooseId) {
      updateHomeWhyChooseCard(editingWhyChooseId, payload);
      triggerNotify('Why Choose JEPL card updated in Firestore!');
    } else {
      addHomeWhyChooseCard(payload);
      triggerNotify('New Why Choose card created in Firestore!');
    }
    setIsWhyChooseModalOpen(false);
  };

  const handleDeleteWhyChooseConfirm = () => {
    if (deletingWhyChooseId) {
      deleteHomeWhyChooseCard(deletingWhyChooseId);
      triggerNotify('Why Choose card deleted!');
      setDeletingWhyChooseId(null);
    }
  };

  // ==========================================
  // HOME BRANDS STATE & MODAL
  // ==========================================
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [brandCategory, setBrandCategory] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
  const [deletingBrandId, setDeletingBrandId] = useState(null);

  const openNewBrandModal = () => {
    setEditingBrandId(null);
    setBrandName('');
    setBrandCategory('');
    setBrandLogo('');
    setIsBrandModalOpen(true);
  };

  const openEditBrandModal = (brand) => {
    setEditingBrandId(brand.id);
    setBrandName(brand.name || '');
    setBrandCategory(brand.category || '');
    setBrandLogo(brand.logo || '');
    setIsBrandModalOpen(true);
  };

  const handleSaveBrand = (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      alert('Please enter brand name.');
      return;
    }
    const payload = { name: brandName, category: brandCategory, logo: brandLogo };
    if (editingBrandId) {
      updateHomeBrand(editingBrandId, payload);
      triggerNotify('Brand details updated in Firestore!');
    } else {
      addHomeBrand(payload);
      triggerNotify('New OEM Brand created in Firestore!');
    }
    setIsBrandModalOpen(false);
  };

  const handleDeleteBrandConfirm = () => {
    if (deletingBrandId) {
      deleteHomeBrand(deletingBrandId);
      triggerNotify('OEM Brand deleted!');
      setDeletingBrandId(null);
    }
  };

  // ==========================================
  // HOME FOOTER FORM STATE
  // ==========================================
  const [footerEstText, setFooterEstText] = useState(homeFooter?.establishedText || 'Established 1989');
  const [footerAboutText, setFooterAboutText] = useState(homeFooter?.aboutText || 'Founded in 1989 by a self-employed Electronics & Telecom Engineer. Premier provider of IP/Analog CCTV, City Surveillance, Structured Networking, EPABX Telecommunication, and Audio/Video Projects.');
  const [footerBadge1, setFooterBadge1] = useState(homeFooter?.badge1 || '35+ Years Excellence');
  const [footerBadge2, setFooterBadge2] = useState(homeFooter?.badge2 || 'Turnkey Execution');
  const [footerAddress, setFooterAddress] = useState(homeFooter?.address || 'Head Office: Electronics & Telecom Complex, Maharashtra, India');
  const [footerPhone, setFooterPhone] = useState(homeFooter?.phone || '+91 98220 12345 / 0233-230000');
  const [footerEmail, setFooterEmail] = useState(homeFooter?.email || 'info@jayelectronics.com');
  const [footerCopyright, setFooterCopyright] = useState(homeFooter?.copyright || '© JAY ELECTRONICS PVT LTD. All Rights Reserved.');
  const [footerTagline, setFooterTagline] = useState(homeFooter?.tagline || 'Surveillance • Telecom • Networking • A/V');

  const handleSaveFooter = (e) => {
    e.preventDefault();
    updateHomeFooter({
      establishedText: footerEstText,
      aboutText: footerAboutText,
      badge1: footerBadge1,
      badge2: footerBadge2,
      address: footerAddress,
      phone: footerPhone,
      email: footerEmail,
      copyright: footerCopyright,
      tagline: footerTagline
    });
    triggerNotify('Footer configuration updated in Firestore!');
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

  // 1. Session verification check while loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-lg">
          <div className="w-6 h-6 border-3 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-[#1E293B]">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  // 2. Protect Route: Redirect to /admin-login if not authenticated as admin
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  // ==================================================
  // FULLSCREEN ADMIN DASHBOARD MAIN LAYOUT
  // ==================================================
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#F2F2F2] font-['Inter'] text-[#0F172A] animate-fadeIn">
      
      {/* Top Full-Width Header Bar with Glassmorphism */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 shrink-0 z-40 shadow-xs h-[65px] flex items-center">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          
          {/* Left Brand & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-2 text-[#6B6B6B] hover:text-[#800000] hover:bg-slate-100 rounded-xl lg:hidden cursor-pointer"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="h-10 shrink-0 flex items-center justify-center p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
              <img src="/images/je_logo.png" alt="JAY Electronics Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Admin Control Console
                </h1>
                <span className="bg-[#800000] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg uppercase tracking-wider shadow-xs">
                  ENTERPRISE STUDIO
                </span>
              </div>
              <p className="text-[11px] text-[#6B6B6B] font-medium hidden sm:block">
                JAY ELECTRONICS PVT LTD — Real-Time Cloud Data Management
              </p>
            </div>
          </div>

          {/* Right Status & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Firestore Status Pill */}
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border shadow-xs transition-all ${
              firebaseConnected 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                : 'bg-[#F8E6E6]/60 text-[#5C0000] border-[#800000]/40'
            }`}>
              <span className={`w-2 h-2 rounded-full ${firebaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-[#800000]'}`}></span>
              <span className="hidden sm:inline">{firebaseConnected ? 'Firestore Connected (Live)' : 'Local Storage Sync Active'}</span>
              <span className="sm:hidden">{firebaseConnected ? 'Live' : 'Sync'}</span>
            </div>

            {/* Visit Website Button */}
            <Link
              to="/"
              className="bg-white hover:bg-slate-50 text-slate-700 hover:text-[#800000] border border-slate-300 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer hover:border-[#800000]"
            >
              <Globe className="w-3.5 h-3.5 text-[#6B6B6B] group-hover:text-[#800000]" />
              <span className="hidden sm:inline">Visit Website</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-sm hover:shadow-md hover:shadow-[#800000]/20 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            {/* User Profile Pill */}
            <div className="hidden lg:flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[#6B6B6B] shadow-xs">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left text-xs leading-tight">
                <span className="font-extrabold text-[#0F172A] block">Admin</span>
                <span className="text-[10px] text-[#6B6B6B] block font-medium">Administrator</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Body Area below header: Flex row container filling remaining viewport height */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Mobile Sidebar Overlay Backdrop */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-20 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Fixed Full-Height Vertical Left Sidebar */}
        <aside 
          className={`w-72 bg-white border-r border-slate-200 z-30 flex flex-col justify-between shrink-0 h-full transition-transform duration-200 ease-in-out fixed lg:static top-[65px] bottom-0 left-0 ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
            
            <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-slate-400 px-1 pt-1">
              <span>NAVIGATION MENU</span>
              <RefreshCw 
                className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-[#800000] transition-transform hover:rotate-180 duration-500" 
                onClick={() => window.location.reload()}
              />
            </div>

            <nav className="space-y-2">
              {/* 1. HOME (with sub-navigation items and click-outside container) */}
              <div ref={homeMenuRef} className="relative">
                <button
                  onClick={handleHomeClick}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    (activeTab === 'home' || activeTab.startsWith('home-'))
                      ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/20 scale-[1.01]'
                      : 'text-[#6B6B6B] hover:bg-slate-50 hover:text-[#800000]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <HomeIcon className="w-4 h-4" />
                    <span>Home</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      (activeTab === 'home' || activeTab.startsWith('home-')) ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#6B6B6B]'
                    }`}>
                      {banners.length} Banners
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isHomeDropdownOpen ? 'rotate-90' : ''
                    }`} />
                  </div>
                </button>

                {/* Home Submenu Items */}
                {isHomeDropdownOpen && (
                  <div className="mt-2 ml-3 pl-3 border-l-2 border-[#800000]/30 space-y-1 animate-fadeIn">
                    {[
                      { id: 'home-banner', label: '├── Home Banner', count: banners.length },
                      { id: 'home-stats', label: '├── Statistics Counter', count: homeStats ? homeStats.length : 5 },
                      { id: 'home-who-we-are', label: '├── Who We Are' },
                      { id: 'home-solutions', label: '├── Our Solutions & Services', count: services.length },
                      { id: 'home-amc', label: '├── AMC', count: homeAmcCards ? homeAmcCards.length : 4 },
                      { id: 'home-why-choose', label: '├── Why Choose JEPL', count: homeWhyChoose ? homeWhyChoose.length : 10 },
                      { id: 'home-brands', label: '├── Brands', count: homeBrands ? homeBrands.length : 10 },
                      { id: 'home-footer', label: '└── Footer' },
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setActiveTab(sub.id);
                          setActiveHomeSubSection(sub.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                          activeHomeSubSection === sub.id && activeTab.startsWith('home-')
                            ? 'bg-rose-50 text-[#800000] font-bold border border-rose-200'
                            : 'text-[#6B6B6B] hover:bg-slate-50 hover:text-[#800000]'
                        }`}
                      >
                        <span>{sub.label}</span>
                        {sub.count !== undefined && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-[#6B6B6B] font-mono">
                            {sub.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. ABOUT US */}
              <button
                onClick={() => handleNavClick('about-us')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'about-us'
                    ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/20 scale-[1.01]'
                    : 'text-[#1E293B] hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4" />
                  <span>About Us</span>
                </div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'about-us' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#6B6B6B]'
                }`}>
                  {aboutCards ? aboutCards.length : 7}
                </span>
              </button>

              {/* 3. SOLUTIONS */}
              <button
                onClick={() => handleNavClick('solutions')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'solutions' || activeTab === 'services'
                    ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/20 scale-[1.01]'
                    : 'text-[#6B6B6B] hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wrench className="w-4 h-4" />
                  <span>Solutions</span>
                </div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'solutions' || activeTab === 'services' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#6B6B6B]'
                }`}>
                  {services.length}
                </span>
              </button>

              {/* 4. PROJECTS */}
              <button
                onClick={() => handleNavClick('projects')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/20 scale-[1.01]'
                    : 'text-[#6B6B6B] hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Projects</span>
                </div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'projects' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#6B6B6B]'
                }`}>
                  {projects.length}
                </span>
              </button>

              {/* 5. BLOGS */}
              <button
                onClick={() => handleNavClick('blogs')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'blogs' || activeTab === 'add-blog'
                    ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/20 scale-[1.01]'
                    : 'text-[#6B6B6B] hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>Blogs</span>
                </div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'blogs' || activeTab === 'add-blog' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#6B6B6B]'
                }`}>
                  {blogs.length}
                </span>
              </button>

              {/* 6. CONTACT */}
              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'contact' || activeTab === 'messages'
                    ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/20 scale-[1.01]'
                    : 'text-[#6B6B6B] hover:bg-slate-50 hover:text-[#800000]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'contact' || activeTab === 'messages' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#6B6B6B]'
                }`}>
                  {messages.length}
                </span>
              </button>

              {/* DASHBOARD OVERVIEW */}
              <div className="pt-3 border-t border-slate-200/80">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-[#6B6B6B] hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Overview Dashboard</span>
                  </div>
                </button>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 shrink-0">
            <div className="text-[11px] text-[#6B6B6B] space-y-1">
              <span className="font-extrabold text-[#1E293B] block">Admin Session:</span>
              <span className="truncate block font-mono text-[#800000] font-semibold">{currentUser?.email || 'Authorized Administrator'}</span>
            </div>
          </div>
        </aside>

        {/* Main Right Content Body Container: Independent Vertical Scrolling */}
        <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {successMsg && (
          <div className="bg-emerald-50/90 backdrop-blur-md border-2 border-emerald-500 text-emerald-950 text-xs p-4 rounded-2xl flex items-center gap-2.5 shadow-md animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        <div className="space-y-6">

            {/* ==================================================
                SECTION 1: HOME BANNER MANAGEMENT (ACTIVE FIRESTORE CRUD)
            ================================================== */}
            {(activeTab === 'home' || activeTab === 'home-banner') && (
              <div className="space-y-6">
                
                {/* Header Card */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                        FIRESTORE LIVE MANAGEMENT
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• {banners.length} Banners Configured</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#1E293B]">
                      Home Banner Management
                    </h2>
                    <p className="text-xs text-[#6B6B6B] mt-1 max-w-2xl font-medium">
                      Manage background images, logo badge text, main headline, and 3 CTA action buttons for the User Panel Home Page slider. Changes reflect in real-time.
                    </p>
                  </div>

                  <button
                    onClick={openNewBannerModal}
                    className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#800000]/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-rose-500/30 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add New Banner</span>
                  </button>
                </div>

                {/* Banners List */}
                <div className="space-y-4">
                  {banners.length === 0 ? (
                    <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-12 text-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-rose-50 text-[#800000] flex items-center justify-center mx-auto border border-rose-100">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <h3 className="text-base font-bold text-[#1E293B]">No Home Banners Configured</h3>
                      <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
                        Click "Add New Banner" above to create your first dynamic Firestore Home hero slide.
                      </p>
                      <button
                        onClick={openNewBannerModal}
                        className="mt-2 inline-flex items-center gap-2 bg-[#800000] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#B45309] transition-all cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Create First Banner</span>
                      </button>
                    </div>
                  ) : (
                    [...banners].sort((a, b) => (a.order || 0) - (b.order || 0)).map((banner, index) => (
                      <div
                        key={banner.id}
                        className={`bg-white/90 backdrop-blur-md border rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4 ${
                          banner.isActive ? 'border-slate-200/80' : 'border-slate-300 opacity-60 bg-slate-50/70'
                        }`}
                      >
                        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                          
                          {/* Left Details */}
                          <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                            <div className="w-32 h-22 sm:w-40 sm:h-26 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 relative group shadow-xs">
                              <img
                                src={banner.imageUrl || '/images/cctv_hero_bg.jpg'}
                                alt={banner.title || 'Banner Preview'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <span className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md">
                                Order #{banner.order || (index + 1)}
                              </span>
                            </div>

                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#800000] bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                                  {banner.badgeText || 'JEPL HERITAGE'}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  banner.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-[#6B6B6B] border border-slate-200'
                                }`}>
                                  {banner.isActive ? 'ACTIVE ON WEBSITE' : 'DISABLED'}
                                </span>
                              </div>

                              <h3 className="text-sm sm:text-base font-extrabold text-[#1E293B] font-['Outfit'] line-clamp-2 leading-snug">
                                {banner.title}
                              </h3>

                              <div className="flex items-center gap-2 pt-1 flex-wrap text-[11px] text-[#6B6B6B]">
                                {banner.btn1Text && (
                                  <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                                    Btn 1: <strong>{banner.btn1Text}</strong>
                                  </span>
                                )}
                                {banner.btn2Text && (
                                  <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[#1E293B] font-medium">
                                    Btn 2: <strong>{banner.btn2Text}</strong>
                                  </span>
                                )}
                                {banner.btn3Text && (
                                  <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                                    Btn 3: <strong>{banner.btn3Text}</strong>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Controls */}
                          <div className="flex items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 w-full md:w-auto justify-end">
                            <button
                              onClick={() => reorderBanner(banner.id, 'up')}
                              disabled={index === 0}
                              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#6B6B6B] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => reorderBanner(banner.id, 'down')}
                              disabled={index === banners.length - 1}
                              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#6B6B6B] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => toggleBannerStatus(banner.id)}
                              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                banner.isActive 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                                  : 'bg-slate-100 text-[#6B6B6B] border-slate-300 hover:bg-slate-200'
                              }`}
                              title={banner.isActive ? 'Click to Disable' : 'Click to Enable'}
                            >
                              {banner.isActive ? <Check className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              <span>{banner.isActive ? 'Active' : 'Enable'}</span>
                            </button>

                            <button
                              onClick={() => openEditBannerModal(banner)}
                              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#800000] hover:border-[#800000] transition-all cursor-pointer"
                              title="Edit Banner"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setDeletingBannerId(banner.id)}
                              className="p-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all cursor-pointer"
                              title="Delete Banner"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* HOME 8 SUB-SECTIONS VIEWS */}
            {activeTab === 'home-stats' && (
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                        FIRESTORE LIVE MANAGEMENT
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• {homeStats ? homeStats.length : 0} Counters Configured</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#1E293B]">
                      Statistics Counter Management
                    </h2>
                    <p className="text-xs text-[#6B6B6B] mt-1 max-w-2xl font-medium">
                      Manage floating statistics counters (Years of Excellence, Projects Completed, Clients, etc.) displayed on the Home Page bar.
                    </p>
                  </div>

                  <button
                    onClick={openNewStatModal}
                    className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-rose-500/30 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add New Stat Counter</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(homeStats || []).map((stat) => (
                    <div key={stat.id} className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#800000] flex items-center justify-center font-bold border border-rose-100">
                            <Award className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-md text-[#6B6B6B]">
                            Icon: {stat.iconName || 'Award'}
                          </span>
                        </div>
                        <div className="text-3xl font-black text-[#800000] font-['Outfit']">{stat.value}</div>
                        <div className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">{stat.label}</div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => openEditStatModal(stat)}
                          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#800000] hover:border-[#800000] transition-all cursor-pointer"
                          title="Edit Stat Counter"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingStatId(stat.id)}
                          className="p-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all cursor-pointer"
                          title="Delete Stat Counter"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'home-who-we-are' && (
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#800000] flex items-center justify-center font-bold">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E293B] font-['Outfit']">Home: Who We Are Section</h2>
                        <p className="text-xs text-[#6B6B6B]">Manage corporate legacy intro, badge text, taglines, and main company description.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                      FIRESTORE LIVE MANAGEMENT
                    </span>
                  </div>

                  <form onSubmit={handleSaveWhoWeAre} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Badge Callout Text</label>
                        <input
                          type="text"
                          value={whoWeAreBadge}
                          onChange={(e) => setWhoWeAreBadge(e.target.value)}
                          placeholder="e.g. Corporate Legacy & Reach"
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-[#800000] outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Section Heading Title</label>
                        <input
                          type="text"
                          value={whoWeAreTitle}
                          onChange={(e) => setWhoWeAreTitle(e.target.value)}
                          placeholder="e.g. Who We Are"
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-[#800000] outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Main Tagline / Highlight Subtitle</label>
                      <input
                        type="text"
                        value={whoWeAreSubtitle}
                        onChange={(e) => setWhoWeAreSubtitle(e.target.value)}
                        placeholder="e.g. JEPL has been delivering security, communication..."
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-[#800000] outline-none font-semibold text-[#800000]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Main Corporate Description Paragraph</label>
                      <textarea
                        rows={4}
                        value={whoWeAreDesc}
                        onChange={(e) => setWhoWeAreDesc(e.target.value)}
                        placeholder="Detail company domain expertise, government & MIDC reach..."
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-[#800000] outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Sectors Section Title</label>
                      <input
                        type="text"
                        value={whoWeAreSectorsTitle}
                        onChange={(e) => setWhoWeAreSectorsTitle(e.target.value)}
                        placeholder="e.g. Sectors We Empower"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-[#800000] outline-none"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        Save Who We Are Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'home-solutions' && (
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                        FIRESTORE LIVE MANAGEMENT
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• {services.length} Divisions Active</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#1E293B]">
                      Our Solutions & Services Management
                    </h2>
                    <p className="text-xs text-[#6B6B6B] mt-1 max-w-2xl font-medium">
                      Manage 11 engineering divisions (CCTV, Structured Cabling, Networking, EPABX, AV, Solar, Fire Alarm, etc.) highlighted on the public Home Page and Solutions page.
                    </p>
                  </div>

                  <button
                    onClick={openNewServiceModal}
                    className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-rose-500/30 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add New Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((serv) => (
                    <div key={serv.id} className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-[#800000] bg-rose-50 px-2 py-0.5 rounded border border-rose-100 uppercase">
                            {serv.category || 'Engineering'}
                          </span>
                          <span className="text-[10px] font-mono text-[#6B6B6B] bg-slate-100 px-2 py-0.5 rounded">
                            {serv.id}
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-[#1E293B] font-['Outfit']">{serv.title}</h3>
                        <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">{serv.description || serv.fullDesc}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => openEditServiceModal(serv)}
                          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#800000] hover:border-[#800000] transition-all cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingServiceId(serv.id)}
                          className="p-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'home-amc' && (
              <div className="space-y-6">
                {/* AMC Header Form */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#800000] flex items-center justify-center font-bold">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E293B] font-['Outfit']">Home: AMC Header & Overview</h2>
                        <p className="text-xs text-[#6B6B6B]">Manage Annual Maintenance Contract title and overview text.</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveAmcHeader} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Badge Text</label>
                        <input
                          type="text"
                          value={amcHeaderBadge}
                          onChange={(e) => setAmcHeaderBadge(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Section Title</label>
                        <input
                          type="text"
                          value={amcHeaderTitle}
                          onChange={(e) => setAmcHeaderTitle(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Subtitle Tagline (Marathi / English)</label>
                      <input
                        type="text"
                        value={amcHeaderSubtitle}
                        onChange={(e) => setAmcHeaderSubtitle(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-[#800000] font-semibold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Main Overview Description</label>
                      <textarea
                        rows={3}
                        value={amcHeaderDesc}
                        onChange={(e) => setAmcHeaderDesc(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                      >
                        Save AMC Header
                      </button>
                    </div>
                  </form>
                </div>

                {/* AMC Packages / Cards List */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit']">AMC Service Packages ({homeAmcCards ? homeAmcCards.length : 0})</h3>
                      <p className="text-xs text-[#6B6B6B]">Preventive Maintenance, 24x7 SLA, Genuine Spares, System Audits</p>
                    </div>
                    <button
                      onClick={openNewAmcModal}
                      className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add AMC Package</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(homeAmcCards || []).map((card) => (
                      <div key={card.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-[#800000] font-['Outfit']">{card.title}</span>
                            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">Icon: {card.iconName || 'Wrench'}</span>
                          </div>
                          <p className="text-xs text-[#6B6B6B] line-clamp-2">{card.description}</p>
                          {card.features && card.features.length > 0 && (
                            <div className="space-y-1 pt-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Features:</span>
                              <ul className="text-[11px] text-[#6B6B6B] space-y-0.5 list-disc pl-4">
                                {card.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                          <button
                            onClick={() => openEditAmcModal(card)}
                            className="p-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-[#800000] cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingAmcCardId(card.id)}
                            className="p-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'home-why-choose' && (
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                        FIRESTORE LIVE MANAGEMENT
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• {homeWhyChoose ? homeWhyChoose.length : 0} Strengths Cards</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#1E293B]">
                      Why Choose JEPL Management
                    </h2>
                    <p className="text-xs text-[#6B6B6B] mt-1 max-w-2xl font-medium">
                      Manage competitive advantage cards (35+ Years, Qualified Engineers, Turnkey Execution, PAN Maharashtra Support, etc.) displayed in the Home Page slider.
                    </p>
                  </div>

                  <button
                    onClick={openNewWhyChooseModal}
                    className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-rose-500/30 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Strength Card</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(homeWhyChoose || []).map((card) => (
                    <div key={card.id} className="bg-white/90 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-md shadow-slate-900/15 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#800000] flex items-center justify-center font-bold border border-rose-100">
                            <Shield className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-[#6B6B6B]">{card.iconName || 'Award'}</span>
                        </div>
                        <h3 className="text-sm font-extrabold text-[#1E293B] font-['Outfit']">{card.title}</h3>
                        <p className="text-xs text-[#6B6B6B] leading-relaxed">{card.desc}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => openEditWhyChooseModal(card)}
                          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#800000] cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingWhyChooseId(card.id)}
                          className="p-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'home-brands' && (
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                        FIRESTORE LIVE MANAGEMENT
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• {homeBrands ? homeBrands.length : 0} OEM Partners Configured</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#1E293B]">
                      Technology OEM Brands Management
                    </h2>
                    <p className="text-xs text-[#6B6B6B] mt-1 max-w-2xl font-medium">
                      Manage global technology partners list (CP PLUS, Dahua, Hikvision, Cisco, Dell, Matrix, Honeywell, etc.) on the public Home Page.
                    </p>
                  </div>

                  <button
                    onClick={openNewBrandModal}
                    className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-rose-500/30 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Brand Partner</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(homeBrands || []).map((brand) => (
                    <div key={brand.id} className="bg-white/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-md shadow-slate-900/15 text-center space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} className="h-10 w-auto object-contain mx-auto" />
                        ) : (
                          <div className="text-lg font-black text-[#1E293B] font-['Outfit']">{brand.name}</div>
                        )}
                        <span className="text-[10px] font-bold uppercase text-[#6B6B6B] bg-slate-50 px-2 py-0.5 rounded border border-slate-200 block truncate">
                          {brand.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => openEditBrandModal(brand)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[#800000] cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingBrandId(brand.id)}
                          className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'home-footer' && (
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#800000] flex items-center justify-center font-bold">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E293B] font-['Outfit']">Home: Footer Information Management</h2>
                        <p className="text-xs text-[#6B6B6B]">Manage corporate address, helpline phone numbers, email, copyright & footer badges.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                      FIRESTORE LIVE MANAGEMENT
                    </span>
                  </div>

                  <form onSubmit={handleSaveFooter} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Established Year / Badge</label>
                        <input
                          type="text"
                          value={footerEstText}
                          onChange={(e) => setFooterEstText(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Highlight Tagline</label>
                        <input
                          type="text"
                          value={footerTagline}
                          onChange={(e) => setFooterTagline(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white font-semibold text-[#800000]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Footer Corporate About Description</label>
                      <textarea
                        rows={3}
                        value={footerAboutText}
                        onChange={(e) => setFooterAboutText(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Footer Badge 1</label>
                        <input
                          type="text"
                          value={footerBadge1}
                          onChange={(e) => setFooterBadge1(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Footer Badge 2</label>
                        <input
                          type="text"
                          value={footerBadge2}
                          onChange={(e) => setFooterBadge2(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Corporate Head Office Address</label>
                      <input
                        type="text"
                        value={footerAddress}
                        onChange={(e) => setFooterAddress(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Helpline Phone Number(s)</label>
                        <input
                          type="text"
                          value={footerPhone}
                          onChange={(e) => setFooterPhone(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E293B]">Official Contact Email</label>
                        <input
                          type="text"
                          value={footerEmail}
                          onChange={(e) => setFooterEmail(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Copyright Notice Text</label>
                      <input
                        type="text"
                        value={footerCopyright}
                        onChange={(e) => setFooterCopyright(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        Save Footer Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'about-us' && (
              <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                        FIRESTORE LIVE MANAGEMENT
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• {(aboutCards || []).length} Sections Active</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#1E293B]">
                      About Us Section Management
                    </h2>
                    <p className="text-xs text-[#6B6B6B] mt-1 max-w-2xl font-medium">
                      Manage dynamic About Us cards (Company Profile, Our Story, Vision & Mission, Core Values, Why Choose JEPL, Leadership, Our Team, and custom cards). Changes automatically sync with the User Panel About page and Navbar dropdowns.
                    </p>
                  </div>

                  <button
                    onClick={openNewAboutModal}
                    className="bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#800000]/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-rose-500/30 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Card / Add New</span>
                  </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(aboutCards || []).map((card) => (
                    <div 
                      key={card.id} 
                      className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-[#800000] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 uppercase tracking-wider">
                            {card.slug || card.id}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Order #{card.order || 1}
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-[#1E293B] font-['Outfit']">
                          {card.title}
                        </h3>

                        {card.tagline && (
                          <p className="text-xs font-bold text-[#800000] line-clamp-2 leading-snug">
                            {card.tagline}
                          </p>
                        )}

                        <p className="text-xs text-[#6B6B6B] line-clamp-3 leading-relaxed">
                          {card.content}
                        </p>

                        {card.highlights && card.highlights.length > 0 && (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                              Highlights ({card.highlights.length}):
                            </span>
                            <ul className="text-[11px] text-[#6B6B6B] space-y-0.5 list-disc pl-4">
                              {card.highlights.slice(0, 2).map((h, idx) => (
                                <li key={idx} className="truncate">{h}</li>
                              ))}
                              {card.highlights.length > 2 && (
                                <li className="text-[10px] font-bold text-[#800000] list-none">
                                  + {card.highlights.length - 2} more items...
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                        <button
                          onClick={() => setViewingAboutCard(card)}
                          className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                          title="View Card Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#6B6B6B]" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => openEditAboutModal(card)}
                          className="px-3 py-1.5 bg-white hover:bg-slate-50 text-[#800000] border border-slate-200 hover:border-[#800000] rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                          title="Edit Card"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeletingAboutId(card.id)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                          title="Delete Card"
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

            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* Welcome Hero Banner Card */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  
                  <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-rose-50/80 via-rose-50/30 to-transparent pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                      <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#1E293B] tracking-tight">
                        Welcome Back, <span className="text-[#800000]">Admin</span>
                      </h2>
                      <p className="text-sm text-[#6B6B6B] font-normal leading-relaxed">
                        Manage your content, projects, and engineering services efficiently from the central studio control console.
                      </p>
                      <div className="w-12 h-1 bg-[#800000] rounded-full mt-2"></div>
                    </div>

                    <div className="w-44 h-30 sm:w-56 sm:h-36 shrink-0 relative flex items-center justify-center rounded-2xl overflow-hidden shadow-lg border-2 border-[#800000]/20 group">
                      <img 
                        src="/images/cctv_hero_bg.jpg" 
                        alt="CCTV Security Camera" 
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <span className="absolute bottom-2 left-2 text-[10px] font-extrabold text-white bg-[#800000] px-2.5 py-0.5 rounded-lg shadow">
                        JE System Active
                      </span>
                    </div>
                  </div>

                </div>

                {/* 4 Statistics Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Card 1: BLOG POSTS */}
                  <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between hover:shadow-xl hover:border-[#800000]/40 transform hover:-translate-y-1 transition-all duration-300">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">BLOG POSTS</span>
                      <div className="text-3xl font-black text-[#1E293B] font-['Outfit']">{blogs.length}</div>
                      <span className="text-[11px] text-[#800000] font-bold block">Live in Firestore</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#800000] border border-rose-100 flex items-center justify-center shrink-0 shadow-2xs">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card 2: MAJOR PROJECTS */}
                  <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between hover:shadow-xl hover:border-blue-400/50 transform hover:-translate-y-1 transition-all duration-300">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">MAJOR PROJECTS</span>
                      <div className="text-3xl font-black text-[#1E293B] font-['Outfit']">{projects.length}</div>
                      <span className="text-[11px] text-[#800000] font-bold block">Dynamic Records</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#F2F2F2] text-[#800000] border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card 3: SERVICES */}
                  <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between hover:shadow-xl hover:border-[#800000]/40/50 transform hover:-translate-y-1 transition-all duration-300">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">SERVICES</span>
                      <div className="text-3xl font-black text-[#1E293B] font-['Outfit']">{services.length}</div>
                      <span className="text-[11px] text-[#800000] font-bold block">Engineering Divisions</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#F8E6E6]/60 text-[#800000] border border-[#800000]/20 flex items-center justify-center shrink-0 shadow-2xs">
                      <Wrench className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card 4: INQUIRIES */}
                  <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between hover:shadow-xl hover:border-emerald-400/50 transform hover:-translate-y-1 transition-all duration-300">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">INQUIRIES</span>
                      <div className="text-3xl font-black text-[#800000] font-['Outfit']">{messages.length}</div>
                      <span className="text-[11px] text-[#800000] font-bold block">Customer Requests</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 shadow-2xs">
                      <Mail className="w-6 h-6" />
                    </div>
                  </div>

                </div>

                {/* Quick Content Management Bar */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#800000] flex items-center justify-center shrink-0 border border-rose-100">
                        <Edit3 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#1E293B] font-['Outfit']">
                          Quick Content Management
                        </h3>
                        <p className="text-xs text-[#6B6B6B] font-medium">
                          Manage your website content with ease and keep it updated.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveTab('blogs')}
                      className="text-xs font-bold text-[#800000] hover:text-[#B45309] flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    
                    <button
                      onClick={() => { resetBlogForm(); setActiveTab('add-blog'); }}
                      className="bg-[#800000] hover:bg-[#B45309] text-white p-4 rounded-2xl font-bold text-xs flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      <div className="flex items-center gap-2.5">
                        <Edit3 className="w-4 h-4" />
                        <span>Create Blog Post</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={openNewProjectModal}
                      className="bg-[#1E293B] hover:bg-[#0F172A] text-white p-4 rounded-2xl font-bold text-xs flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      <div className="flex items-center gap-2.5">
                        <FolderGit2 className="w-4 h-4 text-[#800000]" />
                        <span>Add Executed Project</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={openNewServiceModal}
                      className="bg-white hover:bg-slate-50 text-[#1E293B] border border-slate-300 p-4 rounded-2xl font-bold text-xs flex items-center justify-between shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      <div className="flex items-center gap-2.5">
                        <Settings className="w-4 h-4 text-[#6B6B6B]" />
                        <span>Add Service Division</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('messages')}
                      className="bg-rose-50/80 hover:bg-rose-100 text-[#800000] border border-rose-200/80 p-4 rounded-2xl font-bold text-xs flex items-center justify-between transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4" />
                        <span>Inquiries Inbox ({messages.length})</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>

                {/* Bottom Row: Recent Activity & Quick Access */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left Box: Recent Activity */}
                  <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-slate-100 text-[#6B6B6B] flex items-center justify-center shrink-0 border border-slate-200">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#1E293B] font-['Outfit']">Recent Activity</h3>
                        <p className="text-xs text-[#6B6B6B]">Latest updates from your website content</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      {[
                        { text: 'New blog post added', time: '5 minutes ago', tag: 'Blog', color: 'bg-rose-100/80 text-rose-800 border border-rose-200' },
                        { text: 'Project updated: Online Bus Booking', time: '12 minutes ago', tag: 'Project', color: 'bg-blue-100/80 text-[#5C0000] border border-blue-200' },
                        { text: 'Service updated: CCTV Surveillance', time: '25 minutes ago', tag: 'Service', color: 'bg-[#F8E6E6]/80 text-[#5C0000] border border-[#800000]/30' },
                        { text: 'New inquiry received', time: '1 hour ago', tag: 'Inquiry', color: 'bg-emerald-100/80 text-emerald-800 border border-emerald-200' },
                      ].map((act, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 text-xs hover:bg-white hover:shadow-2xs transition-all">
                          <div>
                            <span className="font-bold text-[#1E293B] block">{act.text}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{act.time}</span>
                          </div>
                          <span className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${act.color}`}>
                            {act.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Box: Quick Access Grid */}
                  <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#800000] flex items-center justify-center shrink-0 border border-rose-100">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#1E293B] font-['Outfit']">Quick Access</h3>
                        <p className="text-xs text-[#6B6B6B]">Jump to your most used features</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {[
                        { id: 'blogs', name: 'Blogs', sub: 'Manage Blogs', icon: FileText, bg: 'bg-rose-50 text-[#800000]' },
                        { id: 'projects', name: 'Projects', sub: 'Manage Projects', icon: FolderGit2, bg: 'bg-[#F2F2F2] text-[#800000]' },
                        { id: 'services', name: 'Services', sub: 'Manage Services', icon: Wrench, bg: 'bg-[#F8E6E6]/60 text-[#800000]' },
                        { id: 'gallery', name: 'Gallery', sub: 'Manage Gallery', icon: ImageIcon, bg: 'bg-purple-50 text-purple-600' },
                        { id: 'messages', name: 'Inquiries', sub: 'View Inquiries', icon: Mail, bg: 'bg-emerald-50 text-emerald-600' },
                        { id: 'settings', name: 'Firebase Config', sub: 'Database Settings', icon: Server, bg: 'bg-slate-100 text-slate-700' },
                      ].map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-[#800000] p-4 rounded-2xl text-left transition-all duration-300 space-y-2 group cursor-pointer shadow-2xs hover:shadow-md"
                          >
                            <div className="flex items-center justify-between">
                              <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center ${item.bg}`}>
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#800000] transition-transform group-hover:translate-x-0.5" />
                            </div>
                            <div>
                              <span className="font-extrabold text-[#1E293B] text-xs block group-hover:text-[#800000] transition-colors">{item.name}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{item.sub}</span>
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
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit']">Manage Blog Posts</h3>
                <button
                  onClick={() => { resetBlogForm(); setActiveTab('add-blog'); }}
                  className="bg-[#800000] hover:bg-[#B45309] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md active:scale-95 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Blog</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="w-full text-left text-xs text-[#1E293B]">
                  <thead className="bg-slate-100/80 border-b border-slate-200 font-bold uppercase text-[#6B6B6B]">
                    <tr>
                      <th className="p-3.5">Thumbnail</th>
                      <th className="p-3.5">Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-900 border border-[#800000]">
                            <img src={b.image || '/images/cctv_hero_bg.jpg'} alt="" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="p-3.5 font-bold max-w-xs truncate">{b.title}</td>
                        <td className="p-3.5">
                          <span className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#800000]">
                            {b.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-[#6B6B6B]">{b.date}</td>
                        <td className="p-3.5">
                          <span className={b.status === 'Published' ? 'px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800' : 'px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-slate-100 text-slate-700'}>
                            {b.status || 'Published'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleStartEditBlog(b)}
                            className="p-2 text-[#800000] hover:bg-[#F2F2F2] rounded-xl cursor-pointer transition-colors"
                            title="Edit Post"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingBlogId(b.id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors"
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
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-[#1E293B] font-['Outfit']">
                  {editingBlogId ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                {editingBlogId && (
                  <button
                    onClick={resetBlogForm}
                    className="text-xs font-semibold text-[#6B6B6B] hover:text-slate-800 underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Blog Post Title *
                  </label>
                  <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="e.g. Next-Generation Fiber Splicing Standards"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/80 focus:border-[#800000] focus:outline-none text-sm bg-slate-50/70 focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Category *
                    </label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/80 focus:border-[#800000] focus:outline-none text-sm bg-slate-50/70 focus:bg-white transition-all"
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
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Publication Status
                    </label>
                    <select
                      value={blogStatus}
                      onChange={(e) => setBlogStatus(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/80 focus:border-[#800000] focus:outline-none text-sm bg-slate-50/70 focus:bg-white transition-all"
                    >
                      <option value="Published">Published (Live on Feed)</option>
                      <option value="Draft">Draft (Saved in Admin)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Upload Featured Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBlogImageUpload}
                      className="w-full text-xs text-[#6B6B6B] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#800000] file:text-white cursor-pointer"
                    />
                    {blogImageUrl && (
                      <div className="w-24 h-16 rounded-xl overflow-hidden border-2 border-[#800000] bg-slate-900 shrink-0">
                        <img src={blogImageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Post Content / Caption *
                  </label>
                  <textarea
                    rows="8"
                    value={blogCaption}
                    onChange={(e) => setBlogCaption(e.target.value)}
                    placeholder="Enter full multi-line post content, technical highlights..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/80 focus:border-[#800000] focus:outline-none text-sm bg-slate-50/70 focus:bg-white leading-relaxed transition-all"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-[#800000] hover:bg-[#B45309] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-xl hover:shadow-[#800000]/20 active:scale-95 transition-all cursor-pointer"
                  >
                    {editingBlogId ? 'Update Blog Post' : 'Publish Blog Post'}
                  </button>

                  <button
                    type="button"
                    onClick={resetBlogForm}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm px-5 py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: PROJECTS REGISTRY */}
          {activeTab === 'projects' && (
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit']">Major Projects Registry</h3>
                  <p className="text-xs text-[#6B6B6B]">Add, Edit, and Delete projects dynamically synced with Firestore.</p>
                </div>
                <button
                  onClick={openNewProjectModal}
                  className="bg-[#800000] hover:bg-[#B45309] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md active:scale-95 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div key={p.id} className="bg-slate-50/80 hover:bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#800000] uppercase bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
                          {p.category}
                        </span>
                        <span className="text-[11px] text-[#6B6B6B] font-medium">{p.location}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1E293B] font-['Outfit']">{p.title}</h4>
                      <p className="text-[11px] text-[#6B6B6B] line-clamp-2">{p.details}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditProjectModal(p)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-[#800000] border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingProjectId(p.id)}
                        className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
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

          {/* TAB 5: SOLUTIONS & SERVICES REGISTRY */}
          {(activeTab === 'solutions' || activeTab === 'services') && (
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800000] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                      FIRESTORE LIVE MANAGEMENT
                    </span>
                    <span className="text-xs text-slate-400 font-mono">• {services.length} Solutions Configured</span>
                  </div>
                  <h3 className="text-xl font-black font-['Outfit'] text-[#1E293B]">Solutions Management</h3>
                  <p className="text-xs text-[#6B6B6B] mt-1 max-w-2xl font-medium">
                    Manage all 11 core Solution pages (Active LED Board Systems, Audio/Video Solutions, IP CCTV, City Surveillance, EPABX, Fire Security, LAN/WAN Networking, Office Automation, Solar Projects, Structured Cabling, Telecommunication Projects).
                  </p>
                </div>
                <button
                  onClick={openNewServiceModal}
                  className="bg-[#800000] hover:bg-[#B45309] text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#800000]/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-rose-500/30 active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Solution</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="bg-slate-50/80 hover:bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold text-[#800000] uppercase bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
                        {s.category || 'Service'}
                      </span>
                      <h4 className="text-sm font-bold text-[#1E293B] font-['Outfit']">{s.title}</h4>
                      <p className="text-[11px] text-[#6B6B6B] line-clamp-2">{s.shortDesc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingService(s)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#6B6B6B]" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => openEditServiceModal(s)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-[#800000] border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingServiceId(s.id)}
                        className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
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
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit']">Visual Assets & Gallery</h3>
                  <p className="text-xs text-[#6B6B6B]">Manage high-resolution images & project photos.</p>
                </div>
                <button
                  onClick={openNewGalleryModal}
                  className="bg-[#800000] hover:bg-[#B45309] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md active:scale-95 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-200/80 space-y-2 flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all">
                    <div className="h-36 bg-slate-900 overflow-hidden relative">
                      <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
                      <span className="absolute top-2 left-2 text-[10px] font-extrabold bg-[#800000] text-white px-2.5 py-0.5 rounded-lg shadow">
                        {g.category}
                      </span>
                    </div>

                    <div className="p-3 space-y-1">
                      <h4 className="text-xs font-bold text-[#1E293B] truncate">{g.title}</h4>
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200">
                        <button
                          onClick={() => openEditGalleryModal(g)}
                          className="p-1.5 text-[#800000] hover:bg-[#F2F2F2] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingGalleryId(g.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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

          {/* TAB 7: MESSAGES INBOX & QUOTE MANAGEMENT */}
          {(activeTab === 'contact' || activeTab === 'messages') && (
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-[#1E293B] font-['Outfit']">Customer Inquiries Inbox</h3>
                  <p className="text-xs text-[#6B6B6B] font-medium">Real-time form submissions from public Contact Us form, Request Quote modal, and Project Inquiries.</p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
                  {[
                    { id: 'all', label: `All (${messages.length})` },
                    { id: 'contact_messages', label: `contact_messages (${(contactMessages || []).length})` },
                    { id: 'contacts', label: `contacts (${(contacts || []).length})` },
                    { id: 'quote_requests', label: `quote_requests (${(quoteRequests || []).length})` },
                    { id: 'unread', label: `Unread (${messages.filter(m => m.status !== 'Responded' && m.status !== 'responded').length})` }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setMsgFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        msgFilter === filter.id
                          ? 'bg-[#800000] text-white shadow-xs'
                          : 'text-[#6B6B6B] hover:text-[#1E293B]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {messages.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                  <Mail className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#6B6B6B]">No customer inquiries or quote requests in database yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages
                    .filter((m) => {
                      if (msgFilter === 'contact_messages') return m.collectionName === 'contact_messages';
                      if (msgFilter === 'contacts') return m.collectionName === 'contacts';
                      if (msgFilter === 'quote_requests' || msgFilter === 'quoteRequests') return m.collectionName === 'quote_requests' || m.collectionName === 'quoteRequests' || m.type === 'Quote Request';
                      if (msgFilter === 'unread') return m.status !== 'Responded' && m.status !== 'responded';
                      return true;
                    })
                    .map((m) => {
                      const isQuote = m.type === 'Quote Request';
                      return (
                        <div key={m.id} className="bg-slate-50/80 hover:bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3 shadow-2xs hover:shadow-md transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg border ${
                                isQuote 
                                  ? 'bg-purple-50 text-purple-700 border-purple-200' 
                                  : 'bg-[#F2F2F2] text-blue-700 border-blue-200'
                              }`}>
                                {isQuote ? '⚡ Quote Request' : '📧 Contact Message'}
                              </span>
                              <span className="font-extrabold text-[#1E293B] text-sm">{m.name}</span>
                              <span className="text-xs text-[#800000] font-bold">
                                • {m.subject || m.service || 'General Inquiry'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs shrink-0">
                              <span className="text-slate-400 font-mono text-[11px]">
                                {m.createdAt ? new Date(m.createdAt).toLocaleString() : m.date}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                                m.status === 'Responded' 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                                  : 'bg-[#F8E6E6]/60 text-[#5C0000] border-[#800000]/40 animate-pulse'
                              }`}>
                                {m.status || 'Unread'}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/70 font-medium">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">Email:</span>
                              <a href={`mailto:${m.email}`} className="font-bold text-[#800000] hover:underline truncate">{m.email}</a>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">Phone:</span>
                              <a href={`tel:${m.phone}`} className="font-bold text-[#1E293B] hover:underline">{m.phone}</a>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-xl border border-slate-200/70 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Requirement / Note Details:</span>
                            <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                              "{m.message}"
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-1">
                            {m.status !== 'Responded' ? (
                              <button
                                onClick={() => {
                                  updateMessageStatus(m.id, 'Responded');
                                  triggerNotify('Marked inquiry as Responded!');
                                }}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Mark as Responded</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  updateMessageStatus(m.id, 'Unread');
                                  triggerNotify('Marked inquiry as Unread!');
                                }}
                                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                <span>Mark Unread</span>
                              </button>
                            )}

                            <button
                              onClick={() => setDeletingMsgId(m.id)}
                              className="px-3.5 py-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SETTINGS & FIREBASE SETUP */}
          {activeTab === 'settings' && (
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#1E293B] font-['Outfit']">System & Firebase Configuration</h3>
              <p className="text-xs text-[#6B6B6B]">
                Firestore database and real-time listeners are active.
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-[#1E293B]">Firebase Integration Status:</span>
                  <span className="text-emerald-700 font-extrabold bg-emerald-100 px-3 py-1 rounded-lg">
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

      {/* Delete Blog Modal */}
      <Modal
        isOpen={!!deletingBlogId}
        onClose={() => setDeletingBlogId(null)}
        title="Confirm Delete Blog Post"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
            Are you sure you want to permanently delete this blog post from Cloud Firestore?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingBlogId(null)} className="px-4 py-2 text-xs font-bold text-[#6B6B6B] hover:text-slate-800">Cancel</button>
            <button onClick={() => { deleteBlog(deletingBlogId); setDeletingBlogId(null); triggerNotify('Blog deleted!'); }} className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm">Delete</button>
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
          <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
            Are you sure you want to delete this major project record from Firestore?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingProjectId(null)} className="px-4 py-2 text-xs font-bold text-[#6B6B6B] hover:text-slate-800">Cancel</button>
            <button onClick={() => { deleteProject(deletingProjectId); setDeletingProjectId(null); triggerNotify('Project deleted!'); }} className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm">Delete Project</button>
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
          <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
            Are you sure you want to delete this service division record from Firestore?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingServiceId(null)} className="px-4 py-2 text-xs font-bold text-[#6B6B6B] hover:text-slate-800">Cancel</button>
            <button onClick={() => { deleteService(deletingServiceId); setDeletingServiceId(null); triggerNotify('Service deleted!'); }} className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm">Delete Service</button>
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
          <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
            Are you sure you want to delete this image from the gallery?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingGalleryId(null)} className="px-4 py-2 text-xs font-bold text-[#6B6B6B] hover:text-slate-800">Cancel</button>
            <button onClick={() => { deleteGalleryItem(deletingGalleryId); setDeletingGalleryId(null); triggerNotify('Gallery item deleted!'); }} className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm">Delete Photo</button>
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
          <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
            Are you sure you want to delete this customer message?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeletingMsgId(null)} className="px-4 py-2 text-xs font-bold text-[#6B6B6B] hover:text-slate-800">Cancel</button>
            <button onClick={() => { deleteMessage(deletingMsgId); setDeletingMsgId(null); triggerNotify('Message deleted!'); }} className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm">Delete Message</button>
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
            <label className="block font-bold text-slate-700 uppercase mb-1">Project Title *</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Sangli Smart City Surveillance"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Category *</label>
              <select
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none bg-white"
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
              <label className="block font-bold text-slate-700 uppercase mb-1">Location *</label>
              <input
                type="text"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                placeholder="e.g. Sangli, Maharashtra"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Deployed Technology</label>
            <input
              type="text"
              value={projectTech}
              onChange={(e) => setProjectTech(e.target.value)}
              placeholder="e.g. 4K IP CCTV, Optical Fiber Backbone"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Project Details *</label>
            <textarea
              rows="3"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Enter comprehensive description of project scope..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Image Upload / URL</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProjectImageUpload}
              className="w-full text-xs text-[#6B6B6B] mb-2 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B]">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-[#800000] text-white shadow-sm hover:bg-[#B45309]">Save Project</button>
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
            <label className="block font-bold text-slate-700 uppercase mb-1">Service Title *</label>
            <input
              type="text"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              placeholder="e.g. Thermal Imaging & AI Security"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Category *</label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none bg-white"
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
              <label className="block font-bold text-slate-700 uppercase mb-1">Lucide Icon Name</label>
              <input
                type="text"
                value={serviceIcon}
                onChange={(e) => setServiceIcon(e.target.value)}
                placeholder="e.g. Camera, Network, Shield, Flame"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Short Description *</label>
            <textarea
              rows="2"
              value={serviceShortDesc}
              onChange={(e) => setServiceShortDesc(e.target.value)}
              placeholder="Brief summary for service cards..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Full Detailed Overview</label>
            <textarea
              rows="3"
              value={serviceFullDesc}
              onChange={(e) => setServiceFullDesc(e.target.value)}
              placeholder="Complete overview paragraph for service modals..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Key Features (One feature per line)</label>
            <textarea
              rows="4"
              value={serviceFeatures}
              onChange={(e) => setServiceFeatures(e.target.value)}
              placeholder={"4K Ultra HD IP Cameras\nNight Vision Sensors\nCentralized VMS Integration"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onClick={() => setIsServiceModalOpen(false)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B]">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-[#800000] text-white shadow-sm hover:bg-[#B45309]">Save Service</button>
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
            <label className="block font-bold text-slate-700 uppercase mb-1">Photo Title *</label>
            <input
              type="text"
              value={galleryTitle}
              onChange={(e) => setGalleryTitle(e.target.value)}
              placeholder="e.g. Kolhapur Control Room Video Wall"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Category *</label>
            <select
              value={galleryCategory}
              onChange={(e) => setGalleryCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none bg-white"
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
            <label className="block font-bold text-slate-700 uppercase mb-1">Image Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleGalleryImageUpload}
              className="w-full text-xs text-[#6B6B6B] mb-2 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onClick={() => setIsGalleryModalOpen(false)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B]">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-[#800000] text-white shadow-sm hover:bg-[#B45309]">Save Photo</button>
          </div>
        </form>
      </Modal>

      {/* HOME BANNER ADD / EDIT MODAL */}
      <Modal
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
        title={editingBannerId ? 'Edit Home Banner Slide' : 'Add New Home Banner Slide'}
      >
        <form onSubmit={handleSaveBanner} className="space-y-4">
          
          {/* Background Image Preview & Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1E293B] block">
              Banner Background Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-20 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 relative shrink-0">
                <img
                  src={bannerImageUrl || '/images/cctv_hero_bg.jpg'}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageUpload}
                  className="text-xs text-[#6B6B6B] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-[#800000] hover:file:bg-rose-100 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Or enter Image URL (e.g. /images/cctv_hero_bg.jpg)"
                  value={bannerImageUrl}
                  onChange={(e) => setBannerImageUrl(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800000]/30"
                />
              </div>
            </div>
          </div>

          {/* Badge Text */}
          <div>
            <label className="text-xs font-bold text-[#1E293B] block mb-1">
              Badge / Tagline Text
            </label>
            <input
              type="text"
              placeholder="e.g. ESTABLISHED 1989 • ELECTRONICS & TELECOM"
              value={bannerBadgeText}
              onChange={(e) => setBannerBadgeText(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800000]/30"
            />
          </div>

          {/* Main Title (Optional) */}
          <div>
            <label className="text-xs font-bold text-[#1E293B] block mb-1">
              Main Headline Title <span className="text-[#6B6B6B] font-normal text-[11px]">(Optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Main Headline Title (Optional)"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800000]/30 font-['Outfit'] font-semibold"
            ></textarea>
          </div>

          {/* 3 Buttons Configurations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {/* Button 1 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <span className="text-[11px] font-extrabold text-[#800000] block">Button 1 (Primary)</span>
              <input
                type="text"
                placeholder="Button 1 Text"
                value={bannerBtn1Text}
                onChange={(e) => setBannerBtn1Text(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
              <input
                type="text"
                placeholder="Action e.g. openQuoteModal"
                value={bannerBtn1Action}
                onChange={(e) => setBannerBtn1Action(e.target.value)}
                className="w-full text-[11px] p-2 rounded-lg border border-slate-200 bg-white font-mono"
              />
            </div>

            {/* Button 2 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <span className="text-[11px] font-extrabold text-slate-700 block">Button 2 (Secondary)</span>
              <input
                type="text"
                placeholder="Button 2 Text"
                value={bannerBtn2Text}
                onChange={(e) => setBannerBtn2Text(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
              <input
                type="text"
                placeholder="Action e.g. openQuoteModal"
                value={bannerBtn2Action}
                onChange={(e) => setBannerBtn2Action(e.target.value)}
                className="w-full text-[11px] p-2 rounded-lg border border-slate-200 bg-white font-mono"
              />
            </div>

            {/* Button 3 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <span className="text-[11px] font-extrabold text-slate-700 block">Button 3 (Contact)</span>
              <input
                type="text"
                placeholder="Button 3 Text"
                value={bannerBtn3Text}
                onChange={(e) => setBannerBtn3Text(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
              <input
                type="text"
                placeholder="Action e.g. tel:+919822012345"
                value={bannerBtn3Action}
                onChange={(e) => setBannerBtn3Action(e.target.value)}
                className="w-full text-[11px] p-2 rounded-lg border border-slate-200 bg-white font-mono"
              />
            </div>
          </div>

          {/* Order & Active Switch */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-[#1E293B]">Order Position:</label>
              <input
                type="number"
                min={1}
                value={bannerOrder}
                onChange={(e) => setBannerOrder(e.target.value)}
                className="w-20 text-xs p-2 rounded-xl border border-slate-200 text-center font-mono font-bold"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bannerIsActive}
                onChange={(e) => setBannerIsActive(e.target.checked)}
                className="w-4 h-4 text-[#800000] rounded focus:ring-0"
              />
              <span className="text-xs font-bold text-[#1E293B]">Enable Banner Slide</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsBannerModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#6B6B6B] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#800000] hover:bg-[#B45309] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {editingBannerId ? 'Update Banner' : 'Save Banner'}
            </button>
          </div>

        </form>
      </Modal>

      {/* BANNER DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={Boolean(deletingBannerId)}
        onClose={() => setDeletingBannerId(null)}
        title="Confirm Delete Banner"
      >
        <div className="space-y-4">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs">
            <AlertTriangle className="w-6 h-6 shrink-0 text-[#800000]" />
            <span>
              Are you sure you want to delete this Home Banner? This action will permanently remove the slide from your Firestore database and the User Panel hero carousel.
            </span>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setDeletingBannerId(null)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#6B6B6B] hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteBannerConfirm}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Yes, Delete Banner
            </button>
          </div>
        </div>
      </Modal>

      {/* STAT MODAL */}
      <Modal
        isOpen={isStatModalOpen}
        onClose={() => setIsStatModalOpen(false)}
        title={editingStatId ? 'Edit Statistic Counter' : 'Add New Statistic Counter'}
      >
        <form onSubmit={handleSaveStat} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Counter Value *</label>
            <input
              type="text"
              value={statValue}
              onChange={(e) => setStatValue(e.target.value)}
              placeholder="e.g. 35+, 1000+, 500+"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none font-black text-base text-[#800000]"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Counter Label *</label>
            <input
              type="text"
              value={statLabel}
              onChange={(e) => setStatLabel(e.target.value)}
              placeholder="e.g. Years of Excellence, Projects Completed"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Lucide Icon Name</label>
            <input
              type="text"
              value={statIconName}
              onChange={(e) => setStatIconName(e.target.value)}
              placeholder="e.g. Award, CheckCircle2, Users, Landmark, Building"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onClick={() => setIsStatModalOpen(false)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-[#800000] text-white shadow-sm hover:bg-[#B45309] cursor-pointer">Save Stat</button>
          </div>
        </form>
      </Modal>

      {/* STAT DELETE MODAL */}
      <Modal isOpen={Boolean(deletingStatId)} onClose={() => setDeletingStatId(null)} title="Confirm Delete Stat Counter">
        <div className="space-y-4 text-xs">
          <p className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800">Are you sure you want to delete this statistic counter?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setDeletingStatId(null)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button onClick={handleDeleteStatConfirm} className="px-5 py-2 rounded-xl font-bold bg-rose-600 text-white cursor-pointer">Delete</button>
          </div>
        </div>
      </Modal>

      {/* AMC CARD MODAL */}
      <Modal
        isOpen={isAmcModalOpen}
        onClose={() => setIsAmcModalOpen(false)}
        title={editingAmcId ? 'Edit AMC Package' : 'Add AMC Package'}
      >
        <form onSubmit={handleSaveAmcCard} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Package Title *</label>
            <input
              type="text"
              value={amcCardTitle}
              onChange={(e) => setAmcCardTitle(e.target.value)}
              placeholder="e.g. Preventive Maintenance"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Lucide Icon Name</label>
            <input
              type="text"
              value={amcCardIconName}
              onChange={(e) => setAmcCardIconName(e.target.value)}
              placeholder="e.g. Wrench, Headphones, ShieldCheck, Settings"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Card Background Image URL</label>
            <input
              type="text"
              value={amcCardImage}
              onChange={(e) => setAmcCardImage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Short Description</label>
            <textarea
              rows="2"
              value={amcCardDesc}
              onChange={(e) => setAmcCardDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Deliverables & Features (One per line)</label>
            <textarea
              rows="3"
              value={amcCardFeaturesText}
              onChange={(e) => setAmcCardFeaturesText(e.target.value)}
              placeholder="Lens cleaning & optical checks&#10;Power supply voltage test"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onClick={() => setIsAmcModalOpen(false)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-[#800000] text-white cursor-pointer">Save Package</button>
          </div>
        </form>
      </Modal>

      {/* AMC DELETE MODAL */}
      <Modal isOpen={Boolean(deletingAmcCardId)} onClose={() => setDeletingAmcCardId(null)} title="Confirm Delete AMC Package">
        <div className="space-y-4 text-xs">
          <p className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800">Are you sure you want to delete this AMC package?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setDeletingAmcCardId(null)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button onClick={handleDeleteAmcCardConfirm} className="px-5 py-2 rounded-xl font-bold bg-rose-600 text-white cursor-pointer">Delete</button>
          </div>
        </div>
      </Modal>

      {/* WHY CHOOSE MODAL */}
      <Modal
        isOpen={isWhyChooseModalOpen}
        onClose={() => setIsWhyChooseModalOpen(false)}
        title={editingWhyChooseId ? 'Edit Why Choose Strength Card' : 'Add Strength Card'}
      >
        <form onSubmit={handleSaveWhyChoose} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Card Title *</label>
            <input
              type="text"
              value={whyChooseTitle}
              onChange={(e) => setWhyChooseTitle(e.target.value)}
              placeholder="e.g. 35+ Years Experience"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Lucide Icon Name</label>
            <input
              type="text"
              value={whyChooseIconName}
              onChange={(e) => setWhyChooseIconName(e.target.value)}
              placeholder="e.g. Award, UserCheck, Layers, MapPin, Landmark, Star"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Description</label>
            <textarea
              rows="3"
              value={whyChooseDesc}
              onChange={(e) => setWhyChooseDesc(e.target.value)}
              placeholder="Summary of capability or strength..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onClick={() => setIsWhyChooseModalOpen(false)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-[#800000] text-white cursor-pointer">Save Card</button>
          </div>
        </form>
      </Modal>

      {/* WHY CHOOSE DELETE MODAL */}
      <Modal isOpen={Boolean(deletingWhyChooseId)} onClose={() => setDeletingWhyChooseId(null)} title="Confirm Delete Strength Card">
        <div className="space-y-4 text-xs">
          <p className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800">Are you sure you want to delete this strength card?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setDeletingWhyChooseId(null)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button onClick={handleDeleteWhyChooseConfirm} className="px-5 py-2 rounded-xl font-bold bg-rose-600 text-white cursor-pointer">Delete</button>
          </div>
        </div>
      </Modal>

      {/* BRAND MODAL */}
      <Modal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        title={editingBrandId ? 'Edit Technology Brand Partner' : 'Add Brand Partner'}
      >
        <form onSubmit={handleSaveBrand} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Brand Name *</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. CP PLUS, Hikvision, Cisco"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Category / Tagline *</label>
            <input
              type="text"
              value={brandCategory}
              onChange={(e) => setBrandCategory(e.target.value)}
              placeholder="e.g. Authorized Dealer • Video Security"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Logo Image Path (Optional)</label>
            <input
              type="text"
              value={brandLogo}
              onChange={(e) => setBrandLogo(e.target.value)}
              placeholder="/images/cpplus_logo.png"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onClick={() => setIsBrandModalOpen(false)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-[#800000] text-white cursor-pointer">Save Brand</button>
          </div>
        </form>
      </Modal>

      {/* BRAND DELETE MODAL */}
      <Modal isOpen={Boolean(deletingBrandId)} onClose={() => setDeletingBrandId(null)} title="Confirm Delete Brand Partner">
        <div className="space-y-4 text-xs">
          <p className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800">Are you sure you want to delete this brand partner?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setDeletingBrandId(null)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button onClick={handleDeleteBrandConfirm} className="px-5 py-2 rounded-xl font-bold bg-rose-600 text-white cursor-pointer">Delete</button>
          </div>
        </div>
      </Modal>

      {/* VIEW ABOUT CARD MODAL */}
      <Modal
        isOpen={Boolean(viewingAboutCard)}
        onClose={() => setViewingAboutCard(null)}
        title={`About Card Preview: ${viewingAboutCard?.title || ''}`}
      >
        {viewingAboutCard && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-extrabold text-[#800000] bg-rose-50 px-3 py-1 rounded-lg border border-rose-100 uppercase">
                {viewingAboutCard.slug || viewingAboutCard.id}
              </span>
              <span className="text-xs font-mono text-[#6B6B6B]">
                Order Position: #{viewingAboutCard.order || 1}
              </span>
            </div>

            {viewingAboutCard.tagline && (
              <p className="text-sm font-bold text-[#800000]">
                "{viewingAboutCard.tagline}"
              </p>
            )}

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Full Section Content:</span>
              <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                {viewingAboutCard.content}
              </p>
            </div>

            {viewingAboutCard.highlights && viewingAboutCard.highlights.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-extrabold text-[#800000] uppercase tracking-wider block">Key Highlights & Bullet Points:</span>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5 font-medium">
                  {viewingAboutCard.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={() => setViewingAboutCard(null)}
                className="px-5 py-2.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ADD / EDIT ABOUT CARD MODAL */}
      <Modal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        title={editingAboutId ? 'Edit About Us Card' : 'Add New About Us Card'}
      >
        <form onSubmit={handleSaveAboutCard} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Section Title *</label>
            <input
              type="text"
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
              placeholder="e.g. Corporate Profile, Leadership, Vision & Mission"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Tagline / Subtitle</label>
            <input
              type="text"
              value={aboutTagline}
              onChange={(e) => setAboutTagline(e.target.value)}
              placeholder="e.g. ISO 9001:2015 Certified Systems Integrator..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none text-[#800000] font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Main Detailed Content *</label>
            <textarea
              rows="5"
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
              placeholder="Enter full multi-line details for this About section..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none leading-relaxed"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Highlights & Key Bullet Points (One per line)</label>
            <textarea
              rows="4"
              value={aboutHighlights}
              onChange={(e) => setAboutHighlights(e.target.value)}
              placeholder={"ISO 9001:2015 Certified Quality Management System\n35+ Years of Engineering Excellence\nOffices in Sangli, Kolhapur, and Pune"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onClick={() => setIsAboutModalOpen(false)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-[#800000] text-white shadow-sm hover:bg-[#B45309] cursor-pointer">Save Card</button>
          </div>
        </form>
      </Modal>

      {/* DELETE ABOUT CARD MODAL */}
      <Modal isOpen={Boolean(deletingAboutId)} onClose={() => setDeletingAboutId(null)} title="Confirm Delete About Card">
        <div className="space-y-4 text-xs">
          <p className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 font-semibold">
            Are you sure you want to delete this About Us card? This section will be removed from Firestore and will no longer appear on the About page or Navbar.
          </p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setDeletingAboutId(null)} className="px-4 py-2 rounded-xl font-bold text-[#6B6B6B] cursor-pointer">Cancel</button>
            <button onClick={handleDeleteAboutConfirm} className="px-5 py-2 rounded-xl font-bold bg-rose-600 text-white cursor-pointer">Delete Card</button>
          </div>
        </div>
      </Modal>

      {/* VIEW SOLUTION MODAL */}
      <Modal
        isOpen={Boolean(viewingService)}
        onClose={() => setViewingService(null)}
        title={`Solution Details: ${viewingService?.title || ''}`}
      >
        {viewingService && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-extrabold text-[#800000] bg-rose-50 px-3 py-1 rounded-lg border border-rose-100 uppercase">
                {viewingService.category || 'Engineering'}
              </span>
              <span className="text-xs font-mono text-[#6B6B6B]">
                ID: {viewingService.id}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Overview / Description:</span>
              <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                {viewingService.fullDesc || viewingService.shortDesc || viewingService.description}
              </p>
            </div>

            {viewingService.features && viewingService.features.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-extrabold text-[#800000] uppercase tracking-wider block">Division Features & Capabilities:</span>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5 font-medium">
                  {viewingService.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={() => setViewingService(null)}
                className="px-5 py-2.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>

      </main>
      </div>
    </div>
  );
}
