// src/components/settings/NotificationSettings.jsx
import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationSettings = () => {
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

  const handleNotificationToggle = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  return (
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
  );
};

export default NotificationSettings;