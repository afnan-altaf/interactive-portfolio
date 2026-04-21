import React, { useEffect, useRef } from "react";
import { useOS } from "./OSProvider";

export function DesktopBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useOS();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      time += 0.005;
      const w = canvas.width;
      const h = canvas.height;
      
      const isDark = theme === "dark";
      
      const bg = isDark ? "#080c14" : "#f0f2f5";
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      
      // Simple generative gradient mesh
      const cx1 = w * 0.5 + Math.sin(time) * w * 0.3;
      const cy1 = h * 0.5 + Math.cos(time * 0.8) * h * 0.3;
      
      const cx2 = w * 0.5 + Math.cos(time * 1.2) * w * 0.3;
      const cy2 = h * 0.5 + Math.sin(time * 0.9) * h * 0.3;

      const grad1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, w * 0.6);
      if (isDark) {
        grad1.addColorStop(0, "rgba(59, 130, 246, 0.15)"); // Blue
        grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        grad1.addColorStop(0, "rgba(59, 130, 246, 0.1)");
        grad1.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      const grad2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, w * 0.5);
      if (isDark) {
        grad2.addColorStop(0, "rgba(168, 85, 247, 0.15)"); // Purple
        grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        grad2.addColorStop(0, "rgba(168, 85, 247, 0.1)");
        grad2.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);
      
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}