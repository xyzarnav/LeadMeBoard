import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Player } from "@/types/player";

interface PlayerDetailsModalProps {
  player: Player;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Player>) => void;
  onRemove: (id: string) => void;
}

export function PlayerDetailsModal({ player, onClose, onUpdate, onRemove }: PlayerDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className="w-full max-w-sm mx-4 bg-black rounded-2xl shadow-xl border border-slate-800" 
        style={{ aspectRatio: '2/1.7', maxWidth: '370px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="text-base font-semibold text-white">Player Details</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Name</label>
            <input
              type="text"
              value={player.name}
              onChange={(e) => onUpdate(player.id, { name: e.target.value })}
              placeholder="Enter player name"
              className="w-full px-3 py-2 bg-black border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Number</label>
              <input
                type="number"
                value={player.number}
                onChange={(e) => onUpdate(player.id, { number: parseInt(e.target.value) || 1 })}
                min="1"
                max="99"
                className="w-full px-3 py-2 bg-black border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Position</label>
              <div className="px-3 py-2 bg-black border border-slate-800 rounded-lg text-sm text-slate-300">
                {player.position}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 p-6 border-t border-slate-800">
          <Button
            onClick={() => onRemove(player.id)}
            variant="ghost"
            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300"
          >
            Remove
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
