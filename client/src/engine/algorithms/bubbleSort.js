import { STEP_TYPES } from '../types';

/**
 * Bubble Sort Step Generator (Object Array version for stable keys)
 * 
 * Maps the input number array to an array of objects containing a stable id.
 * This enables React + Framer Motion to animate actual physical swapping / shuffling of elements
 * because the key of each element remains identical across the entire step history timeline.
 * 
 * @param {number[]} originalArray - Raw number array
 * @returns {Array} Step states
 */
export function generateBubbleSortSteps(originalArray) {
  // Map input numbers to objects with unique stable IDs
  const arr = originalArray.map((val, idx) => ({
    id: `item-${val}-${idx}`,
    value: val
  }));
  
  const n = arr.length;
  const steps = [];
  const sortedIndices = [];

  // Initial step setup
  steps.push({
    array: [...arr],
    type: STEP_TYPES.INITIAL,
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Start Bubble Sort on array.',
    operationText: ''
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    const currentPassNum = i + 1;

    // Highlight pass initiation
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [...sortedIndices],
      highlightedLines: [4, 5],
      pass: currentPassNum,
      swapped: false,
      explanation: `Pass ${currentPassNum}: Starting pass to bubble up largest unsorted element.`,
      operationText: `pass = ${currentPassNum}`
    });

    for (let j = 0; j < n - i - 1; j++) {
      // COMPARE step
      steps.push({
        array: [...arr],
        type: STEP_TYPES.COMPARE,
        indices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        highlightedLines: [8],
        pass: currentPassNum,
        swapped: swapped,
        explanation: `Step: ${arr[j].value} > ${arr[j + 1].value}? Compare adjacent elements at indices ${j} and ${j + 1}.`,
        operationText: `${arr[j].value} > ${arr[j + 1].value}?`
      });

      if (arr[j].value > arr[j + 1].value) {
        const val1 = arr[j].value;
        const val2 = arr[j + 1].value;

        // Swap in array
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        // SWAP step
        steps.push({
          array: [...arr],
          type: STEP_TYPES.SWAP,
          indices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          highlightedLines: [10, 11, 12, 13],
          pass: currentPassNum,
          swapped: true,
          explanation: `Step: ${val1} > ${val2} → swap them and set swapped = true`,
          operationText: `${val1} > ${val2} → swap, swapped = true`
        });
      } else {
        // No swap occurred step
        steps.push({
          array: [...arr],
          type: STEP_TYPES.HIGHLIGHT,
          indices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          highlightedLines: [8],
          pass: currentPassNum,
          swapped: swapped,
          explanation: `Step: ${arr[j].value} <= ${arr[j + 1].value} → no swap needed.`,
          operationText: `${arr[j].value} <= ${arr[j + 1].value} → no swap`
        });
    }
  }

  // Inner loop condition became false step
  steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [...sortedIndices],
      highlightedLines: [7],
      isLoopFalse: true,
      pass: currentPassNum,
      swapped: swapped,
      explanation: `Inner loop check: j (${n - i - 1}) < n - 1 - i (${n - i - 1}) is false. Inner loop terminates.`,
      operationText: `j < n - 1 - i is false`
    });

    // Pass completion, mark element as sorted
    sortedIndices.push(n - i - 1);

    steps.push({
      array: [...arr],
      type: STEP_TYPES.SORTED,
      indices: [n - i - 1],
      sortedIndices: [...sortedIndices],
      highlightedLines: [18],
      pass: currentPassNum,
      swapped: swapped,
      explanation: `Element ${arr[n - i - 1].value} has bubbled to its correct index ${n - i - 1}.`,
      operationText: `Element sorted`
    });

    // Early exit check
    if (!swapped) {
      steps.push({
        array: [...arr],
        type: STEP_TYPES.HIGHLIGHT,
        indices: [],
        sortedIndices: Array.from({ length: n }, (_, idx) => idx),
        highlightedLines: [18, 19],
        pass: currentPassNum,
        swapped: false,
        explanation: 'No swaps occurred in this pass. The array is fully sorted! Triggering early termination.',
        operationText: 'Sorted! Early exit'
      });
      break;
    }
  }

  // Outer loop condition became false step
  steps.push({
    array: [...arr],
    type: STEP_TYPES.HIGHLIGHT,
    indices: [],
    sortedIndices: [...sortedIndices],
    highlightedLines: [4],
    isLoopFalse: true,
    pass: steps[steps.length - 1] ? steps[steps.length - 1].pass : n - 1,
    swapped: steps[steps.length - 1] ? steps[steps.length - 1].swapped : false,
    explanation: `Outer loop check: i (${n - 1}) < n - 1 (${n - 1}) is false. Outer loop terminates.`,
    operationText: `i < n - 1 is false`
  });

  // Final complete sorted state
  const finalSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...arr],
    type: STEP_TYPES.SORTED,
    indices: [],
    sortedIndices: finalSorted,
    highlightedLines: [22],
    pass: steps[steps.length - 1].pass,
    swapped: steps[steps.length - 1].swapped,
    explanation: 'Bubble Sort complete! The entire array is sorted.',
    operationText: 'Completed'
  });

  return steps;
}
