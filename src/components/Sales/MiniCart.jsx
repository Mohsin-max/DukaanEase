// src/components/Sales/MiniCart.jsx
import React from 'react';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const MiniCart = ({ cart, onUpdateQuantity, onRemoveItem, total }) => {
  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const getCartSummary = () => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalItems = cart.length;
    return { itemCount, totalItems };
  };

  const { itemCount, totalItems } = getCartSummary();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ShoppingBag size={20} />
          Shopping Cart
        </h3>
        <div className="text-sm text-gray-600">
          {itemCount} items ({totalItems} products)
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {cart.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingBag size={48} className="mx-auto mb-3 text-gray-300" />
            <p>Cart is empty</p>
            <p className="text-sm mt-1">Add products from the list</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 bg-white border rounded-lg hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-lg min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 bg-white border rounded-lg hover:bg-gray-100"
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-bold">₹{calculateItemTotal(item)}</div>
                  <div className="text-sm text-gray-600">
                    ₹{item.price} × {item.quantity}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (5%):</span>
              <span className="font-medium">₹{(total * 0.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium">₹0.00</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-2xl font-bold text-green-600">
                ₹{(total * 1.05).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;