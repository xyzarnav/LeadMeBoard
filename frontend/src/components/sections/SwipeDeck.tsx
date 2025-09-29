"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";

export type SwipeItem = { title: string; description: string; icon: React.ElementType };

export default function SwipeDeck({ items }: { items: SwipeItem[] }) {
  const [paused, setPaused] = useState(false);
  // Neon variants rotate across cards
  const neonStyles = useMemo(
    () => [
      { ring: "ring-1 ring-green-500/50", shadow: "shadow-[0_0_30px_rgba(236,72,153,0.22)]", border: "border-gray-800/30" },
      { ring: "ring-1 ring-white-500/50", shadow: "shadow-[0_0_30px_rgba(34,197,94,0.22)]", border: "border-gray-800/30" },
      { ring: "ring-1 ring-green-500/50", shadow: "shadow-[0_0_30px_rgba(168,85,247,0.22)]", border: "border-gray-800/30" },
    ],
    []
  );

  // Duplicate items for seamless loop
  const loop = [...items, ...items, ...items];

  const renderCard = (item: SwipeItem, i: number) => {
    const v = neonStyles[i % neonStyles.length];
    const Icon = item.icon;
    return (
      <div
        key={`${item.title}-${i}`}
        className={`shrink-0 rounded-3xl bg-pitch-black border ${v.border} ${v.ring} ${v.shadow} overflow-hidden h-[50svh] sm:h-[60vh]`}
        style={{ width: "clamp(240px, 42vw, 360px)" }}
      >
        <div className="h-full flex flex-col py-1">
          {/* Top media - responsive height */}
          <div className="h-[70%] sm:h-[60%] w-full relative overflow-hidden border-b border-gray-800/50">
            <Image
              src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Football match action"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          {/* Bottom content - responsive height */}
          <div className="flex-1 p-3 sm:p-6 flex flex-col justify-center sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
              </div>
              <h3 className="text-base sm:text-2xl font-bold text-white">{item.title}</h3>
            </div>
            <p className="hidden sm:block text-sm sm:text-base text-gray-300 leading-relaxed mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae augue in ipsum pulvinar.
            </p>
          </div>
        </div>
      </div>
    );
  };

    return (
    <div 
      className="relative isolate bg-pitch-black"
      onMouseDown={() => setPaused(true)}
      onMouseUp={() => setPaused(false)}
      onMouseLeave={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onTouchCancel={() => setPaused(false)}
    >

      {/* Viewport */}
      <div className="overflow-hidden bg-pitch-black py-1">
        {/* Track (moves to the right) */}
        <div className="group deck-track flex gap-4 will-change-transform">
          {/* Two mirrored tracks to create endless loop */}
          <div className={`flex gap-4 animate-deck-right ${paused ? 'paused' : ''}`}>
            {loop.map((it, i) => renderCard(it, i))}
          </div>
          <div className={`flex gap-4 animate-deck-right ${paused ? 'paused' : ''}`} aria-hidden>
            {loop.map((it, i) => renderCard(it, i + loop.length))}
          </div>
        </div>
      </div>

      {/* Local keyframes */}
      <style jsx>{`
        @keyframes deck-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-deck-right {
          animation: deck-right 50s linear infinite;
        }
        .paused {
          animation-play-state: paused !important;
        }
        @media (min-width: 640px) {
          .animate-deck-right { animation-duration: 56s; }
        }
        @media (min-width: 1024px) {
          .animate-deck-right { animation-duration: 52s; }
        }
      `}</style>
    </div>
  );
}
