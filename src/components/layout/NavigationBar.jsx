import React from "react";
import PropTypes from "prop-types";
import { Home, Map, Package, Users, Heart, Zap } from "lucide-react";

const NavigationBar = ({ currentView, setCurrentView, player, party }) => (
  <div className="bg-gray-900 border-b border-purple-500 p-4">
    <div className="flex justify-between items-center">
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentView("home")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentView === "home"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <Home size={20} />
          <span>Base</span>
        </button>
        <button
          onClick={() => setCurrentView("map")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentView === "map"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <Map size={20} />
          <span>Map</span>
        </button>
        <button
          onClick={() => setCurrentView("inventory")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentView === "inventory"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <Package size={20} />
          <span>Inventory</span>
        </button>
        <button
          onClick={() => setCurrentView("party")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentView === "party"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <Users size={20} />
          <span>Party ({party.length}/4)</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <Heart className="text-red-400" size={16} />
          <span className="text-white">
            {player.hp}/{player.maxHp}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="text-blue-400" size={16} />
          <span className="text-white">
            {player.energy}/{player.maxEnergy}
          </span>
        </div>
        <div className="text-yellow-400">💰 {player.credits}</div>
      </div>
    </div>
  </div>
);

NavigationBar.propTypes = {
  currentView: PropTypes.oneOf(["home", "map", "inventory", "party"])
    .isRequired,
  setCurrentView: PropTypes.func.isRequired,
  player: PropTypes.shape({
    hp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    maxEnergy: PropTypes.number.isRequired,
    credits: PropTypes.number.isRequired,
  }).isRequired,
  party: PropTypes.array.isRequired,
};

export default NavigationBar;
