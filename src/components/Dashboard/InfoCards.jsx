// src/components/Dashboard/InfoCards.jsx
import React from 'react';

const InfoCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02]`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{card.value}</h3>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              {card.icon}
            </div>
          </div>
          
          {/* Progress indicator (if applicable) */}
          {card.progress !== undefined && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Growth</span>
                <span className="font-medium text-green-600">+{card.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${Math.min(card.progress, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InfoCards;