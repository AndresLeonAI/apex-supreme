"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ManifestoVault() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="manifesto" ref={ref} className="relative w-full min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
      {/* Background Glow & Parallax Image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 w-[120%] h-[120%] -top-[10%] -left-[10%] opacity-20 mix-blend-screen pointer-events-none">
        <Image src="/assets/images/luxury_liquid_gold.png" alt="Liquid Gold Texture" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.02)_0%,transparent_80%)] pointer-events-none" />

      {/* Massive Background Text */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-10%" }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden"
      >
        <span className="font-sans font-black text-[25vw] leading-none tracking-tighter text-white whitespace-nowrap opacity-10">BEYOND</span>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
          className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-8"
        >
          Our Philosophy
        </motion.span>

        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-10%" }}
          className="w-16 h-[1px] bg-gold/50 mb-12 origin-left"
        />

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-10%" }}
          className="font-sans font-black text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight mb-8"
        >
          We don&apos;t make <em className="font-cormorant font-light italic text-concrete">supplements.</em><br/>
          We engineer <em className="font-cormorant font-light italic bg-clip-text text-transparent bg-gradient-to-r from-gold-light via-gold to-gold-deep pr-2">unfair advantages.</em>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
          className="font-sans font-light text-lg md:text-xl md:leading-relaxed tracking-wide text-concrete-dim max-w-3xl"
        >
          Every scoop is a declaration — that you refuse the ordinary,
          that your body deserves precision-grade nutrition, and that
          compromise is a word for someone else&apos;s vocabulary.
        </motion.p>
      </div>
    </section>
  );
}
