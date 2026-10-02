import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialServices } from '../data/initialServices';
import { initialProjects } from '../data/initialProjects';
import { initialBlogs } from '../data/initialBlogs';
import { db } from '../firebase/firebaseConfig';
import { 
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc, serverTimestamp
} from 'firebase/firestore';

const DataContext = createContext(null);

export const initialGallery = [
  { id: 'gal-1', title: 'City Surveillance Command Room', category: 'City Surveillance', image: '/images/city_surveillance.jpg' },
  { id: 'gal-2', title: 'High-Density Server Network Rack', category: 'Networking', image: '/images/network_rack.jpg' },
  { id: 'gal-3', title: 'Telecom AV Control Room', category: 'Audio/Video', image: '/images/telecom_av.jpg' },
  { id: 'gal-4', title: '4K IP CCTV Video Feed Center', category: 'CCTV', image: '/images/cctv_hero_bg.jpg' }
];

export const initialBanners = [
  {
    id: 'banner-1',
    imageUrl: '/images/cctv_hero_bg.jpg',
    badgeText: 'ESTABLISHED 1989 • ELECTRONICS & TELECOM',
    title: 'Securing Businesses. Empowering Connectivity. Delivering Excellence Since 1989.',
    btn1Text: 'Get Free Site Survey',
    btn1Action: 'openQuoteModal',
    btn2Text: 'Request Quotation',
    btn2Action: 'openQuoteModal',
    btn3Text: 'Call Now',
    btn3Action: 'tel:+919822012345',
    order: 1,
    isActive: true
  },
  {
    id: 'banner-2',
    imageUrl: '/images/cctv_hero_bg_2.jpg',
    badgeText: 'ESTABLISHED 1989 • ELECTRONICS & TELECOM',
    title: 'Securing Businesses. Empowering Connectivity. Delivering Excellence Since 1989.',
    btn1Text: 'Get Free Site Survey',
    btn1Action: 'openQuoteModal',
    btn2Text: 'Request Quotation',
    btn2Action: 'openQuoteModal',
    btn3Text: 'Call Now',
    btn3Action: 'tel:+919822012345',
    order: 2,
    isActive: true
  },
  {
    id: 'banner-3',
    imageUrl: '/images/cctv_hero_bg_3.jpg',
    badgeText: 'ESTABLISHED 1989 • ELECTRONICS & TELECOM',
    title: 'Securing Businesses. Empowering Connectivity. Delivering Excellence Since 1989.',
    btn1Text: 'Get Free Site Survey',
    btn1Action: 'openQuoteModal',
    btn2Text: 'Request Quotation',
    btn2Action: 'openQuoteModal',
    btn3Text: 'Call Now',
    btn3Action: 'tel:+919822012345',
    order: 3,
    isActive: true
  }
];

export const initialStats = [
  { id: 'stat-1', iconName: 'Award', value: '35+', label: 'Years of Excellence', order: 1 },
  { id: 'stat-2', iconName: 'CheckCircle2', value: '1000+', label: 'Projects Completed', order: 2 },
  { id: 'stat-3', iconName: 'Users', value: '500+', label: 'Happy Clients', order: 3 },
  { id: 'stat-4', iconName: 'Landmark', value: '50+', label: 'Government Projects', order: 4 },
  { id: 'stat-5', iconName: 'Building', value: '100+', label: 'Corporate Customers', order: 5 },
];

export const initialWhoWeAre = {
  id: 'main',
  badgeText: 'Corporate Legacy & Reach',
  title: 'Who We Are',
  subtitle: 'Since 1989, JEPL has been a trusted name in system integration and infrastructure solutions.',
  description: 'We specialize in delivering advanced security, communication and technology solutions to a wide range of industries, ensuring safety, efficiency and long-term value.',
  sectorsTitle: 'Sectors We Empower'
};

export const initialAmcHeader = {
  badgeText: 'Comprehensive SLA & Post-Commissioning',
  title: 'AMC - Annual Maintenance Contract',
  subtitle: 'Keep your systems running at optimal performance with our reliable and comprehensive AMC services.',
  description: 'Ensure continuous operational uptime and peak performance for your security, networking, and telecom infrastructure with Jay Electronics\' annual maintenance services.'
};

export const initialAmcCards = [
  {
    id: "cctv-amc",
    title: "CCTV AMC",
    iconName: "Camera",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    description: "24/7 monitoring & preventive maintenance.",
    features: [
      "Monthly/Quarterly site inspections & optical lens cleaning",
      "Power supply voltage & connector rust/corrosion check",
      "Camera field-of-view alignment & focus tuning",
      "Network cabling health & RJ45/Fiber patch cord test",
    ],
  },
  {
    id: "networking-amc",
    title: "Networking AMC",
    iconName: "Network",
    image: "/images/network_rack.jpg",
    description: "Network health & performance support.",
    features: [
      "2-Hour guaranteed emergency response for critical outages",
      "Dedicated SLA hotline & priority senior engineer dispatch",
      "On-site standby replacement units during repairs",
      "Fiber optic OTDR testing & immediate fusion splicing",
    ],
  },
  {
    id: "fire-alarm-amc",
    title: "Fire Alarm AMC",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Regular inspection & safety checks.",
    features: [
      "Addressable smoke & heat detector calibration tests",
      "Main control panel battery backup & siren operational test",
      "Manual call point (MCP) & emergency alert verification",
      "Compliance safety certificate issuance",
    ],
  },
  {
    id: "access-control-amc",
    title: "Access Control AMC",
    iconName: "Lock",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    description: "System uptime & priority support.",
    features: [
      "Biometric sensor cleaning & database backup optimization",
      "EM lock alignment, drop bolt & door exit button tests",
      "Time attendance software log synchronization & maintenance",
      "Priority spare parts replacement",
    ],
  }
];

export const initialWhyChooseCards = [
  { id: 'wc-1', title: '35+ Years Experience', iconName: 'Trophy', desc: '35+ Years Experience', highlightValue: '35+' },
  { id: 'wc-2', title: 'Authorized Dealerships', iconName: 'Handshake', desc: 'CP PLUS, Matrix, etc.' },
  { id: 'wc-3', title: 'Turnkey Execution', iconName: 'Settings', desc: 'Design to Deployment' },
  { id: 'wc-4', title: 'ISO 9001:2015', iconName: 'ShieldCheck', desc: 'Certified Quality' },
  { id: 'wc-5', title: 'Dedicated Support', iconName: 'Headphones', desc: 'Engineering Team' }
];

export const initialBrands = [
  { id: 'br-1', name: 'CP PLUS', category: 'Aditya Infotech', logoText: 'CP PLUS' },
  { id: 'br-2', name: 'MATRIX', category: 'COMSEC', logoText: 'MATRIX COMSEC' },
  { id: 'br-3', name: 'D-Link', category: 'Networking', logoText: 'D-Link' },
  { id: 'br-4', name: 'TP-Link', category: 'Wireless & SDN', logoText: 'TP-Link' },
  { id: 'br-5', name: 'Panasonic', category: 'Telecom & EPABX', logoText: 'Panasonic' },
  { id: 'br-6', name: 'SONY', category: 'Displays & Cameras', logoText: 'SONY' },
  { id: 'br-7', name: 'SAMSUNG', category: 'Commercial Displays', logoText: 'SAMSUNG' },
  { id: 'br-8', name: 'Honeywell', category: 'Fire & Automation', logoText: 'Honeywell' },
  { id: 'br-9', name: 'BOSCH', category: 'Security & PA Systems', logoText: 'BOSCH' }
];

export const initialFooter = {
  id: 'main',
  establishedText: 'Established 1989',
  aboutText: 'Founded in 1989 by a self-employed Electronics & Telecom Engineer. Premier provider of IP/Analog CCTV, City Surveillance, Structured Networking, EPABX Telecommunication, and Audio/Video Projects.',
  badge1: '35+ Years Excellence',
  badge2: 'Turnkey Execution',
  address: 'Head Office: Electronics & Telecom Complex, Maharashtra, India',
  phone: '+91 98220 12345 / 0233-230000',
  email: 'info@jayelectronics.com',
  copyright: '© JAY ELECTRONICS PVT LTD. All Rights Reserved.',
  tagline: 'Surveillance • Telecom • Networking • A/V'
};

export const initialAboutUsCards = [
  {
    id: 'company-profile',
    title: 'Company Profile',
    slug: 'company-profile',
    tagline: 'ISO 9001:2015 Certified Systems Integrator & Infrastructure Service Provider.',
    content: `Founded in 1989 by a visionary Electronics and Telecommunications Engineer, Jay Electronics Private Ltd has evolved into a premier technology integrator and infrastructure service provider. Over the past three decades, we have established an undisputed leadership position in the telecommunications and electronic security sectors. Driven by an expert sales and service engineering team, we deliver high-performance, turnkey solutions backed by a massive base of satisfied enterprise, government, and residential clients. As a trusted systems integrator, we bridge the gap between global technology and local execution.`,
    highlights: [
      'ISO 9001:2015 Certified Quality Management System',
      '35+ Years of Engineering Excellence (Established 1989)',
      'Authorized Dealers for CP PLUS & Matrix Comsec',
      'Offices in Sangli, Kolhapur, and Pune',
      'Turnkey Execution: Civil Works, Fiber Laying, Equipment Sourcing, Maintenance'
    ],
    order: 1
  },
  {
    id: 'our-story',
    title: 'Our Story',
    slug: 'our-story',
    tagline: '37+ Years of Engineering Innovation & Growth across Maharashtra.',
    content: `Jay Electronics was established in 1989 as a self-employed engineering venture in Sangli. Starting with core telecommunication and PBX installations, the company expanded into structured networking, audio-visual automation, and pioneer city surveillance projects across Sangli, Kolhapur, Pune, and Sambhajinagar. Celebrating 37 years of uninterrupted service, Jay Electronics has grown into one of the most trusted names in system integration across Maharashtra.`,
    highlights: [
      '1989: Founded by a self-employed Electronics & Telecom Engineer.',
      '1995: Expanded into Enterprise EPABX & Telecom Cabling.',
      '2005: Pioneered Structured LAN/WAN & Fiber Optic System Integration.',
      '2015: Executed Major City Surveillance Projects for Municipal Corporations & Police.',
      'Present: Full-spectrum LV & Infrastructure System Integrator with 500+ Satisfied Enterprise & Govt Clients.'
    ],
    order: 2
  },
  {
    id: 'vision-mission',
    title: 'Vision & Mission',
    slug: 'vision-mission',
    tagline: 'Driving Security, Connectivity, and Operational Excellence.',
    content: `Our mission is to enhance security, streamline communication, and improve operational efficiency for our clients across various sectors. Our vision is to maintain undisputed leadership as a systems integrator by bridging global technology innovations with flawless local engineering execution.`,
    highlights: [
      'Mission: Empower businesses and government institutions with high-availability surveillance and telecom infrastructure.',
      'Vision: Be the most reliable single-window engineering partner for LV & Smart City projects.',
      'Quality Policy: Adhere to ISO 9001:2015 benchmarks, delivering zero-defect installations and timely SLA maintenance.'
    ],
    order: 3
  },
  {
    id: 'core-values',
    title: 'Core Values',
    slug: 'core-values',
    tagline: 'Technical Precision, Single-Window Accountability & Customer Commitment.',
    content: `At Jay Electronics, our work is guided by fundamental engineering ethics and a commitment to customer satisfaction. We believe in building long-term alliances with global OEMs and delivering single-window accountability from concept to commissioning.`,
    highlights: [
      'Engineering-Led DNA: Founded and managed by qualified telecom engineers ensuring technical precision.',
      'Strategic Brand Alliances: Authorized access to global technology backbones including CP PLUS, Matrix, Sony, D-Link, and Panasonic.',
      'Turnkey Execution: Single-window accountability spanning consulting, civil works, equipment sourcing, and maintenance.'
    ],
    order: 4
  },
  {
    id: 'why-choose-jepl',
    title: 'Why Choose JEPL?',
    slug: 'why-choose-jepl',
    tagline: 'Engineering Expertise, Authorized Partnerships & Turnkey Execution.',
    content: `Jay Electronics Private Ltd stands out as the preferred system integrator for high-stakes government and enterprise projects. With 35+ years of domain experience, authorized dealerships of global brands, and in-house civil/telecom execution teams, we guarantee single-window success.`,
    highlights: [
      'Engineering-Led Leadership: Managed directly by qualified engineers.',
      'Authorized Dealer Status: Direct warranty, OEM pricing, and technical support from CP PLUS, Matrix, D-Link, etc.',
      'Turnkey Infrastructure Capabilities: Fiber optic laying, tower erection, cable ducting, and civil works under one roof.',
      'Proven Track Record: 7+ City Surveillance Projects, 500+ LAN/EPABX ports executed in major hospitals and court complexes.'
    ],
    order: 5
  },
  {
    id: 'leadership',
    title: 'Leadership',
    slug: 'leadership',
    tagline: 'Experienced Telecommunication & Systems Integration Visionaries.',
    content: `Founded and guided by a qualified Electronics and Telecommunications Engineer with over 37 years of industry standing. Our leadership team combines deep technical knowledge with strategic execution capabilities, driving innovation in City Surveillance, Smart Infrastructure, and Enterprise Telecom.`,
    highlights: [
      'Managing Founder: Electronics & Telecommunications Engineer with 37+ years experience.',
      'Service Engineering Managers: Certified Network & Fiber Optic Engineers.',
      'Sales & Project Heads: Specialized in Municipal Tenders & Enterprise Turnkey Projects.'
    ],
    order: 6
  },
  {
    id: 'our-team',
    title: 'Our Team',
    slug: 'our-team',
    tagline: 'Expert Sales, Certified Field Engineers & 24/7 Technical Support Backup.',
    content: `Our success is driven by a passionate, highly skilled team of sales engineers, network architects, certified fiber technicians, and 24/7 customer service engineers. We maintain an in-house fleet for rapid field dispatch across Maharashtra.`,
    highlights: [
      'Sales & Pre-Sales Engineering: Technical design, site survey, and BOM estimation.',
      'Certified Installation Engineers: Fiber splicing, CCTV rigging, EPABX programming, and AV acoustic tuning.',
      '24/7 AMC Support Desk: Dedicated helpdesk for immediate incident response.'
    ],
    order: 7
  }
];

export const DataProvider = ({ children }) => {
  // Home Banners state with localStorage backup & Firestore sync
  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_banners');
    return saved ? JSON.parse(saved) : initialBanners;
  });

  // Local state management with localStorage persistence for Blogs, Projects, Services, Gallery
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_blogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  // Dedicated state for Firestore 'contact_messages' collection
  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_contact_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Dedicated state for Firestore 'contacts' collection
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_contacts');
    return saved ? JSON.parse(saved) : [
      {
        id: 'contact-1',
        type: 'Contact Inquiry',
        name: 'Rajesh Sharma',
        email: 'rajesh.sharma@infra.org',
        phone: '9822012345',
        subject: 'City Surveillance Tender Inquiry',
        message: 'Requesting project quotation for upcoming municipal IP CCTV project.',
        date: new Date().toISOString().split('T')[0],
        status: 'Unread'
      }
    ];
  });

  // Dedicated state for Firestore 'quote_requests' collection
  const [quoteRequests, setQuoteRequests] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_quote_requests');
    return saved ? JSON.parse(saved) : [];
  });

  // Home Stats state
  const [homeStats, setHomeStats] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_home_stats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  // Home Who We Are state
  const [homeWhoWeAre, setHomeWhoWeAre] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_home_who_we_are');
    return saved ? JSON.parse(saved) : initialWhoWeAre;
  });

  // Home AMC Header state
  const [homeAmcHeader, setHomeAmcHeader] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_home_amc_header');
    return saved ? JSON.parse(saved) : initialAmcHeader;
  });

  // Home AMC Cards state
  const [homeAmcCards, setHomeAmcCards] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_home_amc_cards');
    return saved ? JSON.parse(saved) : initialAmcCards;
  });

  // Home Why Choose Cards state
  const [homeWhyChoose, setHomeWhyChoose] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_home_why_choose');
    return saved ? JSON.parse(saved) : initialWhyChooseCards;
  });

  // Home Brands state
  const [homeBrands, setHomeBrands] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_home_brands');
    return saved ? JSON.parse(saved) : initialBrands;
  });

  // Home Footer state
  const [homeFooter, setHomeFooter] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_home_footer');
    return saved ? JSON.parse(saved) : initialFooter;
  });

  // About Us Cards state
  const [aboutCards, setAboutCards] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_about_cards');
    return saved ? JSON.parse(saved) : initialAboutUsCards;
  });

  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Firestore Real-Time Subscriptions for all site collections
  useEffect(() => {
    let unsubContactMessages, unsubContacts, unsubQuoteRequests, unsubBlogs, unsubProjects, unsubServices, unsubGallery, unsubBanners, unsubStats, unsubWhoWeAre, unsubAmcHeader, unsubAmcCards, unsubWhyChoose, unsubBrands, unsubFooter, unsubAbout;

    try {
      // 1. Subscribe to Firestore 'contact_messages' collection
      unsubContactMessages = onSnapshot(collection(db, 'contact_messages'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => {
            const data = d.data();
            let createdAtIso = new Date().toISOString();
            if (data.createdAt) {
              if (typeof data.createdAt.toDate === 'function') {
                createdAtIso = data.createdAt.toDate().toISOString();
              } else if (typeof data.createdAt === 'string') {
                createdAtIso = data.createdAt;
              } else if (data.createdAt.seconds) {
                createdAtIso = new Date(data.createdAt.seconds * 1000).toISOString();
              }
            }
            return {
              id: d.id,
              type: data.type || 'Contact Message',
              collectionName: 'contact_messages',
              ...data,
              createdAt: createdAtIso,
              date: data.date || createdAtIso.split('T')[0]
            };
          });
          setContactMessages(list);
        } else {
          setContactMessages([]);
        }
        setFirebaseConnected(true);
      }, (err) => console.warn('Firestore contact_messages sync notice:', err));

      // 2. Subscribe to Firestore 'contacts' collection
      unsubContacts = onSnapshot(collection(db, 'contacts'), (snapshot) => {
        if (!snapshot.empty) {
          const contactList = snapshot.docs.map(d => ({ id: d.id, type: 'Contact Inquiry', collectionName: 'contacts', ...d.data() }));
          setContacts(contactList);
        }
        setFirebaseConnected(true);
      }, (err) => console.warn('Firestore contacts sync notice:', err));

      // 3. Subscribe to Firestore 'quote_requests' collection
      unsubQuoteRequests = onSnapshot(collection(db, 'quote_requests'), (snapshot) => {
        if (!snapshot.empty) {
          const quoteList = snapshot.docs.map(d => {
            const data = d.data();
            let createdAtIso = new Date().toISOString();
            if (data.createdAt) {
              if (typeof data.createdAt.toDate === 'function') {
                createdAtIso = data.createdAt.toDate().toISOString();
              } else if (typeof data.createdAt === 'string') {
                createdAtIso = data.createdAt;
              } else if (data.createdAt.seconds) {
                createdAtIso = new Date(data.createdAt.seconds * 1000).toISOString();
              }
            }
            return {
              id: d.id,
              type: 'Quote Request',
              collectionName: 'quote_requests',
              ...data,
              createdAt: createdAtIso,
              date: data.date || createdAtIso.split('T')[0]
            };
          });
          setQuoteRequests(quoteList);
        } else {
          setQuoteRequests([]);
        }
        setFirebaseConnected(true);
      }, (err) => console.warn('Firestore quote_requests sync notice:', err));

      // Helper to auto-seed initial default records to Firestore if a collection is empty
      const seedCollectionIfEmpty = async (colName, initialData) => {
        if (!initialData || !Array.isArray(initialData)) return;
        try {
          for (const item of initialData) {
            if (item && item.id) {
              await setDoc(doc(db, colName, String(item.id)), item);
            }
          }
        } catch (err) {
          console.warn(`Firestore auto-seed notice for ${colName}:`, err);
        }
      };

      // 4. Subscribe to Firestore 'blogs' collection
      unsubBlogs = onSnapshot(collection(db, 'blogs'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setBlogs(list);
        } else {
          setBlogs(initialBlogs);
          seedCollectionIfEmpty('blogs', initialBlogs);
        }
      }, (err) => console.warn('Firestore blogs sync notice:', err));

      // 5. Subscribe to Firestore 'projects' collection
      unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setProjects(list);
        } else {
          setProjects(initialProjects);
          seedCollectionIfEmpty('projects', initialProjects);
        }
      }, (err) => console.warn('Firestore projects sync notice:', err));

      // 6. Subscribe to Firestore 'services' collection
      unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setServices(list);
        } else {
          setServices(initialServices);
          seedCollectionIfEmpty('services', initialServices);
        }
      }, (err) => console.warn('Firestore services sync notice:', err));

      // 7. Subscribe to Firestore 'gallery' collection
      unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setGallery(list);
        } else {
          setGallery(initialGallery);
          seedCollectionIfEmpty('gallery', initialGallery);
        }
      }, (err) => console.warn('Firestore gallery sync notice:', err));

      // 8. Subscribe to Firestore 'home_banners' collection
      unsubBanners = onSnapshot(collection(db, 'home_banners'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          list.sort((a, b) => (a.order || 0) - (b.order || 0));
          setBanners(list);
        } else {
          setBanners(initialBanners);
          seedCollectionIfEmpty('home_banners', initialBanners);
        }
      }, (err) => console.warn('Firestore home_banners sync notice:', err));

      // 9. Subscribe to Firestore 'home_stats'
      unsubStats = onSnapshot(collection(db, 'home_stats'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          list.sort((a, b) => (a.order || 0) - (b.order || 0));
          setHomeStats(list);
        } else {
          setHomeStats(initialStats);
          seedCollectionIfEmpty('home_stats', initialStats);
        }
      }, (err) => console.warn('Firestore home_stats sync notice:', err));

      // 10. Subscribe to Firestore 'home_who_we_are'
      unsubWhoWeAre = onSnapshot(doc(db, 'home_who_we_are', 'main'), (snapshot) => {
        if (snapshot.exists()) {
          setHomeWhoWeAre({ id: 'main', ...snapshot.data() });
        } else {
          setHomeWhoWeAre(initialWhoWeAre);
          setDoc(doc(db, 'home_who_we_are', 'main'), initialWhoWeAre).catch(() => {});
        }
      }, (err) => console.warn('Firestore home_who_we_are sync notice:', err));

      // 11. Subscribe to Firestore 'home_amc_header'
      unsubAmcHeader = onSnapshot(doc(db, 'home_amc', 'header'), (snapshot) => {
        if (snapshot.exists()) {
          setHomeAmcHeader(snapshot.data());
        } else {
          setHomeAmcHeader(initialAmcHeader);
          setDoc(doc(db, 'home_amc', 'header'), initialAmcHeader).catch(() => {});
        }
      }, (err) => console.warn('Firestore home_amc_header sync notice:', err));

      // 12. Subscribe to Firestore 'home_amc_cards'
      unsubAmcCards = onSnapshot(collection(db, 'home_amc_cards'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setHomeAmcCards(list);
        } else {
          setHomeAmcCards(initialAmcCards);
          seedCollectionIfEmpty('home_amc_cards', initialAmcCards);
        }
      }, (err) => console.warn('Firestore home_amc_cards sync notice:', err));

      // 13. Subscribe to Firestore 'home_why_choose'
      unsubWhyChoose = onSnapshot(collection(db, 'home_why_choose'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setHomeWhyChoose(list);
        } else {
          setHomeWhyChoose(initialWhyChooseCards);
          seedCollectionIfEmpty('home_why_choose', initialWhyChooseCards);
        }
      }, (err) => console.warn('Firestore home_why_choose sync notice:', err));

      // 14. Subscribe to Firestore 'home_brands'
      unsubBrands = onSnapshot(collection(db, 'home_brands'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setHomeBrands(list);
        } else {
          setHomeBrands(initialBrands);
          seedCollectionIfEmpty('home_brands', initialBrands);
        }
      }, (err) => console.warn('Firestore home_brands sync notice:', err));

      // 15. Subscribe to Firestore 'home_footer'
      unsubFooter = onSnapshot(doc(db, 'home_footer', 'main'), (snapshot) => {
        if (snapshot.exists()) {
          setHomeFooter({ id: 'main', ...snapshot.data() });
        } else {
          setHomeFooter(initialFooter);
          setDoc(doc(db, 'home_footer', 'main'), initialFooter).catch(() => {});
        }
      }, (err) => console.warn('Firestore home_footer sync notice:', err));

      // 16. Subscribe to Firestore 'about_us' collection
      unsubAbout = onSnapshot(collection(db, 'about_us'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          list.sort((a, b) => (a.order || 0) - (b.order || 0));
          setAboutCards(list);
        } else {
          setAboutCards(initialAboutUsCards);
          seedCollectionIfEmpty('about_us', initialAboutUsCards);
        }
      }, (err) => console.warn('Firestore about_us sync notice:', err));

    } catch (err) {
      console.warn('Firestore connection initialized with local fallback:', err);
    }

    return () => {
      if (unsubContactMessages) unsubContactMessages();
      if (unsubContacts) unsubContacts();
      if (unsubQuoteRequests) unsubQuoteRequests();
      if (unsubBlogs) unsubBlogs();
      if (unsubProjects) unsubProjects();
      if (unsubServices) unsubServices();
      if (unsubGallery) unsubGallery();
      if (unsubBanners) unsubBanners();
      if (unsubStats) unsubStats();
      if (unsubWhoWeAre) unsubWhoWeAre();
      if (unsubAmcHeader) unsubAmcHeader();
      if (unsubAmcCards) unsubAmcCards();
      if (unsubWhyChoose) unsubWhyChoose();
      if (unsubBrands) unsubBrands();
      if (unsubFooter) unsubFooter();
      if (unsubAbout) unsubAbout();
    };
  }, []);

  // Sync to localStorage as backup
  useEffect(() => {
    localStorage.setItem('jay_electronics_about_cards', JSON.stringify(aboutCards));
  }, [aboutCards]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_home_stats', JSON.stringify(homeStats));
  }, [homeStats]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_home_who_we_are', JSON.stringify(homeWhoWeAre));
  }, [homeWhoWeAre]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_home_amc_header', JSON.stringify(homeAmcHeader));
  }, [homeAmcHeader]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_home_amc_cards', JSON.stringify(homeAmcCards));
  }, [homeAmcCards]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_home_why_choose', JSON.stringify(homeWhyChoose));
  }, [homeWhyChoose]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_home_brands', JSON.stringify(homeBrands));
  }, [homeBrands]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_home_footer', JSON.stringify(homeFooter));
  }, [homeFooter]);

  // Sync to localStorage as backup
  useEffect(() => {
    localStorage.setItem('jay_electronics_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_contact_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('jay_electronics_quote_requests', JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  // Combined messages array for backward compatibility
  const messages = [
    ...contactMessages.map(c => ({
      ...c,
      type: c.type || 'Contact Message',
      collectionName: 'contact_messages',
      date: c.date || (c.createdAt ? new Date(c.createdAt).toISOString().split('T')[0] : 'N/A')
    })),
    ...contacts.map(c => ({ ...c, type: c.type || 'Contact Inquiry', collectionName: 'contacts' })),
    ...quoteRequests.map(q => ({ ...q, type: q.type || 'Quote Request', collectionName: 'quoteRequests' }))
  ].sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (a.id ? String(a.id) : 0);
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (b.id ? String(b.id) : 0);
    return timeB > timeA ? 1 : -1;
  });

  // ==========================================
  // BLOG CRUD (Firestore & Local State)
  // ==========================================
  const addBlog = async (blogData) => {
    const newPost = {
      id: 'blog-' + Date.now(),
      author: 'JAY ELECTRONICS Admin',
      authorRole: 'Corporate Communications',
      avatar: '/images/cctv_hero_bg.jpg',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      likes: 0,
      comments: [],
      status: 'Published',
      ...blogData
    };
    setBlogs(prev => [newPost, ...prev]);
    try {
      await setDoc(doc(db, 'blogs', newPost.id), newPost);
    } catch (err) {
      console.warn('Firestore blog write notice:', err);
    }
    return newPost;
  };

  const updateBlog = async (id, updatedData) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
    const target = blogs.find(b => b.id === id);
    if (target) {
      try {
        await setDoc(doc(db, 'blogs', id), { ...target, ...updatedData });
      } catch (err) {
        console.warn('Firestore blog update notice:', err);
      }
    }
  };

  const deleteBlog = async (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    try {
      await deleteDoc(doc(db, 'blogs', id));
    } catch (err) {
      console.warn('Firestore blog delete notice:', err);
    }
  };

  const toggleLike = (id) => {
    const targetBlog = blogs.find(b => b.id === id);
    if (!targetBlog) return;
    const isLiked = targetBlog.userLiked;
    const newLikes = isLiked ? Math.max(0, targetBlog.likes - 1) : (targetBlog.likes + 1);
    const updatePayload = { userLiked: !isLiked, likes: newLikes };
    updateBlog(id, updatePayload);
  };

  const addComment = (blogId, commentText) => {
    if (!commentText.trim()) return;
    const targetBlog = blogs.find(b => b.id === blogId);
    if (!targetBlog) return;
    const newComment = { id: 'c-' + Date.now(), user: 'Visitor', text: commentText };
    const updatedComments = [...(targetBlog.comments || []), newComment];
    updateBlog(blogId, { comments: updatedComments });
  };

  // ==========================================
  // PROJECT CRUD (Firestore & Local State)
  // ==========================================
  const addProject = async (projectData) => {
    const newProject = {
      id: 'proj-' + Date.now(),
      image: '/images/city_surveillance.jpg',
      stats: 'Verified Execution Record',
      ...projectData
    };
    setProjects(prev => [newProject, ...prev]);
    try {
      await setDoc(doc(db, 'projects', newProject.id), newProject);
    } catch (err) {
      console.warn('Firestore project write notice:', err);
    }
    return newProject;
  };

  const updateProject = async (id, updatedData) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    const target = projects.find(p => p.id === id);
    if (target) {
      try {
        await setDoc(doc(db, 'projects', id), { ...target, ...updatedData });
      } catch (err) {
        console.warn('Firestore project update notice:', err);
      }
    }
  };

  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.warn('Firestore project delete notice:', err);
    }
  };

  // ==========================================
  // SERVICE / SOLUTION CRUD (Firestore & Local State)
  // ==========================================
  const addService = async (serviceData) => {
    const newService = {
      id: 'serv-' + Date.now(),
      icon: 'Shield',
      features: ['Turnkey Design', '24/7 Technical Support'],
      ...serviceData
    };
    setServices(prev => [newService, ...prev]);
    try {
      await setDoc(doc(db, 'services', newService.id), newService);
    } catch (err) {
      console.warn('Firestore service write notice:', err);
    }
    return newService;
  };

  const updateService = async (id, updatedData) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    const target = services.find(s => s.id === id);
    if (target) {
      try {
        await setDoc(doc(db, 'services', id), { ...target, ...updatedData });
      } catch (err) {
        console.warn('Firestore service update notice:', err);
      }
    }
  };

  const deleteService = async (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (err) {
      console.warn('Firestore service delete notice:', err);
    }
  };

  // ==========================================
  // GALLERY CRUD (Firestore & Local State)
  // ==========================================
  const addGalleryItem = async (itemData) => {
    const newItem = {
      id: 'gal-' + Date.now(),
      image: '/images/cctv_hero_bg.jpg',
      category: 'General',
      ...itemData
    };
    setGallery(prev => [newItem, ...prev]);
    try {
      await setDoc(doc(db, 'gallery', newItem.id), newItem);
    } catch (err) {
      console.warn('Firestore gallery write notice:', err);
    }
    return newItem;
  };

  const updateGalleryItem = async (id, updatedData) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updatedData } : g));
    const target = gallery.find(g => g.id === id);
    if (target) {
      try {
        await setDoc(doc(db, 'gallery', id), { ...target, ...updatedData });
      } catch (err) {
        console.warn('Firestore gallery update notice:', err);
      }
    }
  };

  const deleteGalleryItem = async (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (err) {
      console.warn('Firestore gallery delete notice:', err);
    }
  };

  // ==========================================
  // FIRESTORE 'contacts' COLLECTION HANDLERS
  // ==========================================
  const addContactInquiry = async (contactData) => {
    const newContact = {
      id: 'contact-' + Date.now(),
      type: 'Contact Inquiry',
      name: contactData.name || 'Anonymous Visitor',
      email: contactData.email || 'N/A',
      phone: contactData.phone || 'N/A',
      subject: contactData.subject || 'General Inquiry',
      message: contactData.message || 'No message text provided.',
      date: new Date().toISOString().split('T')[0],
      status: 'Unread'
    };

    setContacts(prev => [newContact, ...prev]);

    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        type: newContact.type,
        name: newContact.name,
        email: newContact.email,
        phone: newContact.phone,
        subject: newContact.subject,
        message: newContact.message,
        date: newContact.date,
        status: newContact.status
      });
      setContacts(prev => prev.map(c => c.id === newContact.id ? { ...c, id: docRef.id } : c));
    } catch (err) {
      console.warn('Firestore contacts collection write warning, saved locally:', err);
    }
    return true;
  };

  const updateContactStatus = async (id, status) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    try {
      await updateDoc(doc(db, 'contacts', id), { status });
    } catch (err) {}
  };

  const deleteContact = async (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    try {
      await deleteDoc(doc(db, 'contacts', id));
    } catch (err) {}
  };

  // ==========================================
  // FIRESTORE 'quote_requests' COLLECTION HANDLERS
  // ==========================================
  // ==========================================
  // FIRESTORE 'quote_requests' COLLECTION HANDLERS
  // ==========================================
  const addQuoteRequest = async (quoteData) => {
    const firestorePayload = {
      name: quoteData.name ? quoteData.name.trim() : (quoteData.contactName ? quoteData.contactName.trim() : ''),
      email: quoteData.email ? quoteData.email.trim() : (quoteData.emailAddress ? quoteData.emailAddress.trim() : ''),
      phone: quoteData.phone ? quoteData.phone.trim() : (quoteData.mobileNumber ? quoteData.mobileNumber.trim() : ''),
      note: quoteData.note ? quoteData.note.trim() : (quoteData.message ? quoteData.message.trim() : ''),
      message: quoteData.message ? quoteData.message.trim() : (quoteData.note ? quoteData.note.trim() : 'No additional note provided.'),
      subject: quoteData.subject || 'Quotation Request',
      service: quoteData.service || 'Get a Quote Request',
      type: 'Quote Request',
      createdAt: serverTimestamp(),
      status: quoteData.status || 'new'
    };

    const nowIso = new Date().toISOString();
    const localQuote = {
      id: 'quote-' + Date.now(),
      name: firestorePayload.name,
      email: firestorePayload.email,
      phone: firestorePayload.phone,
      note: firestorePayload.note,
      message: firestorePayload.message,
      subject: firestorePayload.subject,
      service: firestorePayload.service,
      type: firestorePayload.type,
      status: firestorePayload.status,
      createdAt: nowIso,
      collectionName: 'quote_requests',
      date: nowIso.split('T')[0]
    };

    try {
      const docRef = await addDoc(collection(db, 'quote_requests'), firestorePayload);
      localQuote.id = docRef.id;
      setQuoteRequests(prev => [localQuote, ...prev.filter(q => q.id !== docRef.id)]);
      return docRef;
    } catch (err) {
      console.warn('Firestore Cloud write permission notice (saved to local state):', err?.message || err);
      setQuoteRequests(prev => [localQuote, ...prev.filter(q => q.id !== localQuote.id)]);
      return localQuote;
    }
  };

  const updateQuoteStatus = async (id, status) => {
    setQuoteRequests(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    try {
      await updateDoc(doc(db, 'quote_requests', id), { status });
    } catch (err) {
      console.error('Error updating status in quote_requests:', err);
    }
  };

  const deleteQuoteRequest = async (id) => {
    setQuoteRequests(prev => prev.filter(q => q.id !== id));
    try {
      await deleteDoc(doc(db, 'quote_requests', id));
    } catch (err) {
      console.error('Error deleting document from quote_requests:', err);
    }
  };

  // Handler for contact_messages collection (saves to 'contact_messages' collection in Firestore)
  const addContactMessage = async (msgData) => {
    if (msgData.type === 'Quote Request') {
      return addQuoteRequest(msgData);
    }

    const firestorePayload = {
      name: msgData.name ? msgData.name.trim() : '',
      email: msgData.email ? msgData.email.trim() : '',
      phone: msgData.phone ? msgData.phone.trim() : '',
      subject: msgData.subject || 'General Inquiry',
      message: msgData.message ? msgData.message.trim() : '',
      createdAt: serverTimestamp(),
      status: 'Unread',
      type: 'Contact Message'
    };

    const nowIso = new Date().toISOString();
    const localMsg = {
      id: 'contact-' + Date.now(),
      name: firestorePayload.name,
      email: firestorePayload.email,
      phone: firestorePayload.phone,
      subject: firestorePayload.subject,
      message: firestorePayload.message,
      createdAt: nowIso,
      status: firestorePayload.status,
      type: firestorePayload.type,
      collectionName: 'contact_messages',
      date: nowIso.split('T')[0]
    };

    try {
      const docRef = await addDoc(collection(db, 'contact_messages'), firestorePayload);
      localMsg.id = docRef.id;
      setContactMessages(prev => [localMsg, ...prev.filter(m => m.id !== docRef.id)]);
      return docRef;
    } catch (err) {
      console.warn('Firestore Cloud write permission notice (saved to local state):', err?.message || err);
      setContactMessages(prev => [localMsg, ...prev.filter(m => m.id !== localMsg.id)]);
      return localMsg;
    }
  };

  const updateMessageStatus = async (id, status) => {
    if (contactMessages.some(c => c.id === id)) {
      setContactMessages(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      try {
        await updateDoc(doc(db, 'contact_messages', id), { status });
      } catch (err) {
        console.error('Error updating status in contact_messages:', err);
      }
      return;
    }
    if (contacts.some(c => c.id === id)) {
      return updateContactStatus(id, status);
    }
    if (quoteRequests.some(q => q.id === id)) {
      return updateQuoteStatus(id, status);
    }
  };

  const deleteMessage = async (id) => {
    if (contactMessages.some(c => c.id === id)) {
      setContactMessages(prev => prev.filter(c => c.id !== id));
      try {
        await deleteDoc(doc(db, 'contact_messages', id));
      } catch (err) {
        console.error('Error deleting document from contact_messages:', err);
      }
      return;
    }
    if (contacts.some(c => c.id === id)) {
      return deleteContact(id);
    }
    if (quoteRequests.some(q => q.id === id)) {
      return deleteQuoteRequest(id);
    }
  };

  // ==========================================
  // HOME BANNER CRUD (Firestore & Local State)
  // ==========================================
  const addBanner = async (bannerData) => {
    const calculatedOrder = (banners && banners.length > 0)
      ? Math.max(...banners.map(b => Number(b.order) || 0)) + 1
      : 1;

    const newBanner = {
      id: 'banner-' + Date.now(),
      imageUrl: bannerData.imageUrl || '/images/cctv_hero_bg.jpg',
      badgeText: bannerData.badgeText || 'ESTABLISHED 1989 • ELECTRONICS & TELECOM',
      title: bannerData.title || '',
      btn1Text: bannerData.btn1Text || 'Get Free Site Survey',
      btn1Action: bannerData.btn1Action || 'openQuoteModal',
      btn2Text: bannerData.btn2Text || 'Request Quotation',
      btn2Action: bannerData.btn2Action || 'openQuoteModal',
      btn3Text: bannerData.btn3Text || 'Call Now',
      btn3Action: bannerData.btn3Action || 'tel:+919822012345',
      order: bannerData.order !== undefined && bannerData.order !== '' ? Number(bannerData.order) : calculatedOrder,
      isActive: bannerData.isActive !== undefined ? Boolean(bannerData.isActive) : true,
      createdAt: new Date().toISOString()
    };

    setBanners(prev => {
      const exists = prev.some(b => b.id === newBanner.id);
      if (exists) return prev;
      return [...prev, newBanner].sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    try {
      await setDoc(doc(db, 'home_banners', newBanner.id), newBanner);
    } catch (err) {
      console.warn('Firestore addBanner fallback to local state:', err);
    }
  };

  const updateBanner = async (id, updatedData) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b).sort((a, b) => (a.order || 0) - (b.order || 0)));

    try {
      await updateDoc(doc(db, 'home_banners', id), updatedData);
    } catch (err) {
      console.warn('Firestore updateBanner fallback to local state:', err);
    }
  };

  const deleteBanner = async (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));

    try {
      await deleteDoc(doc(db, 'home_banners', id));
    } catch (err) {
      console.warn('Firestore deleteBanner fallback to local state:', err);
    }
  };

  const toggleBannerStatus = async (id) => {
    const target = banners.find(b => b.id === id);
    if (!target) return;
    const newStatus = !target.isActive;
    await updateBanner(id, { isActive: newStatus });
  };

  const reorderBanner = async (id, direction) => {
    const sorted = [...banners].sort((a, b) => (a.order || 0) - (b.order || 0));
    const index = sorted.findIndex(b => b.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const currentBanner = { ...sorted[index] };
    const otherBanner = { ...sorted[targetIndex] };
    const tempOrder = currentBanner.order;
    currentBanner.order = otherBanner.order;
    otherBanner.order = tempOrder;

    sorted[index] = currentBanner;
    sorted[targetIndex] = otherBanner;

    const finalSorted = sorted.sort((a, b) => (a.order || 0) - (b.order || 0));
    setBanners(finalSorted);

    try {
      await updateDoc(doc(db, 'home_banners', currentBanner.id), { order: currentBanner.order });
      await updateDoc(doc(db, 'home_banners', otherBanner.id), { order: otherBanner.order });
    } catch (err) {
      console.warn('Firestore reorderBanner fallback to local state:', err);
    }
  };

  // STATS CRUD
  const updateHomeStat = async (id, updatedData) => {
    setHomeStats(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    try {
      await setDoc(doc(db, 'home_stats', id), updatedData, { merge: true });
    } catch (err) {
      console.warn('Firestore updateHomeStat fallback:', err);
    }
  };

  const addHomeStat = async (statData) => {
    const newStat = { id: 'stat-' + Date.now(), order: homeStats.length + 1, ...statData };
    setHomeStats(prev => [...prev, newStat]);
    try {
      await setDoc(doc(db, 'home_stats', newStat.id), newStat);
    } catch (err) {
      console.warn('Firestore addHomeStat fallback:', err);
    }
  };

  const deleteHomeStat = async (id) => {
    setHomeStats(prev => prev.filter(s => s.id !== id));
    try {
      await deleteDoc(doc(db, 'home_stats', id));
    } catch (err) {
      console.warn('Firestore deleteHomeStat fallback:', err);
    }
  };

  // WHO WE ARE UPDATE
  const updateHomeWhoWeAre = async (updatedData) => {
    setHomeWhoWeAre(prev => ({ ...prev, ...updatedData }));
    try {
      await setDoc(doc(db, 'home_who_we_are', 'main'), updatedData, { merge: true });
    } catch (err) {
      console.warn('Firestore updateHomeWhoWeAre fallback:', err);
    }
  };

  // AMC UPDATE & CRUD
  const updateHomeAmcHeader = async (updatedData) => {
    setHomeAmcHeader(prev => ({ ...prev, ...updatedData }));
    try {
      await setDoc(doc(db, 'home_amc', 'header'), updatedData, { merge: true });
    } catch (err) {
      console.warn('Firestore updateHomeAmcHeader fallback:', err);
    }
  };

  const updateHomeAmcCard = async (id, updatedData) => {
    setHomeAmcCards(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    try {
      await setDoc(doc(db, 'home_amc_cards', id), updatedData, { merge: true });
    } catch (err) {
      console.warn('Firestore updateHomeAmcCard fallback:', err);
    }
  };

  const addHomeAmcCard = async (cardData) => {
    const newCard = { id: 'amc-' + Date.now(), features: [], ...cardData };
    setHomeAmcCards(prev => [...prev, newCard]);
    try {
      await setDoc(doc(db, 'home_amc_cards', newCard.id), newCard);
    } catch (err) {
      console.warn('Firestore addHomeAmcCard fallback:', err);
    }
  };

  const deleteHomeAmcCard = async (id) => {
    setHomeAmcCards(prev => prev.filter(c => c.id !== id));
    try {
      await deleteDoc(doc(db, 'home_amc_cards', id));
    } catch (err) {
      console.warn('Firestore deleteHomeAmcCard fallback:', err);
    }
  };

  // WHY CHOOSE CRUD
  const updateHomeWhyChooseCard = async (id, updatedData) => {
    setHomeWhyChoose(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    try {
      await setDoc(doc(db, 'home_why_choose', id), updatedData, { merge: true });
    } catch (err) {
      console.warn('Firestore updateHomeWhyChooseCard fallback:', err);
    }
  };

  const addHomeWhyChooseCard = async (cardData) => {
    const newCard = { id: 'wc-' + Date.now(), ...cardData };
    setHomeWhyChoose(prev => [...prev, newCard]);
    try {
      await setDoc(doc(db, 'home_why_choose', newCard.id), newCard);
    } catch (err) {
      console.warn('Firestore addHomeWhyChooseCard fallback:', err);
    }
  };

  const deleteHomeWhyChooseCard = async (id) => {
    setHomeWhyChoose(prev => prev.filter(c => c.id !== id));
    try {
      await deleteDoc(doc(db, 'home_why_choose', id));
    } catch (err) {
      console.warn('Firestore deleteHomeWhyChooseCard fallback:', err);
    }
  };

  // BRANDS CRUD
  const updateHomeBrand = async (id, updatedData) => {
    setHomeBrands(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
    try {
      await setDoc(doc(db, 'home_brands', id), updatedData, { merge: true });
    } catch (err) {
      console.warn('Firestore updateHomeBrand fallback:', err);
    }
  };

  const addHomeBrand = async (brandData) => {
    const newBrand = { id: 'br-' + Date.now(), ...brandData };
    setHomeBrands(prev => [...prev, newBrand]);
    try {
      await setDoc(doc(db, 'home_brands', newBrand.id), newBrand);
    } catch (err) {
      console.warn('Firestore addHomeBrand fallback:', err);
    }
  };

  const deleteHomeBrand = async (id) => {
    setHomeBrands(prev => prev.filter(b => b.id !== id));
    try {
      await deleteDoc(doc(db, 'home_brands', id));
    } catch (err) {
      console.warn('Firestore deleteHomeBrand fallback:', err);
    }
  };

  // FOOTER UPDATE
  const updateHomeFooter = async (updatedData) => {
    setHomeFooter(prev => ({ ...prev, ...updatedData }));
    try {
      await setDoc(doc(db, 'home_footer', 'main'), updatedData, { merge: true });
    } catch (err) {
      console.warn('Firestore updateHomeFooter fallback:', err);
    }
  };

  // ==========================================
  // ABOUT US CARDS CRUD (Firestore & Local State)
  // ==========================================
  const addAboutCard = async (cardData) => {
    const calculatedOrder = (aboutCards && aboutCards.length > 0)
      ? Math.max(...aboutCards.map(c => Number(c.order) || 0)) + 1
      : 1;

    const slug = cardData.slug || (cardData.title ? cardData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'section-' + Date.now());

    let highlightsArray = [];
    if (Array.isArray(cardData.highlights)) {
      highlightsArray = cardData.highlights;
    } else if (typeof cardData.highlights === 'string') {
      highlightsArray = cardData.highlights.split('\n').map(h => h.trim()).filter(Boolean);
    }

    const newCard = {
      id: cardData.id || ('about-' + Date.now()),
      title: cardData.title || '',
      slug,
      tagline: cardData.tagline || '',
      content: cardData.content || '',
      highlights: highlightsArray,
      order: cardData.order !== undefined && cardData.order !== '' ? Number(cardData.order) : calculatedOrder,
      createdAt: new Date().toISOString()
    };

    setAboutCards(prev => {
      const exists = prev.some(c => c.id === newCard.id);
      if (exists) return prev.map(c => c.id === newCard.id ? newCard : c);
      return [...prev, newCard].sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    try {
      await setDoc(doc(db, 'about_us', newCard.id), newCard);
    } catch (err) {
      console.warn('Firestore addAboutCard fallback to local state:', err);
    }

    return newCard;
  };

  const updateAboutCard = async (id, updatedData) => {
    let processHighlights = updatedData.highlights;
    if (typeof updatedData.highlights === 'string') {
      processHighlights = updatedData.highlights.split('\n').map(h => h.trim()).filter(Boolean);
    }

    const cleanedData = {
      ...updatedData,
      ...(processHighlights !== undefined ? { highlights: processHighlights } : {})
    };

    setAboutCards(prev => prev.map(c => c.id === id ? { ...c, ...cleanedData } : c).sort((a, b) => (a.order || 0) - (b.order || 0)));

    const target = aboutCards.find(c => c.id === id);
    if (target) {
      try {
        await setDoc(doc(db, 'about_us', id), { ...target, ...cleanedData }, { merge: true });
      } catch (err) {
        console.warn('Firestore updateAboutCard fallback to local state:', err);
      }
    }
  };

  const deleteAboutCard = async (id) => {
    setAboutCards(prev => prev.filter(c => c.id !== id));
    try {
      await deleteDoc(doc(db, 'about_us', id));
    } catch (err) {
      console.warn('Firestore deleteAboutCard fallback to local state:', err);
    }
  };

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  return (
    <DataContext.Provider value={{
      banners,
      homeStats,
      homeWhoWeAre,
      homeAmcHeader,
      homeAmcCards,
      homeWhyChoose,
      homeBrands,
      homeFooter,
      aboutCards,
      addAboutCard,
      updateAboutCard,
      deleteAboutCard,
      blogs,
      projects,
      services,
      gallery,
      contactMessages,
      contacts,
      quoteRequests,
      messages,
      firebaseConnected,
      isQuoteModalOpen,
      openQuoteModal,
      closeQuoteModal,
      setIsQuoteModalOpen,
      addBanner,
      updateBanner,
      deleteBanner,
      toggleBannerStatus,
      reorderBanner,
      updateHomeStat,
      addHomeStat,
      deleteHomeStat,
      updateHomeWhoWeAre,
      updateHomeAmcHeader,
      updateHomeAmcCard,
      addHomeAmcCard,
      deleteHomeAmcCard,
      updateHomeWhyChooseCard,
      addHomeWhyChooseCard,
      deleteHomeWhyChooseCard,
      updateHomeBrand,
      addHomeBrand,
      deleteHomeBrand,
      updateHomeFooter,
      addBlog,
      updateBlog,
      deleteBlog,
      toggleLike,
      addComment,
      addProject,
      updateProject,
      deleteProject,
      addService,
      updateService,
      deleteService,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      addContactInquiry,
      updateContactStatus,
      deleteContact,
      addQuoteRequest,
      updateQuoteStatus,
      deleteQuoteRequest,
      addContactMessage,
      updateMessageStatus,
      deleteMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Safe useContext hook wrapper that never returns undefined
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    return {
      banners: initialBanners,
      homeStats: initialStats,
      homeWhoWeAre: initialWhoWeAre,
      homeAmcHeader: initialAmcHeader,
      homeAmcCards: initialAmcCards,
      homeWhyChoose: initialWhyChooseCards,
      homeBrands: initialBrands,
      homeFooter: initialFooter,
      aboutCards: initialAboutUsCards,
      addAboutCard: async () => {},
      updateAboutCard: async () => {},
      deleteAboutCard: async () => {},
      blogs: initialBlogs,
      projects: initialProjects,
      services: initialServices,
      gallery: initialGallery,
      contactMessages: [],
      contacts: [],
      quoteRequests: [],
      messages: [],
      firebaseConnected: false,
      isQuoteModalOpen: false,
      openQuoteModal: () => {},
      closeQuoteModal: () => {},
      setIsQuoteModalOpen: () => {},
      addBanner: async () => {},
      updateBanner: async () => {},
      deleteBanner: async () => {},
      toggleBannerStatus: async () => {},
      reorderBanner: async () => {},
      updateHomeStat: async () => {},
      addHomeStat: async () => {},
      deleteHomeStat: async () => {},
      updateHomeWhoWeAre: async () => {},
      updateHomeAmcHeader: async () => {},
      updateHomeAmcCard: async () => {},
      addHomeAmcCard: async () => {},
      deleteHomeAmcCard: async () => {},
      updateHomeWhyChooseCard: async () => {},
      addHomeWhyChooseCard: async () => {},
      deleteHomeWhyChooseCard: async () => {},
      updateHomeBrand: async () => {},
      addHomeBrand: async () => {},
      deleteHomeBrand: async () => {},
      updateHomeFooter: async () => {},
      addBlog: () => {},
      updateBlog: () => {},
      deleteBlog: () => {},
      toggleLike: () => {},
      addComment: () => {},
      addProject: () => {},
      updateProject: () => {},
      deleteProject: () => {},
      addService: () => {},
      updateService: () => {},
      deleteService: () => {},
      addGalleryItem: () => {},
      updateGalleryItem: () => {},
      deleteGalleryItem: () => {},
      addContactInquiry: async () => {},
      updateContactStatus: async () => {},
      deleteContact: async () => {},
      addQuoteRequest: async () => {},
      updateQuoteStatus: async () => {},
      deleteQuoteRequest: async () => {},
      addContactMessage: async () => {},
      updateMessageStatus: async () => {},
      deleteMessage: async () => {}
    };
  }
  return context;
};
