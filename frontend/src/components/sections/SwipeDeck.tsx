"use client";
import { useMemo, useState } from "react";

export type SwipeItem = { title: string; description: string; icon: any };

export default function SwipeDeck({ items }: { items: SwipeItem[] }) {
  const [paused, setPaused] = useState(false);
  // Neon variants rotate across cards
  const neonStyles = useMemo(
    () => [
      { ring: "ring-1 ring-green-500/50", shadow: "shadow-[0_0_30px_rgba(236,72,153,0.22)]", border: "border-gray-800/30" },
      { ring: "ring-1 ring-green-500/50", shadow: "shadow-[0_0_30px_rgba(34,197,94,0.22)]", border: "border-gray-800/30" },
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
        className={`shrink-0 rounded-3xl bg-pitch-black border ${v.border} ${v.ring} ${v.shadow} overflow-hidden h-[52svh] sm:h-[60vh]`}
        style={{ width: "clamp(240px, 42vw, 360px)" }}
      >
        <div className="h-full flex flex-col py-1">
          {/* Top media (60%) */}
          <div className="h-[60%] w-full bg-gray-800/40 border-b border-gray-800/50" />
          {/* Bottom content (40%) */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white/90" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white">{item.title}</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae augue in ipsum pulvinar.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative isolate"
      onMouseDown={() => setPaused(true)}
      onMouseUp={() => setPaused(false)}
      onMouseLeave={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onTouchCancel={() => setPaused(false)}
    >
      {/* Deck rails hint */}
      <div className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 h-24 w-2 rounded-r bg-white/5" />
      <div className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 h-24 w-2 rounded-l bg-white/5" />

      {/* Viewport */}
      <div className="overflow-hidden bg-pitch-black py-1">
        {/* Track (moves to the right) */}
        <div className="group deck-track flex gap-4 will-change-transform">
          {/* Two mirrored tracks to create endless loop */}
          <div className="flex gap-4 animate-deck-right" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
            {loop.map((it, i) => renderCard(it, i))}
          </div>
          <div className="flex gap-4 animate-deck-right" style={{ animationPlayState: paused ? 'paused' : 'running' }} aria-hidden>
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
