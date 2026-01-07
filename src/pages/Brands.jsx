// src/pages/Brands.jsx
import React, { useState, useRef } from 'react';
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
  Award,
  Download,
  Upload,
  FileSpreadsheet
} from 'lucide-react';
import * as XLSX from 'xlsx';

const Brands = () => {
  const [brands, setBrands] = useState([
    { id: 1, name: 'Nestlé', products: 28, status: 'active' },
    { id: 2, name: 'Unilever', products: 32, status: 'active' },
    { id: 3, name: 'PepsiCo', products: 18, status: 'active' },
    { id: 4, name: 'Coca-Cola', products: 12, status: 'active' },
    { id: 5, name: 'Procter & Gamble', products: 25, status: 'inactive' },
    { id: 6, name: 'Local Brand', products: 15, status: 'active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bulkData, setBulkData] = useState([]);
  const fileInputRef = useRef(null);

  const [newBrand, setNewBrand] = useState({
    name: '',
    contactEmail: '',
    contactPhone: '',
    status: 'active'
  });

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
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

  // Handle file upload for bulk add
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Map Excel columns to our brand structure
      const mappedData = jsonData.map((row, index) => ({
        id: Date.now() + index,
        name: row['Brand Name'] || row['Name'] || row['Brand'] || '',
        status: (row['Status'] || 'active').toLowerCase(),
        products: parseInt(row['Products'] || row['Product Count'] || 0),
        contactEmail: row['Contact Email'] || row['Email'] || '',
        contactPhone: row['Contact Phone'] || row['Phone'] || '',
      }));

      setBulkData(mappedData);
      setIsUploading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle bulk import
  const handleBulkImport = () => {
    if (bulkData.length === 0) return;

    // Add all brands from bulk data
    setBrands(prev => [...prev, ...bulkData]);
    setBulkData([]);
    setIsBulkModalOpen(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle export to Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(brands.map(b => ({
      'Brand Name': b.name,
      'Status': b.status,
      'Products': b.products,
      'Contact Email': b.contactEmail || '',
      'Contact Phone': b.contactPhone || ''
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Brands');
    XLSX.writeFile(workbook, `Brands_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden p-4 space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Brands Management</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">Manage your product brands and suppliers</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md text-sm whitespace-nowrap"
          >
            <Download size={18} />
            <span className="sm:inline">Export</span>
          </button>
          <button 
            onClick={() => setIsBulkModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md text-sm whitespace-nowrap"
          >
            <Upload size={18} />
            <span className="sm:inline">Bulk Add</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-5 rounded-md hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg shadow-blue-900/30 text-sm whitespace-nowrap"
          >
            <Plus size={18} />
            <span className="sm:inline">Add New Brand</span>
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-100/50 to-purple-50 dark:from-purple-900/20 dark:to-purple-700/10 backdrop-blur-sm border border-purple-300/50 dark:border-purple-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-purple-500/10 ring-1 ring-purple-400/20 dark:ring-purple-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">Total Brands</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{brands.length}</h3>
            </div>
            <div className="p-3 bg-purple-100/80 dark:bg-purple-900/40 rounded-lg border border-purple-300/50 dark:border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Award className="text-purple-600 dark:text-purple-400" size={22} />
            </div>
          </div>
          <div className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 mt-2">
            +3 this month
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-100/50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-700/10 backdrop-blur-sm border border-emerald-300/50 dark:border-emerald-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/20 dark:ring-emerald-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">Active Brands</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {brands.filter(b => b.status === 'active').length}
              </h3>
            </div>
            <div className="p-3 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg border border-emerald-300/50 dark:border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Check className="text-emerald-600 dark:text-emerald-400" size={22} />
            </div>
          </div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Currently active
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-100/50 to-rose-50 dark:from-rose-900/20 dark:to-rose-700/10 backdrop-blur-sm border border-rose-300/50 dark:border-rose-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-rose-500/10 ring-1 ring-rose-400/20 dark:ring-rose-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">Inactive Brands</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {brands.filter(b => b.status === 'inactive').length}
              </h3>
            </div>
            <div className="p-3 bg-rose-100/80 dark:bg-rose-900/40 rounded-lg border border-rose-300/50 dark:border-rose-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <X className="text-rose-600 dark:text-rose-400" size={22} />
            </div>
          </div>
          <div className="text-xs md:text-sm text-rose-600 dark:text-rose-400 mt-2">
            On hold
          </div>
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative min-w-[140px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Brands Table */}
        <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[200px]">
                  Brand Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Products</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-900 dark:text-white text-sm whitespace-nowrap">
                        {brand.name}
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 whitespace-nowrap">
                        ID: BR-{brand.id.toString().padStart(3, '0')}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {brand.products}
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      items
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-col space-y-1 whitespace-nowrap">
                      {brand.contactEmail && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <Mail size={10} />
                          {brand.contactEmail}
                        </div>
                      )}
                      {brand.contactPhone && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <Phone size={10} />
                          {brand.contactPhone}
                        </div>
                      )}
                      {!brand.contactEmail && !brand.contactPhone && (
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          No contact info
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusBadge(brand.status)}`}>
                      {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBrands.length === 0 && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <Award size={40} className="mx-auto mb-3 text-gray-400 dark:text-gray-600" />
              <p className="text-sm font-medium">No brands found</p>
              <p className="text-xs mt-1">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try changing your search or filter criteria'
                  : 'Get started by adding your first brand'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Brand Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)} />
          
          <div className="relative w-full max-w-lg my-auto">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Add New Brand
                  </h2>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    ✕
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
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                      placeholder="e.g., Nestlé, Coca-Cola, Local Brand"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={newBrand.contactEmail}
                        onChange={(e) => setNewBrand({ ...newBrand, contactEmail: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                        placeholder="brand@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={newBrand.contactPhone}
                        onChange={(e) => setNewBrand({ ...newBrand, contactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                        placeholder="+92 300 1234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={newBrand.status}
                      onChange={(e) => setNewBrand({ ...newBrand, status: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg shadow-blue-900/30 text-sm"
                    >
                      Add Brand
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Brand Modal */}
      {isEditModalOpen && selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md" onClick={() => {
            setIsEditModalOpen(false);
            setSelectedBrand(null);
          }} />
          
          <div className="relative w-full max-w-lg my-auto">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Edit Brand
                  </h2>
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedBrand(null);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    ✕
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
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                      placeholder="e.g., Nestlé, Coca-Cola, Local Brand"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={newBrand.contactEmail}
                        onChange={(e) => setNewBrand({ ...newBrand, contactEmail: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                        placeholder="brand@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={newBrand.contactPhone}
                        onChange={(e) => setNewBrand({ ...newBrand, contactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                        placeholder="+92 300 1234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={newBrand.status}
                      onChange={(e) => setNewBrand({ ...newBrand, status: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setSelectedBrand(null);
                      }}
                      className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg shadow-blue-900/30 text-sm"
                    >
                      Update Brand
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Add Modal - SAME DESIGN AS INVENTORY */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
          {/* Backdrop - Glass effect */}
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md"
            onClick={() => {
              setIsBulkModalOpen(false);
              setBulkData([]);
            }}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg my-auto">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Bulk Add Brands
                  </h2>
                  <button
                    onClick={() => {
                      setIsBulkModalOpen(false);
                      setBulkData([]);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Instructions */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Instructions:</h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc pl-4">
                      <li>Upload an Excel file (.xlsx or .xls) with brand data</li>
                      <li>Required columns: Brand Name</li>
                      <li>Optional columns: Status, Products, Contact Email, Contact Phone</li>
                      <li>First row should contain column headers</li>
                    </ul>
                    <div className="mt-3">
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          // Create sample Excel data
                          const sampleData = [
                            ['Brand Name', 'Status', 'Products', 'Contact Email', 'Contact Phone'],
                            ['Example Brand 1', 'active', 0, 'contact1@brand.com', '+92 300 1234567'],
                            ['Example Brand 2', 'inactive', 0, 'contact2@brand.com', '+92 300 7654321']
                          ];
                          
                          const ws = XLSX.utils.aoa_to_sheet(sampleData);
                          const wb = XLSX.utils.book_new();
                          XLSX.utils.book_append_sheet(wb, ws, "Sample");
                          XLSX.writeFile(wb, "brands_sample_template.xlsx");
                        }}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Download sample template to get started
                      </a>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center">
                    <FileSpreadsheet size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      click to browse
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="bulk-upload-brands"
                    />
                    <label
                      htmlFor="bulk-upload-brands"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm cursor-pointer"
                    >
                      Browse Files
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Supported formats: .xlsx, .xls
                    </p>
                  </div>

                  {/* Preview */}
                  {bulkData.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Preview ({bulkData.length} brands found)
                      </h3>
                      <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Brand Name</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Status</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bulkData.slice(0, 5).map((item, index) => (
                              <tr key={index} className="border-t border-gray-100 dark:border-gray-700/50">
                                <td className="py-2 px-3 text-gray-900 dark:text-white">{item.name}</td>
                                <td className="py-2 px-3">
                                  <span className={`px-2 py-1 rounded text-xs ${item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                                  {item.contactEmail || 'N/A'}
                                </td>
                              </tr>
                            ))}
                            {bulkData.length > 5 && (
                              <tr className="border-t border-gray-100 dark:border-gray-700/50">
                                <td colSpan="4" className="py-2 px-3 text-center text-xs text-gray-500 dark:text-gray-400">
                                  ... and {bulkData.length - 5} more brands
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Loading State */}
                  {isUploading && (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Processing file...</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsBulkModalOpen(false);
                        setBulkData([]);
                      }}
                      className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleBulkImport}
                      disabled={bulkData.length === 0 || isUploading}
                      className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm ${bulkData.length === 0 || isUploading
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-900/30'
                        }`}
                    >
                      {isUploading ? 'Processing...' : `Import ${bulkData.length} Brands`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;