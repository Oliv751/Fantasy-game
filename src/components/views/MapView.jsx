import React from "react";
import PropTypes from "prop-types";
import { Target, X } from "lucide-react";
import { MAP_LOCATIONS, ENEMY_TYPES } from "../../constants/gameData";

const MapView = ({ selectedLocation, setSelectedLocation, startCombat }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">🌌</div>
        <h2 className="text-3xl font-bold">Galaxy Map</h2>
      </div>

      <div className="relative bg-gray-900/80 rounded-lg h-96 mb-6 overflow-hidden backdrop-blur">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {MAP_LOCATIONS.map((location) => (
          <button
            key={location.id}
            onClick={() => setSelectedLocation(location)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all hover:scale-125"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
          >
            <div className="text-3xl group-hover:animate-pulse">
              {location.icon}
            </div>
            <div className="text-xs mt-1 bg-black/50 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {location.name}
            </div>
          </button>
        ))}
      </div>

      {selectedLocation && (
        <div className="bg-gray-800/80 rounded-lg p-6 backdrop-blur">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{selectedLocation.icon}</div>
              <div>
                <h3 className="text-2xl font-bold">{selectedLocation.name}</h3>
                <p className="text-gray-300 capitalize">
                  {selectedLocation.type}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedLocation(null)}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-4">
            <h4 className="font-bold mb-2">Potential Enemies:</h4>
            <div className="flex space-x-4">
              {selectedLocation.enemies.map((enemy) => (
                <div
                  key={enemy}
                  className="bg-red-900/50 px-4 py-2 rounded-full text-sm flex items-center space-x-2"
                >
                  <span className="text-xl">{ENEMY_TYPES[enemy].avatar}</span>
                  <span>{enemy}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => startCombat(selectedLocation)}
            className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-lg flex items-center space-x-2 transition-all"
          >
            <Target size={20} />
            <span>⚔️ Enter Combat</span>
          </button>
        </div>
      )}
    </div>
  </div>
);

MapView.propTypes = {
  selectedLocation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    enemies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  setSelectedLocation: PropTypes.func.isRequired,
  startCombat: PropTypes.func.isRequired,
};

export default MapView;
