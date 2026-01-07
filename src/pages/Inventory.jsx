// src/pages/Inventory.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Edit2, Trash2, Package, AlertTriangle, Filter, Download, Upload, TrendingUp, TrendingDown, Calendar, Tag, MoreVertical, Barcode, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

const Inventory = () => {
  // All Pakistani brands - independent of categories
  const brands = [
    'No Brand',
    'Shan',
    'National',
    'Young\'s',
    'Meezan',
    'Knorr',
    'Tapal',
    'Lipton',
    'Nestle',
    'Pepsi',
    'Coca-Cola',
    'Surf Excel',
    'Ariel',
    'Colgate',
    'Sunsilk',
    'Unilever',
    'Engro',
    'Rafhan',
    'Britannia',
    'PepsiCo',
    'Qarshi',
    'Mitchell\'s',
    'Mansalwa',
    'Shezan',
    'Fauji',
    'K&N\'s',
    'Dawn',
    'Gourmet',
    'Hico',
    'Sufi',
    'Habib',
  ];

  const [products, setProducts] = useState([
    { id: 1, name: 'Aata (5kg)', brand: 'No Brand', category: 'Kirana', quantity: 15, price: 400, purchasePrice: 350, expiryDate: '2027-12-31', barcode: '8901234567890' },
    { id: 2, name: 'Chawal (10kg)', brand: 'No Brand', category: 'Kirana', quantity: 8, price: 600, purchasePrice: 520, expiryDate: '2026-06-30', barcode: '8901234567891' },
    { id: 3, name: 'Tikka Masala (100g)', brand: 'Shan', category: 'Spices', quantity: 24, price: 180, purchasePrice: 150, expiryDate: '2025-12-31', barcode: '8901234567892' },
    { id: 4, name: 'Biryani Masala (200g)', brand: 'National', category: 'Spices', quantity: 18, price: 220, purchasePrice: 180, expiryDate: '2026-08-20', barcode: '8901234567893' },
    { id: 5, name: 'Ketchup (500g)', brand: 'Young\'s', category: 'Sauces', quantity: 12, price: 150, purchasePrice: 120, expiryDate: '2026-11-30', barcode: '8901234567894' },
    { id: 6, name: 'Danedar Tea (250g)', brand: 'Tapal', category: 'Beverages', quantity: 25, price: 320, purchasePrice: 280, expiryDate: '2025-03-15', barcode: '8901234567895' },
    { id: 7, name: 'Yellow Label Tea (250g)', brand: 'Lipton', category: 'Beverages', quantity: 15, price: 300, purchasePrice: 250, expiryDate: '2026-09-10', barcode: '8901234567896' },
    { id: 8, name: 'Toothpaste (100g)', brand: 'Colgate', category: 'Personal Care', quantity: 30, price: 120, purchasePrice: 90, expiryDate: '2025-08-15', barcode: '8901234567897' },
    { id: 9, name: 'Milk Powder (400g)', brand: 'Nestle', category: 'Dairy', quantity: 6, price: 450, purchasePrice: 380, expiryDate: '2024-12-01', barcode: '8901234567898' },
    { id: 10, name: 'Noodles (70g)', brand: 'Knorr', category: 'Instant Food', quantity: 20, price: 25, purchasePrice: 18, expiryDate: '2024-07-25', barcode: '8901234567899' },
    { id: 11, name: 'Kheer Mix (200g)', brand: 'National', category: 'Food', quantity: 14, price: 280, purchasePrice: 230, expiryDate: '2025-01-31', barcode: '8901234567800' },
    { id: 12, name: 'Cooking Oil (1L)', brand: 'Meezan', category: 'Oil', quantity: 8, price: 320, purchasePrice: 280, expiryDate: '2024-05-15', barcode: '8901234567801' },
    { id: 13, name: 'Detergent (1kg)', brand: 'Surf Excel', category: 'Cleaning', quantity: 9, price: 280, purchasePrice: 220, expiryDate: '2026-02-28', barcode: '8901234567802' },
    { id: 14, name: 'Biscuits (200g)', brand: 'Britannia', category: 'Bakery', quantity: 25, price: 80, purchasePrice: 60, expiryDate: '2024-11-30', barcode: '8901234567803' },
    { id: 15, name: 'Soft Drink (1.5L)', brand: 'Pepsi', category: 'Beverages', quantity: 35, price: 120, purchasePrice: 95, expiryDate: '2024-08-15', barcode: '8901234567804' },
    { id: 16, name: 'Milk (1L)', brand: 'Engro', category: 'Dairy', quantity: 20, price: 180, purchasePrice: 150, expiryDate: '2024-06-30', barcode: '8901234567805' },
    { id: 17, name: 'Corn Flour (500g)', brand: 'Rafhan', category: 'Food', quantity: 12, price: 160, purchasePrice: 130, expiryDate: '2025-03-31', barcode: '8901234567806' },
    { id: 18, name: 'Shampoo (400ml)', brand: 'Sunsilk', category: 'Personal Care', quantity: 18, price: 450, purchasePrice: 380, expiryDate: '2025-09-15', barcode: '8901234567807' },
    { id: 19, name: 'Detergent (2kg)', brand: 'Ariel', category: 'Cleaning', quantity: 7, price: 650, purchasePrice: 550, expiryDate: '2025-11-30', barcode: '8901234567808' },
    { id: 20, name: 'Soft Drink (2.25L)', brand: 'Coca-Cola', category: 'Beverages', quantity: 28, price: 150, purchasePrice: 120, expiryDate: '2024-07-31', barcode: '8901234567809' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedExpiryFilter, setSelectedExpiryFilter] = useState('all');
  const [openActionsId, setOpenActionsId] = useState(null);
  const [bulkData, setBulkData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ['All', 'Kirana', 'Spices', 'Oil', 'Beverages', 'Bakery', 'Stationery', 'Dairy', 'Instant Food', 'Personal Care', 'Food', 'Cleaning', 'Sauces', 'Others'];

  const [formData, setFormData] = useState({
    name: '',
    brand: 'No Brand',
    category: 'Kirana',
    purchasePrice: '',
    salePrice: '',
    quantity: '',
    expiryDate: '',
    barcode: '',
  });

  // Generate random barcode
  const generateBarcode = () => {
    return '89' + Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  // Handle brand selection - auto-fill product name
  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    const currentName = formData.name;

    // Remove previous brand name if it exists
    let newName = currentName;
    brands.forEach(brand => {
      if (brand !== 'No Brand' && currentName.startsWith(brand + ' ')) {
        newName = currentName.substring(brand.length + 1);
      }
    });

    // Add new brand name if not 'No Brand'
    if (selectedBrand !== 'No Brand' && !newName.startsWith(selectedBrand)) {
      newName = `${selectedBrand} ${newName}`.trim();
    }

    setFormData(prev => ({
      ...prev,
      brand: selectedBrand,
      name: newName
    }));
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle barcode generation
  const handleGenerateBarcode = () => {
    setFormData(prev => ({
      ...prev,
      barcode: generateBarcode()
    }));
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchTerm));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;

    // Expiry filter logic
    let matchesExpiry = true;
    const today = new Date();
    const productExpiryDate = product.expiryDate ? new Date(product.expiryDate) : null;

    switch (selectedExpiryFilter) {
      case 'expired':
        matchesExpiry = productExpiryDate && productExpiryDate < today;
        break;
      case 'expiring_soon':
        if (productExpiryDate) {
          const thirtyDaysFromNow = new Date();
          thirtyDaysFromNow.setDate(today.getDate() + 30);
          matchesExpiry = productExpiryDate >= today && productExpiryDate <= thirtyDaysFromNow;
        } else {
          matchesExpiry = false;
        }
        break;
      case 'no_expiry':
        matchesExpiry = !product.expiryDate || product.expiryDate === '';
        break;
      default:
        matchesExpiry = true;
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesExpiry;
  });

  // Handle add/edit product
  const handleAddProduct = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      id: editingProduct?.id || Date.now(),
      price: parseFloat(formData.salePrice),
      purchasePrice: parseFloat(formData.purchasePrice) || 0,
      quantity: parseInt(formData.quantity) || 0,
      expiryDate: formData.expiryDate || '',
      barcode: formData.barcode || generateBarcode(),
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts([...products, productData]);
    }

    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: 'No Brand',
      category: 'Kirana',
      purchasePrice: '',
      salePrice: '',
      quantity: '',
      expiryDate: '',
      barcode: '',
    });
  };

  // Handle edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      purchasePrice: product.purchasePrice,
      salePrice: product.price,
      quantity: product.quantity,
      expiryDate: product.expiryDate || '',
      barcode: product.barcode || '',
    });
    setIsModalOpen(true);
    setOpenActionsId(null);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Kya aap is product ko delete karna chahte hain?')) {
      setProducts(products.filter(p => p.id !== id));
      setOpenActionsId(null);
    }
  };

  // Toggle actions menu
  const toggleActionsMenu = (id) => {
    setOpenActionsId(openActionsId === id ? null : id);
  };

  // Close actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.actions-menu')) {
        setOpenActionsId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Get stock badge
  const getStockBadge = (quantity) => {
    if (quantity <= 0) {
      return (
        <span className="px-2 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded font-medium flex items-center gap-1 text-sm backdrop-blur-sm">
          Out of Stock
        </span>
      );
    } else if (quantity < 5) {
      return (
        <span className="px-2 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 rounded font-medium flex items-center gap-1 text-sm backdrop-blur-sm">
          Low Stock
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-400 dark:border-emerald-500/20 rounded font-medium flex items-center gap-1 text-sm backdrop-blur-sm">
          In Stock
        </span>
      );
    }
  };

  // Get expiry badge
  const getExpiryBadge = (expiryDate) => {
    if (!expiryDate || expiryDate === '') {
      return (
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-500/20 rounded font-medium text-xs backdrop-blur-sm">
          No Exp
        </span>
      );
    }

    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <span className="px-1.5 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded font-medium text-sm backdrop-blur-sm">
          Expired
        </span>
      );
    } else if (diffDays <= 30) {
      return (
        <span className="px-1.5 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 rounded font-medium text-sm backdrop-blur-sm">
          Exp Soon
        </span>
      );
    } else {
      return (
        <span className="px-1.5 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded font-medium text-sm backdrop-blur-sm">
          Valid
        </span>
      );
    }
  };

  // Format expiry date
  const formatExpiryDate = (expiryDate) => {
    if (!expiryDate || expiryDate === '') return 'N/A';

    const date = new Date(expiryDate);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const formattedDate = date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    if (diffDays < 0) {
      return <span className="text-red-600 dark:text-red-400">{formattedDate}</span>;
    } else if (diffDays <= 30) {
      return <span className="text-amber-600 dark:text-amber-400">{formattedDate}</span>;
    } else {
      return <span className="text-gray-700 dark:text-gray-300">{formattedDate}</span>;
    }
  };

  // Format barcode for display
  const formatBarcode = (barcode) => {
    if (!barcode) return 'N/A';
    // Add spaces for better readability
    return barcode.replace(/(\d{3})(\d{4})(\d{4})(\d{3})/, '$1 $2 $3 $4');
  };

  // Calculate profit
  const calculateProfit = (item) => {
    if (item.purchasePrice && item.price) {
      const profit = item.price - item.purchasePrice;
      const profitPercentage = item.purchasePrice > 0 ? ((profit / item.purchasePrice) * 100).toFixed(1) : 0;
      return { profit, profitPercentage };
    }
    return { profit: 0, profitPercentage: 0 };
  };

  // Statistics
  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
    lowStockItems: products.filter(p => p.quantity < 5).length,
    outOfStock: products.filter(p => p.quantity === 0).length,
    expiredItems: products.filter(p => {
      if (!p.expiryDate || p.expiryDate === '') return false;
      return new Date(p.expiryDate) < new Date();
    }).length,
    expiringSoon: products.filter(p => {
      if (!p.expiryDate || p.expiryDate === '') return false;
      const expiry = new Date(p.expiryDate);
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      return expiry >= today && expiry <= thirtyDaysFromNow;
    }).length,
    averageProfit: products.reduce((sum, p) => sum + (p.price - p.purchasePrice), 0) / products.length,
  };

  // Handle bulk upload
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

      // Map Excel columns to our product structure
      const mappedData = jsonData.map((row, index) => ({
        id: Date.now() + index,
        name: row['Product Name'] || row['Name'] || row['Product'] || '',
        brand: row['Brand'] || 'No Brand',
        category: row['Category'] || row['Type'] || 'Kirana',
        quantity: parseInt(row['Quantity'] || row['Qty'] || 0),
        price: parseFloat(row['Price'] || row['Sale Price'] || 0),
        purchasePrice: parseFloat(row['Purchase Price'] || row['Cost'] || 0),
        expiryDate: row['Expiry Date'] || row['Expiry'] || '',
        barcode: row['Barcode'] || row['SKU'] || generateBarcode(),
      }));

      setBulkData(mappedData);
      setIsUploading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle bulk import
  const handleBulkImport = () => {
    if (bulkData.length === 0) return;

    // Add all products from bulk data
    setProducts(prev => [...prev, ...bulkData]);
    setBulkData([]);
    setIsBulkModalOpen(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle export to Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(products.map(p => ({
      'Product Name': p.name,
      'Brand': p.brand,
      'Category': p.category,
      'Quantity': p.quantity,
      'Price': p.price,
      'Purchase Price': p.purchasePrice,
      'Expiry Date': p.expiryDate,
      'Barcode': p.barcode,
      'Status': p.quantity <= 0 ? 'Out of Stock' : p.quantity < 5 ? 'Low Stock' : 'In Stock'
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
    XLSX.writeFile(workbook, `Inventory_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6 min-h-screen p-4 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Stock Management</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">Manage your inventory with ease</p>
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
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-5 rounded-md hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg shadow-blue-900/30 text-sm whitespace-nowrap"
          >
            <Plus size={18} />
            <span className="sm:inline">Add New Product</span>
          </button>
        </div>
      </header>

      {/* Stats Cards - With Expiry Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Products - Blue Glow */}
        <div className="bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/20 dark:to-blue-700/10 backdrop-blur-sm border border-blue-300/50 dark:border-blue-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/20 dark:ring-blue-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">Total Products</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalProducts}</h3>
            </div>
            <div className="p-3 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg border border-blue-300/50 dark:border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Package className="text-blue-600 dark:text-blue-400" size={22} />
            </div>
          </div>
        </div>

        {/* Total Stock Value - Emerald Glow */}
        <div className="bg-gradient-to-br from-emerald-100/50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-700/10 backdrop-blur-sm border border-emerald-300/50 dark:border-emerald-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/20 dark:ring-emerald-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">Total Stock Value</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalValue.toLocaleString()} <span className="text-gray-600 dark:text-gray-400 text-sm">Rs</span></h3>
            </div>
            <div className="p-3 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg border border-emerald-300/50 dark:border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <TrendingUp className="text-emerald-600 dark:text-emerald-400" size={22} />
            </div>
          </div>
        </div>

        {/* Low Stock Items - Amber Glow */}
        <div className="bg-gradient-to-br from-amber-100/50 to-amber-50 dark:from-amber-900/20 dark:to-amber-700/10 backdrop-blur-sm border border-amber-300/50 dark:border-amber-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/20 dark:ring-amber-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">Low Stock Items</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.lowStockItems}</h3>
            </div>
            <div className="p-3 bg-amber-100/80 dark:bg-amber-900/40 rounded-lg border border-amber-300/50 dark:border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <AlertTriangle className="text-amber-600 dark:text-amber-400" size={22} />
            </div>
          </div>
        </div>

        {/* Expired Items - Red Glow */}
        <div className="bg-gradient-to-br from-red-100/50 to-red-50 dark:from-red-900/20 dark:to-red-700/10 backdrop-blur-sm border border-red-300/50 dark:border-red-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-red-500/10 ring-1 ring-red-400/20 dark:ring-red-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">Expired Items</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.expiredItems}</h3>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{stats.expiringSoon} expiring soon</p>
            </div>
            <div className="p-3 bg-red-100/80 dark:bg-red-900/40 rounded-lg border border-red-300/50 dark:border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <Calendar className="text-red-600 dark:text-red-400" size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products, brands, categories or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative min-w-[140px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="relative min-w-[140px]">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm appearance-none"
              >
                <option value="all">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="relative min-w-[140px]">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedExpiryFilter}
                onChange={(e) => setSelectedExpiryFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm appearance-none"
              >
                <option value="all">All Items</option>
                <option value="expired">Expired</option>
                <option value="expiring_soon">Expiring Soon (30 days)</option>
                <option value="no_expiry">No Expiry</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table - Mobile Friendly */}
        <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                {/* Item Name Header */}
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm min-w-[200px]">
                  Item Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Barcode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Brand</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Qty</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">P & L</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Expiry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const { profit } = calculateProfit(product);

                return (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    {/* Item Name */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-900 dark:text-white text-sm whitespace-nowrap">
                          {product.name}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 whitespace-nowrap">
                          SKU: PROD-{product.id.toString().padStart(3, '0')}
                        </div>
                      </div>
                    </td>

                    {/* Barcode - NEW COLUMN */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col space-y-1 whitespace-nowrap">
                        <div className="font-mono text-xs text-gray-700 dark:text-gray-300">
                          {formatBarcode(product.barcode)}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Barcode size={10} />
                          Barcode
                        </div>
                      </div>
                    </td>

                    {/* Brand */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-[12px] tracking-wide font-semibold rounded border whitespace-nowrap inline-block ${product.brand === 'No Brand'
                          ? 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600'
                          : 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-700'
                        }`}>
                        {product.brand}
                      </span>
                    </td>

                    {/* Category Column */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-[12px] font-semibold bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-700 rounded border whitespace-nowrap inline-block">
                        {product.category}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {product.quantity}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-900 dark:text-white text-sm whitespace-nowrap">Rs {product.price}</div>
                        {product.purchasePrice > 0 && (
                          <div className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            Cost: Rs {product.purchasePrice}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Profit */}
                    <td className="py-3 px-4">
                      <div className={`font-medium text-sm flex items-center gap-1 whitespace-nowrap ${profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                        {profit >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        Rs {Math.abs(profit)}
                      </div>
                    </td>

                    {/* Expiry */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col space-y-1 whitespace-nowrap">
                        <div className="scale-90 origin-left">{getExpiryBadge(product.expiryDate)}</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">
                          {formatExpiryDate(product.expiryDate)}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <div className="scale-90 origin-left whitespace-nowrap">
                        {getStockBadge(product.quantity)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <div className="relative actions-menu">
                          <button
                            onClick={() => toggleActionsMenu(product.id)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-all text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openActionsId === product.id && (
                            <div className="absolute right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[120px] overflow-hidden">
                              <div className="py-1">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
                                >
                                  <Edit2 size={14} /> Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-2"
                                >
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <Package size={40} className="mx-auto mb-3 text-gray-400 dark:text-gray-600" />
              <p className="text-sm font-medium">No products found</p>
            </div>
          )}
        </div>

        {/* Stock Alert */}
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-amber-600 dark:text-amber-300 text-sm">
            <AlertTriangle size={18} />
            <span className="font-medium">Note:</span>
            <span>Items with quantity less than 5 will show "Low Stock" warning</span>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
          {/* Backdrop - Glass effect */}
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md"
            onClick={() => {
              setIsModalOpen(false);
              setEditingProduct(null);
              setFormData({
                name: '',
                brand: 'No Brand',
                category: 'Kirana',
                purchasePrice: '',
                salePrice: '',
                quantity: '',
                expiryDate: '',
                barcode: '',
              });
            }}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg my-auto">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingProduct(null);
                      setFormData({
                        name: '',
                        brand: 'No Brand',
                        category: 'Kirana',
                        purchasePrice: '',
                        salePrice: '',
                        quantity: '',
                        expiryDate: '',
                        barcode: '',
                      });
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                      placeholder="e.g., Tikka Masala (100g)"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Brand will be automatically added when you select it below
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        required
                      >
                        {categories.filter(c => c !== 'All').map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Brand
                      </label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleBrandChange}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                      >
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Barcode Field - NEW */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Barcode
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleFormChange}
                        className="flex-1 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        placeholder="Enter 13-digit barcode"
                        maxLength="13"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateBarcode}
                        className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium text-sm whitespace-nowrap flex items-center gap-2"
                      >
                        <Barcode size={16} />
                        Generate
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Leave empty to auto-generate barcode
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Purchase Price (Rs)
                      </label>
                      <input
                        type="number"
                        name="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sale Price (Rs) *
                      </label>
                      <input
                        type="number"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  {formData.purchasePrice && formData.salePrice && (
                    <div className={`p-3 rounded-lg backdrop-blur-sm text-sm border ${formData.salePrice - formData.purchasePrice >= 0
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/30'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {formData.salePrice - formData.purchasePrice >= 0 ? (
                            <>
                              <TrendingUp size={16} className="text-emerald-600 dark:text-emerald-400" />
                              <span className="text-gray-700 dark:text-gray-300">Estimated Profit:</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
                              <span className="text-gray-700 dark:text-gray-300">Estimated Loss:</span>
                            </>
                          )}
                        </div>
                        <span className={`font-bold ${formData.salePrice - formData.purchasePrice >= 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-red-600 dark:text-red-400'}`}>
                          Rs {Math.abs(formData.salePrice - formData.purchasePrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 outline-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {parseInt(formData.quantity) < 5 && formData.quantity !== '' && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-xl backdrop-blur-sm text-sm">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300">
                        <AlertTriangle size={16} />
                        <span className="font-medium">Warning:</span>
                        <span>Low stock! Add more inventory.</span>
                      </div>
                    </div>
                  )}

                  {formData.expiryDate && (
                    <div className={`p-3 rounded-lg backdrop-blur-sm text-sm ${new Date(formData.expiryDate) < new Date()
                      ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30'
                      : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30'
                      }`}>
                      <div className="flex items-center gap-2">
                        {new Date(formData.expiryDate) < new Date() ? (
                          <>
                            <AlertTriangle size={16} className="text-red-500" />
                            <span className="text-red-600 dark:text-red-300 font-medium">Expired!</span>
                            <span className="text-red-600 dark:text-red-300">Product has expired</span>
                          </>
                        ) : (
                          <>
                            <Calendar size={16} className="text-blue-500" />
                            <span className="text-blue-600 dark:text-blue-300">Expires on:</span>
                            <span className="font-medium text-blue-600 dark:text-blue-300">
                              {new Date(formData.expiryDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setEditingProduct(null);
                        setFormData({
                          name: '',
                          brand: 'No Brand',
                          category: 'Kirana',
                          purchasePrice: '',
                          salePrice: '',
                          quantity: '',
                          expiryDate: '',
                          barcode: '',
                        });
                      }}
                      className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg shadow-blue-900/30 text-sm"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Add Modal */}
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
                    Bulk Add Products
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
                      <li>Upload an Excel file (.xlsx or .xls) with product data</li>
                      <li>Required columns: Product Name, Quantity, Price</li>
                      <li>Optional columns: Brand, Category, Purchase Price, Expiry Date, Barcode</li>
                      <li>First row should contain column headers</li>
                    </ul>
                    <div className="mt-3">
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          // Create sample Excel data
                          const sampleData = [
                            ['Product Name', 'Brand', 'Category', 'Quantity', 'Price', 'Purchase Price', 'Expiry Date', 'Barcode'],
                            ['Sample Product 1', 'Shan', 'Spices', 10, 200, 150, '2025-12-31', '8901234567001'],
                            ['Sample Product 2', 'National', 'Food', 20, 150, 120, '2026-06-30', '8901234567002']
                          ];
                          
                          const ws = XLSX.utils.aoa_to_sheet(sampleData);
                          const wb = XLSX.utils.book_new();
                          XLSX.utils.book_append_sheet(wb, ws, "Sample");
                          XLSX.writeFile(wb, "inventory_sample_template.xlsx");
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
                      id="bulk-upload"
                    />
                    <label
                      htmlFor="bulk-upload"
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
                        Preview ({bulkData.length} products found)
                      </h3>
                      <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Product</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Brand</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Qty</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bulkData.slice(0, 5).map((item, index) => (
                              <tr key={index} className="border-t border-gray-100 dark:border-gray-700/50">
                                <td className="py-2 px-3 text-gray-900 dark:text-white">{item.name}</td>
                                <td className="py-2 px-3 text-gray-700 dark:text-gray-300">{item.brand}</td>
                                <td className="py-2 px-3 text-gray-700 dark:text-gray-300">{item.quantity}</td>
                                <td className="py-2 px-3 text-gray-700 dark:text-gray-300">Rs {item.price}</td>
                              </tr>
                            ))}
                            {bulkData.length > 5 && (
                              <tr className="border-t border-gray-100 dark:border-gray-700/50">
                                <td colSpan="4" className="py-2 px-3 text-center text-xs text-gray-500 dark:text-gray-400">
                                  ... and {bulkData.length - 5} more products
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
                      {isUploading ? 'Processing...' : `Import ${bulkData.length} Products`}
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

export default Inventory;