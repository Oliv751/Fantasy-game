import React, { useState } from "react";
import PropTypes from "prop-types";
import { Home, Map, Package, Users, Heart, Zap, Menu, X } from "lucide-react";

const NavigationBar = ({ currentView, setCurrentView, player, party }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavButton = ({ view, icon: Icon, label }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all w-full md:w-auto
        ${
          currentView === view
            ? "bg-purple-600 text-white"
            : "bg-gray-700/50 text-gray-300 hover:bg-gray-600"
        }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/50 sticky top-0 z-50">
      <div className="w-full max-w-[2000px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Fantasy Game
              </span>
            </div>
            {/* Mobile Stats */}
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-1">
                <Heart className="text-red-400" size={16} />
                <span className="text-white">
                  {player.hp}/{player.maxHp}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="text-blue-400" size={16} />
                <span className="text-white">
                  {player.energy}/{player.maxEnergy}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row gap-2 md:items-center md:space-x-6`}
          >
            <span className="hidden md:block text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Fantasy Game
            </span>
            <div className="flex flex-col md:flex-row gap-2 md:space-x-4">
              <NavButton view="home" icon={Home} label="Base" />
              <NavButton view="map" icon={Map} label="Map" />
              <NavButton view="inventory" icon={Package} label="Inventory" />
              <NavButton
                view="party"
                icon={Users}
                label={`Party (${party.length}/4)`}
              />
            </div>
          </div>

          {/* Desktop Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <Heart className="text-red-400" size={20} />
                <span className="text-white">
                  {player.hp}/{player.maxHp}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="text-blue-400" size={20} />
                <span className="text-white">
                  {player.energy}/{player.maxEnergy}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-xl">💰</span>
                <span className="text-white">{player.credits}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

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
