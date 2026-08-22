import React from 'react';
import { Bookmark, Sparkles, Lock, Layers } from 'lucide-react';

/**
 * AlgorithmsPage Component (High Fidelity - Card Cheatsheets)
 * 
 * Styled exactly like AlgoMaster:
 * - Card Details: Shows Time Complexity, Space Complexity, and Stability as a clean,
 *   compact row of color-coded tag badges at the bottom of each card.
 * - Impressive Layout: Modern slate-grey background (#161720) for active cards with custom borders.
 * 
 * @param {Object} props
 * @param {Function} props.onSelectAlgo - Callback to open the visualizer page for an algorithm
 */
export default function AlgorithmsPage({ onSelectAlgo }) {
  const algorithms = [
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      desc: 'Sort elements by comparing adjacent items and swapping if out of order.',
      difficulty: 'Easy',
      difficultyColor: 'text-emerald-450 bg-emerald-950/20 border-emerald-500/25',
      time: 'O(N²)',
      space: 'O(1)',
      stable: 'Stable',
      isActive: true
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      desc: 'Repeatedly select the minimum element and swap it into position.',
      difficulty: 'Easy',
      difficultyColor: 'text-emerald-450 bg-emerald-950/20 border-emerald-500/25',
      time: 'O(N²)',
      space: 'O(1)',
      stable: 'Unstable',
      isActive: true
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      desc: 'Build sorted array item-by-item by shifting unsorted values backwards.',
      difficulty: 'Easy',
      difficultyColor: 'text-emerald-450 bg-emerald-950/20 border-emerald-500/25',
      time: 'O(N²)',
      space: 'O(1)',
      stable: 'Stable',
      isActive: true
    },
    {
      id: 'shell-sort',
      name: 'Shell Sort',
      desc: 'An optimized gapped insertion sort using shrinking step sizes.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(N¹.²⁵)',
      space: 'O(1)',
      stable: 'Unstable',
      isActive: false
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      desc: 'Divide-and-conquer algorithm that splits the array and merges sorted runs.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(N log N)',
      space: 'O(N)',
      stable: 'Stable',
      isActive: false
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      desc: 'Partition elements around a chosen pivot and recursively sort partitions.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(N log N)',
      space: 'O(log N)',
      stable: 'Unstable',
      isActive: false
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 text-left py-4 max-w-5xl mx-auto">
      
      {/* Dynamic Header Promo Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-transparent border border-cyan-500/15 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 rounded-xl">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Select Visualizer</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Select an active algorithm module to begin dynamic step-by-step visual training.</p>
          </div>
        </div>
      </div>

      {/* Sorting section header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-2 pl-1">
          <Layers className="w-4 h-4 text-cyan-450" />
          <h2 className="text-base font-bold tracking-tight text-slate-200 m-0">
            Sorting Algorithms
          </h2>
        </div>

        {/* Algorithm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {algorithms.map((algo) => {
            return (
              <div
                key={algo.id}
                onClick={() => algo.isActive && onSelectAlgo(algo.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between min-h-[150px] ${
                  algo.isActive
                    ? 'bg-[#161720] border-slate-800 hover:border-cyan-500/35 hover:shadow-[0_0_20px_rgba(6,182,212,0.04)] cursor-pointer shadow-lg hover:-translate-y-0.5'
                    : 'bg-[#161720]/45 border-slate-900/60 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                {/* 1. Card Body */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-base font-bold transition-colors m-0 ${
                      algo.isActive ? 'text-slate-100 group-hover:text-cyan-400' : 'text-slate-500'
                    }`}>
                      {algo.name}
                    </h3>
                    <p className={`text-xs leading-relaxed pr-6 mt-1 ${
                      algo.isActive ? 'text-slate-400' : 'text-slate-550'
                    }`}>
                      {algo.desc}
                    </p>
                  </div>

                  {/* Badges Right side */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 text-[9px] font-bold border rounded-md uppercase tracking-wider ${algo.difficultyColor}`}>
                      {algo.difficulty}
                    </span>
                    <button 
                      disabled={!algo.isActive}
                      className={`p-1.5 rounded-lg border transition-all ${
                        algo.isActive
                          ? 'border-slate-850 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                          : 'border-transparent text-slate-700'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. Compact Complexity Tags Row (Dracula Monospace Design) */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-900/60 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <span className={`px-2 py-0.5 rounded border ${
                    algo.isActive ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-950/20 text-slate-600 border-slate-900/40'
                  }`}>
                    Time: {algo.time}
                  </span>
                  <span className={`px-2 py-0.5 rounded border ${
                    algo.isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-950/20 text-slate-600 border-slate-900/40'
                  }`}>
                    Space: {algo.space}
                  </span>
                  <span className={`px-2 py-0.5 rounded border ${
                    !algo.isActive 
                      ? 'bg-slate-950/20 text-slate-650 border-slate-900/40' 
                      : algo.stable === 'Stable' 
                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                      : 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                  }`}>
                    {algo.stable}
                  </span>
                </div>

                {/* Lock icon overlay for coming soon algorithms */}
                {!algo.isActive && (
                  <div className="absolute inset-0 bg-[#0c0d12]/35 backdrop-blur-[0.5px] rounded-2xl flex flex-col items-center justify-center gap-1.5 z-20">
                    <Lock className="w-4 h-4 text-slate-600" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Coming Soon</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
