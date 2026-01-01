// src/pages/Reports.jsx
import React, { useState } from 'react';
import { RefreshCw, TrendingUp, AlertTriangle, Download, DollarSign, ShoppingBag, Users, Package, IndianRupee, ArrowUpRight, FileText, Printer, Share2, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Pie, PieChart, Cell } from 'recharts';


const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-01-31');

  // Sales data for charts
  const salesData = {
    daily: [
      { day: 'Mon', sales: 12500, profit: 3125, transactions: 28 },
      { day: 'Tue', sales: 15200, profit: 3800, transactions: 32 },
      { day: 'Wed', sales: 9800, profit: 2450, transactions: 22 },
      { day: 'Thu', sales: 16500, profit: 4125, transactions: 35 },
      { day: 'Fri', sales: 19200, profit: 4800, transactions: 38 },
      { day: 'Sat', sales: 21500, profit: 5375, transactions: 42 },
      { day: 'Sun', sales: 18500, profit: 4625, transactions: 36 },
    ],
    weekly: [
      { week: 'Week 1', sales: 65000, profit: 16250, transactions: 140 },
      { week: 'Week 2', sales: 72000, profit: 18000, transactions: 155 },
      { week: 'Week 3', sales: 81000, profit: 20250, transactions: 165 },
      { week: 'Week 4', sales: 85000, profit: 21250, transactions: 170 },
    ],
    monthly: [
      { month: 'Jan', sales: 284500, profit: 71125, transactions: 630 },
      { month: 'Feb', sales: 312000, profit: 78000, transactions: 690 },
      { month: 'Mar', sales: 298000, profit: 74500, transactions: 650 },
      { month: 'Apr', sales: 325000, profit: 81250, transactions: 710 },
    ]
  };

  const [weekdateRange, setweekDateRange] = useState('week');

  // Data for growth/trend line chart
  const dataSets = {
    week: [
      { day: 'Mon', sales: 85000, profit: 21250, change: 2.5 },
      { day: 'Tue', sales: 120000, profit: 30000, change: 5.8 },
      { day: 'Wed', sales: 95000, profit: 23750, change: -1.2 },
      { day: 'Thu', sales: 140000, profit: 35000, change: 4.3 },
      { day: 'Fri', sales: 180000, profit: 45000, change: 8.7 },
      { day: 'Sat', sales: 210000, profit: 52500, change: 12.4 },
      { day: 'Sun', sales: 160000, profit: 40000, change: -3.2 }
    ],
    month: [
      { week: 'Week 1', sales: 450000, profit: 112500, change: 3.5 },
      { week: 'Week 2', sales: 520000, profit: 130000, change: 8.2 },
      { week: 'Week 3', sales: 610000, profit: 152500, change: 12.8 },
      { week: 'Week 4', sales: 680000, profit: 170000, change: 15.4 }
    ],
    quarter: [
      { month: 'Jan', sales: 1850000, profit: 462500, change: 5.2 },
      { month: 'Feb', sales: 2100000, profit: 525000, change: 9.7 },
      { month: 'Mar', sales: 2400000, profit: 600000, change: 14.3 },
      { month: 'Apr', sales: 2650000, profit: 662500, change: 18.6 }
    ]
  };

  const currentDataa = dataSets[weekdateRange];
  const maxValue = Math.max(...currentDataa.map(item => item.sales));

  // Current data based on selected range
  const currentData = salesData[dateRange === 'week' ? 'daily' : dateRange === 'month' ? 'weekly' : 'monthly'];
  const maxSales = Math.max(...currentData.map(d => d.sales));

  // Category Data for Pie Chart
  const categoryData = [
    { name: 'Electronics', value: 30, sales: 450000, color: '#3b82f6' },
    { name: 'Fashion', value: 25, sales: 375000, color: '#8b5cf6' },
    { name: 'Home & Kitchen', value: 20, sales: 300000, color: '#10b981' },
    { name: 'Books', value: 15, sales: 225000, color: '#f59e0b' },
    { name: 'Others', value: 10, sales: 150000, color: '#ef4444' }
  ];


  // Top products
  const topProducts = [
    { name: 'Aata (5kg)', sales: 125, revenue: 50000, profit: 12500 },
    { name: 'Chawal (10kg)', sales: 98, revenue: 58800, profit: 14700 },
    { name: 'Cooking Oil', sales: 85, revenue: 17000, profit: 4250 },
    { name: 'Sugar (1kg)', sales: 245, revenue: 12250, profit: 3062.5 },
    { name: 'Dal Masoor', sales: 72, revenue: 8640, profit: 2160 },
  ];

  // Low stock items
  const lowStockItems = [
    { name: 'Cooking Oil', quantity: 3, required: 20, lastOrder: '2024-01-10' },
    { name: 'Sugar (1kg)', quantity: 4, required: 15, lastOrder: '2024-01-12' },
    { name: 'Dal Masoor', quantity: 2, required: 10, lastOrder: '2024-01-08' },
    { name: 'Tea (250g)', quantity: 5, required: 12, lastOrder: '2024-01-15' },
    { name: 'Biscuits', quantity: 4, required: 25, lastOrder: '2024-01-05' },
  ];

  // Credit summary
  const creditSummary = {
    total: 8450,
    paid: 1800,
    pending: 6650,
    overdue: 2500,
    customers: 5,
  };

  // Statistics
  const stats = {
    totalSales: 284500,
    netProfit: 71125,
    avgTransaction: 452,
    totalTransactions: 630,
    customerCount: 45,
    profitMargin: '25%',
    growthRate: '+15.2%',
  };


  // Export report
  const exportReport = (format) => {
    alert(`Exporting ${format} report...`);
  };

  // Calculate percentage change
  const calculateChange = (current, previous) => {
    if (previous === 0) return '+100%';
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  // Quick stats cards
  const quickStats = [
    { label: 'Total Customers', value: stats.customerCount, icon: <Users size={20} /> },
    { label: 'Total Products', value: 28, icon: <Package size={20} /> },
    { label: 'Avg. Daily Profit', value: '2,375 Rs', icon: <TrendingUp size={20} /> },
    { label: 'Collection Rate', value: '78%', icon: <DollarSign size={20} /> },
  ];

  return (
    <div className="space-y-6 min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Analytics & Reports</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">Detailed business insights and analytics</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportReport('pdf')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md text-sm whitespace-nowrap"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button
            onClick={() => exportReport('excel')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-900/30 text-sm whitespace-nowrap"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export Excel</span>
            <span className="sm:hidden">Excel</span>
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Sales - Blue Glow */}
        <div className="bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/20 dark:to-blue-700/10 backdrop-blur-md rounded-xl p-5 md:p-6 border border-blue-300/50 dark:border-blue-500/30 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/20 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Total Sales</h3>
            <div className="p-2.5 bg-blue-200/50 dark:bg-blue-900/40 rounded-lg border border-blue-300/50 dark:border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <ShoppingBag size={22} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {/* <IndianRupee size={24} className="text-blue-500 dark:text-blue-400" strokeWidth={3} /> */}
            {stats.totalSales.toLocaleString()} <span className='text-base'>Rs</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-blue-600/60 dark:text-blue-400/60">This month</div>
          <div className="flex items-center gap-1 text-xs font-bold mt-2 text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight size={14} strokeWidth={3} />
            {stats.growthRate} from last month
          </div>
        </div>

        {/* Net Profit - Emerald Glow */}
        <div className="bg-gradient-to-br from-emerald-100/50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-700/10 backdrop-blur-md rounded-xl p-5 md:p-6 border border-emerald-300/50 dark:border-emerald-500/30 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/20 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Net Profit</h3>
            <div className="p-2.5 bg-emerald-200/50 dark:bg-emerald-900/40 rounded-lg border border-emerald-300/50 dark:border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <TrendingUp size={22} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {/* <IndianRupee size={24} className="text-emerald-500 dark:text-emerald-400" strokeWidth={3} /> */}
            {stats.netProfit.toLocaleString()} <span className='text-base'>Rs</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-emerald-600/60 dark:text-emerald-400/60">{stats.profitMargin} margin</div>
          <div className="flex items-center gap-1 text-xs font-bold mt-2 text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight size={14} strokeWidth={3} />
            +12.8% from last month
          </div>
        </div>

        {/* Pending Credit - Amber Glow */}
        <div className="bg-gradient-to-br from-amber-100/50 to-amber-50 dark:from-amber-900/20 dark:to-amber-700/10 backdrop-blur-md rounded-xl p-5 md:p-6 border border-amber-300/50 dark:border-amber-500/30 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/20 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Pending Udhaar</h3>
            <div className="p-2.5 bg-amber-200/50 dark:bg-amber-900/40 rounded-lg border border-amber-300/50 dark:border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <AlertTriangle size={22} className="text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {/* <IndianRupee size={24} className="text-amber-500 dark:text-amber-400" strokeWidth={3} /> */}
            {creditSummary.pending.toLocaleString()} <span className='text-base'>Rs</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-amber-600/60 dark:text-amber-400/60">{creditSummary.customers} customers</div>
          <div className="flex items-center gap-1 text-xs font-bold mt-2 text-red-600 dark:text-red-400">
            <IndianRupee size={14} strokeWidth={3} />
            {creditSummary.overdue} overdue
          </div>
        </div>

        {/* Exchange Rate - Pink Glow */}
        <div className="bg-gradient-to-br from-pink-100/50 to-pink-50 dark:from-pink-900/20 dark:to-pink-700/10 backdrop-blur-md rounded-xl p-5 md:p-6 border border-pink-300/50 dark:border-pink-500/30 shadow-lg shadow-pink-500/10 ring-1 ring-pink-400/20 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Exchange Rate</h3>
            <div className="p-2.5 bg-pink-200/50 dark:bg-pink-900/40 rounded-lg border border-pink-300/50 dark:border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <RefreshCw size={22} className="text-pink-600 dark:text-pink-400" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            12.5<span className="text-lg">%</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-pink-600/60 dark:text-pink-400/60">
            Items returned/exchanged
          </div>
          <div className="flex items-center gap-1 text-xs font-bold mt-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle size={14} strokeWidth={3} />
            5 exchanges this month
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-5 tracking-tight">Quick Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30 backdrop-blur-sm transition-all hover:border-blue-400 dark:hover:border-blue-500/30">
              <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                {stat.icon}
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={22} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Sales Growth Trend</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {dateRange === 'week' ? 'Last 7 Days' : dateRange === 'month' ? 'Last 4 Weeks' : 'Last 4 Months'}
              </div>
              <select
                className="text-xs md:text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="quarter">Quarterly</option>
              </select>
            </div>
          </div>

          {/* Line/Area Chart for Growth Trend */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={currentData}
                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                  strokeOpacity={0.5}
                />

                <XAxis
                  dataKey={dateRange === 'week' ? 'day' : dateRange === 'month' ? 'week' : 'month'}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `${value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value}`}
                />

                <Tooltip
                  formatter={(value, name) => {
                    const formattedValue = typeof value === 'number' ? value.toLocaleString() : value;
                    const labelMap = {
                      sales: 'Sales: ',
                      profit: 'Profit: ',
                      change: 'Change: '
                    };
                    return [`${labelMap[name] || ''}${formattedValue}${name === 'change' ? '%' : ''} Rs`, name];
                  }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '12px',
                    padding: '8px 12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />

                {/* Sales Area Chart */}
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />

                {/* Profit Line */}
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

                {/* Growth/Change Line (Optional) */}
                <Line
                  type="monotone"
                  dataKey="change"
                  stroke="#f59e0b"
                  strokeWidth={1}
                  dot={false}
                  strokeDasharray="3 3"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stats with Growth Indicators */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-500/20 backdrop-blur-sm text-sm">
              <div className="text-gray-700 dark:text-gray-300">Total Sales</div>
              <div className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-300">
                {currentData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()} <span className='text-sm'>Rs</span>
              </div>
              <div className={`text-xs mt-1 ${currentData[currentData.length - 1].change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {currentData[currentData.length - 1].change >= 0 ? '↑' : '↓'} {Math.abs(currentData[currentData.length - 1].change)}% vs last
              </div>
            </div>

            <div className="text-center p-3 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-500/20 backdrop-blur-sm text-sm">
              <div className="text-gray-700 dark:text-gray-300">Total Profit</div>
              <div className="text-lg md:text-xl font-bold text-emerald-600 dark:text-emerald-300">
                {currentData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()} <span className='text-sm'>Rs</span>
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                ↑ {(currentData.reduce((sum, item) => sum + item.profit, 0) / currentData.reduce((sum, item) => sum + item.sales, 0) * 100).toFixed(1)}% margin
              </div>
            </div>

            <div className="text-center p-3 bg-purple-100/50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-500/20 backdrop-blur-sm text-sm">
              <div className="text-gray-700 dark:text-gray-300">Growth Rate</div>
              <div className="text-lg md:text-xl font-bold text-purple-600 dark:text-purple-300">
                {((currentData[currentData.length - 1].sales - currentData[0].sales) / currentData[0].sales * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Overall period growth
              </div>
            </div>
          </div>
        </div>

        {/* Profit Trend */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <div className="flex items-center gap-3 mb-5">
            <LineChart className="text-emerald-600 dark:text-emerald-400" size={22} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Profit Trend</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-700 dark:text-gray-300">This Week</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-300">28,100 Rs</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">+15%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full transition-all hover:bg-emerald-400" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-700 dark:text-gray-300">This Month</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-300">75,750 Rs</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">+12.8%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full transition-all hover:bg-emerald-400" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-700 dark:text-gray-300">This Year</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-300">8,45,000 Rs</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">+18.2%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full transition-all hover:bg-emerald-400" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700/50 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Avg. Daily Profit</span>
                <span className="font-bold text-blue-600 dark:text-blue-300">2,375 Rs</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-700 dark:text-gray-300">Profit Margin</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-300">25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category & Top Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Category Distribution with Recharts Pie Chart */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <div className="flex items-center gap-3 mb-5">
            <PieChart className="text-purple-600 dark:text-purple-400" size={22} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Category Distribution</h3>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Recharts Pie Chart */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#374152"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}% (${props.payload.sales.toLocaleString()} Rs)`,
                      props.payload.name
                    ]}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '12px',
                      padding: '8px 12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold fill-gray-900 dark:fill-white"
                  >
                    1.5M Rs
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category List */}
            <div className="space-y-3 flex-1 w-full">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-lg transition-colors text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">{item.value}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {item.sales.toLocaleString()} Rs
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Top Selling Products</h3>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">This month</div>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30 transition-all hover:border-blue-400 dark:hover:border-blue-500/30 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg flex items-center justify-center font-bold border border-blue-200 dark:border-blue-500/30">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{product.sales} units sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">{product.revenue.toLocaleString()}</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400">{product.profit} Rs profit</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock & Credit Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Low Stock Items - Better */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={22} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Items</h3>
            </div>
            <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all border border-blue-500/30 flex items-center gap-1">
              <ShoppingBag size={14} />
              Order All
            </button>
          </div>

          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50/50 to-red-50/30 dark:from-amber-900/10 dark:to-red-900/10 rounded-lg border border-amber-200 dark:border-amber-500/20">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    {item.name}
                    {item.quantity < 3 && (
                      <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded">Urgent</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Required: {item.required} units • Last order: {item.lastOrder}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className={`text-lg font-bold ${item.quantity < 3 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {item.quantity} units
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs rounded hover:from-green-500 hover:to-green-400 transition-all border border-green-500/30">
                      Order Now
                    </button>
                    <button className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-all border border-gray-300 dark:border-gray-700">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Summary - Simple */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="text-emerald-600 dark:text-emerald-400" size={22} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Credit Status</h3>
          </div>

          <div className="space-y-4 text-sm">
            {/* Total Credit */}
            <div className="flex items-center justify-between p-3 bg-blue-100/30 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Total Credit Given</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{creditSummary.total} Rs</span>
            </div>

            {/* Paid */}
            <div className="flex items-center justify-between p-3 bg-emerald-100/30 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Paid Back</span>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{creditSummary.paid} Rs</span>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between p-3 bg-amber-100/30 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Still Pending</span>
              </div>
              <span className="font-bold text-amber-600 dark:text-amber-400">{creditSummary.pending} Rs</span>
            </div>

            {/* Overdue */}
            <div className="flex items-center justify-between p-3 bg-red-100/30 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Overdue Amount</span>
              </div>
              <span className="font-bold text-red-600 dark:text-red-400">{creditSummary.overdue} Rs</span>
            </div>
          </div>

          {/* Simple Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 rounded-xl border border-blue-200 dark:border-blue-500/30">
            <div className="text-center">
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Collection Rate</div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round((creditSummary.paid / creditSummary.total) * 100)}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {creditSummary.customers} customers • Target: 80%
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Reports;