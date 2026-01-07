import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Plus, Minus, Trash2, ShoppingBag, CreditCard, 
  Smartphone, Wallet, Keyboard, HelpCircle, X, Receipt,
  Calculator, User, Phone, Hash, Percent, DollarSign,
  Package, Clock, TrendingUp, Zap, BarChart3, Key,
  ArrowLeft, Check, AlertCircle, RotateCcw, Calendar,
  FileText, Edit, Save, Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sales = () => {
  // Product database
  const [products] = useState([
    { id: 1, name: 'Aata (5kg)', price: 400, stock: 15, category: 'Kirana', brand: 'Mansalwa', barcode: '8901234567890' },
    { id: 2, name: 'Chawal (10kg)', price: 600, stock: 8, category: 'Kirana', brand: 'Mansalwa', barcode: '8901234567891' },
    { id: 3, name: 'Sugar (1kg)', price: 50, stock: 20, category: 'Kirana', brand: 'Ponam', barcode: '8901234567892' },
    { id: 4, name: 'Dal Masoor', price: 120, stock: 12, category: 'Pulses', brand: 'National', barcode: '8901234567893' },
    { id: 5, name: 'Cooking Oil', price: 200, stock: 10, category: 'Oil', brand: 'Tullo', barcode: '8901234567894' },
    { id: 6, name: 'Tea (250g)', price: 150, stock: 25, category: 'Beverages', brand: 'Lipton', barcode: '8901234567895' },
    { id: 7, name: 'Biscuits', price: 30, stock: 40, category: 'Bakery', brand: 'Ariel', barcode: '8901234567896' },
    { id: 8, name: 'Pen', price: 10, stock: 50, category: 'Stationery', brand: 'Cello', barcode: '8901234567897' },
    { id: 9, name: 'Notebook', price: 40, stock: 30, category: 'Stationery', brand: 'Oxford', barcode: '8901234567898' },
    { id: 10, name: 'Milk (1L)', price: 60, stock: 25, category: 'Dairy', brand: 'Nestle', barcode: '8901234567899' },
  ]);

  // POS States
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [searchInput, setSearchInput] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeMode, setActiveMode] = useState('sale');
  
  // Customer state for udhaar
  const [udhaarCustomerName, setUdhaarCustomerName] = useState('');
  const [udhaarCustomerPhone, setUdhaarCustomerPhone] = useState('');
  
  // Discount & Tax
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(0);
  const [taxRate, setTaxRate] = useState(5);
  
  // Hold bills
  const [holdBills, setHoldBills] = useState([]);
  const [showHoldBills, setShowHoldBills] = useState(false);
  
  // Quick products
  const [quickProducts, setQuickProducts] = useState([]);
  
  // Modals
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showSaleReviewModal, setShowSaleReviewModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  
  // Barcode and transaction
  const [barcodeInput, setBarcodeInput] = useState('');
  const [transactionNumber, setTransactionNumber] = useState(`TXN${Date.now().toString().slice(-6)}`);
  
  // Return states
  const [returnInvoiceNumber, setReturnInvoiceNumber] = useState('');
  const [returnItems, setReturnItems] = useState([]);
  const [returnReason, setReturnReason] = useState('');
  const [showReturnOptions, setShowReturnOptions] = useState(false);
  const [selectedReturnItems, setSelectedReturnItems] = useState([]);
  
  const searchInputRef = useRef(null);
  const barcodeInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Quick access products
  useEffect(() => {
    setQuickProducts(products.slice(0, 8));
  }, [products]);

  // Search suggestions effect
  useEffect(() => {
    if (searchInput.trim().length > 0) {
      const suggestions = products.filter(product =>
        product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5);
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchInput, products]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [activeMode]);

  // Barcode scanner simulation
  useEffect(() => {
    const handleBarcode = (e) => {
      if (e.key === 'Enter' && barcodeInput.length > 0) {
        const product = products.find(p => p.barcode === barcodeInput);
        if (product) {
          addToCart(product);
          setBarcodeInput('');
        } else {
          alert('Product not found!');
          setBarcodeInput('');
        }
      }
    };

    if (barcodeInputRef.current) {
      barcodeInputRef.current.addEventListener('keydown', handleBarcode);
    }

    return () => {
      if (barcodeInputRef.current) {
        barcodeInputRef.current.removeEventListener('keydown', handleBarcode);
      }
    };
  }, [barcodeInput, products]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        // Allow Enter to select from suggestions
        if (e.key === 'Enter' && showSuggestions && searchSuggestions.length > 0) {
          e.preventDefault();
          addToCart(searchSuggestions[0]);
          setSearchInput('');
          setShowSuggestions(false);
        }
        return;
      }

      // Common shortcuts
      if (e.key === 'F2' || (e.altKey && e.key === 's')) {
        e.preventDefault();
        openSaleReview();
      }

      if (e.key === 'F3' || (e.altKey && e.key === 'c')) {
        e.preventDefault();
        clearCart();
      }

      if (e.key === 'F4' || (e.altKey && e.key === 'h')) {
        e.preventDefault();
        setShowHoldBills(true);
      }

      if (e.key === 'F8' || (e.altKey && e.key === 'k')) {
        e.preventDefault();
        setShowShortcutsModal(true);
      }

      if (e.key === 'F9') {
        e.preventDefault();
        holdCurrentSale();
      }

      if (e.key === 'F10') {
        e.preventDefault();
        setActiveMode('return');
        openReturnModal();
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        if (showHoldBills) setShowHoldBills(false);
        if (showShortcutsModal) setShowShortcutsModal(false);
        if (showSaleReviewModal) setShowSaleReviewModal(false);
        if (showReturnModal) setShowReturnModal(false);
        if (showSuggestions) setShowSuggestions(false);
        setSearchInput('');
      }

      // Quick payment method selection
      if (e.key === '1') setPaymentMethod('cash');
      if (e.key === '2') setPaymentMethod('online');
      if (e.key === '3') setPaymentMethod('udhaar');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart, showHoldBills, showShortcutsModal, showSaleReviewModal, showReturnModal, showSuggestions, searchSuggestions]);

  // Functions with your original sound effects
  const playAddToCartSound = () => {
    const audio = new Audio('/sounds/add.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const playCancelSound = () => {
    const audio = new Audio('/sounds/cancel.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const playClearSound = () => {
    const audio = new Audio('/sounds/clear.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const playCashoutSound = () => {
    const audio = new Audio('/sounds/cashout.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const searchProduct = () => {
    if (!searchInput.trim()) return;

    const foundProduct = products.find(
      p => p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
           p.barcode === searchInput
    );

    if (foundProduct) {
      addToCart(foundProduct);
      setSearchInput('');
      setShowSuggestions(false);
      searchInputRef.current.focus();
    } else {
      alert('Product not found!');
      setSearchInput('');
      searchInputRef.current.focus();
    }
  };

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
      setCart([...cart, { ...product, quantity: 1 }]);
      playAddToCartSound();
    }
    setSearchInput('');
    setShowSuggestions(false);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      const product = products.find(p => p.id === id);
      if (product && newQuantity <= product.stock) {
        setCart(cart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
        playCancelSound();
      }
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    playCancelSound();
  };

  const clearCart = () => {
    if (cart.length > 0) {
      setCart([]);
      setDiscountValue(0);
      playClearSound();
      alert('Cart cleared!');
    }
  };

  const holdCurrentSale = () => {
    if (cart.length === 0) return;
    
    const holdBill = {
      id: `HOLD${Date.now()}`,
      items: [...cart],
      discountValue,
      discountType,
      timestamp: new Date().toISOString(),
      total: calculateTotal()
    };

    setHoldBills([holdBill, ...holdBills]);
    clearCart();
    alert(`Sale held with ID: ${holdBill.id}`);
  };

  const recallHoldBill = (holdBill) => {
    setCart(holdBill.items);
    setDiscountValue(holdBill.discountValue);
    setDiscountType(holdBill.discountType);
    setHoldBills(holdBills.filter(bill => bill.id !== holdBill.id));
    setShowHoldBills(false);
  };

  // Calculations
  const calculateSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculateTax = () => calculateSubtotal() * (taxRate / 100);
  const calculateDiscount = () => {
    if (discountType === 'percentage') {
      return calculateSubtotal() * (discountValue / 100);
    }
    return discountValue;
  };
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - calculateDiscount();
  };

  const openSaleReview = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    setShowSaleReviewModal(true);
  };

  const completeSale = () => {
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
    const discount = calculateDiscount();
    const total = calculateTotal();

    // Create sale data
    const saleData = {
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
        udhaarCustomerPhone
      })
    };

    console.log('Sale completed:', saleData);
    printReceipt(saleData);

    // Reset form
    setCart([]);
    setUdhaarCustomerName('');
    setUdhaarCustomerPhone('');
    setDiscountValue(0);
    setPaymentMethod('cash');
    setSearchInput('');
    setTransactionNumber(`TXN${Date.now().toString().slice(-6)}`);
    setShowSaleReviewModal(false);

    alert(`✅ Sale Successful!\nInvoice: ${invoiceNumber}`);
  };

  const printReceipt = (saleData) => {
    const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt - ${saleData.invoiceNumber}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Courier New', monospace; }
        body { padding: 10px; max-width: 300px; margin: 0 auto; background: white; color: black; font-size: 12px; }
        .receipt { width: 100%; border-collapse: collapse; }
        .header { text-align: center; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed #000; }
        .store-name { font-size: 16px; font-weight: bold; margin-bottom: 2px; }
        .store-address { font-size: 10px; margin-bottom: 3px; }
        .store-contact { font-size: 10px; margin-bottom: 5px; }
        .invoice-info { display: flex; justify-content: space-between; margin: 5px 0; font-size: 11px; }
        .customer-info { margin: 5px 0; padding: 5px 0; border-top: 1px dashed #000; border-bottom: 1px dashed #000; }
        .items-table { width: 100%; margin: 10px 0; border-collapse: collapse; }
        .items-table th { text-align: left; padding: 3px 0; border-bottom: 1px solid #000; font-size: 11px; }
        .items-table td { padding: 3px 0; border-bottom: 1px dashed #ccc; }
        .items-table .qty { width: 20px; text-align: center; }
        .items-table .price { text-align: right; width: 60px; }
        .total-section { margin-top: 10px; padding-top: 5px; border-top: 1px solid #000; }
        .total-row { display: flex; justify-content: space-between; margin: 3px 0; }
        .grand-total { font-weight: bold; font-size: 14px; margin-top: 5px; padding-top: 5px; border-top: 2px double #000; }
        .payment-method { margin: 5px 0; padding: 5px; background: #f0f0f0; text-align: center; }
        .footer { text-align: center; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #000; font-size: 10px; }
        .barcode { text-align: center; margin: 10px 0; font-family: 'Libre Barcode 128', cursive; font-size: 28px; }
        .cut-line { text-align: center; margin: 15px 0 5px; color: #666; font-size: 10px; }
        @media print { body { padding: 0; margin: 0; } .no-print { display: none; } }
        .print-buttons { display: flex; gap: 10px; justify-content: center; margin: 20px 0; }
        .print-btn { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
        .print-btn:hover { background: #0056b3; }
        .thermal-btn { background: #28a745; }
        .thermal-btn:hover { background: #1e7e34; }
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="header">
        <div class="store-name">MY Kirana Store</div>
        <div class="store-address">123 Main Street, City, State</div>
        <div class="store-contact">Phone: +92 300 1234567</div>
      </div>
      
      <div class="invoice-info">
        <div><strong>Invoice:</strong> ${saleData.invoiceNumber}</div>
        <div><strong>Date:</strong> ${new Date(saleData.date).toLocaleDateString()}</div>
      </div>
      
      <div class="invoice-info">
        <div><strong>Time:</strong> ${new Date(saleData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <div><strong>Cashier:</strong> Admin</div>
      </div>
      
      ${saleData.paymentMethod === 'udhaar' ? `
      <div class="customer-info">
        <div><strong>Udhaar Customer:</strong> ${saleData.udhaarCustomerName}</div>
        <div><strong>Udhaar Phone:</strong> ${saleData.udhaarCustomerPhone}</div>
      </div>
      ` : ''}
      
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
        function printThermal() {
          alert("Thermal printer functionality would be implemented here.");
        }
      </script>
    </body>
    </html>
  `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
  };

  // Return System Functions
  const openReturnModal = () => {
    setShowReturnModal(true);
  };

  const handleReturnInvoiceSearch = () => {
    if (!returnInvoiceNumber.trim()) {
      alert('Please enter an invoice number');
      return;
    }

    // Simulate finding invoice items (in real app, fetch from API)
    const foundInvoice = {
      invoiceNumber: returnInvoiceNumber,
      items: [
        { id: 1, name: 'Aata (5kg)', price: 400, originalQuantity: 2, remainingQuantity: 2 },
        { id: 2, name: 'Sugar (1kg)', price: 50, originalQuantity: 3, remainingQuantity: 3 },
        { id: 6, name: 'Tea (250g)', price: 150, originalQuantity: 1, remainingQuantity: 1 },
      ],
      date: '2024-01-15',
      total: 1450
    };

    setReturnItems(foundInvoice.items);
    setShowReturnOptions(true);
  };

  const toggleReturnItem = (item) => {
    const existingIndex = selectedReturnItems.findIndex(i => i.id === item.id);
    
    if (existingIndex > -1) {
      setSelectedReturnItems(selectedReturnItems.filter(i => i.id !== item.id));
    } else {
      setSelectedReturnItems([...selectedReturnItems, { 
        ...item, 
        returnQuantity: 1,
        maxQuantity: item.remainingQuantity 
      }]);
    }
  };

  const updateReturnQuantity = (id, quantity) => {
    const item = selectedReturnItems.find(i => i.id === id);
    if (item && quantity >= 1 && quantity <= item.maxQuantity) {
      setSelectedReturnItems(selectedReturnItems.map(i =>
        i.id === id ? { ...i, returnQuantity: quantity } : i
      ));
    }
  };

  const calculateReturnTotal = () => {
    return selectedReturnItems.reduce((sum, item) => sum + (item.price * item.returnQuantity), 0);
  };

  const processReturn = () => {
    if (selectedReturnItems.length === 0) {
      alert('Please select items to return');
      return;
    }

    if (!returnReason.trim()) {
      alert('Please enter return reason');
      return;
    }

    const returnTotal = calculateReturnTotal();
    const returnData = {
      originalInvoice: returnInvoiceNumber,
      returnItems: selectedReturnItems,
      returnReason,
      returnTotal,
      returnDate: new Date().toISOString(),
      returnId: `RET${Date.now().toString().slice(-6)}`
    };

    console.log('Return processed:', returnData);
    
    // Generate return receipt
    const returnReceiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Return Receipt - ${returnData.returnId}</title>
      <style>
        * { margin: 0; padding: 0; font-family: monospace; }
        body { padding: 20px; max-width: 300px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 20px; }
        .divider { border-top: 1px dashed #000; margin: 10px 0; }
        .items { width: 100%; }
        .return-note { color: red; font-weight: bold; margin: 10px 0; }
        .reason { margin: 10px 0; padding: 10px; background: #fff3cd; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>RETURN RECEIPT</h2>
        <p>Return ID: ${returnData.returnId}</p>
        <p>Original Invoice: ${returnData.originalInvoice}</p>
        <p>Date: ${new Date(returnData.returnDate).toLocaleString()}</p>
      </div>
      <div class="divider"></div>
      <div class="return-note">⚠️ RETURN TRANSACTION ⚠️</div>
      <div class="reason">
        <strong>Reason:</strong><br>
        ${returnData.returnReason}
      </div>
      <table class="items">
        ${returnData.returnItems.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>${item.returnQuantity} × ${item.price}</td>
            <td>${(item.returnQuantity * item.price).toFixed(2)}</td>
          </tr>
        `).join('')}
      </table>
      <div class="divider"></div>
      <h3>Total Refund: ${returnData.returnTotal.toFixed(2)} Rs</h3>
      <p style="text-align: center; margin-top: 20px; font-size: 0.9em;">
        Refund processed successfully<br>
        Thank you!
      </p>
    </body>
    </html>
    `;

    const returnWindow = window.open('', '_blank');
    returnWindow.document.write(returnReceiptHTML);
    returnWindow.document.close();

    // Reset return form
    setReturnInvoiceNumber('');
    setReturnItems([]);
    setSelectedReturnItems([]);
    setReturnReason('');
    setShowReturnOptions(false);
    setShowReturnModal(false);
    
    alert(`✅ Return processed successfully!\nReturn ID: ${returnData.returnId}\nRefund Amount: ${returnTotal} Rs`);
  };

  const shortcuts = [
    { key: 'F2 / Alt+S', description: 'Review Sale' },
    { key: 'F3 / Alt+C', description: 'Clear Cart' },
    { key: 'F4 / Alt+H', description: 'Show Hold Bills' },
    { key: 'F8 / Alt+K', description: 'Keyboard Shortcuts' },
    { key: 'F9', description: 'Hold Current Sale' },
    { key: 'F10', description: 'Return Mode' },
    { key: '1, 2, 3', description: 'Quick Payment Methods' },
    { key: 'Enter', description: 'Select first suggestion' },
    { key: 'Esc', description: 'Close/Cancel' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 overflow-x-hidden">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Point of Sale</h1>
            <p className="text-gray-600 dark:text-gray-400">Quick sales and billing system</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-700">
              <span className="font-mono text-sm">{transactionNumber}</span>
            </div>
            <button
              onClick={() => setShowShortcutsModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Keyboard Shortcuts"
            >
              <Keyboard size={18} />
              <span className="hidden sm:inline">Shortcuts</span>
            </button>
            <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 rounded-lg border border-primary/20 dark:border-primary/30 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
              <TrendingUp size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main POS Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Search & Quick Products */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar with Suggestions */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Search className="text-blue-600 dark:text-blue-300" size={20} />
              </div>
              <h2 className="text-lg font-semibold">Quick Search</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search by Name/Barcode with Suggestions */}
              <div className="space-y-2 relative" ref={suggestionsRef}>
                <div className="flex items-center gap-2">
                  <Hash size={16} className="text-gray-500" />
                  <label className="text-sm font-medium">Product Search</label>
                </div>
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && searchProduct()}
                    placeholder="Type product name (suggestions will appear)"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  
                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {searchSuggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => addToCart(product)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                              <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px]">
                                {product.category}
                              </span>
                              <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded text-[10px]">
                                {product.brand}
                              </span>
                              <span>Stock: {product.stock}</span>
                            </div>
                          </div>
                          <div className="font-bold text-sm ml-2">{product.price} Rs</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Press Enter to add first suggestion
                  </div>
                )}
              </div>

              {/* Barcode Scanner Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-gray-500" />
                  <label className="text-sm font-medium">Barcode Scanner</label>
                </div>
                <input
                  ref={barcodeInputRef}
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Scan barcode here"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-center"
                />
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <button
                onClick={() => setActiveMode('sale')}
                className={`px-4 py-2 rounded-lg border flex items-center justify-center gap-2 ${activeMode === 'sale' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
              >
                <ShoppingBag size={16} />
                <span className="text-sm">Sale</span>
              </button>
              <button
                onClick={() => {
                  setActiveMode('return');
                  openReturnModal();
                }}
                className={`px-4 py-2 rounded-lg border flex items-center justify-center gap-2 ${activeMode === 'return' ? 'bg-red-600 text-white border-red-600' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
              >
                <RotateCcw size={16} />
                <span className="text-sm">Return</span>
              </button>
              <button
                onClick={holdCurrentSale}
                disabled={cart.length === 0}
                className="px-4 py-2 rounded-lg border border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Clock size={16} />
                <span className="text-sm">Hold (F9)</span>
              </button>
              <button
                onClick={() => setShowHoldBills(true)}
                disabled={holdBills.length === 0}
                className="px-4 py-2 rounded-lg border border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Package size={16} />
                <span className="text-sm">Recall (F4)</span>
              </button>
            </div>
          </div>

          {/* Quick Products */}
          {/* <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={20} className="text-amber-500" />
              <h3 className="font-semibold">Quick Products</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {quickProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                >
                  <div className="font-medium text-sm truncate">{product.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Stock: {product.stock}</div>
                  <div className="font-bold mt-2 text-sm">{product.price} Rs</div>
                </button>
              ))}
            </div>
          </div> */}

          {/* Discount Section */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Percent size={20} className="text-blue-500" />
              <h3 className="font-semibold">Discount & Tax</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Discount */}
              <div>
                <h4 className="font-medium mb-3 text-sm">Discount</h4>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDiscountType('percentage')}
                      className={`flex-1 px-3 py-2 rounded border ${discountType === 'percentage' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                    >
                      Percentage (%)
                    </button>
                    <button
                      onClick={() => setDiscountType('amount')}
                      className={`flex-1 px-3 py-2 rounded border ${discountType === 'amount' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                    >
                      Amount (Rs)
                    </button>
                  </div>
                  <div className="relative">
                    {discountType === 'percentage' && (
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    )}
                    {discountType === 'amount' && (
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    )}
                    <input
                      type="number"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(Math.max(0, Number(e.target.value)))}
                      placeholder={discountType === 'percentage' ? 'Enter discount percentage' : 'Enter discount amount'}
                      className={`w-full ${discountType === 'percentage' ? 'pl-10' : 'pl-10'} pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
              </div>

              {/* Tax */}
              <div>
                <h4 className="font-medium mb-3 text-sm">Tax Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tax Rate:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value)))}
                        className="w-20 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-center"
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Current tax amount: {calculateTax().toFixed(2)} Rs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Cart & Payment */}
        <div className="space-y-6">
          {/* Cart */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingBag size={20} className="text-blue-500" />
                Current Sale
              </h3>
              <span className="text-sm text-gray-500">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>

            {/* Cart Items */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <ShoppingBag size={32} className="mx-auto mb-2" />
                  <p>Cart is empty</p>
                  <p className="text-sm mt-1">Search products to add</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm truncate">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.price} Rs each</div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="font-bold text-sm">
                        {(item.price * item.quantity).toFixed(2)} Rs
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
                    <span>{calculateSubtotal().toFixed(2)} Rs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({taxRate}%):</span>
                    <span>{calculateTax().toFixed(2)} Rs</span>
                  </div>
                  {discountValue > 0 && (
                    <div className="flex justify-between text-red-600 dark:text-red-400">
                      <span>Discount:</span>
                      <span>-{calculateDiscount().toFixed(2)} Rs</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-300 dark:border-gray-500">
                    <span className="font-bold">Total:</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {calculateTotal().toFixed(2)} Rs
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1 ${paymentMethod === 'cash' ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-500' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                title="Cash (1)"
              >
                <Wallet size={20} />
                <span className="text-xs">Cash</span>
              </button>
              <button
                onClick={() => setPaymentMethod('online')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1 ${paymentMethod === 'online' ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-500' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                title="Online (2)"
              >
                <Smartphone size={20} />
                <span className="text-xs">Online</span>
              </button>
              <button
                onClick={() => setPaymentMethod('udhaar')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1 ${paymentMethod === 'udhaar' ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-500' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                title="Udhaar (3)"
              >
                <CreditCard size={20} />
                <span className="text-xs">Udhaar</span>
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

            {/* Review Sale Button */}
            <button
              onClick={openSaleReview}
              disabled={cart.length === 0}
              className={`w-full py-3 rounded-lg font-medium mt-4 flex items-center justify-center gap-2 ${cart.length === 0 ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
              title="Review sale (F2)"
            >
              <Receipt size={18} />
              Review Sale (F2)
            </button>

            {/* Clear Button */}
            <button
              onClick={clearCart}
              disabled={cart.length === 0}
              className="w-full py-2 mt-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              title="Clear cart (F3)"
            >
              Clear Cart (F3)
            </button>
          </div>
        </div>
      </div>

      {/* Sale Review Modal */}
      {showSaleReviewModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-500" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Sale</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Transaction: {transactionNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setShowSaleReviewModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Items List */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Items in Cart</h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">Price: {item.price} Rs</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-bold">{item.quantity}</div>
                          <div className="text-xs text-gray-500">Qty</div>
                        </div>
                        <div className="font-bold text-right">
                          {(item.price * item.quantity).toFixed(2)} Rs
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-4">Sale Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{calculateSubtotal().toFixed(2)} Rs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({taxRate}%):</span>
                    <span>{calculateTax().toFixed(2)} Rs</span>
                  </div>
                  {discountValue > 0 && (
                    <div className="flex justify-between text-red-600 dark:text-red-400">
                      <span>Discount:</span>
                      <span>-{calculateDiscount().toFixed(2)} Rs</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-300 dark:border-gray-600">
                    <span className="font-bold">Total Amount:</span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {calculateTotal().toFixed(2)} Rs
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method Display */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-2 rounded-lg ${paymentMethod === 'cash' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : paymentMethod === 'online' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'}`}>
                    {paymentMethod === 'cash' && <Wallet size={16} className="inline mr-2" />}
                    {paymentMethod === 'online' && <Smartphone size={16} className="inline mr-2" />}
                    {paymentMethod === 'udhaar' && <CreditCard size={16} className="inline mr-2" />}
                    {paymentMethod.toUpperCase()}
                  </div>
                  {paymentMethod === 'udhaar' && udhaarCustomerName && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Customer: {udhaarCustomerName} ({udhaarCustomerPhone})
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={holdCurrentSale}
                    className="px-4 py-2 border border-yellow-500 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors flex items-center gap-2"
                  >
                    <Clock size={16} />
                    Hold Sale
                  </button>
                  <button
                    onClick={() => {
                      setShowSaleReviewModal(false);
                      setActiveMode('sale');
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Edit Sale
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSaleReviewModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={completeSale}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                  >
                    <Check size={16} />
                    Complete Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <RotateCcw className="text-red-500" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Process Return</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Return items from previous sale</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowReturnModal(false);
                  setShowReturnOptions(false);
                  setReturnInvoiceNumber('');
                  setReturnItems([]);
                  setSelectedReturnItems([]);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Step 1: Enter Invoice Number */}
              {!showReturnOptions && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-blue-500" size={20} />
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Enter the invoice number from the original sale receipt to process a return.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <FileText size={16} className="inline mr-2" />
                        Invoice Number
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={returnInvoiceNumber}
                          onChange={(e) => setReturnInvoiceNumber(e.target.value)}
                          placeholder="Enter invoice number (e.g., INV123456)"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleReturnInvoiceSearch}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                          Search
                        </button>
                      </div>
                    </div>

                    {/* Example invoices for demo */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Demo invoice numbers:</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setReturnInvoiceNumber('INV123456')}
                          className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          INV123456
                        </button>
                        <button
                          onClick={() => setReturnInvoiceNumber('INV789012')}
                          className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          INV789012
                        </button>
                        <button
                          onClick={() => setReturnInvoiceNumber('INV345678')}
                          className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          INV345678
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Items to Return */}
              {showReturnOptions && (
                <div className="space-y-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-yellow-500" size={20} />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                          Invoice Found: {returnInvoiceNumber}
                        </p>
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                          Select items to return and specify quantities
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <h3 className="font-semibold mb-4">Items from Invoice</h3>
                    <div className="space-y-3">
                      {returnItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 rounded-lg border ${selectedReturnItems.find(i => i.id === item.id) ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={!!selectedReturnItems.find(i => i.id === item.id)}
                                onChange={() => toggleReturnItem(item)}
                                className="h-4 w-4 text-red-600"
                              />
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500">
                                  Original: {item.originalQuantity} | Available: {item.remainingQuantity}
                                </div>
                              </div>
                            </div>
                            <div className="font-bold">{item.price} Rs</div>
                          </div>

                          {/* Quantity selector for selected items */}
                          {selectedReturnItems.find(i => i.id === item.id) && (
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Return Quantity:</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      const selected = selectedReturnItems.find(i => i.id === item.id);
                                      if (selected) updateReturnQuantity(item.id, selected.returnQuantity - 1);
                                    }}
                                    className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded"
                                    disabled={selectedReturnItems.find(i => i.id === item.id)?.returnQuantity <= 1}
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="font-bold w-8 text-center">
                                    {selectedReturnItems.find(i => i.id === item.id)?.returnQuantity}
                                  </span>
                                  <button
                                    onClick={() => {
                                      const selected = selectedReturnItems.find(i => i.id === item.id);
                                      if (selected) updateReturnQuantity(item.id, selected.returnQuantity + 1);
                                    }}
                                    className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded"
                                    disabled={selectedReturnItems.find(i => i.id === item.id)?.returnQuantity >= item.remainingQuantity}
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Return Reason */}
                  <div>
                    <h3 className="font-semibold mb-3">Return Reason</h3>
                    <textarea
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      placeholder="Enter reason for return..."
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Return Summary */}
                  {selectedReturnItems.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Return Summary</h3>
                      <div className="space-y-2">
                        {selectedReturnItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} × {item.returnQuantity}</span>
                            <span>{(item.price * item.returnQuantity).toFixed(2)} Rs</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-gray-300 dark:border-gray-600">
                          <div className="flex justify-between font-bold">
                            <span>Total Refund:</span>
                            <span className="text-red-600 dark:text-red-400">
                              {calculateReturnTotal().toFixed(2)} Rs
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center">
                {!showReturnOptions ? (
                  <>
                    <button
                      onClick={() => {
                        setShowReturnModal(false);
                        setActiveMode('sale');
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReturnInvoiceSearch}
                      disabled={!returnInvoiceNumber.trim()}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
                    >
                      Search Invoice
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowReturnOptions(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <button
                      onClick={processReturn}
                      disabled={selectedReturnItems.length === 0 || !returnReason.trim()}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
                    >
                      <RotateCcw size={16} />
                      Process Return
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hold Bills Modal */}
      {showHoldBills && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold">Hold Bills</h3>
              <button onClick={() => setShowHoldBills(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {holdBills.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No hold bills</p>
              ) : (
                holdBills.map((bill) => (
                  <div key={bill.id} className="p-3 border rounded-lg mb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{bill.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(bill.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {bill.items.length} items
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{bill.total.toFixed(2)} Rs</div>
                        <button
                          onClick={() => recallHoldBill(bill)}
                          className="mt-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          Recall
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <Keyboard className="text-blue-500" size={24} />
                <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
              </div>
              <button onClick={() => setShowShortcutsModal(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm">{shortcut.description}</span>
                    <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                      {shortcut.key}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;













// src/pages/Sales.jsx
// import React, { useState } from 'react';
// import { Search, Plus, Minus, Trash2, ShoppingBag, IndianRupee, User, CreditCard, Smartphone, Wallet, Filter, Clock, Receipt, ArrowUpRight, TrendingUp, Package, Users } from 'lucide-react';

// const Sales = () => {
//   // Sample products
//   const [products] = useState([
//     { id: 1, name: 'Aata (5kg)', price: 400, stock: 15, category: 'Kirana' },
//     { id: 2, name: 'Chawal (10kg)', price: 600, stock: 8, category: 'Kirana' },
//     { id: 3, name: 'Sugar (1kg)', price: 50, stock: 20, category: 'Kirana' },
//     { id: 4, name: 'Dal Masoor', price: 120, stock: 12, category: 'Pulses' },
//     { id: 5, name: 'Cooking Oil', price: 200, stock: 10, category: 'Oil' },
//     { id: 6, name: 'Tea (250g)', price: 150, stock: 25, category: 'Beverages' },
//     { id: 7, name: 'Biscuits', price: 30, stock: 40, category: 'Bakery' },
//     { id: 8, name: 'Pen', price: 10, stock: 50, category: 'Stationery' },
//     { id: 9, name: 'Notebook', price: 40, stock: 30, category: 'Stationery' },
//     { id: 10, name: 'Milk (1L)', price: 60, stock: 25, category: 'Dairy' },
//   ]);

//   // Cart state
//   const [cart, setCart] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState('cash');
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [discount, setDiscount] = useState(0);

//   // Categories for filter
//   const categories = ['all', 'Kirana', 'Pulses', 'Oil', 'Beverages', 'Bakery', 'Stationery', 'Dairy'];

//   // Filter products
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // Add to cart
//   const addToCart = (product) => {
//     const existingItem = cart.find(item => item.id === product.id);
//     if (existingItem) {
//       if (existingItem.quantity < product.stock) {
//         setCart(cart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ));
//       }
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   // Update quantity
//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(id);
//     } else {
//       const product = products.find(p => p.id === id);
//       if (product && newQuantity <= product.stock) {
//         setCart(cart.map(item =>
//           item.id === id
//             ? { ...item, quantity: newQuantity }
//             : item
//         ));
//       }
//     }
//   };

//   // Remove from cart
//   const removeFromCart = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   // Calculate totals
//   const calculateSubtotal = () => {
//     return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const calculateTax = () => {
//     return calculateSubtotal() * 0.05; // 5% tax
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const tax = calculateTax();
//     return subtotal + tax - discount;
//   };

//   // Complete sale
//   const handleCompleteSale = () => {
//     if (cart.length === 0) {
//       alert('Kripya kuch products add karein');
//       return;
//     }

//     const saleData = {
//       customerName: customerName || 'Walk-in Customer',
//       customerPhone,
//       items: cart,
//       subtotal: calculateSubtotal(),
//       tax: calculateTax(),
//       discount,
//       total: calculateTotal(),
//       paymentMethod,
//       date: new Date().toISOString(),
//       invoiceNumber: `INV${Date.now().toString().slice(-6)}`,
//     };

//     console.log('Sale completed:', saleData);

//     // Show receipt
//     alert(`✅ Sale Successful!\n\nInvoice: ${saleData.invoiceNumber}\nTotal: ₹${calculateTotal()}\nPayment: ${paymentMethod}\n\nThank you for shopping!`);

//     // Reset form
//     setCart([]);
//     setCustomerName('');
//     setCustomerPhone('');
//     setDiscount(0);
//     setPaymentMethod('cash');
//   };

//   // Get stock badge color
//   const getStockBadge = (stock) => {
//     if (stock > 10) return 'bg-emerald-900/20 text-emerald-300 border border-emerald-500/30';
//     if (stock > 5) return 'bg-amber-900/20 text-amber-300 border border-amber-500/30';
//     return 'bg-red-900/20 text-red-300 border border-red-500/30';
//   };

//   // Get payment method badge
//   const getPaymentBadge = (method) => {
//     const styles = {
//       cash: 'bg-emerald-900/20 text-emerald-300 border border-emerald-500/30',
//       online: 'bg-blue-900/20 text-blue-300 border border-blue-500/30',
//       udhaar: 'bg-amber-900/20 text-amber-300 border border-amber-500/30',
//     };

//     return (
//       <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md ${styles[method] || 'bg-gray-900/20 text-gray-300 border border-gray-500/30'}`}>
//         {method === 'online' ? 'Online' : method === 'udhaar' ? 'Udhaar' : 'Cash'}
//       </span>
//     );
//   };

//   return (
//     <div className="space-y-6 min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
//       {/* Header */}
//       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">New Sale</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">Record new sales and generate bills</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
//             <Receipt size={20} />
//             Recent Sales
//           </button>
//           <button className="flex items-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all border border-blue-200 dark:border-blue-500/30 backdrop-blur-sm dark:backdrop-blur-md">
//             <Clock size={20} />
//             Today: {calculateSubtotal()}Rs
//           </button>
//         </div>
//       </header>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/20 dark:to-blue-700/10 backdrop-blur-sm dark:backdrop-blur-md border border-blue-200 dark:border-blue-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/40">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Today's Sales</p>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹{calculateSubtotal()}</h3>
//             </div>
//             <div className="p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-500/20">
//               <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-emerald-100/50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-700/10 backdrop-blur-sm dark:backdrop-blur-md border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500/40">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Active Cart Items</p>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{cart.length}</h3>
//             </div>
//             <div className="p-3 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
//               <ShoppingBag className="text-emerald-600 dark:text-emerald-400" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-amber-100/50 to-amber-50 dark:from-amber-900/20 dark:to-amber-700/10 backdrop-blur-sm dark:backdrop-blur-md border border-amber-200 dark:border-amber-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-500/40">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Available Products</p>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{products.length}</h3>
//             </div>
//             <div className="p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-500/20">
//               <Package className="text-amber-600 dark:text-amber-400" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-purple-100/50 to-purple-50 dark:from-purple-900/20 dark:to-purple-700/10 backdrop-blur-sm dark:backdrop-blur-md border border-purple-200 dark:border-purple-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-500/40">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Cart Utilization</p>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                 {Math.round((cart.reduce((sum, item) => sum + item.quantity, 0) / 50) * 100)}%
//               </h3>
//             </div>
//             <div className="p-3 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-500/20">
//               <Users className="text-purple-600 dark:text-purple-400" size={24} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Left Column - Products & Customer */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Customer Details */}
//           <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 tracking-tight">
//               <User size={20} className="text-blue-600 dark:text-blue-400" />
//               Customer Details
//             </h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Customer Name (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   placeholder="Customer name"
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Phone Number (Optional)
//                 </label>
//                 <input
//                   type="tel"
//                   value={customerPhone}
//                   onChange={(e) => setCustomerPhone(e.target.value)}
//                   placeholder="+91 9876543210"
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Product Search */}
//           <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 tracking-tight">
//                 <Search size={20} className="text-blue-600 dark:text-blue-400" />
//                 Search Products
//               </h2>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {filteredProducts.length} products available
//               </div>
//             </div>

//             {/* Search and Filter */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search products by name..."
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                 />
//               </div>

//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white appearance-none"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Products Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all hover:shadow-lg backdrop-blur-sm"
//                 >
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className={`px-2 py-1 rounded text-xs backdrop-blur-sm ${getStockBadge(product.stock)}`}>
//                           Stock: {product.stock}
//                         </span>
//                         <span className="text-xs text-gray-500 dark:text-gray-400">{product.category}</span>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => addToCart(product)}
//                       className="p-2 bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all border border-blue-200 dark:border-blue-500/30"
//                       title="Add to cart"
//                       disabled={product.stock === 0}
//                     >
//                       <Plus size={20} />
//                     </button>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="text-lg font-bold flex items-center gap-1 text-gray-900 dark:text-white">
//                       <IndianRupee size={16} className="text-gray-500 dark:text-gray-300" />
//                       {product.price}
//                     </div>
//                     <div className="text-sm text-emerald-600 dark:text-emerald-400">
//                       Profit: ₹{Math.round(product.price * 0.25)}
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => addToCart(product)}
//                     disabled={product.stock === 0}
//                     className={`w-full mt-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 backdrop-blur-sm ${product.stock === 0
//                         ? 'bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed border border-gray-300 dark:border-gray-700/50'
//                         : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 border border-blue-500/30'
//                       }`}
//                   >
//                     {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {filteredProducts.length === 0 && (
//               <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                 <ShoppingBag size={48} className="mx-auto mb-3 text-gray-400 dark:text-gray-600" />
//                 <p>No products found matching "{searchTerm}"</p>
//                 <p className="text-sm mt-1">Try a different search term</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Column - Cart & Payment */}
//         <div className="space-y-6">
//           {/* Cart */}
//           <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md sticky top-6 z-10">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//                 <ShoppingBag size={20} className="text-blue-600 dark:text-blue-400" />
//                 Shopping Cart
//               </h3>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {cart.reduce((sum, item) => sum + item.quantity, 0)} items
//               </div>
//             </div>

//             {/* Cart Items */}
//             <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//               {cart.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                   <ShoppingBag size={48} className="mx-auto mb-3 text-gray-400 dark:text-gray-600" />
//                   <p>Cart is empty</p>
//                   <p className="text-sm mt-1">Add products from the list</p>
//                 </div>
//               ) : (
//                 cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all backdrop-blur-sm"
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <div>
//                         <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Stock: {item.stock}</p>
//                       </div>
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="p-2 bg-red-100/50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/30 transition-all border border-red-200 dark:border-red-500/30"
//                         title="Remove"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           className="p-1 bg-gray-200 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600/50 text-gray-900 dark:text-white"
//                           disabled={item.quantity <= 1}
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="font-bold text-lg min-w-8 text-center text-gray-900 dark:text-white">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           className="p-1 bg-gray-200 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600/50 text-gray-900 dark:text-white"
//                           disabled={item.quantity >= item.stock}
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>

//                       <div className="text-right">
//                         <div className="font-bold flex items-center gap-1 text-gray-900 dark:text-white">
//                           <IndianRupee size={14} className="text-gray-500 dark:text-gray-300" />
//                           {item.price * item.quantity}
//                         </div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           ₹{item.price} × {item.quantity}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Cart Summary */}
//             {cart.length > 0 && (
//               <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
//                     <span className="font-medium flex items-center gap-1 text-gray-900 dark:text-white">
//                       <IndianRupee size={14} className="text-gray-500 dark:text-gray-300" />
//                       {calculateSubtotal()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700 dark:text-gray-300">Tax (5%):</span>
//                     <span className="font-medium flex items-center gap-1 text-gray-900 dark:text-white">
//                       <IndianRupee size={14} className="text-gray-500 dark:text-gray-300" />
//                       {calculateTax().toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700 dark:text-gray-300">Discount:</span>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="number"
//                         value={discount}
//                         onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
//                         className="w-24 px-2 py-1 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded text-right text-gray-900 dark:text-white"
//                         min="0"
//                         max={calculateSubtotal()}
//                       />
//                       <span className="font-medium text-red-600 dark:text-red-400 flex items-center gap-1">
//                         <IndianRupee size={14} />
//                         {discount}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700/50">
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
//                     <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
//                       <IndianRupee size={18} />
//                       {calculateTotal().toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Payment Method */}
//           <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
//             <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg tracking-tight">Payment Method</h3>
//             <div className="space-y-3">
//               {[
//                 { value: 'cash', label: 'Cash', icon: <Wallet size={20} />, color: 'bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' },
//                 { value: 'online', label: 'Online', icon: <Smartphone size={20} />, color: 'bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30' },
//                 { value: 'udhaar', label: 'Udhaar', icon: <CreditCard size={20} />, color: 'bg-amber-100/50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30' },
//               ].map((method) => (
//                 <label
//                   key={method.value}
//                   className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer transition-all backdrop-blur-sm ${paymentMethod === method.value
//                       ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-100/50 dark:bg-blue-900/20'
//                       : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 border-gray-300 dark:border-gray-700/50'
//                     }`}
//                 >
//                   <input
//                     type="radio"
//                     name="payment"
//                     value={method.value}
//                     checked={paymentMethod === method.value}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="text-blue-500"
//                   />
//                   <div className={`p-2 rounded-lg ${method.color}`}>
//                     {method.icon}
//                   </div>
//                   <span className="flex-1 font-medium text-gray-900 dark:text-white">{method.label}</span>
//                 </label>
//               ))}
//             </div>

//             {/* Complete Sale Button */}
//             <button
//               onClick={handleCompleteSale}
//               disabled={cart.length === 0}
//               className={`w-full py-3 px-4 rounded-xl font-medium mt-6 transition-all flex items-center justify-center gap-2 ${cart.length === 0
//                   ? 'bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed border border-gray-300 dark:border-gray-700/50'
//                   : 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-900/30'
//                 }`}
//             >
//               <Receipt size={20} />
//               Complete Sale
//             </button>

//             {/* Udhaar Warning */}
//             {paymentMethod === 'udhaar' && cart.length > 0 && (
//               <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-xl backdrop-blur-sm">
//                 <div className="flex items-start gap-2 text-amber-600 dark:text-amber-300">
//                   <CreditCard size={18} />
//                   <div className="text-sm">
//                     <p className="font-medium">Udhaar Selected</p>
//                     <p className="text-gray-600 dark:text-gray-300">This entry will be added to Udhaar Page</p>
//                     <p className="mt-1 text-gray-900 dark:text-white">Customer: {customerName || 'Walk-in Customer'}</p>
//                     <p className="text-amber-600 dark:text-amber-400">Amount: ₹{calculateTotal().toFixed(2)}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
//             <h3 className="font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Quick Actions</h3>
//             <div className="space-y-3">
//               <button
//                 onClick={() => {
//                   setCart([]);
//                   setDiscount(0);
//                 }}
//                 className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all backdrop-blur-sm"
//               >
//                 Clear Cart
//               </button>
//               <button className="w-full px-4 py-2 bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all backdrop-blur-sm">
//                 Save as Draft
//               </button>
//               <button className="w-full px-4 py-2 bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800/30 transition-all backdrop-blur-sm">
//                 Print Receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Sales;