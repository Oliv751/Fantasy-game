import React from "react";
import PropTypes from "prop-types";
import { Map, Users, Heart } from "lucide-react";

const HomeView = ({ player, party, setCurrentView, setPlayer }) => (
  <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">🏛️</div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Command Center
        </h1>
        <p className="text-gray-300">
          Welcome back, {player.name} {player.avatar}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Player Stats */}
        <div className="bg-gray-800/80 rounded-lg p-6 backdrop-blur">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{player.avatar}</div>
            <h3 className="text-xl font-bold">Commander Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Level:</span>
              <span className="text-yellow-400">{player.level}</span>
            </div>
            <div className="flex justify-between">
              <span>Experience:</span>
              <span className="text-blue-400">{player.experience}</span>
            </div>
            <div className="flex justify-between">
              <span>Health:</span>
              <span className="text-red-400">
                {player.hp}/{player.maxHp}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Energy:</span>
              <span className="text-blue-400">
                {player.energy}/{player.maxEnergy}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/80 rounded-lg p-6 backdrop-blur">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentView("map")}
              className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all"
            >
              <Map size={20} />
              <span>🗺️ Explore Galaxy</span>
            </button>
            <button
              onClick={() => setCurrentView("party")}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all"
            >
              <Users size={20} />
              <span>👥 Manage Party</span>
            </button>
            <button
              onClick={() =>
                setPlayer((prev) => ({
                  ...prev,
                  hp: prev.maxHp,
                  energy: prev.maxEnergy,
                }))
              }
              className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all"
            >
              <Heart size={20} />
              <span>💤 Rest & Recover</span>
            </button>
          </div>
        </div>

        {/* Party Overview */}
        <div className="bg-gray-800/80 rounded-lg p-6 backdrop-blur">
          <h3 className="text-xl font-bold mb-4">Active Party</h3>
          {party.length === 0 ? (
            <p className="text-gray-400 text-center">
              No party members recruited
            </p>
          ) : (
            <div className="space-y-3">
              {party.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  className="bg-gray-700/50 rounded-lg p-3 flex items-center space-x-3"
                >
                  <div className="text-2xl">{member.avatar}</div>
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-gray-300">{member.class}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

HomeView.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    experience: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    maxEnergy: PropTypes.number.isRequired,
  }).isRequired,
  party: PropTypes.array.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  setPlayer: PropTypes.func.isRequired,
};

export default HomeView;
