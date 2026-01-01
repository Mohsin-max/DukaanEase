// src/components/Dashboard/RecentTransactions.jsx
import React from 'react';
import { IndianRupee } from 'lucide-react';

const RecentTransactions = ({ transactions }) => {
  const getPaymentBadge = (type) => {
    const styles = {
      Cash: 'bg-green-100 text-green-800',
      Online: 'bg-blue-100 text-blue-800',
      Udhaar: 'bg-yellow-100 text-yellow-800',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[type] || 'bg-gray-100'}`}>
        {type}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="font-medium">{formatDate(transaction.date)}</div>
                <div className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleTimeString('hi-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </td>
              <td className="py-3 px-4 font-medium">{transaction.product}</td>
              <td className="py-3 px-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium">
                  {transaction.quantity}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1 font-medium">
                  <IndianRupee size={16} />
                  {transaction.amount}
                </div>
              </td>
              <td className="py-3 px-4">{getPaymentBadge(transaction.paymentType)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {transactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No transactions found
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;