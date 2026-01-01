// src/components/Sales/ProductSearch.jsx
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const ProductSearch = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockBadge = (stock) => {
    if (stock > 10) return 'bg-green-100 text-green-800';
    if (stock > 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Product naam se dhoondein..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-800">{product.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded text-xs ${getStockBadge(product.stock)}`}>
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                title="Add to cart"
                disabled={product.stock === 0}
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">₹{product.price}</div>
              <div className="text-sm text-gray-500">
                Profit: ₹{product.price * 0.25}
              </div>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className={`w-full mt-3 py-2 rounded-lg font-medium transition-colors ${
                product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default ProductSearch;