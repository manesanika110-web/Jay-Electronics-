import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ContactForm() {
  const { addContactMessage } = useData();

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
    } else if (!/^[0-9+\-\s]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g. 9822012345).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details in your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      addContactMessage(formData);
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
    }, 600);
  };

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-extrabold text-[#222222] font-['Outfit'] mb-2 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#B5263F]"></span>
        Send Us a Message
      </h3>
      <p className="text-sm text-[#555555] mb-6">
        Fill out the inquiry form below. Our engineering team will review your specifications and contact you shortly.
      </p>

      {submitted && (
        <div className="bg-emerald-50 border-2 border-emerald-500/40 text-emerald-900 rounded-xl p-4 mb-6 flex items-start gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-bold text-emerald-950">Inquiry Submitted Successfully!</h4>
            <p className="text-emerald-800">
              Thank you for contacting JAY ELECTRONICS PVT LTD. Your message has been routed to our project division.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1">
            Your Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rajesh Patil"
            className={`w-full px-4 py-2.5 rounded-lg bg-white text-[#222222] border text-sm focus:outline-none transition ${
              errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#E0E0E0] focus:border-[#B5263F]'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className={`w-full px-4 py-2.5 rounded-lg bg-white text-[#222222] border text-sm focus:outline-none transition ${
                errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#E0E0E0] focus:border-[#B5263F]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98220 12345"
              className={`w-full px-4 py-2.5 rounded-lg bg-white text-[#222222] border text-sm focus:outline-none transition ${
                errors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#E0E0E0] focus:border-[#B5263F]'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1">
            Requirement / Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white text-[#222222] border border-[#E0E0E0] focus:border-[#B5263F] text-sm focus:outline-none"
          >
            <option value="Surveillance & CCTV Inquiry">CCTV & Surveillance Solution</option>
            <option value="LAN / WAN Networking Project">LAN / WAN Networking</option>
            <option value="EPABX / IP-PBX Telecommunication">EPABX / IP-PBX Telecommunication</option>
            <option value="Audio / Video Boardroom Setup">Audio / Video Solutions</option>
            <option value="City Surveillance Tender">City Surveillance Projects</option>
            <option value="Solar Project Quotation">Solar Power Solutions</option>
            <option value="General Inquiry">General Corporate Inquiry</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1">
            Project Details & Message *
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe location, camera count, network requirements, or specific technical specs..."
            className={`w-full px-4 py-2.5 rounded-lg bg-white text-[#222222] border text-sm focus:outline-none transition ${
              errors.message ? 'border-red-500 bg-red-50/20' : 'border-[#E0E0E0] focus:border-[#B5263F]'
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-sm py-3.5 px-6 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <span>Sending Inquiry...</span>
          ) : (
            <>
              <span>Submit Project Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

