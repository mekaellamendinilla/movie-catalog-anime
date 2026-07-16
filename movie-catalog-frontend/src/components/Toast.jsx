import { useEffect } from "react";

export default function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(() => {
      onClose();
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed right-4 top-4 z-60 animate-[fadeIn_0.2s_ease-out] rounded-2xl border border-emerald-400/30 bg-[#183524]/90 px-4 py-3 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#e7debb]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}
