import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AppId = "about" | "work" | "lab" | "writing" | "contact";

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface OSContextType {
  windows: WindowState[];
  activeApp: AppId | null;
  booted: boolean;
  crtEnabled: boolean;
  theme: "light" | "dark";
  setBooted: (val: boolean) => void;
  setCrtEnabled: (val: boolean) => void;
  setTheme: (val: "light" | "dark") => void;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  resetWindows: () => void;
}

const defaultWindows: WindowState[] = [
  { id: "about", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  { id: "work", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 2 },
  { id: "lab", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 3 },
  { id: "writing", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 4 },
  { id: "contact", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 5 },
];

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [booted, setBooted] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [nextZIndex, setNextZIndex] = useState(10);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const activeApp = windows.filter(w => w.isOpen && !w.isMinimized).sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeApp) {
        closeApp(activeApp);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeApp]);

  const openApp = (id: AppId) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex };
      }
      return w;
    }));
    setNextZIndex(prev => prev + 1);
  };

  const closeApp = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const minimizeApp = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const maximizeApp = (id: AppId) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isMaximized: !w.isMaximized, zIndex: nextZIndex };
      }
      return w;
    }));
    setNextZIndex(prev => prev + 1);
  };

  const focusApp = (id: AppId) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, zIndex: nextZIndex, isMinimized: false };
      }
      return w;
    }));
    setNextZIndex(prev => prev + 1);
  };

  const resetWindows = () => {
    setWindows(defaultWindows);
  };

  return (
    <OSContext.Provider value={{
      windows,
      activeApp,
      booted,
      crtEnabled,
      theme,
      setBooted,
      setCrtEnabled,
      setTheme,
      openApp,
      closeApp,
      minimizeApp,
      maximizeApp,
      focusApp,
      resetWindows
    }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) throw new Error("useOS must be used within OSProvider");
  return context;
}