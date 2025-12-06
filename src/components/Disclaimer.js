"use client";
import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-zinc-900/90 backdrop-blur-md border border-orange-500/30 p-4 rounded-lg shadow-2xl flex items-start gap-3">
        <div className="bg-orange-500/10 p-2 rounded-full shrink-0">
          <AlertTriangle size={20} className="text-orange-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium text-sm mb-1">Work in Progress</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            This portfolio is currently under active development. Some features or animations may be incomplete.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-zinc-500 hover:text-white transition-colors p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
