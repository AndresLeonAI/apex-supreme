"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function ShoppingCart() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, setIsCheckoutOpen } = useCart();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[210] bg-[#050505] border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <h2 className="text-xl font-black uppercase tracking-widest text-white">Terminal Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white pb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center text-white/40 mt-20 font-light tracking-widest uppercase text-sm">Cart is empty</div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-[#0a0a0a] p-3 border border-white/5 hover:border-gold/30 transition-colors">
                    <div className="relative w-16 h-20 bg-black rounded-sm overflow-hidden flex-shrink-0">
                      <Image src={item.img} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm tracking-widest uppercase mb-1 text-white">{item.name}</h4>
                      <div className="text-gold font-serif italic text-sm mb-3">${item.price}</div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">-</button>
                        <span className="text-xs font-bold text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-white/30 hover:text-red-500 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold tracking-widest text-concrete uppercase">Subtotal</span>
                <span className="text-2xl font-serif italic text-gold">${total.toFixed(2)}</span>
              </div>
              <button 
                disabled={items.length === 0}
                onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
              >
                Proceed to Secure Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
