import React from "react";
import PropTypes from "prop-types";
import { Sword, ArrowLeft } from "lucide-react";
import CharacterSprite from "../ui/CharacterSprite";

const CombatView = ({
  combatState,
  animatingCharacter,
  selectAction,
  selectTarget,
  setCombatState,
}) => (
  <div
    className={`min-h-screen bg-gradient-to-b ${combatState.background} text-white p-6`}
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">
          ⚔️ Battle at {combatState.location}
        </h2>
        <div className="text-lg">
          {combatState.currentTurn === "player"
            ? "🟢 Your Turn"
            : "🔴 Enemy Turn"}
        </div>
      </div>

      {/* Battle Arena */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        {/* Player Team */}
        <div className="bg-blue-900/30 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-center">👥 Your Team</h3>
          <div className="grid grid-cols-3 gap-4">
            {combatState.playerTeam.map((character) => (
              <CharacterSprite
                key={character.id}
                character={character}
                isEnemy={false}
                onClick={() =>
                  combatState.currentTurn === "player" &&
                  selectAction("attack", character)
                }
                isSelected={combatState.selectedCharacter?.id === character.id}
                isAnimating={animatingCharacter === character.id}
              />
            ))}
          </div>
        </div>

        {/* Enemy Team */}
        <div className="bg-red-900/30 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-center">👹 Enemies</h3>
          <div className="grid grid-cols-3 gap-4">
            {combatState.enemyTeam.map((character) => (
              <CharacterSprite
                key={character.id}
                character={character}
                isEnemy={true}
                onClick={() =>
                  combatState.selectedAction && selectTarget(character)
                }
                isSelected={combatState.selectedTarget?.id === character.id}
                isAnimating={animatingCharacter === character.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Battle Controls */}
      {combatState.currentTurn === "player" && !combatState.processingTurn && (
        <div className="bg-gray-800/80 rounded-lg p-4 mb-4">
          <h4 className="font-bold mb-3">Actions:</h4>
          <div className="flex space-x-4">
            <button className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Sword size={16} />
              <span>Select character to attack</span>
            </button>
            {combatState.selectedAction && (
              <div className="text-yellow-400">→ Now select a target enemy</div>
            )}
          </div>
        </div>
      )}

      {/* Battle Log */}
      <div className="bg-gray-900/80 rounded-lg p-4 h-32 overflow-y-auto">
        {combatState.battleLog.map((log, index) => (
          <p key={index} className="mb-1 text-sm">
            {log}
          </p>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => setCombatState(null)}
          className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto"
        >
          <ArrowLeft size={20} />
          <span>Retreat</span>
        </button>
      </div>
    </div>
  </div>
);

CombatView.propTypes = {
  combatState: PropTypes.shape({
    background: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    currentTurn: PropTypes.oneOf(["player", "enemy"]).isRequired,
    playerTeam: PropTypes.array.isRequired,
    enemyTeam: PropTypes.array.isRequired,
    selectedAction: PropTypes.string,
    selectedCharacter: PropTypes.object,
    selectedTarget: PropTypes.object,
    processingTurn: PropTypes.bool.isRequired,
    battleLog: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  animatingCharacter: PropTypes.string,
  selectAction: PropTypes.func.isRequired,
  selectTarget: PropTypes.func.isRequired,
  setCombatState: PropTypes.func.isRequired,
};

export default CombatView;
