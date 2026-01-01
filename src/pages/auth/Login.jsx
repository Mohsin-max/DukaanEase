// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store, Mail, Lock, ArrowRight, ShieldCheck, TrendingUp, Package, Users, Smartphone, CheckCircle, BarChart3, ShoppingBag, LayoutDashboard } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo login
    onLogin();
    navigate('/dashboard');
  };

  const features = [
    { icon: <TrendingUp size={20} />, text: 'Real-time Analytics' },
    { icon: <Package size={20} />, text: 'Inventory Management' },
    { icon: <Users size={20} />, text: 'Customer Tracking' },
    { icon: <Smartphone size={20} />, text: 'Mobile Friendly' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* LEFT SIDE - Sharp & Minimal Form */}
      <div className="w-full md:w-1/2 lg:w-5/12 flex items-center justify-center p-8 md:p-12 lg:p-20">
        <div className="w-full max-w-sm">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Login</h2>
            <p className="text-gray-500 font-medium">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-b-2 border-gray-100 focus:border-primary outline-none transition-all bg-transparent placeholder-gray-300 text-gray-700"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-b-2 border-gray-100 focus:border-primary outline-none transition-all bg-transparent placeholder-gray-300 text-gray-700"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
              </label>
              <Link to="/forgot" className="text-sm font-bold text-primary hover:opacity-70 transition-opacity">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-12 text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/create-account" className="text-primary font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Light Contrast Section for Black Logo visibility */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 bg-gray-50 relative overflow-hidden flex-col justify-center items-center p-12 border-l border-gray-100">

        {/* Background subtle pattern - primary color ki halki si jhalak */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-[0.35] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-[0.3] rounded-full blur-[80px]"></div>

        <div className="relative z-10 w-full max-w-md text-center">

          {/* LOGO - Now perfectly visible on light background */}
          <div className="flex flex-col items-center gap-4 mb-16 transition-transform hover:scale-105 duration-500">
            <img
              src="dukaan-ease-logo.png"
              alt="Dukaan Ease Logo"
              width={'220'}
              className="drop-shadow-sm"
            />
          </div>

          {/* FEATURE CARDS - Styled with Primary color on Light BG */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm group hover:border-primary hover:shadow-md transition-all duration-300">
              <BarChart3 className="text-primary mb-3 mx-auto" size={32} />
              <p className="text-gray-900 font-bold text-sm uppercase tracking-widest">Analytics</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm group hover:border-primary hover:shadow-md transition-all duration-300">
              <ShoppingBag className="text-primary mb-3 mx-auto" size={32} />
              <p className="text-gray-900 font-bold text-sm uppercase tracking-widest">Inventory</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm group hover:border-primary hover:shadow-md transition-all duration-300">
              <LayoutDashboard className="text-primary mb-3 mx-auto" size={32} />
              <p className="text-gray-900 font-bold text-sm uppercase tracking-widest">Dashboard</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm group hover:border-primary hover:shadow-md transition-all duration-300">
              <ShieldCheck className="text-primary mb-3 mx-auto" size={32} />
              <p className="text-gray-900 font-bold text-sm uppercase tracking-widest">Security</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Modern Shop Management</h3>
          <p className="text-gray-500 text-sm leading-relaxed px-8">
            The ultimate tool to track your sales, manage stock, and grow your business with zero effort.
          </p>
        </div>

        {/* Minimal Footer */}
        <div className="absolute bottom-10 flex items-center gap-2 text-zinc-400 font-bold text-[10px] tracking-[0.2em] uppercase">
          <div className="w-12 h-[1px] bg-zinc-400"></div>
          Version 1.0.0
          <div className="w-12 h-[1px] bg-zinc-400"></div>
        </div>
      </div>

    </div>
  );
};

export default Login;