"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, items, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Success Screen
      setTimeout(() => {
        clearCart();
        setIsCheckoutOpen(false);
        setTimeout(() => setStep(1), 500); // Reset in background
      }, 4000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.95, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-2xl bg-[#080808] border border-white/10 p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] my-auto"
          >
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-[1px] bg-gold" />
                  <h2 className="text-xl font-black uppercase tracking-widest text-white">Shipping Protocol</h2>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">First Name</label>
                      <input required type="text" className="w-full bg-black border border-white/10 p-3 text-white focus:border-gold focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Last Name</label>
                      <input required type="text" className="w-full bg-black border border-white/10 p-3 text-white focus:border-gold focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Secure Line Address</label>
                    <input required type="text" className="w-full bg-black border border-white/10 p-3 text-white focus:border-gold focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all" />
                  </div>
                  <button type="submit" className="w-full py-4 mt-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-[1px] bg-gold" />
                  <h2 className="text-xl font-black uppercase tracking-widest text-white">Payment Interface</h2>
                </div>

                <div className="mb-8 p-6 bg-gradient-to-br from-black to-[#0a0a0a] border border-white/10 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[30px] group-hover:bg-gold/10 transition-colors" />
                  <div className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-6 flex justify-between">
                    <span>Apex Supreme Access</span>
                    <svg className="w-6 h-4 text-gold/50" viewBox="0 0 24 16" fill="currentColor"><path d="M22 0H2a2 2 0 00-2 2v12a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2zM4 11h4v2H4v-2zm-2-6h20v2H2V5z"/></svg>
                  </div>
                  <div className="text-xl tracking-[0.3em] font-mono text-white mb-4">**** **** **** 4092</div>
                  <div className="flex justify-between text-xs tracking-widest text-white/80">
                    <span className="uppercase">Subject Name</span>
                    <span>12/28</span>
                  </div>
                </div>

                <form onSubmit={handleSimulatePayment} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Card Number</label>
                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono focus:border-gold focus:outline-none transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Expiry</label>
                      <input required type="text" placeholder="MM/YY" className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono focus:border-gold focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">CVV</label>
                      <input required type="password" placeholder="***" maxLength={3} className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono focus:border-gold focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <button type="submit" disabled={isProcessing} className="relative w-full overflow-hidden py-4 mt-4 bg-gold text-black font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-shadow disabled:opacity-80">
                    <span className={`relative z-10 transition-opacity ${isProcessing ? 'opacity-0' : 'opacity-100'}`}>Authorize ${total.toFixed(2)}</span>
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                      </div>
                    )}
                  </button>
                  <div className="text-center mt-4">
                    <button type="button" onClick={() => setStep(1)} className="text-[10px] text-white/40 uppercase tracking-widest hover:text-white transition-colors">Return to Shipping</button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 mx-auto rounded-full border border-gold flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(212,175,55,0.3)] bg-gold/5"
                >
                  <motion.svg 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </motion.svg>
                </motion.div>
                <div className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-4">Transaction Authorized</div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">Batch Secured</h2>
                <p className="text-concrete-dim font-light tracking-wide text-sm max-w-sm mx-auto">
                  Your molecular protocol has been confirmed. Generating shipping coordinates...
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
