import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Base_URL from '../../context/Base_Url'
import { toast } from 'react-toastify';

import {
  ChevronRight, ArrowLeft, Eye, EyeOff, Check, Store,
  User, Mail, Lock, Clock,
  MapPin, Phone, CreditCard, Building2
} from 'lucide-react';

const CreateAccount = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    shopName: '',
    address: '',
    phone: '',
    openTime: '09:00',
    closeTime: '22:00',
    currency: 'PKR'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const primaryColor = "#DC143C";

  // Refs for inputs
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const shopNameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);
  const currencyRef = useRef(null);
  const openTimeRef = useRef(null);
  const closeTimeRef = useRef(null);

  // Focus first input when step changes
  useEffect(() => {
    if (step === 1) {
      setTimeout(() => fullNameRef.current?.focus(), 100);
    } else if (step === 2) {
      setTimeout(() => shopNameRef.current?.focus(), 100);
    }
  }, [step]);

  // Real-time validation
  useEffect(() => {
    const newErrors = {};

    if (step === 1) {
      if (formData.fullName && formData.fullName.length < 2) {
        newErrors.fullName = 'Name must be at least 2 characters';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else {
      if (formData.shopName && formData.shopName.length < 2) {
        newErrors.shopName = 'Shop name must be at least 2 characters';
      }
      if (formData.address && formData.address.length < 5) {
        newErrors.address = 'Please enter a complete address';
      }
      if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
  }, [formData, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Direct input handlers to avoid component re-render
  const handleFullNameChange = (e) => setFormData(prev => ({ ...prev, fullName: e.target.value }));
  const handleEmailChange = (e) => setFormData(prev => ({ ...prev, email: e.target.value }));
  const handlePasswordChange = (e) => setFormData(prev => ({ ...prev, password: e.target.value }));
  const handleShopNameChange = (e) => setFormData(prev => ({ ...prev, shopName: e.target.value }));
  const handleAddressChange = (e) => setFormData(prev => ({ ...prev, address: e.target.value }));
  const handlePhoneChange = (e) => setFormData(prev => ({ ...prev, phone: e.target.value }));
  const handleCurrencyChange = (e) => setFormData(prev => ({ ...prev, currency: e.target.value }));
  const handleOpenTimeChange = (e) => setFormData(prev => ({ ...prev, openTime: e.target.value }));
  const handleCloseTimeChange = (e) => setFormData(prev => ({ ...prev, closeTime: e.target.value }));

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Shop name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Shop address is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${Base_URL}/api/auth/create-account`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        toast.success('Account created successfully!');
        const token = response.data.token;
        const user = response.data.user;
        onLogin(token, user);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error(response.data.message || 'Failed to create account');
      }

    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Server Error';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press to move to next input
  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white antialiased">
      {/* LEFT SIDE: FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-md">

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              <span className="text-sm font-medium text-gray-500">Step {step} of 2</span>
            </div>
            <div className="flex items-center">
              <div className={`h-1 flex-1 ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 mx-2 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                1
              </div>
              <div className={`h-1 flex-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 mx-2 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                2
              </div>
              <div className={`h-1 flex-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {step === 1 ? 'Personal Information' : 'Shop Details'}
            </p>
          </div>

          {/* FORM */}
          <div>
            {step === 1 ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h3>

                {/* Full Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      Full Name
                    </div>
                  </label>
                  <input
                    ref={fullNameRef}
                    type="text"
                    value={formData.fullName}
                    onChange={handleFullNameChange}
                    onKeyDown={(e) => handleKeyDown(e, emailRef)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.fullName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-300 focus:border-[#DC143C] focus:ring-[#DC143C]/20'
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      Email Address
                    </div>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-300 focus:border-[#DC143C] focus:ring-[#DC143C]/20'
                      }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Lock size={16} className="text-gray-500" />
                      Password
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handlePasswordChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && formData.fullName && formData.email && formData.password) {
                          handleNextStep();
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.password
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-300 focus:border-[#DC143C] focus:ring-[#DC143C]/20'
                        }`}
                      placeholder="••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  {formData.password && (
                    <p className={`mt-1 text-xs ${formData.password.length >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                      {formData.password.length >= 6 ? '✓ Password is strong' : `Minimum 6 characters (${formData.password.length}/6)`}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={!formData.fullName || !formData.email || !formData.password}
                  className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  Continue
                  <ChevronRight size={18} />
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <h3 className="text-lg font-semibold text-gray-800 mb-6">Shop Details</h3>

                {/* Shop Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Store size={16} className="text-gray-500" />
                      Shop Name
                    </div>
                  </label>
                  <input
                    ref={shopNameRef}
                    type="text"
                    value={formData.shopName}
                    onChange={handleShopNameChange}
                    onKeyDown={(e) => handleKeyDown(e, addressRef)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.shopName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-300 focus:border-[#DC143C] focus:ring-[#DC143C]/20'
                      }`}
                    placeholder="e.g., City Mart"
                  />
                  {errors.shopName && <p className="mt-1 text-sm text-red-600">{errors.shopName}</p>}
                </div>

                {/* Address */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      Shop Address
                    </div>
                  </label>
                  <input
                    ref={addressRef}
                    type="text"
                    value={formData.address}
                    onChange={handleAddressChange}
                    onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.address
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-300 focus:border-[#DC143C] focus:ring-[#DC143C]/20'
                      }`}
                    placeholder="Complete shop address"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      Phone Number
                    </div>
                  </label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onKeyDown={(e) => handleKeyDown(e, currencyRef)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.phone
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-300 focus:border-[#DC143C] focus:ring-[#DC143C]/20'
                      }`}
                    placeholder="+92 300 1234567"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Currency */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-gray-500" />
                      Currency
                    </div>
                  </label>
                  <select
                    ref={currencyRef}
                    value={formData.currency}
                    onChange={handleCurrencyChange}
                    onKeyDown={(e) => handleKeyDown(e, openTimeRef)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#DC143C] focus:ring-2 focus:ring-[#DC143C]/20"
                  >
                    <option value="PKR">PKR - Pakistani Rupee</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                  </select>
                </div>

                {/* Open/Close Time */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        Open Time
                      </div>
                    </label>
                    <input
                      ref={openTimeRef}
                      type="time"
                      value={formData.openTime}
                      onChange={handleOpenTimeChange}
                      onKeyDown={(e) => handleKeyDown(e, closeTimeRef)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#DC143C] focus:ring-2 focus:ring-[#DC143C]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        Close Time
                      </div>
                    </label>
                    <input
                      ref={closeTimeRef}
                      type="time"
                      value={formData.closeTime}
                      onChange={handleCloseTimeChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && formData.shopName && formData.address && formData.phone) {
                          handleSubmit(e);
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#DC143C] focus:ring-2 focus:ring-[#DC143C]/20"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <Check size={18} />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/" className="text-[#DC143C] font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Simple Info */}
      <div className="hidden relative overflow-hidden md:flex md:w-1/2 bg-gray-50 flex-col justify-center items-center p-12">

        <div className="absolute -top-20 -right-32 w-96 h-96 bg-primary opacity-[0.25] z-10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-[0.2] z-10 rounded-full blur-[80px]"></div>

        <div className="w-full max-w-md">
          {/* Simple Illustration */}
          <div className="mb-12">
            <img src="dukaan-ease-logo.png" alt="" className="w-52 mx-auto" />
            <h2 className="text-2xl font-semibold mt-10 text-gray-900 text-center mb-3">
              Start Your Digital Shop
            </h2>
            <p className="text-gray-600 text-center">
              Join thousands of merchants using DukaanEase to manage their business efficiently.
            </p>
          </div>

          {/* Simple Features */}
          <div className="space-y-6 relative z-30">
            <div className="flex items-start gap-4 bg-white border border-primary/30 p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Store className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Easy Setup</h4>
                <p className="text-sm text-gray-600">Get started in minutes with our simple setup process.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border border-primary/30 p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Sales Tracking</h4>
                <p className="text-sm text-gray-600">Track sales, inventory, and customer data in real-time.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border border-primary/30 p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-primary text-base font-bold">24/7</div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Always Available</h4>
                <p className="text-sm text-gray-600">Access your shop data anytime, anywhere.</p>
              </div>
            </div>
          </div>

          {/* Simple Stats */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2,000+</div>
                <div className="text-sm text-gray-600">Merchants</div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;