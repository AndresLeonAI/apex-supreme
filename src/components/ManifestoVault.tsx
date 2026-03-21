"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ManifestoVault() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  const textWords = "Every scoop is a declaration — that you refuse the ordinary, that your body deserves precision-grade nutrition, and that compromise is a word for someone else's vocabulary.".split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.5 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="manifesto" ref={ref} className="relative w-full min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden bg-[#020202]">
      {/* Background Glow & Parallax Image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 w-[120%] h-[120%] -top-[10%] -left-[10%] opacity-[0.15] mix-blend-screen pointer-events-none transform-gpu will-change-transform">
        <Image src="/assets/images/luxury_liquid_gold.png" alt="Liquid Gold Texture" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Massive Background Text watermark */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]) }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden mix-blend-overlay transform-gpu will-change-transform"
      >
        <span className="font-sans font-black text-[30vw] leading-none tracking-tighter text-white/5 whitespace-nowrap">APEX</span>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
          <span className="text-xs font-bold tracking-[0.4em] text-white/60 uppercase">Our Philosophy</span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-10%" }}
          className="font-sans font-black text-5xl md:text-6xl lg:text-8xl leading-[1.05] tracking-tighter mb-12"
        >
          We don&apos;t make<br/>
          <em className="font-cormorant font-light italic text-concrete-dim block -mt-2">supplements.</em>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-gold/50 hidden md:block" />
            <span className="text-4xl md:text-6xl text-gold">We engineer</span>
            <span className="w-8 h-[1px] bg-gold/50 hidden md:block" />
          </div>
          <em className="font-cormorant font-light italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gold to-white pr-2 block mt-2 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">unfair advantages.</em>
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20%" }}
          className="font-sans font-light text-lg md:text-2xl md:leading-relaxed tracking-wide text-concrete-dim max-w-3xl flex flex-wrap justify-center gap-x-2 gap-y-1"
        >
          {textWords.map((word, i) => (
            <motion.span key={i} variants={item} className="inline-block transform-gpu will-change-transform">
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
