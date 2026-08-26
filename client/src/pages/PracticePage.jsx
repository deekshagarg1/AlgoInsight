import React from 'react';
import { Brain, Trophy, ChevronRight, ArrowLeft, Check, X, HelpCircle, RefreshCw, Flame, Award, Sparkles, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const QUIZ_CATEGORIES = [
  {
    id: 'complexity',
    title: 'Complexity Analysis',
    desc: 'Test your understanding of Big-O notations, space limits, and execution thresholds.',
    iconColor: 'text-cyan-400',
    color: 'from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/15',
    questions: [
      {
        id: 'comp-1',
        q: "What is the worst-case time complexity of searching for an element in a Singly Linked List of size N?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        correctIdx: 2,
        explanation: "Because singly linked lists do not store contiguous index locations, we cannot calculate index offsets directly. We must walk sequentially from node to node, which takes O(N) linear time in the worst case."
      },
      {
        id: 'comp-2',
        q: "If an algorithm splits its input size in half at each step (e.g. Binary Search), what is its time complexity?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctIdx: 1,
        explanation: "Halving the input size at each iteration represents a logarithmic division curve, yielding a time complexity of O(log N)."
      },
      {
        id: 'comp-3',
        q: "Which data structure has O(1) direct access lookup but requires contiguous memory allocation?",
        options: ["Singly Linked List", "Stack", "Array", "Binary Search Tree"],
        correctIdx: 2,
        explanation: "Arrays store elements consecutively in memory, allowing index-based memory offset calculations which run in constant O(1) time."
      },
      {
        id: 'comp-4',
        q: "What is the worst-case space complexity of recursive Merge Sort on an array of size N?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctIdx: 2,
        explanation: "Merge Sort requires an auxiliary array of size O(N) to temporarily hold merged elements before copying them back, yielding linear space complexity."
      },
      {
        id: 'comp-5',
        q: "Which Big-O runtime represents the slowest growth rate (fastest execution) for large N?",
        options: ["O(N log N)", "O(N)", "O(2^N)", "O(log N)"],
        correctIdx: 3,
        explanation: "O(log N) represents a logarithmic curve, which grows extremely slowly compared to linear O(N), log-linear O(N log N), or exponential O(2^N)."
      }
    ]
  },
  {
    id: 'searching',
    title: 'Searching Traces',
    desc: 'Test your understanding of Sequential Scans, bounds narrowing, and log-halving checks.',
    iconColor: 'text-amber-400',
    color: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/15',
    questions: [
      {
        id: 'search-1',
        q: "For a sorted array of size 8, what is the maximum number of comparisons needed to locate or verify any target element using Binary Search?",
        options: ["3 comparisons", "4 comparisons", "8 comparisons", "1 comparison"],
        correctIdx: 1,
        explanation: "In the worst case, Binary Search divides the range of size N in half repeatedly. The maximum comparisons is calculated as: floor(log2(N)) + 1. For N=8, log2(8)=3, plus 1 yields at most 4 comparisons."
      },
      {
        id: 'search-2',
        q: "What is the consequence of running Binary Search on an unsorted array?",
        options: [
          "The search always crashes with a memory segmentation fault",
          "The search works correctly but runs in slower O(N) time",
          "The search may fail to find elements that exist in the array",
          "The array is automatically sorted in the background"
        ],
        correctIdx: 2,
        explanation: "Because Binary Search relies on order to determine whether to ignore the left or right half, an unsorted array violates this logic, causing it to discard the wrong half and fail to locate existing elements."
      },
      {
        id: 'search-3',
        q: "In Binary Search, if target = 15, arr[mid] = 20, and the array is sorted in ascending order, how are the bounds updated?",
        options: [
          "low = mid + 1",
          "high = mid - 1",
          "high = mid",
          "low = mid"
        ],
        correctIdx: 1,
        explanation: "Since the middle element (20) is greater than the target (15), the target must lie in the left half of the ascending sorted array. Thus, we update the right bound: high = mid - 1."
      },
      {
        id: 'search-4',
        q: "What is the average-case time complexity of searching for an element in an unsorted array of size N?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        correctIdx: 2,
        explanation: "Because the array is unsorted, we cannot perform Binary Search. We must perform a Linear Search scan, which has an average-case runtime of O(N)."
      },
      {
        id: 'search-5',
        q: "In Binary Search, how is the index 'mid' calculated to avoid integer overflow in languages like C++ or Java?",
        options: [
          "mid = (low + high) / 2",
          "mid = low + (high - low) / 2",
          "mid = high - (high + low) / 2",
          "mid = (low + high) >> 2"
        ],
        correctIdx: 1,
        explanation: "Writing mid = low + (high - low)/2 mathematically yields the same result as (low + high)/2 but prevents integer overflow if the sum of low and high exceeds the maximum integer limit."
      }
    ]
  },
  {
    id: 'sorting',
    title: 'Sorting Traces',
    desc: 'Predict array states after passes of Bubble, Selection, and Insertion sorts.',
    iconColor: 'text-indigo-400',
    color: 'from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/15',
    questions: [
      {
        id: 'sort-1',
        q: "Given the array [4, 1, 3], what is its state after the FIRST complete pass of Bubble Sort (bubbling largest to end)?",
        options: ["[1, 3, 4]", "[4, 1, 3]", "[1, 4, 3]", "[3, 1, 4]"],
        correctIdx: 0,
        explanation: "Bubble Sort compares A[0] (4) and A[1] (1), swaps them: A becomes [1, 4, 3]. Then compares A[1] (4) and A[2] (3), swaps them: A becomes [1, 3, 4]. Pass 1 is complete and the largest element (4) has successfully bubbled to the end."
      },
      {
        id: 'sort-2',
        q: "Which sorting algorithm does not perform element comparisons?",
        options: ["Selection Sort", "Merge Sort", "Counting Sort", "Insertion Sort"],
        correctIdx: 2,
        explanation: "Counting Sort is a non-comparison sorting algorithm that sorts in O(N + K) linear time by counting the occurrences of values and calculating prefix sum indexes."
      },
      {
        id: 'sort-3',
        q: "What is the worst-case time complexity of Selection Sort?",
        options: ["O(N)", "O(N log N)", "O(N²)", "O(1)"],
        correctIdx: 2,
        explanation: "Selection Sort always runs in quadratic O(N²) time because it scans the unsorted subarray to find the minimum element in every pass, regardless of the initial array order."
      },
      {
        id: 'sort-4',
        q: "Which sorting algorithm splits the input array recursively and requires O(N) extra memory space?",
        options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
        correctIdx: 2,
        explanation: "Merge Sort uses a divide-and-conquer strategy, partitioning the array in halves recursively. It requires O(N) auxiliary space to merge sorted runs."
      },
      {
        id: 'sort-5',
        q: "What is the best-case time complexity of Insertion Sort when the array is already sorted?",
        options: ["O(1)", "O(N)", "O(N log N)", "O(N²)"],
        correctIdx: 1,
        explanation: "If the array is already sorted, Insertion Sort checks each element but does not perform any inner loop shifting, yielding a linear O(N) runtime."
      }
    ]
  },
  {
    id: 'structures',
    title: 'Linear Restraints',
    desc: 'Verify pointer transitions in Stacks, Queues, and Linked List structures.',
    iconColor: 'text-pink-400',
    color: 'from-pink-500/10 via-pink-500/5 to-transparent border-pink-500/15',
    questions: [
      {
        id: 'struct-1',
        q: "In a Singly Linked List, to insert a newNode AFTER a given node called prev, which pointers assignment is correct?",
        options: [
          "prev.next = newNode; newNode.next = prev.next;",
          "newNode.next = prev.next; prev.next = newNode;",
          "newNode.next = prev; prev.next = newNode.next;",
          "prev.next = newNode.next; newNode.next = prev."
        ],
        correctIdx: 1,
        explanation: "To prevent losing the rest of the list, newNode must point to the successor node first (newNode.next = prev.next). Once linked, prev can point to newNode (prev.next = newNode)."
      },
      {
        id: 'struct-2',
        q: "A Queue is implemented using a circular array of size 8. If Rear is at index 7, where will the next Enqueue write?",
        options: ["Index 8", "Index 6", "Index 0", "It will throw an overflow error"],
        correctIdx: 2,
        explanation: "Circular queues wrap index limits using modulo arithmetic: (Rear + 1) % Capacity = (7 + 1) % 8 = 0. The next element is written at index 0."
      },
      {
        id: 'struct-3',
        q: "If elements 10, 20, 30 are enqueued in a Queue, and then dequeue is called once, what element is popped?",
        options: ["30", "20", "10", "Null"],
        correctIdx: 2,
        explanation: "Queues operate on a First-In, First-Out (FIFO) basis. The element added first (10) is the first to be dequeued."
      },
      {
        id: 'struct-4',
        q: "Which data structure follows the Last-In, First-Out (LIFO) access restriction?",
        options: ["Singly Linked List", "Queue", "Stack", "Array"],
        correctIdx: 2,
        explanation: "A Stack restricts insertions and deletions to the top element, following the Last-In, First-Out (LIFO) access rule."
      },
      {
        id: 'struct-5',
        q: "A queue is implemented using a circular array of size 5. If Front is at index 2 and Rear is at index 4, how many elements are in the queue?",
        options: ["2", "3", "4", "5"],
        correctIdx: 1,
        explanation: "The elements are located at indexes 2, 3, and 4. The count is calculated as: Rear - Front + 1 = 4 - 2 + 1 = 3."
      }
    ]
  },
  {
    id: 'graphs',
    title: 'Graph & Tree Traversals',
    desc: 'Verify BFS Queue ordering, DFS Stack exploration, and Binary Search Tree properties.',
    iconColor: 'text-amber-400',
    color: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/15',
    questions: [
      {
        id: 'graph-1',
        q: "Which data structure is used to implement Breadth-First Search (BFS) on a graph?",
        options: ["Stack", "Queue", "Priority Queue", "Array"],
        correctIdx: 1,
        explanation: "Breadth-First Search (BFS) explores graph nodes layer by layer using a Queue (FIFO) buffer."
      },
      {
        id: 'graph-2',
        q: "What is the time complexity of Inorder Traversal on a Binary Search Tree with N nodes?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        correctIdx: 2,
        explanation: "Inorder traversal visits every node in the tree exactly once, taking O(N) linear time."
      },
      {
        id: 'graph-3',
        q: "Which graph algorithm calculates shortest paths from a single source node in weighted graphs with non-negative edge weights?",
        options: ["Kruskal's Algorithm", "Dijkstra's Algorithm", "Prim's Algorithm", "Depth-First Search"],
        correctIdx: 1,
        explanation: "Dijkstra's algorithm uses greedy edge relaxation to find shortest paths from a single source node."
      }
    ]
  }
];

export default function PracticePage({ onOpenAuth }) {
  const { user } = React.useContext(AuthContext);
  const [activeCategory, setActiveCategory] = React.useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = React.useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);

  // High scores tracking inside LocalStorage
  const [highScores, setHighScores] = React.useState(() => {
    try {
      const saved = localStorage.getItem('algoinsight_high_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Daily Streak tracking inside LocalStorage
  const [streak, setStreak] = React.useState(() => {
    try {
      const saved = localStorage.getItem('algoinsight_streak');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const handleSelectCategory = (catId) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setActiveCategory(catId);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setQuizCompleted(false);
    setShowConfetti(false);
  };

  const handleSubmitAnswer = (correctIdx) => {
    if (selectedOption === null || isAnswerSubmitted) return;
    
    setIsAnswerSubmitted(true);
    const correct = selectedOption === correctIdx;
    if (correct) {
      setCorrectAnswersCount(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleNextQuestion = (totalQuestions) => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      
      // Update High Scores
      const finalScore = correctAnswersCount + (selectedOption === QUIZ_CATEGORIES.find(c => c.id === activeCategory).questions[currentQuestionIdx].correctIdx ? 1 : 0);
      setHighScores(prev => {
        const currentHighScore = prev[activeCategory] || 0;
        const newHighScore = Math.max(currentHighScore, finalScore);
        const updated = { ...prev, [activeCategory]: newHighScore };
        localStorage.setItem('algoinsight_high_scores', JSON.stringify(updated));
        return updated;
      });

      // Increment Streak if score is perfect
      if (finalScore === totalQuestions) {
        setStreak(prev => {
          const newStreak = prev + 1;
          localStorage.setItem('algoinsight_streak', newStreak.toString());
          return newStreak;
        });
        setShowConfetti(true);
      }
    }
  };

  if (activeCategory) {
    const category = QUIZ_CATEGORIES.find(c => c.id === activeCategory);
    const question = category.questions[currentQuestionIdx];
    const totalQuestions = category.questions.length;
    const progressPercent = ((currentQuestionIdx + 1) / totalQuestions) * 100;

    if (quizCompleted) {
      const percentage = Math.round((correctAnswersCount / totalQuestions) * 100);
      const isPerfect = correctAnswersCount === totalQuestions;
      
      return (
        <div className="w-full flex flex-col gap-6 text-left max-w-2xl mx-auto py-6 relative min-h-[400px] justify-center items-center">
          {/* Confetti Animation keyframes */}
          <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translateY(450px) rotate(360deg); opacity: 0; }
            }
          `}</style>

          {/* Confetti Explosion Layer */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
              {Array.from({ length: 45 }).map((_, idx) => {
                const randomLeft = Math.random() * 100;
                const randomDelay = Math.random() * 1.2;
                const randomDuration = 1.4 + Math.random() * 1.4;
                const randomColor = ['#ffa116', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)];
                const randomSize = 6 + Math.random() * 8;
                return (
                  <div
                    key={idx}
                    className="absolute animate-[confetti-fall_2.5s_linear_infinite]"
                    style={{
                      left: `${randomLeft}%`,
                      width: `${randomSize}px`,
                      height: `${randomSize}px`,
                      backgroundColor: randomColor,
                      borderRadius: idx % 2 === 0 ? '50%' : '0%',
                      animationDelay: `${randomDelay}s`,
                      animationDuration: `${randomDuration}s`,
                      top: '-20px'
                    }}
                  />
                );
              })}
            </div>
          )}

          <div className="w-full bg-[#282828] border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
            {/* Glow header details */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#ffa116]/25 to-transparent"></div>
            
            <Trophy className={`w-14 h-14 mb-4 ${isPerfect ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
            
            <span className="text-[10px] font-bold font-mono tracking-widest text-[#ffa116] uppercase">Quiz Complete</span>
            <h2 className="text-xl font-black text-slate-200 mt-1">
              {isPerfect ? 'Perfect Score!' : 'Well Played!'}
            </h2>
            <p className="text-xs text-slate-450 mt-1 max-w-xs leading-relaxed">
              {isPerfect 
                ? 'Excellent! You have mastered this concept and extended your streak!' 
                : 'Great effort! Read the lesson explanations to clean up mistakes.'}
            </p>

            <div className="flex gap-6 mt-6 items-center">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Score</span>
                <span className="text-xl font-black font-mono text-slate-200 mt-0.5">{correctAnswersCount} / {totalQuestions}</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-850"></div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Accuracy</span>
                <span className="text-xl font-black font-mono text-slate-200 mt-0.5">{percentage}%</span>
              </div>
            </div>

            <div className="flex gap-3 w-full mt-8">
              <button
                onClick={() => handleSelectCategory(activeCategory)}
                className="flex-1 py-3 bg-[#1a1a1a] hover:bg-[#202020] border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Try Again
              </button>
              <button
                onClick={() => setActiveCategory(null)}
                className="flex-1 py-3 bg-[#ffa116] hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer active:scale-95 transition-all border-none font-sans"
              >
                Practice Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col gap-5 text-left max-w-2xl mx-auto py-4 relative min-h-[460px]">
        {/* Confetti Fall Keyframes */}
        <style>{`
          @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(450px) rotate(360deg); opacity: 0; }
          }
        `}</style>

        {/* Confetti Explosion Layer */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {Array.from({ length: 25 }).map((_, idx) => {
              const randomLeft = Math.random() * 100;
              const randomDelay = Math.random() * 0.8;
              const randomDuration = 1.2 + Math.random() * 1.2;
              const randomColor = ['#ffa116', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)];
              const randomSize = 6 + Math.random() * 6;
              return (
                <div
                  key={idx}
                  className="absolute animate-[confetti-fall_2s_linear_infinite]"
                  style={{
                    left: `${randomLeft}%`,
                    width: `${randomSize}px`,
                    height: `${randomSize}px`,
                    backgroundColor: randomColor,
                    borderRadius: idx % 2 === 0 ? '50%' : '0%',
                    animationDelay: `${randomDelay}s`,
                    animationDuration: `${randomDuration}s`,
                    top: '-20px'
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Active Quiz Header */}
        <div className="flex justify-between items-center w-full border-b border-[#383838]/60 pb-3 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveCategory(null)}
              className="p-2 rounded-xl bg-[#282828] border border-slate-800 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#ffa116] uppercase">{category.title}</span>
              <h1 className="text-sm font-bold text-slate-200 tracking-tight m-0 mt-0.5">
                Question {currentQuestionIdx + 1} of {totalQuestions}
              </h1>
            </div>
          </div>
        </div>

        {/* Progress bar indicator */}
        <div className="w-full h-1 bg-slate-900 border border-slate-800/40 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#ffa116] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Board Card */}
        <div className="bg-[#282828] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
          
          <div className="flex gap-2">
            <HelpCircle className="w-4 h-4 text-[#ffa116] shrink-0 mt-0.5" />
            <p className="font-semibold text-sm text-slate-200 leading-relaxed">
              {question.q}
            </p>
          </div>

          {/* Options Button List */}
          <div className="flex flex-col gap-2.5 mt-2">
            {question.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = oIdx === question.correctIdx;
              
              let btnClasses = 'bg-[#1a1a1a]/40 border-slate-850 text-slate-450 hover:border-slate-800 hover:text-slate-300';
              
              if (isSelected) {
                btnClasses = 'bg-amber-500/10 border-[#ffa116]/40 text-amber-400';
              }

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnClasses = 'bg-emerald-500/15 border-emerald-500/45 text-emerald-400 font-bold';
                } else if (isSelected) {
                  btnClasses = 'bg-rose-500/15 border-rose-500/45 text-rose-450 font-bold';
                } else {
                  btnClasses = 'bg-transparent border-slate-900 text-slate-600 opacity-40 cursor-not-allowed';
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={isAnswerSubmitted}
                  onClick={() => setSelectedOption(oIdx)}
                  className={`w-full px-4 py-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${
                    isAnswerSubmitted ? 'cursor-not-allowed' : 'cursor-pointer active:scale-[0.99]'
                  } ${btnClasses}`}
                >
                  <span>{opt}</span>
                  {isAnswerSubmitted && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-450 stroke-[3]" />}
                  {isAnswerSubmitted && isSelected && !isCorrect && <X className="w-3.5 h-3.5 text-rose-400 stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {/* Explanations block upon submission */}
          {isAnswerSubmitted && (
            <div className="p-3.5 rounded-xl border bg-[#1a1a1a]/40 border-slate-850 text-xs leading-relaxed text-slate-400 mt-2 flex flex-col gap-1">
              <span className="font-extrabold uppercase font-mono text-[9px] text-[#ffa116] tracking-wider">Explanation</span>
              <span>{question.explanation}</span>
            </div>
          )}

          {/* Submit/Next Trigger CTA button */}
          <div className="flex justify-end gap-2.5 mt-3 border-t border-slate-900 pt-4">
            {!isAnswerSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={() => handleSubmitAnswer(question.correctIdx)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-none ${
                  selectedOption === null 
                    ? 'bg-[#1a1a1a] text-slate-600 cursor-not-allowed' 
                    : 'bg-[#ffa116] hover:bg-amber-400 text-slate-950 cursor-pointer active:scale-95'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => handleNextQuestion(totalQuestions)}
                className="px-5 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold cursor-pointer active:scale-95 transition-all border border-slate-800"
              >
                {currentQuestionIdx < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 text-left py-4 max-w-5xl mx-auto">
      
      {/* 1. Header Hero Promo Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-950/20 border border-amber-800/40 text-[#ffa116] rounded-xl">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-200 tracking-tight m-0 font-sans">Practice & Assessment</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Answer interactive algorithm questions, set high scores, and expand your learning streak.</p>
          </div>
        </div>

        {/* Learning Streak Indicators */}
        <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto">
          {/* Flame indicator */}
          <div className="flex items-center gap-2 bg-[#282828] border border-slate-800 px-3 py-1.5 rounded-xl shadow-inner">
            <Flame className={`w-4 h-4 ${streak > 0 ? 'text-amber-500 animate-pulse fill-amber-500' : 'text-slate-500'}`} />
            <div className="flex flex-col text-[10px]">
              <span className="text-slate-500 font-bold font-mono uppercase tracking-wider">Streak</span>
              <span className="text-slate-200 font-black font-mono">{streak} Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Practice Categories Cards List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-2 pl-1">
          <Award className="w-4 h-4 text-[#ffa116]" />
          <h2 className="text-base font-bold tracking-tight text-slate-200 m-0">Challenge Decks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUIZ_CATEGORIES.map((cat) => {
            const highScore = highScores[cat.id] || 0;
            const totalQuestions = cat.questions.length;
            const completed = highScore === totalQuestions;

            return (
              <div
                key={cat.id}
                className={`p-5 rounded-2xl border bg-gradient-to-br transition-all duration-300 relative flex flex-col justify-between min-h-[160px] ${cat.color}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-200 tracking-tight m-0">{cat.title}</h3>
                      {completed && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                      {!user && <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pr-6 mt-0.5">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-5 pt-3 border-t border-slate-900/60 w-full">
                  <div className="flex flex-col text-[10px] font-mono font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">Best Score</span>
                    <span className="text-slate-350 mt-0.5">
                      <span className="text-slate-200 font-black">{highScore}</span> / {totalQuestions} Correct
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectCategory(cat.id)}
                    className="px-4 py-2 bg-[#ffa116] hover:bg-amber-400 text-[#1a1a1a] rounded-xl text-xs font-bold cursor-pointer active:scale-95 transition-all flex items-center gap-1 border-none font-sans"
                  >
                    <span>Start Quiz</span>
                    {!user ? <Lock className="w-3 h-3 ml-0.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
