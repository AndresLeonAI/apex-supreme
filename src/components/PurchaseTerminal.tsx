"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const products = [
  { tag: "Bestseller", name: "Apex Isolate", flavor: "Natural Vanilla Bean", weight: "907g / 30 Servings", price: 89, image: "/assets/images/tub_vanilla.png" },
  { tag: "New", name: "Apex Isolate", flavor: "Belgian Dark Chocolate", weight: "907g / 30 Servings", price: 89, image: "/assets/images/tub_chocolate.png" },
  { tag: "Limited", name: "Apex Isolate", flavor: "Salted Caramel Reserve", weight: "907g / 30 Servings", price: 94, image: "/assets/images/tub_caramel.png" },
];

export default function PurchaseTerminal() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateImg = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section id="collection" ref={containerRef} className="relative w-full py-40 overflow-hidden bg-[#020202]">
      
      {/* White Quartz High-Fashion Texture */}
      <motion.div style={{ scale: scaleImg, rotate: rotateImg }} className="absolute inset-0 z-0 opacity-[0.35] mix-blend-screen pointer-events-none origin-center transform-gpu will-change-transform">
        <Image src="/assets/images/white_quartz.png" alt="White Quartz Luxury Texture" fill className="object-cover" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent opacity-90" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-90" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-xs font-bold tracking-[0.35em] text-white uppercase mb-6 drop-shadow-md"
          >
            The Collection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter mb-6 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Find Your <span className="font-cormorant font-normal italic bg-clip-text text-transparent bg-gradient-to-r from-gold-light via-gold to-white">Flavor</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-concrete font-light tracking-widest md:text-xl max-w-2xl mx-auto drop-shadow-md"
          >
            Three meticulously crafted profiles. Each one extraordinary.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {products.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-10%" }}
              className="group flex flex-col items-center text-center bg-[#0a0a0a]/95 border border-white/10 p-12 transition-all duration-700 hover:-translate-y-4 hover:border-gold/50 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_60px_rgba(212,175,55,0.15)] transform-gpu will-change-transform"
            >
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-12 border border-gold/30 px-4 py-1.5 rounded-full group-hover:bg-gold/10 transition-colors duration-500">
                {p.tag}
              </div>

              {/* Product Image Focus */}
              <div className="relative w-48 h-64 mb-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]">
                <Image src={p.image} alt={p.name} fill className="object-contain" priority={i === 0} />
              </div>
              
              <h3 className="font-sans font-black text-3xl tracking-widest uppercase text-white mb-2 drop-shadow-lg">{p.name}</h3>
              <div className="font-serif text-xl italic text-concrete-dim mb-6 drop-shadow-sm">{p.flavor}</div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-12">{p.weight}</div>
              
              <div className="mt-auto w-full flex flex-col items-center">
                <div className="font-sans font-bold text-5xl text-white mb-8 tracking-tighter drop-shadow-md">
                  <span className="text-gold text-3xl mr-1 font-serif">$</span>{p.price}
                </div>
                <button className="w-full py-5 border border-white/30 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-gold group-hover:to-gold-light group-hover:text-ink group-hover:border-transparent shadow-[inset_0_0_0_0_rgba(212,175,55,0)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  Select
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
