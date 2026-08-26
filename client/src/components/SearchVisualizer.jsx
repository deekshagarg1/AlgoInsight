import React from 'react';
import { motion } from 'framer-motion';

export default function SearchVisualizer({
  array = [],
  stepType = 'INITIAL',
  target = 22,
  currentIndex = -1,
  foundIndex = -1,
  low = -1,
  high = -1,
  mid = -1,
  comparisons = 0,
  operationText = ''
}) {
  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 text-left shadow-2xl relative overflow-hidden min-h-[260px]">
      
      {/* Header Info Bar */}
      <div className="flex justify-between items-center w-full font-mono text-[10px] font-bold text-slate-500 border-b border-slate-900 pb-2">
        <div className="flex items-center gap-3">
          <span>Target Value: <span className="text-cyan-400 font-extrabold text-xs font-mono">{target}</span></span>
          {low >= 0 && <span>Low: <span className="text-indigo-400">{low}</span></span>}
          {high >= 0 && <span>High: <span className="text-pink-400">{high}</span></span>}
          {mid >= 0 && <span>Mid: <span className="text-yellow-400">{mid}</span></span>}
        </div>
        <div>
          <span>Comparisons: <span className="text-amber-400 font-extrabold">{comparisons}</span></span>
        </div>
      </div>

      {/* Main Elements Row Canvas */}
      <div className="flex items-center justify-center gap-2.5 my-auto py-6 min-h-[100px] flex-wrap">
        {array.map((item, idx) => {
          const isCurrent = idx === currentIndex || idx === mid;
          const isFound = idx === foundIndex;
          const isOutRange = (low >= 0 && high >= 0) && (idx < low || idx > high);

          let containerClass = 'border-slate-800 bg-[#1a1b24] text-slate-300';
          let glowStyle = {};

          if (isFound) {
            containerClass = 'border-emerald-450 bg-emerald-950/40 text-emerald-400 font-extrabold scale-110 shadow-lg';
            glowStyle = { boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' };
          } else if (isCurrent) {
            containerClass = 'border-yellow-400 bg-yellow-950/30 text-yellow-400 font-extrabold scale-105 shadow-md';
            glowStyle = { boxShadow: '0 0 15px rgba(250, 204, 21, 0.4)' };
          } else if (isOutRange) {
            containerClass = 'border-slate-900 bg-slate-950/40 text-slate-650 opacity-35';
          }

          return (
            <motion.div
              key={item.id}
              layout
              className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center transition-all relative ${containerClass}`}
              style={glowStyle}
            >
              <span className="text-xs font-mono font-black">{item.value}</span>
              <span className="text-[8px] font-mono text-slate-500 absolute -bottom-4 font-bold">{idx}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Operation Text Footer */}
      <div className="w-full text-center border-t border-slate-900/60 pt-2.5">
        <span className="text-xs font-mono font-bold text-yellow-300">
          {operationText}
        </span>
      </div>
    </div>
  );
}
