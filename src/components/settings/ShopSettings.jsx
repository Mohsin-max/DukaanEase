// src/components/settings/ShopSettings.jsx
import React, { useState, useEffect } from 'react';
import { Save, Clock, Mail, Phone, MapPin, Store } from 'lucide-react';
import axios from 'axios';
import Base_URL from '../../context/Base_Url';
import { getToken } from '../../utils/token';
import { getUserInfo, setUserInfo } from '../../utils/user';
import { toast } from 'react-toastify';

const ShopSettings = () => {
  const authToken = getToken();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const [shopSettings, setShopSettings] = useState({
    fullName: '',
    shopName: '',
    email: '',
    phone: '',
    address: '',
    openTime: '',
    closeTime: '',
    currency: 'PKR',
  });

  const currencies = ['INR', 'USD', 'PKR'];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!user._id || !authToken) {
        toast.error('Please login again');
        return;
      }

      const response = await axios.get(`${Base_URL}/api/auth/user/${user._id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        }
      });

      if (response.data.success) {
        const userData = response.data.user;
        setShopSettings({
          fullName: userData.fullName || '',
          shopName: userData.shopName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          openTime: userData.openTime || '09:00',
          closeTime: userData.closeTime || '21:00',
          currency: userData.currency || 'PKR',
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shopSettings.fullName.trim()) newErrors.fullName = 'Full name required';
    if (!shopSettings.shopName.trim()) newErrors.shopName = 'Shop name required';
    if (!shopSettings.email.trim()) newErrors.email = 'Email required';
    if (!shopSettings.phone.trim()) newErrors.phone = 'Phone required';
    if (!shopSettings.address.trim()) newErrors.address = 'Address required';
    if (!shopSettings.openTime) newErrors.openTime = 'Open time required';
    if (!shopSettings.closeTime) newErrors.closeTime = 'Close time required';
    if (!shopSettings.currency) newErrors.currency = 'Currency required';

    if (shopSettings.email && !/^\S+@\S+\.\S+$/.test(shopSettings.email)) {
      newErrors.email = 'Enter valid email';
    }

    if (shopSettings.phone && !/^\d{10,15}$/.test(shopSettings.phone)) {
      newErrors.phone = 'Phone must be 10-15 digits';
    }

    if (shopSettings.address && shopSettings.address.length < 10) {
      newErrors.address = 'Address too short (min 10 chars)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShopSettingsChange = (e) => {
    const { name, value } = e.target;
    setShopSettings({ ...shopSettings, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const saveShopSettings = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const user = getUserInfo();
      const token = authToken;

      const response = await axios.put(
        `${Base_URL}/api/auth/user/${user._id}`,
        shopSettings,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setUserInfo(response.data.user);
        toast.success(response.data.message || 'Settings saved!');
        setErrors({});
      }

    } catch (error) {
      const msg = error.response?.data?.message || 'Save failed';
      toast.error(msg);

      if (msg.includes('email')) {
        setErrors({ ...errors, email: msg });
      } else if (msg.includes('phone')) {
        setErrors({ ...errors, phone: msg });
      }

    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    fetchUserData();
    setErrors({});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-100/50 dark:bg-primary/30 rounded-lg border border-blue-200 dark:border-primary/30">
            <Store className="text-blue-600 dark:text-primary" size={22} />
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Shop Information</h2>
        </div>

        <div className="space-y-4">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={shopSettings.fullName}
                onChange={handleShopSettingsChange}
                className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Shop Name *</label>
              <input
                type="text"
                name="shopName"
                value={shopSettings.shopName}
                onChange={handleShopSettingsChange}
                className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${errors.shopName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
              />
              {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  name="email"
                  value={shopSettings.email}
                  onChange={handleShopSettingsChange}
                  className={`w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Phone *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="tel"
                  name="phone"
                  value={shopSettings.phone}
                  onChange={handleShopSettingsChange}
                  className={`w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Address *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <textarea
                name="address"
                value={shopSettings.address}
                onChange={handleShopSettingsChange}
                rows="2"
                className={`w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none text-sm ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
              />
            </div>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Open Time *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="time"
                  name="openTime"
                  value={shopSettings.openTime}
                  onChange={handleShopSettingsChange}
                  className={`w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${errors.openTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
              </div>
              {errors.openTime && <p className="text-red-500 text-xs mt-1">{errors.openTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Close Time *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="time"
                  name="closeTime"
                  value={shopSettings.closeTime}
                  onChange={handleShopSettingsChange}
                  className={`w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${errors.closeTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
              </div>
              {errors.closeTime && <p className="text-red-500 text-xs mt-1">{errors.closeTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Currency *</label>
              <select
                name="currency"
                value={shopSettings.currency}
                onChange={handleShopSettingsChange}
                className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm ${errors.currency ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.currency && <p className="text-red-500 text-xs mt-1">{errors.currency}</p>}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveShopSettings}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSettings;