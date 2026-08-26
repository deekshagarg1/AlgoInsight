import React from 'react';
import { Clock, HardDrive, Info, Sparkles } from 'lucide-react';

export default function ComplexityPanel({ algoId = 'bubble-sort' }) {
  const complexityData = {
    'bubble-sort': {
      best: 'O(N)',
      avg: 'O(N²)',
      worst: 'O(N²)',
      space: 'O(1)',
      stable: 'Stable',
      explanation: 'Bubble Sort checks adjacent element pairs. In the best case (when already sorted), the swap detection flag allows it to complete in O(N) single pass. In worst/average cases, nested loops perform N(N-1)/2 comparisons, resulting in quadratic O(N²) complexity.'
    },
    'selection-sort': {
      best: 'O(N²)',
      avg: 'O(N²)',
      worst: 'O(N²)',
      space: 'O(1)',
      stable: 'Unstable',
      explanation: 'Selection Sort scans the remaining unsorted subarray to find the minimum element in every pass. Because it always executes nested loops regardless of input order, its time complexity is strictly O(N²) across all cases.'
    },
    'insertion-sort': {
      best: 'O(N)',
      avg: 'O(N²)',
      worst: 'O(N²)',
      space: 'O(1)',
      stable: 'Stable',
      explanation: 'Insertion Sort shifts elements backwards to insert each item into its sorted position. When already sorted, it makes only 1 comparison per item, yielding linear O(N) best case.'
    },
    'merge-sort': {
      best: 'O(N log N)',
      avg: 'O(N log N)',
      worst: 'O(N log N)',
      space: 'O(N)',
      stable: 'Stable',
      explanation: 'Merge Sort recursively divides the array in half (log N levels) and merges sorted sub-arrays in linear O(N) time at each level. It requires O(N) auxiliary memory buffer to hold temporary merged elements.'
    },
    'quick-sort': {
      best: 'O(N log N)',
      avg: 'O(N log N)',
      worst: 'O(N²)',
      space: 'O(log N)',
      stable: 'Unstable',
      explanation: 'Quick Sort partitions elements around a pivot. On average, balanced partitions yield O(N log N) time. In the worst case (when pivot selections are unbalanced), depth becomes N, leading to O(N²) time.'
    },
    'heap-sort': {
      best: 'O(N log N)',
      avg: 'O(N log N)',
      worst: 'O(N log N)',
      space: 'O(1)',
      stable: 'Unstable',
      explanation: 'Heap Sort builds a Max-Heap in O(N) time and repeatedly extracts the root element N times, taking O(log N) heapify per element. Total runtime is strictly O(N log N) with O(1) in-place memory.'
    },
    'counting-sort': {
      best: 'O(N + K)',
      avg: 'O(N + K)',
      worst: 'O(N + K)',
      space: 'O(N + K)',
      stable: 'Stable',
      explanation: 'Counting Sort is a non-comparison algorithm that counts frequencies of keys in range K. It operates in linear O(N + K) time by calculating prefix sums.'
    },
    'radix-sort': {
      best: 'O(d · (N + K))',
      avg: 'O(d · (N + K))',
      worst: 'O(d · (N + K))',
      space: 'O(N + K)',
      stable: 'Stable',
      explanation: 'Radix Sort sorts elements digit-by-digit from least to most significant position using counting sort buckets as a stable subroutine. d represents maximum digits.'
    },
    'linear-search': {
      best: 'O(1)',
      avg: 'O(N)',
      worst: 'O(N)',
      space: 'O(1)',
      stable: 'N/A',
      explanation: 'Linear Search inspects elements sequentially from index 0 to N-1. If target is at index 0, it takes O(1) best case. In average/worst cases, it scans N elements.'
    },
    'binary-search': {
      best: 'O(1)',
      avg: 'O(log N)',
      worst: 'O(log N)',
      space: 'O(1)',
      stable: 'N/A',
      explanation: 'Binary Search halves the search range at every step on sorted arrays. Halving search bounds generates a logarithmic division curve of O(log N).'
    }
  };

  const data = complexityData[algoId] || complexityData['bubble-sort'];

  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 text-left shadow-lg">
      <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-bold text-slate-200 tracking-tight m-0 font-sans">
          Complexity Analysis & Characteristics
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#111219] border border-slate-850 rounded-xl text-center flex flex-col items-center">
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">Best Time</span>
          <span className="text-xs font-black font-mono text-emerald-400">{data.best}</span>
        </div>
        <div className="p-3 bg-[#111219] border border-slate-850 rounded-xl text-center flex flex-col items-center">
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">Avg Time</span>
          <span className="text-xs font-black font-mono text-amber-400">{data.avg}</span>
        </div>
        <div className="p-3 bg-[#111219] border border-slate-850 rounded-xl text-center flex flex-col items-center">
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">Worst Time</span>
          <span className="text-xs font-black font-mono text-rose-450">{data.worst}</span>
        </div>
        <div className="p-3 bg-[#111219] border border-slate-850 rounded-xl text-center flex flex-col items-center">
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">Aux Space</span>
          <span className="text-xs font-black font-mono text-cyan-400">{data.space}</span>
        </div>
      </div>

      <div className="p-3.5 bg-[#111219] border border-slate-850 rounded-xl flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400 leading-relaxed font-sans m-0">
          {data.explanation}
        </p>
      </div>
    </div>
  );
}
