import React, { useState, useContext } from 'react';
import { Bookmark, Sparkles, Lock, Layers, Search, Filter } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function AlgorithmsPage({ onSelectAlgo, onOpenAuth }) {
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const algorithms = [
    // Sorting
    {
      id: 'bubble-sort',
      category: 'Sorting',
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
      category: 'Sorting',
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
      category: 'Sorting',
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
      id: 'merge-sort',
      category: 'Sorting',
      name: 'Merge Sort',
      desc: 'Divide-and-conquer algorithm that splits the array and merges sorted runs.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(N log N)',
      space: 'O(N)',
      stable: 'Stable',
      isActive: true
    },
    {
      id: 'quick-sort',
      category: 'Sorting',
      name: 'Quick Sort',
      desc: 'Partition elements around a chosen pivot and recursively sort partitions.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(N log N)',
      space: 'O(log N)',
      stable: 'Unstable',
      isActive: true
    },
    {
      id: 'heap-sort',
      category: 'Sorting',
      name: 'Heap Sort',
      desc: 'Construct a Max-Heap binary tree and repeatedly extract max elements.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(N log N)',
      space: 'O(1)',
      stable: 'Unstable',
      isActive: true
    },
    {
      id: 'counting-sort',
      category: 'Sorting',
      name: 'Counting Sort',
      desc: 'Non-comparison-based linear sort that counts occurrences of integer keys.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(N+K)',
      space: 'O(N+K)',
      stable: 'Stable',
      isActive: true
    },
    {
      id: 'radix-sort',
      category: 'Sorting',
      name: 'Radix Sort',
      desc: 'Non-comparison digit-by-digit positional sorter using counting buckets.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(d(N+K))',
      space: 'O(N+K)',
      stable: 'Stable',
      isActive: true
    },

    // Searching
    {
      id: 'linear-search',
      category: 'Searching',
      name: 'Linear Search',
      desc: 'Scan elements sequentially one-by-one until the target item is found.',
      difficulty: 'Easy',
      difficultyColor: 'text-emerald-450 bg-emerald-950/20 border-emerald-500/25',
      time: 'O(N)',
      space: 'O(1)',
      stable: 'Iterative',
      isActive: true
    },
    {
      id: 'binary-search',
      category: 'Searching',
      name: 'Binary Search',
      desc: 'Halves the search range at every step on sorted arrays via low/mid/high range.',
      difficulty: 'Easy',
      difficultyColor: 'text-emerald-450 bg-emerald-950/20 border-emerald-500/25',
      time: 'O(log N)',
      space: 'O(1)',
      stable: 'Divide & Conquer',
      isActive: true
    },

    // AI & Grid Search
    {
      id: 'eight-puzzle',
      category: 'AI & Grid Search',
      name: '8-Puzzle Solver',
      desc: 'Sliding tile board solver displaying Manhattan heuristics and A* search tree expansions.',
      difficulty: 'Hard',
      difficultyColor: 'text-rose-450 bg-rose-950/20 border-rose-500/25',
      time: 'O(b^d)',
      space: 'O(b^d)',
      stable: 'A* Search',
      isActive: true
    },

    // Data Structures
    {
      id: 'ds-linked-list',
      category: 'Data Structures',
      name: 'Linked List Traversals',
      desc: 'Dynamic nodes connected by next pointers. Traversal, Insertion, Deletion.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(N)',
      space: 'O(1)',
      stable: 'N/A',
      isActive: true
    },
    {
      id: 'ds-stack',
      category: 'Data Structures',
      name: 'Stack (LIFO)',
      desc: 'Last-In First-Out push, pop, peek restricted access structure.',
      difficulty: 'Easy',
      difficultyColor: 'text-emerald-450 bg-emerald-950/20 border-emerald-500/25',
      time: 'O(1)',
      space: 'O(N)',
      stable: 'N/A',
      isActive: true
    },
    {
      id: 'ds-queue',
      category: 'Data Structures',
      name: 'Queue (FIFO)',
      desc: 'First-In First-Out enqueue, dequeue, front, rear buffer.',
      difficulty: 'Easy',
      difficultyColor: 'text-emerald-450 bg-emerald-950/20 border-emerald-500/25',
      time: 'O(1)',
      space: 'O(N)',
      stable: 'N/A',
      isActive: true
    },

    // Trees
    {
      id: 'ds-tree',
      category: 'Trees',
      name: 'Binary Search Tree (BST)',
      desc: 'Hierarchical node tree with Inorder, Preorder, and Postorder traversals.',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-450 bg-amber-950/20 border-amber-500/25',
      time: 'O(log N)',
      space: 'O(H)',
      stable: 'N/A',
      isActive: true
    },

    // Graphs
    {
      id: 'ds-graph',
      category: 'Graphs',
      name: 'Graph BFS & DFS',
      desc: 'Interactive Graph traversal modeling visited nodes, edges, queue & stack state.',
      difficulty: 'Hard',
      difficultyColor: 'text-rose-450 bg-rose-950/20 border-rose-500/25',
      time: 'O(V + E)',
      space: 'O(V)',
      stable: 'N/A',
      isActive: true
    }
  ];

  const categories = ['All', 'Sorting', 'Searching', 'AI & Grid Search', 'Data Structures', 'Trees', 'Graphs'];

  const filteredAlgos = selectedCategory === 'All'
    ? algorithms
    : algorithms.filter(a => a.category === selectedCategory);

  return (
    <div className="w-full flex flex-col gap-8 text-left py-4 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-transparent border border-cyan-500/15 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 rounded-xl">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-widest">DSA Algorithm Catalog</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Select any algorithm or data structure module to open the step-by-step visual sandbox.</p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-900">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md scale-105 font-bold'
                : 'bg-[#161720] text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Algorithm Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlgos.map((algo) => {
          const isLocked = !user && algo.id !== 'bubble-sort' && algo.id !== 'selection-sort';
          return (
            <div
              key={algo.id}
              onClick={() => {
                if (isLocked && onOpenAuth) {
                  onOpenAuth();
                } else if (algo.isActive) {
                  onSelectAlgo(algo.id);
                }
              }}
              className={`p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between min-h-[150px] ${
                algo.isActive && !isLocked
                  ? 'bg-[#161720] border-slate-800 hover:border-cyan-500/35 hover:shadow-[0_0_20px_rgba(6,182,212,0.04)] cursor-pointer shadow-lg hover:-translate-y-0.5'
                  : 'bg-[#161720]/45 border-slate-900/60 text-slate-500 cursor-pointer opacity-80'
              }`}
            >
              {/* Card Header & Body */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[8.5px] font-bold font-mono uppercase bg-slate-900 text-cyan-400 border border-slate-800 rounded">
                      {algo.category}
                    </span>
                    <h3 className={`text-base font-bold transition-colors m-0 ${
                      algo.isActive ? 'text-slate-100 group-hover:text-cyan-400' : 'text-slate-500'
                    }`}>
                      {algo.name}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed pr-6 mt-1.5 text-slate-400">
                    {algo.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 text-[9px] font-bold border rounded-md uppercase tracking-wider ${algo.difficultyColor}`}>
                    {algo.difficulty}
                  </span>
                </div>
              </div>

              {/* Complexity Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-900/60 font-mono text-[9px] font-bold uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded border bg-amber-500/10 text-amber-400 border-amber-500/20">
                  Time: {algo.time}
                </span>
                <span className="px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  Space: {algo.space}
                </span>
                {algo.stable !== 'N/A' && (
                  <span className={`px-2 py-0.5 rounded border ${
                    algo.stable === 'Stable' || algo.stable === 'Iterative' || algo.stable === 'Divide & Conquer'
                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                      : 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                  }`}>
                    {algo.stable}
                  </span>
                )}
              </div>

              {/* Lock icon overlay if login required */}
              {isLocked && (
                <div className="absolute inset-0 bg-[#0c0d12]/35 backdrop-blur-[0.5px] rounded-2xl flex flex-col items-center justify-center gap-1.5 z-20">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    Login Required
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

}
  );
}
