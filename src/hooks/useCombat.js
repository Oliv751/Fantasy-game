import { useState, useEffect } from "react";
import { ENEMY_TYPES } from "../constants/gameData";

const useCombat = (player, party, setPlayer) => {
  const [combatState, setCombatState] = useState(null);
  const [animatingCharacter, setAnimatingCharacter] = useState(null);

  const startCombat = (location) => {
    // Create player team (max 5)
    const playerTeam = [player, ...party].slice(0, 5).map((char) => ({
      ...char,
      id: char.id || "player",
      currentHp: char.hp,
      currentEnergy: char.energy,
      isPlayer: true,
    }));

    // Create enemy team (1-5 enemies)
    const enemyCount = Math.min(
      5,
      Math.max(1, Math.floor(Math.random() * 3) + 1)
    );
    const enemyTeam = [];

    for (let i = 0; i < enemyCount; i++) {
      const enemyType =
        location.enemies[Math.floor(Math.random() * location.enemies.length)];
      const enemyData = ENEMY_TYPES[enemyType];
      enemyTeam.push({
        id: `enemy_${i}`,
        name: enemyType,
        class: "Enemy",
        avatar: enemyData.avatar,
        hp: enemyData.hp + Math.floor(Math.random() * 20),
        maxHp: enemyData.hp + Math.floor(Math.random() * 20),
        currentHp: enemyData.hp + Math.floor(Math.random() * 20),
        damage: enemyData.damage,
        energy: 50,
        maxEnergy: 50,
        currentEnergy: 50,
        isPlayer: false,
      });
    }

    setCombatState({
      location: location.name,
      background: location.background,
      playerTeam,
      enemyTeam,
      currentTurn: "player",
      selectedAction: null,
      selectedTarget: null,
      battleLog: [`Battle begins at ${location.name}!`],
      turnQueue: [],
      processingTurn: false,
    });
  };

  const selectAction = (action, character) => {
    if (combatState?.processingTurn) return;

    setCombatState((prev) => ({
      ...prev,
      selectedAction: action,
      selectedCharacter: character,
    }));
  };

  const selectTarget = (target) => {
    if (!combatState?.selectedAction || combatState?.processingTurn) return;

    executeAction(
      combatState.selectedCharacter,
      combatState.selectedAction,
      target
    );
  };

  const executeAction = (attacker, action, target) => {
    setCombatState((prev) => ({ ...prev, processingTurn: true }));

    setAnimatingCharacter(attacker.id);

    setTimeout(() => {
      let damage = 0;
      let newLog = [...combatState.battleLog];

      if (action === "attack") {
        damage = Math.floor(attacker.damage || 20 + Math.random() * 15);
        newLog.push(
          `${attacker.name} attacks ${target.name} for ${damage} damage!`
        );
      } else if (action === "skill") {
        damage = Math.floor((attacker.damage || 20) * 1.5 + Math.random() * 10);
        newLog.push(
          `${attacker.name} uses a special skill on ${target.name} for ${damage} damage!`
        );
      }

      // Apply damage
      const newTargetHp = Math.max(0, target.currentHp - damage);

      // Update teams
      const updateTeam = (team) =>
        team.map((char) =>
          char.id === target.id ? { ...char, currentHp: newTargetHp } : char
        );

      const newPlayerTeam = updateTeam(combatState.playerTeam);
      const newEnemyTeam = updateTeam(combatState.enemyTeam);

      // Check for victory/defeat
      const playersAlive = newPlayerTeam.some((char) => char.currentHp > 0);
      const enemiesAlive = newEnemyTeam.some((char) => char.currentHp > 0);

      if (!playersAlive) {
        newLog.push("Defeat! Retreating...");
        setTimeout(() => setCombatState(null), 2000);
      } else if (!enemiesAlive) {
        const expGain = 50 + Math.floor(Math.random() * 50);
        const creditsGain = 100 + Math.floor(Math.random() * 200);
        newLog.push("Victory!");
        newLog.push(`+${expGain} EXP, +${creditsGain} credits`);

        setPlayer((prev) => ({
          ...prev,
          experience: prev.experience + expGain,
          credits: prev.credits + creditsGain,
        }));

        setTimeout(() => setCombatState(null), 2000);
      }

      setCombatState((prev) => ({
        ...prev,
        playerTeam: newPlayerTeam,
        enemyTeam: newEnemyTeam,
        battleLog: newLog,
        currentTurn: prev.currentTurn === "player" ? "enemy" : "player",
        selectedAction: null,
        selectedCharacter: null,
        selectedTarget: null,
        processingTurn: false,
      }));

      setAnimatingCharacter(null);
    }, 500);
  };

  // AI turn for enemies
  useEffect(() => {
    if (combatState?.currentTurn === "enemy" && !combatState?.processingTurn) {
      const aliveEnemies = combatState.enemyTeam.filter((e) => e.currentHp > 0);
      const alivePlayers = combatState.playerTeam.filter(
        (p) => p.currentHp > 0
      );

      if (aliveEnemies.length > 0 && alivePlayers.length > 0) {
        setTimeout(() => {
          const randomEnemy =
            aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
          const randomTarget =
            alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
          executeAction(randomEnemy, "attack", randomTarget);
        }, 1000);
      }
    }
  }, [combatState?.currentTurn, combatState?.processingTurn]);

  return {
    combatState,
    animatingCharacter,
    startCombat,
    selectAction,
    selectTarget,
    setCombatState,
  };
};

export default useCombat;
