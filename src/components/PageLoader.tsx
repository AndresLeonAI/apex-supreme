"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function PageLoader() {
  const { isLoaderActive, loaderTarget, finishLoader } = useCart();

  useEffect(() => {
    if (isLoaderActive && loaderTarget) {
      // Cinematic blackout sequence simulating routing
      const timer = setTimeout(() => {
        const el = document.getElementById(loaderTarget.replace('#', ''));
        if (el) {
          window.scrollTo({ top: el.offsetTop, behavior: 'instant' });
        }
        finishLoader();
      }, 1000); // Wait 1 second before revealing target
      return () => clearTimeout(timer);
    }
  }, [isLoaderActive, loaderTarget, finishLoader]);

  return (
    <AnimatePresence>
      {isLoaderActive && (
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", transition: { delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle noise over loader */}
          <div className="absolute inset-0 noise-overlay opacity-10" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 text-center"
          >
            <div className="text-[10px] font-bold tracking-[1em] text-gold uppercase mb-6 ml-2">Accessing</div>
            <h1 className="font-sans font-black text-6xl md:text-9xl tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              APEX
            </h1>
            
            {/* Horizontal scanline loader */}
            <div className="mt-12 mx-auto w-64 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }} 
                animate={{ x: "100%" }} 
                transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 w-1/3 bg-gold shadow-[0_0_20px_rgba(212,175,55,1)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
