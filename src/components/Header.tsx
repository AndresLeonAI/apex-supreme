"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show header after scrolling down a bit (past the initial hero view)
    // The hero takes 750vh, but we can show it once they are truly past the first 100vh
    if (latest > window.innerHeight) {
      if (!isVisible) setIsVisible(true);
    } else {
      if (isVisible) setIsVisible(false);
    }
  });

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transform-gpu will-change-transform"
    >
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <a href="#" className="font-sans font-black text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.25em] text-white uppercase flex items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 duration-300">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
            <path d="M12 2L2 22h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel"/>
            <path d="M12 10L6 20h12L12 10z" fill="currentColor"/>
          </svg>
          Apex
        </a>
        
        <nav className="hidden lg:flex items-center gap-12">
          <a href="#manifesto" className="text-[0.65rem] font-bold tracking-[0.2em] text-concrete uppercase hover:text-gold transition-colors duration-300 drop-shadow-sm">Philosophy</a>
          <a href="#science" className="text-[0.65rem] font-bold tracking-[0.2em] text-concrete uppercase hover:text-gold transition-colors duration-300 drop-shadow-sm">Science</a>
          <a href="#process" className="text-[0.65rem] font-bold tracking-[0.2em] text-concrete uppercase hover:text-gold transition-colors duration-300 drop-shadow-sm">Journey</a>
          <a href="#collection" className="text-[0.65rem] font-bold tracking-[0.2em] text-concrete uppercase hover:text-gold transition-colors duration-300 drop-shadow-sm">Collection</a>
        </nav>

        <a href="#collection" className="px-5 py-2 md:px-7 md:py-3 bg-[#0a0a0a] border border-white/20 text-white font-sans font-bold text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gold hover:text-ink hover:border-gold shadow-[0_0_15px_rgba(212,175,55,0)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] flex-shrink-0">
          Pre-Order
        </a>
      </div>
    </motion.header>
  );
}
