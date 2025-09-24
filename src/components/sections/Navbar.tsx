"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 sticky top-0 z-50 border-b border-gray-700 professional-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-accent-green accent-text" />
            <span className="text-xl font-bold text-white">FootballPro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white transition-colors">Sign In</Button>
            <Button className="bg-green-600 text-white hover:bg-green-500 hover-glow transition-all">Start Free Trial</Button>
          </div>

          {/* Mobile CTA - Show only essential button */}
          <div className="md:hidden">
            <Button size="sm" className="bg-green-600 text-white hover:bg-green-500 hover-glow">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
