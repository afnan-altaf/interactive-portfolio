import React, { useState } from "react";
import { Window } from "../os/Window";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Github, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContactApp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message transmitted",
        description: "Your signal has been received. I'll respond shortly.",
      });
      
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <Window id="contact" title="Terminal_Contact" defaultWidth={500} defaultHeight={600} defaultX={400} defaultY={150}>
      <div className="p-6 h-full flex flex-col bg-card">
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-mono tracking-tight text-primary">Initiate Contact</h2>
          <p className="text-sm text-muted-foreground mt-2">Open for interesting projects, collaborations, and conversations.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Identity</label>
            <Input required placeholder="Name or Alias" className="font-mono bg-background border-border shadow-none focus-visible:ring-1 focus-visible:ring-primary" />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Return Address</label>
            <Input required type="email" placeholder="Email" className="font-mono bg-background border-border shadow-none focus-visible:ring-1 focus-visible:ring-primary" />
          </div>
          
          <div className="space-y-2 flex-1 flex flex-col h-40">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Payload</label>
            <Textarea required placeholder="What's on your mind?" className="flex-1 font-mono resize-none bg-background border-border shadow-none focus-visible:ring-1 focus-visible:ring-primary" />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting || isSuccess}
            className="w-full font-mono font-bold tracking-wider"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">Transmitting...</span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2 text-green-500">Delivered</span>
            ) : (
              <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
            )}
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-border flex justify-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </Window>
  );
}