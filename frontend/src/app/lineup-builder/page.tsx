"use client";

import { useState } from "react";
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
  Zap
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
      { x: 35, y: 70, role: "CB" },
      { x: 65, y: 70, role: "CB" },
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
  }
];

export default function LineupBuilder() {
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamName, setTeamName] = useState("");
  const [lineupName, setLineupName] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showFormationSelector, setShowFormationSelector] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);

  const currentFormation = formations.find(f => f.id === selectedFormation) || formations[0];

  const addPlayer = (position: { x: number; y: number; role: string }) => {
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: "",
      position: position.role,
      number: players.length + 1,
      x: position.x,
      y: position.y
    };
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
    setSelectedPlayer(player.id);
    setShowBottomSheet(true);
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
                <p className="text-sm text-slate-500">{players.length}/11 players</p>
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
            <div className="space-y-2 lg:space-y-3">
              {/* Formation Selector */}
              <div className="rounded-xl" style={{ backgroundColor: '#1A1A1A' }}>
                <div className="px-3 py-2 border-b border-slate-800/60">
                  <h3 className="text-sm font-medium text-slate-400">Formation</h3>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-3 lg:grid-cols-1 gap-1">
                    {formations.map(formation => (
                      <Button
                        key={formation.id}
                        onClick={() => setSelectedFormation(formation.id)}
                        className={`h-auto py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          selectedFormation === formation.id 
                            ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/30' 
                            : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 hover:text-slate-200'
                        }`}
                      >
                        {formation.name}
                      </Button>
                    ))}
                  </div>
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
                className="relative bg-gradient-to-b from-emerald-600 via-emerald-500 to-emerald-600 rounded-lg shadow-lg overflow-hidden w-full"
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
                  {currentFormation.positions.map((position, index) => {
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
                                onClick={() => handlePlayerClick(player)}
                                className="w-10 h-10 bg-neutral-900 border border-white/85 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-transform hover:scale-105"
                              >
                                {player.number}
                              </button>
                              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-white bg-black/70 px-1.5 py-0.5 rounded whitespace-nowrap truncate max-w-[60px]">
                                {player.name || `P${player.number}`}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => addPlayer(position)}
                              className="w-8 h-8 bg-white border-2 border-dashed border-black/40 rounded-full hover:bg-white/20 hover:border-white/60 transition-all duration-200 flex items-center justify-center"
                              aria-label={`Add player at ${position.role}`}
                            >
                              <Plus className="w-5 h-5 text-black/80 stroke-2" />
                            </button>
                          )}
                      </div>
                    );
                  })}
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
                  <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                    {players.length}/11
                  </Badge>
                </div>
              </div>
              
              {players.length > 0 ? (
                <div className="p-2 lg:p-3">
                  <div className="space-y-1.5 lg:space-y-2">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        onClick={() => handlePlayerClick(player)}
                        className={`group relative px-2 py-2 rounded-lg cursor-pointer transition-all ${
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

