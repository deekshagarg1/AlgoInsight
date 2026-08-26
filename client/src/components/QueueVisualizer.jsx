import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export default function QueueVisualizer({
  queue = [],
  frontIdx = 0,
  rearIdx = 0,
  operationText = ''
}) {
  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 text-left shadow-2xl relative overflow-hidden min-h-[260px]">
      
      {/* Header Info */}
      <div className="flex justify-between items-center w-full font-mono text-[10px] font-bold text-slate-500 border-b border-slate-900 pb-2">
        <span className="flex items-center gap-1.5 text-indigo-400">
          <Layers className="w-3.5 h-3.5" /> Queue (FIFO Restricted Buffer)
        </span>
        <div className="flex items-center gap-3">
          <span>Front: <span className="text-emerald-400 font-extrabold">{queue.length > 0 ? queue[0] : 'None'}</span></span>
          <span>Rear: <span className="text-pink-400 font-extrabold">{queue.length > 0 ? queue[queue.length - 1] : 'None'}</span></span>
        </div>
      </div>

      {/* Horizontal Queue Pipe Canvas */}
      <div className="flex items-center justify-center gap-2.5 my-auto py-6 overflow-x-auto select-none border-y border-dashed border-slate-800">
        {queue.length === 0 ? (
          <div className="text-center text-[10px] text-slate-600 font-mono py-4">
            Queue Empty
          </div>
        ) : (
          queue.map((val, idx) => {
            const isFront = idx === 0;
            const isRear = idx === queue.length - 1;

            let itemClass = 'border-slate-800 bg-[#1a1b24] text-slate-300';
            if (isFront) itemClass = 'border-emerald-500 bg-emerald-950/30 text-emerald-400 font-extrabold';
            if (isRear) itemClass = 'border-pink-500 bg-pink-950/30 text-pink-400 font-extrabold';

            return (
              <motion.div
                key={`q-${val}-${idx}`}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center relative transition-all ${itemClass}`}
              >
                <span className="text-xs font-mono font-black">{val}</span>
                {isFront && (
                  <span className="absolute -top-3.5 text-[8px] font-bold font-mono bg-emerald-500/20 text-emerald-400 px-1 rounded">
                    Front
                  </span>
                )}
                {isRear && (
                  <span className="absolute -bottom-3.5 text-[8px] font-bold font-mono bg-pink-500/20 text-pink-400 px-1 rounded">
                    Rear
                  </span>
                )}
              </motion.div>
            );
          })
        )}
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
