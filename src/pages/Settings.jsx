// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Save, Upload, Clock, Bell, Shield, User, Mail, Phone, MapPin, Store, Key, Database, CreditCard, Receipt, Globe, Moon, Sun, Eye, EyeOff, Trash2, Download, HardDrive, Smartphone, Palette, Lock, Globe2, AlertCircle, XCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const [shopSettings, setShopSettings] = useState({
    name: 'My Kiarana Store',
    email: 'contact@myshop.com',
    phone: '+91 9876543210',
    address: '123 Main Street, City, State 123456',
    openTime: '09:00',
    closeTime: '21:00',
    gstNumber: '27ABCDE1234F1Z5',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    language: 'English',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    lowStock: true,
    newOrder: true,
    paymentReminder: true,
    dailyReport: false,
    weeklyReport: true,
    monthlyReport: true,
    saleAlert: true,
    creditAlert: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    showSalesData: true,
    showProfitData: true,
    autoLogout: 30,
    backupData: true,
    twoFactorAuth: false,
    showStockLevels: true,
    requirePasswordForDelete: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [activeTab, setActiveTab] = useState('shop');
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');
  const [compactView, setCompactView] = useState(false);
  const [detailedView, setDetailedView] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState({
    number: 'indian',
    date: 'ddmmyyyy'
  });


  // Handle shop settings change
  const handleShopSettingsChange = (e) => {
    const { name, value } = e.target;
    setShopSettings({
      ...shopSettings,
      [name]: value,
    });
  };

  // Handle notification toggle
  const handleNotificationToggle = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  // Handle privacy toggle
  const handlePrivacyToggle = (key) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: typeof privacySettings[key] === 'boolean'
        ? !privacySettings[key]
        : e.target.value,
    });
  };

  // Handle security change
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: value,
    });
  };

  // Handle save all settings
  const handleSave = () => {
    // Save all settings logic here
    const settings = {
      theme,
      numberFormat: selectedFormat.number,
      dateFormat: selectedFormat.date,
      compactView,
      detailedView
    };
    console.log('Settings saved:', settings);
    // Add your save logic here
  };

  const handleReset = () => {
    // Reset to default settings
    toggleTheme('dark');
    setSelectedFormat({ number: 'indian', date: 'ddmmyyyy' });
    setCompactView(false);
    setDetailedView(true);
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert('Logo uploaded successfully!');
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    alert('Password changed successfully!');
    setSecuritySettings({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // Tabs
  const tabs = [
    { id: 'shop', label: 'Shop Settings', icon: <Store size={18} />, color: 'blue' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, color: 'purple' },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={18} />, color: 'emerald' },
    { id: 'security', label: 'Security', icon: <Lock size={18} />, color: 'amber' },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} />, color: 'pink' },
  ];

  // Currencies
  const currencies = ['INR', 'USD', 'EUR', 'GBP', 'AED'];
  const timezones = ['Asia/Kolkata', 'Asia/Dubai', 'America/New_York', 'Europe/London'];
  const languages = ['English', 'Hindi', 'Gujarati', 'Marathi', 'Bengali'];

  return (
  <div className="space-y-6 min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
    {/* Header */}
    <header>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">Customize your shop settings</p>
    </header>

    {/* Tabs */}
    <div className="bg-white dark:bg-gray-900/50 rounded-xl p-2 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm md:text-base ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>

    {/* Shop Settings Tab */}
    {activeTab === 'shop' && (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-500/30">
              <Store className="text-blue-600 dark:text-blue-400" size={22} />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Shop Information</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shop Name *</label>
                <input
                  type="text"
                  name="name"
                  value={shopSettings.name}
                  onChange={handleShopSettingsChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GST Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={shopSettings.gstNumber}
                  onChange={handleShopSettingsChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                  placeholder="27ABCDE1234F1Z5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={shopSettings.email}
                  onChange={handleShopSettingsChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={shopSettings.phone}
                  onChange={handleShopSettingsChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shop Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  name="address"
                  value={shopSettings.address}
                  onChange={handleShopSettingsChange}
                  rows="3"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Opening Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="time"
                    name="openTime"
                    value={shopSettings.openTime}
                    onChange={handleShopSettingsChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Closing Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="time"
                    name="closeTime"
                    value={shopSettings.closeTime}
                    onChange={handleShopSettingsChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                <select
                  name="currency"
                  value={shopSettings.currency}
                  onChange={handleShopSettingsChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                <select
                  name="timezone"
                  value={shopSettings.timezone}
                  onChange={handleShopSettingsChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                <select
                  name="language"
                  value={shopSettings.language}
                  onChange={handleShopSettingsChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Logo */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Shop Logo</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-blue-100/50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center border border-blue-200 dark:border-blue-500/30 flex-shrink-0">
              <Store size={40} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">Upload your shop logo. Recommended size: 400x400px</p>
              <div className="relative">
                <input type="file" id="logo" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                <label
                  htmlFor="logo"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all cursor-pointer border border-blue-500/30 shadow-lg shadow-blue-900/30 text-sm"
                >
                  <Upload size={18} />
                  Upload New Logo
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Notifications Tab */}
    {activeTab === 'notifications' && (
      <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-500/30">
            <Bell className="text-purple-600 dark:text-purple-400" size={22} />
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Notification Settings</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Stock Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div className='w-[60%]'>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Low Stock Alerts</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when stock is low</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('lowStock')}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationSettings.lowStock ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.lowStock ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div className='w-[60%]'>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Out of Stock Alerts</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Immediate notification for out of stock items</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('newOrder')}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationSettings.newOrder ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.newOrder ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Sales & Transactions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div className='w-[60%]'>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">New Sale Alert</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notification for every new sale</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('saleAlert')}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationSettings.saleAlert ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.saleAlert ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div className='w-[60%]'>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Credit Alert</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alert for new credit transactions</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('creditAlert')}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationSettings.creditAlert ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.creditAlert ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Reports</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div className='w-[60%]'>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Daily Report</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Summary of daily sales and performance</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('dailyReport')}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationSettings.dailyReport ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.dailyReport ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div className='w-[60%]'>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Weekly Report</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weekly summary every Monday</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('weeklyReport')}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationSettings.weeklyReport ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.weeklyReport ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div className='w-[60%]'>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Monthly Report</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly performance report</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('monthlyReport')}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationSettings.monthlyReport ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.monthlyReport ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Credit Management</h3>
            <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
              <div className='w-[60%]'>
                <span className="text-gray-900 dark:text-gray-100 font-medium">Payment Reminders</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatic reminders for due payments</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('paymentReminder')}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationSettings.paymentReminder ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.paymentReminder ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Privacy Tab */}
    {activeTab === 'privacy' && (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
              <Shield className="text-emerald-600 dark:text-emerald-400" size={22} />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Privacy & Security</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Data Visibility</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                  <div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">Show Sales Data</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Display sales information on dashboard</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('showSalesData')}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${privacySettings.showSalesData ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacySettings.showSalesData ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                  <div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">Show Profit Data</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Display profit information</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('showProfitData')}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${privacySettings.showProfitData ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacySettings.showProfitData ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                  <div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">Show Stock Levels</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Display current stock levels</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('showStockLevels')}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${privacySettings.showStockLevels ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacySettings.showStockLevels ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                  <div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">Auto Backup Data</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automatically backup data daily</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('backupData')}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${privacySettings.backupData ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacySettings.backupData ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                  <div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">Two-Factor Authentication</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add extra security layer for login</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('twoFactorAuth')}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${privacySettings.twoFactorAuth ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacySettings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                  <div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">Require Password for Delete</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ask for password before deleting records</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyToggle('requirePasswordForDelete')}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${privacySettings.requirePasswordForDelete ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacySettings.requirePasswordForDelete ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Session Settings</h3>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Auto Logout (minutes)</label>
                <select
                  value={privacySettings.autoLogout}
                  onChange={(e) => setPrivacySettings({ ...privacySettings, autoLogout: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                >
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-500/30">
                <Database className="text-blue-600 dark:text-blue-400" size={22} />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Data Management</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700/50 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-all backdrop-blur-sm text-sm">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Export All Data</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Download all shop data as CSV/Excel</div>
                </div>
                <Download size={18} className="text-blue-600 dark:text-blue-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700/50 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-all backdrop-blur-sm text-sm">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Backup Database</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Create a complete backup of your data</div>
                </div>
                <HardDrive size={18} className="text-emerald-600 dark:text-emerald-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-red-100/50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl hover:bg-red-200 dark:hover:bg-red-800/30 transition-all backdrop-blur-sm text-sm">
                <div>
                  <div className="font-medium text-red-700 dark:text-red-300">Clear All Sales Data</div>
                  <div className="text-xs text-red-600 dark:text-red-400">Permanently delete all sales records</div>
                </div>
                <Trash2 size={18} className="text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Security Tab */}
    {activeTab === 'security' && (
      <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-500/30">
            <Lock className="text-amber-600 dark:text-amber-400" size={22} />
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Security Settings</h2>
        </div>

        {/* Change Password */}
        <div className="mb-8">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={securitySettings.currentPassword}
                  onChange={handleSecurityChange}
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={securitySettings.newPassword}
                  onChange={handleSecurityChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={securitySettings.confirmPassword}
                  onChange={handleSecurityChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Password must be at least 8 characters long</span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-4 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all font-medium border border-blue-500/30 shadow-lg shadow-blue-900/30 text-sm"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Security Features */}
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Security Features</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700/50 rounded-xl backdrop-blur-sm">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Login History</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">View recent login activity</div>
              </div>
              <button className="w-full mt-3 sm:mt-0 sm:w-auto px-4 py-2 bg-gray-200 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600/50 transition-all border border-gray-300 dark:border-gray-600/50 text-sm">
                View History
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700/50 rounded-xl backdrop-blur-sm">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Active Sessions</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Manage active login sessions</div>
              </div>
              <button className="w-full mt-3 sm:mt-0 sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all border border-blue-500/30 text-sm">
                Manage Sessions
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700/50 rounded-xl backdrop-blur-sm">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Security Questions</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Set up security questions for account recovery</div>
              </div>
              <button className="w-full mt-3 sm:mt-0 sm:w-auto px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg hover:from-emerald-500 hover:to-emerald-400 transition-all border border-emerald-500/30 text-sm">
                Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Appearance Tab */}
    {activeTab === 'appearance' && (
      <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-pink-100/50 dark:bg-pink-900/30 rounded-lg border border-pink-200 dark:border-pink-500/30">
            <Palette className="text-pink-600 dark:text-pink-400" size={22} />
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Appearance Settings</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Theme</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => toggleTheme('light')}
                className={`flex flex-col items-center p-4 border rounded-xl transition-all backdrop-blur-sm text-sm ${theme === 'light'
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500'
                    : 'bg-gray-100/50 border-gray-300 dark:bg-gray-800/30 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-800/50'
                  }`}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Sun className="text-white" size={24} />
                  </div>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Light</span>
                <span className={`text-xs ${theme === 'light' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {theme === 'light' ? 'Active' : 'Switch to light'}
                </span>
              </button>

              <button
                onClick={() => toggleTheme('dark')}
                className={`flex flex-col items-center p-4 border rounded-xl transition-all backdrop-blur-sm text-sm ${theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-600'
                    : 'bg-gray-100/50 border-gray-300 dark:bg-gray-800/30 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-800/50'
                  }`}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <Moon className="text-gray-300" size={24} />
                  </div>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Dark</span>
                <span className={`text-xs ${theme === 'dark' ? 'text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {theme === 'dark' ? 'Active' : 'Switch to dark'}
                </span>
              </button>

              <button className="flex flex-col items-center p-4 bg-gray-100/50 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700/50 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-all backdrop-blur-sm opacity-60 cursor-not-allowed text-sm">
                <div className="w-16 h-16 bg-blue-100/50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700/50 rounded-lg mb-2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Blue</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Coming soon</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Dashboard Layout</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Compact View</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Show more information in less space</p>
                </div>
                <button
                  onClick={() => { setCompactView(!compactView); if (compactView) setDetailedView(true); }}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${compactView ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${compactView ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors">
                <div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Detailed View</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Show detailed information with more space</p>
                </div>
                <button
                  onClick={() => { setDetailedView(!detailedView); if (detailedView) setCompactView(true); }}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${detailedView ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${detailedView ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Number & Date Format sections same as original with responsive classes */}
          {/* ... (rest same as your original code) ... */}
        </div>
      </div>
    )}

    {/* Save Button */}
    <div className="sticky bottom-6 z-50 bg-white/80 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white tracking-tight">Save Settings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Apply all changes made to settings</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-100/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium backdrop-blur-sm"
            >
              <RefreshCw size={18} className="inline mr-2" />
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl hover:from-emerald-500 hover:to-emerald-400 transition-all font-medium border border-emerald-500/30 shadow-lg shadow-emerald-900/30"
            >
              <Save size={20} />
              Save All Settings
            </button>
          </div>
        </div>
      </div>

    {/* Danger Zone */}
    <div className="bg-red-100/50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 rounded-xl p-5 md:p-6 backdrop-blur-sm dark:backdrop-blur-md">
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-4 tracking-tight">Danger Zone</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-red-100/50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/30 transition-all text-left backdrop-blur-sm text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          Delete All Sales Data
        </button>
        <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-red-100/50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/30 transition-all text-left backdrop-blur-sm text-sm">
          <RefreshCw size={18} className="flex-shrink-0" />
          Reset All Settings to Default
        </button>
        <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all backdrop-blur-sm border border-red-500/30 text-sm">
          <XCircle size={18} className="flex-shrink-0" />
          Delete Account Permanently
        </button>
      </div>
      <p className="text-xs md:text-sm text-red-600 dark:text-red-400 mt-4 flex items-center gap-1">
        <AlertCircle size={16} className="flex-shrink-0" />
        Warning: These actions cannot be undone. Please proceed with caution.
      </p>
    </div>
  </div>
);
};

export default Settings;