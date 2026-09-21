import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('jay_electronics_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    // Demo admin credentials + Firebase compatibility check
    if ((email === 'admin@jayelectronics.com' || email === 'admin') && password === 'admin123') {
      const userObj = {
        uid: 'admin-1989',
        email: 'admin@jayelectronics.com',
        displayName: 'JAY ELECTRONICS Administrator',
        role: 'Admin'
      };
      setCurrentUser(userObj);
      localStorage.setItem('jay_electronics_admin', JSON.stringify(userObj));
      return { success: true };
    }
    
    // Custom check if user enters standard admin password
    if (password === 'admin123') {
      const userObj = {
        uid: 'admin-' + Date.now(),
        email: email,
        displayName: 'Authorized Admin',
        role: 'Admin'
      };
      setCurrentUser(userObj);
      localStorage.setItem('jay_electronics_admin', JSON.stringify(userObj));
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials. Use email: admin@jayelectronics.com & pass: admin123' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('jay_electronics_admin');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin: !!currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
