import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

/**
 * PlaybackControls Component (High Fidelity Redesign with Fullscreen Support)
 * 
 * @param {Object} props
 * @param {boolean} props.isPlaying - Run status
 * @param {Function} props.onPlayPause - Toggle play callback
 * @param {Function} props.onNext - Next step callback
 * @param {Function} props.onPrev - Previous step callback
 * @param {number} props.currentStep - Active step index
 * @param {number} props.totalSteps - Total steps capacity
 * @param {number} props.speed - Delay in ms
 * @param {Function} props.onChangeSpeed - Speed selection callback
 * @param {Function} props.onStepJump - Timeline jump index callback
 * @param {boolean} props.isFullscreen - Fullscreen state flag
 * @param {Function} props.onToggleFullscreen - Fullscreen toggle event callback
 */
export default function PlaybackControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  currentStep,
  totalSteps,
  speed,
  onChangeSpeed,
  onStepJump,
  isFullscreen,
  onToggleFullscreen
}) {
  const speeds = [
    { label: '0.5x', value: 1600 },
    { label: '1.0x', value: 1000 },
    { label: '2.0x', value: 500 },
    { label: '4.0x', value: 250 }
  ];

  const handleScrubberChange = (e) => {
    const targetIdx = Number(e.target.value);
    onStepJump(targetIdx);
  };

  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 flex items-center justify-between gap-5 shadow-2xl relative select-none z-45">
      
      {/* 1. Left controls buttons */}
      <div className="flex items-center gap-2">
        {/* Play / Pause */}
        <button
          onClick={onPlayPause}
          className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer hover:border-cyan-500/30 flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-slate-300" />
          ) : (
            <Play className="w-4 h-4 fill-slate-300 ml-0.5" />
          )}
        </button>

        {/* Previous Step */}
        <button
          onClick={onPrev}
          disabled={currentStep === 0 || isPlaying}
          className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer hover:border-cyan-500/20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Next Step */}
        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1 || isPlaying}
          className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer hover:border-cyan-500/20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Middle Scrubber Timeline */}
      <div className="flex-1 flex items-center gap-4">
        <div className="flex-1 relative flex items-center group">
          <div className="absolute inset-x-0 h-1 bg-slate-800 rounded-full z-0">
            <div 
              className="h-full bg-emerald-400 rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <input
            type="range"
            min={0}
            max={totalSteps > 0 ? totalSteps - 1 : 0}
            value={currentStep}
            disabled={isPlaying}
            onChange={handleScrubberChange}
            className="w-full h-4 opacity-0 z-10 cursor-pointer disabled:cursor-not-allowed relative"
          />
          <div 
            className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-md border-2 border-emerald-500 pointer-events-none transition-all duration-150"
            style={{ 
              left: `calc(${progressPercent}% - 7px)`,
              boxShadow: '0 0 8px rgba(52, 211, 153, 0.6)'
            }}
          ></div>
        </div>

        {/* Step Ratio Indicator */}
        <span className="font-mono text-xs text-slate-500 shrink-0 select-none">
          <span className="text-slate-300 font-bold">{totalSteps > 0 ? currentStep + 1 : 0}</span>
          <span className="px-1 text-slate-650">/</span>
          <span>{totalSteps}</span>
        </span>
      </div>

      {/* 3. Right control decks */}
      <div className="flex items-center gap-2">
        <select
          value={speed}
          onChange={(e) => onChangeSpeed(Number(e.target.value))}
          className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
        >
          {speeds.map((s) => (
            <option key={s.label} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Fullscreen Button Toggle */}
        <button 
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 transition-all active:scale-95 cursor-pointer hover:border-cyan-500/20"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
}
