// src/pages/Brands.jsx
import React, { useState } from 'react';
import {
  Star,
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  MoreVertical,
  Check,
  X,
  Globe,
  Phone,
  Mail,
  Award
} from 'lucide-react';

const Brands = () => {
  const [brands, setBrands] = useState([
    { id: 1, name: 'Nestlé', description: 'Food and beverage company', country: 'Switzerland', products: 28, status: 'active' },
    { id: 2, name: 'Unilever', description: 'Consumer goods company', country: 'United Kingdom', products: 32, status: 'active' },
    { id: 3, name: 'PepsiCo', description: 'Food and beverage corporation', country: 'United States', products: 18, status: 'active' },
    { id: 4, name: 'Coca-Cola', description: 'Beverage corporation', country: 'United States', products: 12, status: 'active' },
    { id: 5, name: 'Procter & Gamble', description: 'Consumer goods corporation', country: 'United States', products: 25, status: 'inactive' },
    { id: 6, name: 'Local Brand', description: 'Local Pakistani brand', country: 'Pakistan', products: 15, status: 'active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [newBrand, setNewBrand] = useState({
    name: '',
    description: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
    status: 'active'
  });

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || brand.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (newBrand.name.trim()) {
      const newBrandObj = {
        id: brands.length + 1,
        ...newBrand,
        products: 0
      };
      setBrands([...brands, newBrandObj]);
      setNewBrand({
        name: '',
        description: '',
        country: '',
        contactEmail: '',
        contactPhone: '',
        status: 'active'
      });
      setIsAddModalOpen(false);
    }
  };

  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
    setNewBrand({
      name: brand.name,
      description: brand.description,
      country: brand.country,
      contactEmail: brand.contactEmail || '',
      contactPhone: brand.contactPhone || '',
      status: brand.status
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateBrand = (e) => {
    e.preventDefault();
    if (selectedBrand && newBrand.name.trim()) {
      setBrands(brands.map(brand =>
        brand.id === selectedBrand.id
          ? { ...brand, ...newBrand }
          : brand
      ));
      setIsEditModalOpen(false);
      setSelectedBrand(null);
      setNewBrand({
        name: '',
        description: '',
        country: '',
        contactEmail: '',
        contactPhone: '',
        status: 'active'
      });
    }
  };

  const handleDeleteBrand = (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      setBrands(brands.filter(brand => brand.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active'
      ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
      : 'bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20';
  };

  const getCountryFlag = (country) => {
    const flags = {
      'Switzerland': '🇨🇭',
      'United Kingdom': '🇬🇧',
      'United States': '🇺🇸',
      'Pakistan': '🇵🇰',
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-xl px-4 md:px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Brands Management</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Manage product brands and suppliers</span>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span>{brands.length} brands</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span>{brands.reduce((sum, brand) => sum + brand.products, 0)} total products</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={18} />
            Add Brand
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-100/50 to-purple-50 dark:from-purple-900/20 dark:to-purple-700/10 backdrop-blur-sm border border-purple-300/50 dark:border-purple-400/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total Brands</p>
                <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{brands.length}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-200/80 dark:bg-purple-900/30 border border-purple-400/40">
                <Award size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400">
              +3 this month
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-100/50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-700/10 backdrop-blur-sm border border-emerald-300/50 dark:border-emerald-400/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Active Brands</p>
                <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                  {brands.filter(b => b.status === 'active').length}
                </h3>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-200/80 dark:bg-emerald-900/30 border border-emerald-400/40">
                <Check size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Currently active
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/20 dark:to-blue-700/10 backdrop-blur-sm border border-blue-300/50 dark:border-blue-400/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Countries</p>
                <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                  {[...new Set(brands.map(b => b.country))].length}
                </h3>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-200/80 dark:bg-blue-900/30 border border-blue-400/40">
                <Globe size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-blue-600 dark:text-blue-400">
              Different origins
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-100/50 to-rose-50 dark:from-rose-900/20 dark:to-rose-700/10 backdrop-blur-sm border border-rose-300/50 dark:border-rose-400/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
                <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                  {brands.filter(b => b.status === 'inactive').length}
                </h3>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-200/80 dark:bg-rose-900/30 border border-rose-400/40">
                <X size={20} className="text-rose-600 dark:text-rose-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-rose-600 dark:text-rose-400">
              On hold
            </div>
          </div>
        </div>

        {/* Brands Table */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">All Brands</h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Filter size={18} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Brand</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Description</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Country</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Products</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{brand.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">ID: BR-{brand.id.toString().padStart(3, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-[200px] truncate">
                      {brand.description}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCountryFlag(brand.country)}</span>
                        <span className="text-sm text-gray-900 dark:text-white">{brand.country}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">{brand.products}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">items</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusBadge(brand.status)}`}>
                        {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditBrand(brand)}
                          className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} className="text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(brand.id)}
                          className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-rose-600 dark:text-rose-400" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredBrands.length === 0 && (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Award size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No brands found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try changing your search or filter criteria'
                  : 'Get started by adding your first brand'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Brand
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Brand Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md mx-4 my-8 p-4 md:p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Brand</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create a new product brand</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddBrand} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Nestlé, Coca-Cola, Local Brand"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newBrand.description}
                  onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this brand..."
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newBrand.country}
                    onChange={(e) => setNewBrand({ ...newBrand, country: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Pakistan, USA, UK"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={newBrand.status}
                    onChange={(e) => setNewBrand({ ...newBrand, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={newBrand.contactEmail}
                      onChange={(e) => setNewBrand({ ...newBrand, contactEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="contact@brand.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      value={newBrand.contactPhone}
                      onChange={(e) => setNewBrand({ ...newBrand, contactPhone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Create Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Brand Modal */}
      {isEditModalOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md mx-4 my-8 p-4 md:p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Brand</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">ID: BR-{selectedBrand.id.toString().padStart(3, '0')}</p>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedBrand(null);
                  setNewBrand({
                    name: '',
                    description: '',
                    country: '',
                    contactEmail: '',
                    contactPhone: '',
                    status: 'active'
                  });
                }}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleUpdateBrand} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Nestlé, Coca-Cola, Local Brand"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newBrand.description}
                  onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this brand..."
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newBrand.country}
                    onChange={(e) => setNewBrand({ ...newBrand, country: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Pakistan, USA, UK"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={newBrand.status}
                    onChange={(e) => setNewBrand({ ...newBrand, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={newBrand.contactEmail}
                      onChange={(e) => setNewBrand({ ...newBrand, contactEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="contact@brand.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      value={newBrand.contactPhone}
                      onChange={(e) => setNewBrand({ ...newBrand, contactPhone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedBrand(null);
                    setNewBrand({
                      name: '',
                      description: '',
                      country: '',
                      contactEmail: '',
                      contactPhone: '',
                      status: 'active'
                    });
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Update Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;