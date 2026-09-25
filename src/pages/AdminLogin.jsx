import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, AlertTriangle } from 'lucide-react';

export default function AdminLogin() {
  const { isAdmin, loading, login } = useAuth();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // While checking initial Firebase Auth session state
  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#F5F5F5]">
        <div className="flex items-center gap-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
          <div className="w-6 h-6 border-3 border-[#B5263F] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-[#1E293B]">Authenticating...</span>
        </div>
      </div>
    );
  }

  // If already authenticated as Admin, redirect to /admin
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!emailInput.trim() || !passInput.trim()) {
      setLoginError('Please enter both admin email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(emailInput, passInput);
      if (res.success) {
        navigate('/admin', { replace: true });
      } else {
        setLoginError(res.error || 'Authentication failed');
      }
    } catch (err) {
      setLoginError('An unexpected error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#F5F5F5]">
      <div className="bg-white border-2 border-[#B5263F] rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6 animate-fadeIn">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#333333] border-2 border-[#B5263F] flex items-center justify-center text-[#B5263F] mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#222222] font-['Outfit'] tracking-tight">
            Admin Portal Login
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            JAY ELECTRONICS PVT LTD Management Control System
          </p>
        </div>

        {/* Error Alert */}
        {loginError && (
          <div className="bg-red-50 border border-red-400 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#222222] uppercase mb-1">
              Admin Email / Username
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="admin@jayelectronics.com"
              required
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
              required
              className="w-full px-4 py-2.5 rounded-lg border border-[#E0E0E0] focus:border-[#B5263F] focus:outline-none text-sm bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold py-3 rounded-lg shadow transition cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Authenticating...' : 'Log In to Admin Dashboard'}
          </button>
        </form>

      </div>
    </div>
  );
}
