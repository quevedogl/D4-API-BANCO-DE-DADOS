"use client";

interface BottomTabProps {
  onMenuClick: () => void;
}

export default function BottomTab({ onMenuClick }: BottomTabProps) {
  return (
    <div className="bg-cyan-500 flex items-center justify-between px-6 py-3">
      {/* Hamburger */}
      <button onClick={onMenuClick} className="text-white">
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Logo IFix */}
      <div className="flex items-center gap-1">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
}
