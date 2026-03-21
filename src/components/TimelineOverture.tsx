"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const steps = [
  { 
    num: "I", 
    label: "01",
    title: "Origin Selection", 
    desc: "Grass-fed herds from New Zealand's pristine South Island. No hormones, no antibiotics — ever. We audit every farm personally, because your body deserves traceability." 
  },
  { 
    num: "II", 
    label: "02",
    title: "Cold Filtration", 
    desc: "Our proprietary cross-flow filtration operates at 4°C, preserving the native protein structure while eliminating 98% of lactose and fat. No heat. No denaturation." 
  },
  { 
    num: "III", 
    label: "03",
    title: "Precision Protocol", 
    desc: "Each batch is third-party tested for purity and potency before being sealed in our matte-finish, airtight vessel. The result: pharmaceutical-grade protein that tastes extraordinary." 
  }
];

export default function TimelineOverture() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section id="process" ref={containerRef} className="relative w-full py-40 overflow-hidden bg-[#020202]">
      
      {/* Pristine Landscape Parallax */}
      <motion.div style={{ scale: scaleImg }} className="absolute inset-0 z-0 opacity-40 mix-blend-lighten pointer-events-none transform-gpu will-change-transform">
        <Image src="/assets/images/pristine_landscape.png" alt="Pristine Icelandic Landscape" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90" />
      </motion.div>

      {/* Floating Editorial Image */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]) }} 
        className="hidden lg:block absolute top-[15%] right-[5%] w-[40vw] h-[70vh] z-0 opacity-80 mix-blend-lighten pointer-events-none transform-gpu will-change-transform"
      >
        <Image src="/assets/images/editorial_scoop.png" alt="Raw Protein Scoop Macro" fill className="object-contain" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center md:text-left mb-32 xl:ml-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center md:justify-start gap-4 mb-6"
          >
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-bold tracking-[0.35em] text-white/50 uppercase">The Journey</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter leading-[0.9] text-white"
          >
            From Source<br/>
            <span className="font-cormorant font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-white mt-2 block drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">to Scoop</span>
          </motion.h2>
        </div>

        <div className="relative max-w-3xl mx-auto md:ml-32">
          {/* Background dark line */}
          <div className="absolute left-[39px] md:left-[55px] top-0 bottom-0 w-[1px] bg-white/5" />
          
          {/* Animated golden thread with glowing tip */}
          <div className="absolute left-[39px] md:left-[55px] top-0 bottom-0 w-[2px]">
            <motion.div 
              className="absolute left-0 right-0 top-0 bg-gradient-to-b from-gold-light via-gold to-gold-deep origin-top drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
              style={{ scaleY: pathLength, bottom: 0 }}
            />
            {/* Scrubber head */}
            <motion.div 
               className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(212,175,55,0.6)]"
               style={{ top: useTransform(pathLength, (v) => `${v * 100}%`), translateY: "-50%" }}
            />
          </div>

          <div className="flex flex-col gap-32 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-15%" }}
                className="relative flex items-start gap-12 md:gap-20 group"
              >
                {/* Huge Background Number */}
                <div className="absolute -left-12 -top-16 text-[150px] leading-none font-cormorant font-black italic text-white/5 mix-blend-overlay pointer-events-none select-none transition-all duration-700 group-hover:text-gold/10 group-hover:-translate-y-4">
                  {step.label}
                </div>

                <div className="relative flex-shrink-0 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center bg-[#050505]/90 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                  <span className="font-serif text-2xl md:text-3xl text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] z-10 transition-transform duration-500 group-hover:scale-110">{step.num}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="pt-4 relative z-10">
                  <h3 className="font-sans font-black text-3xl md:text-4xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 uppercase drop-shadow-md group-hover:from-gold group-hover:to-white transition-all duration-700">{step.title}</h3>
                  <p className="font-sans font-light text-concrete text-sm md:text-lg leading-relaxed tracking-wide drop-shadow-sm border-l border-white/10 pl-6 group-hover:border-gold/30 transition-colors duration-500">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
