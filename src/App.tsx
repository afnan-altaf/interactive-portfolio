import React, { useState } from "react";
import { OSProvider, useOS } from "@/components/os/OSProvider";
import { BootSequence } from "@/components/os/BootSequence";
import { DesktopBackground } from "@/components/os/DesktopBackground";
import { MenuBar } from "@/components/os/MenuBar";
import { Dock } from "@/components/os/Dock";
import { CommandPalette } from "@/components/os/CommandPalette";
import { CRTFilter } from "@/components/os/CRTFilter";
import { DesktopContextMenu } from "@/components/os/ContextMenu";
import { CursorTrail } from "@/components/os/CursorTrail";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

import { AboutApp } from "@/components/apps/AboutApp";
import { WorkApp } from "@/components/apps/WorkApp";
import { LabApp } from "@/components/apps/LabApp";
import { WritingApp } from "@/components/apps/WritingApp";
import { ContactApp } from "@/components/apps/ContactApp";

function OS() {
  const { booted } = useOS();
  const [cmdOpen, setCmdOpen] = useState(false);

  if (!booted) {
    return <BootSequence />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <DesktopBackground />
      <CursorTrail />
      <CRTFilter />
      <MenuBar />
      
      <DesktopContextMenu>
        <div className="w-full h-full pt-8 pb-20 relative">
          <AboutApp />
          <WorkApp />
          <LabApp />
          <WritingApp />
          <ContactApp />
        </div>
      </DesktopContextMenu>
      
      <Dock />
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
    </div>
  );
}

function App() {
  return (
    <OSProvider>
      <TooltipProvider>
        <OS />
        <Toaster />
      </TooltipProvider>
    </OSProvider>
  );
}

export default App;