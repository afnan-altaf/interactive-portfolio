import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useOS } from "./OSProvider";
import { Monitor, Moon, Sun, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MenuBar() {
  const [time, setTime] = useState(new Date());
  const { activeApp, theme, setTheme, crtEnabled, setCrtEnabled } = useOS();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const appNames: Record<string, string> = {
    about: "About",
    work: "Work",
    lab: "Lab",
    writing: "Writing",
    contact: "Contact",
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-50 text-xs font-medium">
      <div className="flex items-center gap-4">
        <div className="font-bold flex items-center gap-2">
          <Terminal className="w-3 h-3" />
          RIVERA.OS
        </div>
        {activeApp && (
          <div className="text-muted-foreground">
            {appNames[activeApp]}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-6 h-6 hover:bg-muted"
            onClick={() => setCrtEnabled(!crtEnabled)}
            title="Toggle CRT Filter"
          >
            <Monitor className={`w-3 h-3 ${crtEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-6 h-6 hover:bg-muted"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle Theme"
          >
            {theme === "dark" ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
          </Button>
        </div>
        <div>
          {format(time, "EEE MMM d   h:mm a")}
        </div>
      </div>
    </div>
  );
}