"use client";

import { Button } from "@/components/ui/button";
import { Save, Share2, Plus, Minus, Grid } from "lucide-react";
import SimpleDropdown from "@/components/ui/dropdown-menu";
import React from "react";

interface Formation { id: string; name: string }

interface MobileTopBarProps {
  formations: Formation[];
  selectedFormation: string;
  onFormationChange: (id: string) => void;
  isFreeFormation: boolean;
  onFreeFormationToggle: () => void;
  playerCount: number;
  onPlayerCountChange: (n: number) => void;
  onSave: () => void;
  onShare: () => void;
  // new props for free-formation controls
  dragEnabled: boolean;
  onDragToggle: () => void;
  onReset: () => void;
}

export function MobileTopBar({
  formations,
  selectedFormation,
  onFormationChange,
  isFreeFormation,
  onFreeFormationToggle,
  playerCount,
  onPlayerCountChange,
  onSave,
  onShare,
  dragEnabled,
  onDragToggle,
  onReset
}: MobileTopBarProps) {
  return (
  // sticky on mobile: remains until it reaches the top of the pitch
  <div className="block sm:hidden sticky left-0 right-0 z-50 p-0 pb-2 top-14">
      <div className="mx-auto max-w-3xl bg-gradient-to-b from-slate-900/90 to-slate-900 rounded-2xl shadow-lg border border-slate-800/60 p-4">
        <div className="flex items-right">
          {/* Left group: free toggle + formation select */}
          <div className="flex items-right gap-1 flex-2">
            <Button
              onClick={onFreeFormationToggle}
              size="sm"
              className={`h-10 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${isFreeFormation ? 'bg-emerald-600/90 text-white' : 'bg-slate-800/40 text-slate-200'}`}
            >
              <Grid className="w-4 h-4" />
              <span className="truncate">{isFreeFormation ? 'Free' : 'Tactics'}</span>
            </Button>

            <div className="relative flex-2">
              {isFreeFormation ? (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={onDragToggle}
                    size="sm"
                    className={`h-10 px-6 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${dragEnabled ? 'bg-amber-600 text-white' : 'bg-blue-900 text-white'}`}
                  >
                    <span className="truncate">{dragEnabled ? 'Drag On' : 'Drag Off'}</span>
                  </Button>
                  <Button
                    onClick={onReset}
                    size="sm"
                    className="h-10 px-6 rounded-lg text-sm bg-red-600 hover:bg-emerald-600 text-white"
                  >
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  {/* SimpleDropdown from ui/dropdown-menu */}
                  <SimpleDropdown
                    items={formations.map(f => ({ id: f.id, name: f.name }))}
                    selectedId={selectedFormation}
                    onSelect={(id: string) => onFormationChange(id)}
                    disabled={isFreeFormation}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right group: save/share */}
          <div className="flex items-center gap-2">
            <Button onClick={onSave} size="sm" className="h-10 px-3 rounded-lg bg-emerald-600 text-white flex items-center gap-2">
              <Save className="w-4 h-4" />
            </Button>
            <Button onClick={onShare} variant="outline" size="sm" className="h-10 px-3 rounded-lg text-slate-200 border-slate-700/50">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Second row: player count controls */}
        <div className="mt-4 flex items-center gap-4">
          <Button
            onClick={() => onPlayerCountChange(Math.max(3, playerCount - 1))}
            size="sm"
            className="w-10 h-10 rounded-lg bg-slate-800/50 text-slate-200 flex items-center justify-center"
            aria-label="Decrease players"
          >
            <Minus className="w-4 h-4" />
          </Button>

          <div className="flex-1 text-center">
            <div className="text-sm font-bold text-emerald-400">{playerCount} players</div>
            <div className="text-[11px] text-slate-400">Tap + or − to adjust</div>
          </div>

          <Button
            onClick={() => onPlayerCountChange(Math.min(11, playerCount + 1))}
            size="sm"
            className="w-10 h-10 rounded-lg bg-slate-800/50 text-slate-200 flex items-center justify-center"
            aria-label="Increase players"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MobileTopBar;
