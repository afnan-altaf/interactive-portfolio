import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useOS } from "./OSProvider";
import { Monitor, Moon, Sun, User, Briefcase, Beaker, PenTool, Mail } from "lucide-react";

export function CommandPalette({ open, setOpen }: { open: boolean, setOpen: (val: boolean) => void }) {
  const { openApp, theme, setTheme, crtEnabled, setCrtEnabled, resetWindows } = useOS();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Applications">
          <CommandItem onSelect={() => runCommand(() => openApp("about"))}>
            <User className="mr-2 h-4 w-4" />
            <span>Open About</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => openApp("work"))}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Open Work</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => openApp("lab"))}>
            <Beaker className="mr-2 h-4 w-4" />
            <span>Open Lab</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => openApp("writing"))}>
            <PenTool className="mr-2 h-4 w-4" />
            <span>Open Writing</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => openApp("contact"))}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Open Contact</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="System Settings">
          <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            <span>Toggle Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setCrtEnabled(!crtEnabled))}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>Toggle CRT Filter</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => resetWindows())}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>Reset Windows</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}