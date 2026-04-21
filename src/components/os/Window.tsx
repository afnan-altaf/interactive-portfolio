import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOS, AppId } from "./OSProvider";
import { X, Minus, Maximize2 } from "lucide-react";

interface WindowProps {
  id: AppId;
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
}

export function Window({ 
  id, 
  title, 
  children, 
  defaultWidth = 600, 
  defaultHeight = 400,
  defaultX,
  defaultY
}: WindowProps) {
  const { windows, closeApp, minimizeApp, maximizeApp, focusApp, activeApp } = useOS();
  const win = windows.find(w => w.id === id);
  const dragRef = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState({ 
    x: defaultX ?? (window.innerWidth / 2 - defaultWidth / 2 + (Math.random() * 40 - 20)), 
    y: defaultY ?? (window.innerHeight / 2 - defaultHeight / 2 + (Math.random() * 40 - 20)) 
  });

  if (!win?.isOpen) return null;

  const isActive = activeApp === id;

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          drag={!win.isMaximized}
          dragMomentum={false}
          dragListener={false}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: win.isMaximized ? 0 : pos.x,
            y: win.isMaximized ? 32 : pos.y,
            width: win.isMaximized ? "100vw" : defaultWidth,
            height: win.isMaximized ? "calc(100vh - 32px)" : defaultHeight,
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onMouseDown={() => focusApp(id)}
          style={{ zIndex: win.zIndex }}
          className={`fixed flex flex-col bg-card border shadow-2xl overflow-hidden ${
            win.isMaximized ? "rounded-none border-0" : "rounded-lg border-border"
          } ${isActive ? "shadow-primary/10" : ""}`}
        >
          {/* Window Header */}
          <div 
            className="h-10 bg-muted/50 border-b border-border flex items-center justify-between px-3 cursor-grab active:cursor-grabbing select-none"
            onPointerDown={(e) => {
              focusApp(id);
              // Basic drag logic using framer motion's manual drag setup or just custom state
            }}
          >
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                className="w-3 h-3 rounded-full bg-destructive flex items-center justify-center group"
              >
                <X className="w-2 h-2 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center group"
              >
                <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
                className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center group"
              >
                <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
            <div className="text-xs font-semibold text-muted-foreground flex-1 text-center pr-12">
              {title}
            </div>
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-auto bg-card">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}