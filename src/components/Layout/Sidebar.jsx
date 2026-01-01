// src/components/Layout/Sidebar.jsx
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Award,
  Layers,
} from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/inventory', icon: <Package size={20} />, label: 'Inventory' },
    { path: '/sales', icon: <ShoppingCart size={20} />, label: 'Sales' },
    { path: '/brands', icon: <Award size={20} />, label: 'Brands' }, // Award icon for Brand identity
    { path: '/categories', icon: <Layers size={20} />, label: 'Categories' }, // Layers for grouping
    { path: '/udhaar', icon: <CreditCard size={20} />, label: 'Udhaar' },
    { path: '/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar for desktop */}
      {isSidebarOpen && (
        <div className={`${isMobile ? 'fixed inset-0 z-50' : 'relative'} w-64 bg-white dark:bg-gray-900/50 backdrop-blur-md border-r border-gray-200 dark:border-gray-700/50`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700/50">
            <div className="flex flex-col items-center space-y-4">
              <img src="dukaan-ease-logo.png" alt="" width={'160'} className='bg-white py-1 px-2 rounded-md' />
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white tracking-tight">My Kirana Store</h2>
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all hover:bg-[#FF123C15] dark:hover:bg-gray-800/50 hover:border-l-4 hover:border-primary dark:hover:border-blue-500/50 ${isActive
                    ? 'bg-[#FF123C15] dark:bg-gray-800/30 text-primary dark:text-blue-400 border-l-4 border-primary dark:border-blue-500/50'
                    : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700/50">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full transition-all hover:border-l-4 hover:border-red-400 dark:hover:border-red-500/50"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile header */}
      {isMobile && !isSidebarOpen && (
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900/50 backdrop-blur-md shadow-sm z-40 border-b border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">DukaanEase</h1>
            <div className="w-10"></div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 overflow-auto ${isMobile ? 'pt-16' : ''}`}>
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;