"use client";
import { useMemo, useRef, useState } from "react";

export type SwipeItem = { title: string; description: string; icon: any };

export default function SwipeDeck({ items }: { items: SwipeItem[] }) {
  const [index, setIndex] = useState(0);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const valuesRef = useRef({ x: 0, y: 0, rot: 0 });
  const nextRef = useRef<HTMLDivElement | null>(null);
  const thirdRef = useRef<HTMLDivElement | null>(null);

  const neonStyles = useMemo(
    () => [
      { ring: "ring-2 ring-pink-500/60", shadow: "shadow-[0_0_30px_rgba(236,72,153,0.35)]", border: "border-pink-500/40" },
      { ring: "ring-2 ring-green-500/60", shadow: "shadow-[0_0_30px_rgba(34,197,94,0.35)]", border: "border-green-500/40" },
      { ring: "ring-2 ring-purple-500/60", shadow: "shadow-[0_0_30px_rgba(168,85,247,0.35)]", border: "border-purple-500/40" },
    ],
    []
  );

  const currentStyle = neonStyles[index % neonStyles.length];

  function applyTransform() {
    frameRef.current = null;
    const { x, y, rot } = valuesRef.current;
    const el = cardRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`;

    // Lift previews depending on drag progress (deck-like animation)
    const progress = Math.min(1, Math.abs(x) / 120);
    const n = nextRef.current;
    const t = thirdRef.current;
    if (n) n.style.transform = `translateY(${9 - progress * 9}px) scale(${0.99 + progress * 0.02})`;
    if (t) t.style.transform = `translateY(${18 - progress * 9}px) scale(${0.98 + progress * 0.01})`;
    if (n) n.style.opacity = `${0.8 + progress * 0.1}`;
    if (t) t.style.opacity = `${0.7 + progress * 0.05}`;
  }
  function schedule() { if (frameRef.current == null) frameRef.current = requestAnimationFrame(applyTransform); }

  function startDrag(x: number, y: number) {
    draggingRef.current = true;
    startRef.current = { x, y };
    const el = cardRef.current; if (el) el.style.transition = "none";
  }
  function moveDrag(x: number, y: number) {
    if (!draggingRef.current) return;
    const dx = x - startRef.current.x; const dy = y - startRef.current.y;
    valuesRef.current.x = dx; valuesRef.current.y = dy; valuesRef.current.rot = dx / 20; schedule();
  }
  function endDrag() {
    if (!draggingRef.current) return; draggingRef.current = false;
    const threshold = 120; const { x, y, rot } = valuesRef.current;
    const n = nextRef.current; const t = thirdRef.current;
    if (Math.abs(x) > threshold) {
      const dir = x > 0 ? 1 : -1; const card = cardRef.current;
      if (card) { card.style.transition = "transform 320ms ease, opacity 320ms ease"; card.style.transform = `translate3d(${dir * 800}px, ${y}px, 0) rotate(${rot + dir * 20}deg)`; card.style.opacity = "0"; }
      setTimeout(() => { setIndex((i) => (i + 1) % items.length); valuesRef.current = { x: 0, y: 0, rot: 0 }; if (card) card.removeAttribute("style"); if (n) n.removeAttribute("style"); if (t) t.removeAttribute("style"); }, 320);
    } else {
      const el = cardRef.current; if (el) { el.style.transition = "transform 220ms ease"; el.style.transform = "translate3d(0,0,0) rotate(0deg)"; }
      if (n) n.removeAttribute("style"); if (t) t.removeAttribute("style"); valuesRef.current = { x: 0, y: 0, rot: 0 };
    }
  }

  function onPointerDown(e: React.PointerEvent) { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); startDrag(e.clientX, e.clientY); }
  function onPointerMove(e: React.PointerEvent) { moveDrag(e.clientX, e.clientY); }
  function onPointerUp() { endDrag(); }
  function onTouchStart(e: React.TouchEvent) { const t = e.touches[0]; if (!t) return; startDrag(t.clientX, t.clientY); }
  function onTouchMove(e: React.TouchEvent) { const t = e.touches[0]; if (!t) return; moveDrag(t.clientX, t.clientY); }
  function onTouchEnd() { endDrag(); }

  const renderCardInner = (itemIndex: number, muted = false) => {
    const item = items[itemIndex % items.length];
    const Icon = item.icon;
    return (
      <div className={`h-full flex flex-col ${muted ? 'opacity-85' : ''}`}>
        <div className="h-[60%] w-full rounded-t-3xl bg-gray-800/40 border-b border-gray-700/50" />
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white/90" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3>
          </div>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer vitae augue in ipsum.</p>
        </div>
      </div>
    );
  };

  const nextIndex = (index + 1) % items.length; const thirdIndex = (index + 2) % items.length;

  return (
    <div className="mx-auto w-[82vw] max-w-[440px] sm:w-[88vw] sm:max-w-[540px] md:max-w-[560px] relative isolate" style={{ height: "56vh" }}>
      {/* Subtle deck edges to suggest more cards */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-24 w-2 rounded-r bg-white/5" />
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-24 w-2 rounded-l bg-white/5" />

      {/* Masked stage */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden z-0 pointer-events-none"><div className="absolute inset-0 bg-black/90" /></div>

      {/* Preview cards */}
      <div ref={thirdRef} className="absolute inset-0 rounded-3xl bg-gray-950 border border-gray-800/60 pointer-events-none z-10 opacity-70" style={{ transform: `translateY(18px) scale(0.98)` }}>{renderCardInner(thirdIndex, true)}</div>
      <div ref={nextRef} className="absolute inset-0 rounded-3xl bg-gray-950 border border-gray-800/60 pointer-events-none z-20 opacity-80" style={{ transform: `translateY(9px) scale(0.99)` }}>{renderCardInner(nextIndex, true)}</div>

      {/* Active card */}
      <div
        id="swipe-card-active"
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`absolute inset-0 select-none touch-none cursor-grab active:cursor-grabbing rounded-3xl bg-gray-950 border ${currentStyle.border} ${currentStyle.ring} ${currentStyle.shadow} z-50`}
        style={{ transform: "translate3d(0,0,0) rotate(0deg)", transition: "transform 220ms ease", willChange: "transform" }}
      >
        {renderCardInner(index)}
      </div>
    </div>
  );
}
