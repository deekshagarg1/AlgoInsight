import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BarVisualizer Component (Super Compact Design)
 * 
 * Styled exactly like AlgoMaster:
 * - Canvas height: Reduced to h-24/h-28 (min-h-[190px]) to make the panel slightly smaller as requested.
 * - Swapping Y arched jump keyframes scaled to y: [0, -16, 0] to remain safe in the smaller canvas.
 * - Decoupled Pointers: j (cyan) and j+1 (yellow/gold) slide horizontally inside static bottom row.
 * - Slate-grey theme (#161720) with slate-800 border.
 * 
 * @param {Object} props
 * @param {Object[]} props.array - Snapshot array elements { id, value }
 * @param {string} props.stepType - COMPARE, SWAP, SORTED, etc.
 * @param {number[]} props.activeIndices - Active pointer indices
 * @param {number[]} props.sortedIndices - Already sorted indices
 * @param {number} props.pass - Current pass number
 * @param {boolean} props.swapped - Pass swap boolean state
 * @param {string} props.operationText - Evaluation logic description text
 */
export default function BarVisualizer({
  array,
  stepType,
  activeIndices = [],
  sortedIndices = [],
  pass = 0,
  swapped = false,
  operationText = ''
}) {
  const maxValue = array.length > 0 ? Math.max(...array.map(item => item.value)) : 100;

  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-4 relative flex flex-col shadow-2xl overflow-hidden min-h-[190px]">
      
      {/* Top parameters indicators */}
      <div className="flex justify-between items-center w-full mb-3 font-mono text-[10px] font-bold text-slate-500 z-10 px-1">
        <div>
          <span>pass = </span>
          <span className="text-cyan-400 font-extrabold">{pass || 0}</span>
        </div>
        <div>
          <span>swapped = </span>
          <span className={`${swapped ? 'text-amber-400' : 'text-slate-500'} font-extrabold`}>
            {swapped ? 'true' : 'false'}
          </span>
        </div>
      </div>

      {/* Main Bars Canvas (h-24 sm:h-28) */}
      <div className="w-full h-24 sm:h-28 flex items-end justify-center gap-2 pb-2 border-b border-slate-900/60 overflow-hidden relative pt-5">
        <AnimatePresence mode="popLayout">
          {array.map((item, idx) => {
            const isActive = activeIndices.includes(idx);
            const isSorted = sortedIndices.includes(idx);

            // Height formula (capped at 55% to ensure ample jump headroom)
            const heightPercent = maxValue > 0 ? (item.value / maxValue) * 55 : 0;

            // Default: Unfilled slate outlines
            let barClasses = 'border-[#2e3146] bg-[#1a1b25]/60 text-slate-455';
            let glowStyle = {};

            if (isActive) {
              barClasses = 'border-yellow-400 bg-[#1c1a11]/45 text-yellow-400 border-[2.5px]';
              glowStyle = { 
                boxShadow: '0 0 15px rgba(250, 204, 21, 0.5)'
              };
            } else if (isSorted) {
              barClasses = 'border-[#55f0b5] bg-gradient-to-t from-[#047857] via-[#10b981] to-[#a7f3d0] text-slate-950 font-black';
              glowStyle = { 
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)'
              };
            }

            // Swapping Y arched jump keyframes (capped at -16px due to compact canvas)
            let animateY = 0;
            if (stepType === 'SWAP' && isActive) {
              if (idx === activeIndices[1]) {
                animateY = [0, -16, 0];
              }
            }

            return (
              <motion.div
                key={item.id} // STABLE UNIQUE KEY handles sliding swaps
                layout
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  y: animateY 
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  layout: { type: 'spring', stiffness: 70, damping: 16, mass: 1 },
                  y: { duration: 0.9, ease: "easeInOut" }
                }}
                className="flex-1 flex flex-col justify-end items-center origin-bottom max-w-[40px] z-10"
                style={{ height: '100%' }}
              >
                {/* Fixed Value label above the bar */}
                <span className={`text-[9px] sm:text-[10px] font-mono font-semibold mb-1 transition-colors duration-200 tracking-tighter ${
                  isActive ? 'text-yellow-400 font-extrabold' : isSorted ? 'text-[#34d399]' : 'text-slate-500'
                }`}>
                  {item.value}
                </span>

                {/* The Bar Outline Shape */}
                <div
                  className={`w-full rounded-lg border flex items-center justify-center relative ${barClasses}`}
                  style={{
                    height: `${heightPercent}%`,
                    ...glowStyle
                  }}
                >
                  {isSorted && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/35 rounded-t-md"></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 2. Static Indices & Sliding Pointers Deck */}
      <div className="w-full flex justify-center gap-2 relative min-h-[44px] mt-1.5 select-none">
        {array.map((_, idx) => {
          const isFirstActive = activeIndices[0] === idx;
          const isSecondActive = activeIndices[1] === idx;
          const isActive = isFirstActive || isSecondActive;

          return (
            <div 
              key={idx} 
              className="flex-1 max-w-[40px] flex flex-col items-center justify-start relative h-full"
            >
              {/* Static Index Number */}
              <span className="text-[10px] font-bold font-mono text-slate-655 z-0">
                {idx}
              </span>

              {/* Sliding Pointers */}
              {isActive && (
                <motion.div
                  key={isFirstActive ? 'j-bubble' : 'jp1-bubble'}
                  layoutId={isFirstActive ? 'pointer-j' : 'pointer-jp1'}
                  className="absolute top-3.5 flex flex-col items-center z-20"
                  transition={{ type: 'spring', stiffness: 85, damping: 15 }}
                >
                  {/* Vertical line connector */}
                  <div className={`w-[1.5px] h-3 ${isFirstActive ? 'bg-[#06b6d4]/85' : 'bg-[#facc15]/85'}`}></div>
                  
                  {/* Bubble badge */}
                  <div className={`w-[16px] h-[16px] rounded-full font-black text-[9px] font-mono flex items-center justify-center shadow-lg border ${
                    isFirstActive 
                      ? 'bg-[#06b6d4] text-slate-950 border-[#22d3ee]/40 shadow-cyan-500/20' 
                      : 'bg-[#facc15] text-slate-950 border-[#fde047]/40 shadow-yellow-500/20 font-bold'
                  }`}>
                    {isFirstActive ? 'j' : 'j+1'}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Comparison Expression */}
      <div className="w-full text-center h-6 flex items-center justify-center mt-2">
        {operationText && (
          <span className="text-xs font-bold text-yellow-300 font-mono tracking-wide">
            {operationText}
          </span>
        )}
      </div>

    </div>
  );
}
