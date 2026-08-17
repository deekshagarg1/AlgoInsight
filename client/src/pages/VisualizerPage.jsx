import React from 'react';
import { generateBubbleSortSteps } from '../engine/algorithms/bubbleSort';
import BarVisualizer from '../components/BarVisualizer';
import PlaybackControls from '../components/PlaybackControls';
import VisualizerInput from '../components/VisualizerInput';
import CodePanel from '../components/CodePanel';
import { Bookmark } from 'lucide-react';

/**
 * VisualizerPage Component (High Fidelity with Fullscreen Support)
 * 
 * Arranges the split view:
 * - Left panel: Interactive Code highlight panel
 * - Right panel: Dataset Input panel + Visualizer Canvas + Details Card
 * - Footer panel: Timeline player deck
 */
export default function VisualizerPage() {
  const [array, setArray] = React.useState([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = React.useState([]);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(1600); // 0.5x (1600ms delay)
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Reference container for HTML5 Fullscreen API
  const containerRef = React.useRef(null);

  // Recalculate steps whenever array changes
  React.useEffect(() => {
    const generatedSteps = generateBubbleSortSteps(array);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [array]);

  // Timer loop
  React.useEffect(() => {
    let timer = null;

    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prevIdx) => {
          if (prevIdx >= steps.length - 1) {
            setIsPlaying(false);
            return prevIdx;
          }
          return prevIdx + 1;
        });
      }, speed);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps, speed]);

  // Monitor fullscreen change events (e.g. Esc button presses)
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleStepJump = (idx) => {
    if (idx >= 0 && idx < steps.length) {
      setCurrentStepIndex(idx);
    }
  };

  const handleGenerateArray = (newArray) => {
    setArray(newArray);
  };

  // Fullscreen toggle logic
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error("Could not trigger fullscreen:", err));
    } else {
      document.exitFullscreen();
    }
  };

  const currentStep = steps[currentStepIndex] || {
    array: array.map((val, idx) => ({ id: `init-${val}-${idx}`, value: val })),
    type: 'INITIAL',
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Setting up array...',
    operationText: ''
  };

  return (
    <div 
      ref={containerRef} 
      className={`w-full flex flex-col gap-4 text-left relative bg-slate-950 ${
        isFullscreen ? 'p-8 overflow-y-auto h-screen w-full' : 'max-w-5xl mx-auto pb-28'
      }`}
    >
      
      {/* Top Header Deck */}
      <div className="flex justify-between items-center w-full border-b border-[#20212b]/40 pb-2.5 mb-1">
        <h1 className="text-lg sm:text-xl font-bold text-slate-200 tracking-tight m-0 font-sans">
          Bubble Sort
        </h1>
        <button className="px-3.5 py-1.5 rounded-xl bg-[#161720] border border-slate-800 text-[11px] font-semibold text-slate-350 hover:text-white flex items-center gap-1.5 cursor-pointer transition-all active:scale-95">
          <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
          Bookmark
        </button>
      </div>

      {/* Main Two-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: CodePanel */}
        <div className="lg:col-span-5 h-full">
          <CodePanel highlightedLines={currentStep.highlightedLines} />
        </div>

        {/* Right Column: Visualizer Canvas + Inputs */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          {/* Input control panels */}
          <VisualizerInput
            array={array}
            onGenerateArray={handleGenerateArray}
            disabled={isPlaying}
          />

          {/* Bar Visual Canvas */}
          <BarVisualizer
            array={currentStep.array}
            stepType={currentStep.type}
            activeIndices={currentStep.indices}
            sortedIndices={currentStep.sortedIndices}
            pass={currentStep.pass}
            swapped={currentStep.swapped}
            operationText={currentStep.operationText}
          />

          {/* Bottom Step explanation banner with left solid emerald line indicator */}
          <div className="w-full bg-slate-950 border border-slate-900 rounded-xl p-4 flex items-center gap-3 relative shadow-inner overflow-hidden">
            <div className="absolute left-0 inset-y-0 w-1 bg-emerald-400"></div>
            <span className="font-mono text-xs text-slate-500 font-bold uppercase shrink-0 pl-1">
              Step:
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-350 leading-relaxed font-sans">
              {currentStep.explanation}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Sticky Player Deck Controls */}
      <div className={`${isFullscreen ? 'mt-auto pt-6 w-full' : 'fixed bottom-6 inset-x-4 max-w-5xl mx-auto z-45'}`}>
        <PlaybackControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          speed={speed}
          onChangeSpeed={setSpeed}
          onStepJump={handleStepJump}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>

    </div>
  );
}
