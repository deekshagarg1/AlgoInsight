import React, { useState, useEffect } from 'react';
import { Search, X, Layers, Code, ArrowRight, BookOpen, Layers3, Network } from 'lucide-react';

const ALL_SEARCH_ITEMS = [
  // Sorting
  { id: 'bubble-sort', category: 'Sorting', name: 'Bubble Sort', desc: 'Compare adjacent elements and swap them if unordered.' },
  { id: 'selection-sort', category: 'Sorting', name: 'Selection Sort', desc: 'Repeatedly select the minimum element and swap into position.' },
  { id: 'insertion-sort', category: 'Sorting', name: 'Insertion Sort', desc: 'Build sorted array item-by-item by shifting values.' },
  { id: 'merge-sort', category: 'Sorting', name: 'Merge Sort', desc: 'Divide-and-conquer O(N log N) recursive sorting algorithm.' },
  { id: 'quick-sort', category: 'Sorting', name: 'Quick Sort', desc: 'Partition array around pivot and recursively sort sub-arrays.' },
  { id: 'heap-sort', category: 'Sorting', name: 'Heap Sort', desc: 'Build a Max-Heap binary tree and extract maximum elements.' },
  { id: 'counting-sort', category: 'Sorting', name: 'Counting Sort', desc: 'Non-comparison O(N + K) integer frequency key sorter.' },
  { id: 'radix-sort', category: 'Sorting', name: 'Radix Sort', desc: 'Non-comparison digit-by-digit positional sorting.' },

  // Searching
  { id: 'linear-search', category: 'Searching', name: 'Linear Search', desc: 'Sequential element scan through array elements.' },
  { id: 'binary-search', category: 'Searching', name: 'Binary Search', desc: 'Logarithmic O(log N) search on sorted arrays via low/mid/high range.' },

  // Data Structures
  { id: 'ds-array', category: 'Data Structure', name: 'Array Operations', desc: 'Insert, Delete, Search, Update, and Traverse elements in memory.' },
  { id: 'ds-linked-list', category: 'Data Structure', name: 'Linked List', desc: 'Dynamic nodes connected by next pointers. Reverse, Insert, Delete.' },
  { id: 'ds-stack', category: 'Data Structure', name: 'Stack (LIFO)', desc: 'Last-In First-Out push, pop, peek restricted linear structure.' },
  { id: 'ds-queue', category: 'Data Structure', name: 'Queue (FIFO)', desc: 'First-In First-Out enqueue, dequeue, front, rear buffer.' },
  { id: 'ds-tree', category: 'Data Structure', name: 'Binary Search Tree', desc: 'Hierarchical tree nodes with Inorder, Preorder, Postorder traversals.' },
  { id: 'ds-graph', category: 'Data Structure', name: 'Graph Engine', desc: 'Nodes and edges with BFS, DFS, Dijkstra, Prim, Kruskal traversals.' },
];

export default function SearchModal({ isOpen, onClose, onSelectTopic }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = ALL_SEARCH_ITEMS.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-[#161720] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#111219]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search algorithms, data structures, or topics (e.g. binary, quick, stack)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto flex flex-col gap-2 max-h-[400px]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              No matching algorithms or data structures found for "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectTopic(item.id);
                  onClose();
                }}
                className="p-3 rounded-xl border border-slate-850 bg-[#1a1b24]/40 hover:bg-[#1a1b24] hover:border-cyan-500/30 text-left cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-slate-900 border border-slate-800 text-cyan-400">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors m-0">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 m-0 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0 ml-2" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer hint */}
        <div className="px-4 py-2 bg-[#111219] border-t border-slate-850 flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <span>Press ESC or click outside to close</span>
          <span>Ctrl + K</span>
        </div>
      </div>
    </div>
  );
}
