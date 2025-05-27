import React from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import { AVAILABLE_RECRUITS } from "../../constants/gameData";

const PartyView = ({ party, recruitCharacter, player }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-3xl font-bold">Party Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Party */}
        <div className="bg-gray-800/80 rounded-lg p-6 backdrop-blur">
          <h3 className="text-xl font-bold mb-4">Active Party</h3>
          {party.length === 0 ? (
            <p className="text-gray-400">No party members recruited yet</p>
          ) : (
            <div className="space-y-4">
              {party.map((member) => (
                <div key={member.id} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{member.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-bold">{member.name}</h4>
                      <p className="text-gray-300">{member.class}</p>
                      <div className="mt-2 text-sm flex space-x-4">
                        <span className="text-red-400">❤️ {member.hp}</span>
                        <span className="text-blue-400">
                          ⚡ {member.energy}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Skills: {member.skills.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Recruits */}
        <div className="bg-gray-800/80 rounded-lg p-6 backdrop-blur">
          <h3 className="text-xl font-bold mb-4">Available Recruits</h3>
          <div className="space-y-4">
            {AVAILABLE_RECRUITS.filter(
              (recruit) => !party.some((p) => p.id === recruit.id)
            ).map((recruit) => (
              <div key={recruit.id} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{recruit.avatar}</div>
                    <div>
                      <h4 className="font-bold">{recruit.name}</h4>
                      <p className="text-gray-300">{recruit.class}</p>
                      <div className="mt-2 text-sm flex space-x-4">
                        <span className="text-red-400">❤️ {recruit.hp}</span>
                        <span className="text-blue-400">
                          ⚡ {recruit.energy}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Skills: {recruit.skills.join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 mb-2">💰 {recruit.cost}</p>
                    <button
                      onClick={() => recruitCharacter(recruit)}
                      disabled={
                        player.credits < recruit.cost || party.length >= 4
                      }
                      className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
                    >
                      <Plus size={16} />
                      <span>Recruit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

PartyView.propTypes = {
  party: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired,
      hp: PropTypes.number.isRequired,
      energy: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  recruitCharacter: PropTypes.func.isRequired,
  player: PropTypes.shape({
    credits: PropTypes.number.isRequired,
  }).isRequired,
};

export default PartyView;
