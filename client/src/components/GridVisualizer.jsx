import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, Layers } from 'lucide-react';

/**
 * GridVisualizer Component (High Fidelity - 8 Puzzle 3x3 Sliding Grid Visualizer)
 * 
 * - Grid: 3x3 matrix displaying tiles 1-8.
 * - Animations: Framer Motion <motion.div layout> dynamically translates sliding moves in 2D space.
 * - Statistics deck: Shows A* Heuristics metrics (g(n) Depth, h(n) Manhattan distance, f(n) Total cost).
 * 
 * @param {Object} props
 * @param {Array} props.array - 1D array of 9 tile objects
 * @param {Array} props.sortedIndices - Array of indexes matching goal positions
 * @param {number} props.i - Empty index position (0 tile)
 * @param {number} props.j - Swapped tile index position
 * @param {string} props.operationText - f(n) heuristics cost text
 * @param {string} props.explanation - Move details description text
 */
export default function GridVisualizer({ 
  array, 
  sortedIndices = [], 
  i, 
  j, 
  operationText = 'f(n) = 0 + 0 = 0', 
  explanation = '' 
}) {
  
  // Parse g(n) and h(n) values from operationText (e.g. "f(n) = 5 + 3 = 8")
  let gCost = 0;
  let hCost = 0;
  let fCost = 0;
  try {
    const parts = operationText.replace('f(n) = ', '').split(' = ');
    const formulaParts = parts[0].split(' + ');
    gCost = Number(formulaParts[0]);
    hCost = Number(formulaParts[1]);
    fCost = Number(parts[1]);
  } catch (e) {
    // fallback
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2">
      
      {/* 3x3 Grid Board Container */}
      <div className="bg-[#282828] border border-[#383838] p-4.5 rounded-3xl w-72 h-72 sm:w-80 sm:h-80 grid grid-cols-3 gap-3 shadow-2xl relative overflow-hidden select-none">
        {/* Fine top line gradient */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#ffa116]/25 to-transparent"></div>

        <AnimatePresence mode="popLayout">
          {array.map((item, idx) => {
            const isEmpty = item.value === 0;
            const isCorrect = sortedIndices.includes(idx);
            const isJustSwapped = idx === i || idx === j;

            if (isEmpty) {
              return (
                <div 
                  key="empty-slot" 
                  className="rounded-2xl bg-[#1a1a1a]/50 border border-dashed border-[#383838]/40 h-full w-full flex items-center justify-center"
                />
              );
            }

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 17,
                  mass: 0.8
                }}
                className={`rounded-2xl border flex flex-col items-center justify-center font-sans transition-colors duration-250 select-none shadow-md h-full w-full ${
                  isCorrect
                    ? 'bg-gradient-to-t from-emerald-500/10 via-[#10b981]/15 to-[#a7f3d0]/10 border-[#10b981]/40 text-[#10b981]'
                    : isJustSwapped
                    ? 'bg-[#1a1a1a] border-[#ffa116]/45 text-[#ffa116]'
                    : 'bg-[#1a1a1a] border-[#383838] hover:border-slate-700/60 text-slate-200'
                }`}
              >
                {/* Tile Value */}
                <span className="text-xl sm:text-2xl font-black font-mono tracking-tighter">
                  {item.value}
                </span>

                {/* Sub correct placement star marker */}
                {isCorrect && (
                  <Sparkles className="w-3 h-3 text-[#10b981] absolute bottom-2" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* A* Heuristic Statistics Panel */}
      <div className="w-full max-w-md grid grid-cols-3 gap-3.5 mt-2">
        {/* Card 1: g(n) */}
        <div className="bg-[#282828] border border-[#383838] p-3 rounded-2xl flex flex-col items-center text-center shadow-md relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#ffa116]/10"></div>
          <span className="text-[8px] font-bold font-mono tracking-widest text-slate-500 uppercase">g(n) Depth</span>
          <span className="text-base font-black font-mono text-slate-200 mt-1">{gCost} Moves</span>
        </div>

        {/* Card 2: h(n) */}
        <div className="bg-[#282828] border border-[#383838] p-3 rounded-2xl flex flex-col items-center text-center shadow-md relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#ffa116]/10"></div>
          <span className="text-[8px] font-bold font-mono tracking-widest text-[#ffa116] uppercase">h(n) Manhattan</span>
          <span className="text-base font-black font-mono text-[#ffa116] mt-1">{hCost} Dist</span>
        </div>

        {/* Card 3: f(n) */}
        <div className="bg-[#282828] border border-[#383838] p-3 rounded-2xl flex flex-col items-center text-center shadow-md relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#ffa116]/15"></div>
          <span className="text-[8px] font-bold font-mono tracking-widest text-emerald-450 uppercase">f(n) Cost</span>
          <span className="text-base font-black font-mono text-emerald-400 mt-1">{fCost} Total</span>
        </div>
      </div>

    </div>
  );
}
