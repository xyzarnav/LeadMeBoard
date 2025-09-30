import React from "react";
import { TeamSizeSelector } from "@/components/TeamSizeSelector";
import { FormationSelector } from "@/components/FormationSelector";
import { ActionsPanel } from "@/components/ActionsPanel";
import { ControlsPanelProps } from "@/types/lineup";

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  playerCount,
  formations,
  selectedFormation,
  isFreeFormation,
  dragEnabled,
  players,
  teamName,
  lineupName,
  onPlayerCountChange,
  onFormationChange,
  onFreeFormationToggle,
  onDragToggle,
  onReset,
}) => {
  return (
    <div className="space-y-2 lg:space-y-4 pb-2">
      {/* Team Size Selector */}
      <TeamSizeSelector 
        playerCount={playerCount}
        onPlayerCountChange={onPlayerCountChange}
      />

      {/* Formation Selector */}
      <FormationSelector
        formations={formations}
        selectedFormation={selectedFormation}
        isFreeFormation={isFreeFormation}
        dragEnabled={dragEnabled}
        playerCount={playerCount}
        onFormationChange={onFormationChange}
        onFreeFormationToggle={onFreeFormationToggle}
        onDragToggle={onDragToggle}
        onReset={onReset}
      />

      {/* Actions Panel */}
      <ActionsPanel 
        players={players}
        teamName={teamName}
        lineupName={lineupName}
        selectedFormation={selectedFormation}
        playerCount={playerCount}
      />
    </div>
  );
};