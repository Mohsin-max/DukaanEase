// src/components/Udhaar/CreditTable.jsx
import React from 'react';
import { CheckCircle, XCircle, Phone, Mail } from 'lucide-react';

const CreditTable = ({ credits, onMarkAsPaid, filter }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <CheckCircle size={14} />
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
        <XCircle size={14} />
        Unpaid
      </span>
    );
  };

  const getDueStatus = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <span className="text-red-600 font-medium">Overdue by {Math.abs(diffDays)} days</span>;
    } else if (diffDays === 0) {
      return <span className="text-orange-600 font-medium">Due today</span>;
    } else if (diffDays <= 7) {
      return <span className="text-yellow-600 font-medium">Due in {diffDays} days</span>;
    }
    return <span className="text-gray-600">Due in {diffDays} days</span>;
  };

  const filteredCredits = filter === 'all' 
    ? credits 
    : credits.filter(credit => credit.status === filter);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer Details</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Status</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCredits.map((credit) => (
            <tr key={credit.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <div className="font-medium">{credit.customer}</div>
                <div className="text-sm text-gray-500 mt-1">Invoice: #{credit.invoiceNumber || `INV${credit.id}`}</div>
                <div className="flex items-center gap-3 mt-2">
                  {credit.phone && (
                    <a href={`tel:${credit.phone}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                      <Phone size={14} />
                      <span className="text-sm">{credit.phone}</span>
                    </a>
                  )}
                  {credit.email && (
                    <a href={`mailto:${credit.email}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                      <Mail size={14} />
                      <span className="text-sm">{credit.email}</span>
                    </a>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="text-lg font-bold">₹{credit.amount}</div>
                {credit.interest > 0 && (
                  <div className="text-sm text-red-600">
                    Interest: ₹{credit.interest}
                  </div>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="font-medium">{formatDate(credit.dueDate || credit.date)}</div>
                <div className="text-sm text-gray-500">
                  Given: {formatDate(credit.date)}
                </div>
              </td>
              <td className="py-3 px-4">{getStatusBadge(credit.status)}</td>
              <td className="py-3 px-4">{getDueStatus(credit.dueDate || credit.date)}</td>
              <td className="py-3 px-4">
                <div className="flex flex-col gap-2">
                  {credit.status === 'unpaid' && (
                    <>
                      <button
                        onClick={() => onMarkAsPaid(credit.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                      >
                        Mark as Paid
                      </button>
                      <button
                        className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
                      >
                        Send Reminder
                      </button>
                    </>
                  )}
                  {credit.status === 'paid' && (
                    <span className="text-sm text-gray-500">Paid on {formatDate(credit.paidDate)}</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredCredits.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {filter === 'all' ? 'No credit records found' : `No ${filter} records found`}
        </div>
      )}
    </div>
  );
};

export default CreditTable;