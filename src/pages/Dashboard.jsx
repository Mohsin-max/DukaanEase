// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { IndianRupee, TrendingUp, AlertCircle, DollarSign, ShoppingBag, Users, Package, CreditCard, Calendar, Clock, ArrowUpRight, ChevronRight, MoreVertical, Download, Filter, Plus, X, Printer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = ({ shopName }) => {
  const [stats] = useState({
    todaySales: 15250,
    totalCredit: 8450,
    lowStockItems: 3,
    profit: 4250,
    totalCustomers: 45,
    totalProducts: 28,
    monthlySales: 284500,
    dailyTransactions: 32,
  });

  const [transactions] = useState([
    { id: 1, invoiceId: 'INV-001', date: '2024-01-15', amount: 800, paymentType: 'Cash' },
    { id: 2, invoiceId: 'INV-002', date: '2024-01-15', amount: 600, paymentType: 'Online' },
    { id: 3, invoiceId: 'INV-003', date: '2024-01-14', amount: 250, paymentType: 'Udhaar' },
    { id: 4, invoiceId: 'INV-004', date: '2024-01-14', amount: 360, paymentType: 'Cash' },
    { id: 5, invoiceId: 'INV-005', date: '2024-01-13', amount: 400, paymentType: 'Online' },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal ke andar dikhane ke liye sample invoice details
  const invoiceDetails = {
    'INV-001': {
      customerName: 'Ali Khan',
      customerPhone: '+92 300 1234567',
      date: '2024-01-15',
      time: '14:30',
      items: [
        { product: 'Aata (5kg)', quantity: 2, price: 400, total: 800 },
        { product: 'Sugar (1kg)', quantity: 3, price: 100, total: 300 },
        { product: 'Cooking Oil', quantity: 1, price: 500, total: 500 }
      ],
      subtotal: 1600,
      tax: 160,
      discount: 50,
      total: 1710,
      paymentType: 'Cash',
      status: 'Paid'
    },
    'INV-002': {
      customerName: 'Ahmed Raza',
      customerPhone: '+92 333 7654321',
      date: '2024-01-15',
      time: '16:45',
      items: [
        { product: 'Chawal (10kg)', quantity: 1, price: 600, total: 600 },
        { product: 'Tea (250g)', quantity: 2, price: 200, total: 400 }
      ],
      subtotal: 1000,
      tax: 100,
      discount: 20,
      total: 1080,
      paymentType: 'Online',
      status: 'Paid'
    }
  };

  const handleViewInvoice = (invoiceId) => {
    setSelectedInvoice(invoiceId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const getPaymentBadge = (type) => {
    const styles = {
      Cash: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20',
      Online: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20',
      Udhaar: 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
    };

    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${styles[type] || 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400'}`}>
        {type}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  const cards = [
    {
      title: "Today's Sales",
      value: `${stats.todaySales.toLocaleString()} Rs`,
      icon: 'Rs',
      bgColor: 'bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/20 dark:to-blue-700/10 backdrop-blur-sm border border-blue-300/50 dark:border-blue-400/30 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/20 dark:ring-blue-400/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBgColor: 'px-2.5 rounded-lg bg-blue-200/80 dark:bg-blue-900/30 border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.4)]',
    },
    {
      title: 'Udhaar Amount',
      value: `${stats.totalCredit.toLocaleString()} Rs`,
      icon: <DollarSign size={20} />,
      bgColor: 'bg-gradient-to-br from-amber-100/50 to-amber-50 dark:from-amber-900/20 dark:to-amber-700/10 backdrop-blur-sm border border-amber-300/50 dark:border-amber-400/30 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/20 dark:ring-amber-400/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBgColor: 'p-2.5 rounded-lg bg-amber-200/80 dark:bg-amber-900/30 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.4)]',
    },
    {
      title: 'Low Stock',
      value: stats.lowStockItems,
      icon: <AlertCircle size={20} />,
      bgColor: 'bg-gradient-to-br from-rose-100/50 to-rose-50 dark:from-rose-900/20 dark:to-rose-700/10 backdrop-blur-sm border border-rose-300/50 dark:border-rose-400/30 shadow-lg shadow-rose-500/10 ring-1 ring-rose-400/20 dark:ring-rose-400/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
      change: 'Need attention',
      iconBgColor: 'p-2.5 rounded-lg bg-red-200/80 dark:bg-red-900/30 border border-red-400/40 shadow-[0_0_15px_rgba(244,63,94,0.4)]',
    },
    {
      title: 'Profit',
      value: `${stats.profit.toLocaleString()} Rs`,
      icon: <TrendingUp size={20} />,
      bgColor: 'bg-gradient-to-br from-emerald-100/50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-700/10 backdrop-blur-sm border border-emerald-300/50 dark:border-emerald-400/30 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/20 dark:ring-emerald-400/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      change: '+15.8%',
      iconBgColor: 'p-2.5 rounded-lg bg-green-200/80 dark:bg-green-900/30 border border-green-400/40 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
    },
  ];

  const quickStats = [
    { label: 'Customers', value: stats.totalCustomers, icon: <Users size={18} />, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Products', value: stats.totalProducts, icon: <Package size={18} />, color: 'text-violet-600 dark:text-violet-400' },
    { label: 'Monthly Sales', value: `${stats.monthlySales.toLocaleString()} Rs`, icon: <CreditCard size={18} />, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Transactions', value: stats.dailyTransactions, icon: <ShoppingBag size={18} />, color: 'text-amber-600 dark:text-amber-400' },
  ];

  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [topProducts] = useState([
    { name: 'Aata (5kg)', sales: 125, revenue: 50000, trend: 12 },
    { name: 'Chawal (10kg)', sales: 98, revenue: 58800, trend: 8 },
    { name: 'Cooking Oil', sales: 85, revenue: 17000, trend: 15 },
    { name: 'Sugar (1kg)', sales: 245, revenue: 12250, trend: 23 },
    { name: 'Dal Masoor', sales: 72, revenue: 8640, trend: 5 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-xl px-4 md:px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Welcome back, Saleem Ali</span>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                <Calendar size={12} />
                <span>{currentDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs md:text-sm">
              <div className="flex items-center gap-2 font-medium text-emerald-700 dark:text-emerald-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Open • 09:00 - 21:00
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <MoreVertical size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-xl p-4 md:p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                  <h3 className="text-xl md:text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{card.value}</h3>
                </div>
                <div className={`${card.iconBgColor || 'bg-white dark:bg-gray-800/50'} p-2 rounded-lg`}>
                  <div className={card.iconColor}>{card.icon}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs md:text-sm font-medium ${card.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                  card.trend === 'alert' ? 'text-rose-600 dark:text-rose-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                  {card.change}
                </span>
                {card.trend === 'up' && (
                  <ArrowUpRight size={16} className="text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs md:text-sm rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 whitespace-nowrap">
                  <Download size={14} />
                  Export
                </button>
                <button className="px-3 py-1.5 text-xs md:text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap">
                  <Plus size={14} />
                  New Sale
                </button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Date & Time</th>
                    <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Invoice ID</th>
                    {/* <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Customer Name</th> */}
                    <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                    <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Payment</th>
                    <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-xs md:text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">{formatDate(transaction.date)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                          {new Date(transaction.date).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                        <span className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                          {transaction.invoiceId}
                        </span>
                      </td>
                      {/* <td className="py-3 px-4 text-xs md:text-sm font-medium text-gray-900 dark:text-white">{transaction.customerName}</td> */}
                      <td className="py-3 px-4 text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-1">
                          {transaction.amount.toLocaleString()} Rs
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs md:text-sm">{getPaymentBadge(transaction.paymentType)}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleViewInvoice(transaction.invoiceId)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          <ChevronRight size={16} className="text-gray-500 dark:text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Top Products */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Top Products</h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 whitespace-nowrap">
                View all
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Package size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{product.name}</div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{product.sales} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">{product.revenue.toLocaleString()} Rs</div>
                    <div className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                      <TrendingUp size={12} />
                      +{product.trend}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-5">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all group">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/10 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/20 flex-shrink-0">
                  <ShoppingBag size={18} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">Add New Product</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Add items to inventory</div>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400 flex-shrink-0" />
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 transition-all group">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/20 flex-shrink-0">
                  <CreditCard size={18} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">Make New Sale</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Process customer purchase</div>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400 flex-shrink-0" />
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-500/5 transition-all group">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/10 group-hover:bg-amber-200 dark:group-hover:bg-amber-500/20 flex-shrink-0">
                  <AlertCircle size={18} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">Check Stock</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">View low stock items</div>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400 flex-shrink-0" />
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500/30 hover:bg-purple-50 dark:hover:bg-purple-500/5 transition-all group">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 group-hover:bg-purple-200 dark:group-hover:bg-purple-500/20 flex-shrink-0">
                  <TrendingUp size={18} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">View Report</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Detailed analytics</div>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Charts & Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Sales Trend */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3 px-4 md:px-5 pt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Daily Sales Trend</h3>
            </div>
            <div className="h-52 md:h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { day: 'Mon', sales: 8000 },
                    { day: 'Tue', sales: 12000 },
                    { day: 'Wed', sales: 18000 },
                    { day: 'Thu', sales: 11000 },
                    { day: 'Fri', sales: 16000 },
                    { day: 'Sat', sales: 21000 },
                    { day: 'Sun', sales: 14000 }
                  ]}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                    strokeOpacity={0.5}
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                    domain={[0, 100000]}
                    ticks={[0, 20000, 40000, 60000, 80000, 100000]}
                  />
                  <Tooltip
                    formatter={(value) => [`${value.toLocaleString()}`, 'Sales']}
                    labelFormatter={(label) => `Day: ${label}`}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      background: '#ffffff',
                      padding: '8px 12px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      color: '#111827',
                    }}
                  />
                  <Bar
                    dataKey="sales"
                    radius={[6, 6, 0, 0]}
                    className="fill-blue-500 hover:fill-blue-600 dark:fill-blue-500 dark:hover:fill-blue-400"
                    barSize={32}
                    animationDuration={1500}
                    animationBegin={0}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-5">Payment Methods</h3>
            <div className="space-y-4 text-sm">
              {[
                { method: 'Cash', percentage: 60, amount: '9,150 Rs', color: 'bg-emerald-500' },
                { method: 'Online', percentage: 25, amount: '3,812 Rs', color: 'bg-blue-500' },
                { method: 'Udhaar', percentage: 15, amount: '2,288 Rs', color: 'bg-amber-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{item.method}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-right">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Stock Alerts</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 whitespace-nowrap">
                {stats.lowStockItems} items
              </span>
            </div>
            <div className="space-y-3">
              {[
                { product: 'Cooking Oil', stock: 3, required: 20, critical: true },
                { product: 'Sugar (1kg)', stock: 4, required: 15, critical: true },
                { product: 'Tea (250g)', stock: 5, required: 12, critical: false },
              ].map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-rose-200 dark:hover:border-rose-500/20 transition-colors gap-3">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{item.product}</div>
                    <div className={`text-xs ${item.critical ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {item.stock} of {item.required} units
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs rounded-lg bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
                    Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Invoice Modal */}
      {isModalOpen && selectedInvoice && invoiceDetails[selectedInvoice] && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md md:max-w-lg mx-4 my-8 p-4 md:p-6 shadow-2xl">
            {/* Modal Header - Mobile friendly */}
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">Invoice Details</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Invoice ID: {selectedInvoice}</p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Printer size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={closeModal}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Invoice Content - Mobile optimized */}
            <div className="space-y-4 md:space-y-6">
              {/* Invoice Details - Stacked on mobile */}
              <div className="p-3 md:p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm md:text-base">Invoice Details</h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <span className="block">Date: {invoiceDetails[selectedInvoice].date}</span>
                    <span className="block">Time: {invoiceDetails[selectedInvoice].time}</span>
                  </div>
                  <div className="text-xs md:text-sm">
                    <span className={`px-2 py-1 rounded-md font-medium ${invoiceDetails[selectedInvoice].paymentType === 'Cash'
                        ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                        : invoiceDetails[selectedInvoice].paymentType === 'Online'
                          ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20'
                          : 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'
                      }`}>
                      {invoiceDetails[selectedInvoice].paymentType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table - Scrollable on mobile */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">Items Purchased</h4>
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full min-w-[300px]">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-2 px-2 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Product</th>
                        <th className="text-left py-2 px-2 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Qty</th>
                        <th className="text-left py-2 px-2 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Price</th>
                        <th className="text-left py-2 px-2 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceDetails[selectedInvoice].items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800/50">
                          <td className="py-2 px-2 text-xs md:text-sm text-gray-900 dark:text-white truncate max-w-[120px]">
                            {item.product}
                          </td>
                          <td className="py-2 px-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center">
                            {item.quantity}
                          </td>
                          <td className="py-2 px-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            {item.price.toLocaleString()} Rs
                          </td>
                          <td className="py-2 px-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                            {item.total.toLocaleString()} Rs
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary - Compact on mobile */}
              <div className="p-3 md:p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                    {invoiceDetails[selectedInvoice].subtotal.toLocaleString()} Rs
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Tax (10%)</span>
                  <span className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                    {invoiceDetails[selectedInvoice].tax.toLocaleString()} Rs
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Discount</span>
                  <span className="text-xs md:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    -{invoiceDetails[selectedInvoice].discount.toLocaleString()} Rs
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">Total Amount</span>
                    <span className="text-sm md:text-base font-semibold text-blue-600 dark:text-blue-400">
                      {invoiceDetails[selectedInvoice].total.toLocaleString()} Rs
                    </span>
                  </div>
                </div>

                {/* Payment Status - Compact */}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${invoiceDetails[selectedInvoice].status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></div>
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {invoiceDetails[selectedInvoice].status}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Payment: {invoiceDetails[selectedInvoice].paymentType}
                  </div>
                </div>
              </div>

              {/* Modal Footer - Stacked on mobile */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-1"
                >
                  Close
                </button>
                <button className="px-4 py-2.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 flex-1">
                  <Printer size={14} />
                  <span>Print Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;