import React, { useState } from "react";
import NavigationBar from "./components/layout/NavigationBar";
import HomeView from "./components/views/HomeView";
import MapView from "./components/views/MapView";
import InventoryView from "./components/views/InventoryView";
import PartyView from "./components/views/PartyView";
import CombatView from "./components/combat/CombatView";
import { INITIAL_PLAYER } from "./constants/gameData";
import useCombat from "./hooks/useCombat";

const App = () => {
  // Game State
  const [currentView, setCurrentView] = useState("home");
  const [player, setPlayer] = useState(INITIAL_PLAYER);
  const [party, setParty] = useState([]);
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Plasma Rifle",
      type: "weapon",
      damage: 25,
      rarity: "common",
    },
    {
      id: 2,
      name: "Shield Generator",
      type: "armor",
      defense: 15,
      rarity: "uncommon",
    },
    {
      id: 3,
      name: "Nano Heal Kit",
      type: "consumable",
      effect: "heal",
      value: 50,
      quantity: 3,
    },
  ]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Combat System
  const {
    combatState,
    animatingCharacter,
    startCombat,
    selectAction,
    selectTarget,
    setCombatState,
  } = useCombat(player, party, setPlayer);

  // Recruitment System
  const recruitCharacter = (recruit) => {
    if (player.credits >= recruit.cost) {
      setPlayer((prev) => ({ ...prev, credits: prev.credits - recruit.cost }));
      setParty((prev) => [...prev, { ...recruit, recruited: true }]);
    }
  };

  // Main render
  if (combatState) {
    return (
      <CombatView
        combatState={combatState}
        animatingCharacter={animatingCharacter}
        selectAction={selectAction}
        selectTarget={selectTarget}
        setCombatState={setCombatState}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NavigationBar
        currentView={currentView}
        setCurrentView={setCurrentView}
        player={player}
        party={party}
      />

      {currentView === "home" && (
        <HomeView
          player={player}
          party={party}
          setCurrentView={setCurrentView}
          setPlayer={setPlayer}
        />
      )}
      {currentView === "map" && (
        <MapView
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          startCombat={startCombat}
        />
      )}
      {currentView === "inventory" && <InventoryView inventory={inventory} />}
      {currentView === "party" && (
        <PartyView
          party={party}
          player={player}
          recruitCharacter={recruitCharacter}
        />
      )}
    </div>
  );
};

export default App;
