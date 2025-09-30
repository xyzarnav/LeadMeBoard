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
    isFreeFormation,
    draggedPlayer,
    dragEnabled,
    customFormation,
  } = state;

  const {
    setTeamName,
    setShowBottomSheet,
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
        <div className="sm:hidden h-32" />
        
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

