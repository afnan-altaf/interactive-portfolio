import React from "react";
import { motion } from "framer-motion";
import { useOS, AppId } from "./OSProvider";
import { User, Briefcase, Beaker, PenTool, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const APPS: { id: AppId; icon: React.ElementType; label: string }[] = [
  { id: "about", icon: User, label: "About" },
  { id: "work", icon: Briefcase, label: "Work" },
  { id: "lab", icon: Beaker, label: "Lab" },
  { id: "writing", icon: PenTool, label: "Writing" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export function Dock() {
  const { windows, openApp, focusApp, activeApp } = useOS();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-background/70 backdrop-blur-xl border border-border p-2 rounded-2xl flex items-center gap-2 shadow-xl">
        {APPS.map(app => {
          const win = windows.find(w => w.id === app.id);
          const isOpen = win?.isOpen;
          const isActive = activeApp === app.id;
          
          return (
            <Tooltip key={app.id}>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (!isOpen) {
                      openApp(app.id);
                    } else {
                      focusApp(app.id);
                    }
                  }}
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-primary text-primary-foreground shadow-md" : "bg-card hover:bg-muted text-card-foreground border border-border shadow-sm"
                  }`}
                >
                  <app.icon className="w-5 h-5" />
                  {isOpen && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>
                <p>{app.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}