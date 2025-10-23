"use client";
import { ThermometerSnowflake } from "lucide-react";
import { markAssetError } from "next/dist/client/route-loader";
import { NEXT_INTERCEPTION_MARKER_PREFIX } from "next/dist/lib/constants";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
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
      "#ff4d4f", "#ff7a18", "#ffd166", "#7c3aed", "#06b6d4",
      "#ec4899", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444",
      "#06d6a0", "#f72585", "#4cc9f0", "#7209b7", "#fb8500"
    ];
    const shapes = ["rect", "circle", "triangle"];
    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 40,
      w: 8 + Math.random() * 12,
      h: 16 + Math.random() * 24,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.08,
      vx: (Math.random() - 0.5) * 2.5,
      vy: 2 + Math.random() * 2.5,
      gravity: 0.08 + Math.random() * 0.08,
      opacity: 0.8 + Math.random() * 0.2
    }));

    function drawPiece(p: any) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
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
      }
      ctx.restore();
    }

    function animate() {
      if (!running) return;
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.angle += p.spin;
        if (p.y > window.innerHeight + 40) {
          p.x = Math.random() * window.innerWidth;
          p.y = -20 - Math.random() * 40;
          p.vy = 2 + Math.random() * 2.5;
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
