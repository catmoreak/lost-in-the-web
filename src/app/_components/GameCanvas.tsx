"use client";

import { useEffect, useRef } from "react";

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const shapes: { type: string; x: number; y: number; size: number; speedX: number; speedY: number; color: string; opacity: number }[] = [];
    const colors = ["#ff6347", "#ffd700", "#98fb98", "#add8e6", "#f08080"];
    const shapeTypes = ["circle", "square", "triangle", "star"];

    const createShapes = () => {
      for (let i = 0; i < 100; i++) {
        shapes.push({
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)]!,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 20 + 10,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: colors[Math.floor(Math.random() * colors.length)] ?? "#0f0",
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const drawShape = (shape: any) => {
      ctx.globalAlpha = shape.opacity;
      ctx.fillStyle = shape.color;
      ctx.beginPath();

      switch (shape.type) {
        case "circle":
          ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
          break;
        case "square":
          ctx.rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
          break;
        case "triangle":
          ctx.moveTo(shape.x, shape.y - shape.size / 2);
          ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
          ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
          ctx.closePath();
          break;
        case "star":
          drawStar(shape.x, shape.y, 5, shape.size, shape.size / 2);
          break;
      }

      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    const animateShapes = () => {
      ctx.clearRect(0, 0, width, height);

      for (const shape of shapes) {
        const dx = shape.x - mouse.current.x;
        const dy = shape.y - mouse.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          shape.x += dx / 20;
          shape.y += dy / 20;
        }

        shape.x += shape.speedX * (shape.size / 20);
        shape.y += shape.speedY * (shape.size / 20);

        if (shape.x < 0 || shape.x > width) {
          shape.speedX *= -1;
        }

        if (shape.y < 0 || shape.y > height) {
          shape.speedY *= -1;
        }

        drawShape(shape);
      }

      requestAnimationFrame(animateShapes);
    };

    createShapes();
    animateShapes();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      shapes.length = 0;
      createShapes();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="game-canvas" />;
};

export default GameCanvas;

