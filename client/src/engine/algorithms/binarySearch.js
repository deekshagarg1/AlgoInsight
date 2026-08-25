import { STEP_TYPES } from '../types';

/**
 * Binary Search Step Generator
 * 
 * @param {number[]} originalArray - Raw number array
 * @param {number} target - Element to search for
 * @returns {Array} Step states
 */
export function generateBinarySearchSteps(originalArray, target) {
  // 1. Ensure array is sorted (Binary Search requirement)
  const isSorted = originalArray.every((val, idx) => idx === 0 || val >= originalArray[idx - 1]);
  const workingArray = isSorted ? [...originalArray] : [...originalArray].sort((a, b) => a - b);
  
  const arr = workingArray.map((val, idx) => ({
    id: `item-${val}-${idx}`,
    value: val
  }));
  
  const n = arr.length;
  const steps = [];

  let low = 0;
  let high = n - 1;
  let mid = -1;
  let foundIndex = -1;

  // Initial step setup
  steps.push({
    array: [...arr],
    type: STEP_TYPES.INITIAL,
    indices: [],
    sortedIndices: [],
    highlightedLines: [1, 2],
    i: low,
    j: high,
    minIdx: mid,
    explanation: `Initializing Binary Search for target ${target}.${isSorted ? '' : ' Array was auto-sorted to satisfy Binary Search pre-conditions.'}`,
    operationText: `target = ${target}`
  });

  while (low <= high) {
    mid = Math.floor(low + (high - low) / 2);

    // Step 1: Calculate mid index
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [mid],
      sortedIndices: [],
      highlightedLines: [3, 4],
      i: low,
      j: high,
      minIdx: mid,
      explanation: `Calculate middle index: mid = (${low} + ${high}) / 2 = ${mid}.`,
      operationText: `mid = ${mid}`
    });

    // Step 2: Compare middle element
    steps.push({
      array: [...arr],
      type: STEP_TYPES.COMPARE,
      indices: [mid],
      sortedIndices: [],
      highlightedLines: [5],
      i: low,
      j: high,
      minIdx: mid,
      explanation: `Comparing middle element arr[${mid}] (${arr[mid].value}) with target (${target}).`,
      operationText: `arr[${mid}] == ${target}?`
    });

    if (arr[mid].value === target) {
      foundIndex = mid;
      // Found match!
      steps.push({
        array: [...arr],
        type: STEP_TYPES.SORTED, // Highlights green
        indices: [mid],
        sortedIndices: [mid],
        highlightedLines: [6],
        i: low,
        j: high,
        minIdx: mid,
        explanation: `Match found! Target ${target} is at index ${mid}.`,
        operationText: `Found at index ${mid}`
      });
      break;
    }

    if (arr[mid].value < target) {
      // Search right half
      low = mid + 1;
      steps.push({
        array: [...arr],
        type: STEP_TYPES.HIGHLIGHT,
        indices: [mid],
        sortedIndices: [],
        highlightedLines: [8, 9],
        i: low,
        j: high,
        minIdx: mid,
        explanation: `Since arr[mid] (${arr[mid].value}) < target (${target}), search right half: low = ${mid} + 1 = ${low}.`,
        operationText: `low = ${low}`
      });
    } else {
      // Search left half
      high = mid - 1;
      steps.push({
        array: [...arr],
        type: STEP_TYPES.HIGHLIGHT,
        indices: [mid],
        sortedIndices: [],
        highlightedLines: [8, 10, 11],
        i: low,
        j: high,
        minIdx: mid,
        explanation: `Since arr[mid] (${arr[mid].value}) > target (${target}), search left half: high = ${mid} - 1 = ${high}.`,
        operationText: `high = ${high}`
      });
    }
  }

  // Not found state
  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [],
      highlightedLines: [14],
      i: low,
      j: high,
      minIdx: -1,
      explanation: `Search range exhausted (low > high). Target ${target} was not found. Returning -1.`,
      operationText: `Not Found`
    });
  }

  return steps;
}
