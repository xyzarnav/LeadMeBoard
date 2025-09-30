"use client";

import { Button } from "@/components/ui/button";
import { Save, Share2 } from "lucide-react";
import { Player } from "@/types/player";

interface ActionsPanelProps {
  players: Player[];
  teamName?: string;
  lineupName?: string;
  selectedFormation?: string;
  playerCount: number;
}

export function ActionsPanel({ players, teamName, lineupName, selectedFormation, playerCount }: ActionsPanelProps) {
  const downloadLineupImage = async () => {
    try {
      // Get the pitch container element
      const pitchContainer = document.querySelector('.pitch-container') as HTMLElement;
      if (!pitchContainer) {
        console.error('Pitch container not found');
        return;
      }

      // Create a canvas with higher resolution for better quality
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size (2x for better quality)
      const rect = pitchContainer.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;

      // Scale context for high DPI
      ctx.scale(2, 2);

      // Set background
      ctx.fillStyle = '#10b981'; // Emerald background
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw pitch lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2;
      
      // Center line
      ctx.beginPath();
      ctx.moveTo(0, rect.height / 2);
      ctx.lineTo(rect.width, rect.height / 2);
      ctx.stroke();

      // Center circle
      ctx.beginPath();
      ctx.arc(rect.width / 2, rect.height / 2, 32, 0, 2 * Math.PI);
      ctx.stroke();

      // Goal areas
      ctx.lineWidth = 2.4;
      // Bottom goal
      ctx.strokeRect(rect.width / 4, rect.height - 40, rect.width / 2, 40);
      // Top goal
      ctx.strokeRect(rect.width / 4, 0, rect.width / 2, 40);

      // Goal posts
      ctx.lineWidth = 2.4;
      // Bottom goal posts
      ctx.strokeRect(rect.width / 2 - 12, rect.height - 8, 24, 8);
      // Top goal posts
      ctx.strokeRect(rect.width / 2 - 12, 0, 24, 8);

      // Draw players
      players.forEach(player => {
        const x = (player.x / 100) * rect.width;
        const y = (player.y / 100) * rect.height;

        // Player circle
        ctx.fillStyle = '#1f2937'; // Dark gray
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();

        // Player border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Player number
        ctx.fillStyle = '#ffffff'; 
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(player.number.toString(), x, y);

        // Player name
        if (player.name) {
          ctx.font = 'bold 10px "Inter", "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
        
          const text = player.name;
          const metrics = ctx.measureText(text);
          const padding = 4; // extra space around text
        
          // Calculate rect dimensions
          const textWidth = metrics.width + padding * 2;
          const textHeight = 12 + padding * 2; // 12 ≈ font size (10px + little buffer)
        
          // Draw background rectangle (behind text)
          ctx.fillStyle = '#10B981'; // semi-transparent black
          ctx.fillRect(x - textWidth / 2, y + 33 - textHeight / 2, textWidth, textHeight);
        
          // Draw text on top
          ctx.fillStyle = '#ffffff'; // white text
          ctx.fillText(text, x, y + 30);
        }
        
      });

      // Add form section at top of pitch (near far goal keeper end)
      const formY = 60; // Position near the top goal area
      const formWidth = 200;
      const formHeight = 40;
      const formX = (rect.width - formWidth) / 2;

    //   // Form label
    //   ctx.fillStyle = 'white';
    //   ctx.font = 'bold italic 16px Arial';
    //   ctx.textAlign = 'center';
    //   ctx.fillText('Team Name:', formX + formWidth / 2, formY - 5);

      // Team name input area
   

      // Team name text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(teamName || 'Team', formX + formWidth / 2, formY + 22);

      // Add title below form
      ctx.fillStyle = 'white';
      ctx.font = 'bold italic 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Lineup Formation', rect.width / 2, formY + formHeight + 10);

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${lineupName || 'lineup'}-${selectedFormation || 'custom'}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error generating lineup image:', error);
    }
  };
  return (
    <div className="rounded-xl" style={{ backgroundColor: '#1A1A1A' }}>
      {/* Desktop Header */}
      <div className="hidden sm:block px-3 py-2 border-b border-slate-800/60">
        <h3 className="text-xs sm:text-sm font-medium text-slate-400">Actions</h3>
      </div>
      <div className="p-1 sm:p-2">
        {/* Mobile: One Row Layout */}
        <div className="block sm:hidden">
          <div className="flex gap-2">
            <Button 
              onClick={downloadLineupImage}
              className="actions-save-button flex-1 h-11 py-2 bg-emerald-600/90 hover:bg-emerald-600 text-emerald-50 rounded-lg text-sm font-medium transition-colors"
            >
              <Save className="w-4 h-4 mr-2 opacity-90" />
              Save
            </Button>
            <Button 
              variant="outline" 
              className="actions-share-button flex-1 h-11 py-2 bg-slate-800/40 hover:bg-slate-800/60 border-slate-700/50 text-slate-300 hover:text-slate-200 rounded-lg text-sm font-medium transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2 opacity-90" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Desktop: Original Vertical Layout */}
        <div className="hidden sm:block">
          <div className="space-y-1">
            <Button 
              onClick={downloadLineupImage}
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
  );
}
