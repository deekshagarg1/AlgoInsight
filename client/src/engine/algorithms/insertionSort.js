import { STEP_TYPES } from '../types';

/**
 * Insertion Sort Step Generator
 * 
 * Tracks:
 * - i: current partition boundary index (labeled 'i' pointer)
 * - j: shifting comparison index (labeled 'j' pointer)
 * - keyIdx: active key element being sorted (highlighted as a purple 'key' bar)
 * 
 * @param {number[]} originalArray - Raw number array
 * @returns {Array} Step states
 */
export function generateInsertionSortSteps(originalArray) {
  // Map input numbers to objects with unique stable IDs
  const arr = originalArray.map((val, idx) => ({
    id: `item-${val}-${idx}`,
    value: val
  }));

  const n = arr.length;
  const steps = [];
  const sortedIndices = [];

  // Initial step setup (Line 1: public void insertionSort(int[] arr) {)
  steps.push({
    array: [...arr],
    type: STEP_TYPES.INITIAL,
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Start Insertion Sort on array.',
    operationText: '',
    minIdx: -1,
    keyValue: -1
  });

  // First element is sorted by default
  sortedIndices.push(0);

  for (let i = 1; i < n; i++) {
    const currentPassNum = i;

    // Highlight outer loop check (Line 4)
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [i],
      sortedIndices: [...sortedIndices],
      highlightedLines: [4],
      pass: currentPassNum,
      swapped: false,
      explanation: `Pass ${currentPassNum}: Outer loop check i (${i}) < n (${n}) is true.`,
      operationText: `i < ${n}`,
      minIdx: -1,
      i: i,
      j: -1,
      keyValue: -1
    });

    // Select key = arr[i] (Line 5: int key = arr[i];)
    const key = { ...arr[i] };
    let keyIdx = i;

    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [i],
      sortedIndices: [...sortedIndices],
      highlightedLines: [5],
      pass: currentPassNum,
      swapped: false,
      explanation: `Extract key element at index i (${key.value}) to insert into sorted portion.`,
      operationText: `key = ${key.value}`,
      minIdx: keyIdx,
      i: i,
      j: -1,
      keyValue: key.value
    });

    // Initialize j = i - 1 (Line 6: int j = i - 1;)
    let j = i - 1;
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [i, j],
      sortedIndices: [...sortedIndices],
      highlightedLines: [6],
      pass: currentPassNum,
      swapped: false,
      explanation: `Initialize j = i - 1 (${j}) to scan sorted portion backwards.`,
      operationText: `j = ${j}`,
      minIdx: keyIdx,
      i: i,
      j: j,
      keyValue: key.value
    });

    // Inner loop while check
    while (j >= 0 && arr[j].value > key.value) {
      // Loop check (Line 8: while (j >= 0 && arr[j] > key) {)
      steps.push({
        array: [...arr],
        type: STEP_TYPES.COMPARE,
        indices: [j],
        sortedIndices: [...sortedIndices],
        highlightedLines: [8],
        pass: currentPassNum,
        swapped: false,
        explanation: `Compare scan element at j (${arr[j].value}) with key (${key.value}). Since it is larger, we must shift it right.`,
        operationText: `${arr[j].value} > ${key.value}?`,
        minIdx: j + 1, // Key is floating at j + 1
        i: i,
        j: j,
        keyValue: key.value
      });

      // Shift element (Line 9: arr[j + 1] = arr[j];)
      arr[j + 1] = {
        id: `item-shift-${arr[j].value}-${i}-${j + 1}`,
        value: arr[j].value
      };

      steps.push({
        array: [...arr],
        type: STEP_TYPES.SWAP,
        indices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        highlightedLines: [9],
        pass: currentPassNum,
        swapped: true,
        explanation: `Shift element at j (${arr[j].value}) right to index j+1 (${j + 1}).`,
        operationText: `arr[${j + 1}] = ${arr[j].value}`,
        minIdx: j, // Hole shifts to index j, so key floats above index j
        i: i,
        j: j,
        keyValue: key.value
      });

      // Decrement j (Line 10: j = j - 1;)
      j = j - 1;
      steps.push({
        array: [...arr],
        type: STEP_TYPES.HIGHLIGHT,
        indices: [],
        sortedIndices: [...sortedIndices],
        highlightedLines: [10],
        pass: currentPassNum,
        swapped: true,
        explanation: `Decrement pointer j to ${j}.`,
        operationText: `j = ${j}`,
        minIdx: j + 1, // Hole is at j + 1 (the old j)
        i: i,
        j: j,
        keyValue: key.value
      });
    }

    // Inner loop condition became false step (Line 8)
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [...sortedIndices],
      highlightedLines: [8],
      isLoopFalse: true,
      pass: currentPassNum,
      swapped: false,
      explanation: `Shift loop terminates: j (${j}) >= 0 && arr[j] > key is false.`,
      operationText: `j >= 0 && arr[j] > key is false`,
      minIdx: j + 1, // Key floats at insertion index
      i: i,
      j: j,
      keyValue: key.value
    });

    // Place key (Line 12: arr[j + 1] = key;)
    arr[j + 1] = {
      id: `item-key-${key.value}-${i}-${j + 1}`,
      value: key.value
    };

    steps.push({
      array: [...arr],
      type: STEP_TYPES.SWAP,
      indices: [j + 1],
      sortedIndices: [...sortedIndices],
      highlightedLines: [12],
      pass: currentPassNum,
      swapped: true,
      explanation: `Insert key element (${key.value}) into its correct sorted position at index j+1 (${j + 1}).`,
      operationText: `arr[${j + 1}] = ${key.value}`,
      minIdx: j + 1, // Show element placed at j + 1
      i: i,
      j: -1,
      keyValue: key.value
    });

    // Add all indices up to i to sorted indices
    for (let k = 0; k <= i; k++) {
      if (!sortedIndices.includes(k)) {
        sortedIndices.push(k);
      }
    }

    steps.push({
      array: [...arr],
      type: STEP_TYPES.SORTED,
      indices: [j + 1],
      sortedIndices: [...sortedIndices],
      highlightedLines: [13],
      pass: currentPassNum,
      swapped: true,
      explanation: `The prefix array up to index ${i} is now sorted.`,
      operationText: `Prefix sorted`,
      minIdx: -1,
      i: i,
      j: -1,
      keyValue: -1
    });
  }

  // Outer loop condition became false step (i reaches n)
  steps.push({
    array: [...arr],
    type: STEP_TYPES.HIGHLIGHT,
    indices: [],
    sortedIndices: [...sortedIndices],
    highlightedLines: [4],
    isLoopFalse: true,
    pass: n - 1,
    swapped: false,
    explanation: `Outer loop check: i (${n}) < n (${n}) is false. Outer loop terminates.`,
    operationText: `i < ${n} is false`,
    minIdx: -1,
    i: -1,
    j: -1,
    keyValue: -1
  });

  // Final sorted state
  const finalSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...arr],
    type: STEP_TYPES.SORTED,
    indices: [],
    sortedIndices: finalSorted,
    highlightedLines: [14],
    pass: n - 1,
    swapped: false,
    explanation: 'Insertion Sort complete! The entire array is sorted.',
    operationText: 'Completed',
    minIdx: -1,
    i: -1,
    j: -1,
    keyValue: -1
  });

  return steps;
}
