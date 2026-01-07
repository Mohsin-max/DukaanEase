// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Store, Bell, Shield, Lock, Palette, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import ShopSettings from '../components/settings/ShopSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import DangerZone from '../components/settings/DangerZone';

const Settings = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('shop');

  const tabs = [
    { id: 'shop', label: 'Shop Settings', icon: <Store size={18} />, color: 'blue' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, color: 'purple' },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={18} />, color: 'emerald' },
    { id: 'security', label: 'Security', icon: <Lock size={18} />, color: 'amber' },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} />, color: 'pink' },
  ];

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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm md:text-base ${activeTab === tab.id
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'shop' && <ShopSettings />}
      {activeTab === 'notifications' && <NotificationSettings />}
      {activeTab === 'privacy' && <PrivacySettings />}
      {activeTab === 'security' && <SecuritySettings />}
      {activeTab === 'appearance' && <AppearanceSettings />}

      {/* Danger Zone */}
      <DangerZone onLogout={onLogout} />
      
    </div>
  );
};

export default Settings;