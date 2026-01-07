import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Login from './pages/auth/Login';
import CreateAccount from './pages/auth/CreateAccount';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Udhaar from './pages/Udhaar';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import { ThemeProvider } from './context/ThemeContext';
import axios from 'axios';
import Base_URL from './context/Base_Url';
import { getToken, removeToken, setToken } from './utils/token';
import { removeUserInfo, setUserInfo } from './utils/user';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './pages/ForgetPassword';

// --- Protected Route Component ---
const ProtectedRoute = ({ isAuthenticated }) => {
  // Agar authenticated nahi hai toh foran login pe bhejo
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// --- Public Route Component (Prevent logged-in users from seeing Login page) ---
const PublicRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {

  const authtoken = getToken();


  // 1. Synchronous Check: State bante waqt hi localStorage check karlo
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return authtoken !== null;
  });

  const handleLogin = (token, user) => {
    // localStorage.setItem('authToken', token);
    setToken(token);
    setUserInfo(user); // You can set actual user info here if available
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${Base_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authtoken}`
          }
        }
      );
    } catch (err) {
      console.log('Backend logout failed, clearing anyway');
    } finally {
      removeToken();
      removeUserInfo();
      setIsAuthenticated(false);
    }
  };


  return (

    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        hideProgressBar={false}
        toastClassName={() =>
          `
    flex items-center gap-3
    px-4 py-3 rounded-lg shadow-lg
    text-sm font-medium

    bg-white/20 backdrop-blur-sm text-gray-900 border border-gray-200
    dark:bg-gray-800/20 dark:text-gray-100 dark:border-gray-700
    `
        }
      />


      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes: Agar user login hai toh ye pages nahi dikhenge */}
              <Route
                path="/login"
                element={
                  <PublicRoute isAuthenticated={isAuthenticated}>
                    <Login onLogin={handleLogin} />
                  </PublicRoute>
                }
              />
              <Route
                path="/create-account"
                element={
                  <PublicRoute isAuthenticated={isAuthenticated}>
                    <CreateAccount onLogin={handleLogin} />
                  </PublicRoute>
                }
              />

              <Route
                path="/forgot-password"
                element={
                  <PublicRoute isAuthenticated={isAuthenticated}>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />

              {/* Protected Routes: Sirf login users ke liye */}
              <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route element={<Sidebar onLogout={handleLogout} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/udhaar" element={<Udhaar />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/brands" element={<Brands />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
                </Route>
              </Route>

              {/* Default Redirection */}
              <Route
                path="/"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
              />

              {/* Catch-all: 404 handling */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>


    </>


  );
}

export default App;