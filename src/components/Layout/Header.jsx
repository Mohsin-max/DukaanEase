// src/components/Layout/Header.jsx
import React from 'react';
import { Bell, Search, User, HelpCircle } from 'lucide-react';

const Header = ({ shopName, onLogout, onToggleSidebar }) => {
  const currentTime = new Date().toLocaleTimeString('hi-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{shopName}</h1>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>{currentDate}</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">{currentTime}</span>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>

            {/* Help */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Help">
              <HelpCircle size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative" title="Notifications">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* User profile */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="text-blue-600" size={20} />
              </div>
              <div className="hidden md:block">
                <p className="font-medium">Owner</p>
                <p className="text-sm text-gray-500">{shopName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products, customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="hidden md:flex items-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Today's Sales:</span>
            <span className="font-bold text-green-600">₹15,250</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Pending Credit:</span>
            <span className="font-bold text-red-600">₹8,450</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Stock Alert:</span>
            <span className="font-bold text-yellow-600">3 items</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;