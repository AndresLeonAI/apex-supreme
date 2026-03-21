"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  { id: 1, name: "Madagascar Vanilla", weight: "2.5 LBS", price: "$65", img: "/assets/images/product_vanilla.png", tag: "Best Seller" },
  { id: 2, name: "Swiss Chocolate", weight: "2.5 LBS", price: "$65", img: "/assets/images/product_chocolate.png" },
  { id: 3, name: "Salted Caramel", weight: "2.5 LBS", price: "$65", img: "/assets/images/product_caramel.png" }
];

export default function PurchaseTerminal() {
  return (
    <section id="shop" className="relative w-full py-32 bg-[#020202] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gold/5 blur-[150px] mix-blend-screen pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-bold tracking-[0.35em] text-white/50 uppercase">Secure Your Batch</span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none text-white drop-shadow-xl"
          >
            The Collection
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {products.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-10%" }}
              className="group relative"
            >
              <div className="relative bg-[#050505] p-8 pb-10 border border-white/5 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-4 hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]">
                
                {/* HUD Corners */}
                <div className="absolute top-2 left-2 text-white/20 text-[10px] group-hover:text-gold/50 transition-colors duration-500">+</div>
                <div className="absolute top-2 right-2 text-white/20 text-[10px] group-hover:text-gold/50 transition-colors duration-500">+</div>
                <div className="absolute bottom-2 left-2 text-white/20 text-[10px] group-hover:text-gold/50 transition-colors duration-500">+</div>
                <div className="absolute bottom-2 right-2 text-white/20 text-[10px] group-hover:text-gold/50 transition-colors duration-500">+</div>
                
                {p.tag && (
                  <div className="absolute top-6 right-6 z-20">
                    <span className="bg-gold px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                      {p.tag}
                    </span>
                  </div>
                )}

                {/* Glowing backdrop behind product */}
                <div className="absolute inset-0 top-10 flex justify-center items-center pointer-events-none">
                  <div className="w-48 h-48 bg-gold/5 rounded-full blur-[40px] group-hover:bg-gold/20 transition-colors duration-700" />
                </div>

                <div className="relative aspect-[4/5] w-full mb-8 z-10 flex items-center justify-center">
                  <motion.div 
                    className="relative w-[70%] h-[70%] transform-gpu will-change-transform"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                  >
                    <Image src={p.img} alt={p.name} fill className="object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] z-10" sizes="(max-width: 768px) 100vw, 33vw" priority />
                    
                    {/* Mirror Floor Reflection */}
                    <div className="absolute top-full left-0 w-full h-[60%] z-0 pointer-events-none">
                      <Image 
                        src={p.img} 
                        alt={`Reflection of ${p.name}`} 
                        fill 
                        className="object-contain scale-y-[-1] opacity-30 filter blur-[1px]" 
                        style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)' }} 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                      />
                    </div>
                  </motion.div>
                </div>
                
                <div className="text-center relative z-20">
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white mb-2 group-hover:text-gold transition-colors duration-500">{p.name}</h3>
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="text-sm font-light tracking-widest text-concrete-dim uppercase">{p.weight}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20 block pointer-events-none" />
                    <span className="text-lg font-bold text-white font-serif italic">{p.price}</span>
                  </div>
                  <button className="relative w-full overflow-hidden bg-white text-black py-4 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 group-hover:bg-gold group-hover:text-black group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] before:absolute before:inset-0 before:bg-white/20 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out">
                    <span className="relative z-10">Add to Terminal</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
