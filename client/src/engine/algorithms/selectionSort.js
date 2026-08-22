import { STEP_TYPES } from '../types';

/**
 * Selection Sort Step Generator
 * 
 * Tracks:
 * - i: sorted boundary index (labeled 'i' pointer)
 * - j: scanning comparison index (labeled 'j' pointer)
 * - minIdx: current minimum index found (highlighted as a purple bar)
 * 
 * @param {number[]} originalArray - Raw number array
 * @returns {Array} Step states
 */
export function generateSelectionSortSteps(originalArray) {
  // Map input numbers to objects with unique stable IDs
  const arr = originalArray.map((val, idx) => ({
    id: `item-${val}-${idx}`,
    value: val
  }));

  const n = arr.length;
  const steps = [];
  const sortedIndices = [];

  // Initial step setup (Line 1: public void selectionSort(int[] arr) {)
  steps.push({
    array: [...arr],
    type: STEP_TYPES.INITIAL,
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Start Selection Sort on array.',
    operationText: '',
    minIdx: -1
  });

  // Line 2: int n = arr.length;
  steps.push({
    array: [...arr],
    type: STEP_TYPES.HIGHLIGHT,
    indices: [],
    sortedIndices: [],
    highlightedLines: [2],
    pass: 0,
    swapped: false,
    explanation: `Array length n = ${n} initialized.`,
    operationText: `n = ${n}`,
    minIdx: -1
  });

  for (let i = 0; i < n - 1; i++) {
    const currentPassNum = i + 1;

    // Highlight outer loop check (Line 4)
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [i],
      sortedIndices: [...sortedIndices],
      highlightedLines: [4],
      pass: currentPassNum,
      swapped: false,
      explanation: `Pass ${currentPassNum}: Outer loop check i (${i}) < n - 1 (${n - 1}) is true.`,
      operationText: `i < ${n - 1}`,
      minIdx: -1
    });

    // Initialize minIdx (Line 5: int minIdx = i;)
    let minIdx = i;
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [i],
      sortedIndices: [...sortedIndices],
      highlightedLines: [5],
      pass: currentPassNum,
      swapped: false,
      explanation: `Set current index i (${i}) as the starting minimum (minIdx = ${minIdx}, value = ${arr[minIdx].value}).`,
      operationText: `minIdx = ${minIdx}`,
      minIdx: minIdx
    });

    for (let j = i + 1; j < n; j++) {
      // Highlight inner loop check (Line 7)
      steps.push({
        array: [...arr],
        type: STEP_TYPES.HIGHLIGHT,
        indices: [i, j],
        sortedIndices: [...sortedIndices],
        highlightedLines: [7],
        pass: currentPassNum,
        swapped: false,
        explanation: `Inner scan: check if index j (${j}) is within bounds (j < n).`,
        operationText: `j < ${n}`,
        minIdx: minIdx
      });

      // Compare step (Line 8: if (arr[j] < arr[minIdx]) {)
      steps.push({
        array: [...arr],
        type: STEP_TYPES.COMPARE,
        indices: [i, j],
        sortedIndices: [...sortedIndices],
        highlightedLines: [8],
        pass: currentPassNum,
        swapped: false,
        explanation: `Compare element at index j (${arr[j].value}) with current minimum at minIdx (${arr[minIdx].value}).`,
        operationText: `${arr[j].value} < ${arr[minIdx].value}?`,
        minIdx: minIdx
      });

      if (arr[j].value < arr[minIdx].value) {
        const oldMin = minIdx;
        minIdx = j;

        // Update minIdx step (Line 9: minIdx = j;)
        steps.push({
          array: [...arr],
          type: STEP_TYPES.HIGHLIGHT,
          indices: [i, j],
          sortedIndices: [...sortedIndices],
          highlightedLines: [9],
          pass: currentPassNum,
          swapped: false,
          explanation: `Found smaller element! Update minIdx to j (${minIdx}, value = ${arr[minIdx].value}).`,
          operationText: `minIdx = ${minIdx}`,
          minIdx: minIdx
        });
      }
    }

    // Inner loop condition became false step (j reaches n)
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [i],
      sortedIndices: [...sortedIndices],
      highlightedLines: [7],
      isLoopFalse: true,
      pass: currentPassNum,
      swapped: false,
      explanation: `Inner loop check: j (${n}) < n (${n}) is false. Inner loop scan terminates.`,
      operationText: `j < ${n} is false`,
      minIdx: minIdx
    });

    // Swap if a new minimum was found (Lines 14-16)
    const swappedPass = minIdx !== i;
    if (swappedPass) {
      const valI = arr[i].value;
      const valMin = arr[minIdx].value;

      // Swap in array
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        array: [...arr],
        type: STEP_TYPES.SWAP,
        indices: [i, minIdx],
        sortedIndices: [...sortedIndices],
        highlightedLines: [14, 15, 16],
        pass: currentPassNum,
        swapped: true,
        explanation: `Swap minimum element at index ${minIdx} (${valMin}) with first unsorted element at index ${i} (${valI}).`,
        operationText: `swap(${valI}, ${valMin})`,
        minIdx: i // The minimum is now swapped to index i
      });
    } else {
      steps.push({
        array: [...arr],
        type: STEP_TYPES.HIGHLIGHT,
        indices: [i],
        sortedIndices: [...sortedIndices],
        highlightedLines: [13],
        pass: currentPassNum,
        swapped: false,
        explanation: `First unsorted element at index ${i} (${arr[i].value}) is already the minimum. No swap needed.`,
        operationText: `No swap needed`,
        minIdx: minIdx
      });
    }

    // Mark index i as sorted
    sortedIndices.push(i);

    steps.push({
      array: [...arr],
      type: STEP_TYPES.SORTED,
      indices: [i],
      sortedIndices: [...sortedIndices],
      highlightedLines: [17],
      pass: currentPassNum,
      swapped: swappedPass,
      explanation: `Element at index ${i} (${arr[i].value}) is now sorted and locked.`,
      operationText: `Index ${i} sorted`,
      minIdx: -1
    });
  }

  // Outer loop condition became false step (i reaches n - 1)
  steps.push({
    array: [...arr],
    type: STEP_TYPES.HIGHLIGHT,
    indices: [],
    sortedIndices: [...sortedIndices],
    highlightedLines: [4],
    isLoopFalse: true,
    pass: n - 1,
    swapped: steps[steps.length - 1] ? steps[steps.length - 1].swapped : false,
    explanation: `Outer loop check: i (${n - 1}) < n - 1 (${n - 1}) is false. Outer loop terminates.`,
    operationText: `i < ${n - 1} is false`,
    minIdx: -1
  });

  // Final sorted state: the last remaining element (index n-1) is sorted automatically
  sortedIndices.push(n - 1);
  const finalSorted = Array.from({ length: n }, (_, idx) => idx);

  steps.push({
    array: [...arr],
    type: STEP_TYPES.SORTED,
    indices: [],
    sortedIndices: finalSorted,
    highlightedLines: [18],
    pass: n - 1,
    swapped: steps[steps.length - 1] ? steps[steps.length - 1].swapped : false,
    explanation: 'Selection Sort complete! The entire array is sorted.',
    operationText: 'Completed',
    minIdx: -1
  });

  return steps;
}
