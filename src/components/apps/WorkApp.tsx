import { useState } from "react";
import { Window } from "../os/Window";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    id: "exp-1",
    title: "E-Services Seller",
    company: "Self Employed",
    period: "Aug 2024 — Ongoing",
    category: "Freelance",
    shortDesc: "Selling SMM services, Udemy courses & accounts to local stores in Miani, Sargodha. Learning HTML basics on the side.",
    fullDesc:
      "I run my own e-services business, working hand-in-hand with shops and small businesses in Miani, Sargodha. The work spans social-media marketing packages, reselling Udemy courses and accounts, and helping owners get their first online presence. Day to day, I'm balancing client communication, ad creatives, and continuous learning of the basics of HTML and web building.",
    tech: ["SMM", "Udemy Reselling", "Client Ops", "HTML"],
    role: ["Owner & Operator", "Sales", "Client Success"],
  },
  {
    id: "exp-2",
    title: "Point of Sale Operator",
    company: "Retail",
    period: "10 Feb 2025 — 10 May 2025",
    category: "Operations",
    shortDesc: "Handled daily transactions, cash handling, inventory and customer service using POS systems.",
    fullDesc:
      "Worked the front-of-house for daily retail operations: ringing up sales, balancing the cash drawer, running stock checks, and handling customer questions face-to-face. The role sharpened my focus on accuracy under pressure and on keeping the customer experience smooth even during the busiest hours.",
    tech: ["POS Systems", "Cash Handling", "Inventory", "Customer Service"],
    role: ["POS Operator", "Inventory Check"],
  },
  {
    id: "exp-3",
    title: "Store Advertiser",
    company: "Electricstore.pk, Soan Garden",
    period: "4 Dec 2023 — Aug 2024",
    category: "Marketing",
    shortDesc: "Built the store's online and in-area presence and launched their shop on Daraz.pk.",
    fullDesc:
      "I partnered with Electricstore.pk in Soan Garden to grow both their physical and digital footprint. The biggest win was launching their full storefront on Daraz.pk — product listings, pricing, descriptions, and the ad strategy that followed. Locally, I ran neighborhood promotions and helped grow their walk-in traffic.",
    tech: ["Daraz.pk", "Local Marketing", "Listings", "Promotions"],
    role: ["Advertiser", "Daraz Launcher", "Local Outreach"],
  },
  {
    id: "exp-4",
    title: "Blogger / WordPress Posts Manager",
    company: "AH Mobile & Refrigeration",
    period: "2021 — 3 Dec 2023",
    category: "Content & Web",
    shortDesc: "Collaborated with the company owner to manage their sites and software sales through blogging.",
    fullDesc:
      "Over more than two years I managed the WordPress sites of AH Mobile & Refrigeration — writing posts, publishing content, keeping pages up to date, and supporting the company's software-sales pipeline through consistent blogging. This is where I built the muscle for content workflows, on-page basics, and working closely with a small business owner.",
    tech: ["WordPress", "Blogging", "Content Strategy", "On-page SEO"],
    role: ["Blogger", "Site Manager", "Content Lead"],
  },
];

export function WorkApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find((p) => p.id === selectedId);

  return (
    <Window id="work" title="Work_Experience" defaultWidth={880} defaultHeight={620} defaultX={150} defaultY={100}>
      <div className="relative h-full overflow-hidden bg-background">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-6 h-full overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                  onClick={() => setSelectedId(project.id)}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="text-xs font-mono text-primary mb-3 uppercase tracking-wider">{project.category}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 font-mono">
                      <Building2 className="w-3 h-3" /> {project.company}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-mono">
                      <Calendar className="w-3 h-3" /> {project.period}
                    </div>
                    <p className="text-muted-foreground text-sm">{project.shortDesc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background flex flex-col h-full overflow-auto"
            >
              <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setSelectedId(null)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Experience
                </Button>
              </div>

              {selectedProject && (
                <div className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-10 pb-20">
                  <div className="text-xs font-mono text-primary mb-3 uppercase tracking-wider">{selectedProject.category}</div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">{selectedProject.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono mb-8">
                    <span className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {selectedProject.company}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedProject.period}</span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1 prose prose-sm md:prose-base dark:prose-invert">
                      <p className="text-xl text-muted-foreground mb-6">{selectedProject.shortDesc}</p>
                      <h3>What I did</h3>
                      <p>{selectedProject.fullDesc}</p>
                    </div>

                    <div className="w-full md:w-64 shrink-0 space-y-6">
                      <div className="p-5 rounded-xl bg-muted/50 border border-border">
                        <h4 className="font-mono text-sm font-bold text-primary mb-4 uppercase">Stack & Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((t) => (
                            <span key={t} className="px-2 py-1 text-xs font-mono bg-background border border-border rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 rounded-xl bg-muted/50 border border-border">
                        <h4 className="font-mono text-sm font-bold text-primary mb-4 uppercase">Role</h4>
                        <ul className="text-sm space-y-2 list-none p-0 m-0">
                          {selectedProject.role.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Window>
  );
}
