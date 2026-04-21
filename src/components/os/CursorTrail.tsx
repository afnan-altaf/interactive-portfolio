import React, { useEffect, useRef } from 'react';

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: {x: number, y: number, age: number}[] = [];
    const maxAge = 30; // frames
    
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age++;
        
        if (p.age > maxAge) {
          points.splice(i, 1);
          i--;
          continue;
        }

        const progress = p.age / maxAge;
        const opacity = 1 - progress;
        const radius = 5 * (1 - progress);
        
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      
      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Create gradient
        const start = points[0];
        const end = points[points.length - 1];
        const grad = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        grad.addColorStop(0, 'rgba(59, 130, 246, 0)');
        grad.addColorStop(1, 'rgba(168, 85, 247, 0.5)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      
      // Draw actual particles
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const progress = p.age / maxAge;
        const opacity = (1 - progress) * 0.5;
        const radius = 3 * (1 - progress);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]" 
    />
  );
}