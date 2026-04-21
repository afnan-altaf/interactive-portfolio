import React, { useState } from "react";
import { Window } from "../os/Window";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    id: "project-1",
    title: "Luminous",
    category: "Generative Art",
    image: "/work1.png",
    shortDesc: "A real-time particle simulation exploring emergent behaviors and fluid dynamics in the browser.",
    fullDesc: "Luminous is an interactive WebGL experience built with Three.js and custom GLSL shaders. It simulates millions of particles reacting to fluid dynamics forces and user interactions. The challenge was optimizing the simulation to run at 60fps on mobile devices using compute shaders and instanced rendering.",
    tech: ["WebGL", "Three.js", "GLSL", "React"]
  },
  {
    id: "project-2",
    title: "Onyx Framework",
    category: "Developer Tool",
    image: "/work2.png",
    shortDesc: "A minimalist UI framework for building highly tactile web applications.",
    fullDesc: "Onyx is a set of React components and physics-based animation hooks designed to bring native-feeling interactions to the web. It features a custom spring physics engine and a declarative API for complex gesture handling. Adopted by multiple creative agencies for their core site architectures.",
    tech: ["React", "TypeScript", "Framer Motion", "Physics"]
  },
  {
    id: "project-3",
    title: "Telemetry",
    category: "Data Visualization",
    image: "/work3.png",
    shortDesc: "An immersive dashboard for monitoring distributed sensor networks.",
    fullDesc: "Built for a climate research initiative, Telemetry visualizes millions of data points from environmental sensors in real-time. It uses WebSockets for live updates and a custom Canvas 2D rendering engine to handle massive datasets without dropping frames. The UI is heavily inspired by terminal interfaces and sci-fi aesthetics.",
    tech: ["WebSockets", "Canvas API", "Node.js", "PostgreSQL"]
  }
];

export function WorkApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <Window id="work" title="Work_Gallery" defaultWidth={850} defaultHeight={600} defaultX={150} defaultY={100}>
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
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                  onClick={() => setSelectedId(project.id)}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
                        View Details <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-mono text-primary mb-2 uppercase tracking-wider">{project.category}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.shortDesc}</p>
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
                  <ArrowLeft className="w-4 h-4" /> Back to Gallery
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="w-4 h-4" /> Source
                  </Button>
                  <Button size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </Button>
                </div>
              </div>
              
              {selectedProject && (
                <div className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-10 pb-20">
                  <div className="aspect-[21/9] rounded-xl overflow-hidden border border-border shadow-2xl mb-10">
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1 prose prose-sm md:prose-base dark:prose-invert">
                      <h1 className="text-4xl md:text-5xl font-bold mb-2">{selectedProject.title}</h1>
                      <p className="text-xl text-muted-foreground mb-8">{selectedProject.shortDesc}</p>
                      
                      <h3>The Challenge</h3>
                      <p>{selectedProject.fullDesc}</p>
                      
                      <h3>Architecture & Design</h3>
                      <p>
                        The architecture relies heavily on decoupling state from rendering. By utilizing a central store and passing highly optimized data structures to the presentation layer, we achieved a sustained frame rate even under heavy computational load.
                      </p>
                    </div>
                    
                    <div className="w-full md:w-64 shrink-0 space-y-6">
                      <div className="p-5 rounded-xl bg-muted/50 border border-border">
                        <h4 className="font-mono text-sm font-bold text-primary mb-4 uppercase">Technology</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map(t => (
                            <span key={t} className="px-2 py-1 text-xs font-mono bg-background border border-border rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-5 rounded-xl bg-muted/50 border border-border">
                        <h4 className="font-mono text-sm font-bold text-primary mb-4 uppercase">Role</h4>
                        <ul className="text-sm space-y-2">
                          <li>Creative Direction</li>
                          <li>Frontend Engineering</li>
                          <li>Shader Programming</li>
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