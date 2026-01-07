import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Base_URL from '../../context/Base_Url'
import { toast } from 'react-toastify';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  Store,
  LogIn
} from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  // Focus first input on mount
  useEffect(() => {
    setTimeout(() => emailRef.current?.focus(), 100);
  }, []);

  // Real-time validation
  useEffect(() => {
    const newErrors = {};

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
  }, [email, password]);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${Base_URL}/api/auth/login`, {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        toast.success('Login successful!');
        const token = response.data.token;
        const user = response.data.user;
        onLogin(token, user);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error(response.data.message || 'Login failed');
      }

    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Server Error';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef) {
        nextRef.current?.focus();
      } else if (email && password) {
        handleSubmit(e);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white antialiased">
      {/* LEFT SIDE: FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          {/* FORM */}
          <div>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && email && password) {
                      handleSubmit(e);
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
              {password && (
                <p className={`mt-1 text-xs ${password.length >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                  {password.length >= 6 ? '' : `Minimum 6 characters (${password.length}/6)`}
                </p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#DC143C] border-gray-300 rounded focus:ring-[#DC143C]/20"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <LogIn size={18} />
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/create-account" className="text-primary font-medium hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Features */}
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

export default Login;