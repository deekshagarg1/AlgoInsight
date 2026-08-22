import { STEP_TYPES } from '../types';

/**
 * Counting Sort Step Generator (Object Array version for stable keys)
 * 
 * Maps the input number array to an array of objects containing a stable id.
 * 
 * @param {number[]} originalArray - Raw number array
 * @returns {Array} Step states
 */
export function generateCountingSortSteps(originalArray) {
  const arr = originalArray.map((val, idx) => ({
    id: `item-${val}-${idx}`,
    value: val
  }));

  const steps = [];
  const n = arr.length;

  const max = n > 0 ? Math.max(...originalArray) : 0;
  
  // Auxiliary arrays setup
  const count = new Array(max + 1).fill(0);
  const output = new Array(n).fill(null);

  // Initial setup (Line 1)
  steps.push({
    array: [...arr],
    countArray: [...count],
    outputArray: [...output],
    type: STEP_TYPES.INITIAL,
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Start Counting Sort on array.',
    operationText: '',
    phase: 'count',
    valuesRange: [1, max],
    activeArrIdx: -1,
    activeCountIdx: -1,
    activeOutputIdx: -1
  });

  // Find max value step (Line 3: int max = getMaximum(arr);)
  steps.push({
    array: [...arr],
    countArray: [...count],
    outputArray: [...output],
    type: STEP_TYPES.HIGHLIGHT,
    indices: [],
    sortedIndices: [],
    highlightedLines: [3],
    pass: 0,
    swapped: false,
    explanation: `Find maximum value in the array. Maximum value found is ${max}.`,
    operationText: `max = ${max}`,
    phase: 'count',
    valuesRange: [1, max],
    activeArrIdx: -1,
    activeCountIdx: -1,
    activeOutputIdx: -1
  });

  // Create count array and output array (Lines 6-7)
  steps.push({
    array: [...arr],
    countArray: [...count],
    outputArray: [...output],
    type: STEP_TYPES.HIGHLIGHT,
    indices: [],
    sortedIndices: [],
    highlightedLines: [6, 7],
    pass: 0,
    swapped: false,
    explanation: `Create auxiliary count array of size ${max + 1} and output array of size ${n}.`,
    operationText: `count size = ${max + 1}`,
    phase: 'count',
    valuesRange: [1, max],
    activeArrIdx: -1,
    activeCountIdx: -1,
    activeOutputIdx: -1
  });

  // Store the count of each element (Lines 10-12)
  for (let i = 0; i < n; i++) {
    const val = arr[i].value;
    count[val]++;

    steps.push({
      array: [...arr],
      countArray: [...count],
      outputArray: [...output],
      type: STEP_TYPES.COMPARE, // Highlighting current element being counted
      indices: [i],
      sortedIndices: [],
      highlightedLines: [10, 11],
      pass: 0,
      swapped: false,
      explanation: `Count occurrences: Element at index ${i} is ${val}. Increment count[${val}] to ${count[val]}.`,
      operationText: `count[${val}] = ${count[val]}`,
      phase: 'count',
      valuesRange: [1, max],
      activeArrIdx: i,
      activeCountIdx: val,
      activeOutputIdx: -1
    });
  }

  // Modify count array (cumulative sum) (Lines 15-17)
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];

    steps.push({
      array: [...arr],
      countArray: [...count],
      outputArray: [...output],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [],
      highlightedLines: [15, 16],
      pass: 0,
      swapped: false,
      explanation: `Prefix sum: Accumulate count[${i}] += count[${i - 1}]. New count[${i}] = ${count[i]}.`,
      operationText: `count[${i}] = ${count[i]}`,
      phase: 'cumulative',
      valuesRange: [1, max],
      activeArrIdx: -1,
      activeCountIdx: i,
      activeOutputIdx: -1
    });
  }

  // Build the output character array
  // In order to make it stable, we operate in reverse order
  const tempSortedArray = [...arr];

  for (let i = n - 1; i >= 0; i--) {
    const val = tempSortedArray[i].value;
    const targetPos = count[val] - 1;
    
    // Decrease the frequency count in count array
    count[val]--;
    
    // Assign stable object representation into output list
    output[targetPos] = tempSortedArray[i];

    // Build intermediate visualizer display of original array representing values copied so far
    const currentArrDisplay = [...tempSortedArray];
    
    steps.push({
      array: [...currentArrDisplay],
      countArray: [...count],
      outputArray: [...output],
      type: STEP_TYPES.SWAP,
      indices: [i], // Highlight index of current element in arr being processed
      sortedIndices: [],
      highlightedLines: [20, 21, 22], // Placing elements back
      pass: 0,
      swapped: true,
      explanation: `arr[${i}] = ${val} goes to output[${targetPos}]; count[${val}] drops to ${count[val]}.`,
      operationText: `${val} ➔ output[${targetPos}], count[${val}] drops to ${count[val]}`,
      phase: 'place',
      valuesRange: [1, max],
      activeArrIdx: i,
      activeCountIdx: val,
      activeOutputIdx: targetPos
    });
  }

  // Final write-back of outputs to sorted array state
  const finalSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...output],
    countArray: [...count],
    outputArray: [...output],
    type: STEP_TYPES.SORTED,
    indices: [],
    sortedIndices: finalSorted,
    highlightedLines: [26, 27, 28],
    pass: 0,
    swapped: false,
    explanation: 'Counting Sort complete! The entire array is sorted.',
    operationText: 'Completed',
    phase: 'place',
    valuesRange: [1, max],
    activeArrIdx: -1,
    activeCountIdx: -1,
    activeOutputIdx: -1
  });

  return steps;
}
