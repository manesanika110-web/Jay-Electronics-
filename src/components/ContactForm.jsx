import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, User, Mail, Phone, Tag, MessageSquare, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ContactForm() {
  const { addContactInquiry, addContactMessage } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Surveillance & CCTV Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Automatically auto-dismiss the success message after 3 seconds
  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitted]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length !== 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details in your message.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError('');
    setSubmitted(false);

    try {
      const submitFn = addContactMessage || addContactInquiry;
      await submitFn({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        createdAt: new Date().toISOString(),
        type: 'Contact Message'
      });

      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Surveillance & CCTV Inquiry',
        message: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Firebase submission error:', err);
      setLoading(false);
      const displayError = err?.message || (typeof err === 'string' ? err : String(err));
      setSubmitError(displayError);
    }
  };

  return (
    <>
      {/* Floating Success Notification Banner */}
      {submitted && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 max-w-md bg-emerald-50 border-2 border-emerald-500/80 text-emerald-900 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-fadeIn backdrop-blur-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm flex-1">
            <h4 className="font-bold text-emerald-950">Inquiry Submitted Successfully!</h4>
            <p className="text-emerald-800 text-xs mt-0.5 leading-relaxed">
              Thank you for contacting JAY ELECTRONICS PVT LTD. Your message has been routed to our project division.
            </p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="text-emerald-700 hover:text-emerald-950 p-1 cursor-pointer transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300">
        {/* Header with Navy Circle Icon */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#0B182B] flex items-center justify-center text-rose-200 shrink-0 shadow-sm">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B182B] font-['Outfit'] tracking-tight">
              Send Us a Message
            </h3>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 font-normal ml-13">
          Fill out the form below and our team will get back to you as soon as possible.
        </p>

        {/* Compact Inline Success Banner */}
        {submitted && (
          <div className="bg-emerald-50 border-2 border-emerald-500/40 text-emerald-900 rounded-2xl p-3.5 mb-6 flex items-start gap-3 animate-fadeIn shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-bold text-emerald-950">Inquiry Submitted Successfully!</h4>
              <p className="text-emerald-800 text-xs mt-0.5">
                Thank you for contacting JAY ELECTRONICS PVT LTD. Your message has been routed to our project division.
              </p>
            </div>
          </div>
        )}

        {submitError && (
          <div className="bg-red-50 border-2 border-red-500/40 text-red-900 rounded-2xl p-4 mb-6 flex items-start gap-3 animate-fadeIn shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-bold text-red-950">Submission Error</h4>
              <p className="text-red-800 text-xs mt-0.5">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-[#800000]">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/70 text-[#0B182B] border text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-200/80 focus:border-[#800000]'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address <span className="text-[#800000]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/70 text-[#0B182B] border text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200/80 focus:border-[#800000]'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Phone & Subject Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Phone Number <span className="text-[#800000]">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/70 text-[#0B182B] border text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200/80 focus:border-[#800000]'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subject <span className="text-[#800000]">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full pl-10 pr-8 py-3 rounded-xl bg-slate-50/70 text-[#0B182B] border border-slate-200/80 focus:border-[#800000] text-sm focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="Surveillance & CCTV Inquiry">Select a subject</option>
                  <option value="Surveillance & CCTV Inquiry">CCTV & Video Surveillance</option>
                  <option value="LAN / WAN Networking Project">Networking & Fiber Solutions</option>
                  <option value="EPABX / IP-PBX Telecommunication">EPABX & Intercom Systems</option>
                  <option value="Audio / Video Boardroom Setup">Audio Visual (AV) Solutions</option>
                  <option value="City Surveillance Tender">City Surveillance Projects</option>
                  <option value="Solar Project Quotation">Solar Power Security</option>
                  <option value="General Inquiry">General Consultation</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Your Message <span className="text-[#800000]">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/70 text-[#0B182B] border text-sm focus:outline-none focus:bg-white transition-all ${
                  errors.message ? 'border-red-500 bg-red-50/20' : 'border-slate-200/80 focus:border-[#800000]'
                }`}
              ></textarea>
            </div>
            {errors.message && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#111111] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2 border border-[#800000]/40"
          >
            {loading ? (
              <span>Sending Message...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
