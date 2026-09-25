import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_admin_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  // Monitor Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userObj = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'Authorized Administrator',
          role: 'Admin'
        };
        setCurrentUser(userObj);
        localStorage.setItem('jay_electronics_admin_session', JSON.stringify(userObj));
      } else {
        const savedSession = localStorage.getItem('jay_electronics_admin_session');
        if (!savedSession) {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Please enter both admin email and password.' };
    }

    try {
      // 1. Firebase Email/Password Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      const userObj = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Authorized Administrator',
        role: 'Admin'
      };

      // 2. Immediately update authentication state and local session
      setCurrentUser(userObj);
      localStorage.setItem('jay_electronics_admin_session', JSON.stringify(userObj));
      return { success: true };

    } catch (firebaseErr) {
      console.warn('Firebase Authentication attempt error:', firebaseErr.code, firebaseErr.message);

      if (firebaseErr.code === 'auth/configuration-not-found') {
        return { 
          success: false, 
          error: 'Firebase Auth Notice: Email/Password sign-in provider is disabled in Firebase Console. Enable Email/Password under Firebase Console (jepl-website) -> Authentication -> Sign-in method.' 
        };
      }

      if (
        firebaseErr.code === 'auth/invalid-credential' ||
        firebaseErr.code === 'auth/user-not-found' ||
        firebaseErr.code === 'auth/wrong-password' ||
        firebaseErr.code === 'auth/invalid-email'
      ) {
        return { success: false, error: 'Invalid email or password.' };
      }

      if (firebaseErr.code === 'auth/user-disabled') {
        return { success: false, error: 'This administrator account has been disabled.' };
      }

      if (firebaseErr.code === 'auth/too-many-requests') {
        return { success: false, error: 'Access temporarily blocked due to multiple failed attempts. Please try again later.' };
      }

      return { 
        success: false, 
        error: firebaseErr.message || 'Authentication failed. Please check your credentials.' 
      };
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {}
    setCurrentUser(null);
    localStorage.removeItem('jay_electronics_admin_session');
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAdmin: !!currentUser && currentUser.role === 'Admin', 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
