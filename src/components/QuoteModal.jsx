import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  MapPin, 
  Clock, 
  Check 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function QuoteModal({ isOpen, onClose }) {
  const { addMessage } = useData();
  const [step, setStep] = useState(1);

  // Form 1 State
  const [selectedSolution, setSelectedSolution] = useState('CCTV Surveillance');
  const [deploymentScale, setDeploymentScale] = useState('Medium (17-64 Points)');

  // Form 2 State
  const [facilityType, setFacilityType] = useState('Manufacturing MIDC Factory');
  const [districtCity, setDistrictCity] = useState('Sangli (Headquarters Hub)');
  const [isUrgent, setIsUrgent] = useState(false);

  // Form 3 State
  const [contactName, setContactName] = useState('');
  const [organization, setOrganization] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [siteDetails, setSiteDetails] = useState('');

  // Validation & Success States
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock background body scroll and enable Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const solutionsList = [
    'CCTV Surveillance',
    'Networking Infrastructure',
    'Access Control & Biometrics',
    'Fire Alarm Systems',
    'Fiber Optics Backbone',
    'Command LED Walls',
    'Video Door Phones',
    'EPABX & Intercom',
    'Annual Maintenance Contract (AMC)',
    'Turnkey Multi-System'
  ];

  const scalesList = [
    'Small (1-16 Points)',
    'Medium (17-64 Points)',
    'Large Enterprise (65-250+ Points)'
  ];

  const facilityTypes = [
    'Manufacturing MIDC Factory',
    'Commercial Office & Tower',
    'Government & Municipal Building',
    'Hospital & Healthcare Center',
    'Educational Institute & School',
    'Residential Gated Community',
    'Retail Mall & Showroom',
    'Judicial Court & High-Security'
  ];

  const districtsList = [
    'Sangli (Headquarters Hub)',
    'Kolhapur Regional Hub',
    'Pune Branch',
    'Sambhajinagar',
    'Satara',
    'Solapur',
    'Mumbai / Thane',
    'Other Maharashtra District'
  ];

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!selectedSolution) {
      setErrors({ step1: 'Please select a target solution.' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (!facilityType || !districtCity) {
      setErrors({ step2: 'Please select both facility type and nearest district/city.' });
      return;
    }
    setErrors({});
    setStep(3);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!contactName.trim()) {
      newErrors.contactName = 'Contact Name is required.';
    }
    if (!organization.trim()) {
      newErrors.organization = 'Organization / Company Name is required.';
    }
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile / WhatsApp number is required.';
    } else if (mobileNumber.trim().length < 10) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Save to context messages
    if (addMessage) {
      addMessage({
        name: contactName,
        email: emailAddress || 'N/A',
        phone: mobileNumber,
        service: selectedSolution,
        message: `[BOQ Survey Request] Scale: ${deploymentScale} | Facility: ${facilityType} | City: ${districtCity} | Urgent: ${isUrgent ? 'YES (Within 24h)' : 'NO'} | Company: ${organization} | Details: ${siteDetails}`
      });
    }

    // Show success banner
    setIsSubmitted(true);

    // After 1 second (1000ms), close and reset form
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setSelectedSolution('CCTV Surveillance');
      setDeploymentScale('Medium (17-64 Points)');
      setFacilityType('Manufacturing MIDC Factory');
      setDistrictCity('Sangli (Headquarters Hub)');
      setIsUrgent(false);
      setContactName('');
      setOrganization('');
      setMobileNumber('');
      setEmailAddress('');
      setSiteDetails('');
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-black/65 flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-hidden"
      onClick={handleClose}
    >
      
      {/* Modal Container - Large Horizontal Card Centered */}
      <div 
        className="relative bg-white w-full max-w-4xl sm:max-w-5xl rounded-2xl shadow-2xl border-2 border-[#B5263F] overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[88vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Dark Header */}
        <div className="bg-[#0F172A] text-white p-5 sm:p-6 flex items-start justify-between border-b border-gray-800 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B5263F] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#B5263F]" />
              <span>OFFICIAL ENGINEERING ESTIMATOR & SURVEY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] tracking-tight">
              Get Free Site Survey & Request Quotation
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

        {/* Success Overlay Banner */}
        {isSubmitted ? (
          <div className="p-10 text-center space-y-4 bg-emerald-50 text-emerald-900 border-b border-emerald-200 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-extrabold font-['Outfit'] text-emerald-800">
              Form submitted successfully.
            </h3>
            <p className="text-sm text-emerald-700 font-medium max-w-md mx-auto">
              Thank you! Our senior systems engineering manager will review your site specifications and contact you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Step Progress Indicator Bar */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-4 bg-white border-b border-gray-100 text-xs sm:text-sm font-semibold shrink-0">
              
              {/* Step 1 */}
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#B5263F] font-bold' : 'text-gray-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 1 ? 'bg-[#B5263F]' : 'bg-gray-300'}`}>
                  1
                </span>
                <span>Requirements</span>
              </div>

              <div className={`flex-grow h-0.5 mx-3 ${step >= 2 ? 'bg-[#B5263F]' : 'bg-gray-200'}`}></div>

              {/* Step 2 */}
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#B5263F] font-bold' : 'text-gray-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 2 ? 'bg-[#B5263F]' : 'bg-gray-300'}`}>
                  2
                </span>
                <span>Facility & City</span>
              </div>

              <div className={`flex-grow h-0.5 mx-3 ${step >= 3 ? 'bg-[#B5263F]' : 'bg-gray-200'}`}></div>

              {/* Step 3 */}
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#B5263F] font-bold' : 'text-gray-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 3 ? 'bg-[#B5263F]' : 'bg-gray-300'}`}>
                  3
                </span>
                <span>Contact Details</span>
              </div>

            </div>

            {/* FORM BODY */}
            <div className="p-6 sm:p-8 flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-6">
              
              {/* FORM 1: STEP 1 - REQUIREMENTS */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-6">
                  
                  {errors.step1 && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.step1}</span>
                    </div>
                  )}

                  {/* SELECT TARGET SOLUTION */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-3">
                      SELECT TARGET SOLUTION *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {solutionsList.map((sol) => (
                        <button
                          key={sol}
                          type="button"
                          onClick={() => setSelectedSolution(sol)}
                          className={`p-3 text-xs font-bold rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                            selectedSolution === sol
                              ? 'bg-rose-50 border-[#B5263F] text-[#B5263F] shadow-xs'
                              : 'bg-white border-gray-200 text-[#333333] hover:border-gray-300'
                          }`}
                        >
                          <span>{sol}</span>
                          {selectedSolution === sol && <CheckCircle2 className="w-4 h-4 text-[#B5263F] shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* DEPLOYMENT SCALE */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-3">
                      DEPLOYMENT SCALE
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {scalesList.map((scale) => (
                        <button
                          key={scale}
                          type="button"
                          onClick={() => setDeploymentScale(scale)}
                          className={`p-3.5 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
                            deploymentScale === scale
                              ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                              : 'bg-white border-gray-200 text-[#555555] hover:border-gray-300'
                          }`}
                        >
                          {scale}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Facility Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

              {/* FORM 2: STEP 2 - FACILITY & CITY */}
              {step === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-6">
                  
                  {errors.step2 && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.step2}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* FACILITY / SECTOR TYPE */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-2">
                        FACILITY / SECTOR TYPE *
                      </label>
                      <select
                        value={facilityType}
                        onChange={(e) => setFacilityType(e.target.value)}
                        className="w-full p-3 text-xs sm:text-sm font-semibold bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#B5263F] text-[#333333]"
                      >
                        {facilityTypes.map((ft) => (
                          <option key={ft} value={ft}>{ft}</option>
                        ))}
                      </select>
                    </div>

                    {/* NEAREST DISTRICT / CITY */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-2">
                        NEAREST DISTRICT / CITY *
                      </label>
                      <select
                        value={districtCity}
                        onChange={(e) => setDistrictCity(e.target.value)}
                        className="w-full p-3 text-xs sm:text-sm font-semibold bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#B5263F] text-[#333333]"
                      >
                        {districtsList.map((dc) => (
                          <option key={dc} value={dc}>{dc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* URGENT CHECKBOX */}
                  <div className="p-4 bg-[#F8FAFC] border border-gray-200 rounded-xl flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="urgentCheckbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#B5263F] rounded cursor-pointer"
                    />
                    <label htmlFor="urgentCheckbox" className="text-xs sm:text-sm font-bold text-[#222222] cursor-pointer">
                      Critical Urgent Deployment / Tender Requirement
                      <span className="block text-xs font-normal text-gray-500 mt-0.5">
                        Request senior site engineer visit within 24 hours.
                      </span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex items-center justify-between gap-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#555555] hover:bg-gray-50 transition cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Contact Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

              {/* FORM 3: STEP 3 - CONTACT DETAILS */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CONTACT NAME */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5">
                        CONTACT NAME *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Shinde"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className={`w-full p-3 text-xs sm:text-sm font-medium bg-white border rounded-xl focus:outline-none ${
                          errors.contactName ? 'border-rose-500 focus:border-rose-500' : 'border-gray-300 focus:border-[#B5263F]'
                        }`}
                      />
                      {errors.contactName && <span className="text-[11px] font-semibold text-rose-600 mt-1 block">{errors.contactName}</span>}
                    </div>

                    {/* ORGANIZATION / COMPANY */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5">
                        ORGANIZATION / COMPANY *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mahavir Textiles Ltd."
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className={`w-full p-3 text-xs sm:text-sm font-medium bg-white border rounded-xl focus:outline-none ${
                          errors.organization ? 'border-rose-500 focus:border-rose-500' : 'border-gray-300 focus:border-[#B5263F]'
                        }`}
                      />
                      {errors.organization && <span className="text-[11px] font-semibold text-rose-600 mt-1 block">{errors.organization}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* MOBILE / WHATSAPP NUMBER */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5">
                        MOBILE / WHATSAPP NUMBER *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98220 00000"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className={`w-full p-3 text-xs sm:text-sm font-medium bg-white border rounded-xl focus:outline-none ${
                          errors.mobileNumber ? 'border-rose-500 focus:border-rose-500' : 'border-gray-300 focus:border-[#B5263F]'
                        }`}
                      />
                      {errors.mobileNumber && <span className="text-[11px] font-semibold text-rose-600 mt-1 block">{errors.mobileNumber}</span>}
                    </div>

                    {/* OFFICIAL EMAIL ADDRESS */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5">
                        OFFICIAL EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full p-3 text-xs sm:text-sm font-medium bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#B5263F]"
                      />
                    </div>
                  </div>

                  {/* SITE DETAILS */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#222222] mb-1.5">
                      SITE DETAILS / SPECIAL INSTRUCTIONS
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe site layout, specific tender BOQ specifications, or existing cabling conditions..."
                      value={siteDetails}
                      onChange={(e) => setSiteDetails(e.target.value)}
                      className="w-full p-3 text-xs sm:text-sm font-medium bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#B5263F]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex items-center justify-between gap-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#555555] hover:bg-gray-50 transition cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#B5263F] hover:bg-[#8F1D32] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Free Site Survey Request</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </>
        )}

      </div>
    </div>,
    document.body
  );
}
