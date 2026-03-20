"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function FooterEditorial() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <footer id="footer" ref={containerRef} className="relative w-full bg-[#050505] pt-40 pb-12 border-t border-white/5 overflow-hidden">
      
      {/* Heavy Gold Dust Macro Parallax */}
      <motion.div style={{ scale: scaleImg, y: yImg }} className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none origin-bottom transform-gpu will-change-transform">
        <Image src="/assets/images/gold_dust.png" alt="Gold Dust Explosion" fill className="object-cover object-bottom" priority />
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#0a0a0a] to-transparent opacity-90" />
      </motion.div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,1)]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
        
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="w-full max-w-3xl text-center mb-40 transform-gpu will-change-transform"
        >
          <h3 className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6 text-white drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            Join the <em className="font-cormorant font-normal italic text-gold lowercase text-7xl md:text-9xl drop-shadow-[0_0_40px_rgba(212,175,55,0.6)]">inner circle</em>
          </h3>
          <p className="font-sans font-light text-concrete tracking-widest mb-12 drop-shadow-md text-lg">
            Early access to new flavors, athlete insights, and exclusive drops.
          </p>
          <form className="relative flex w-full max-w-lg mx-auto border-b border-white/30 focus-within:border-gold transition-colors duration-500 group" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="w-full bg-transparent text-sm tracking-[0.2em] text-white placeholder-white/40 outline-none pb-4 font-sans font-bold"
            />
            <button type="submit" className="absolute right-0 bottom-4 text-xs font-bold tracking-[0.3em] text-gold uppercase hover:text-white transition-colors duration-300 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">
              Submit
            </button>
          </form>
        </motion.div>

        {/* Links Grid with Staggered Animations */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 font-sans mb-32 border-t border-white/10 pt-16 bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 rounded-lg border-b border-l shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform-gpu will-change-transform"
        >
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="font-black text-3xl tracking-[0.2em] text-white uppercase mb-4 drop-shadow-lg">Apex Physique</div>
            <p className="text-xs text-concrete tracking-widest leading-relaxed drop-shadow-sm">
              Precision-grade nutrition for those who refuse to compromise. Engineered in New Zealand. Trusted worldwide.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="font-bold text-[0.65rem] tracking-[0.3em] text-gold uppercase mb-6 drop-shadow-md">Products</div>
            <ul className="flex flex-col gap-5 text-xs tracking-widest font-bold uppercase text-concrete drop-shadow-sm">
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Vanilla Bean</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Dark Chocolate</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Salted Caramel</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Sample Pack</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="font-bold text-[0.65rem] tracking-[0.3em] text-gold uppercase mb-6 drop-shadow-md">Company</div>
            <ul className="flex flex-col gap-5 text-xs tracking-widest font-bold uppercase text-concrete drop-shadow-sm">
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Our Story</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Science</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Athletes</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="font-bold text-[0.65rem] tracking-[0.3em] text-gold uppercase mb-6 drop-shadow-md">Legal</div>
            <ul className="flex flex-col gap-5 text-xs tracking-widest font-bold uppercase text-concrete drop-shadow-sm">
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Shipping Info</a></li>
              <li><a href="#" className="hover:text-gold transition-colors duration-300">Returns</a></li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="w-full flex flex-col md:flex-row justify-between items-center text-[0.6rem] tracking-[0.25em] text-white/50 font-bold uppercase drop-shadow-md"
        >
          <div>&copy; 2026 Apex Physique. All rights reserved.</div>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-gold transition-colors duration-300">Twitter</a>
            <a href="#" className="hover:text-gold transition-colors duration-300">YouTube</a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
