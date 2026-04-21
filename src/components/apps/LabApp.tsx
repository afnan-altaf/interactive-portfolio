import React, { useEffect, useRef, useState } from "react";
import { Window } from "../os/Window";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(1);
  const [count, setCount] = useState(500);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {x: number, y: number, vx: number, vy: number, r: number, color: string}[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resize();
    window.addEventListener('resize', resize);

    const initParticles = () => {
      particles = [];
      const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f43f5e"];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          r: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    
    initParticles();

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          p.vx -= (dx / dist) * 0.5 * speed;
          p.vy -= (dy / dist) * 0.5 * speed;
        }

        p.x += p.vx * speed;
        p.y += p.vy * speed;

        // Friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, count]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative bg-black rounded-lg overflow-hidden border border-border">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair touch-none" />
      </div>
      <div className="h-20 shrink-0 flex items-center gap-6 px-4">
        <div className="flex-1">
          <label className="text-xs font-mono mb-2 block">Speed Modifier</label>
          <Slider value={[speed]} min={0.1} max={5} step={0.1} onValueChange={(v) => setSpeed(v[0])} />
        </div>
        <div className="flex-1">
          <label className="text-xs font-mono mb-2 block">Particle Density</label>
          <Slider value={[count]} min={100} max={2000} step={100} onValueChange={(v) => setCount(v[0])} />
        </div>
      </div>
    </div>
  );
}

function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(0.01);
  const [amplitude, setAmplitude] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = "#080c14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cy = canvas.height / 2;
      
      ctx.beginPath();
      ctx.moveTo(0, cy);
      
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.sin(i * frequency + time) * amplitude * Math.sin(time * 0.5) + cy;
        ctx.lineTo(i, y);
      }
      
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, cy);
      
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.cos(i * (frequency * 1.5) - time) * (amplitude * 0.8) + cy;
        ctx.lineTo(i, y);
      }
      
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.stroke();

      time += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [frequency, amplitude]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative bg-[#080c14] rounded-lg overflow-hidden border border-border">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="h-20 shrink-0 flex items-center gap-6 px-4">
        <div className="flex-1">
          <label className="text-xs font-mono mb-2 block">Frequency</label>
          <Slider value={[frequency]} min={0.001} max={0.05} step={0.001} onValueChange={(v) => setFrequency(v[0])} />
        </div>
        <div className="flex-1">
          <label className="text-xs font-mono mb-2 block">Amplitude</label>
          <Slider value={[amplitude]} min={10} max={200} step={5} onValueChange={(v) => setAmplitude(v[0])} />
        </div>
      </div>
    </div>
  );
}

function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Generate a simple synthetic tone just to have some audio to visualize if no audio file
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = "#080c14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (playing && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] * 1.5;
          
          const r = barHeight + (25 * (i/bufferLength));
          const g = 250 * (i/bufferLength);
          const b = 50;

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

          x += barWidth + 1;
        }
      } else {
        // Draw idle state
        ctx.fillStyle = "#1e293b";
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 50, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "#94a3b8";
        ctx.font = "14px monospace";
        ctx.textAlign = "center";
        ctx.fillText("Click to Initialize Audio", canvas.width/2, canvas.height/2 + 5);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [playing]);

  const toggleAudio = () => {
    if (!playing) {
      if (!audioCtxRef.current) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        
        // Create an oscillator since we don't have a real audio file
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
        
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.1;
        
        // LFO for some variation
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 2; // 2Hz
        
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 100;
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        lfo.start();
        
        oscillator.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(audioCtx.destination);
        oscillator.start();

        audioCtxRef.current = audioCtx;
        analyserRef.current = analyser;
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setPlaying(true);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setPlaying(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative bg-[#080c14] rounded-lg overflow-hidden border border-border cursor-pointer" onClick={toggleAudio}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="h-20 shrink-0 flex items-center justify-center px-4">
         <p className="text-xs font-mono text-muted-foreground text-center">
           Generative synthetic tone visualization using Web Audio API.
         </p>
      </div>
    </div>
  );
}


export function LabApp() {
  return (
    <Window id="lab" title="Lab_Experiments" defaultWidth={700} defaultHeight={600} defaultX={250} defaultY={150}>
      <div className="p-4 h-full flex flex-col bg-card">
        <div className="mb-4">
          <h2 className="text-2xl font-bold font-mono tracking-tight text-primary">Laboratory</h2>
          <p className="text-sm text-muted-foreground">Interactive experiments rendered via Canvas API. Play around.</p>
        </div>
        
        <Tabs defaultValue="particles" className="flex-1 flex flex-col h-[calc(100%-80px)]">
          <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
            <TabsTrigger value="particles">Swarm</TabsTrigger>
            <TabsTrigger value="waves">Oscillator</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>
          <div className="flex-1 mt-4 h-full">
            <TabsContent value="particles" className="h-full m-0 p-0">
              <ParticleCanvas />
            </TabsContent>
            <TabsContent value="waves" className="h-full m-0 p-0">
              <WaveCanvas />
            </TabsContent>
            <TabsContent value="audio" className="h-full m-0 p-0">
              <AudioVisualizer />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Window>
  );
}