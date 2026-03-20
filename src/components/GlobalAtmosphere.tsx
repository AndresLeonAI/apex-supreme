"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function GlobalAtmosphere() {
  const pCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mouse Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const pCanvas = pCanvasRef.current;
    if (!pCanvas) return;
    const pCtx = pCanvas.getContext("2d");
    if (!pCtx) return;

    let pWidth: number, pHeight: number;
    let particlesArray: any[] = [];
    let reqId: number;

    function initParticles() {
      if(!pCanvas) return;
      pWidth = window.innerWidth;
      pHeight = window.innerHeight;
      pCanvas.width = pWidth;
      pCanvas.height = pHeight;
      particlesArray = [];
      for (let i = 0; i < 60; i++) { // Increased particle count
        particlesArray.push({
          x: Math.random() * pWidth,
          y: Math.random() * pHeight,
          r: Math.random() * 2 + 0.5,
          vx: Math.random() * 0.4 - 0.2, // Faster movement
          vy: Math.random() * -0.8 - 0.2,
          op: Math.random() * 0.5 + 0.2 // Brighter
        });
      }
    }

    function drawParticles() {
      if(!pCtx) return;
      pCtx.clearRect(0, 0, pWidth, pHeight);
      pCtx.fillStyle = "#D4AF37"; // Gold particles instead of white
      particlesArray.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = pHeight + 10;
          p.x = Math.random() * pWidth;
        }
        if (p.x < -10) p.x = pWidth + 10;
        if (p.x > pWidth + 10) p.x = -10;
        pCtx.globalAlpha = p.op;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fill();
        // Add a tiny glow to each particle
        pCtx.shadowBlur = 5;
        pCtx.shadowColor = "#D4AF37";
      });
      reqId = requestAnimationFrame(drawParticles);
    }

    window.addEventListener("resize", initParticles);
    initParticles();
    drawParticles();

    return () => {
      window.removeEventListener("resize", initParticles);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <>
      {/* Deep Animated Aurora Mesh - Illuminated Obsidian */}
      <div className="fixed inset-0 w-screen h-screen z-[-1] overflow-hidden pointer-events-none bg-[#0a0a0a]">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -right-[20%] w-[150vw] h-[150vh] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,rgba(60,40,20,0.6)_40%,transparent_70%)] blur-[120px] transform-gpu will-change-transform"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[50%] -left-[20%] w-[150vw] h-[150vh] rounded-full bg-[radial-gradient(circle,rgba(80,80,90,0.7)_0%,rgba(40,40,40,0.6)_50%,transparent_80%)] blur-[150px] transform-gpu will-change-transform"
        />
      </div>

      {/* Dynamic Mouse Spotlight - Eliminated heavy CPU background gradient lag */}
      <motion.div
        className="fixed inset-0 z-[-1] pointer-events-none mix-blend-screen transform-gpu will-change-[background]"
        style={{
          background: useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.08), transparent 80%)`
        }}
      />

      {/* Film Grain */}
      <svg className="fixed inset-0 w-screen h-screen pointer-events-none z-[100] opacity-[0.06] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      
      {/* Vignette - Less Dark */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-[99] bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,5,0.6)_100%)]" />
      
      {/* Gold Particles */}
      <canvas ref={pCanvasRef} className="fixed inset-0 w-screen h-screen pointer-events-none z-[15]" />
    </>
  );
}
