"use client";

import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  Compass,
  Layers,
  Box,
  BarChart3, 
  Calendar,
  Settings,
  Trophy,
  Grid3X3,
  Plus
} from "lucide-react";
import { useState, useRef } from "react";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("team");
  const [ripple, setRipple] = useState(false);

  const navItems = [

    { id: "team", icon: Users, label: "Team", href: "#features" },
    { id: "room", icon: Box, label: "Room", href: "#" },
    { id: "plus", icon: Plus, label: "Add", href: "#" }, // FAB as selectable item
    { id: "matches", icon: Calendar, label: "Matches", href: "#pricing" },
    { id: "profile", icon: Settings, label: "Profile", href: "#" },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-2 left-0 right-0 z-40 md:hidden -mb-px" style={{ marginBottom: 0, paddingBottom: 0, bottom: 0 }}>
        <div className="relative h-20 overflow-hidden" style={{ marginBottom: 0, paddingBottom: 0 }}>
          {/* Main navbar background */}
          <div className="absolute inset-0 bg-black backdrop-blur-xl border-t border-white/20">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
        
        {/* Navigation Items */}
        <div className="absolute inset-0 grid grid-cols-5 h-16 px-2">
          {navItems.map((item, index) => {
            // Center item (plus) is handled by FAB - skip rendering here
            if (item.id === "plus") {
              return <div key={item.id} className="flex items-center justify-center"></div>;
            }
            
            const Icon = item.icon!;
            const isActive = activeTab === item.id;
            
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                className="flex flex-col items-center justify-center py-1 group relative overflow-hidden"
              >
                {/* Active indicator background */}
                <div className={`absolute top-1 w-12 h-10 rounded-2xl transition-all duration-300 ease-out ${
                  isActive 
                    ? 'bg-gradient-to-b from-accent-green/20 to-accent-green/10 scale-100 opacity-100' 
                    : 'bg-transparent scale-75 opacity-0'
                }`}>
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    isActive ? 'bg-accent-green/10 shadow-lg shadow-accent-green/25' : ''
                  }`}></div>
                </div>
                
                {/* Icon */}
                <div className={`relative z-10 transition-all duration-300 ease-out ${
                  isActive 
                    ? 'transform scale-110 -translate-y-0.5' 
                    : 'group-hover:scale-105 group-hover:-translate-y-0.5'
                }`}>
                  <Icon className={`w-6 h-6 transition-all duration-300 ${
                    isActive 
                      ? 'text-accent-green drop-shadow-sm' 
                      : 'text-gray-400 group-hover:text-white'
                  }`} />
                </div>
                
                {/* Label */}
                <span className={`text-xs font-medium mt-0.5 mb-0 pb-0 transition-all duration-300 relative z-10 ${
                  isActive 
                    ? 'text-accent-green font-semibold' 
                    : 'text-gray-500 group-hover:text-gray-300'
                }`}>
                  {item.label}
                </span>
                
                {/* Active indicator dot */}
                <div className={`absolute bottom-0.5 w-1 h-1 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent-green scale-100 opacity-100' 
                    : 'bg-transparent scale-0 opacity-0'
                }`}></div>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button (Center) - Floating above navbar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="relative group">
          {/* FAB Neon Glow */}
          <div 
            className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 scale-100 ${
              activeTab === "plus" 
                ? 'opacity-35' 
                : 'opacity-25 group-hover:opacity-35'
            } bg-green-500`}
          ></div>
          
          {/* FAB Inner Glow */}
          <div 
            className={`absolute inset-0 rounded-full blur-md transition-all duration-300 scale-105 ${
              activeTab === "plus" 
                ? 'opacity-50' 
                : 'opacity-35 group-hover:opacity-45'
            } bg-green-500`}
          ></div>
          
          {/* Main FAB */}
          <Button 
            size="lg" 
            onClick={() => {
              setActiveTab("plus");
              setRipple(true);
              setTimeout(() => setRipple(false), 600);
            }}
            className={`relative rounded-full text-black transform transition-all duration-300 ease-out active:scale-95 overflow-hidden border-2 border-green-400/40 ${
              activeTab === "plus" 
                ? 'w-20 h-20 scale-110 -translate-y-1 shadow-[0_0_30px_rgba(34,197,94,0.48),0_0_60px_rgba(34,197,94,0.24)]' 
                : 'w-18 h-18 hover:scale-105 hover:-translate-y-0.5 shadow-[0_0_20px_rgba(34,197,94,0.36),0_0_40px_rgba(34,197,94,0.18)] hover:shadow-[0_0_25px_rgba(34,197,94,0.42),0_0_50px_rgba(34,197,94,0.24)]'
            }`}
            data-color="green"
          >
            <div className="absolute inset-0 rounded-full bg-green-600 hover:bg-green-500 transition-colors duration-300"></div>
            
            {/* Ripple effect */}
            <div className={`absolute inset-0 bg-green-300/40 rounded-full transition-all duration-600 ease-out pointer-events-none ${
              ripple ? 'scale-150 opacity-0' : 'scale-0 opacity-100'
            }`}></div>
            
            {/* Icon */}
            <Plus className={`relative z-10 stroke-[3] text-white transition-all duration-300 ${
               activeTab === "plus" ? 'w-8 h-8 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]' : 'w-7 h-7 drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]'
             }`} />
          </Button>
          
          {/* Active state ring */}
          <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ease-out ${
            activeTab === "plus" 
              ? 'border-green-400/60 scale-125 opacity-100' 
              : 'border-green-400/40 scale-115 opacity-0 group-hover:opacity-100 group-hover:scale-130'
          }`}></div>
        </div>
      </div>

      {/* Bottom padding for content to not be hidden behind nav */}
      {/* Spacer removed to avoid bottom gap */}
      <div className="h-0 md:hidden" />
    </>
  );
}
