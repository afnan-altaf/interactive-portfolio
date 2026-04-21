import React from "react";
import { Window } from "../os/Window";

export function AboutApp() {
  return (
    <Window id="about" title="About.txt" defaultWidth={700} defaultHeight={500} defaultX={50} defaultY={50}>
      <div className="p-8 flex flex-col md:flex-row gap-8 items-start h-full overflow-auto">
        <div className="w-full md:w-1/3 shrink-0">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-lg relative group">
            <img 
              src="/portrait.png" 
              alt="Alex Rivera" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          </div>
          <div className="mt-6 space-y-4 font-mono text-sm text-muted-foreground">
            <div>
              <span className="text-primary font-bold">STATUS:</span> Active
            </div>
            <div>
              <span className="text-primary font-bold">LOCATION:</span> San Francisco, CA
            </div>
            <div>
              <span className="text-primary font-bold">FOCUS:</span> Motion / WebGL / Systems
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 prose prose-sm md:prose-base dark:prose-invert">
          <h1 className="text-4xl font-bold tracking-tight mb-6 mt-0">Alex Rivera</h1>
          <p className="text-lg text-muted-foreground lead">
            I am a full-stack engineer and generative artist. I build tools and experiences at the intersection of code, motion, and play.
          </p>
          <div className="h-px w-full bg-border my-6"></div>
          <p>
            My work focuses on bridging the gap between rigorous software engineering and expressive creative coding. I believe that the tools we use shape the thoughts we have, and that interfaces should feel like physical, tactile objects—responsive, playful, and alive.
          </p>
          <p>
            Currently, I am exploring WebGL, computational geometry, and experimental web architecture. I spend my days writing TypeScript and Rust, and my nights writing shaders and messing with synthesizers.
          </p>
          <h3>Core Competencies</h3>
          <ul>
            <li><strong>Frontend:</strong> React, WebGL, Three.js, Framer Motion, Tailwind</li>
            <li><strong>Backend:</strong> Node.js, Rust, PostgreSQL, Redis</li>
            <li><strong>Creative:</strong> GLSL, Web Audio API, Canvas 2D, Generative Systems</li>
          </ul>
        </div>
      </div>
    </Window>
  );
}