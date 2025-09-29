"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Trophy } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const lastScroll = useRef(0);

  // Hide navbar on mobile when scrolling down, show when scrolling up
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y > lastScroll.current && y > 60) {
        // scrolling down
        setHiddenOnScroll(true);
      } else {
        // scrolling up
        setHiddenOnScroll(false);
      }
      lastScroll.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Fixed mobile menu button (always visible on mobile) */}
      <div className="fixed top-3 right-3 z-50 md:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-lg bg-emerald-600/90 flex items-center justify-center text-white shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Main navbar: hide on mobile scroll (unless menu is open), fixed/visible on md+ */}
      <nav className={`fixed pb-3 mb-3 w-full z-50 transition-transform duration-300 ease-in-out ${!isOpen && hiddenOnScroll ? '-translate-y-full' : 'translate-y-0'} md:translate-y-0`}>
        <div className="backdrop-blur bg-black/60 border-b border-slate-900">
          <div className="max-w-7xl mx-auto px-4 h-14 md:h-16">
            <div className="flex items-center justify-between h-full">
              {/* Logo + title */}
              <div className="flex items-center gap-3">
                <Trophy className="w-7 h-7 text-emerald-400" />
                <div className="text-sm font-semibold text-white">FootballPro</div>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-slate-300 hover:text-white text-sm">Features</a>
                <a href="#pricing" className="text-slate-300 hover:text-white text-sm">Pricing</a>
                <a href="#about" className="text-slate-300 hover:text-white text-sm">About</a>
                <a href="#contact" className="text-slate-300 hover:text-white text-sm">Contact</a>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" className="text-slate-300 hover:text-white">Sign In</Button>
                  <Button className="bg-emerald-500 text-white">Start Free Trial</Button>
                </div>
                {/* On mobile the fixed menu button above is used */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu + overlay */}
      {/* Overlay behind the menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className={`fixed inset-x-0 top-0 md:hidden transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
           style={{ zIndex: 1200 }}>
        <div className="bg-black/95 border-b border-slate-900 backdrop-blur px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-emerald-400" />
              <div className="text-sm font-semibold text-white">Menu</div>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Close menu" onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <a onClick={() => setIsOpen(false)} href="#features" className="block text-white text-base">Features</a>
            <a onClick={() => setIsOpen(false)} href="#pricing" className="block text-white text-base">Pricing</a>
            <a onClick={() => setIsOpen(false)} href="#about" className="block text-white text-base">About</a>
            <a onClick={() => setIsOpen(false)} href="#contact" className="block text-white text-base">Contact</a>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button variant="ghost" className="text-slate-200">Sign In</Button>
            <Button className="bg-emerald-500 text-white">Get Started</Button>
          </div>
        </div>
      </div>
    </>
  );
}
