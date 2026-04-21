import { useState } from "react";
import { Window } from "../os/Window";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Github, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContactApp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    setIsSubmitting(true);

    try {
      const res = await fetch("https://formspree.io/f/mwverpag", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setIsSubmitting(false);
      if (res.ok) {
        setIsSuccess(true);
        formEl.reset();
        toast({
          title: "Message transmitted",
          description: "Your signal has been received. Afnan will respond shortly.",
        });
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        toast({
          title: "Transmission failed",
          description: "Please try again or email afnanaltafjamber@gmail.com directly.",
          variant: "destructive",
        });
      }
    } catch {
      setIsSubmitting(false);
      toast({
        title: "Transmission failed",
        description: "Please try again or email afnanaltafjamber@gmail.com directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <Window id="contact" title="Terminal_Contact" defaultWidth={520} defaultHeight={680} defaultX={400} defaultY={120}>
      <div className="p-6 h-full flex flex-col bg-card overflow-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-mono tracking-tight text-primary">Initiate Contact</h2>
          <p className="text-sm text-muted-foreground mt-2">Open for projects, collaborations, and digital services.</p>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-6 text-sm">
          <a href="tel:+923133331514" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            <span className="font-mono">+92-313-333-1514</span>
          </a>
          <a href="mailto:afnanaltafjamber@gmail.com" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors">
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-mono break-all">afnanaltafjamber@gmail.com</span>
          </a>
          <a href="https://jambertech.short.gy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="font-mono">WhatsApp · jambertech.short.gy</span>
          </a>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-mono">AfnanJamber, Soan Garden, Islamabad</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Identity</label>
            <Input required name="name" placeholder="Your Name" className="font-mono bg-background border-border shadow-none focus-visible:ring-1 focus-visible:ring-primary" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Return Address</label>
            <Input required type="email" name="email" placeholder="Your Email" className="font-mono bg-background border-border shadow-none focus-visible:ring-1 focus-visible:ring-primary" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Payload</label>
            <Textarea required name="message" placeholder="Your Message" rows={5} className="font-mono resize-none bg-background border-border shadow-none focus-visible:ring-1 focus-visible:ring-primary" />
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

        <div className="mt-6 pt-6 border-t border-border flex justify-center gap-4">
          <a href="https://github.com/afnan-altaf" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10" title="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="mailto:afnanaltafjamber@gmail.com" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10" title="Email">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://jambertech.short.gy/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10" title="WhatsApp">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </Window>
  );
}
