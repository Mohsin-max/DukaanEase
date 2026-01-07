// src/components/settings/PrivacySettings.jsx
import React, { useState } from 'react';
import { Shield, Database, Download, HardDrive, Trash2 } from 'lucide-react';

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    showSalesData: true,
    showProfitData: true,
    autoLogout: 30,
    backupData: true,
    twoFactorAuth: false,
    showStockLevels: true,
    requirePasswordForDelete: true,
  });

  const handlePrivacyToggle = (key) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key],
    });
  };

  return (
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

        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md mt-6">
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
  );
};

export default PrivacySettings;