import React from 'react';
import { generateBubbleSortSteps } from '../engine/algorithms/bubbleSort';
import { generateSelectionSortSteps } from '../engine/algorithms/selectionSort';
import { generateInsertionSortSteps } from '../engine/algorithms/insertionSort';
import { generateMergeSortSteps } from '../engine/algorithms/mergeSort';
import { generateCountingSortSteps } from '../engine/algorithms/countingSort';
import { generateQuickSortSteps } from '../engine/algorithms/quickSort';
import { generateHeapSortSteps } from '../engine/algorithms/heapSort';
import { generateRadixSortSteps } from '../engine/algorithms/radixSort';
import { generateLinearSearchSteps } from '../engine/algorithms/linearSearch';
import { generateBinarySearchSteps } from '../engine/algorithms/binarySearch';
import { generateEightPuzzleSteps } from '../engine/algorithms/eightPuzzle';
import { generateLinkedListOpSteps } from '../engine/algorithms/linkedListOps';
import { generateStackOpSteps } from '../engine/algorithms/stackOps';
import { generateQueueOpSteps } from '../engine/algorithms/queueOps';
import { generateTreeOpSteps } from '../engine/algorithms/treeOps';
import { generateGraphOpSteps } from '../engine/algorithms/graphOps';

import BarVisualizer from '../components/BarVisualizer';
import GridVisualizer from '../components/GridVisualizer';
import SearchVisualizer from '../components/SearchVisualizer';
import LinkedListVisualizer from '../components/LinkedListVisualizer';
import StackVisualizer from '../components/StackVisualizer';
import QueueVisualizer from '../components/QueueVisualizer';
import TreeVisualizer from '../components/TreeVisualizer';
import GraphVisualizer from '../components/GraphVisualizer';
import ComplexityPanel from '../components/ComplexityPanel';

import PlaybackControls from '../components/PlaybackControls';
import VisualizerInput from '../components/VisualizerInput';
import CodePanel from '../components/CodePanel';
import { Bookmark } from 'lucide-react';

import { BUBBLE_SORT_CODE } from '../data/bubbleSortCode';
import { SELECTION_SORT_CODE } from '../data/selectionSortCode';
import { INSERTION_SORT_CODE } from '../data/insertionSortCode';
import { ALL_ALGORITHM_CODES } from '../data/allAlgorithmCodes';

export default function VisualizerPage({ selectedAlgoId = 'bubble-sort' }) {
  const [array, setArray] = React.useState([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = React.useState([]);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(1600);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [apiCodeData, setApiCodeData] = React.useState(null);
  const [target, setTarget] = React.useState(22);

  const containerRef = React.useRef(null);

  // Fetch algorithm code snippet from backend on select
  React.useEffect(() => {
    let active = true;
    const fetchCode = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/algorithms/${selectedAlgoId}`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        if (active && data && data.code) {
          setApiCodeData(data.code);
        }
      } catch (err) {
        if (active) {
          setApiCodeData(null);
        }
      }
    };

    fetchCode();
    return () => { active = false; };
  }, [selectedAlgoId]);

  // Comprehensive Algo Map
  const algoMeta = {
    'bubble-sort': { name: 'Bubble Sort', engine: generateBubbleSortSteps, code: BUBBLE_SORT_CODE, type: 'bar' },
    'selection-sort': { name: 'Selection Sort', engine: generateSelectionSortSteps, code: SELECTION_SORT_CODE, type: 'bar' },
    'insertion-sort': { name: 'Insertion Sort', engine: generateInsertionSortSteps, code: INSERTION_SORT_CODE, type: 'bar' },
    'merge-sort': { name: 'Merge Sort', engine: generateMergeSortSteps, code: ALL_ALGORITHM_CODES?.['bubble-sort'] || BUBBLE_SORT_CODE, type: 'bar' },
    'quick-sort': { name: 'Quick Sort', engine: generateQuickSortSteps, code: ALL_ALGORITHM_CODES?.['quick-sort'] || BUBBLE_SORT_CODE, type: 'bar' },
    'heap-sort': { name: 'Heap Sort', engine: generateHeapSortSteps, code: ALL_ALGORITHM_CODES?.['quick-sort'] || BUBBLE_SORT_CODE, type: 'bar' },
    'counting-sort': { name: 'Counting Sort', engine: generateCountingSortSteps, code: ALL_ALGORITHM_CODES?.['bubble-sort'] || BUBBLE_SORT_CODE, type: 'bar' },
    'radix-sort': { name: 'Radix Sort', engine: generateRadixSortSteps, code: ALL_ALGORITHM_CODES?.['bubble-sort'] || BUBBLE_SORT_CODE, type: 'bar' },
    'linear-search': { name: 'Linear Search', engine: (arr, tgt) => generateLinearSearchSteps(arr, tgt ?? target), code: ALL_ALGORITHM_CODES?.['binary-search'] || BUBBLE_SORT_CODE, type: 'search' },
    'binary-search': { name: 'Binary Search', engine: (arr, tgt) => generateBinarySearchSteps(arr, tgt ?? target), code: ALL_ALGORITHM_CODES?.['binary-search'] || BUBBLE_SORT_CODE, type: 'search' },
    'eight-puzzle': { name: '8-Puzzle Solver', engine: generateEightPuzzleSteps, code: { java: [], cpp: [], python: [] }, type: 'eight-puzzle' },
    'ds-linked-list': { name: 'Linked List Traversals', engine: () => generateLinkedListOpSteps([10, 20, 30, 40], 'traverse'), code: BUBBLE_SORT_CODE, type: 'linked-list' },
    'ds-stack': { name: 'Stack (LIFO)', engine: () => generateStackOpSteps([10, 20, 30], 'push', 40), code: BUBBLE_SORT_CODE, type: 'stack' },
    'ds-queue': { name: 'Queue (FIFO)', engine: () => generateQueueOpSteps([10, 20, 30], 'enqueue', 40), code: BUBBLE_SORT_CODE, type: 'queue' },
    'ds-tree': { name: 'Binary Search Tree (BST)', engine: () => generateTreeOpSteps(null, 'inorder'), code: BUBBLE_SORT_CODE, type: 'tree' },
    'ds-graph': { name: 'Graph BFS & DFS', engine: () => generateGraphOpSteps('bfs', 'A'), code: BUBBLE_SORT_CODE, type: 'graph' },
  };

  const currentAlgo = algoMeta[selectedAlgoId] || algoMeta['bubble-sort'];

  React.useEffect(() => {
    if (selectedAlgoId === 'counting-sort') {
      setArray([4, 2, 2, 8, 3, 3, 1]);
    } else if (selectedAlgoId === 'linear-search') {
      setArray([12, 34, 25, 11, 22, 90, 64]);
      setTarget(22);
    } else if (selectedAlgoId === 'binary-search') {
      setArray([11, 12, 22, 25, 34, 64, 90]);
      setTarget(25);
    } else if (selectedAlgoId === 'eight-puzzle') {
      setArray([1, 2, 3, 0, 4, 6, 7, 5, 8]);
    } else if (selectedAlgoId === 'radix-sort') {
      setArray([170, 45, 75, 90, 802, 24, 2]);
    } else {
      setArray([64, 34, 25, 12, 22, 11, 90]);
    }
  }, [selectedAlgoId]);

  React.useEffect(() => {
    if (selectedAlgoId === 'counting-sort' && array.some(v => v > 9)) {
      return;
    }
    const generatedSteps = currentAlgo.engine(array, target);
    setSteps(generatedSteps || []);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [array, target, selectedAlgoId]);

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
    return () => { if (timer) clearInterval(timer); };
  }, [isPlaying, steps, speed]);

  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) setCurrentStepIndex(0);
    setIsPlaying(!isPlaying);
  };
  const handleNext = () => { setIsPlaying(false); if (currentStepIndex < steps.length - 1) setCurrentStepIndex(p => p + 1); };
  const handlePrev = () => { setIsPlaying(false); if (currentStepIndex > 0) setCurrentStepIndex(p => p - 1); };
  const handleStepJump = (idx) => { setIsPlaying(false); if (idx >= 0 && idx < steps.length) setCurrentStepIndex(idx); };

  const currentStep = steps[currentStepIndex] || {
    array: array.map((val, idx) => ({ id: `init-${val}-${idx}`, value: val })),
    type: 'INITIAL',
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    explanation: 'Setting up visualization canvas...',
    operationText: ''
  };

  const renderCanvas = () => {
    if (currentAlgo.type === 'eight-puzzle') {
      return (
        <GridVisualizer
          array={currentStep.array}
          sortedIndices={currentStep.sortedIndices}
          i={currentStep.i !== undefined ? currentStep.i : -1}
          j={currentStep.j !== undefined ? currentStep.j : -1}
          operationText={currentStep.operationText}
          explanation={currentStep.explanation}
        />
      );
    }
    if (currentAlgo.type === 'search') {
      return (
        <SearchVisualizer
          array={currentStep.array || []}
          stepType={currentStep.type}
          target={currentStep.target || target}
          currentIndex={currentStep.currentIndex}
          foundIndex={currentStep.foundIndex}
          low={currentStep.low}
          high={currentStep.high}
          mid={currentStep.mid}
          comparisons={currentStep.comparisons || 0}
          operationText={currentStep.operationText}
        />
      );
    }
    if (currentAlgo.type === 'linked-list') {
      return (
        <LinkedListVisualizer
          nodes={currentStep.nodes || []}
          activeIdx={currentStep.activeIdx}
          operationText={currentStep.operationText}
        />
      );
    }
    if (currentAlgo.type === 'stack') {
      return (
        <StackVisualizer
          stack={currentStep.stack || []}
          topIdx={currentStep.topIdx}
          operationText={currentStep.operationText}
        />
      );
    }
    if (currentAlgo.type === 'queue') {
      return (
        <QueueVisualizer
          queue={currentStep.queue || []}
          frontIdx={currentStep.frontIdx}
          rearIdx={currentStep.rearIdx}
          operationText={currentStep.operationText}
        />
      );
    }
    if (currentAlgo.type === 'tree') {
      return (
        <TreeVisualizer
          nodes={currentStep.nodes || []}
          visited={currentStep.visited || []}
          currentNode={currentStep.currentNode}
          foundNode={currentStep.foundNode}
          operationText={currentStep.operationText}
        />
      );
    }
    if (currentAlgo.type === 'graph') {
      return (
        <GraphVisualizer
          nodes={currentStep.nodes || []}
          edges={currentStep.edges || []}
          visited={currentStep.visited || []}
          currentNode={currentStep.currentNode}
          activeEdge={currentStep.activeEdge}
          queueStackState={currentStep.queueStackState}
          distances={currentStep.distances}
          operationText={currentStep.operationText}
        />
      );
    }

    return (
      <BarVisualizer
        array={currentStep.array || []}
        stepType={currentStep.type}
        activeIndices={currentStep.indices}
        sortedIndices={currentStep.sortedIndices}
        pass={currentStep.pass}
        swapped={currentStep.type === 'SORTED' || currentStep.swapped}
        operationText={currentStep.operationText}
        minIdx={currentStep.minIdx !== undefined ? currentStep.minIdx : -1}
        algoId={selectedAlgoId}
        i={currentStep.i !== undefined ? currentStep.i : -1}
        j={currentStep.j !== undefined ? currentStep.j : -1}
        keyValue={selectedAlgoId === 'linear-search' || selectedAlgoId === 'binary-search' ? target : (currentStep.keyValue !== undefined ? currentStep.keyValue : -1)}
        tempArray={currentStep.tempArray || []}
        depth={currentStep.depth || 0}
        leftRange={currentStep.leftRange || []}
        rightRange={currentStep.rightRange || []}
        countArray={currentStep.countArray || []}
        outputArray={currentStep.outputArray || []}
        phase={currentStep.phase || ''}
        valuesRange={currentStep.valuesRange || []}
        activeArrIdx={currentStep.activeArrIdx !== undefined ? currentStep.activeArrIdx : -1}
        activeCountIdx={currentStep.activeCountIdx !== undefined ? currentStep.activeCountIdx : -1}
        activeOutputIdx={currentStep.activeOutputIdx !== undefined ? currentStep.activeOutputIdx : -1}
      />
    );
  };

  return (
    <div 
      ref={containerRef} 
      className={`w-full flex flex-col gap-4 text-left relative bg-slate-950 ${
        isFullscreen ? 'p-8 overflow-y-auto h-screen w-full' : 'max-w-5xl mx-auto pb-28'
      }`}
    >
      <div className="flex justify-between items-center w-full border-b border-[#20212b]/40 pb-2.5 mb-1">
        <h1 className="text-lg sm:text-xl font-bold text-slate-200 tracking-tight m-0 font-sans">
          {currentAlgo.name} Visualizer
        </h1>
        <button className="px-3.5 py-1.5 rounded-xl bg-[#161720] border border-slate-800 text-[11px] font-semibold text-slate-350 hover:text-white flex items-center gap-1.5 cursor-pointer transition-all active:scale-95">
          <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
          Bookmark Topic
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-5 h-full flex flex-col min-h-0">
          <CodePanel 
            highlightedLines={currentStep.highlightedLines} 
            isLoopFalse={currentStep.isLoopFalse} 
            codeData={apiCodeData || currentAlgo.code} 
          />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
          <VisualizerInput
            array={array}
            onGenerateArray={setArray}
            disabled={isPlaying}
            selectedAlgoId={selectedAlgoId}
            target={target}
            onTargetChange={setTarget}
          />

          {renderCanvas()}

          <div className="w-full bg-slate-950 border border-slate-900 rounded-xl p-4 flex items-center gap-3 relative shadow-inner overflow-hidden mt-2">
            <div className="absolute left-0 inset-y-0 w-1 bg-emerald-400"></div>
            <span className="font-mono text-xs text-slate-500 font-bold uppercase shrink-0 pl-1">
              Step:
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-350 leading-relaxed font-sans m-0">
              {currentStep.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Complexity Analysis Panel Section */}
      <div className="w-full mt-4">
        <ComplexityPanel algoId={selectedAlgoId} />
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
          onToggleFullscreen={() => {
            if (!containerRef.current) return;
            if (!document.fullscreenElement) containerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
            else document.exitFullscreen();
          }}
        />
      </div>
    </div>
  );
}

