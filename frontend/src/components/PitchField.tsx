import React from "react";
import { Plus } from "lucide-react";
import { PitchFieldProps } from "@/types/lineup";

export const PitchField: React.FC<PitchFieldProps> = ({
  teamName,
  onTeamNameChange,
  currentFormation,
  isFreeFormation,
  customFormation,
  players,
  playerCount,
  dragEnabled,
  draggedPlayer,
  onAddPlayer,
  onPlayerClick,
  onPlayerMouseDown,
  onPlayerTouchStart,
  onPositionMouseDown,
  onPositionTouchStart,
  getPlayerAtPosition,
}) => {
  return (
    <div className="rounded-lg overflow-hidden w-full" style={{ maxWidth: '400px' }}>
      <div
        className={`relative bg-gradient-to-b from-emerald-600 via-emerald-500 to-emerald-600 rounded-lg shadow-lg overflow-hidden w-full pitch-container ${draggedPlayer ? 'dragging' : ''}`}
        style={{ aspectRatio: '2/3', minHeight: '300px' }}
      >
        {/* Team Name Form Section */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10 text-white">
          <div className="bg-light-green backdrop-blur-sm border border-white/40 text-white rounded-lg px-0 py-0 shadow-lg">
            <input
              type="text"
              value={teamName}
              onChange={(e) => onTeamNameChange(e.target.value)}
              placeholder="Enter team name"
              className="w-48 px-3 py-1.5 bg-white/10 border border-white/30 rounded-md text-white text-sm font-bold placeholder-white/60 placeholder:italic placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-center"
            />
          </div>
        </div>

        {/* Pitch Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/85"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 border-[1.5px] border-white/85 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-2 left-1/4 w-1/2 h-10 border-[1.2px] border-white/80"></div>
          <div className="absolute top-2 left-1/4 w-1/2 h-10 border-[1.2px] border-white/80"></div>
          <div className="absolute bottom-2 left-1/2 w-6 h-2 border-[1.2px] border-white/80 transform -translate-x-1/2"></div>
          <div className="absolute top-2 left-1/2 w-6 h-2 border-[1.2px] border-white/80 transform -translate-x-1/2"></div>
        </div>

        {/* Formation Positions */}
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
                    <PlayerButton
                      player={player}
                      dragEnabled={dragEnabled}
                      draggedPlayer={draggedPlayer}
                      onMouseDown={onPlayerMouseDown}
                      onTouchStart={onPlayerTouchStart}
                      onClick={onPlayerClick}
                    />
                  ) : (
                    players.length < playerCount && (
                      <AddPlayerButton
                        position={position}
                        onAddPlayer={onAddPlayer}
                        onMouseDown={(e) => onPositionMouseDown(index, e)}
                        onTouchStart={(e) => onPositionTouchStart(index, e)}
                        draggedPlayer={draggedPlayer}
                        draggedIndex={index}
                        isFreeFormation={isFreeFormation}
                      />
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
                    <PlayerButton
                      player={player}
                      dragEnabled={dragEnabled}
                      draggedPlayer={draggedPlayer}
                      onMouseDown={onPlayerMouseDown}
                      onTouchStart={onPlayerTouchStart}
                      onClick={onPlayerClick}
                    />
                  ) : (
                    players.length < playerCount && (
                      <AddPlayerButton
                        position={position}
                        onAddPlayer={onAddPlayer}
                        isFreeFormation={false}
                      />
                    )
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

interface PlayerButtonProps {
  player: any;
  dragEnabled: boolean;
  draggedPlayer: string | null;
  onMouseDown: (playerId: string, e: React.MouseEvent) => void;
  onTouchStart: (playerId: string, e: React.TouchEvent) => void;
  onClick: (player: any) => void;
}

const PlayerButton: React.FC<PlayerButtonProps> = ({
  player,
  dragEnabled,
  draggedPlayer,
  onMouseDown,
  onTouchStart,
  onClick,
}) => (
  <div className="relative">
    <button
      onMouseDown={(e) => onMouseDown(player.id, e)}
      onTouchStart={(e) => onTouchStart(player.id, e)}
      onClick={dragEnabled ? undefined : (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(player);
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
);

interface AddPlayerButtonProps {
  position: any;
  onAddPlayer: (position: any) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  draggedPlayer?: string | null;
  draggedIndex?: number;
  isFreeFormation: boolean;
}

const AddPlayerButton: React.FC<AddPlayerButtonProps> = ({
  position,
  onAddPlayer,
  onMouseDown,
  onTouchStart,
  draggedPlayer,
  draggedIndex,
  isFreeFormation,
}) => (
  <button
    onMouseDown={onMouseDown}
    onTouchStart={onTouchStart}
    onClick={() => onAddPlayer(position)}
    className={`w-8 h-8 bg-white border-2 border-dashed border-black/40 rounded-full hover:bg-white/20 hover:border-white/60 transition-all duration-200 flex items-center justify-center ${
      isFreeFormation ? 'cursor-move' : ''
    } ${draggedPlayer === `position-${draggedIndex}` ? 'scale-110 shadow-lg' : ''}`}
    aria-label={`Add player at ${position.role}`}
    style={{ userSelect: 'none', pointerEvents: 'auto' }}
    tabIndex={0}
  >
    <Plus className="w-5 h-5 text-black/80 stroke-2" />
  </button>
);