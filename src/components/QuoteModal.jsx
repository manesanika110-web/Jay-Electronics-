import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ShieldCheck, 
  AlertCircle, 
  Check,
  Send,
  User,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function QuoteModal({ isOpen, onClose }) {
  const { addQuoteRequest, addContactMessage } = useData();

  // Form Fields State
  const [contactName, setContactName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [note, setNote] = useState('');

  // Validation & Success States
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Lock background body scroll and enable Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(numericValue);
    if (errors.mobileNumber) {
      setErrors((prev) => ({ ...prev, mobileNumber: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!contactName.trim()) {
      newErrors.contactName = 'Name is required.';
    }
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Phone number is required.';
    } else if (mobileNumber.trim().length !== 10) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit phone number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const submitFn = addQuoteRequest || addContactMessage;
      if (submitFn) {
        await submitFn({
          type: 'Quote Request',
          name: contactName.trim(),
          contactName: contactName.trim(),
          email: emailAddress.trim() || 'N/A',
          emailAddress: emailAddress.trim() || 'N/A',
          phone: mobileNumber.trim(),
          mobileNumber: mobileNumber.trim(),
          subject: 'Quotation Request',
          service: 'Get a Quote Request',
          note: note.trim(),
          message: note.trim() || 'No additional note provided.',
          createdAt: new Date().toISOString(),
          status: 'new'
        });
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setContactName('');
        setMobileNumber('');
        setEmailAddress('');
        setNote('');
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Firebase submission error:', err);
      setIsSubmitting(false);
      const displayError = err?.message || (typeof err === 'string' ? err : String(err));
      setSubmitError(displayError);
    }
  };

  const handleClose = () => {
    setErrors({});
    setSubmitError('');
    onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn overflow-hidden"
      onClick={handleClose}
    >
      
      {/* Modal Container */}
      <div 
        className="relative bg-white/95 backdrop-blur-xl w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[88vh] my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Dark Header */}
        <div className="bg-[#800000] text-white p-5 sm:p-6 flex items-start justify-between border-b border-red-900/40 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-200 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-rose-200" />
              <span>JAY ELECTRONICS PVT LTD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] tracking-tight">
              Get a Quote
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer shrink-0 ml-4"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Banner */}
        {isSubmitted ? (
          <div className="p-8 sm:p-10 text-center space-y-4 bg-emerald-50 text-emerald-900 my-auto animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-emerald-950">
              Quotation Request Received!
            </h3>
            <p className="text-sm text-emerald-800 font-medium max-w-sm mx-auto">
              Thank you! Our engineering team will review your requirement and reach out shortly with a detailed quote.
            </p>
          </div>
        ) : (
          /* FORM BODY */
          <div className="p-6 sm:p-7 flex-1 min-h-0 overflow-y-auto space-y-5">
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Fill in your details below to request a customized quotation from our electronics & security engineers.
            </p>

            {submitError && (
              <div className="bg-red-50 border-2 border-red-500/40 text-red-900 rounded-2xl p-4 flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-red-950">Submission Error</h4>
                  <p className="text-red-800">{submitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#800000]" />
                  <span>Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Shinde"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`w-full p-3 text-xs sm:text-sm font-medium bg-slate-50/70 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                    errors.contactName ? 'border-red-500 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-[#800000]'
                  }`}
                />
                {errors.contactName && (
                  <span className="text-[11px] font-semibold text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.contactName}
                  </span>
                )}
              </div>

              {/* Field 2: Phone Number */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#800000]" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="e.g. 9822000000"
                  value={mobileNumber}
                  onChange={handlePhoneChange}
                  className={`w-full p-3 text-xs sm:text-sm font-medium bg-slate-50/70 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                    errors.mobileNumber ? 'border-red-500 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-[#800000]'
                  }`}
                />
                {errors.mobileNumber && (
                  <span className="text-[11px] font-semibold text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.mobileNumber}
                  </span>
                )}
              </div>

              {/* Field 3: Email */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#800000]" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm font-medium bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-[#800000] focus:bg-white transition-all"
                />
              </div>

              {/* Field 4: Note */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#800000]" />
                  <span>Note</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Write any specific requirements, site location, or inquiry notes..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm font-medium bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-[#800000] focus:bg-white transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#800000] to-[#5C0000] hover:from-[#5C0000] hover:to-[#111111] text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 border border-[#800000]/40"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Quotation Request</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
