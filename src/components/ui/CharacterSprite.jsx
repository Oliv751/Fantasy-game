import React from "react";
import PropTypes from "prop-types";

const CharacterSprite = ({
  character,
  isEnemy = false,
  onClick,
  isSelected = false,
  isAnimating = false,
}) => (
  <div
    className={`relative cursor-pointer transition-all duration-300 ${
      isSelected ? "scale-110 ring-4 ring-yellow-400" : ""
    } ${isAnimating ? "animate-bounce" : ""}`}
    onClick={onClick}
  >
    <div className={`text-6xl mb-2 ${isAnimating ? "animate-pulse" : ""}`}>
      {character.avatar}
    </div>
    <div
      className={`text-center ${isEnemy ? "text-red-300" : "text-blue-300"}`}
    >
      <div className="font-bold text-sm">{character.name}</div>
      <div className="text-xs">{character.class}</div>
      <div className="mt-1">
        <div
          className={`h-2 rounded-full ${
            isEnemy ? "bg-red-900" : "bg-blue-900"
          }`}
        >
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isEnemy ? "bg-red-500" : "bg-blue-500"
            }`}
            style={{
              width: `${(character.currentHp / character.maxHp) * 100}%`,
            }}
          />
        </div>
        <div className="text-xs mt-1">
          {character.currentHp}/{character.maxHp}
        </div>
      </div>
    </div>
  </div>
);

CharacterSprite.propTypes = {
  character: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    currentHp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
  }).isRequired,
  isEnemy: PropTypes.bool,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  isAnimating: PropTypes.bool,
};

export default CharacterSprite;
