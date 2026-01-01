import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, ArrowLeft, Eye, EyeOff, Check, 
  ShoppingBag, ShieldCheck, Zap, BarChart3, Store,
  Rocket, ClipboardCheck, Globe, User, Mail, Lock, MapPin, Clock
} from 'lucide-react';

const CreateAccount = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', shopName: '', address: '', openTime: '', closeTime: ''
  });
  
  const navigate = useNavigate();
  const accentColor = "#FF123C"; // Aapka Primary Color

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white antialiased overflow-hidden">
      
      {/* --- LEFT SIDE: THE FORM (Updated for Attraction) --- */}
      <div className="w-full md:w-1/2 lg:w-5/12 flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
        <div className="w-full max-w-sm">
          
          {/* Progress Bar Header */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-2">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Register</h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Step {step} of 2</span>
            </div>
            <div className="w-full bg-gray-100 h-[3px] rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-700 ease-in-out" 
                style={{ width: step === 1 ? '50%' : '100%', backgroundColor: accentColor }}
              />
            </div>
          </div>

          <div className="p-2"> {/* Added slight padding for shadow space */}
            {step === 1 ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 italic">Personal Info.</h1>
                  <p className="text-gray-400 text-sm mt-1 font-medium">Let's get your profile started.</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1 group relative">
                    <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                      <User size={15} strokeWidth={2.5} /> Full Name
                    </label>
                    <input name="fullName" className="w-full px-0 py-3 border-b-2 border-gray-400 focus:border-primary outline-none transition-all bg-transparent placeholder:text-gray-300 text-sm font-medium" placeholder="e.g. Sameer Ali" onChange={handleChange} value={formData.fullName} />
                  </div>

                  <div className="space-y-1 group">
                    <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                      <Mail size={15} strokeWidth={2.5} /> Email Address
                    </label>
                    <input name="email" type="email" className="w-full px-0 py-3 border-b-2 border-gray-400 focus:border-primary outline-none transition-all bg-transparent placeholder:text-gray-300 text-sm font-medium" placeholder="sameer@store.com" onChange={handleChange} value={formData.email} />
                  </div>

                  <div className="space-y-1 group relative">
                    <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                      <Lock size={15} strokeWidth={2.5} /> Password
                    </label>
                    <input name="password" type={showPassword ? "text" : "password"} className="w-full px-0 py-3 border-b-2 border-gray-400 focus:border-primary outline-none transition-all bg-transparent placeholder:text-gray-300 text-sm font-medium" placeholder="••••••••" onChange={handleChange} value={formData.password} />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-3 text-gray-300 hover:text-primary transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    disabled={!formData.fullName || !formData.email || !formData.password}
                    className="w-full py-4 text-white text-[12px] font-bold tracking-[0.2em] rounded-lg cursor-pointer transition-all shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 mt-8 uppercase bg-primary"
                  >
                    Continue <ChevronRight size={14} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <button onClick={() => setStep(1)} className="group text-[10px] font-black flex items-center gap-1 text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">
                  <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Back
                </button>

                <div>
                  <h1 className="text-2xl font-bold text-gray-800 italic">Shop Details.</h1>
                  <p className="text-gray-400 text-sm mt-1 font-medium">Tell us about your business.</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1 group">
                    <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-gray-500 group-focus-within:text-primary flex items-center gap-2 transition-colors">
                      <Store size={15} strokeWidth={2.5}/> Shop Name
                    </label>
                    <input name="shopName" className="w-full px-0 py-3 border-b-2 border-gray-400 focus:border-primary outline-none transition-all bg-transparent placeholder:text-gray-300 text-sm font-medium" placeholder="My Kirana Store" onChange={handleChange} value={formData.shopName} />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1 group">
                      <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500 group-focus-within:text-primary flex items-center gap-2 transition-colors">
                        <Clock size={12} /> Open
                      </label>
                      <input name="openTime" type="time" className="w-full px-0 py-3 border-b-2 border-gray-400 focus:border-primary outline-none bg-transparent text-sm font-medium transition-all" onChange={handleChange} value={formData.openTime} />
                    </div>
                    <div className="space-y-1 group">
                      <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500 group-focus-within:text-primary flex items-center gap-2 transition-colors">
                        <Clock size={12} /> Close
                      </label>
                      <input name="closeTime" type="time" className="w-full px-0 py-3 border-b-2 border-gray-400 focus:border-primary outline-none bg-transparent text-sm font-medium transition-all" onChange={handleChange} value={formData.closeTime} />
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmit}
                    className="w-full py-4 text-white text-[12px] font-bold tracking-[0.2em] rounded-lg transition-all shadow-lg shadow-primary/25 hover:brightness-110 flex items-center justify-center gap-2 mt-8 uppercase bg-primary"
                  >
                    Launch Shop <Check size={14} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center mt-12 text-[10px] text-gray-400 tracking-[0.2em] font-semibold uppercase">
            Already a member? <Link to="/" className="text-primary font-black ml-1 hover:underline">Login</Link>
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: (Keeping it exactly as you provided) --- */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 bg-gray-50 relative overflow-hidden flex-col justify-center items-center p-12 border-l border-gray-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-[0.35] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-[0.3] rounded-full blur-[80px]"></div>
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="flex flex-col items-center gap-4 mb-16 transition-transform hover:scale-105 duration-500 cursor-default">
             <img src="dukaan-ease-logo.png" alt="" width={'220'}/>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-3 text-left group hover:border-primary transition-all duration-300">
              <Rocket className="text-primary" size={24} />
              <h4 className="text-gray-900 font-black text-[10px] uppercase tracking-widest">Rapid Launch</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Go from zero to sales in less than 5 minutes.</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-3 text-left group hover:border-primary transition-all duration-300">
              <Globe className="text-primary" size={24} />
              <h4 className="text-gray-900 font-black text-[10px] uppercase tracking-widest">Cloud Sync</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Your data, accessible from any device, anywhere.</p>
            </div>
            <div className="col-span-2 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex items-center gap-6 group hover:border-primary transition-all duration-300">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <ClipboardCheck size={24} />
              </div>
              <div className="text-left">
                <h4 className="text-gray-900 font-black text-[10px] uppercase tracking-widest">Ready to go?</h4>
                <p className="text-gray-400 text-[11px]">Join over 2,000+ local shop owners scaling today.</p>
              </div>
              <div className="ml-auto flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                 ))}
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 italic">Scale with Precision.</h3>
          <p className="text-gray-500 text-sm leading-relaxed px-8">
            DukaanEase gives you the tools to manage inventory, track staff, and analyze revenue in real-time.
          </p>
        </div>
        <div className="absolute bottom-10 flex items-center gap-2 text-gray-300 font-bold text-[10px] tracking-[0.2em] uppercase">
          <div className="w-12 h-[1px] bg-gray-200"></div>
          Premium Merchant Tier
          <div className="w-12 h-[1px] bg-gray-200"></div>
        </div>
      </div>

    </div>
  );
};

export default CreateAccount;