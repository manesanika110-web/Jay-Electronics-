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

export const DataProvider = ({ children }) => {
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

  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Firestore Real-Time Subscriptions for all site collections
  useEffect(() => {
    let unsubContactMessages, unsubContacts, unsubQuoteRequests, unsubBlogs, unsubProjects, unsubServices, unsubGallery;

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

      // 4. Subscribe to Firestore 'blogs' collection
      unsubBlogs = onSnapshot(collection(db, 'blogs'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setBlogs(list);
        }
      }, (err) => console.warn('Firestore blogs sync notice:', err));

      // 5. Subscribe to Firestore 'projects' collection
      unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setProjects(list);
        }
      }, (err) => console.warn('Firestore projects sync notice:', err));

      // 6. Subscribe to Firestore 'services' collection
      unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setServices(list);
        }
      }, (err) => console.warn('Firestore services sync notice:', err));

      // 7. Subscribe to Firestore 'gallery' collection
      unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setGallery(list);
        }
      }, (err) => console.warn('Firestore gallery sync notice:', err));

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
    };
  }, []);

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

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  return (
    <DataContext.Provider value={{
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
