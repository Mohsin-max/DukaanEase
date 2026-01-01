// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Login from './pages/auth/Login';
import CreateAccount from './pages/auth/CreateAccount';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Udhaar from './pages/Udhaar';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';
import Categories from './pages/Categories';
import Brands from './pages/Brands';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // const [shopName, setShopName] = useState('');

  const handleLogin = () => {
    setIsAuthenticated(true);
    // setShopName(shopName);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // setShopName('');
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/create-account" element={<CreateAccount onLogin={handleLogin} />} />

            {isAuthenticated ? (
              <Route element={<Sidebar onLogout={handleLogout} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/udhaar" element={<Udhaar />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;