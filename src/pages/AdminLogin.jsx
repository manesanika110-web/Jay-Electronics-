import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, AlertTriangle, ShieldCheck } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#5C0000]">
        <div className="flex items-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl">
          <div className="w-6 h-6 border-3 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-[#5C0000]">Authenticating...</span>
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#5C0000] relative overflow-hidden">
      
      {/* Ambient background light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#800000]/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6 animate-scaleUp relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#5C0000] border-2 border-[#800000] flex items-center justify-center text-rose-200 mx-auto shadow-xl relative">
            <Lock className="w-8 h-8 stroke-[2]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#800000] rounded-full border-2 border-[#5C0000] animate-pulse"></span>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#5C0000] font-['Outfit'] tracking-tight">
              Admin Portal Login
            </h2>
            <p className="text-xs text-[#6B6B6B] font-medium">
              JAY ELECTRONICS PVT LTD — Management Control Console
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {loginError && (
          <div className="bg-red-50 border border-red-300 text-red-800 text-xs p-3.5 rounded-2xl flex items-center gap-2.5 animate-fadeIn shadow-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span className="font-medium">{loginError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Email / Username
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="admin@jayelectronics.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none text-sm bg-slate-50 focus:bg-white transition-all text-[#5C0000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Security Password
            </label>
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#800000] focus:outline-none text-sm bg-slate-50 focus:bg-white transition-all text-[#5C0000]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#3B0000] text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer disabled:opacity-50 mt-2 border border-red-900/40"
          >
            {isSubmitting ? 'Authenticating...' : 'Log In to Admin Dashboard'}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#800000]" />
          <span>Encrypted Session • Enterprise Security Gate</span>
        </div>

      </div>
    </div>
  );
}
