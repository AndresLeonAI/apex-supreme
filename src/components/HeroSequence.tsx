"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TOTAL_FRAMES = 120;
const CANV_W = 1920;
const CANV_H = 1080;
const LERP_FACTOR = 0.08;
const DWELL_CENTERS = [0.08, 0.35, 0.62, 0.90];
const DWELL_WIDTH = 0.05;
const DWELL_PEAK = 3.5;
const LUT_RESOLUTION = 2000;

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    canvas.width = CANV_W;
    canvas.height = CANV_H;

    let frames: HTMLImageElement[] = [];
    let framesLoaded = 0;
    let currentFrame = 0;
    let targetFrame = 0;
    let reqId: number;

    const IS_MOBILE = window.innerWidth < 768;
    const FRAME_DIR = IS_MOBILE ? "/frames/mobile" : "/frames/desktop";

    let progressLUT: { x: number; integral: number }[] = [];
    let maxIntegral = 0;

    function buildDwellEngine() {
      let integral = 0;
      for (let i = 0; i <= LUT_RESOLUTION; i++) {
        let x = i / LUT_RESOLUTION;
        let density = 1;
        for (let c of DWELL_CENTERS) {
          density += DWELL_PEAK * Math.exp(-Math.pow(x - c, 2) / (2 * Math.pow(DWELL_WIDTH, 2)));
        }
        integral += density;
        progressLUT.push({ x: x, integral: integral });
      }
      maxIntegral = integral;
    }
    buildDwellEngine();

    function remapProgress(raw: number) {
      if (raw <= 0) return 0;
      if (raw >= 1) return 1;
      let targetIntegral = raw * maxIntegral;
      let low = 0, high = LUT_RESOLUTION;
      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (progressLUT[mid].integral < targetIntegral) low = mid + 1;
        else if (progressLUT[mid].integral > targetIntegral) high = mid - 1;
        else return progressLUT[mid].x;
      }
      return progressLUT[low] ? progressLUT[low].x : 1;
    }

    function pad(num: number, size: number) {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    }

    function drawFrame(f: number) {
      if (!ctx || !canvas) return;
      if (!frames[f]) {
        let closest = null, minDist = Infinity;
        for (let i = 0; i < frames.length; i++) {
          if (frames[i]) {
            let d = Math.abs(i - f);
            if (d < minDist) { minDist = d; closest = frames[i]; }
          }
        }
        if (closest) ctx.drawImage(closest, 0, 0, CANV_W, CANV_H);
      } else {
        ctx.drawImage(frames[f], 0, 0, CANV_W, CANV_H);
      }
    }

    function loadFrames() {
      const indices: number[] = [];
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (i === 1 || i % 10 === 0) indices.unshift(i);
        else indices.push(i);
      }

      const loadNext = (idxList: number[]) => {
        if (idxList.length === 0) return;
        let i = idxList.shift() as number;
        let img = new Image();
        img.src = `${FRAME_DIR}/frame-${pad(i, 4)}.webp`;
        img.onload = () => {
          frames[i - 1] = img;
          framesLoaded++;

          let pct = Math.floor((framesLoaded / TOTAL_FRAMES) * 100);
          if (progressFillRef.current) progressFillRef.current.style.width = pct + '%';
          if (progressTextRef.current) progressTextRef.current.innerText = `LOADING ${pct}%`;

          if (framesLoaded === 1) {
            drawFrame(0);
            setTimeout(() => {
              if (loaderRef.current) loaderRef.current.classList.add("hidden");
              setIsLoading(false);
              reqId = requestAnimationFrame(tick);
            }, 300);
          }
          loadNext(idxList);
        };
        img.onerror = () => loadNext(idxList);
      };

      for (let j = 0; j < 4; j++) loadNext(indices);
    }

    const seq = containerRef.current;
    
    function tick() {
      if (!seq) return;
      const rect = seq.getBoundingClientRect();
      let rawProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      if (isNaN(rawProgress)) rawProgress = 0;

      const remappedProgress = remapProgress(rawProgress);
      targetFrame = remappedProgress * (TOTAL_FRAMES - 1);
      currentFrame += (targetFrame - currentFrame) * LERP_FACTOR;
      drawFrame(Math.round(currentFrame));

      sectionRefs.current.forEach((sec, idx) => {
        if (!sec) return;
        const start = parseFloat(sec.getAttribute("data-show") || "0");
        const end = parseFloat(sec.getAttribute("data-hide") || "0");
        if (rawProgress >= start && rawProgress <= end) {
          if (!sec.classList.contains("opacity-100")) {
            sec.classList.remove("opacity-0", "blur-md", "translate-y-8", "pointer-events-none");
            sec.classList.add("opacity-100", "blur-0", "translate-y-0", "pointer-events-auto");
            if (markerRefs.current[idx]) markerRefs.current[idx]?.classList.add("scale-150", "bg-gold", "shadow-[0_0_15px_rgba(212,175,55,0.4)]");
            
            // Counters
            sec.querySelectorAll(".stat-counter").forEach(el => {
              const htmlEl = el as HTMLElement;
              if (!htmlEl.dataset.animated) {
                let tgt = parseInt(htmlEl.getAttribute("data-target") || "0");
                let cur = 0;
                let iv = setInterval(() => {
                  cur += Math.ceil(tgt / 20);
                  if (cur >= tgt) { cur = tgt; clearInterval(iv); htmlEl.dataset.animated = "true"; }
                  htmlEl.innerHTML = `${cur}<span class="text-gold text-2xl ml-1">g</span>`;
                }, 40);
              }
            });
          }
        } else {
          sec.classList.remove("opacity-100", "blur-0", "translate-y-0", "pointer-events-auto");
          sec.classList.add("opacity-0", "blur-md", "translate-y-8", "pointer-events-none");
          if (markerRefs.current[idx]) markerRefs.current[idx]?.classList.remove("scale-150", "bg-gold", "shadow-[0_0_15px_rgba(212,175,55,0.4)]");
        }
      });

      // Parallax text
      sectionRefs.current.forEach(sec => {
        if (sec && sec.classList.contains("opacity-100")) {
          let parallax = (rawProgress * 150) % 20;
          sec.style.transform = `translateY(${-parallax}px)`;
        }
      });

      reqId = requestAnimationFrame(tick);
    }

    loadFrames();

    return () => {
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <>
      <div 
        ref={loaderRef} 
        className="fixed inset-0 bg-ink z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ease-out text-concrete"
      >
        <div className="font-sans font-black text-3xl tracking-[0.25em] mb-8 text-warm-white">APEX PHYSIQUE</div>
        <div className="w-[140px] h-[1px] bg-white/10 relative overflow-hidden">
          <div ref={progressFillRef} className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-deep to-gold-light w-0 transition-all duration-200" />
        </div>
        <div ref={progressTextRef} className="mt-4 text-xs tracking-[0.2em] font-medium text-concrete-dim">LOADING 0%</div>
      </div>

      {/* Markers */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 mix-blend-difference hidden md:flex transform-gpu">
        {[0, 1, 2, 3].map(i => (
          <div 
            key={i} 
            ref={el => { markerRefs.current[i] = el; }} 
            className="w-1.5 h-1.5 rounded-full bg-white/20 transition-all duration-500 relative"
          >
            {i !== 0 && <div className="absolute -top-6 left-[2px] w-[1px] h-4 bg-white/10" />}
          </div>
        ))}
      </div>

      <div ref={containerRef} className="relative w-full h-[750vh]">
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
          {/* Subtle inner shadow for text legibility, avoiding hard banding */}
          <div className="absolute inset-0 z-[1] pointer-events-none shadow-[inset_0_-100px_200px_rgba(0,0,0,0.5)]" />
        </div>

        {/* --- SCROLL SECTIONS --- */}
        {/* Section 1 */}
        <div 
          ref={el => { sectionRefs.current[0] = el; }} 
          data-show="0.0" data-hide="0.18"
          className="fixed inset-0 flex flex-col justify-center px-[6vw] z-10 opacity-0 blur-md translate-y-8 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <div className="max-w-[42vw] overflow-hidden">
            <div className="text-[0.65rem] font-bold tracking-[0.35em] text-gold uppercase mb-6">APEX Formulation</div>
            <h1 className="font-sans font-black text-[clamp(2rem,4vw,3.8rem)] leading-[0.95] tracking-tight uppercase mb-4">
              Unleash Your<br/><span className="bg-clip-text text-transparent bg-gradient-to-br from-gold-light via-gold to-gold-deep">Potential</span>
            </h1>
            <p className="font-sans font-light text-[clamp(0.75rem,1vw,1rem)] tracking-widest text-concrete-dim">
              Ultra-Isolate Whey Protein engineered for elite performance.
            </p>
          </div>

          <div className="absolute bottom-[4vh] left-[6vw] right-[6vw] bg-[#141414]/35 backdrop-blur-xl border border-white/5 border-t-gold/30 rounded px-12 py-8 flex justify-between items-center transition-all duration-500 hover:bg-[#1e1e1e]/45 hover:border-gold/50">
            <div className="flex flex-col gap-2">
              <div className="font-serif text-4xl font-semibold text-white stat-counter" data-target="30">0<span className="text-gold text-2xl ml-1">g</span></div>
              <div className="text-[0.7rem] font-medium tracking-[0.2em] text-concrete-dim uppercase">Pure Protein</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-serif text-4xl font-semibold text-white stat-counter" data-target="0">0<span className="text-gold text-2xl ml-1">g</span></div>
              <div className="text-[0.7rem] font-medium tracking-[0.2em] text-concrete-dim uppercase">Added Sugar</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-serif text-4xl font-semibold text-white">Fast</div>
              <div className="text-[0.7rem] font-medium tracking-[0.2em] text-concrete-dim uppercase">Absorption Rate</div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div 
          ref={el => { sectionRefs.current[1] = el; }} 
          data-show="0.25" data-hide="0.45"
          className="fixed inset-0 flex flex-col justify-center items-end text-right px-[6vw] z-10 opacity-0 blur-md translate-y-8 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <div className="absolute inset-0 z-[-1] pointer-events-none bg-gradient-to-l from-ink/90 via-ink/40 to-transparent" />
          <div className="text-[0.65rem] font-bold tracking-[0.35em] text-gold uppercase mb-6">The Taste of Luxury</div>
          <h2 className="font-sans font-black text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight uppercase mb-4">
            Natural<br/>Vanilla Bean
          </h2>
          <p className="font-sans font-light text-xl tracking-widest text-concrete-dim">
            Sourced directly from Madagascar.<br/>A delicate, sophisticated profile without chemical aftertastes.
          </p>
        </div>

        {/* Section 3 */}
        <div 
          ref={el => { sectionRefs.current[2] = el; }} 
          data-show="0.52" data-hide="0.72"
          className="fixed inset-0 flex flex-col justify-center px-[6vw] z-10 opacity-0 blur-md translate-y-8 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <div className="text-[0.65rem] font-bold tracking-[0.35em] text-gold uppercase mb-6">SOTD Engineering</div>
          <h2 className="font-sans font-black text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight uppercase mb-8">
            Matte Rubber<br/><span className="bg-clip-text text-transparent bg-gradient-to-br from-gold-light via-gold to-gold-deep">Finish</span>
          </h2>
          <div className="grid grid-cols-2 gap-8 max-w-[600px]">
             <div className="bg-[#141414]/40 backdrop-blur-md border border-white/5 p-8 rounded transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <h3 className="font-serif text-2xl mb-2 text-white">Airtight Seal</h3>
                <p className="text-xs tracking-wider text-concrete-dim leading-relaxed">Preserves absolute freshness and prevents degradation.</p>
             </div>
             <div className="bg-[#141414]/40 backdrop-blur-md border border-white/5 p-8 rounded transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <h3 className="font-serif text-2xl mb-2 text-white">Ergonomic Grip</h3>
                <p className="text-xs tracking-wider text-concrete-dim leading-relaxed">Engineered geometry for perfect handling post-workout.</p>
             </div>
          </div>
        </div>

        {/* Section 4 */}
        <div 
          ref={el => { sectionRefs.current[3] = el; }} 
          data-show="0.80" data-hide="1.0"
          className="absolute inset-0 flex flex-col justify-end items-center pb-[8vh] px-[6vw] text-center z-10 opacity-0 blur-md translate-y-8 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform"
        >
          <a href="#collection" className="inline-block px-16 py-5 bg-gold text-ink font-sans font-bold text-[0.65rem] md:text-sm tracking-[0.3em] uppercase transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5),0_0_120px_rgba(212,175,55,0.2)] hover:-translate-y-1 hover:scale-[1.03]">
            Elevate Your Standard
          </a>
        </div>
      </div>
    </>
  );
}
