// src/pages/Categories.jsx
import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronRight, 
  Filter, 
  MoreVertical, 
  AlertCircle,
  Check,
  X,
  Package,
  Layers
} from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Groceries', description: 'Daily grocery items', products: 45, status: 'active', createdAt: '2024-01-15' },
    { id: 2, name: 'Beverages', description: 'Drinks and beverages', products: 28, status: 'active', createdAt: '2024-01-10' },
    { id: 3, name: 'Dairy', description: 'Milk and dairy products', products: 15, status: 'active', createdAt: '2024-01-05' },
    { id: 4, name: 'Snacks', description: 'Chips and snacks', products: 32, status: 'inactive', createdAt: '2023-12-28' },
    { id: 5, name: 'Personal Care', description: 'Personal hygiene products', products: 22, status: 'active', createdAt: '2023-12-20' },
    { id: 6, name: 'Cleaning', description: 'Household cleaning items', products: 18, status: 'active', createdAt: '2023-12-15' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || category.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      const newCat = {
        id: categories.length + 1,
        ...newCategory,
        products: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCat]);
      setNewCategory({ name: '', description: '', status: 'active' });
      setIsAddModalOpen(false);
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      status: category.status
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (selectedCategory && newCategory.name.trim()) {
      setCategories(categories.map(cat =>
        cat.id === selectedCategory.id
          ? { ...cat, ...newCategory }
          : cat
      ));
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      setNewCategory({ name: '', description: '', status: 'active' });
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
      : 'bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-xl px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Categories Management</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Manage product categories and organization</span>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span>{categories.length} categories</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span>{categories.reduce((sum, cat) => sum + cat.products, 0)} total products</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/20 dark:to-blue-700/10 backdrop-blur-sm border border-blue-300/50 dark:border-blue-400/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</p>
                <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{categories.length}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-200/80 dark:bg-blue-900/30 border border-blue-400/40">
                <Layers size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-100/50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-700/10 backdrop-blur-sm border border-emerald-300/50 dark:border-emerald-400/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Active Categories</p>
                <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                  {categories.filter(c => c.status === 'active').length}
                </h3>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-200/80 dark:bg-emerald-900/30 border border-emerald-400/40">
                <Check size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Ready for products
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-100/50 to-amber-50 dark:from-amber-900/20 dark:to-amber-700/10 backdrop-blur-sm border border-amber-300/50 dark:border-amber-400/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                  {categories.reduce((sum, cat) => sum + cat.products, 0)}
                </h3>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-200/80 dark:bg-amber-900/30 border border-amber-400/40">
                <Package size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-blue-600 dark:text-blue-400">
              Across all categories
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-100/50 to-rose-50 dark:from-rose-900/20 dark:to-rose-700/10 backdrop-blur-sm border border-rose-300/50 dark:border-rose-400/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
                <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                  {categories.filter(c => c.status === 'inactive').length}
                </h3>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-200/80 dark:bg-rose-900/30 border border-rose-400/40">
                <AlertCircle size={20} className="text-rose-600 dark:text-rose-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-rose-600 dark:text-rose-400">
              Need attention
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5 backdrop-blur-md">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">All Categories</h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search categories..."
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
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:bg-gray-600 bg-gray-400 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Category</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Description</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Products</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Created</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{category.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">ID: CAT-{category.id.toString().padStart(3, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">{category.products}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">items</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusBadge(category.status)}`}>
                        {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(category.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} className="text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
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
          </div>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Layers size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No categories found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try changing your search or filter criteria'
                  : 'Get started by adding your first category'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Category
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md mx-4 my-8 p-4 md:p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Category</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create a new product category</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Beverages, Snacks, Dairy"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this category..."
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="active"
                      checked={newCategory.status === 'active'}
                      onChange={(e) => setNewCategory({...newCategory, status: e.target.value})}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="inactive"
                      checked={newCategory.status === 'inactive'}
                      onChange={(e) => setNewCategory({...newCategory, status: e.target.value})}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                  </label>
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
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md mx-4 my-8 p-4 md:p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Category</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">ID: CAT-{selectedCategory.id.toString().padStart(3, '0')}</p>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedCategory(null);
                  setNewCategory({ name: '', description: '', status: 'active' });
                }}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Beverages, Snacks, Dairy"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this category..."
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="active"
                      checked={newCategory.status === 'active'}
                      onChange={(e) => setNewCategory({...newCategory, status: e.target.value})}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="inactive"
                      checked={newCategory.status === 'inactive'}
                      onChange={(e) => setNewCategory({...newCategory, status: e.target.value})}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedCategory(null);
                    setNewCategory({ name: '', description: '', status: 'active' });
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;