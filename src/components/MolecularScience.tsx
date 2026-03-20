"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isText) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(target * easeProgress);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target, hasAnimated, isText]);

  if (isText) {
    return <div className="text-4xl font-serif font-bold text-white tracking-widest leading-none mb-2">{textVal}</div>;
  }

  return (
    <div ref={nodeRef} className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-none mb-2 flex items-baseline">
      {Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)}
      <span className="text-gold text-2xl font-sans ml-1">{suffix}</span>
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
      <motion.div style={{ scale }} className="absolute inset-0 z-0 origin-center opacity-10 mix-blend-lighten pointer-events-none">
        <Image src="/assets/images/molecular_mesh.png" alt="Molecular Mesh" fill className="object-cover" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </motion.div>
      
      <div className="mb-20 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-xs font-bold tracking-[0.35em] text-gold uppercase mb-4"
        >
          The Formula
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tight leading-[1.1] mb-6"
        >
          Engineered at the<br/><span className="text-gold">Molecular Level</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-concrete-dim font-light tracking-widest md:text-lg"
        >
          Every ingredient clinically dosed. Zero fillers. Zero compromise.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ingredients.map((ing, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-5%" }}
            className="group relative bg-[#121212]/50 backdrop-blur-xl border border-white/5 p-8 rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_10px_40px_rgba(212,175,55,0.05)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative z-10">
              <AnimatedCounter target={ing.val} suffix={ing.unit} isText={ing.isText} textVal={ing.textVal} />
              <div className="text-sm font-bold tracking-widest text-concrete uppercase mt-4 mb-2">{ing.name}</div>
              <div className="text-xs text-concrete-dim leading-relaxed">{ing.desc}</div>
            </div>
            {/* Elegant corner accent */}
            <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-gradient-to-l from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-gradient-to-t from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
