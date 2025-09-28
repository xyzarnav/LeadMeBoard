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
  Plus,
  X,
  Users2,
  Target,
  Zap
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("team");
  const [ripple, setRipple] = useState(false);
  const [fabExpanded, setFabExpanded] = useState(false);

  const navItems = [

    { id: "team", icon: Users, label: "Team", href: "#features" },
    { id: "room", icon: Box, label: "Room", href: "#" },
    { id: "plus", icon: Plus, label: "Add", href: "#" }, // FAB as selectable item
    { id: "matches", icon: Calendar, label: "Matches", href: "#pricing" },
    { id: "profile", icon: Settings, label: "Profile", href: "#" },
  ];

  const fabOptions = [
    { id: "lineup", icon: Users2, label: "Lineup Builder", color: "bg-blue-600 hover:bg-blue-500" },
    { id: "option2", icon: Target, label: "Option 2", color: "bg-purple-600 hover:bg-purple-500" }
    // { id: "option3", icon: Zap, label: "Option 3", color: "bg-orange-600 hover:bg-orange-500" }
  ];

  // Close FAB when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabExpanded) {
        setFabExpanded(false);
      }
    };

    if (fabExpanded) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [fabExpanded]);

  return (
    <>
      {/* Blur Overlay - Covers entire screen when FAB is expanded */}
      {fabExpanded && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" 
               onClick={() => setFabExpanded(false)}>
          </div>
          {/* Backdrop blur layer */}
          <div className="fixed inset-0 z-41 md:hidden" 
               onClick={() => setFabExpanded(false)}
               style={{
                 backdropFilter: 'blur(8px)',
                 WebkitBackdropFilter: 'blur(8px)',
                 background: 'rgba(59, 130, 246, 0.1)'
               }}>
          </div>
        </>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-2 left-0 right-0 z-50 md:hidden -mb-px" style={{ marginBottom: 0, paddingBottom: 0, bottom: 0 }}>
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

      {/* Floating Action Button (Center) with Rolling Options */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] md:hidden">
        <div className="relative">
          {/* FAB Options - Above FAB button */}
          {fabExpanded && (
            <div className="absolute bottom-28 left-[40%] transform -translate-x-1/2 z-60">
              <div className="flex items-center justify-center gap-4">
                {/* Left Option */}
                <div className="flex flex-col items-center transition-all duration-500 ease-out"
                     style={{ transitionDelay: '0ms', opacity: 1 }}>
                  <div className="mb-2 text-xs text-white bg-none px-1 py-1 rounded whitespace-nowrap">
                    {fabOptions[0].label}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Selected: ${fabOptions[0].label}`);
                      setFabExpanded(false);
                      window.location.href = '/lineup-builder';
                    }}
                    className={`${fabOptions[0].color} text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white/20`}
                  >
                    <Users2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Center Option - Perfectly Aligned with FAB */}
                <div className="flex flex-col items-center transition-all duration-500 ease-out"
                     style={{ transitionDelay: '100ms', opacity: 1 }}>
                  <div className="mb-2 text-xs text-white bg-none px-0 py-1 rounded whitespace-nowrap">
                    {fabOptions[1].label}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Selected: ${fabOptions[1].label}`);
                      setFabExpanded(false);
                    }}
                    className={`${fabOptions[1].color} text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white/20`}
                  >
                    <Target className="w-5 h-5" />
                  </Button>
                </div>

                {/* Right Option */}
                {/* <div className="flex flex-col items-center transition-all duration-500 ease-out"
                     style={{ transitionDelay: '300ms', opacity: 1 }}>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Selected: ${fabOptions[2].label}`);
                      setFabExpanded(false);
                    }}
                    className={`${fabOptions[2].color} text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white/20`}
                  >
                    <Zap className="w-5 h-5" />
                  </Button>
                  <div className="mt-2 text-xs text-white bg-black/90 px-2 py-1 rounded whitespace-nowrap border border-white/20">
                    {fabOptions[2].label}
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {/* Main FAB - Simplified */}
          <Button 
            size="lg" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('FAB clicked, current state:', fabExpanded);
              setFabExpanded(!fabExpanded);
              setRipple(true);
              setTimeout(() => setRipple(false), 600);
            }}
            className={`relative rounded-full bg-green-600 hover:bg-green-500 text-white transform transition-all duration-300 ease-out active:scale-95 border-2 border-green-400/40 shadow-lg hover:shadow-xl cursor-pointer ${
              fabExpanded 
                ? 'w-20 h-20 scale-110 -translate-y-1' 
                : 'w-18 h-18 hover:scale-105 hover:-translate-y-0.5'
            }`}
            style={{ zIndex: 1001 }}
          >
            {/* Ripple effect */}
            <div className={`absolute inset-0 bg-green-300/40 rounded-full transition-all duration-600 ease-out pointer-events-none ${
              ripple ? 'scale-150 opacity-0' : 'scale-0 opacity-100'
            }`}></div>
            
            {/* Icon - Rotates when expanded */}
            <div className={`relative z-10 transition-transform duration-300 ${fabExpanded ? 'rotate-45' : 'rotate-0'}`}>
              {fabExpanded ? (
                <X className="w-7 h-7" />
              ) : (
                <Plus className="w-7 h-7" />
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Bottom padding for content to not be hidden behind nav */}
      {/* Spacer removed to avoid bottom gap */}
      <div className="h-0 md:hidden" />
    </>
  );
}