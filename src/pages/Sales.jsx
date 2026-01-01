// src/pages/Sales.jsx
import React, { useState } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingBag, CreditCard, Smartphone, Wallet, Filter, Tag, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sales = () => {
  // Sample products
  const [products] = useState([
    { id: 1, name: 'Aata (5kg)', price: 400, stock: 15, category: 'Kirana', brand: 'Mansalwa' },
    { id: 2, name: 'Chawal (10kg)', price: 600, stock: 8, category: 'Kirana', brand: 'Mansalwa' },
    { id: 3, name: 'Sugar (1kg)', price: 50, stock: 20, category: 'Kirana', brand: 'Ponam' },
    { id: 4, name: 'Dal Masoor', price: 120, stock: 12, category: 'Pulses', brand: 'National' },
    { id: 5, name: 'Cooking Oil', price: 200, stock: 10, category: 'Oil', brand: 'Tullo' },
    { id: 6, name: 'Tea (250g)', price: 150, stock: 25, category: 'Beverages', brand: 'Lipton' },
    { id: 7, name: 'Biscuits', price: 30, stock: 40, category: 'Bakery', brand: 'Ariel' },
    { id: 8, name: 'Pen', price: 10, stock: 50, category: 'Stationery', brand: 'Cello' },
    { id: 9, name: 'Notebook', price: 40, stock: 30, category: 'Stationery', brand: 'Oxford' },
    { id: 10, name: 'Milk (1L)', price: 60, stock: 25, category: 'Dairy', brand: 'Nestle' },
  ]);


  // Cart state
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [discount, setDiscount] = useState(0);

  // Udhaar specific fields
  const [udhaarCustomerName, setUdhaarCustomerName] = useState('');
  const [udhaarCustomerAddress, setUdhaarCustomerAddress] = useState('');
  const [udhaarCustomerPhone, setUdhaarCustomerPhone] = useState('');

  // Categories for filter
  const categories = ['all', 'Kirana', 'Pulses', 'Oil', 'Beverages', 'Bakery', 'Stationery', 'Dairy'];

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
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  // Add to cart with sound
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        playAddToCartSound();
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }].reverse());
      playAddToCartSound();
    }
  };

  // Sound play function
  const playAddToCartSound = () => {
    const audio = new Audio('sounds/cancel.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const playCancelSound = () => {
    const audio = new Audio('sounds/add.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const playClearSound = () => {
    const audio = new Audio('sounds/clear.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const playCashoutSound = () => {
    const audio = new Audio('sounds/cashout.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      playCancelSound();
      const product = products.find(p => p.id === id);
      if (product && newQuantity <= product.stock) {
        setCart(cart.map(item =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item
        ));
      }
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    playCancelSound();
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    return subtotal + tax - discount;
  };

  // Complete sale
  // const handleCompleteSale = () => {
  //   if (cart.length === 0) {
  //     alert('Kripya kuch products add karein');
  //     return;
  //   }

  //   // Check for udhaar fields
  //   if (paymentMethod === 'udhaar' && (!udhaarCustomerName || !udhaarCustomerPhone)) {
  //     alert('Udhaar ke liye customer ka naam aur phone number zaroori hai');
  //     return;
  //   }

  //   const saleData = {
  //     customerName: customerName || 'Walk-in Customer',
  //     customerPhone,
  //     items: cart,
  //     subtotal: calculateSubtotal(),
  //     tax: calculateTax(),
  //     discount,
  //     total: calculateTotal(),
  //     paymentMethod,
  //     date: new Date().toISOString(),
  //     invoiceNumber: `INV${Date.now().toString().slice(-6)}`,
  //     ...(paymentMethod === 'udhaar' && {
  //       udhaarCustomerName,
  //       udhaarCustomerAddress,
  //       udhaarCustomerPhone
  //     })
  //   };

  //   console.log('Sale completed:', saleData);

  //   // Show receipt
  //   alert(`✅ Sale Successful!\n\nInvoice: ${saleData.invoiceNumber}\nTotal: ${calculateTotal()} Rs\nPayment: ${paymentMethod}\n\nThank you for shopping!`);

  //   // Reset form
  //   setCart([]);
  //   setCustomerName('');
  //   setCustomerPhone('');
  //   setDiscount(0);
  //   setPaymentMethod('cash');
  //   setUdhaarCustomerName('');
  //   setUdhaarCustomerAddress('');
  //   setUdhaarCustomerPhone('');
  // };


  // Complete sale with receipt printing
  const handleCompleteSale = () => {
    if (cart.length === 0) {
      alert('Kripya kuch products add karein');
      return;
    }

    // Check for udhaar fields
    if (paymentMethod === 'udhaar' && (!udhaarCustomerName || !udhaarCustomerPhone)) {
      alert('Udhaar ke liye customer ka naam aur phone number zaroori hai');
      return;
    }

    playCashoutSound();

    // Generate invoice number
    const invoiceNumber = `INV${Date.now().toString().slice(-6)}`;

    // Calculate all amounts
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const total = calculateTotal();

    // Create sale data
    const saleData = {
      customerName: customerName || 'Walk-in Customer',
      customerPhone,
      items: cart,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      date: new Date().toISOString(),
      invoiceNumber,
      ...(paymentMethod === 'udhaar' && {
        udhaarCustomerName,
        udhaarCustomerAddress,
        udhaarCustomerPhone
      })
    };

    console.log('Sale completed:', saleData);

    // ✅ YEH NEW FUNCTION CALL KARO
    printReceipt(saleData);

    // Reset form
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setDiscount(0);
    setPaymentMethod('cash');
    setUdhaarCustomerName('');
    setUdhaarCustomerAddress('');
    setUdhaarCustomerPhone('');

    alert(`✅ Sale Successful!\nInvoice: ${invoiceNumber}`);
  };


  // Print receipt function
  const printReceipt = (saleData) => {
    // Create receipt HTML for browser display
    const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt - ${saleData.invoiceNumber}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Thermal printer friendly styling */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Courier New', monospace;
        }
        
        body {
          padding: 10px;
          max-width: 300px;
          margin: 0 auto;
          background: white;
          color: black;
          font-size: 12px;
        }
        
        .receipt {
          width: 100%;
          border-collapse: collapse;
        }
        
        .header {
          text-align: center;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px dashed #000;
        }
        
        .store-name {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 2px;
        }
        
        .store-address {
          font-size: 10px;
          margin-bottom: 3px;
        }
        
        .store-contact {
          font-size: 10px;
          margin-bottom: 5px;
        }
        
        .invoice-info {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
          font-size: 11px;
        }
        
        .customer-info {
          margin: 5px 0;
          padding: 5px 0;
          border-top: 1px dashed #000;
          border-bottom: 1px dashed #000;
        }
        
        .items-table {
          width: 100%;
          margin: 10px 0;
          border-collapse: collapse;
        }
        
        .items-table th {
          text-align: left;
          padding: 3px 0;
          border-bottom: 1px solid #000;
          font-size: 11px;
        }
        
        .items-table td {
          padding: 3px 0;
          border-bottom: 1px dashed #ccc;
        }
        
        .items-table .qty {
          width: 20px;
          text-align: center;
        }
        
        .items-table .price {
          text-align: right;
          width: 60px;
        }
        
        .total-section {
          margin-top: 10px;
          padding-top: 5px;
          border-top: 1px solid #000;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 3px 0;
        }
        
        .grand-total {
          font-weight: bold;
          font-size: 14px;
          margin-top: 5px;
          padding-top: 5px;
          border-top: 2px double #000;
        }
        
        .payment-method {
          margin: 5px 0;
          padding: 5px;
          background: #f0f0f0;
          text-align: center;
        }
        
        .footer {
          text-align: center;
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px dashed #000;
          font-size: 10px;
        }
        
        .barcode {
          text-align: center;
          margin: 10px 0;
          font-family: 'Libre Barcode 128', cursive;
          font-size: 28px;
        }
        
        .cut-line {
          text-align: center;
          margin: 15px 0 5px;
          color: #666;
          font-size: 10px;
        }
        
        @media print {
          body {
            padding: 0;
            margin: 0;
          }
          .no-print {
            display: none;
          }
        }
        
        .print-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 20px 0;
        }
        
        .print-btn {
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .print-btn:hover {
          background: #0056b3;
        }
        
        .thermal-btn {
          background: #28a745;
        }
        
        .thermal-btn:hover {
          background: #1e7e34;
        }
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="header">
        <div class="store-name">MY Kirana Store</div>
        <div class="store-address">123 Main Street, City, State</div>
        <div class="store-contact">Phone: +92 300 1234567 | GST: GST123456789</div>
      </div>
      
      <div class="invoice-info">
        <div><strong>Invoice:</strong> ${saleData.invoiceNumber}</div>
        <div><strong>Date:</strong> ${new Date(saleData.date).toLocaleDateString()}</div>
      </div>
      
      <div class="invoice-info">
        <div><strong>Time:</strong> ${new Date(saleData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <div><strong>Cashier:</strong> Admin</div>
      </div>
      
      <div class="customer-info">
        <div><strong>Customer:</strong> ${saleData.customerName}</div>
        ${saleData.customerPhone ? `<div><strong>Phone:</strong> ${saleData.customerPhone}</div>` : ''}
        ${saleData.paymentMethod === 'udhaar' ? `
          <div><strong>Udhaar Customer:</strong> ${saleData.udhaarCustomerName}</div>
          <div><strong>Udhaar Phone:</strong> ${saleData.udhaarCustomerPhone}</div>
        ` : ''}
      </div>
      
      <table class="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th class="qty">Qty</th>
            <th class="price">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${saleData.items.map(item => `
            <tr>
              <td>${item.name.substring(0, 20)}</td>
              <td class="qty">${item.quantity}</td>
              <td class="price">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="total-section">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>${saleData.subtotal.toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span>Tax (5%):</span>
          <span>${saleData.tax.toFixed(2)}</span>
        </div>
        ${saleData.discount > 0 ? `
        <div class="total-row" style="color: red;">
          <span>Discount:</span>
          <span>-${saleData.discount.toFixed(2)}</span>
        </div>
        ` : ''}
        <div class="total-row grand-total">
          <span>TOTAL:</span>
          <span>${saleData.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="payment-method">
        <strong>Payment Method:</strong> ${saleData.paymentMethod.toUpperCase()}
        ${saleData.paymentMethod === 'udhaar' ? '<br><small>(Credit Sale)</small>' : ''}
      </div>
      
      <div class="barcode">
        *${saleData.invoiceNumber}*
      </div>
      
      <div class="footer">
        <div>Thank you for shopping with us!</div>
        <div>Please keep this receipt for returns/exchange</div>
        <div>Returns accepted within 7 days with receipt</div>
        <div>----------------------------------------</div>
        <div>Software: POS System v1.0</div>
        <div><img src="dukaan-ease-logo.png" alt="Logo" width="100" className="grayscale"></div>
      </div>
      
      <div class="cut-line">
        ..................................................
      </div>
      
      <div class="print-buttons no-print">
        <button class="print-btn" onclick="window.print()">🖨️ Print Receipt</button>
        <button class="print-btn thermal-btn" onclick="printThermal()">🧾 Thermal Print</button>
        <button class="print-btn" onclick="window.close()">❌ Close</button>
      </div>
      
      <script>
        // Thermal printer function
        function printThermal() {
          // Thermal printer ke liye formatted text create karna
          let thermalText = "";
          
          // ESC/P commands for thermal printer
          thermalText += "\\x1B\\x40"; // Initialize printer
          
          // Store header
          thermalText += "================================\\n";
          thermalText += "         MY STORE\\n";
          thermalText += "   123 Main Street, City\\n";
          thermalText += "   Phone: +92 300 1234567\\n";
          thermalText += "================================\\n";
          thermalText += "\\n";
          
          // Invoice details
          thermalText += "Invoice: ${saleData.invoiceNumber}\\n";
          thermalText += "Date: ${new Date(saleData.date).toLocaleDateString()}\\n";
          thermalText += "Time: ${new Date(saleData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\\n";
          thermalText += "Cashier: Admin\\n";
          thermalText += "Customer: ${saleData.customerName}\\n";
          
          ${saleData.customerPhone ? 'thermalText += "Phone: ' + saleData.customerPhone + '\\n";' : ''}
          
          if ("${saleData.paymentMethod}" === "udhaar") {
            thermalText += "Udhaar Customer: ${saleData.udhaarCustomerName}\\n";
            thermalText += "Udhaar Phone: ${saleData.udhaarCustomerPhone}\\n";
          }
          
          thermalText += "--------------------------------\\n";
          
          // Items
          thermalText += "Items:\\n";
          ${saleData.items.map(item => `
            thermalText += "${item.name.substring(0, 20)}".padEnd(20, " ");
            thermalText += "${item.quantity}".padStart(3, " ") + " x ";
            thermalText += "${item.price.toFixed(2)}".padStart(6, " ");
            thermalText += " = ${(item.price * item.quantity).toFixed(2)}".padStart(8, " ") + "\\n";
          `).join('')}
          
          thermalText += "--------------------------------\\n";
          
          // Totals
          thermalText += "Subtotal:".padEnd(20, " ") + "${saleData.subtotal.toFixed(2)}".padStart(10, " ") + "\\n";
          thermalText += "Tax (5%):".padEnd(20, " ") + "${saleData.tax.toFixed(2)}".padStart(10, " ") + "\\n";
          
          ${saleData.discount > 0 ? `
            thermalText += "Discount:".padEnd(20, " ") + "-${saleData.discount.toFixed(2)}".padStart(10, " ") + "\\n";
          ` : ''}
          
          thermalText += "--------------------------------\\n";
          thermalText += "TOTAL:".padEnd(20, " ") + "${saleData.total.toFixed(2)}".padStart(10, " ") + "\\n";
          thermalText += "================================\\n";
          
          thermalText += "Payment: ${saleData.paymentMethod.toUpperCase()}\\n";
          
          ${saleData.paymentMethod === 'udhaar' ? 'thermalText += "*** CREDIT SALE ***\\n";' : ''}
          
          thermalText += "\\n";
          thermalText += "Thank you for shopping!\\n";
          thermalText += "Please keep receipt for returns\\n";
          thermalText += "\\n\\n\\n";
          thermalText += "\\x1B\\x69"; // Partial cut paper
          
          // For now, just show the thermal text
          alert("Thermal printer text ready:\\n\\n" + thermalText + "\\n\\nNote: Connect thermal printer to enable direct printing.");
          
          // Future implementation: Send to printer
          // if (window.qz && window.qz.websocket.isActive()) {
          //   const config = qz.configs.create("Printer Name");
          //   const data = [{ type: 'raw', data: thermalText }];
          //   qz.print(config, data);
          // }
        }
        
        // Auto focus print button
        window.onload = function() {
          // Optionally auto-print
          // window.print();
        };
      </script>
    </body>
    </html>
  `;

    // Open receipt in new tab
    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Optional: Auto print after 1 second
    // setTimeout(() => {
    //   printWindow.print();
    // }, 1000);
  };


  // Get stock badge color
  const getStockBadge = (stock) => {
    if (stock > 10) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (stock > 5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 overflow-x-hidden">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">New Sale</h1>
            <p className="text-gray-600 dark:text-gray-400">Record new sales and generate bills</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-700 text-sm whitespace-nowrap">
              <Receipt size={18} />
              <span className="inline">Recent Sales</span>
              {/* <span className="sm:hidden">Sales</span> */}
            </Link>
            {/* <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-700 text-sm whitespace-nowrap">
              <Clock size={18} />
              <span className="hidden sm:inline">Today:</span> {calculateSubtotal()}Rs
            </button> */}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Products */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Product Search */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 whitespace-nowrap">
                <Search size={20} className="text-blue-500" />
                Search Products
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filteredProducts.length} products
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col gap-3 mb-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border outline-none border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Filter Row - Category and Brand */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Category Filter */}
                <div className="flex-1 relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.filter(cat => cat !== 'all' && cat !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="all">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products List - Fully Responsive */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800/40 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate text-sm md:text-base">
                        {product.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">

                        {/* Brand */}
                        <span className={`px-1.5 py-0.5 text-[11px] rounded border whitespace-nowrap inline-block ${product.brand === 'No Brand'
                          ? 'bg-gray-100/50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20'
                          : 'bg-purple-100/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/30'
                          }`}>
                          {product.brand}
                        </span>

                        {/* Category */}
                        <span className="px-1.5 py-0.5 text-[11px] bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-500/30 whitespace-nowrap inline-block">
                          {product.category}
                        </span>

                        {/* Stock Badge */}
                        <span className={`px-1.5 py-0.5 text-[11px] rounded border whitespace-nowrap inline-block ${product.stock <= 0
                          ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30'
                          : product.stock < 5
                            ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                            : 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                          }`}>
                          Stock: {product.stock}
                        </span>

                        {/* Cart Quantity */}
                        <span className="px-1.5 py-0.5 text-[11px] bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-500/30 whitespace-nowrap inline-block">
                          In cart: {cart.find(item => item.id === product.id)?.quantity || 0}
                        </span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                      <div className="text-right">
                        <div className="text-gray-900 dark:text-white text-lg whitespace-nowrap">
                          {product.price} <span className="text-sm font-semibold">Rs</span>
                        </div>
                        {product.purchasePrice > 0 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Cost: {product.purchasePrice} Rs
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          className={`px-4 py-1.5 rounded text-sm font-medium whitespace-nowrap transition-all ${product.stock === 0
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                            }`}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <ShoppingBag size={40} className="mx-auto mb-2 text-gray-400 dark:text-gray-600" />
                <p>No products found</p>
                <p className="text-xs mt-1">Try changing your search or filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Cart & Payment */}
        <div className="space-y-4 md:space-y-6">
          {/* Cart */}
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-blue-500" />
                Shopping Cart
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <ShoppingBag size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>Cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Stock: {item.stock}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800/50 flex-shrink-0"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-sm whitespace-nowrap">
                          {item.price * item.quantity} <span className="text-xs font-semibold">Rs</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.price} Rs × {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">{calculateSubtotal()} Rs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%):</span>
                    <span className="font-medium">{calculateTax().toFixed(2)} Rs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Discount:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
                        className="w-20 px-2 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-right text-sm"
                        min="0"
                        max={calculateSubtotal()}
                      />
                      <span className="font-medium text-red-600 dark:text-red-400">{discount} Rs</span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="font-bold">Total:</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {calculateTotal().toFixed(2)} Rs
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1 text-xs ${paymentMethod === 'cash'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-500 text-blue-600 dark:text-blue-300'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
              >
                <Wallet size={20} />
                <span>Cash</span>
              </button>
              <button
                onClick={() => setPaymentMethod('online')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1 text-xs ${paymentMethod === 'online'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-500 text-blue-600 dark:text-blue-300'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
              >
                <Smartphone size={20} />
                <span>Online</span>
              </button>
              <button
                onClick={() => setPaymentMethod('udhaar')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1 text-xs ${paymentMethod === 'udhaar'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-500 text-blue-600 dark:text-blue-300'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
              >
                <CreditCard size={20} />
                <span>Udhaar</span>
              </button>
            </div>

            {/* Udhaar Specific Fields */}
            {paymentMethod === 'udhaar' && (
              <div className="mt-4 p-3 bg-amber-100/50 dark:bg-yellow-900/20 border border-amber-200 dark:border-yellow-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                  <CreditCard size={16} />
                  Udhaar Customer Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={udhaarCustomerName}
                      onChange={(e) => setUdhaarCustomerName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-2 bg-white outline-none dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={udhaarCustomerPhone}
                      onChange={(e) => setUdhaarCustomerPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full px-3 py-2 outline-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>

                </div>
              </div>
            )}

            {/* Complete Sale Button */}
            <button
              onClick={handleCompleteSale}
              disabled={cart.length === 0}
              className={`w-full py-3 rounded-lg font-medium mt-4 flex items-center justify-center gap-2 text-sm ${cart.length === 0
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
            >
              <Receipt size={18} />
              Complete Sale
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1">
            <button
              onClick={() => {
                if (cart.length > 0) {
                  playClearSound();
                  setCart([]);
                  setDiscount(0);
                } else {
                  return;
                }
              }
              }
              className={`p-3 bg-red-500 dark:bg-red-600/40 text-white dark:text-gray-300 rounded-md hover:bg-red-600 dark:hover:bg-red-600/50 text-sm ${cart.length === 0 ? ' opacity-50 cursor-not-allowed' : ''}`}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;