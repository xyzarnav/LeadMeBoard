"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Trophy } from "lucide-react";

export default function Navbar() {
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

  // Mobile menu removed; no body scroll locking needed

  return (
    <>
      {/* Main navbar: hide on mobile scroll; fixed/visible on md+ */}
      <nav className={`fixed pb-3 mb-3 w-full z-50 transition-transform duration-300 ease-in-out ${hiddenOnScroll ? '-translate-y-full' : 'translate-y-0'} md:translate-y-0`}>
        <div className="backdrop-blur bg-black/60 border-b border-slate-900">
          <div className="max-w-7xl mx-auto px-4 h-14 md:h-16">
            <div className="flex items-center justify-between h-full">
              {/* Logo + title */}
              <div className="flex items-center gap-3">
                <Trophy className="w-7 h-7 text-emerald-400" />
                <div className="text-sm font-semibold text-white">Ekturfa</div>
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
                {/* Mobile hamburger removed */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
