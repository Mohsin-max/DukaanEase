// src/pages/Udhaar.jsx
import React, { useState } from 'react';
import { Filter, CheckCircle, XCircle, Phone, AlertTriangle, TrendingUp, Send } from 'lucide-react';

const Udhaar = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [Udhaars, setUdhaars] = useState([
  {
    id: 1,
    customer: 'Ahmed Khan',
    amount: 2500,
    date: '2025-12-28', // Today's date
    status: 'unpaid',
    phone: '+92 300 1234567',
    email: 'ahmed.khan@example.com',
    invoiceNumber: 'INV001',
  },
  {
    id: 2,
    customer: 'Muhammad Ali',
    amount: 1200,
    date: '2025-12-25', // 3 days ago
    status: 'paid',
    paidDate: '2025-12-26',
    phone: '+92 301 2345678',
    invoiceNumber: 'INV002',
  },
  {
    id: 3,
    customer: 'Fatima Bibi',
    amount: 850,
    date: '2025-12-24', // 4 days ago
    status: 'unpaid',
    phone: '+92 302 3456789',
    invoiceNumber: 'INV003',
  },
  {
    id: 4,
    customer: 'Hassan Raza',
    amount: 3200,
    date: '2025-12-20', // 8 days ago
    status: 'unpaid',
    phone: '+92 303 4567890',
    email: 'hassan.raza@example.com',
    invoiceNumber: 'INV004',
  },
  {
    id: 5,
    customer: 'Ayesha Malik',
    amount: 600,
    date: '2025-12-15', // 13 days ago
    status: 'paid',
    paidDate: '2025-12-20',
    phone: '+92 304 5678901',
    invoiceNumber: 'INV005',
  },
  {
    id: 6,
    customer: 'Ishaq Ahmed',
    amount: 1500,
    date: '2025-12-27', // 1 day ago
    status: 'unpaid',
    phone: '+92 305 6789012',
    invoiceNumber: 'INV006',
  },
  {
    id: 7,
    customer: 'Zainab Khan',
    amount: 750,
    date: '2025-12-23', // 5 days ago
    status: 'unpaid',
    phone: '+92 306 7890123',
    invoiceNumber: 'INV007',
  },
  {
    id: 8,
    customer: 'Bilal Shah',
    amount: 4200,
    date: '2025-12-18', // 10 days ago
    status: 'unpaid',
    phone: '+92 307 8901234',
    email: 'bilal.shah@example.com',
    invoiceNumber: 'INV008',
  },
  {
    id: 9,
    customer: 'Sara Khan',
    amount: 900,
    date: '2025-12-26', // 2 days ago
    status: 'unpaid',
    phone: '+92 308 9012345',
    invoiceNumber: 'INV009',
  },
  {
    id: 10,
    customer: 'Usman Malik',
    amount: 1800,
    date: '2025-12-22', // 6 days ago
    status: 'paid',
    paidDate: '2025-12-27',
    phone: '+92 309 0123456',
    invoiceNumber: 'INV010',
  },
]);

  // Filter Udhaars
  const filteredUdhaars = Udhaars.filter(Udhaar => {
    const matchesSearch = Udhaar.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Udhaar.phone.includes(searchTerm) ||
      Udhaar.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || Udhaar.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Calculate totals
  const pendingAmount = Udhaars
    .filter(Udhaar => Udhaar.status === 'unpaid')
    .reduce((sum, Udhaar) => sum + Udhaar.amount, 0);

  const overdueAmount = Udhaars
    .filter(Udhaar => {
      if (Udhaar.status === 'unpaid' && Udhaar.dueDate) {
        const dueDate = new Date(Udhaar.dueDate);
        const today = new Date();
        return dueDate < today;
      }
      return false;
    })
    .reduce((sum, Udhaar) => sum + Udhaar.amount, 0);

  const totalUdhaar = Udhaars.reduce((sum, Udhaar) => sum + Udhaar.amount, 0);

  // Handle mark as paid
  const handleMarkAsPaid = (id) => {
    setUdhaars(Udhaars.map(Udhaar =>
      Udhaar.id === id
        ? {
          ...Udhaar,
          status: 'paid',
          paidDate: new Date().toISOString().split('T')[0]
        }
        : Udhaar
    ));
  };


  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get days passed since udhaar date
  const getDaysPassedStatus = (udhaarDate, status) => {
    if (status === 'paid') return null;

    const givenDate = new Date(udhaarDate);
    const today = new Date();
    const diffTime = today - givenDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return {
        daysText: 'Today',
        message: '',
        color: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 backdrop-blur-sm'
      };
    } else if (diffDays <= 3) {
      return {
        daysText: `${diffDays} day${diffDays > 1 ? 's' : ''} passed`,
        message: '',
        color: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 backdrop-blur-sm'
      };
    } else if (diffDays <= 7) {
      return {
        daysText: `${diffDays} days passed`,
        message: 'Remind customer',
        color: 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20 backdrop-blur-sm'
      };
    } else {
      return {
        daysText: `${diffDays} days passed`,
        message: 'Need attention, call customer',
        color: 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 backdrop-blur-sm'
      };
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="px-2 py-1 w-fit bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center gap-1 border border-emerald-200 dark:border-emerald-500/20 rounded font-medium text-sm backdrop-blur-sm">
          <CheckCircle size={14} />
          Paid
        </span>
      );
    }
    return (
      <span className="w-fit px-2 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 flex items-center gap-1 border border-red-200 dark:border-red-500/20 rounded font-medium text-sm backdrop-blur-sm">
        <XCircle size={14} />
        Unpaid
      </span>
    );
  };

  // Send reminder
  const sendReminder = (Udhaar) => {
    alert(`Reminder sent to ${Udhaar.customer} (${Udhaar.phone})`);
  };

  return (
    <div className="space-y-6 min-h-screen p-4 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Udhaar Management</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">Track customer Udhaars and payments</p>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Pending - Red Glow */}
        <div className="bg-gradient-to-br from-red-100/50 to-red-50 dark:from-red-900/20 dark:to-red-700/10 backdrop-blur-sm border border-red-300/50 dark:border-red-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-red-500/10 ring-1 ring-red-400/20 dark:ring-red-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-red-700/70 dark:text-red-300/70 font-medium">Total Pending</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {pendingAmount.toLocaleString()} <span className='text-base text-zinc-400'>Rs</span>
              </h3>
            </div>
            <div className="p-3 bg-red-100/80 dark:bg-red-900/40 rounded-lg border border-red-300/50 dark:border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={22} />
            </div>
          </div>
          <div className="text-xs md:text-sm text-red-600/60 dark:text-red-400/60 mt-2 font-medium">
            {Udhaars.filter(c => c.status === 'unpaid').length} customers
          </div>
        </div>

        {/* Overdue Amount - Amber Glow */}
        <div className="bg-gradient-to-br from-amber-100/50 to-amber-50 dark:from-amber-900/20 dark:to-amber-700/10 backdrop-blur-sm border border-amber-300/50 dark:border-amber-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/20 dark:ring-amber-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-amber-700/70 dark:text-amber-300/70 font-medium">Overdue Amount</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1 flex items-center gap-1">
                {overdueAmount.toLocaleString()} <span className='text-base text-zinc-400'>Rs</span>
              </h3>
            </div>
            <div className="p-3 bg-amber-100/80 dark:bg-amber-900/40 rounded-lg border border-amber-300/50 dark:border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <AlertTriangle className="text-amber-600 dark:text-amber-400" size={22} />
            </div>
          </div>
          <div className="text-xs md:text-sm text-amber-600/60 dark:text-amber-400/60 mt-2 font-medium">
            Immediate action required
          </div>
        </div>

        {/* Total Udhaar Given - Blue Glow */}
        <div className="bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/20 dark:to-blue-700/10 backdrop-blur-sm border border-blue-300/50 dark:border-blue-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/20 dark:ring-blue-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-blue-700/70 dark:text-blue-300/70 font-medium">Total Udhaar Given</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1 flex items-center gap-1">
                {totalUdhaar.toLocaleString()} <span className='text-base text-zinc-400'>Rs</span>
              </h3>
            </div>
            <div className="p-3 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg border border-blue-300/50 dark:border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={22} />
            </div>
          </div>
          <div className="text-xs md:text-sm text-blue-600/60 dark:text-blue-400/60 mt-2 font-medium">
            {Udhaars.length} total transactions
          </div>
        </div>

        {/* Collection Rate - Emerald Glow */}
        <div className="bg-gradient-to-br from-emerald-100/50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-700/10 backdrop-blur-sm border border-emerald-300/50 dark:border-emerald-500/30 rounded-xl p-5 md:p-6 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/20 dark:ring-emerald-400/10 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-emerald-700/70 dark:text-emerald-300/70 font-medium">Collection Rate</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {Math.round((Udhaars.filter(c => c.status === 'paid').length / Math.max(Udhaars.length, 1)) * 100)}%
              </h3>
            </div>
            <div className="p-3 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg border border-emerald-300/50 dark:border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={22} />
            </div>
          </div>
          <div className="text-xs md:text-sm text-emerald-600/60 dark:text-emerald-400/60 mt-2 font-medium">
            {Udhaars.filter(c => c.status === 'paid').length} paid
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm dark:backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1 relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search customer, phone, invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 outline-none dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'paid', 'unpaid'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur-sm text-sm whitespace-nowrap ${filter === status
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700/50'
                  }`}
              >
                {status === 'all' ? 'All' : status === 'paid' ? 'Paid' : 'Unpaid'}
              </button>
            ))}
          </div>
        </div>

        {/* Udhaars Table - Mobile Friendly */}
        <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">Customer Details</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">Udhaar Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">Days Passed</th> {/* Changed from "Due Status" */}
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUdhaars.map((Udhaar) => {
                const daysPassedStatus = getDaysPassedStatus(Udhaar.date, Udhaar.status); // Use Udhaar.date (given date)

                return (
                  <tr key={Udhaar.id} className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4 text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">{Udhaar.customer}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Invoice: {Udhaar.invoiceNumber}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                        {Udhaar.amount} <span className='font-semibold'>Rs</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm"> {/* Changed this column */}
                      <div className="font-medium text-gray-900 dark:text-white">{formatDate(Udhaar.date)}</div>

                      {Udhaar.paidDate && (
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                          Paid: {formatDate(Udhaar.paidDate)}
                        </div>
                      )}
                    </td>
                    <td>
                      <a href={`tel:${Udhaar.phone}`} className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                        <Phone size={14} />
                        <span>{Udhaar.phone}</span>
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm">{getStatusBadge(Udhaar.status)}</td>
                    <td className="py-3 px-4 text-sm">
                      {daysPassedStatus && (
                        <div className="min-w-[120px]">
                          <div className={`w-fit px-2 py-1.5 rounded-full text-xs backdrop-blur-md ${daysPassedStatus.color}`}>
                            <div className="font-semibold text-center">{daysPassedStatus.daysText}</div>
                          </div>
                          {daysPassedStatus.message && (
                            <div className={`w-fit px-2 py-1 text-[10px] font-medium text-center ${daysPassedStatus.color.includes('yellow') ? 'text-yellow-400' :
                                daysPassedStatus.color.includes('red') ? 'text-red-400' : 
                                  'text-green-200 border-t border-green-500/20'
                              }`}>
                              {daysPassedStatus.message}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-2">
                        {Udhaar.status === 'unpaid' && (
                          <>
                            <button
                              onClick={() => handleMarkAsPaid(Udhaar.id)}
                              className="px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600/80 transition-all font-medium text-xs border border-emerald-500/30"
                            >
                              Mark as Paid
                            </button>
                            <button
                              onClick={() => sendReminder(Udhaar)}
                              className="px-3 py-1.5 bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all font-medium text-xs flex items-center justify-center gap-1 backdrop-blur-sm"
                            >
                              <Send size={14} />
                              Reminder
                            </button>
                          </>
                        )}
                        {Udhaar.status === 'paid' && (
                          <span className="text-emerald-500 dark:text-emerald-400 text-xs text-center">Payment completed</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Tips & Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="md:col-span-2 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-5 md:p-6">
          <h3 className="font-semibold text-blue-600 dark:text-blue-300 mb-4 text-lg">Udhaar Management Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-500/30 text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm">Call Customers on Time</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">Call customers when payment date arrives</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-500/30 text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm">Check Daily Records</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">Review all pending payments every day</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-500/30 text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm">Keep Records Updated</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">Mark payments as paid immediately</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-500/30 text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm">Send Reminder Messages</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">Send SMS 1-2 days before due date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Udhaar;