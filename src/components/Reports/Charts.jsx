// src/components/Reports/Charts.jsx
import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';

const Charts = () => {
  const [dateRange, setDateRange] = useState('week');

  const salesData = {
    week: [
      { day: 'Mon', sales: 12500, profit: 3125 },
      { day: 'Tue', sales: 15200, profit: 3800 },
      { day: 'Wed', sales: 9800, profit: 2450 },
      { day: 'Thu', sales: 16500, profit: 4125 },
      { day: 'Fri', sales: 19200, profit: 4800 },
      { day: 'Sat', sales: 21500, profit: 5375 },
      { day: 'Sun', sales: 18500, profit: 4625 },
    ],
    month: [
      { week: 'Week 1', sales: 65000, profit: 16250 },
      { week: 'Week 2', sales: 72000, profit: 18000 },
      { week: 'Week 3', sales: 81000, profit: 20250 },
      { week: 'Week 4', sales: 85000, profit: 21250 },
    ],
  };

  const currentData = salesData[dateRange];
  const maxSales = Math.max(...currentData.map(d => d.sales));

  const categoryData = [
    { name: 'Kirana', value: 45, color: '#3B82F6' },
    { name: 'Pulses', value: 20, color: '#10B981' },
    { name: 'Oil', value: 15, color: '#F59E0B' },
    { name: 'Spices', value: 10, color: '#EF4444' },
    { name: 'Others', value: 10, color: '#8B5CF6' },
  ];

  const handleDownload = (type) => {
    alert(`Downloading ${type} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                dateRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => handleDownload('pdf')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            PDF Report
          </button>
          <button
            onClick={() => handleDownload('excel')}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download size={18} />
            Excel Export
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-blue-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Daily Sales Chart</h3>
            </div>
            <div className="text-sm text-gray-600">
              {dateRange === 'week' ? 'Last 7 Days' : 'Last 4 Weeks'}
            </div>
          </div>

          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end gap-2 px-4">
              {currentData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center">
                    <div
                      className="w-3/4 bg-blue-500 rounded-t-lg relative group"
                      style={{ height: `${(item.sales / maxSales) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                        ₹{item.sales.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{item.day || item.week}</div>
                  <div className="text-xs text-green-600">₹{item.profit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profit Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-green-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Profit Trend</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-bold text-green-600">₹28,100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-bold text-green-600">₹75,750</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">This Year</span>
                <span className="font-bold text-green-600">₹8,45,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="text-purple-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Category Distribution</h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                </div>
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {(() => {
                  let currentAngle = 0;
                  return categoryData.map((item, index) => {
                    const angle = (item.value / 100) * 360;
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    const x1 = 50 + 50 * Math.cos((currentAngle * Math.PI) / 180);
                    const y1 = 50 + 50 * Math.sin((currentAngle * Math.PI) / 180);
                    const x2 = 50 + 50 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                    const y2 = 50 + 50 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                    
                    currentAngle += angle;
                    
                    return (
                      <path
                        key={index}
                        d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  });
                })()}
              </svg>
            </div>
            
            <div className="space-y-3 flex-1">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Selling Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Aata (5kg)', sales: 125, revenue: 50000 },
              { name: 'Chawal (10kg)', sales: 98, revenue: 58800 },
              { name: 'Cooking Oil', sales: 85, revenue: 17000 },
              { name: 'Sugar (1kg)', sales: 245, revenue: 12250 },
              { name: 'Dal Masoor', sales: 72, revenue: 8640 },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.sales} units sold</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{product.revenue.toLocaleString()}</div>
                  <div className="text-sm text-green-600">+{Math.floor(Math.random() * 20) + 10}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;