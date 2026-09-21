import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialServices } from '../data/initialServices';
import { initialProjects } from '../data/initialProjects';
import { initialBlogs } from '../data/initialBlogs';
import { db } from '../firebase/firebaseConfig';
import { 
  collection, doc, onSnapshot, setDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore';

const DataContext = createContext();

export const initialGallery = [
  { id: 'gal-1', title: 'City Surveillance Command Room', category: 'City Surveillance', image: '/images/city_surveillance.jpg' },
  { id: 'gal-2', title: 'High-Density Server Network Rack', category: 'Networking', image: '/images/network_rack.jpg' },
  { id: 'gal-3', title: 'Telecom AV Control Room', category: 'Audio/Video', image: '/images/telecom_av.jpg' },
  { id: 'gal-4', title: '4K IP CCTV Video Feed Center', category: 'CCTV', image: '/images/cctv_hero_bg.jpg' }
];

export const DataProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [projects, setProjects] = useState(initialProjects);
  const [services, setServices] = useState(initialServices);
  const [gallery, setGallery] = useState(initialGallery);
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@infra.org',
      phone: '9822012345',
      subject: 'City Surveillance Tender Inquiry',
      message: 'Requesting project quotation for upcoming municipal IP CCTV project.',
      date: '2026-09-14',
      status: 'Unread'
    }
  ]);

  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Firestore Real-Time Subscriptions
  useEffect(() => {
    let unsubBlogs, unsubProjects, unsubServices, unsubMessages, unsubGallery;

    try {
      // 1. Subscribe to Blogs
      unsubBlogs = onSnapshot(collection(db, 'blogs'), (snapshot) => {
        if (!snapshot.empty) {
          const blogList = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setBlogs(blogList);
        } else {
          // Seed blogs if Firestore collection is empty
          initialBlogs.forEach(b => {
            const docId = b.id || ('blog-' + Date.now());
            setDoc(doc(db, 'blogs', docId), b).catch(() => {});
          });
        }
        setFirebaseConnected(true);
      }, (err) => {
        console.warn('Firestore blogs sync warning, using local fallback:', err);
      });

      // 2. Subscribe to Projects
      unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
        if (!snapshot.empty) {
          const projList = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setProjects(projList);
        } else {
          // Seed projects if empty
          initialProjects.forEach(p => {
            const docId = p.id || ('proj-' + Date.now());
            setDoc(doc(db, 'projects', docId), p).catch(() => {});
          });
        }
        setFirebaseConnected(true);
      }, (err) => {
        console.warn('Firestore projects sync warning, using local fallback:', err);
      });

      // 3. Subscribe to Services
      unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
        if (!snapshot.empty) {
          const servList = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setServices(servList);
        } else {
          // Seed services if empty
          initialServices.forEach(s => {
            const docId = s.id || ('serv-' + Date.now());
            setDoc(doc(db, 'services', docId), s).catch(() => {});
          });
        }
        setFirebaseConnected(true);
      }, (err) => {
        console.warn('Firestore services sync warning, using local fallback:', err);
      });

      // 4. Subscribe to Messages
      unsubMessages = onSnapshot(collection(db, 'messages'), (snapshot) => {
        if (!snapshot.empty) {
          const msgList = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setMessages(msgList);
        }
        setFirebaseConnected(true);
      }, (err) => {
        console.warn('Firestore messages sync warning, using local fallback:', err);
      });

      // 5. Subscribe to Gallery
      unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
        if (!snapshot.empty) {
          const galList = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setGallery(galList);
        } else {
          initialGallery.forEach(g => {
            const docId = g.id || ('gal-' + Date.now());
            setDoc(doc(db, 'gallery', docId), g).catch(() => {});
          });
        }
        setFirebaseConnected(true);
      }, (err) => {
        console.warn('Firestore gallery sync warning, using local fallback:', err);
      });

    } catch (err) {
      console.warn('Firestore connection initialized with local fallback:', err);
    }

    return () => {
      if (unsubBlogs) unsubBlogs();
      if (unsubProjects) unsubProjects();
      if (unsubServices) unsubServices();
      if (unsubMessages) unsubMessages();
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
    localStorage.setItem('jay_electronics_messages', JSON.stringify(messages));
  }, [messages]);

  // ==========================================
  // BLOG CRUD
  // ==========================================
  const addBlog = async (blogData) => {
    const newPost = {
      author: 'JAY ELECTRONICS Admin',
      authorRole: 'Corporate Communications',
      avatar: '/images/cctv_hero_bg.jpg',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      likes: 0,
      comments: [],
      status: 'Published',
      ...blogData
    };
    try {
      const docRef = await addDoc(collection(db, 'blogs'), newPost);
      newPost.id = docRef.id;
    } catch (err) {
      newPost.id = 'blog-' + Date.now();
      setBlogs(prev => [newPost, ...prev]);
    }
    return newPost;
  };

  const updateBlog = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'blogs', id), updatedData);
    } catch (err) {
      setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
    }
  };

  const deleteBlog = async (id) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
    } catch (err) {
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
  };

  const toggleLike = async (id) => {
    const targetBlog = blogs.find(b => b.id === id);
    if (!targetBlog) return;
    const isLiked = targetBlog.userLiked;
    const newLikes = isLiked ? Math.max(0, targetBlog.likes - 1) : (targetBlog.likes + 1);
    const updatePayload = { userLiked: !isLiked, likes: newLikes };
    try {
      await updateDoc(doc(db, 'blogs', id), updatePayload);
    } catch (err) {
      setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updatePayload } : b));
    }
  };

  const addComment = async (blogId, commentText) => {
    if (!commentText.trim()) return;
    const targetBlog = blogs.find(b => b.id === blogId);
    if (!targetBlog) return;
    const newComment = { id: 'c-' + Date.now(), user: 'Visitor', text: commentText };
    const updatedComments = [...(targetBlog.comments || []), newComment];
    try {
      await updateDoc(doc(db, 'blogs', blogId), { comments: updatedComments });
    } catch (err) {
      setBlogs(prev => prev.map(b => b.id === blogId ? { ...b, comments: updatedComments } : b));
    }
  };

  // ==========================================
  // PROJECT CRUD
  // ==========================================
  const addProject = async (projectData) => {
    const newProject = {
      image: '/images/city_surveillance.jpg',
      stats: 'Verified Execution Record',
      ...projectData
    };
    try {
      const docRef = await addDoc(collection(db, 'projects'), newProject);
      newProject.id = docRef.id;
    } catch (err) {
      newProject.id = 'proj-' + Date.now();
      setProjects(prev => [newProject, ...prev]);
    }
    return newProject;
  };

  const updateProject = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'projects', id), updatedData);
    } catch (err) {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    }
  };

  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  // ==========================================
  // SERVICE / SOLUTION CRUD
  // ==========================================
  const addService = async (serviceData) => {
    const newService = {
      icon: 'Shield',
      features: ['Turnkey Design', '24/7 Technical Support'],
      ...serviceData
    };
    try {
      const docRef = await addDoc(collection(db, 'services'), newService);
      newService.id = docRef.id;
    } catch (err) {
      newService.id = 'serv-' + Date.now();
      setServices(prev => [newService, ...prev]);
    }
    return newService;
  };

  const updateService = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'services', id), updatedData);
    } catch (err) {
      setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    }
  };

  const deleteService = async (id) => {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (err) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  // ==========================================
  // GALLERY CRUD
  // ==========================================
  const addGalleryItem = async (itemData) => {
    const newItem = {
      image: '/images/cctv_hero_bg.jpg',
      category: 'General',
      ...itemData
    };
    try {
      const docRef = await addDoc(collection(db, 'gallery'), newItem);
      newItem.id = docRef.id;
    } catch (err) {
      newItem.id = 'gal-' + Date.now();
      setGallery(prev => [newItem, ...prev]);
    }
    return newItem;
  };

  const updateGalleryItem = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'gallery', id), updatedData);
    } catch (err) {
      setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updatedData } : g));
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (err) {
      setGallery(prev => prev.filter(g => g.id !== id));
    }
  };

  // ==========================================
  // CONTACT MESSAGE / QUOTE INQUIRIES
  // ==========================================
  const addContactMessage = async (msgData) => {
    const newMsg = {
      ...msgData,
      date: new Date().toISOString().split('T')[0],
      status: 'Unread'
    };
    try {
      await addDoc(collection(db, 'messages'), newMsg);
    } catch (err) {
      newMsg.id = 'msg-' + Date.now();
      setMessages(prev => [newMsg, ...prev]);
    }
    return true;
  };

  const updateMessageStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'messages', id), { status });
    } catch (err) {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    }
  };

  const deleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (err) {
      setMessages(prev => prev.filter(m => m.id !== id));
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
      addContactMessage,
      updateMessageStatus,
      deleteMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

