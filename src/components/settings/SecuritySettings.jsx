// src/components/settings/SecuritySettings.jsx
import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import Base_URL from '../../context/Base_Url';
import { getToken, removeToken } from '../../utils/token';
import { toast } from 'react-toastify';

const SecuritySettings = () => {
  const authToken = getToken();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = securitySettings;
    const errors = { currentPassword: '', newPassword: '', confirmPassword: '' };
    
    if (!currentPassword.trim()) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!newPassword.trim()) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: value,
    });
    
    if (passwordErrors[name]) {
      setPasswordErrors({ ...passwordErrors, [name]: '' });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }

    try {
      const res = await axios.post(
        `${Base_URL}/api/auth/change-password`,
        {
          currentPassword: securitySettings.currentPassword,
          newPassword: securitySettings.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      toast.success(res.data.message || 'Password changed successfully!');

      setTimeout(() => {
        removeToken();
        localStorage.removeItem('user');
        window.location.href = '/login';
      }, 2000);

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Password change failed';
      
      if (errorMsg.toLowerCase().includes('current') || errorMsg.toLowerCase().includes('old')) {
        setPasswordErrors(prev => ({
          ...prev,
          currentPassword: errorMsg
        }));
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-500/30">
          <Lock className="text-amber-600 dark:text-amber-400" size={22} />
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Security Settings</h2>
      </div>

      <div className="mb-8">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="currentPassword"
                value={securitySettings.currentPassword}
                onChange={handleSecurityChange}
                className={`w-full pl-9 pr-9 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={securitySettings.newPassword}
                onChange={handleSecurityChange}
                className={`w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                placeholder="Enter new password"
              />
            </div>
            {passwordErrors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={securitySettings.confirmPassword}
                onChange={handleSecurityChange}
                className={`w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                placeholder="Confirm new password"
              />
            </div>
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Password must be at least 6 characters</span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-4 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all font-medium border border-blue-500/30 text-sm"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecuritySettings;