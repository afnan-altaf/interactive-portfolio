import React, { useState, useEffect } from "react";
import { useOS } from "./OSProvider";

const BOOT_TEXT = [
  "AFNAN.OS v2.4.1",
  "Initializing memory...",
  "Loading kernel extensions...",
  "Mounting creative modules...",
  "Establishing neural link...",
  "Welcome, Afnan."
];

export function BootSequence() {
  const { setBooted } = useOS();
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < BOOT_TEXT.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, BOOT_TEXT[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 300 + 200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setBooted(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, setBooted]);

  return (
    <div className="fixed inset-0 bg-black text-white font-mono text-sm p-8 z-[100] flex flex-col">
      {lines.map((line, i) => (
        <div key={i} className="mb-2">{line}</div>
      ))}
      {currentIndex < BOOT_TEXT.length && (
        <div className="w-2 h-4 bg-white animate-pulse mt-2"></div>
      )}
    </div>
  );
}