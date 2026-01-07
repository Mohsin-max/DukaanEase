// src/components/Layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getUserInfo } from '../../utils/user';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {

    let user = getUserInfo();
    if (user) {
      setUser(user);
    }
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/inventory', icon: <Package size={20} />, label: 'Inventory' },
    { path: '/sales', icon: <ShoppingCart size={20} />, label: 'Sales' },
    { path: '/brands', icon: <Award size={20} />, label: 'Brands' },
    { path: '/categories', icon: <Layers size={20} />, label: 'Categories' },
    { path: '/udhaar', icon: <CreditCard size={20} />, label: 'Udhaar' },
    { path: '/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* SIDEBAR */}
      {isSidebarOpen && (
        <div
          className={`${isMobile ? 'fixed inset-0 z-50' : 'relative'}
          ${isCollapsed ? 'w-20' : 'w-64'}
          bg-white dark:bg-gray-900/50 backdrop-blur-md
          border-r border-gray-200 dark:border-gray-700/50
          transition-all duration-300`}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex flex-col items-center space-y-2 w-full">
                <img
                  src="dukaan-ease-logo.png"
                  alt=""
                  width={150}
                  className="bg-white py-1 px-2 rounded-md"
                />
                <h2 className="font-semibold text-md text-center text-gray-950 dark:text-white tracking-tight">
                  {user?.shopName}
                </h2>
              </div>
            )}

            {isCollapsed && (
              <img
                src="dukaan-ease-logo-icon.png"
                alt=""
                width={40}
                className="mx-auto bg-white p-1 rounded-md"
              />
            )}

            {/* Collapse Toggle */}
            {!isMobile && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-white dark:text-white text-gray-950 dark:bg-gray-800 border border-gray-500 dark:border-gray-950 rounded-full p-1 shadow"
              >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            )}

            {isMobile && (
              <button onClick={() => setIsSidebarOpen(false)}>
                <X size={20} />
              </button>
            )}
          </div>

          {/* NAV */}
          <nav className="p-3 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'
                  } px-4 py-3 rounded-lg transition-all
                  ${isActive
                    ? 'bg-[#FF123C15] text-primary border-l-4 border-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-[#FF123C15]'
                  }`
                }
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* LOGOUT */}
          <div className="absolute bottom-0 w-full p-4 border-t">
            <button
              onClick={handleLogout}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'
                } px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full`}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      )}

      {/* MOBILE HEADER */}
      {isMobile && !isSidebarOpen && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="font-bold">DukaanEase</h1>
            <div className="w-6" />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className={`flex-1 overflow-auto ${isMobile ? 'pt-16' : ''}`}>
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
