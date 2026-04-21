import React, { useEffect, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useOS } from "./OSProvider";
import { Sun, Moon, Monitor, RefreshCw } from "lucide-react";

export function DesktopContextMenu({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, crtEnabled, setCrtEnabled, resetWindows } = useOS();

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full h-full min-h-screen">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          Toggle Theme
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setCrtEnabled(!crtEnabled)}>
          <Monitor className="mr-2 h-4 w-4" />
          Toggle CRT Filter
        </ContextMenuItem>
        <ContextMenuItem onClick={resetWindows}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Windows
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}