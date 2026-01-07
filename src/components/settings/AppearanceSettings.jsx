// src/components/settings/AppearanceSettings.jsx
import React, { useState } from 'react';
import { Palette, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const [compactView, setCompactView] = useState(false);
  const [detailedView, setDetailedView] = useState(true);

  return (
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
      </div>
    </div>
  );
};

export default AppearanceSettings;