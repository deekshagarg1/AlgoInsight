import React from 'react';
import { Terminal, Cpu, Award, ArrowRight, Code, Server, Database, Layers, Sparkles, CheckCircle2, Flame } from 'lucide-react';

/**
 * HomePage Component (High Fidelity - Impressive Placement-Ready Design)
 * 
 * Redesigned with premium SaaS landing aesthetics:
 * - Glowing backdrop glass blobs.
 * - Dynamic split gradients for headers.
 * - Feature showcases with hover-translation, glow shadow outlines, and active state badges.
 * - A miniature "Interactive Simulator Catalog Card" highlighting Bubble Sort.
 * - Placement Metrics statistics deck.
 * 
 * @param {Object} props
 * @param {Function} props.onExplore - Callback to navigate to algorithms catalog
 */
export default function HomePage({ onExplore }) {
  return (
    <div className="w-full flex flex-col min-h-screen text-left relative overflow-hidden bg-slate-950">
      
      {/* 0. DECORATIVE BACKDROP GLOWING BLOBS (Premium Visual Polish) */}
      <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[100px] left-[-150px] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none z-0"></div>

      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center text-center py-20 max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-300 border border-cyan-500/20 mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/5 animate-pulse">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Campus Placement Edition</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>

        {/* Hero Title with multiple gradients */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight m-0 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Visualize. Debug. Master.
          <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            DSA in High Fidelity.
          </span>
        </h1>

        {/* Subtext description */}
        <p className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          An interactive snapshot state-machine playground designed for MCA students. Step inside execution steps, trace C++/Java/Python variables, and ace placement technical defense.
        </p>

        {/* CTA triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button
            onClick={onExplore}
            className="px-7 py-3.5 font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:via-teal-300 hover:to-emerald-300 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(52,211,153,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer border-none flex items-center gap-2 text-xs uppercase tracking-wider"
          >
            Launch Visualizer Workspace
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. CORE PERFORMANCE METRICS ROW */}
      <section className="py-8 max-w-5xl mx-auto w-full px-4 border-t border-slate-900 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#161720]/40 border border-slate-900 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Time Complexity</span>
            <span className="text-lg font-extrabold text-cyan-400 font-mono">O(N²)</span>
          </div>
          <div className="bg-[#161720]/40 border border-slate-900 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Pass Optimization</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">O(N) Best</span>
          </div>
          <div className="bg-[#161720]/40 border border-slate-900 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Z-Index Jump</span>
            <span className="text-lg font-extrabold text-amber-400 font-mono">2.5D Arch</span>
          </div>
          <div className="bg-[#161720]/40 border border-slate-900 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Target Platforms</span>
            <span className="text-lg font-extrabold text-[#ff79c6] font-mono">C++, Java, Py</span>
          </div>
        </div>
      </section>

      {/* 3. ALGORITHM PREVIEW CATALOG (VIBRANT & IMPRESSIVE CARD) */}
      <section className="py-12 max-w-5xl mx-auto w-full px-4 border-t border-slate-900 relative z-10">
        <div className="flex flex-col gap-3 mb-8 text-center md:text-left">
          <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Algorithms Catalog</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-200 tracking-tight m-0">Available Simulators</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Card 1: Bubble Sort Showcase (Vibrant glowing mockup) */}
          <div className="p-6 rounded-2xl bg-[#161720] border border-slate-800 hover:border-cyan-500/35 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)] relative group flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-cyan-400/10 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/20">
              Sorting
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Bubble Sort Visualizer</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Sort elements by comparing adjacent items and swapping them if they are in the wrong order. Features Z-axis arched slide jumps, dynamic line highlighting, and early-swap breaks.
              </p>

              {/* Miniature visualizer mock illustration (Super impressive details!) */}
              <div className="mt-4 bg-[#111219] rounded-xl border border-slate-900 p-3.5 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>pass = 1</span>
                  <span className="text-yellow-400 font-bold">swapped = true</span>
                </div>
                <div className="h-14 flex items-end justify-center gap-1.5 border-b border-slate-900 pb-1">
                  <div className="w-4 h-[35%] rounded bg-slate-900 border border-slate-800"></div>
                  <div className="w-4 h-[15%] rounded bg-slate-900 border border-slate-800"></div>
                  <div className="w-4 h-[55%] rounded border-yellow-400 bg-yellow-950/20 border-[1.5px] shadow-[0_0_8px_rgba(250,204,21,0.25)] relative"></div>
                  <div className="w-4 h-[40%] rounded border-yellow-400 bg-yellow-950/20 border-[1.5px] shadow-[0_0_8px_rgba(250,204,21,0.25)] relative"></div>
                  <div className="w-4 h-[80%] rounded-md bg-gradient-to-t from-[#047857] via-[#10b981] to-[#a7f3d0] border border-[#55f0b5]"></div>
                </div>
                <div className="flex justify-center gap-1.5 text-[8px] font-bold font-mono text-slate-500">
                  <span>0</span>
                  <span>1</span>
                  <span className="text-cyan-400 font-bold">j</span>
                  <span className="text-yellow-400 font-bold">j+1</span>
                  <span>4</span>
                </div>
              </div>
            </div>

            <button
              onClick={onExplore}
              className="mt-6 w-full py-2.5 font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer border-none text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              Test Bubble Sort Live
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Upcoming algorithms catalog list placeholder */}
          <div className="p-6 rounded-2xl bg-[#161720]/45 border border-slate-900 hover:border-slate-800/80 transition-all duration-300 flex flex-col justify-between h-[380px] opacity-70">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-350">Upcoming Simulators</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                We are actively integrating selection sort, insertion sort, quick sort, and binary search engines. These will be added to this catalogue page with full code trace layers.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700" /> Selection Sort (Engine Drafted)
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700" /> Insertion Sort (Under Review)
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700" /> Binary Search Visualizer
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-500 font-semibold font-mono border border-dashed border-slate-800/60 py-2 rounded-xl mt-6">
              IN INTEGRATION PIPELINE
            </div>
          </div>

        </div>
      </section>

      {/* 4. ACADEMIC PROJECT OVERVIEW & DETAILS BANNER */}
      <section className="py-12 max-w-5xl mx-auto w-full px-4 border-t border-slate-900 relative z-10">
        <div className="bg-gradient-to-br from-[#161720] to-[#111219] border border-slate-800/60 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex flex-col gap-2.5 max-w-xl">
            <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> MCA Project Board Spec
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Designed for Placement Viva & Technical Examinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              AlgoInsight bridges standard textbook explanations with live run-time coordinate execution. Built with React.js states and stable Framer Motion layouts, it models placeable clean code patterns.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
            <div className="bg-[#13141b]/60 border border-slate-800 px-5 py-4 rounded-2xl text-center min-w-[125px]">
              <span className="text-2xl font-black text-cyan-455 block font-mono">100%</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">State Sync</span>
            </div>
            <div className="bg-[#13141b]/60 border border-slate-800 px-5 py-4 rounded-2xl text-center min-w-[125px]">
              <span className="text-2xl font-black text-emerald-450 block font-mono">0(1)</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Step Seek</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPREHENSIVE PREMIUM FOOTER */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/60 py-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
          
          {/* Logo & credits (col-span 5) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-lg shadow-md">
                <Code className="w-5 h-5 text-slate-900 stroke-[2.5]" />
              </div>
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                AlgoInsight
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-medium">
              AlgoInsight is an interactive DSA course-content and visualization platform developed to make learning algorithm mechanics intuitive and placement viva defense seamless.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-450 hover:text-white transition-all border border-slate-800/80"
              >
                <Code className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Academic Info links (col-span 3) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              MCA Project Specs
            </h4>
            <ul className="text-xs text-slate-500 flex flex-col gap-2 p-0 m-0 list-none font-medium">
              <li>Semester: 3rd Sem Project</li>
              <li>Scope: Sorting & Searching</li>
              <li>Engine: Snapshot State Machine</li>
              <li>Verification: Tested in Playback</li>
            </ul>
          </div>

          {/* Technology stack badges (col-span 4) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              Tech Architecture
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-cyan-455 bg-[#161720] border border-slate-800 rounded-lg">
                <Layers className="w-3 h-3 text-cyan-450" /> React.js
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-slate-350 bg-[#161720] border border-slate-800 rounded-lg">
                Vite
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-indigo-400 bg-[#161720] border border-slate-800 rounded-lg">
                Tailwind CSS
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-emerald-450 bg-[#161720] border border-slate-800 rounded-lg">
                Framer Motion
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-slate-450 bg-[#161720] border border-slate-800 rounded-lg">
                <Server className="w-3 h-3" /> Node / Express
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-amber-500 bg-[#161720] border border-slate-800 rounded-lg">
                <Database className="w-3 h-3 text-amber-500" /> MongoDB
              </span>
            </div>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="max-w-6xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-mono">
          <span>
            © {new Date().getFullYear()} AlgoInsight. All rights reserved.
          </span>
          <span className="flex items-center gap-1 font-sans text-xs">
            Made with <span className="text-rose-500 animate-pulse">❤️</span> by <span className="text-slate-350 font-semibold">Pulkit Mishra</span> and <span className="text-slate-350 font-semibold">Deeksha Garg</span>
          </span>
          <span>
            Designed & Developed for MCA Project Examination.
          </span>
        </div>
      </footer>

    </div>
  );
}
