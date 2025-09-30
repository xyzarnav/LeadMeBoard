import { Player } from "./player";
import { Formation } from "@/lib/formations";

export interface LineupState {
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
}

export interface FormationPosition {
  x: number;
  y: number;
  role: string;
}

export interface PitchFieldProps {
  teamName: string;
  onTeamNameChange: (name: string) => void;
  currentFormation: Formation;
  isFreeFormation: boolean;
  customFormation: FormationPosition[];
  players: Player[];
  playerCount: number;
  dragEnabled: boolean;
  draggedPlayer: string | null;
  onAddPlayer: (position: FormationPosition) => void;
  onPlayerClick: (player: Player) => void;
  onPlayerDrag: (playerId: string, newX: number, newY: number) => void;
  onPositionDrag: (positionIndex: number, newX: number, newY: number) => void;
  onPlayerMouseDown: (playerId: string, e: React.MouseEvent) => void;
  onPlayerTouchStart: (playerId: string, e: React.TouchEvent) => void;
  onPositionMouseDown: (positionIndex: number, e: React.MouseEvent) => void;
  onPositionTouchStart: (positionIndex: number, e: React.TouchEvent) => void;
  getPlayerAtPosition: (x: number, y: number) => Player | undefined;
}

export interface PlayersListProps {
  players: Player[];
  playerCount: number;
  selectedPlayer: string | null;
  dragEnabled: boolean;
  onPlayerClick: (player: Player) => void;
  onClearPlayers: () => void;
}

export interface ControlsPanelProps {
  playerCount: number;
  formations: Formation[];
  selectedFormation: string;
  isFreeFormation: boolean;
  dragEnabled: boolean;
  players: Player[];
  teamName: string;
  lineupName: string;
  onPlayerCountChange: (count: number) => void;
  onFormationChange: (formationId: string) => void;
  onFreeFormationToggle: () => void;
  onDragToggle: () => void;
  onReset: () => void;
}

export interface LineupBuilderHooks {
  addPlayer: (position: FormationPosition) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  getPlayerAtPosition: (x: number, y: number) => Player | undefined;
  handlePlayerClick: (player: Player) => void;
  handlePlayerCountChange: (newCount: number) => void;
  handlePlayerDrag: (playerId: string, newX: number, newY: number) => void;
  handlePositionDrag: (positionIndex: number, newX: number, newY: number) => void;
  handleMouseDown: (playerId: string, e: React.MouseEvent) => void;
  handleTouchStart: (playerId: string, e: React.TouchEvent) => void;
  handlePositionMouseDown: (positionIndex: number, e: React.MouseEvent) => void;
  handlePositionTouchStart: (positionIndex: number, e: React.TouchEvent) => void;
}