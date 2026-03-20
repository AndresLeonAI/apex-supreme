"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const steps = [
  { 
    num: "I", 
    title: "Origin Selection", 
    desc: "Grass-fed herds from New Zealand's pristine South Island. No hormones, no antibiotics — ever. We audit every farm personally, because your body deserves traceability." 
  },
  { 
    num: "II", 
    title: "Cold Micro-Filtration", 
    desc: "Our proprietary cross-flow filtration operates at 4°C, preserving the native protein structure while eliminating 98% of lactose and fat. No heat. No denaturation." 
  },
  { 
    num: "III", 
    title: "Precision Blending", 
    desc: "Each batch is third-party tested for purity and potency before being sealed in our matte-finish, airtight vessel. The result: pharmaceutical-grade protein that tastes extraordinary." 
  }
];

export default function TimelineOverture() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section id="process" ref={containerRef} className="relative w-full py-40 overflow-hidden bg-[#050505]">
      
      {/* Pristine Landscape Parallax */}
      <motion.div style={{ scale: scaleImg }} className="absolute inset-0 z-0 opacity-40 mix-blend-lighten pointer-events-none transform-gpu will-change-transform">
        <Image src="/assets/images/pristine_landscape.png" alt="Pristine Icelandic Landscape" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90" />
      </motion.div>

      {/* Floating Editorial Image */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]) }} 
        className="hidden lg:block absolute top-1/4 right-[5%] w-[40vw] h-[60vh] z-0 opacity-80 mix-blend-lighten pointer-events-none transform-gpu will-change-transform"
      >
        <Image src="/assets/images/editorial_scoop.png" alt="Raw Protein Scoop Macro" fill className="object-contain" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-xs font-bold tracking-[0.35em] text-white uppercase mb-6"
          >
            The Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.95] text-white"
          >
            From Source<br/>
            <span className="font-cormorant font-normal italic text-gold mt-2 block drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">to Scoop</span>
          </motion.h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Background dark line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[1px] bg-white/10" />
          
          {/* Animated golden thread */}
          <motion.div 
            className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-light via-gold to-gold-deep origin-top drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]"
            style={{ scaleY: pathLength }}
          />

          <div className="flex flex-col gap-24 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
                className="flex items-start gap-12 md:gap-20"
              >
                <div className="relative flex-shrink-0 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm border border-white/20 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)] transform-gpu will-change-transform">
                  <span className="font-serif text-xl md:text-3xl text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">{step.num}</span>
                  <div className="absolute inset-0 rounded-full bg-gold/10" />
                </div>
                <div className="pt-2">
                  <h3 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-white mb-4 uppercase drop-shadow-md">{step.title}</h3>
                  <p className="font-sans font-light text-concrete text-sm md:text-base leading-relaxed tracking-wide drop-shadow-sm">
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
