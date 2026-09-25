import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
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
    // Allow only digits (0-9) up to maximum 10 digits
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

      // Reset and close after 1.5s
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
      className="fixed inset-0 z-[9999] bg-black/65 flex items-center justify-center p-4 sm:p-6 animate-fadeIn overflow-hidden"
      onClick={handleClose}
    >
      
      {/* Modal Container - Centered Responsive Card */}
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border-2 border-[#B5263F] overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[88vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Dark Header */}
        <div className="bg-[#0F172A] text-white p-5 sm:p-6 flex items-start justify-between border-b border-gray-800 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B5263F] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#B5263F]" />
              <span>JAY ELECTRONICS PVT LTD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] tracking-tight">
              Get a Quote
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition cursor-pointer shrink-0 ml-4"
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
            <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-emerald-800">
              Quotation Request Received!
            </h3>
            <p className="text-sm text-emerald-700 font-medium max-w-sm mx-auto">
              Thank you! Our engineering team will review your requirement and reach out shortly with a detailed quote.
            </p>
          </div>
        ) : (
          /* FORM BODY */
          <div className="p-6 sm:p-7 flex-1 min-h-0 overflow-y-auto space-y-5">
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Fill in your details below to request a customized quotation from our electronics & security engineers.
            </p>

            {submitError && (
              <div className="bg-rose-50 border-2 border-rose-500/40 text-rose-900 rounded-xl p-4 flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-rose-950">Submission Error</h4>
                  <p className="text-rose-800">{submitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#B5263F]" />
                  <span>Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Shinde"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`w-full p-3 text-xs sm:text-sm font-medium bg-white border rounded-xl focus:outline-none ${
                    errors.contactName ? 'border-rose-500 focus:border-rose-500 bg-rose-50/50' : 'border-gray-300 focus:border-[#B5263F]'
                  }`}
                />
                {errors.contactName && (
                  <span className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.contactName}
                  </span>
                )}
              </div>

              {/* Field 2: Phone Number */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B5263F]" />
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
                  className={`w-full p-3 text-xs sm:text-sm font-medium bg-white border rounded-xl focus:outline-none ${
                    errors.mobileNumber ? 'border-rose-500 focus:border-rose-500 bg-rose-50/50' : 'border-gray-300 focus:border-[#B5263F]'
                  }`}
                />
                {errors.mobileNumber && (
                  <span className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.mobileNumber}
                  </span>
                )}
              </div>

              {/* Field 3: Email */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B5263F]" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm font-medium bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#B5263F]"
                />
              </div>

              {/* Field 4: Note */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#B5263F]" />
                  <span>Note</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Write any specific requirements, site location, or inquiry notes..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm font-medium bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#B5263F]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
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
