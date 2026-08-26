import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export default function StackVisualizer({
  stack = [],
  topIdx = -1,
  animatingVal = null,
  operationText = ''
}) {
  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 text-left shadow-2xl relative overflow-hidden min-h-[280px]">
      
      {/* Header Info */}
      <div className="flex justify-between items-center w-full font-mono text-[10px] font-bold text-slate-500 border-b border-slate-900 pb-2">
        <span className="flex items-center gap-1.5 text-pink-400">
          <Layers className="w-3.5 h-3.5" /> Stack (LIFO Restricted Access)
        </span>
        <span>Top Index: <span className="text-pink-400 font-extrabold">{topIdx >= 0 ? topIdx : 'Empty (-1)'}</span></span>
      </div>

      {/* Vertical Stack Frame Canvas */}
      <div className="flex justify-center items-center my-auto py-4">
        <div className="w-48 border-x-2 border-b-2 border-slate-700 rounded-b-2xl p-2 bg-[#111219] flex flex-col-reverse gap-2 min-h-[160px] max-h-[220px] overflow-y-auto">
          {stack.length === 0 ? (
            <div className="text-center text-[10px] text-slate-600 font-mono py-8">
              Stack Empty
            </div>
          ) : (
            stack.map((val, idx) => {
              const isTop = idx === topIdx;
              let itemClass = 'border-slate-800 bg-[#1a1b24] text-slate-300';
              if (isTop) {
                itemClass = 'border-pink-500 bg-pink-950/40 text-pink-300 font-extrabold shadow-lg scale-[1.02]';
              }

              return (
                <motion.div
                  key={`stk-${val}-${idx}`}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`w-full py-2.5 rounded-xl border text-center font-mono text-xs flex justify-between px-4 items-center transition-all ${itemClass}`}
                >
                  <span>{val}</span>
                  {isTop && (
                    <span className="text-[8px] uppercase tracking-wider font-bold bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded border border-pink-500/30">
                      Top
                    </span>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
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
