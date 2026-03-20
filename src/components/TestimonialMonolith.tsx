"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote: "The purity is unmatched. I've tried dozens of isolates — APEX is the only one that doesn't leave me bloated. Recovery times dropped noticeably.",
    author: "Marcus Klein",
    role: "CrossFit Regionals Athlete",
    initials: "MK",
  },
  {
    quote: "Finally, a protein that tastes like it was made by a chef, not a chemist. The vanilla bean is legitimately delicious. Game changer.",
    author: "Sofia Rivera",
    role: "IFBB Pro Bikini",
    initials: "SR",
  },
  {
    quote: "I coach 40+ athletes. When I switched them all to APEX, the average recovery improvement was measurable within two weeks. The data speaks.",
    author: "James Thornton",
    role: "Performance Coach, Olympic Team",
    initials: "JT",
  }
];

function Stars() {
  return (
    <div className="flex gap-1 mb-8">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1l2.39 6.17H19l-5.3 4.08L15.81 18 10 14.27 4.19 18l2.11-6.75L1 7.17h6.61z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialMonolith() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax shifts for the background glowing quote mark
  const yQuote = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-40 overflow-hidden bg-[#080808] border-y border-white/[0.02]">
      {/* Obsidian Monolith Texture Parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 w-[110%] h-[120%] -top-[10%] -left-[5%] opacity-[0.12] mix-blend-luminosity pointer-events-none">
        <Image src="/assets/images/obsidian_monolith.png" alt="Obsidian Background Texture" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] opacity-80" />
      </motion.div>

      <motion.div 
        style={{ y: yQuote }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 font-serif font-black text-[50vw] leading-none text-white/[0.015] pointer-events-none select-none z-0"
      >
        &ldquo;
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-xs font-bold tracking-[0.35em] text-gold uppercase mb-6"
          >
            Athletes Speak
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter"
          >
            The <span className="font-cormorant font-normal italic text-gold">Verdict</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-10%" }}
              className="group flex flex-col justify-between bg-charcoal/40 backdrop-blur-md border border-white/5 p-10 md:p-12 hover:bg-charcoal/60 hover:border-gold/20 transition-all duration-500 rounded-none relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
              
              <div>
                <Stars />
                <p className="font-serif text-xl md:text-2xl text-concrete font-light leading-relaxed mb-12 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-ink font-sans font-bold text-xs tracking-wider text-concrete-dim">
                  {t.initials}
                </div>
                <div>
                  <div className="font-sans font-bold text-sm tracking-widest text-white uppercase">{t.author}</div>
                  <div className="text-xs text-gold/80 tracking-wider mt-1">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
