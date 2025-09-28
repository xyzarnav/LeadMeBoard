"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TeamSizeSelectorProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
}

export function TeamSizeSelector({ playerCount, onPlayerCountChange }: TeamSizeSelectorProps) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#1A1A1A' }} onWheel={(e) => e.preventDefault()}>
      {/* Desktop Header */}
      <div className="hidden sm:block px-3 sm:px-4 py-1 border-b border-slate-800/60">
        <h3 className="text-xs sm:text-sm font-medium text-slate-300">Team Size</h3>
      </div>
      <div className="p-0 sm:p-2 lg:pb-12 xl:pb-16">
        <div className="space-y-1 sm:space-y-4">
          {/* Mobile: Compact Layout - Everything in one row */}
          <div className="block sm:hidden">
            <div className="flex items-center gap-2">
              {/* Minus Button */}
              <button
                onClick={() => onPlayerCountChange(Math.max(3, playerCount - 1))}
                disabled={playerCount <= 3}
                className="group relative w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 disabled:from-slate-800 disabled:to-slate-900 disabled:opacity-40 rounded-lg flex items-center justify-center text-white text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none border border-slate-600/50 hover:border-slate-500 disabled:border-slate-700/30"
                aria-label="Decrease player count"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-0"></div>
                <span className="relative z-10">−</span>
                {playerCount <= 3 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white/20"></div>
                )}
              </button>
              
              {/* Slider */}
              <div className="flex-1 relative" onWheel={(e) => e.preventDefault()} style={{ touchAction: 'none' }}>
                <div className="relative h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full shadow-inner">
                  <div 
                    className="absolute top-0 left-0 h-3 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-full shadow-lg"
                    style={{ width: `${((playerCount - 3) / 8) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/50 to-emerald-300/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <input
                  type="range"
                  min="3"
                  max="11"
                  value={playerCount}
                  onChange={(e) => onPlayerCountChange(parseInt(e.target.value))}
                  onWheel={(e) => e.preventDefault()}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                      e.preventDefault();
                    }
                  }}
                  className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer slider-advanced"
                  style={{ 
                    zIndex: 10, 
                    margin: 0, 
                    padding: 0,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    width: '100%',
                    height: '12px',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    transform: 'translateY(0)',
                    boxSizing: 'border-box'
                  }}
                  tabIndex={-1}
                />
              </div>
              
              {/* Plus Button */}
              <button
                onClick={() => onPlayerCountChange(Math.min(11, playerCount + 1))}
                disabled={playerCount >= 11}
                className="group relative w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 disabled:from-slate-800 disabled:to-slate-900 disabled:opacity-40 rounded-lg flex items-center justify-center text-white text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none border border-slate-600/50 hover:border-slate-500 disabled:border-slate-700/30"
                aria-label="Increase player count"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-0"></div>
                <span className="relative z-10">+</span>
                {playerCount >= 11 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white/20"></div>
                )}
              </button>
            </div>
            
            {/* Mobile: Player count and text in one line */}
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150"></div>
                <div className="relative text-xl font-black text-emerald-400 tracking-tight">
                  {playerCount}
                </div>
              </div>
              <div className="text-xs text-slate-400 font-medium">players</div>
            </div>
          </div>
          
          {/* Desktop: Original Layout */}
          <div className="hidden sm:block">
            {/* Current Value Display with Glow Effect - Desktop */}
            <div className="text-center relative">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150"></div>
                <div className="relative text-4xl font-black text-emerald-400 tracking-tight">
                  {playerCount}
                </div>
              </div>
              <div className="text-sm text-slate-400 font-medium mt-1">players on field</div>
            </div>
            
            {/* Advanced Slider Container - Desktop */}
            <div className="relative" onWheel={(e) => e.preventDefault()} style={{ touchAction: 'none' }}>
              {/* Slider Track with Gradient */}
              <div className="relative h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full shadow-inner">
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-full shadow-lg"
                  style={{ width: `${((playerCount - 3) / 8) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/50 to-emerald-300/50 rounded-full animate-pulse"></div>
                  
                  {/* Interactive Wheel Indicator */}
                  <div className="absolute -right-2 -top-1 w-6 h-6 bg-emerald-400 border-2 border-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Custom Slider Input */}
              <input
                type="range"
                min="3"
                max="11"
                value={playerCount}
                onChange={(e) => onPlayerCountChange(parseInt(e.target.value))}
                onWheel={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                  }
                }}
                className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer slider-advanced"
                style={{ 
                  zIndex: 10, 
                  margin: 0, 
                  padding: 0,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  width: '100%',
                  height: '12px',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  transform: 'translateY(0)',
                  boxSizing: 'border-box'
                }}
                tabIndex={-1}
              />
              
              {/* Enhanced Plus and Minus Buttons - Desktop */}
              <div className="absolute left-2 top-10 transform -translate-y-1/2">
                <button
                  onClick={() => onPlayerCountChange(Math.max(3, playerCount - 1))}
                  disabled={playerCount <= 3}
                  className="group relative w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 disabled:from-slate-800 disabled:to-slate-900 disabled:opacity-40 rounded-xl flex items-center justify-center text-white text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none border border-slate-600/50 hover:border-slate-500 disabled:border-slate-700/30"
                  aria-label="Decrease player count"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-0"></div>
                  <span className="relative z-10">−</span>
                  {playerCount <= 3 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white/20"></div>
                  )}
                </button>
              </div>
              
              <div className="absolute right-2 top-10 transform -translate-y-1/2">
                <button
                  onClick={() => onPlayerCountChange(Math.min(11, playerCount + 1))}
                  disabled={playerCount >= 11}
                  className="group relative w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 disabled:from-slate-800 disabled:to-slate-900 disabled:opacity-40 rounded-xl flex items-center justify-center text-white text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none border border-slate-600/50 hover:border-slate-500 disabled:border-slate-700/30"
                  aria-label="Increase player count"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-0"></div>
                  <span className="relative z-10">+</span>
                  {playerCount >= 11 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white/20"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
