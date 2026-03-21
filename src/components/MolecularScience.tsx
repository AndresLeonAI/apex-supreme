"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const ingredients = [
  { val: 30, unit: "g", name: "Whey Isolate", desc: "Cross-flow micro-filtered for maximum bioavailability" },
  { val: 7, unit: "g", name: "BCAAs", desc: "2:1:1 ratio for optimal muscle protein synthesis" },
  { val: 3.5, unit: "g", name: "Leucine", desc: "The master trigger for mTOR pathway activation" },
  { val: 0, unit: "g", name: "Elite Enzymes", desc: "ProHydrolase® blend for zero bloat absorption", isText: true, textVal: "Elite+" },
];

function AnimatedCounter({ target, suffix = "", isText = false, textVal = "" }: { target: number, suffix?: string, isText?: boolean, textVal?: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (isText || !isInView) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setCount(value);
      }
    });
    return () => controls.stop();
  }, [target, isText, isInView]);

  if (isText) {
    return <div ref={nodeRef} className="text-4xl md:text-5xl font-cormorant font-light italic text-white tracking-widest leading-none mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{textVal}</div>;
  }

  return (
    <div ref={nodeRef} className="text-5xl md:text-6xl font-sans font-black text-white tracking-tighter leading-none mb-3 flex items-baseline drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
      {Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)}
      <span className="text-gold text-2xl md:text-3xl font-serif italic ml-1 tracking-normal opacity-90">{suffix}</span>
    </div>
  );
}

export default function MolecularScience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section id="science" ref={ref} className="relative w-full py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background Molecular Mesh Image */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0 origin-center opacity-[0.15] mix-blend-screen pointer-events-none transform-gpu will-change-transform">
        <Image src="/assets/images/molecular_mesh.png" alt="Molecular Mesh" fill className="object-cover" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
      </motion.div>
      
      <div className="mb-24 relative z-10 text-center md:text-left">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          className="flex items-center justify-center md:justify-start gap-4 text-[10px] font-bold tracking-[0.4em] text-white/50 uppercase mb-6"
        >
          <span className="w-12 h-[1px] bg-gold/50" />
          The Formula
          <span className="w-12 h-[1px] bg-gold/50 md:hidden" />
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-10%" }}
          className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mb-8"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Engineered at the</span><br/>
          <span className="font-cormorant font-light italic text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] tracking-tight">Molecular Level</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
          className="text-concrete font-light tracking-widest md:text-lg max-w-xl mx-auto md:mx-0 border-l border-white/10 pl-6"
        >
          Every ingredient clinically dosed. Zero fillers. Zero compromise. Designed for maximum biological impact.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 relative z-10 w-full lg:max-w-none max-w-2xl mx-auto">
        {ingredients.map((ing, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-10%" }}
            className="group relative flex flex-col justify-between bg-[#080808]/80 backdrop-blur-xl border border-white/5 p-8 h-full min-h-[280px] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:bg-[#0c0c0c] hover:border-white/20 shadow-2xl"
          >
            {/* HUD Technical Grid Accents */}
            <div className="absolute top-4 left-4 w-[1px] h-4 bg-white/20 group-hover:bg-gold/50 transition-colors duration-500" />
            <div className="absolute top-4 left-4 w-4 h-[1px] bg-white/20 group-hover:bg-gold/50 transition-colors duration-500" />
            
            <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-white/20 group-hover:bg-gold/50 transition-colors duration-500" />
            <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-white/20 group-hover:bg-gold/50 transition-colors duration-500" />

            {/* Glowing Hover Orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none transform-gpu will-change-transform" />
            
            <div className="relative z-10 w-full mb-8">
              <AnimatedCounter target={ing.val} suffix={ing.unit} isText={ing.isText} textVal={ing.textVal} />
              <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mt-4 mb-1" />
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-sm font-bold tracking-[0.25em] text-white uppercase mb-3 group-hover:text-gold transition-colors duration-500">{ing.name}</h3>
              <p className="text-xs font-light text-concrete-dim leading-relaxed md:pr-4">{ing.desc}</p>
            </div>
            
            {/* Elegant moving border effect on hover */}
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
