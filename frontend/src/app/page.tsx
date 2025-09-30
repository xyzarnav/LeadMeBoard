"use client";

import { PlayerDetailsModal } from "@/components/player-details-modal";
import { PitchField } from "@/components/PitchField";
import { PlayersList } from "@/components/PlayersList";
import { ControlsPanel } from "@/components/ControlsPanel";
import MobileTopBar from "@/components/MobileTopBar";
import Navbar from "@/components/sections/Navbar";
import { formations } from "@/lib/formations";
import { useLineupBuilder } from "@/hooks/useLineupBuilder";

export default function LineupBuilder() {
  const { state, actions } = useLineupBuilder();

  const {
    selectedFormation,
    playerCount,
    players,
    teamName,
    lineupName,
    selectedPlayer,
    showBottomSheet,
    showTeamDetails,
    isFreeFormation,
    draggedPlayer,
    dragEnabled,
    customFormation,
  } = state;

  const {
    setTeamName,
    setLineupName,
    setShowBottomSheet,
    setShowTeamDetails,
    setSelectedFormation,
    setIsFreeFormation,
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
  } = actions;

  const currentFormation = getCurrentFormation();

  const handleFreeFormationToggle = () => {
    const newFreeFormation = !isFreeFormation;
    setIsFreeFormation(newFreeFormation);
    if (newFreeFormation) {
      setSelectedFormation("free");
      const defaultFormation = generateFormation(playerCount);
      setCustomFormation(defaultFormation.positions);
      setDragEnabled(true);
    } else {
      setDragEnabled(false);
    }
  };

  const handleReset = () => {
    console.log('Reset clicked - Clearing all players');
    // Clear all players and reset state
    players.forEach(player => removePlayer(player.id));
    
    // Reset custom formation to default
    const defaultFormation = generateFormation(playerCount);
    setCustomFormation(defaultFormation.positions);
    
    // Disable drag mode
    setDragEnabled(false);
  };

  const handleClearPlayers = () => {
    players.forEach(player => removePlayer(player.id));
    setShowBottomSheet(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="h-14 md:h-16" />

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
      <div className="max-w-7xl mx-auto px-2 sm:px-3 py-4 sm:py-6">
        {/* Mobile compact top bar */}
        <MobileTopBar
          formations={formations}
          selectedFormation={selectedFormation}
          onFormationChange={setSelectedFormation}
          isFreeFormation={isFreeFormation}
          onFreeFormationToggle={handleFreeFormationToggle}
          playerCount={playerCount}
          onPlayerCountChange={handlePlayerCountChange}
          onSave={() => {
            const saveBtn = document.querySelector('.actions-save-button') as HTMLElement;
            if (saveBtn) saveBtn.click();
          }}
          onShare={() => {
            const shareBtn = document.querySelector('.actions-share-button') as HTMLElement;
            if (shareBtn) shareBtn.click();
          }}
          dragEnabled={dragEnabled}
          onDragToggle={() => setDragEnabled(!dragEnabled)}
          onReset={handleReset}
        />
        
        {/* Spacer to prevent MobileTopBar from covering content on mobile */}
        <div className="sm:hidden h-28" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
          {/* Left Sidebar - Controls Panel (hidden on mobile) */}
          <div className="lg:col-span-3 order-1 lg:order-1 hidden sm:block">
            <ControlsPanel
              playerCount={playerCount}
              formations={formations}
              selectedFormation={selectedFormation}
              isFreeFormation={isFreeFormation}
              dragEnabled={dragEnabled}
              players={players}
              teamName={teamName}
              lineupName={lineupName}
              onPlayerCountChange={handlePlayerCountChange}
              onFormationChange={setSelectedFormation}
              onFreeFormationToggle={handleFreeFormationToggle}
              onDragToggle={() => setDragEnabled(!dragEnabled)}
              onReset={handleReset}
            />
          </div>

          {/* Main Pitch Area */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-2">
            <PitchField
              teamName={teamName}
              onTeamNameChange={setTeamName}
              currentFormation={currentFormation}
              isFreeFormation={isFreeFormation}
              customFormation={customFormation}
              players={players}
              playerCount={playerCount}
              dragEnabled={dragEnabled}
              draggedPlayer={draggedPlayer}
              onAddPlayer={addPlayer}
              onPlayerClick={handlePlayerClick}
              onPlayerDrag={handlePlayerDrag}
              onPositionDrag={handlePositionDrag}
              onPlayerMouseDown={handleMouseDown}
              onPlayerTouchStart={handleTouchStart}
              onPositionMouseDown={handlePositionMouseDown}
              onPositionTouchStart={handlePositionTouchStart}
              getPlayerAtPosition={getPlayerAtPosition}
            />
          </div>

          {/* Right Sidebar - Players List */}
          <div className="lg:col-span-4 order-3 lg:order-3">
            <PlayersList
              players={players}
              playerCount={playerCount}
              selectedPlayer={selectedPlayer}
              dragEnabled={dragEnabled}
              onPlayerClick={handlePlayerClick}
              onClearPlayers={handleClearPlayers}
            />
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile nav/FAB overlap protection */}
      <div className="h-24 md:hidden" />

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

