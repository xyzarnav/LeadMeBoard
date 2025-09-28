"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Save,
  Share2,
  ChevronDown,
  ChevronUp,
  Settings,
  Users,
  Target,
  Zap,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { PlayerDetailsModal } from "@/components/player-details-modal";
import { Player } from "@/types/player";

interface Formation {
  id: string;
  name: string;
  positions: { x: number; y: number; role: string }[];
}

const formations: Formation[] = [
  {
    id: "4-3-3",
    name: "4-3-3",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 30, y: 50, role: "CM" },
      { x: 50, y: 50, role: "CM" },
      { x: 70, y: 50, role: "CM" },
      { x: 20, y: 30, role: "LW" },
      { x: 50, y: 30, role: "ST" },
      { x: 80, y: 30, role: "RW" }
    ]
  },
  {
    id: "4-4-2",
    name: "4-4-2",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 35, y: 70, role: "CB" },
      { x: 65, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 20, y: 50, role: "LM" },
      { x: 40, y: 50, role: "CM" },
      { x: 60, y: 50, role: "CM" },
      { x: 80, y: 50, role: "RM" },
      { x: 35, y: 30, role: "ST" },
      { x: 65, y: 30, role: "ST" }
    ]
  },
  {
    id: "3-5-2",
    name: "3-5-2",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 30, y: 70, role: "CB" },
      { x: 50, y: 70, role: "CB" },
      { x: 70, y: 70, role: "CB" },
      { x: 20, y: 50, role: "LWB" },
      { x: 40, y: 50, role: "CM" },
      { x: 50, y: 50, role: "CM" },
      { x: 60, y: 50, role: "CM" },
      { x: 80, y: 50, role: "RWB" },
      { x: 40, y: 30, role: "ST" },
      { x: 60, y: 30, role: "ST" }
    ]
  },
  {
    id: "4-2-3-1",
    name: "4-2-3-1",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 35, y: 70, role: "CB" },
      { x: 65, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 35, y: 55, role: "CDM" },
      { x: 65, y: 55, role: "CDM" },
      { x: 30, y: 40, role: "LW" },
      { x: 50, y: 40, role: "CAM" },
      { x: 70, y: 40, role: "RW" },
      { x: 50, y: 25, role: "ST" }
    ]
  },
  {
    id: "3-4-3",
    name: "3-4-3",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 30, y: 70, role: "CB" },
      { x: 50, y: 70, role: "CB" },
      { x: 70, y: 70, role: "CB" },
      { x: 20, y: 50, role: "LWB" },
      { x: 40, y: 50, role: "CM" },
      { x: 60, y: 50, role: "CM" },
      { x: 80, y: 50, role: "RWB" },
      { x: 25, y: 30, role: "LW" },
      { x: 50, y: 30, role: "ST" },
      { x: 75, y: 30, role: "RW" }
    ]
  },
  
];

export default function LineupBuilder() {
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [playerCount, setPlayerCount] = useState(11);
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
  const [customFormation, setCustomFormation] = useState<{ x: number; y: number; role: string }[]>([]);
  const [originalPlayerPositions, setOriginalPlayerPositions] = useState<{ [playerId: string]: { x: number; y: number; position: string } }>({});

  // Generate dynamic formations based on player count
  const generateFormation = (count: number) => {
    const positions: { x: number; y: number; role: string }[] = [];
    
    // Always add goalkeeper
    positions.push({ x: 50, y: 90, role: "GK" });
    
    if (count >= 3) {
      // Add 2 defenders for minimum
      positions.push({ x: 35, y: 70, role: "CB" });
      positions.push({ x: 65, y: 70, role: "CB" });
    }
    
    if (count >= 4) {
      // Add fullbacks
      positions.push({ x: 20, y: 70, role: "LB" });
    }
    
    if (count >= 5) {
      positions.push({ x: 80, y: 70, role: "RB" });
    }
    
    if (count >= 6) {
      // Add midfielders
      positions.push({ x: 50, y: 50, role: "CM" });
    }
    
    if (count >= 7) {
      positions.push({ x: 30, y: 50, role: "CM" });
    }
    
    if (count >= 8) {
      positions.push({ x: 70, y: 50, role: "CM" });
    }
    
    if (count >= 9) {
      // Add forwards
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

  const currentFormation = playerCount === 11 
    ? (formations.find(f => f.id === selectedFormation) || formations[0])
    : generateFormation(playerCount);

  // Removed complex global wheel handler - using individual handlers instead

  const addPlayer = (position: { x: number; y: number; role: string }) => {
    // Don't add player if drag is enabled
    if (dragEnabled) {
      return;
    }
    
    // Check if we've reached the player count limit
    if (players.length >= playerCount) {
      console.log('Maximum player count reached:', playerCount);
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
    
    // Store original position for reset functionality
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
    // Don't show modal if drag is enabled or if drag mode is on and we've just dragged
    if (dragEnabled || (dragMode && hasDragged)) {
      setHasDragged(false);
      return;
    }
    setSelectedPlayer(player.id);
    setShowBottomSheet(true);
  };


  const handlePlayerCountChange = (newCount: number) => {
    setPlayerCount(newCount);
    // Remove excess players if new count is less than current players
    if (newCount < players.length) {
      setPlayers(players.slice(0, newCount));
    }
    // Reset formation selection when changing player count
    if (newCount !== 11) {
      setSelectedFormation("4-3-3");
    }
    // Reset free formation when changing player count
    setIsFreeFormation(false);
    setCustomFormation([]);
  };

  const initializeFreeFormation = () => {
    if (isFreeFormation && players.length === 0) {
      // Generate default positions based on player count
      const defaultFormation = generateFormation(playerCount);
      const newPlayers: Player[] = defaultFormation.positions.map((position, index) => ({
        id: `player-${Date.now()}-${index}`,
        name: "",
        position: position.role,
        number: index + 1,
        x: position.x,
        y: position.y
      }));
      setPlayers(newPlayers);
    }
  };

  const handlePlayerDrag = (playerId: string, newX: number, newY: number) => {
    if (isFreeFormation) {
      const constrainedX = Math.max(5, Math.min(95, newX));
      const constrainedY = Math.max(5, Math.min(95, newY));
      
      console.log(`Updating player ${playerId} position: x=${constrainedX}, y=${constrainedY}`);
      
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
      
      console.log(`Updating position ${positionIndex} to: x=${constrainedX}, y=${constrainedY}`);
      
      // Update the custom formation positions
      setCustomFormation(prev => prev.map((pos, index) => 
        index === positionIndex 
          ? { ...pos, x: constrainedX, y: constrainedY }
          : pos
      ));
      
      // If there's a player at this position, update their position too
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
    
    console.log('Mouse down on player:', playerId, 'Free formation:', isFreeFormation, 'Drag enabled:', dragEnabled);
    
    e.preventDefault();
    e.stopPropagation();
    setDraggedPlayer(playerId);
    setHasDragged(false);
    
    const container = document.querySelector('.pitch-container');
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      // Set hasDragged to true when movement occurs
      setHasDragged(true);
      
      const currentRect = container.getBoundingClientRect();
      const mouseX = e.clientX - currentRect.left;
      const mouseY = e.clientY - currentRect.top;
      
      // Convert to percentage
      const newX = Math.max(5, Math.min(95, (mouseX / currentRect.width) * 100));
      const newY = Math.max(5, Math.min(95, (mouseY / currentRect.height) * 100));
      
      console.log('Moving player to:', newX, newY);
      handlePlayerDrag(playerId, newX, newY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      console.log('Mouse up, stopping drag');
      setDraggedPlayer(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp, { passive: false });
  };

  const handlePositionMouseDown = (positionIndex: number, e: React.MouseEvent) => {
    if (!isFreeFormation || !dragEnabled) return;
    
    console.log('Mouse down on position:', positionIndex, 'Free formation:', isFreeFormation, 'Drag enabled:', dragEnabled);
    
    e.preventDefault();
    e.stopPropagation();
    setDraggedPlayer(`position-${positionIndex}`);
    
    const container = document.querySelector('.pitch-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosition = customFormation[positionIndex];
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      const currentRect = container.getBoundingClientRect();
      const mouseX = e.clientX - currentRect.left;
      const mouseY = e.clientY - currentRect.top;
      
      // Convert to percentage
      const newX = Math.max(5, Math.min(95, (mouseX / currentRect.width) * 100));
      const newY = Math.max(5, Math.min(95, (mouseY / currentRect.height) * 100));
      
      console.log('Moving position to:', newX, newY);
      handlePositionDrag(positionIndex, newX, newY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      console.log('Mouse up, stopping position drag');
      setDraggedPlayer(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp, { passive: false });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Minimalist Header */}
      <div className="sticky top-0 z-50 bg-gray-900/100 backdrop-blur-xl border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-900/50 p-2 rounded-xl">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">Lineup Builder</h1>
                <p className="text-sm text-slate-500">{players.length}/{playerCount} players</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTeamDetails(!showTeamDetails)}
                className="text-slate-400 hover:text-white hover:bg-slate-900/50 p-2 rounded-xl"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-900/50 p-2 rounded-xl">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Details - Minimalist */}
      {showTeamDetails && (
        <div className="bg-white border-b border-slate-900">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="w-full px-4 py-3 bg-black border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Lineup Name</label>
                <input
                  type="text"
                  value={lineupName}
                  onChange={(e) => setLineupName(e.target.value)}
                  placeholder="Enter lineup name"
                  className="w-full px-4 py-3 bg-black border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          
          {/* Left Sidebar - Minimalist */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="space-y-2 lg:space-y-4 pb-2">
              {/* Player Count Selector */}
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#1A1A1A' }} onWheel={(e) => e.preventDefault()}>
                <div className="px-4 py-1 border-b border-slate-800/60">
                  <h3 className="text-sm font-medium text-slate-300">Team Size</h3>
                </div>
                <div className="p-10">
                  <div className="space-y-6">
                    {/* Current Value Display with Glow Effect */}
                    <div className="text-center relative">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150"></div>
                        <div className="relative text-4xl font-black text-emerald-400 tracking-tight">
                          {playerCount}
                        </div>
                      </div>
                      <div className="text-sm text-slate-400 font-medium mt-1">players on field</div>
                    </div>
                    
                    {/* Advanced Slider Container */}
                    <div className="relative" onWheel={(e) => e.preventDefault()} style={{ touchAction: 'none' }}>
                      {/* Slider Track with Gradient */}
                      <div className="relative h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full shadow-inner">
                        <div 
                          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-full shadow-lg"
                          style={{ width: `${((playerCount - 3) / 8) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/50 to-emerald-300/50 rounded-full animate-pulse"></div>
                          
                          {/* Interactive Wheel Indicator */}
                          <div className="absolute -right-2 -top-1 w-6 h-6 bg-emerald-400 border-2 border-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">
                            <Plus className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Custom Slider Input */}
                      <input
                        type="range"
                        min="3"
                        max="11"
                        value={playerCount}
                        onChange={(e) => handlePlayerCountChange(parseInt(e.target.value))}
                        onWheel={(e) => e.preventDefault()}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                            e.preventDefault();
                          }
                        }}
                        className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer slider-advanced"
                        style={{ zIndex: 10 }}
                        tabIndex={-1}
                      />
                      
                      {/* Enhanced Plus and Minus Buttons - Below Slider */}
                      <div className="absolute left-2 top-10 transform -translate-y-1/2">
                        <button
                          onClick={() => handlePlayerCountChange(Math.max(3, playerCount - 1))}
                          disabled={playerCount <= 3}
                          className="group relative w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 disabled:from-slate-800 disabled:to-slate-900 disabled:opacity-40 rounded-xl flex items-center justify-center text-white text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none border border-slate-600/50 hover:border-slate-500 disabled:border-slate-700/30"
                          aria-label="Decrease player count"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-0"></div>
                          <span className="relative z-10">−</span>
                          {playerCount <= 3 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white/20"></div>
                          )}
                        </button>
                      </div>
                      
                      <div className="absolute right-2 top-10 transform -translate-y-1/2">
                        <button
                          onClick={() => handlePlayerCountChange(Math.min(11, playerCount + 1))}
                          disabled={playerCount >= 11}
                          className="group relative w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 disabled:from-slate-800 disabled:to-slate-900 disabled:opacity-40 rounded-xl flex items-center justify-center text-white text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none border border-slate-600/50 hover:border-slate-500 disabled:border-slate-700/30"
                          aria-label="Increase player count"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-0"></div>
                          <span className="relative z-10">+</span>
                          {playerCount >= 11 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white/20"></div>
                          )}
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>

              {/* Formation Selector */}
              <div className="rounded-xl" style={{ backgroundColor: '#1A1A1A' }}>
                <div className="px-3 py-2 border-b border-slate-800/60">
                  <h3 className="text-sm font-medium text-slate-400">Formation</h3>
                </div>
                <div className="p-3">
                  {/* Free Formation Toggle */}
                  <div className="mb-3">
                    <Button
                      onClick={() => {
                        const newFreeFormation = !isFreeFormation;
                        setIsFreeFormation(newFreeFormation);
                        
                        if (newFreeFormation) {
                          setSelectedFormation("free");
                          // Initialize with default formation positions
                          const defaultFormation = generateFormation(playerCount);
                          setCustomFormation(defaultFormation.positions);
                        } else {
                          // Reset drag when switching away from free formation
                          setDragEnabled(false);
                        }
                      }}
                      className={`w-full h-auto py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        isFreeFormation 
                          ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/30' 
                          : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      {isFreeFormation ? '✓ Free Formation' : 'Free Formation'}
                    </Button>
                  </div>
                  
                  {/* Drag Toggle and Reset - Only show when free formation is selected */}
                  {isFreeFormation && (
                    <div className="mb-3">
                      <div className="flex gap-1">
                        {/* Drag Toggle - Left Half */}
                        <Button
                          onClick={() => setDragEnabled(!dragEnabled)}
                          className={`flex-1 h-auto py-3 px-2 rounded-l-lg text-xs font-medium transition-all ${
                            dragEnabled 
                              ? 'bg-green-600/20 p-2 text-green-400 ring-1 ring-green-500/30 ' 
                              : 'bg-blue-600/20 p-2 text-blue-400 ring-1 ring-blue-500/30 '
                          }`}
                        >
                          Drag: {dragEnabled ? 'On' : 'Off'}
                        </Button>
                        
                        {/* Reset Button - Right Half */}
                        <Button
                          onClick={() => {
                            console.log('Reset clicked - Clearing all players');
                            
                            // Clear all players
                            setPlayers([]);
                            setSelectedPlayer(null);
                            setShowBottomSheet(false);
                            
                            // Reset custom formation to default
                            const defaultFormation = generateFormation(playerCount);
                            setCustomFormation(defaultFormation.positions);
                            
                            // Disable drag mode
                            setDragEnabled(false);
                          }}
                          className="flex-1 h-auto py-2 px-2 p-2 rounded-r-lg text-xs font-medium bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 hover:text-orange-300 ring-1 ring-orange-500/30 transition-all"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Predefined Formations - Only show for 11 players and when not in free mode */}
                  {playerCount === 11 && !isFreeFormation && (
                    <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
                      {formations.map(formation => (
                        <Button
                          key={formation.id}
                          onClick={() => setSelectedFormation(formation.id)}
                          className={`h-auto py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                            selectedFormation === formation.id 
                              ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/30' 
                              : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 hover:text-slate-200'
                          }`}
                        >
                          {formation.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl" style={{ backgroundColor: '#1A1A1A' }}>
                <div className="px-3 py-2 border-b border-slate-800/60">
                  <h3 className="text-sm font-medium text-slate-400">Actions</h3>
                </div>
                <div className="p-2">
                  <div className="space-y-1">
                    <Button 
                      className="w-full h-auto py-2 bg-emerald-600/90 hover:bg-emerald-600 text-emerald-50 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2 opacity-80" />
                      Save Lineup
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-auto py-2 bg-slate-800/40 hover:bg-slate-800/60 border-slate-700/50 text-slate-300 hover:text-slate-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-2 opacity-80" />
                      Share Lineup
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Main Pitch Area */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="rounded-lg overflow-hidden w-full" style={{ maxWidth: '400px' }}>
              {/* compact pitch: minimal padding, dark background, constrained width */}
              <div
                className={`relative bg-gradient-to-b from-emerald-600 via-emerald-500 to-emerald-600 rounded-lg shadow-lg overflow-hidden w-full pitch-container ${draggedPlayer ? 'dragging' : ''}`}
                style={{ aspectRatio: '2/3' }}
              >
            
               

                {/* Pitch Lines - crisp white on black, minimal extras */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/85"></div>
                  <div className="absolute top-1/2 left-1/2 w-16 h-16 border-[1.5px] border-white/85 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-2 left-1/4 w-1/2 h-10 border-[1.2px] border-white/80"></div>
                  <div className="absolute top-2 left-1/4 w-1/2 h-10 border-[1.2px] border-white/80"></div>
                  <div className="absolute bottom-2 left-1/2 w-6 h-2 border-[1.2px] border-white/80 transform -translate-x-1/2"></div>
                  <div className="absolute top-2 left-1/2 w-6 h-2 border-[1.2px] border-white/80 transform -translate-x-1/2"></div>
                </div>

                {/* Formation Positions - no outer padding, minimal elements */}
                <div className="absolute inset-0">
                  {isFreeFormation ? (
                    // Free Formation - Show custom positions with add buttons
                    customFormation.map((position, index) => {
                      const player = getPlayerAtPosition(position.x, position.y);
                      return (
                        <div
                          key={index}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                          style={{ left: `${position.x}%`, top: `${position.y}%` }}
                        >
                          {player ? (
                            <div className="relative">
                              <button
                                onMouseDown={(e) => handleMouseDown(player.id, e)}
                                onClick={dragEnabled ? undefined : (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handlePlayerClick(player);
                                }}
                                className={`w-10 h-10 bg-neutral-900 border border-white/85 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-transform hover:scale-105 ${
                                  draggedPlayer === player.id ? 'scale-110 shadow-lg' : ''
                                } ${dragEnabled ? 'cursor-move' : 'cursor-pointer'}`}
                                style={{ userSelect: 'none', pointerEvents: 'auto' }}
                                tabIndex={0}
                              >
                                {player.number}
                              </button>
                              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-white bg-black/70 px-1.5 py-0.5 rounded whitespace-nowrap truncate max-w-[60px]">
                                {player.name || `P${player.number}`}
                                {draggedPlayer === player.id && (
                                  <div className="text-[8px] text-emerald-400 mt-0.5">
                                    {Math.round(player.x)}%, {Math.round(player.y)}%
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            players.length < playerCount && (
                              <button
                                onMouseDown={(e) => handlePositionMouseDown(index, e)}
                                onClick={() => addPlayer(position)}
                                className={`w-8 h-8 bg-white border-2 border-dashed border-black/40 rounded-full hover:bg-white/20 hover:border-white/60 transition-all duration-200 flex items-center justify-center ${
                                  isFreeFormation ? 'cursor-move' : ''
                                } ${draggedPlayer === `position-${index}` ? 'scale-110 shadow-lg' : ''}`}
                                aria-label={`Add player at ${position.role}`}
                                style={{ userSelect: 'none', pointerEvents: 'auto' }}
                                tabIndex={0}
                              >
                                <Plus className="w-5 h-5 text-black/80 stroke-2" />
                              </button>
                            )
                          )}
                        </div>
                      );
                    })
                  ) : (
                    // Predefined Formation - Show formation positions
                    currentFormation.positions.map((position, index) => {
                      const player = getPlayerAtPosition(position.x, position.y);
                      return (
                        <div
                          key={index}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                          style={{ left: `${position.x}%`, top: `${position.y}%` }}
                        >
                            {player ? (
                              <div className="relative">
                                <button
                                  onMouseDown={(e) => handleMouseDown(player.id, e)}
                                  onClick={dragEnabled ? undefined : () => handlePlayerClick(player)}
                                  className={`w-10 h-10 bg-neutral-900 border border-white/85 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-transform hover:scale-105 ${
                                    draggedPlayer === player.id ? 'scale-110 shadow-lg' : ''
                                  } ${dragEnabled ? 'cursor-move' : 'cursor-pointer'}`}
                                  style={{ userSelect: 'none', pointerEvents: 'auto' }}
                                  tabIndex={0}
                                >
                                  {player.number}
                                </button>
                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-white bg-black/70 px-1.5 py-0.5 rounded whitespace-nowrap truncate max-w-[60px]">
                                  {player.name || `P${player.number}`}
                                </div>
                              </div>
                            ) : (
                              players.length < playerCount && (
                                <button
                                  onClick={() => addPlayer(position)}
                                  className={`w-8 h-8 bg-white border-2 border-dashed border-black/40 rounded-full hover:bg-white/20 hover:border-white/60 transition-all duration-200 flex items-center justify-center`}
                                  aria-label={`Add player at ${position.role}`}
                                  tabIndex={0}
                                >
                                  <Plus className="w-5 h-5 text-black/80 stroke-2" />
                                </button>
                              )
                            )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Players List */}
          <div className="lg:col-span-4 order-3">
            <div className="rounded-2xl" style={{ backgroundColor: '#1A1A1A', minWidth: '300px' }}>
              <div className="px-3 lg:px-4 py-2 lg:py-3 border-b border-slate-800/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-300">Squad</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Team Players</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                      {players.length}/{playerCount}
                    </Badge>
                    {players.length > 0 && (
                      <Button
                        onClick={() => {
                          setPlayers([]);
                          setSelectedPlayer(null);
                          setShowBottomSheet(false);
                        }}
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-lg transition-all"
                        aria-label="Clear all players"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {players.length > 0 ? (
                <div className="p-2 lg:p-3">
                  <div className="space-y-1.5 lg:space-y-2">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        onClick={dragEnabled ? undefined : () => handlePlayerClick(player)}
                        className={`group relative px-2 py-2 rounded-lg transition-all ${
                          dragEnabled ? 'cursor-default' : 'cursor-pointer'
                        } ${
                          selectedPlayer === player.id 
                            ? 'bg-emerald-600/10 border border-emerald-500/20' 
                            : 'bg-slate-800/40 border border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700/60'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                            selectedPlayer === player.id
                              ? 'bg-emerald-600/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                          }`}>
                            {player.number}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-200 truncate">
                              {player.name || `Player ${player.number}`}
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-xs font-medium text-slate-400">{player.position}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mx-auto mb-2">
                      <Users className="w-5 h-5 text-slate-400" />
                    </div>
                    <h3 className="text-xs font-medium text-slate-300 mb-1">No Players Added</h3>
                    <p className="text-[10px] text-slate-500 max-w-[160px] mx-auto">
                      Tap on the positions on the pitch to start building your squad
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet for Player Details */}
      {showBottomSheet && selectedPlayer && (
        <PlayerDetailsModal
          player={players.find(p => p.id === selectedPlayer)!}
          onClose={() => setShowBottomSheet(false)}
          onUpdate={updatePlayer}
          onRemove={(id) => {
            removePlayer(id);
            setShowBottomSheet(false);
          }}
        />
      )}
    </div>
  );
}

