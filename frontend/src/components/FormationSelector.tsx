"use client";

import { Button } from "@/components/ui/button";
import SimpleDropdown from "@/components/ui/dropdown-menu";

interface Formation {
  id: string;
  name: string;
  positions: { x: number; y: number; role: string }[];
}

interface FormationSelectorProps {
  formations: Formation[];
  selectedFormation: string;
  isFreeFormation: boolean;
  dragEnabled: boolean;
  playerCount: number;
  onFormationChange: (formation: string) => void;
  onFreeFormationToggle: () => void;
  onDragToggle: () => void;
  onReset: () => void;
}

export function FormationSelector({
  formations,
  selectedFormation,
  isFreeFormation,
  dragEnabled,
  playerCount,
  onFormationChange,
  onFreeFormationToggle,
  onDragToggle,
  onReset
}: FormationSelectorProps) {
  return (
    <div className="rounded-xl" style={{ backgroundColor: '#1A1A1A' }}>
      {/* Desktop Header */}
      <div className="hidden sm:block px-3 py-2 border-b border-slate-800/60">
        <h3 className="text-xs sm:text-sm font-medium text-slate-400">Formation</h3>
      </div>
      <div className="p-1 sm:p-2 lg:p-3">
        {/* Mobile: Compact One-Row Layout */}
        <div className="block sm:hidden">
          <div className="flex items-center gap-1">
            {/* Free Formation Button - Mobile */}
            <Button
              onClick={onFreeFormationToggle}
              className={`flex-1 h-auto py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                isFreeFormation 
                  ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/30' 
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              {isFreeFormation ? '✓ Free' : 'Free'}
            </Button>
            
            {/* Formation Dropdown - Mobile (SimpleDropdown) */}
            <div className="flex-1 relative">
              <SimpleDropdown
                items={formations.map(f => ({ id: f.id, name: f.name }))}
                selectedId={selectedFormation}
                onSelect={(id: string) => onFormationChange(id)}
                disabled={isFreeFormation}
              />
            </div>
            
            {/* Drag Toggle and Reset - Only show when Free is selected */}
            {isFreeFormation && (
              <>
                <Button
                  onClick={onDragToggle}
                  className={`h-8 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                    dragEnabled 
                      ? 'bg-green-600/20 text-green-400 ring-1 ring-green-500/30' 
                      : 'bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30'
                  }`}
                >
                  {dragEnabled ? 'Drag On' : 'Drag Off'}
                </Button>
                <Button
                  onClick={onReset}
                  className="h-8 px-2 py-1 rounded-lg text-xs font-medium bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 hover:text-orange-300 ring-1 ring-orange-500/30 transition-all"
                >
                  Reset
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Desktop: Original Layout */}
        <div className="hidden sm:block">
          {/* Free Formation Toggle - Desktop */}
          <div className="mb-2 sm:mb-3">
            <Button
              onClick={onFreeFormationToggle}
              className={`w-full h-auto py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                isFreeFormation 
                  ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/30' 
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              {isFreeFormation ? '✓ Free Formation' : 'Free Formation'}
            </Button>
          </div>
        
          {/* Drag Toggle and Reset - Desktop */}
          {isFreeFormation && (
            <div className="mb-3">
              <div className="flex gap-1">
                {/* Drag Toggle - Left Half */}
                <Button
                  onClick={onDragToggle}
                  className={`flex-1 h-auto py-3 px-2 rounded-l-lg text-xs font-medium transition-all ${
                    dragEnabled 
                      ? 'bg-green-600/20 text-green-400 ring-1 ring-green-500/30' 
                      : 'bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30'
                  }`}
                >
                  Drag: {dragEnabled ? 'On' : 'Off'}
                </Button>
                
                {/* Reset Button - Right Half */}
                <Button
                  onClick={onReset}
                  className="flex-1 h-auto py-3 px-2 rounded-r-lg text-xs font-medium bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 hover:text-orange-300 ring-1 ring-orange-500/30 transition-all"
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
          
          {/* Predefined Formations - Desktop */}
          {playerCount === 11 && !isFreeFormation && (
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
              {formations.map(formation => (
                <Button
                  key={formation.id}
                  onClick={() => onFormationChange(formation.id)}
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
    </div>
  );
}
