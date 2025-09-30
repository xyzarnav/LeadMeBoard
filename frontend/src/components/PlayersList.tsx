import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trash2 } from "lucide-react";
import { PlayersListProps } from "@/types/lineup";
import { Player } from "@/types/player";

export const PlayersList: React.FC<PlayersListProps> = ({
  players,
  playerCount,
  selectedPlayer,
  dragEnabled,
  onPlayerClick,
  onClearPlayers,
}) => {
  return (
    <div className="rounded-2xl" style={{ backgroundColor: '#1A1A1A', minWidth: '280px' }}>
      <div className="px-3 lg:px-4 py-2 lg:py-3 border-b border-slate-800/60">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-slate-300">Squad</h3>
            <p className="text-xs text-slate-500 mt-0.5">Team Players</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              {players.length}/{playerCount}
            </Badge>
            {players.length > 0 && (
              <Button
                onClick={onClearPlayers}
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
        <PlayersGrid
          players={players}
          selectedPlayer={selectedPlayer}
          dragEnabled={dragEnabled}
          onPlayerClick={onPlayerClick}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

interface PlayersGridProps {
  players: Player[];
  selectedPlayer: string | null;
  dragEnabled: boolean;
  onPlayerClick: (player: Player) => void;
}

const PlayersGrid: React.FC<PlayersGridProps> = ({
  players,
  selectedPlayer,
  dragEnabled,
  onPlayerClick,
}) => (
  <div className="p-2 lg:p-3">
    <div className="space-y-1.5 lg:space-y-2">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          isSelected={selectedPlayer === player.id}
          dragEnabled={dragEnabled}
          onPlayerClick={onPlayerClick}
        />
      ))}
    </div>
  </div>
);

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  dragEnabled: boolean;
  onPlayerClick: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isSelected,
  dragEnabled,
  onPlayerClick,
}) => {
  const handleClick = dragEnabled ? undefined : () => onPlayerClick(player);
  const handleKeyDown = dragEnabled ? undefined : (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPlayerClick(player);
    }
  };

  const containerClasses = [
    'group relative px-2 py-2 rounded-lg transition-all',
    dragEnabled ? 'cursor-default' : 'cursor-pointer',
    isSelected 
      ? 'bg-emerald-600/10 border border-emerald-500/20' 
      : 'bg-slate-800/40 border border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700/60'
  ].join(' ');

  const numberClasses = [
    'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-colors',
    isSelected
      ? 'bg-emerald-600/20 text-emerald-400'
      : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
  ].join(' ');

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={dragEnabled ? undefined : "button"}
      tabIndex={dragEnabled ? undefined : 0}
      className={containerClasses}
    >
      <div className="flex items-center gap-2">
        <div className={numberClasses}>
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
  );
};

const EmptyState: React.FC = () => (
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
);