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
  operationText = '',
  minIdx = -1,
  algoId = 'bubble-sort',
  i = -1,
  j = -1,
  keyValue = -1,
  tempArray = [],
  depth = 1,
  leftRange = [],
  rightRange = [],
  countArray = [],
  outputArray = [],
  phase = '',
  valuesRange = [],
  activeArrIdx = -1,
  activeCountIdx = -1,
  activeOutputIdx = -1
}) {
  const maxValue = array.length > 0 ? Math.max(...array.map(item => item.value)) : 100;

  if (algoId === 'counting-sort') {
    return (
      <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-5 relative flex flex-col shadow-2xl overflow-hidden min-h-[340px] justify-between">
        
        {/* Top parameter indicators */}
        <div className="flex justify-between items-center w-full mb-4 font-mono text-[10px] font-bold text-slate-500 z-10 px-1">
          <div>
            <span>phase = </span>
            <span className="text-[#38bdf8] font-extrabold">{phase || 'count'}</span>
          </div>
          <div>
            <span>values = </span>
            <span className="text-yellow-400 font-extrabold">
              {valuesRange && valuesRange.length === 2 ? `${valuesRange[0]}..${valuesRange[1]}` : '1..8'}
            </span>
          </div>
        </div>

        {/* Grid Rows Container */}
        <div className="flex flex-col gap-6 w-full items-center my-auto">
          
          {/* ROW 1: arr (original array) */}
          <div className="flex items-center gap-4 w-full justify-center">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest w-12 text-right">
              arr
            </span>
            <div className="flex gap-2">
              {array.map((item, idx) => {
                const isActive = idx === activeArrIdx;
                return (
                  <div key={`arr-${idx}`} className="flex flex-col items-center gap-1 w-10">
                    <span className={`text-[10px] font-bold font-mono ${isActive ? 'text-yellow-400 font-extrabold' : 'text-slate-400'}`}>
                      {item.value}
                    </span>
                    <div className={`w-10 h-7 rounded-lg border flex items-center justify-center transition-all ${
                      isActive 
                        ? 'border-yellow-450 bg-yellow-450/10 shadow-[0_0_10px_rgba(250,204,21,0.25)] scale-105'
                        : 'border-[#2c2d3a] bg-[#1a1b24]'
                    }`}>
                      <div className={`w-6 h-1.5 rounded-full ${isActive ? 'bg-yellow-400' : 'bg-slate-700'}`} />
                    </div>
                    <span className="text-[8px] font-bold font-mono text-slate-600">
                      {idx}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROW 2: count (auxiliary frequency array) */}
          <div className="flex items-center gap-4 w-full justify-center">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest w-12 text-right">
              count
            </span>
            <div className="flex gap-2">
              {countArray.slice(1).map((val, idx) => {
                const countIdx = idx + 1; // 1-indexed for display
                const isActive = countIdx === activeCountIdx;
                return (
                  <div key={`count-${countIdx}`} className="flex flex-col items-center gap-1 w-10">
                    <div className={`w-10 h-7 rounded-lg border flex items-center justify-center transition-all font-mono text-[11px] font-black ${
                      isActive 
                        ? 'border-[#06b6d4] text-[#06b6d4] bg-[#06b6d4]/10 shadow-[0_0_10px_rgba(6,182,212,0.35)] scale-105'
                        : 'border-[#2c2d3a] text-slate-400 bg-[#1a1b24]'
                    }`}>
                      {val}
                    </div>
                    <span className="text-[8px] font-bold font-mono text-slate-655">
                      {countIdx}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROW 3: output (auxiliary sorted array) */}
          <div className="flex items-center gap-4 w-full justify-center">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest w-12 text-right">
              output
            </span>
            <div className="flex gap-2">
              {outputArray.map((item, idx) => {
                const isActive = idx === activeOutputIdx;
                const hasValue = item !== null && item !== undefined;
                return (
                  <div key={`output-${idx}`} className="flex flex-col items-center gap-1 w-10">
                    <span className={`text-[10px] font-bold font-mono ${isActive ? 'text-emerald-400 font-extrabold' : 'text-slate-450'}`}>
                      {hasValue ? item.value : ''}
                    </span>
                    <div className={`w-10 h-7 rounded-lg border flex items-center justify-center transition-all ${
                      isActive 
                        ? 'border-[#34d399] bg-[#34d399]/15 shadow-[0_0_12px_rgba(52,211,153,0.35)] scale-105'
                        : hasValue
                          ? 'border-emerald-500/35 bg-emerald-950/15'
                          : 'border-dashed border-[#2c2d3a] bg-transparent'
                    }`}>
                      {hasValue && (
                        <div className="w-6 h-3 rounded bg-[#10b981] shadow-[0_0_6px_rgba(52,211,153,0.3)] animate-fade-in" />
                      )}
                    </div>
                    <span className="text-[8px] font-bold font-mono text-slate-600">
                      {idx}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Centered bottom comparison / transition expression text */}
        <div className="w-full text-center h-8 flex items-center justify-center mt-3 border-t border-slate-900/60 pt-2.5">
          {operationText && (
            <span className="text-[10px] font-mono text-yellow-300 font-bold tracking-wide bg-[#facc15]/5 px-3 py-1 rounded border border-[#facc15]/10 shadow-[0_0_8px_rgba(250,204,21,0.03)]">
              {operationText}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-4 relative flex flex-col shadow-2xl overflow-hidden min-h-[190px]">
      
      {/* Top parameters indicators */}
      <div className="flex justify-between items-center w-full mb-3 font-mono text-[10px] font-bold text-slate-500 z-10 px-1">
        <div>
          {algoId === 'merge-sort' ? (
            <>
              <span>depth = </span>
              <span className="text-[#38bdf8] font-extrabold">{depth || 1}</span>
            </>
          ) : algoId === 'linear-search' || algoId === 'binary-search' ? (
            <>
              <span>target = </span>
              <span className="text-yellow-400 font-extrabold">{keyValue || 0}</span>
            </>
          ) : (
            <>
              <span>pass = </span>
              <span className="text-cyan-400 font-extrabold">{pass || 0}</span>
            </>
          )}
        </div>
        <div>
          {algoId === 'linear-search' || algoId === 'binary-search' ? (
            <>
              <span>found = </span>
              <span className={`${swapped ? 'text-emerald-450' : 'text-slate-550'} font-extrabold`}>
                {swapped ? 'true' : 'false'}
              </span>
            </>
          ) : (
            <>
              <span>swapped = </span>
              <span className={`${swapped ? 'text-amber-400' : 'text-slate-500'} font-extrabold`}>
                {swapped ? 'true' : 'false'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Bars Canvas (h-24 sm:h-28) */}
      <div className="w-full h-24 sm:h-28 flex items-end justify-center gap-2 pb-2 border-b border-slate-900/60 overflow-hidden relative pt-5">
        <AnimatePresence mode="popLayout">
          {array.map((item, idx) => {
            const isActive = activeIndices.includes(idx);
            const isSorted = sortedIndices.includes(idx);

            // Determine if the element is outside the active binary search bounds (dimmed)
            let isDimmed = false;
            if (algoId === 'binary-search' && i >= 0 && j >= 0) {
              isDimmed = idx < i || idx > j;
            }

            // Height formula (capped at 55% to ensure ample jump headroom)
            const heightPercentRaw = maxValue > 0 ? (item.value / maxValue) * 55 : 0;

            // Default: Unfilled slate outlines
            let barClasses = 'border-[#2e3146] bg-[#1a1b25]/60 text-slate-455';
            let glowStyle = {};

            const isFloating = (algoId === 'insertion-sort' && idx === minIdx && minIdx >= 0);

            if (algoId === 'insertion-sort') {
              if (idx === minIdx && minIdx >= 0) {
                // Key element (Floating Yellow)
                barClasses = 'border-yellow-400 bg-[#1c1a11]/45 text-yellow-400 border-[2.5px]';
                glowStyle = { 
                  boxShadow: '0 0 15px rgba(250, 204, 21, 0.5)'
                };
              } else if (idx === j && j >= 0) {
                // Compared element (Cyan Active)
                barClasses = 'border-[#06b6d4] bg-[#111c24]/45 text-[#06b6d4] border-[2.5px]';
                glowStyle = { 
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)'
                };
              } else if (isSorted) {
                // Sorted prefix elements
                barClasses = 'border-[#55f0b5] bg-gradient-to-t from-[#047857] via-[#10b981] to-[#a7f3d0] text-slate-950 font-black';
                glowStyle = { 
                  boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)'
                };
              }
            } else {
              // Bubble, Selection Sort, and Search
              if (isSorted) {
                barClasses = 'border-[#55f0b5] bg-gradient-to-t from-[#047857] via-[#10b981] to-[#a7f3d0] text-slate-950 font-black';
                glowStyle = { 
                  boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)'
                };
              } else if (isActive) {
                barClasses = 'border-yellow-400 bg-[#1c1a11]/45 text-yellow-400 border-[2.5px]';
                glowStyle = { 
                  boxShadow: '0 0 15px rgba(250, 204, 21, 0.5)'
                };
              } else if (idx === minIdx) {
                barClasses = 'border-[#bd93f9] bg-[#1d1b28]/45 text-[#bd93f9] border-[2.5px]';
                glowStyle = {
                  boxShadow: '0 0 15px rgba(189, 147, 249, 0.6)'
                };
              }
            }

            const displayValue = isFloating && keyValue >= 0 ? keyValue : item.value;
            const heightPercent = isFloating && keyValue >= 0 
              ? (maxValue > 0 ? (keyValue / maxValue) * 55 : 0) 
              : heightPercentRaw;

            // Swapping Y arched jump keyframes
            let animateY = 0;
            if (isFloating) {
              animateY = -26; // Float key element vertically above index
            } else if (stepType === 'SWAP' && isActive) {
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
                style={{ 
                  height: '100%',
                  opacity: isDimmed ? 0.2 : 1,
                  transition: 'opacity 0.3s ease'
                }}
              >
                {/* Fixed Value label above the bar */}
                <span className={`text-[9px] sm:text-[10px] font-mono font-semibold mb-1 transition-colors duration-200 tracking-tighter ${
                  isFloating ? 'text-yellow-400 font-extrabold' : (algoId === 'insertion-sort' && idx === j) ? 'text-[#06b6d4] font-extrabold' : isActive ? 'text-yellow-400 font-extrabold' : isSorted ? 'text-[#34d399]' : 'text-slate-500'
                }`}>
                  {displayValue}
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
      <div className="w-full flex justify-center gap-2 relative min-h-[58px] mt-1.5 select-none">
        {array.map((_, idx) => {
          const isFirstActive = activeIndices[0] === idx;
          const isSecondActive = activeIndices[1] === idx;
          const isActive = isFirstActive || isSecondActive;
          const isMinActive = minIdx === idx;
          const isSorted = sortedIndices.includes(idx);

          // Pointers resolution for Insertion Sort vs others
          const showI = (algoId === 'insertion-sort' || algoId === 'merge-sort') ? (i === idx && i >= 0) : isFirstActive;
          const showJ = (algoId === 'insertion-sort' || algoId === 'merge-sort') ? (j === idx && j >= 0) : isSecondActive;
          const anyActivePointer = showI || showJ;

          // If minIndex/key overlaps with showI or showJ, stack it lower to keep both labels visible
          const isMinOverlap = isMinActive && anyActivePointer;
          const minTopClass = isMinOverlap ? 'top-[43px]' : 'top-[21px]';
          const minStemHeight = isMinOverlap ? 'h-[26px]' : 'h-3';

          // Bubble badge styling mapping (Dracula/Screenshot compliance)
          let bubbleColor = showI 
            ? 'bg-[#06b6d4] text-slate-950 border-[#22d3ee]/40 shadow-cyan-500/20' 
            : 'bg-[#facc15] text-slate-950 border-[#fde047]/40 shadow-yellow-500/20 font-bold';
          let stemColor = showI ? 'bg-[#06b6d4]/85' : 'bg-[#facc15]/85';

          if (algoId === 'insertion-sort') {
            if (showI) {
              // i is static grey/dark
              bubbleColor = 'bg-[#282a36] text-[#f8f8f2] border-slate-700 shadow-slate-950/40 shadow-lg';
              stemColor = 'bg-slate-700/85';
            } else {
              // j is cyan scanner
              bubbleColor = 'bg-[#06b6d4] text-slate-950 border-[#22d3ee]/40 shadow-cyan-500/20';
              stemColor = 'bg-[#06b6d4]/85';
            }
          }

          return (
            <div 
              key={idx} 
              className="flex-1 max-w-[40px] flex flex-col items-center justify-start relative h-full"
            >
              {/* Static Index Number */}
              <span className="text-[10px] font-bold font-mono text-slate-655 z-0">
                {idx}
              </span>

              {/* Sorted contiguous green underline or Merge Sort Left/Right run lines */}
              <div className="w-full h-[3px] mt-0.5 relative">
                {algoId === 'merge-sort' ? (
                  <>
                    {leftRange && leftRange.length === 2 && idx >= leftRange[0] && idx <= leftRange[1] && (
                      <div className="absolute inset-x-[-5px] h-full bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.5)] rounded-full" />
                    )}
                    {rightRange && rightRange.length === 2 && idx >= rightRange[0] && idx <= rightRange[1] && (
                      <div className="absolute inset-x-[-5px] h-full bg-[#facc15] shadow-[0_0_8px_rgba(250,204,21,0.5)] rounded-full" />
                    )}
                  </>
                ) : (
                  <>
                    {isSorted && (
                      <motion.div 
                        layoutId={`sorted-line-${idx}`}
                        className="absolute inset-x-[-5px] h-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)] rounded-full"
                        transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Sliding Pointers (Excluded for Binary Search) */}
              {anyActivePointer && algoId !== 'binary-search' && (
                <motion.div
                  key={showI ? 'p1-bubble' : 'p2-bubble'}
                  layoutId={showI ? 'pointer-p1' : 'pointer-p2'}
                  className="absolute top-[21px] flex flex-col items-center z-20"
                  transition={{ type: 'spring', stiffness: 85, damping: 15 }}
                >
                  {/* Vertical line connector */}
                  <div className={`w-[1.5px] h-3 ${stemColor}`}></div>
                  
                  {/* Bubble badge */}
                  <div className={`w-[16px] h-[16px] rounded-full font-black text-[9px] font-mono flex items-center justify-center shadow-lg border ${bubbleColor}`}>
                    {algoId === 'selection-sort' || algoId === 'insertion-sort'
                      ? (showI ? 'i' : 'j')
                      : algoId === 'linear-search' || algoId === 'binary-search'
                      ? 'i'
                      : (showI ? 'j' : 'j+1')}
                  </div>
                </motion.div>
              )}

              {/* Sliding minIndex/key Pointer (Dracula Purple) (Excluded for Binary Search) */}
              {isMinActive && (algoId === 'selection-sort' || algoId === 'insertion-sort') && algoId !== 'binary-search' && (
                <motion.div
                  key="min-bubble"
                  layoutId="pointer-min"
                  className={`absolute ${minTopClass} flex flex-col items-center z-25`}
                  transition={{ type: 'spring', stiffness: 85, damping: 15 }}
                >
                  {/* Vertical line connector */}
                  <div className={`w-[1.5px] bg-[#bd93f9]/85 ${minStemHeight}`}></div>
                  
                  {/* Bubble badge */}
                  <div className="px-1 h-[16px] min-w-[20px] rounded-full bg-[#bd93f9] text-slate-950 border border-[#d6bbf9]/40 shadow-lg shadow-purple-500/20 font-black text-[8px] font-mono flex items-center justify-center">
                    {algoId === 'insertion-sort' ? 'key' : 'min'}
                  </div>
                </motion.div>
              )}

              {/* Binary Search Pointers (Low/Left, High/Right, Mid) */}
              {algoId === 'binary-search' && (
                <>
                  {i === idx && (
                    <motion.div
                      layoutId="pointer-low"
                      className="absolute top-[21px] flex flex-col items-center z-20 translate-x-[-9px]"
                      transition={{ type: 'spring', stiffness: 85, damping: 15 }}
                    >
                      <div className="w-[1.5px] h-3 bg-[#06b6d4]/85"></div>
                      <div className="w-[16px] h-[16px] rounded-full bg-[#06b6d4] text-slate-950 font-black text-[9px] font-mono flex items-center justify-center border border-[#22d3ee]/40 shadow-lg shadow-cyan-500/20">
                        L
                      </div>
                    </motion.div>
                  )}
                  {j === idx && (
                    <motion.div
                      layoutId="pointer-high"
                      className="absolute top-[21px] flex flex-col items-center z-20 translate-x-[9px]"
                      transition={{ type: 'spring', stiffness: 85, damping: 15 }}
                    >
                      <div className="w-[1.5px] h-3 bg-[#facc15]/85"></div>
                      <div className="w-[16px] h-[16px] rounded-full bg-[#facc15] text-slate-950 font-black text-[9px] font-mono flex items-center justify-center border border-[#fde047]/40 shadow-lg shadow-yellow-500/20">
                        R
                      </div>
                    </motion.div>
                  )}
                  {minIdx === idx && (
                    <motion.div
                      layoutId="pointer-mid"
                      className="absolute top-[43px] flex flex-col items-center z-25"
                      transition={{ type: 'spring', stiffness: 85, damping: 15 }}
                    >
                      <div className="w-[1.5px] h-[26px] bg-[#bd93f9]/85"></div>
                      <div className="w-[16px] h-[16px] rounded-full bg-[#bd93f9] text-slate-950 font-black text-[9px] font-mono flex items-center justify-center border border-[#d6bbf9]/40 shadow-lg shadow-purple-500/20 animate-pulse">
                        M
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Comparison Expression */}
      <div className="w-full text-center h-6 flex items-center justify-center mt-2">
        {operationText && algoId !== 'merge-sort' && (
          <span className="text-xs font-bold text-yellow-300 font-mono tracking-wide">
            {operationText}
          </span>
        )}
      </div>

      {/* 3. Merge Sort Secondary Temp Array Row */}
      {algoId === 'merge-sort' && tempArray && tempArray.length > 0 && (
        <div className="w-full mt-4 pt-3 border-t border-slate-900/60 flex flex-col items-center gap-2">
          {/* Comparison expression label (centered above temp array) */}
          {operationText && (
            <div className="text-[10px] font-mono text-[#38bdf8] font-extrabold tracking-wider bg-[#06b6d4]/5 px-3 py-1 rounded border border-[#06b6d4]/10 shadow-[0_0_10px_rgba(6,182,212,0.03)] mb-1">
              {operationText}
            </div>
          )}

          <div className="flex items-center gap-3">
            {/* Label 'temp' on the left */}
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1 shrink-0">
              temp
            </span>

            {/* Temp Array columns (Sized larger for clearer visualization) */}
            <div className="flex items-center gap-2.5 select-none h-24">
              {tempArray.map((item, tIdx) => {
                // Determine height/scale for visual comparison (increased to 75% for better visibility)
                const tempHeightPercent = maxValue > 0 ? (item.value / maxValue) * 75 : 0;

                return (
                  <motion.div
                    key={`temp-${item.id}`}
                    layoutId={`temp-item-${item.id}`}
                    className="w-8.5 h-full flex flex-col justify-end items-center relative"
                  >
                    {/* Tiny value text */}
                    <span className="text-[9px] font-mono font-bold text-slate-350 mb-1">
                      {item.value}
                    </span>

                    {/* Compact bar outline */}
                    <div 
                      className="w-full bg-[#161720] border-[1.5px] border-indigo-500/65 rounded-md shadow-[0_0_8px_rgba(99,102,241,0.2)]"
                      style={{ height: `${tempHeightPercent}%` }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
