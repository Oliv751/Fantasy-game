import React from "react";
import PropTypes from "prop-types";

const InventoryView = ({ inventory }) => (
  <div className="min-h-screen bg-gradient-to-b from-green-900 via-teal-900 to-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">🎒</div>
        <h2 className="text-3xl font-bold">Inventory</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map((item) => (
          <div
            key={item.id}
            className={`bg-gray-800/80 rounded-lg p-4 border-2 backdrop-blur ${
              item.rarity === "common"
                ? "border-gray-600"
                : item.rarity === "uncommon"
                ? "border-green-500"
                : item.rarity === "rare"
                ? "border-blue-500"
                : "border-purple-500"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{item.name}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.rarity === "common"
                    ? "bg-gray-600"
                    : item.rarity === "uncommon"
                    ? "bg-green-600"
                    : item.rarity === "rare"
                    ? "bg-blue-600"
                    : "bg-purple-600"
                }`}
              >
                {item.rarity}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-2 capitalize">{item.type}</p>
            {item.damage && (
              <p className="text-red-400">⚔️ {item.damage} damage</p>
            )}
            {item.defense && (
              <p className="text-blue-400">🛡️ {item.defense} defense</p>
            )}
            {item.quantity && (
              <p className="text-yellow-400">📦 x{item.quantity}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

InventoryView.propTypes = {
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      rarity: PropTypes.string.isRequired,
      damage: PropTypes.number,
      defense: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
};

export default InventoryView;
