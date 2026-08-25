import React from 'react';
import { BookOpen, CheckCircle, ArrowLeft, HelpCircle, Award, Sparkles, Check, X, Code, Flame, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const COURSES_DATA = [
  {
    id: 'arrays-sorting',
    title: 'Arrays & Sorting',
    desc: 'Master consecutive block memory layouts, complexity bounds, and sorting methods.',
    duration: '45 mins',
    difficulty: 'Easy',
    color: 'from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/15',
    iconColor: 'text-cyan-400',
    lessons: [
      {
        id: 'array-basics',
        title: '1. Arrays & Complexity',
        content: `### Arrays: Consecutive Blocks in Memory
An **Array** is a linear data structure that stores elements of the same type in contiguous memory locations. Because memory addresses are consecutive, the compiler can calculate the location of any element in **O(1)** time using the base address and index:
$$\\text{Address}(A[i]) = \\text{Base Address} + (i \\times \\text{Size of element})$$

#### Key Complexity Characteristics:
- **Access**: $O(1)$ — Direct lookup via index calculation.
- **Search**: $O(N)$ — Linear scan through all elements.
- **Insertion**: $O(N)$ — Requires shifting subsequent elements backwards.
- **Deletion**: $O(N)$ — Requires shifting subsequent elements forwards.

#### Memory Fragmentation:
Since arrays require contiguous blocks of memory, allocating large arrays can fail if free memory is fragmented, even if total free memory is sufficient.`,
        quiz: {
          question: "Which array operation has a worst-case time complexity of O(1)?",
          options: [
            "Searching for a value",
            "Inserting an element at the beginning",
            "Accessing an element via its index",
            "Deleting the middle element"
          ],
          answerIdx: 2,
          explanation: "Accessing an element via its index requires a simple mathematical memory calculation to find the address, which takes constant O(1) time."
        }
      },
      {
        id: 'comparison-sorts',
        title: '2. Comparison Sorting',
        content: `### Comparison-Based Sorting
Comparison-based sorting algorithms rearrange elements by comparing pairs. The lower bound for any comparison-based sort in the worst case is **O(N log N)**.

#### Standard O(N²) Quadratic Sorts:
1. **Bubble Sort**: Compares adjacent elements and swaps them if they are in the wrong order. Large elements slowly 'bubble' to the end.
   - Time Complexity: $O(N^2)$ (Worst/Average), $O(N)$ (Best - optimized with swap flag).
   - Space: $O(1)$ auxiliary.
2. **Selection Sort**: Repeatedly finds the minimum element from the unsorted portion and swaps it into its correct place.
   - Time Complexity: $O(N^2)$ (Always).
   - Space: $O(1)$ auxiliary.
3. **Insertion Sort**: Splits the array into sorted and unsorted parts. Elements from the unsorted part are inserted into their correct position in the sorted part by shifting elements.
   - Time Complexity: $O(N^2)$ (Worst/Average), $O(N)$ (Best - already sorted).
   - Space: $O(1)$ auxiliary.`,
        visualizeAlgo: 'bubble-sort',
        quiz: {
          question: "Which of the following quadratic sorting algorithms has a best-case time complexity of O(N) when the array is already sorted?",
          options: [
            "Selection Sort only",
            "Bubble Sort and Insertion Sort",
            "Bubble Sort and Selection Sort",
            "Insertion Sort only"
          ],
          answerIdx: 1,
          explanation: "Insertion Sort (when scanning already-sorted values) and Bubble Sort (when optimized with a swap detection flag) can exit early in O(N) time. Selection Sort always runs in O(N²) because it checks every element to find the minimum."
        }
      },
      {
        id: 'merge-counting',
        title: '3. Merge & Counting Sorts',
        content: `### Advanced Sorting Algorithms
To overcome the $O(N^2)$ limit of basic sorts, we use divide-and-conquer or non-comparison techniques.

#### Divide and Conquer: Merge Sort
**Merge Sort** recursively splits the array in halves, sorts each half, and then merges the sorted halves back together in linear time.
- **Time Complexity**: $O(N \\log N)$ (Always) — Splitting takes $\\log N$ depth, and merging at each level takes $O(N)$ work.
- **Space**: $O(N)$ auxiliary — Requires extra space for a temporary merged array.
- **Stability**: Stable.

#### Linear Non-Comparison: Counting Sort
**Counting Sort** counts the frequencies of each unique element and calculates their prefix sums to map elements directly into a sorted output array.
- **Time Complexity**: $O(N + K)$ where $K$ is the range of input values.
- **Space**: $O(N + K)$ auxiliary — Allocates space for the frequency count array.
- **Limitation**: Only useful for small ranges of positive integers.`,
        visualizeAlgo: 'merge-sort',
        quiz: {
          question: "What is the worst-case space complexity of Merge Sort?",
          options: [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N log N)"
          ],
          answerIdx: 2,
          explanation: "Merge Sort requires an auxiliary array of size O(N) to store temporary values during the merge phase, making its space complexity linear."
        }
      }
    ]
  },
  {
    id: 'searching-algorithms',
    title: 'Searching Algorithms',
    desc: 'Master target discovery limits, sequential scanning, and logarithmic binary search space halving.',
    duration: '20 mins',
    difficulty: 'Easy',
    color: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/15',
    iconColor: 'text-amber-400',
    lessons: [
      {
        id: 'linear-search-lesson',
        title: '1. Sequential Scan (Linear Search)',
        content: `### Linear Search: Sequential Discovery
Linear Search is the most intuitive searching method. It starts at the beginning of the collection and checks each element one-by-one until it finds the target or reaches the end.

#### Key Complexity Characteristics:
- **Access/Search**: $O(N)$ — Must scan elements sequentially in the worst case.
- **Best Case**: $O(1)$ — Target is the first element.
- **Worst Case**: $O(N)$ — Target is at the end or not present at all.
- **Space Complexity**: $O(1)$ auxiliary.

#### Pre-conditions:
No pre-conditions required. Works on unsorted, shuffled, or completely random datasets.`,
        visualizeAlgo: 'linear-search',
        quiz: {
          question: "What is the worst-case time complexity of Linear Search?",
          options: [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N log N)"
          ],
          answerIdx: 2,
          explanation: "In the worst case, the target element is at the very end of the array or not present, requiring the search to scan all N elements."
        }
      },
      {
        id: 'binary-search-lesson',
        title: '2. Logarithmic Search (Binary Search)',
        content: `### Binary Search: Divide & Conquer
Binary Search is a highly efficient search method. It works by repeatedly dividing the search space in half.

#### How it works:
1. Compare the target value with the middle element.
2. If they match, search is complete.
3. If target is smaller than the middle, narrow the search space to the left half.
4. If target is larger than the middle, narrow the search space to the right half.

#### Performance Characteristics:
- **Worst Case**: $O(\\log N)$ — Search space halves repeatedly until element is located.
- **Best Case**: $O(1)$ — Target is the middle element checked in the first step.
- **Space Complexity**: $O(1)$ auxiliary.

#### Pre-conditions:
**CRITICAL**: The dataset MUST be sorted. Running Binary Search on unsorted data leads to incorrect search bounds.`,
        visualizeAlgo: 'binary-search',
        quiz: {
          question: "Which of the following pre-conditions is required for Binary Search to function correctly?",
          options: [
            "The elements must be positive integers",
            "The elements must be stored in a linked list",
            "The array must be sorted in ascending/descending order",
            "The array size must be a power of two"
          ],
          answerIdx: 2,
          explanation: "Binary Search relies on sorted elements to make bounding comparisons (determining whether to search left or right)."
        }
      }
    ]
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    desc: 'Learn about dynamically allocated nodes, pointer operations, and traversal strategies.',
    duration: '30 mins',
    difficulty: 'Medium',
    color: 'from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/15',
    iconColor: 'text-indigo-400',
    lessons: [
      {
        id: 'll-intro',
        title: '1. Nodes and Pointers',
        content: `### Linked Lists: Dynamic Node Allocation
A **Linked List** is a linear data structure where elements are not stored in contiguous memory locations. Instead, each element is a separate object called a **Node**.

#### Structure of a Node:
1. **Data**: The value stored in the node.
2. **Next Pointer**: A reference pointing to the memory address of the next node in the list.

$$\\text{Node} \\rightarrow [\\text{Data} \\mid \\text{Next Pointer}] \\rightarrow \\text{Next Node}$$

#### Comparison with Arrays:
- **Dynamic Size**: Can grow or shrink at runtime without copying elements.
- **No Fragmentation**: Nodes are allocated anywhere in the heap memory.
- **No Direct Access**: Must traverse sequentially from the \`Head\` pointer. Access is **O(N)**.`,
        quiz: {
          question: "What is the time complexity to insert a node at the head of a Singly Linked List?",
          options: [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N²)"
          ],
          answerIdx: 0,
          explanation: "Inserting at the head only requires changing the head pointer to point to the new node, which is a constant time O(1) operation."
        }
      },
      {
        id: 'll-ops',
        title: '2. List Traversal & Operations',
        content: `### Traversal and Pointer Modifications
Because nodes are connected sequentially, operations require walking pointers step-by-step.

#### Core Traversals:
\`\`\`java
Node current = head;
while (current != null) {
    // Process current.data
    current = current.next;
}
\`\`\`

#### Traversal Complexities:
- **Traversal/Lookup**: $O(N)$ — Must scan nodes one-by-one.
- **Insertion at Tail**: $O(N)$ — Requires traversing to the end node unless a tail pointer is maintained.
- **Deletion (Given Node)**: $O(1)$ if given the node and its predecessor, but $O(N)$ to search for the node initially.`,
        quiz: {
          question: "Why does finding the middle element of a Singly Linked List take O(N) time?",
          options: [
            "Pointers cannot be traversed backwards",
            "Elements are not stored sequentially in memory, so we cannot jump to an index",
            "Linked lists do not store head pointers",
            "Nodes are deleted during traversal"
          ],
          answerIdx: 1,
          explanation: "Because memory is allocated dynamically and non-contiguously, we cannot calculate index offsets directly. We must walk sequentially from node to node, taking O(N) time."
        }
      }
    ]
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    desc: 'Understand LIFO/FIFO linear restrictions, array buffers, and operations.',
    duration: '25 mins',
    difficulty: 'Medium',
    color: 'from-pink-500/10 via-pink-500/5 to-transparent border-pink-500/15',
    iconColor: 'text-pink-400',
    lessons: [
      {
        id: 'stack-lifo',
        title: '1. LIFO Stacks',
        content: `### Stacks: Last-In, First-Out (LIFO)
A **Stack** is a linear data structure that restricts insertions and deletions to only one end, called the **Top**.

#### Core Operations:
1. **Push**: Insert an element at the top.
2. **Pop**: Remove and return the top element.
3. **Peek/Top**: View the top element without removing it.

$$\\text{Push} \\rightarrow \\mid \\text{Top Element} \\mid \\rightarrow \\text{Pop}$$

#### Complexity Bounds:
All core operations (\`Push\`, \`Pop\`, \`Peek\`) run in **O(1)** time because they only modify the top reference pointer.

#### Real-World Applications:
- Undo/Redo features in text editors.
- Back button navigation in web browsers.
- Execution Call Stack in compilers.`,
        quiz: {
          question: "Which of the following data structure paradigms best describes a Stack?",
          options: [
            "First-In, First-Out (FIFO)",
            "Last-In, First-Out (LIFO)",
            "Random Access Buffer",
            "Binary Search Tree"
          ],
          answerIdx: 1,
          explanation: "A Stack follows the Last-In, First-Out (LIFO) paradigm. The last element added is the first one to be popped."
        }
      },
      {
        id: 'queue-fifo',
        title: '2. FIFO Queues',
        content: `### Queues: First-In, First-Out (FIFO)
A **Queue** is a linear data structure where insertions occur at the back (**Rear**) and deletions occur at the front (**Front**).

#### Core Operations:
1. **Enqueue**: Insert an element at the rear.
2. **Dequeue**: Remove and return the front element.

$$\\text{Enqueue} \\rightarrow [\\text{Rear} \\dots \\text{Front}] \\rightarrow \\text{Dequeue}$$

#### Circular Buffer Implementation:
To prevent unused memory gaps when dequeue operations shift index pointers, arrays use a **Circular Queue** design where index wrapping is calculated using the modulo operator:
$$\\text{Rear} = (\\text{Rear} + 1) \\% \\text{Capacity}$$`,
        quiz: {
          question: "In a circular queue implemented using an array of capacity 8, if Rear is at index 7, where will the next Enqueue write to?",
          options: [
            "It will trigger an overflow error",
            "Index 0",
            "Index 8",
            "Index 6"
          ],
          answerIdx: 1,
          explanation: "Using index modulo wrapping: (7 + 1) % 8 = 0. The next element wraps around and is inserted at index 0, provided it is not full."
        }
      }
    ]
  }
];

export default function CoursesPage({ onExploreAlgo, onOpenAuth }) {
  const { user } = React.useContext(AuthContext);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [activeLessonIdx, setActiveLessonIdx] = React.useState(0);
  const [showConfetti, setShowConfetti] = React.useState(false);
  
  // Track completed lessons in state initialized from localStorage
  const [completions, setCompletions] = React.useState(() => {
    try {
      const saved = localStorage.getItem('algoinsight_course_completions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track quiz selections: { [lessonId]: selectedOptionIdx }
  const [quizAnswers, setQuizAnswers] = React.useState({});
  const [quizFeedback, setQuizFeedback] = React.useState({}); // { [lessonId]: 'correct' | 'wrong' }

  // Save completions to localStorage
  React.useEffect(() => {
    localStorage.setItem('algoinsight_course_completions', JSON.stringify(completions));
  }, [completions]);

  const toggleLessonCompletion = (lessonId) => {
    setCompletions(prev => {
      const updated = { ...prev };
      if (updated[lessonId]) {
        delete updated[lessonId];
      } else {
        updated[lessonId] = true;
      }
      return updated;
    });
  };

  const handleQuizSubmit = (lessonId, optionIdx, correctIdx) => {
    setQuizAnswers(prev => ({ ...prev, [lessonId]: optionIdx }));
    setQuizFeedback(prev => ({
      ...prev,
      [lessonId]: optionIdx === correctIdx ? 'correct' : 'wrong'
    }));

    if (optionIdx === correctIdx) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
  };

  // Calculate course progress percentages
  const getCourseProgress = (course) => {
    if (!course.lessons || course.lessons.length === 0) return 0;
    const completedCount = course.lessons.filter(l => completions[l.id]).length;
    return Math.round((completedCount / course.lessons.length) * 100);
  };

  // Total overall completed progress stats
  const totalLessonsCount = COURSES_DATA.reduce((acc, c) => acc + c.lessons.length, 0);
  const totalCompletedCount = Object.keys(completions).length;
  const overallProgress = totalLessonsCount > 0 ? Math.round((totalCompletedCount / totalLessonsCount) * 100) : 0;

  if (selectedCourse) {
    const course = COURSES_DATA.find(c => c.id === selectedCourse);
    const lesson = course.lessons[activeLessonIdx];
    const isCompleted = !!completions[lesson.id];
    const userChoice = quizAnswers[lesson.id];
    const feedbackStatus = quizFeedback[lesson.id];
    const isCourseCompleted = course.lessons.every(l => completions[l.id]);

    return (
      <div className="w-full flex flex-col gap-5 text-left max-w-5xl mx-auto py-2 relative min-h-[500px]">
        {/* Native Confetti CSS Animation */}
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

        {/* Course Reader Header Deck */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#383838]/80 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setSelectedCourse(null);
                setActiveLessonIdx(0);
              }}
              className="p-2 rounded-xl bg-[#282828] border border-slate-800 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#ffa116] uppercase">Course Reader</span>
              <h1 className="text-base sm:text-lg font-bold text-slate-200 tracking-tight m-0 font-sans mt-0.5">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => toggleLessonCompletion(lesson.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/35 shadow-[0_0_8px_rgba(16,185,129,0.1)]'
                  : 'bg-[#282828] text-slate-350 border-slate-800 hover:text-white'
              }`}
            >
              {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
              {isCompleted ? 'Completed' : 'Mark Completed'}
            </button>
          </div>
        </div>

        {/* Golden Certification Banner */}
        {isCourseCompleted && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4 mt-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl animate-bounce">
                <Award className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Course Master Certified</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Excellent! You have fully completed all lessons and quizzes for this module.</p>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Split Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[400px]">
          
          {/* LEFT COLUMN: Lesson Selector Sidebar */}
          <div className="lg:col-span-4 bg-[#282828] border border-slate-800 rounded-2xl p-4 flex flex-col gap-3.5 h-fit lg:h-[450px] lg:overflow-y-auto">
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase pb-1 border-b border-slate-900">Lessons Index</span>
            <div className="flex flex-col gap-1.5">
              {course.lessons.map((l, index) => {
                const isActive = index === activeLessonIdx;
                const completed = !!completions[l.id];
                return (
                  <button
                    key={l.id}
                    onClick={() => setActiveLessonIdx(index)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-[#1a1a1a]/40 hover:bg-[#1a1a1a]/85 text-slate-400 border-[#383838]'
                    }`}
                  >
                    <span>{l.title}</span>
                    {completed && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 fill-emerald-950/20" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Content Reader Panel */}
          <div className="lg:col-span-8 bg-[#282828] border border-slate-800 rounded-2xl flex flex-col overflow-hidden h-[450px]">
            {/* Scrollable Document */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-5 text-slate-300 leading-relaxed text-sm select-text scrollbar-thin">
              
              {/* Concept Markdown Text Content */}
              <div className="prose prose-invert prose-xs text-slate-350">
                {lesson.content.split('\n\n').map((block, bIdx) => {
                  if (block.startsWith('### ')) {
                    return <h3 key={bIdx} className="text-base font-bold text-slate-200 mt-4 mb-2">{block.replace('### ', '')}</h3>;
                  }
                  if (block.startsWith('#### ')) {
                    return <h4 key={bIdx} className="text-sm font-bold text-slate-350 mt-3 mb-1.5">{block.replace('#### ', '')}</h4>;
                  }
                  if (block.startsWith('- ')) {
                    return (
                      <ul key={bIdx} className="list-disc pl-5 flex flex-col gap-1 my-2">
                        {block.split('\n').map((li, lIdx) => (
                          <li key={lIdx}>{li.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={bIdx} className="my-2">{block}</p>;
                })}
              </div>

              {/* Visualize Shortcut Trigger Banner */}
              {lesson.visualizeAlgo && (
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/15 flex items-center justify-between gap-4 mt-2">
                  <div className="flex items-center gap-2.5">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <div className="text-[11px]">
                      <span className="font-bold text-slate-200 block">Ready to see it in action?</span>
                      <span className="text-slate-400">Play the visual timelines in the sandbox visualizer.</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onExploreAlgo(lesson.visualizeAlgo)}
                    className="px-3.5 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg text-xs font-bold cursor-pointer transition-all active:scale-95 border-none"
                  >
                    Visualize
                  </button>
                </div>
              )}

              {/* Interactive Quiz Component Card */}
              {lesson.quiz && (
                <div className="border border-[#383838] bg-[#1a1a1a]/40 rounded-xl p-4.5 mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[#ffa116] border-b border-slate-800 pb-2">
                    <HelpCircle className="w-4 h-4" />
                    <span className="font-sans font-bold text-xs">Concept Check Challenge</span>
                  </div>
                  
                  <p className="font-semibold text-xs text-slate-200 mt-1">
                    {lesson.quiz.question}
                  </p>

                  <div className="flex flex-col gap-2 mt-1.5">
                    {lesson.quiz.options.map((opt, oIdx) => {
                      const isSelected = userChoice === oIdx;
                      let optionClasses = 'bg-[#282828] border-slate-850 text-slate-400 hover:border-slate-700';

                      if (isSelected) {
                        if (feedbackStatus === 'correct') {
                          optionClasses = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 font-bold';
                        } else if (feedbackStatus === 'wrong') {
                          optionClasses = 'bg-rose-500/15 border-rose-500/50 text-rose-450 font-bold';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={feedbackStatus !== undefined}
                          onClick={() => handleQuizSubmit(lesson.id, oIdx, lesson.quiz.answerIdx)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${
                            feedbackStatus !== undefined ? 'cursor-not-allowed' : 'cursor-pointer active:scale-[0.99]'
                          } ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {isSelected && feedbackStatus === 'correct' && <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />}
                          {isSelected && feedbackStatus === 'wrong' && <X className="w-3.5 h-3.5 text-rose-400 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedbacks Explanations Banner */}
                  {feedbackStatus && (
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed mt-1.5 flex flex-col gap-1 ${
                      feedbackStatus === 'correct'
                        ? 'bg-emerald-500/10 border-emerald-500/15 text-emerald-400/90'
                        : 'bg-rose-500/10 border-rose-500/15 text-rose-400'
                    }`}>
                      <span className="font-extrabold uppercase font-mono text-[9px] tracking-wider">
                        {feedbackStatus === 'correct' ? 'Correct Answer!' : 'Wrong Answer'}
                      </span>
                      <span>{lesson.quiz.explanation}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 text-left py-4 max-w-5xl mx-auto">
      
      {/* 1. Header Banner Catalog Details */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-950/20 border border-amber-800/40 text-[#ffa116] rounded-xl">
            <BookOpen className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-200 tracking-tight m-0 font-sans">Interactive Learning Courses</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Read structured tutorials, mark lessons as completed, and test your understanding.</p>
          </div>
        </div>

        {/* Global Progress Badge Deck */}
        <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-xl shrink-0 self-end sm:self-auto shadow-inner">
          <Award className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col text-[10px]">
            <span className="text-slate-500 font-bold font-mono uppercase tracking-wider">Progress</span>
            <span className="text-slate-350 font-bold font-mono">
              <span className="text-slate-200 font-black">{totalCompletedCount}</span> / {totalLessonsCount} Lessons ({overallProgress}%)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Course Cards Listing Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-2 pl-1">
          <Sparkles className="w-4 h-4 text-[#ffa116]" />
          <h2 className="text-base font-bold tracking-tight text-slate-200 m-0">Course Modules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {COURSES_DATA.map((c) => {
            const progress = getCourseProgress(c);
            const completed = progress === 100;
            const isLocked = !user && c.id !== 'arrays-sorting' && c.id !== 'searching-algorithms';
            return (
              <div
                key={c.id}
                className={`rounded-2xl border bg-gradient-to-br p-5 flex flex-col justify-between min-h-[190px] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:border-slate-700/80 ${c.color}`}
              >
                {/* Topic Header details */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center w-full">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-slate-900/50 border border-slate-800 text-slate-450 tracking-wider">
                      {c.difficulty}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">{c.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <h3 className="text-sm font-bold text-slate-200 tracking-tight m-0">{c.title}</h3>
                    {completed && <Award className="w-4 h-4 text-amber-400 shrink-0" />}
                    {isLocked && <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{c.desc}</p>
                </div>

                {/* Progress bar deck */}
                <div className="flex flex-col gap-2.5 mt-5">
                  <div className="flex justify-between items-center w-full text-[10px] font-mono font-bold">
                    <span className="text-slate-500">Completed</span>
                    <span className="text-slate-350">{progress}%</span>
                  </div>
                  
                  {/* Progress bar line */}
                  <div className="w-full h-1.5 bg-slate-900 border border-slate-800/40 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${completed ? 'bg-amber-400' : 'bg-[#ffa116]'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (isLocked) {
                        onOpenAuth();
                      } else {
                        setSelectedCourse(c.id);
                      }
                    }}
                    className="w-full py-2.5 bg-[#ffa116] hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl cursor-pointer active:scale-95 transition-all mt-2.5 border-none font-sans flex items-center justify-center gap-1"
                  >
                    <span>{completed ? 'Review Course' : 'Start Learning'}</span>
                    {isLocked && <Lock className="w-3 h-3 ml-0.5" />}
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
