import React from "react";
import { Window } from "../os/Window";

const ESSAYS = [
  {
    title: "The Interface is the Product",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    excerpt: "Why the visual layer is no longer just a wrapper around the database, but the actual value proposition of modern software."
  },
  {
    title: "Designing for Tactility on the Web",
    date: "Aug 04, 2023",
    readTime: "8 min read",
    excerpt: "How to use spring physics, spatial audio, and haptic feedback metaphors to make web applications feel physical."
  },
  {
    title: "A Primer on Compute Shaders",
    date: "May 22, 2023",
    readTime: "12 min read",
    excerpt: "Moving beyond pixel manipulation to run arbitrary parallel calculations on the GPU. A practical guide for web developers."
  },
  {
    title: "The Death of the Dashboard",
    date: "Jan 15, 2023",
    readTime: "6 min read",
    excerpt: "B2B software is stuck in a local maximum of tables and charts. Here is how we build tools that actually respect user attention."
  },
  {
    title: "Nostalgia and the Command Line",
    date: "Nov 30, 2022",
    readTime: "4 min read",
    excerpt: "Exploring why highly technical users consistently retreat to the terminal, and what graphical interfaces can learn from it."
  }
];

export function WritingApp() {
  return (
    <Window id="writing" title="Essays.md" defaultWidth={600} defaultHeight={700} defaultX={300} defaultY={50}>
      <div className="p-0 h-full flex flex-col bg-card">
        <div className="p-6 border-b border-border bg-muted/30">
          <h2 className="text-2xl font-bold font-mono tracking-tight text-primary">/var/log/thoughts</h2>
          <p className="text-sm text-muted-foreground mt-2">Writing on engineering, design, and digital art.</p>
        </div>
        
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {ESSAYS.map((essay, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="flex items-center gap-4 mb-2 text-xs font-mono text-muted-foreground">
                <time>{essay.date}</time>
                <span>•</span>
                <span>{essay.readTime}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors underline-offset-4 group-hover:underline">
                {essay.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {essay.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Window>
  );
}