"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; name: string };

interface SimpleDropdownProps {
  items: Item[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export function SimpleDropdown({ items, selectedId, onSelect, disabled }: SimpleDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const selected = items.find(i => i.id === selectedId) || items[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(v => !v)}
        className={cn(
          'w-full h-10 pl-3 pr-3 py-2 rounded-lg text-sm text-slate-200 flex items-center justify-between',
          disabled ? 'opacity-60 cursor-not-allowed bg-slate-800/30' : 'bg-slate-800/40 hover:bg-slate-800/60'
        )}
      >
        <span className="truncate">{disabled ? selected?.name : selected?.name}</span>
        <svg className="w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && !disabled && (
        <div className="absolute z-50 mt-2 w-full rounded-md bg-slate-800 border border-slate-700/50 shadow-lg py-1">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => { onSelect(item.id); setOpen(false); }}
              className={cn('px-3 py-2 text-sm text-slate-200 hover:bg-slate-700/40 cursor-pointer flex items-center gap-2', item.id === selectedId && 'bg-slate-700/30')}
            >
              <div className="w-6 h-6 rounded-sm bg-slate-700/60 flex items-center justify-center text-xs text-slate-200">{item.name.split('-')[0]}</div>
              <div className="truncate">{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SimpleDropdown;
