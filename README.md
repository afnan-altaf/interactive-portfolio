# AFNAN.OS — Interactive Portfolio

  A desktop-style interactive portfolio for Afnan Altaf, built as if you're booting into a tiny operating system. Draggable windows, a live dock, a command palette, three playable lab experiments, cursor trails, an optional CRT filter, and both light & dark themes.

  **Live demo:** https://afnan-altaf.github.io/interactive-portfolio/

  ## Tech

  - React 19 + Vite 7
  - TypeScript
  - Tailwind CSS v4
  - Framer Motion (windows, dock, transitions)
  - Radix UI primitives + shadcn/ui
  - HTML Canvas + Web Audio API for the Lab experiments

  ## Features

  - **Boot sequence** — typewriter terminal that resolves into a desktop
  - **Draggable windows** with minimize / maximize / close + spring animations
  - **Dock** that tracks open windows
  - **Command palette** (Cmd/Ctrl + K) to jump anywhere
  - **Right-click desktop menu** for wallpaper & system actions
  - **Cursor trail** that follows your pointer
  - **CRT scanline mode** toggle
  - **Light + dark themes** designed deliberately, not auto-generated

  ## Apps inside

  - About — bio, skills, education, downloadable CV
  - Work — real work-experience cards with detail panels
  - Lab — three live canvas experiments (swarm, oscillators, audio visualizer)
  - Certifications — 13 Udemy certificates with direct links
  - Contact — phone, email, WhatsApp, and a working contact form

  ## Develop

  ```bash
  pnpm install
  pnpm dev
  ```

  ## Build

  ```bash
  pnpm build
  ```

  Static files land in `dist/`. Deploys to GitHub Pages on push to `main`.

  ## License

  Licensed under the Apache License, Version 2.0. See [LICENSE](./LICENSE) for details.
  