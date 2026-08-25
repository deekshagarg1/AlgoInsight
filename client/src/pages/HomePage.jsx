import React from 'react';
import { Terminal, Cpu, Award, ArrowRight, Code, Server, Database, Layers, Sparkles, CheckCircle2, Flame, Shuffle, StepForward, BrainCircuit, ChevronRight, BookOpen } from 'lucide-react';

/**
 * HomePage Component (High Fidelity - Impressive & Interactive)
 * 
 * Includes:
 * - Placement Tip Ticker: A dynamic, cycling placement tip bar positioned right below the navbar
 *   to fill the top space beautifully and add educational value.
 * - Dynamic Welcome Hero
 * - Performance Metrics deck
 * - Interactive Miniature Visualizer Card
 * - Academic Specification Banner
 * - Full Premium Footer (perfectly aligned at max-w-5xl)
 * 
 * @param {Object} props
 * @param {Function} props.onExplore - Callback to navigate to algorithms catalog
 */
export default function HomePage({ onExplore }) {
  // Miniature visualizer local states for the interactive landing page demo card
  const [miniArray, setMiniArray] = React.useState([55, 25, 75, 40, 60]);
  const [miniJ, setMiniJ] = React.useState(0);
  const [miniPass, setMiniPass] = React.useState(1);
  const [miniSwapped, setMiniSwapped] = React.useState(false);
  const [activeCompare, setActiveCompare] = React.useState([0, 1]);

  // Placement Viva Tips Ticker state
  const [tipIndex, setTipIndex] = React.useState(0);
  
  const placementTips = [
    "Bubble Sort is stable because it preserves the relative order of duplicates during adjacent swaps.",
    "Bubble Sort runs in O(N) best-case time when the input is already sorted, thanks to the early-exit swapped check.",
    "Bubble Sort is an in-place sorting algorithm, requiring O(1) auxiliary space to execute.",
    "Selection Sort is unstable because it swaps non-adjacent elements, which can shuffle duplicates."
  ];

  // Cycle tips every 6 seconds
  React.useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex(prev => (prev + 1) % placementTips.length);
    }, 6000);
    return () => clearInterval(tipTimer);
  }, []);

  const handleMiniShuffle = (e) => {
    if (e) e.stopPropagation(); // Avoid triggering parent navigation
    const shuffled = [30, 15, 80, 45, 60].sort(() => Math.random() - 0.5);
    setMiniArray(shuffled);
    setMiniJ(0);
    setMiniPass(1);
    setMiniSwapped(false);
    setActiveCompare([0, 1]);
  };

  const handleMiniStep = (e) => {
    if (e) e.stopPropagation(); // Avoid triggering parent navigation
    const arr = [...miniArray];
    const n = arr.length;
    const limit = n - miniPass;

    if (miniPass >= n) {
      // Already sorted, restart shuffle
      handleMiniShuffle(e);
      return;
    }

    const currentJ = miniJ;
    const nextJ = currentJ + 1;
    let didSwap = false;

    if (arr[currentJ] > arr[nextJ]) {
      const temp = arr[currentJ];
      arr[currentJ] = arr[nextJ];
      arr[nextJ] = temp;
      didSwap = true;
      setMiniSwapped(true);
    }

    setMiniArray(arr);

    // Index increment logic
    if (currentJ >= limit - 1) {
      // Pass finished, reset pointer and advance pass count
      setMiniJ(0);
      setMiniPass(prev => prev + 1);
      setActiveCompare([0, 1]);
    } else {
      setMiniJ(nextJ);
      setActiveCompare([nextJ, nextJ + 1]);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen text-left relative overflow-hidden bg-slate-950">
      
      {/* 0. DECORATIVE BACKDROP GLOWING BLOBS */}
      <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[100px] left-[-150px] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none z-0"></div>

      {/* 1. PLACEMENT Ticker announcements (Beautifully fills space below navbar) */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-4 relative z-10">
        <div className="bg-[#161720]/45 border border-slate-900 rounded-xl p-3 flex items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 shrink-0 font-sans uppercase tracking-wider animate-pulse">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Viva Tip</span>
            </div>
            {/* Fading cycling placement tip */}
            <p key={tipIndex} className="text-xs text-slate-400 font-medium truncate m-0 font-sans animate-in fade-in slide-in-from-bottom-1 duration-300">
              {placementTips[tipIndex]}
            </p>
          </div>
          <button 
            onClick={onExplore}
            className="flex items-center gap-0.5 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 bg-transparent border-none cursor-pointer shrink-0 uppercase tracking-widest font-mono"
          >
            Start <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="flex flex-col items-center text-center py-16 max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-300 border border-cyan-500/20 mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/5 animate-pulse">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Interactive Computer Science Playground</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-450"></span>
        </div>

        {/* Hero Title with split gradients */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight m-0 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Inspect State Changes.
          <span className="block mt-1 bg-gradient-to-r from-[#58a6ff] via-blue-500 to-[#79c0ff] bg-clip-text text-transparent">
            Visualize Algorithms Live.
          </span>
        </h1>

        {/* Subtext description */}
        <p className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          AlgoInsight is a high-fidelity learning environment designed to bridge the gap between abstract textbook syntax and real-time execution states. Step through code lines, shuffle inputs, and trace pointer transitions instantly.
        </p>

        {/* CTA trigger */}
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

      {/* 3. CORE PERFORMANCE METRICS ROW */}
      <section className="py-8 max-w-5xl mx-auto w-full px-4 border-t border-slate-900 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#161720]/45 border border-slate-900 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Trace Compilers</span>
            <span className="text-sm font-extrabold text-cyan-400 font-mono">Java, C++, Python</span>
          </div>
          <div className="bg-[#161720]/45 border border-slate-900 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">State Seek Resolution</span>
            <span className="text-sm font-extrabold text-emerald-450 font-mono">O(1) Step Traversal</span>
          </div>
          <div className="bg-[#161720]/45 border border-slate-900 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Swapping Physics</span>
            <span className="text-sm font-extrabold text-amber-400 font-mono">2.5D Translation</span>
          </div>
          <div className="bg-[#161720]/45 border border-slate-900 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Playback range</span>
            <span className="text-sm font-extrabold text-[#ff79c6] font-mono">0.5x to 2.0x Delay</span>
          </div>
        </div>
      </section>

      {/* 4. ALGORITHM PREVIEW CATALOG */}
      <section className="py-12 max-w-5xl mx-auto w-full px-4 border-t border-slate-900 relative z-10">
        <div className="flex flex-col gap-3 mb-8 text-center md:text-left">
          <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Interactive Labs</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-200 tracking-tight m-0">Algorithms Workspace</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Bubble Sort Showcase (Interactive Simulator!) */}
          <div className="p-5 rounded-2xl bg-[#161720] border border-slate-800 hover:border-cyan-500/35 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)] relative group flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-cyan-400/10 text-cyan-400 text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-400/20">
              Interactive Live
            </div>

            <div>
              <div className="w-9 h-9 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-center text-cyan-455 mb-4">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Bubble Sort Visualizer</h3>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                Compare adjacent elements and swap them if unordered. Features Z-axis arched animations, pointer labels, and sorted boundary highlights.
              </p>

              {/* Genuinely Interactive miniature visualizer mock container */}
              <div className="mt-4 bg-[#111219] rounded-xl border border-slate-900 p-3 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500">
                  <span>Pass = {miniPass}</span>
                  <span className={miniSwapped ? "text-yellow-400 font-bold" : "text-slate-500"}>
                    Swapped = {miniSwapped ? "true" : "false"}
                  </span>
                </div>
                
                {/* Dynamic Height Bars representing mini sorting array */}
                <div className="h-12 flex items-end justify-center gap-1.5 border-b border-slate-900 pb-1">
                  {miniArray.map((value, idx) => {
                    const isComparing = activeCompare.includes(idx);
                    const isSorted = idx >= miniArray.length - miniPass + 1;

                    let barClass = "bg-slate-900 border border-slate-800";
                    if (isComparing) {
                      barClass = "border-yellow-400 bg-yellow-950/20 border-[1.5px] shadow-[0_0_8px_rgba(250,204,21,0.25)]";
                    } else if (isSorted) {
                      barClass = "bg-gradient-to-t from-[#047857] via-[#10b981] to-[#a7f3d0] border border-[#55f0b5]";
                    }

                    return (
                      <div
                        key={idx}
                        className={`w-4.5 rounded transition-all duration-300 ${barClass}`}
                        style={{ height: `${value}%` }}
                      ></div>
                    );
                  })}
                </div>

                {/* Dynamic index / pointer circles */}
                <div className="flex justify-center gap-1.5 text-[8px] font-bold font-mono text-slate-500 h-2.5">
                  {miniArray.map((_, idx) => {
                    const isJ = idx === miniJ;
                    const isJP1 = idx === miniJ + 1;

                    if (isJ) return <span key={idx} className="text-cyan-400 font-bold w-4.5 text-center">j</span>;
                    if (isJP1) return <span key={idx} className="text-yellow-400 font-bold w-4.5 text-center">j+1</span>;
                    return <span key={idx} className="w-4.5 text-center">{idx}</span>;
                  })}
                </div>

                {/* Interactive controller triggers directly inside the card deck! */}
                <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-900/60">
                  <span className="text-[8px] text-slate-550 font-mono tracking-wide">TRY PREVIEW SIMULATOR:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleMiniShuffle}
                      className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded text-[8px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                      title="Generate new unsorted mock array"
                    >
                      <Shuffle className="w-2.5 h-2.5" /> Shuffle
                    </button>
                    <button
                      onClick={handleMiniStep}
                      className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 rounded text-[8px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                      title="Trace next visual sorting snapshot"
                    >
                      <StepForward className="w-2.5 h-2.5" /> Step Sort
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <button
              onClick={() => onExplore('algorithms')}
              className="mt-5 w-full py-2.5 font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer border-none text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              Test Bubble Sort Live
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Merge Sort Showcase */}
          <div className="p-5 rounded-2xl bg-[#161720] border border-slate-800 hover:border-indigo-500/35 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.06)] relative group flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-indigo-400/10 text-indigo-400 text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/20">
              O(N log N) Stable
            </div>

            <div>
              <div className="w-9 h-9 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex items-center justify-center text-indigo-400 mb-4">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Merge Sort Visualizer</h3>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                Visualize divide-and-conquer recursion tree frames. Features temporary array buffer grids, sub-array bounds tracking, and color-coded pointer sorting phases.
              </p>

              <div className="mt-4 bg-[#111219] rounded-xl border border-slate-900 p-3.5 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500">
                  <span>Complexity: O(N log N)</span>
                  <span className="text-indigo-400 font-bold">Dividing Phase</span>
                </div>
                
                <div className="flex flex-col gap-1.5 py-2.5 border-y border-slate-900/60">
                  <div className="flex justify-center gap-1.5 text-[8.5px] font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-450">[24, 76]</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-900/25 border border-indigo-800/30 text-indigo-300 font-bold">[15, 43]</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-center text-slate-500">Temp buffer tracks recursively sorted subsets</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onExplore('algorithms')}
              className="mt-5 w-full py-2.5 font-bold text-slate-955 bg-indigo-500 hover:bg-indigo-400 rounded-xl transition-all cursor-pointer border-none text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              Test Merge Sort
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Counting Sort Showcase */}
          <div className="p-5 rounded-2xl bg-[#161720] border border-slate-800 hover:border-emerald-500/35 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)] relative group flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-emerald-400/10 text-emerald-450 text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/20">
              O(N + K) Linear
            </div>

            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-center text-emerald-455 mb-4">
                <Database className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Counting Sort Visualizer</h3>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                Witness non-comparison hashing keys in real time. Features a multi-row visual workspace (Original, Counts Accumulator, and Output lists) with interactive offset writes.
              </p>

              <div className="mt-4 bg-[#111219] rounded-xl border border-slate-900 p-3.5 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500">
                  <span>Space: O(N + K)</span>
                  <span className="text-emerald-450 font-bold">Stable Bucket writes</span>
                </div>
                
                <div className="flex items-center justify-center gap-1 border-y border-slate-900/60 py-2">
                  <div className="w-5 h-5 rounded bg-emerald-950/20 border border-emerald-800/30 text-[8px] font-mono font-bold text-emerald-350 flex items-center justify-center">0</div>
                  <div className="w-5 h-5 rounded bg-slate-900 border border-slate-800 text-[8px] font-mono text-slate-500 flex items-center justify-center">1</div>
                  <div className="w-5 h-5 rounded bg-[#101013] border border-slate-850 text-[8px] font-mono text-slate-500 flex items-center justify-center">2</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onExplore('algorithms')}
              className="mt-5 w-full py-2.5 font-bold text-slate-955 bg-emerald-450 hover:bg-emerald-400 rounded-xl transition-all cursor-pointer border-none text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              Test Counting Sort
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 4.5 INTEGRATED PORTAL MODULES (NEW FEATURES ALIGNED WITH THEME) */}
      <section className="py-12 max-w-5xl mx-auto w-full px-4 border-t border-slate-900 relative z-10">
        <div className="flex flex-col gap-3 mb-8 text-center md:text-left">
          <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Learning Portals</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-200 tracking-tight m-0">Interactive Academic Modules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Module 1: Structured Lessons */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161720] to-[#111219] border border-slate-800/60 hover:border-cyan-500/25 transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.04)] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-855/50 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 m-0">Interactive Concept Courses</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                Read structured, rich concept cheatsheets covering visual algorithm complexity bounds, LIFO stack operations, circular queue array pointers, and duplicate stability conditions. Check off completed checkpoints as you learn!
              </p>
            </div>
            <button
              onClick={() => onExplore('courses')}
              className="mt-6 py-3 w-full bg-[#18181b] hover:bg-[#27272a] text-slate-250 hover:text-white border border-[#27272a]/45 hover:border-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              Open Concept Courses
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Module 2: MCQ Quizzes */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161720] to-[#111219] border border-slate-800/60 hover:border-indigo-500/25 transition-all duration-300 hover:shadow-[0_0_35px_rgba(99,102,241,0.04)] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/40 border border-indigo-855/50 flex items-center justify-center text-indigo-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 m-0">Interactive Practice & Streaks</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                Challenge your theoretical memory with dynamic multiple-choice quiz sets. Tracks your score sheets, displays visual success checklists, and unlocks orange learning flame streaks on perfect 5/5 scorecards.
              </p>
            </div>
            <button
              onClick={() => onExplore('practice')}
              className="mt-6 py-3 w-full bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer transition-all border-none flex items-center justify-center gap-1.5"
            >
              Start Practice Quiz
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. ACADEMIC PROJECT OVERVIEW & DETAILS BANNER */}
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

      {/* 6. COMPREHENSIVE PREMIUM FOOTER */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/60 py-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
          
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
        <div className="max-w-5xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-mono">
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
