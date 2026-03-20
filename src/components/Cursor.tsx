"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let reqId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      reqId = requestAnimationFrame(renderCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    renderCursor();

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .interactive")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={ringRef} 
        className={cn(
          "fixed top-0 left-0 rounded-full border border-white/40 z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-300",
          isHovering ? "w-16 h-16 border-gold shadow-[0_0_15px_rgba(212,175,55,0.35)]" : "w-11 h-11"
        )}
      />
    </>
  );
}
