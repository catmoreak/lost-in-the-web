"use client";
import { useEffect, useRef } from "react";

interface CanvasConfettiProps {
  duration?: number; 
}

export default function CanvasConfetti({ duration = 5000 }: CanvasConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let running = true;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);



    const colors = [
      "#00ff41", "#ff073a", "#00d4ff", "#ff6600", "#7b68ee",
      "#ff1744", "#00e676", "#ffc107", "#e91e63", "#00bcd4",
      "#ff5722", "#8bc34a", "#9c27b0", "#03dac6", "#bb86fc",
      "#cf6679", "#03dac5", "#ff6b35", "#1de9b6", "#ffab00"
    ];
    
    const shapes = ["rect", "circle", "triangle", "ribbon", "star", "diamond"];
    
    
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -30 - Math.random() * 100,
      w: 6 + Math.random() * 16,
      h: 12 + Math.random() * 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.12,
      vx: (Math.random() - 0.5) * 4,
      vy: 1.5 + Math.random() * 3,
      gravity: 0.06 + Math.random() * 0.08,
      opacity: 0.7 + Math.random() * 0.3,
      oscillation: Math.random() * 0.02,
      time: 0
    }));

    function drawPiece(p: any) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      
    
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      
      switch (p.shape) {
        case "rect":
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(-p.w / 2, p.h / 2);
          ctx.lineTo(p.w / 2, p.h / 2);
          ctx.lineTo(0, -p.h / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case "ribbon":
          
          ctx.beginPath();
          ctx.moveTo(-p.w / 2, -p.h / 4);
          ctx.quadraticCurveTo(0, -p.h / 2, p.w / 2, -p.h / 4);
          ctx.lineTo(p.w / 2, p.h / 4);
          ctx.quadraticCurveTo(0, p.h / 2, -p.w / 2, p.h / 4);
          ctx.closePath();
          ctx.fill();
          
          ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
          ctx.fillRect(-p.w / 4, -p.h / 2, p.w / 8, p.h);
          break;
        case "star":
        
          ctx.beginPath();
          for (let i = 0; i < 10; i++) {
            const radius = i % 2 === 0 ? p.w / 2 : p.w / 4;
            const angle = (i * Math.PI) / 5;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          break;
        case "diamond":
          
          ctx.beginPath();
          ctx.moveTo(0, -p.h / 2);
          ctx.lineTo(p.w / 2, 0);
          ctx.lineTo(0, p.h / 2);
          ctx.lineTo(-p.w / 2, 0);
          ctx.closePath();
          ctx.fill();
          break;
      }
      ctx.restore();
    }

    function animate() {
      if (!running) return;
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (const p of pieces) {
        
        p.time += 0.02;
        p.x += p.vx + Math.sin(p.time) * p.oscillation;
        p.y += p.vy;
        p.vy += p.gravity;
        p.angle += p.spin;
        
       
        if (p.y > window.innerHeight * 0.8) {
          p.opacity -= 0.01;
        }
        
       
        if (p.y > window.innerHeight + 50 || p.opacity <= 0) {
          p.x = Math.random() * window.innerWidth;
          p.y = -30 - Math.random() * 100;
          p.vy = 1.5 + Math.random() * 3;
          p.opacity = 0.7 + Math.random() * 0.3;
          p.time = 0;
        }
        
        drawPiece(p);
      }
      requestAnimationFrame(animate);
    }
    animate();

    const timer = setTimeout(() => {
      running = false;
      if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }, duration);
    return () => {
      running = false;
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 60,
        width: "100vw",
        height: "100vh"
      }}
      aria-hidden="true"
    />
  );
}
