"use client";

import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  BarChart3, 
  Calendar,
  Settings,
  Trophy
} from "lucide-react";
import { useState } from "react";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "#" },
    { id: "team", icon: Users, label: "Team", href: "#features" },
    { id: "stats", icon: BarChart3, label: "Stats", href: "#" },
    { id: "matches", icon: Calendar, label: "Matches", href: "#pricing" },
    { id: "profile", icon: Settings, label: "Profile", href: "#" },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90 border-t professional-border">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive 
                    ? 'text-accent-green' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'accent-text' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button (Center) */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <Button 
          size="lg" 
          className="w-14 h-14 rounded-full bg-green-600 text-white hover:bg-green-500 hover-glow shadow-lg"
        >
          <Trophy className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom padding for content to not be hidden behind nav */}
      <div className="h-16 md:hidden" />
    </>
  );
}
