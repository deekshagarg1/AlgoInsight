import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Link } from 'lucide-react';

export default function LinkedListVisualizer({
  nodes = [],
  activeIdx = -1,
  newNode = null,
  isReversed = false,
  operationText = ''
}) {
  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 text-left shadow-2xl relative overflow-hidden min-h-[260px]">
      
      {/* Top Header */}
      <div className="flex justify-between items-center w-full font-mono text-[10px] font-bold text-slate-500 border-b border-slate-900 pb-2">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Link className="w-3.5 h-3.5" /> Singly Linked List Nodes
        </span>
        <span>Head Pointer: <span className="text-emerald-400">{nodes[0]?.address || 'NULL'}</span></span>
      </div>

      {/* Nodes Horizontal Flow Container */}
      <div className="flex items-center justify-center gap-3 my-auto py-6 overflow-x-auto select-none">
        {nodes.map((node, idx) => {
          const isActive = idx === activeIdx;
          let nodeClasses = 'border-slate-800 bg-[#1a1b24] text-slate-200';
          let glowStyle = {};

          if (isActive) {
            nodeClasses = 'border-cyan-400 bg-cyan-950/40 text-cyan-300 scale-105 shadow-xl';
            glowStyle = { boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' };
          }

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <motion.div
                layout
                className={`flex flex-col rounded-xl border p-2.5 min-w-[90px] text-center relative transition-all ${nodeClasses}`}
                style={glowStyle}
              >
                {/* Pointer Badge */}
                {idx === 0 && (
                  <span className="absolute -top-3.5 left-2 px-1.5 py-0.5 text-[8px] font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
                    Head
                  </span>
                )}
                {idx === nodes.length - 1 && (
                  <span className="absolute -top-3.5 right-2 px-1.5 py-0.5 text-[8px] font-bold font-mono bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded">
                    Tail
                  </span>
                )}

                <span className="text-xs font-black font-mono mt-1">{node.value}</span>
                <span className="text-[8px] font-mono text-slate-500 mt-0.5">{node.address}</span>
              </motion.div>

              {/* Next Link Arrow */}
              {idx < nodes.length - 1 ? (
                <ArrowRight className="w-5 h-5 text-cyan-400 shrink-0 stroke-[2.5]" />
              ) : (
                <span className="text-xs font-mono font-bold text-slate-600 shrink-0 px-1">NULL</span>
              )}
            </React.Fragment>
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
