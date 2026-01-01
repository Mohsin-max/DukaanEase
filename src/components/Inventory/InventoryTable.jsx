// src/components/Inventory/InventoryTable.jsx
import React from 'react';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';

const InventoryTable = ({ products, onEdit, onDelete }) => {
  const getStockBadge = (quantity) => {
    if (quantity <= 0) {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-lg font-medium flex items-center gap-1">
          <AlertTriangle size={14} />
          Out of Stock
        </span>
      );
    } else if (quantity < 5) {
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg font-medium flex items-center gap-1">
          <AlertTriangle size={14} />
          Low Stock
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg font-medium">
          In Stock
        </span>
      );
    }
  };

  const getProfit = (item) => {
    if (item.purchasePrice && item.price) {
      const profit = item.price - item.purchasePrice;
      const profitPercentage = ((profit / item.purchasePrice) * 100).toFixed(1);
      return { profit, profitPercentage };
    }
    return { profit: 0, profitPercentage: 0 };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Item Name</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Profit</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const { profit, profitPercentage } = getProfit(product);
            
            return (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">SKU: {product.id}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">
                    {product.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-lg font-medium">{product.quantity}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">₹{product.price}</div>
                  {product.purchasePrice && (
                    <div className="text-sm text-gray-500">
                      Cost: ₹{product.purchasePrice}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-green-600">₹{profit}</div>
                  <div className="text-sm text-green-500">{profitPercentage}%</div>
                </td>
                <td className="py-3 px-4">{getStockBadge(product.quantity)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found. Add your first product!
        </div>
      )}
    </div>
  );
};

export default InventoryTable;