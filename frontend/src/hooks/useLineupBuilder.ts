import { useState } from "react";
import { Player } from "@/types/player";
import { formations, Formation } from "@/lib/formations";
import { FormationPosition, LineupBuilderHooks } from "@/types/lineup";

export const useLineupBuilder = (initialPlayerCount: number = 11): {
  state: {
    selectedFormation: string;
    playerCount: number;
    players: Player[];
    teamName: string;
    lineupName: string;
    selectedPlayer: string | null;
    showBottomSheet: boolean;
    showFormationSelector: boolean;
    showTeamDetails: boolean;
    isFreeFormation: boolean;
    draggedPlayer: string | null;
    hasDragged: boolean;
    dragMode: boolean;
    dragEnabled: boolean;
    customFormation: FormationPosition[];
    originalPlayerPositions: { [playerId: string]: { x: number; y: number; position: string } };
  };
  actions: LineupBuilderHooks & {
    setTeamName: (name: string) => void;
    setLineupName: (name: string) => void;
    setSelectedFormation: (formation: string) => void;
    setShowBottomSheet: (show: boolean) => void;
    setShowFormationSelector: (show: boolean) => void;
    setShowTeamDetails: (show: boolean) => void;
    setIsFreeFormation: (free: boolean) => void;
    setDraggedPlayer: (playerId: string | null) => void;
    setHasDragged: (dragged: boolean) => void;
    setDragMode: (mode: boolean) => void;
    setDragEnabled: (enabled: boolean) => void;
    setCustomFormation: (formation: FormationPosition[]) => void;
    generateFormation: (count: number) => Formation;
    getCurrentFormation: () => Formation;
  };
} => {
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [playerCount, setPlayerCount] = useState(initialPlayerCount);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamName, setTeamName] = useState("");
  const [lineupName, setLineupName] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showFormationSelector, setShowFormationSelector] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [isFreeFormation, setIsFreeFormation] = useState(false);
  const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
  const [hasDragged, setHasDragged] = useState(false);
  const [dragMode, setDragMode] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(false);
  const [customFormation, setCustomFormation] = useState<FormationPosition[]>([]);
  const [originalPlayerPositions, setOriginalPlayerPositions] = useState<{ [playerId: string]: { x: number; y: number; position: string } }>({});

  // Generate dynamic formations based on player count
  const generateFormation = (count: number): Formation => {
    const usesBackFour = selectedFormation.startsWith("4");

    if (usesBackFour) {
      const base = formations.find(f => f.id === selectedFormation) || formations[0];

      const gk = base.positions.filter(p => p.role === "GK");
      const lbs = base.positions.filter(p => p.role === "LB");
      const rbs = base.positions.filter(p => p.role === "RB");
      const cbs = base.positions.filter(p => p.role === "CB");
      const others = base.positions.filter(p => !["GK", "LB", "RB", "CB"].includes(p.role));

      const prioritized: FormationPosition[] = [];
      if (gk.length) prioritized.push(gk[0]);
      if (lbs.length) prioritized.push(lbs[0]);
      if (cbs.length) prioritized.push(cbs[0]);
      if (cbs.length > 1) prioritized.push(cbs[1]);
      if (rbs.length) prioritized.push(rbs[0]);
      prioritized.push(...others);

      return {
        id: `${count}-player`,
        name: `${count} Players`,
        positions: prioritized.slice(0, Math.max(1, count))
      };
    }

    // Fallback generic layout for non-back-four formations
    const positions: FormationPosition[] = [];

    // Always add goalkeeper
    positions.push({ x: 50, y: 90, role: "GK" });

    if (count >= 3) {
      positions.push({ x: 35, y: 70, role: "CB" });
      positions.push({ x: 65, y: 70, role: "CB" });
    }

    if (count >= 4) {
      positions.push({ x: 20, y: 70, role: "LB" });
    }

    if (count >= 5) {
      positions.push({ x: 80, y: 70, role: "RB" });
    }

    if (count >= 6) {
      positions.push({ x: 50, y: 50, role: "CM" });
    }

    if (count >= 7) {
      positions.push({ x: 30, y: 50, role: "CM" });
    }

    if (count >= 8) {
      positions.push({ x: 70, y: 50, role: "CM" });
    }

    if (count >= 9) {
      positions.push({ x: 50, y: 30, role: "ST" });
    }

    if (count >= 10) {
      positions.push({ x: 30, y: 30, role: "ST" });
    }

    if (count >= 11) {
      positions.push({ x: 70, y: 30, role: "ST" });
    }

    return {
      id: `${count}-player`,
      name: `${count} Players`,
      positions: positions.slice(0, count)
    };
  };

  const getCurrentFormation = (): Formation => {
    return playerCount === 11 
      ? (formations.find(f => f.id === selectedFormation) || formations[0])
      : generateFormation(playerCount);
  };

  const addPlayer = (position: FormationPosition) => {
    if (dragEnabled || players.length >= playerCount) {
      return;
    }
    
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: "",
      position: position.role,
      number: players.length + 1,
      x: position.x,
      y: position.y
    };
    
    setOriginalPlayerPositions(prev => ({
      ...prev,
      [newPlayer.id]: {
        x: position.x,
        y: position.y,
        position: position.role
      }
    }));
    
    setPlayers([...players, newPlayer]);
    setSelectedPlayer(newPlayer.id);
    setShowBottomSheet(true);
  };

  const updatePlayer = (id: string, updates: Partial<Player>) => {
    setPlayers(players.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
    if (selectedPlayer === id) {
      setSelectedPlayer(null);
      setShowBottomSheet(false);
    }
  };

  const getPlayerAtPosition = (x: number, y: number) => {
    return players.find(p => Math.abs(p.x - x) < 5 && Math.abs(p.y - y) < 5);
  };

  const handlePlayerClick = (player: Player) => {
    if (dragEnabled || (dragMode && hasDragged)) {
      setHasDragged(false);
      return;
    }
    setSelectedPlayer(player.id);
    setShowBottomSheet(true);
  };

  const handlePlayerCountChange = (newCount: number) => {
    setPlayerCount(newCount);
    if (newCount < players.length) {
      setPlayers(players.slice(0, newCount));
    }
    if (newCount !== 11) {
      setSelectedFormation("4-3-3");
    }
    setIsFreeFormation(false);
    setCustomFormation([]);
  };

  const handlePlayerDrag = (playerId: string, newX: number, newY: number) => {
    if (isFreeFormation) {
      const constrainedX = Math.max(5, Math.min(95, newX));
      const constrainedY = Math.max(5, Math.min(95, newY));
      
      setPlayers(players.map(p => 
        p.id === playerId 
          ? { ...p, x: constrainedX, y: constrainedY }
          : p
      ));
    }
  };

  const handlePositionDrag = (positionIndex: number, newX: number, newY: number) => {
    if (isFreeFormation) {
      const constrainedX = Math.max(5, Math.min(95, newX));
      const constrainedY = Math.max(5, Math.min(95, newY));
      
      setCustomFormation(prev => prev.map((pos, index) => 
        index === positionIndex 
          ? { ...pos, x: constrainedX, y: constrainedY }
          : pos
      ));
      
      const playerAtPosition = getPlayerAtPosition(constrainedX, constrainedY);
      if (playerAtPosition) {
        setPlayers(players.map(p => 
          p.id === playerAtPosition.id 
            ? { ...p, x: constrainedX, y: constrainedY }
            : p
        ));
      }
    }
  };

  const handleMouseDown = (playerId: string, e: React.MouseEvent) => {
    if (!isFreeFormation || !dragEnabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    setDraggedPlayer(playerId);
    setHasDragged(false);
    
    const container = document.querySelector('.pitch-container');
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      setHasDragged(true);
      
      const currentRect = container.getBoundingClientRect();
      const mouseX = e.clientX - currentRect.left;
      const mouseY = e.clientY - currentRect.top;
      
      const newX = Math.max(5, Math.min(95, (mouseX / currentRect.width) * 100));
      const newY = Math.max(5, Math.min(95, (mouseY / currentRect.height) * 100));
      
      handlePlayerDrag(playerId, newX, newY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      setDraggedPlayer(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp, { passive: false });
  };

  const handleTouchStart = (playerId: string, e: React.TouchEvent) => {
    if (!isFreeFormation || !dragEnabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    setDraggedPlayer(playerId);
    setHasDragged(false);
    
    document.body.style.overflow = 'hidden';
    
    const container = document.querySelector('.pitch-container');
    if (!container) return;
    
    const handleTouchMove = (e: Event) => {
      e.preventDefault();
      setHasDragged(true);
      
      const currentRect = container.getBoundingClientRect();
      const touchEvent = e as TouchEvent;
      const touch = touchEvent.touches[0];
      const touchX = touch.clientX - currentRect.left;
      const touchY = touch.clientY - currentRect.top;
      
      const newX = Math.max(5, Math.min(95, (touchX / currentRect.width) * 100));
      const newY = Math.max(5, Math.min(95, (touchY / currentRect.height) * 100));
      
      handlePlayerDrag(playerId, newX, newY);
    };

    const handleTouchEnd = (e: Event) => {
      e.preventDefault();
      setDraggedPlayer(null);
      document.body.style.overflow = 'auto';
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handlePositionMouseDown = (positionIndex: number, e: React.MouseEvent) => {
    if (!isFreeFormation || !dragEnabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    setDraggedPlayer(`position-${positionIndex}`);
    
    const container = document.querySelector('.pitch-container');
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      const currentRect = container.getBoundingClientRect();
      const mouseX = e.clientX - currentRect.left;
      const mouseY = e.clientY - currentRect.top;
      
      const newX = Math.max(5, Math.min(95, (mouseX / currentRect.width) * 100));
      const newY = Math.max(5, Math.min(95, (mouseY / currentRect.height) * 100));
      
      handlePositionDrag(positionIndex, newX, newY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      setDraggedPlayer(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp, { passive: false });
  };

  const handlePositionTouchStart = (positionIndex: number, e: React.TouchEvent) => {
    if (!isFreeFormation || !dragEnabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    setDraggedPlayer(`position-${positionIndex}`);
    
    document.body.style.overflow = 'hidden';
    
    const container = document.querySelector('.pitch-container');
    if (!container) return;
    
    const handleTouchMove = (e: Event) => {
      e.preventDefault();
      
      const currentRect = container.getBoundingClientRect();
      const touchEvent = e as TouchEvent;
      const touch = touchEvent.touches[0];
      const touchX = touch.clientX - currentRect.left;
      const touchY = touch.clientY - currentRect.top;
      
      const newX = Math.max(5, Math.min(95, (touchX / currentRect.width) * 100));
      const newY = Math.max(5, Math.min(95, (touchY / currentRect.height) * 100));
      
      handlePositionDrag(positionIndex, newX, newY);
    };

    const handleTouchEnd = (e: Event) => {
      e.preventDefault();
      setDraggedPlayer(null);
      document.body.style.overflow = 'auto';
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return {
    state: {
      selectedFormation,
      playerCount,
      players,
      teamName,
      lineupName,
      selectedPlayer,
      showBottomSheet,
      showFormationSelector,
      showTeamDetails,
      isFreeFormation,
      draggedPlayer,
      hasDragged,
      dragMode,
      dragEnabled,
      customFormation,
      originalPlayerPositions,
    },
    actions: {
      setTeamName,
      setLineupName,
      setSelectedFormation,
      setShowBottomSheet,
      setShowFormationSelector,
      setShowTeamDetails,
      setIsFreeFormation,
      setDraggedPlayer,
      setHasDragged,
      setDragMode,
      setDragEnabled,
      setCustomFormation,
      addPlayer,
      updatePlayer,
      removePlayer,
      getPlayerAtPosition,
      handlePlayerClick,
      handlePlayerCountChange,
      handlePlayerDrag,
      handlePositionDrag,
      handleMouseDown,
      handleTouchStart,
      handlePositionMouseDown,
      handlePositionTouchStart,
      generateFormation,
      getCurrentFormation,
    },
  };
};