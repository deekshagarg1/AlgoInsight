import { STEP_TYPES } from '../types';

/**
 * Linear Search Step Generator
 * 
 * @param {number[]} originalArray - Raw number array
 * @param {number} target - Element to search for
 * @returns {Array} Step states
 */
export function generateLinearSearchSteps(originalArray, target) {
  // Map input numbers to objects with unique stable IDs
  const arr = originalArray.map((val, idx) => ({
    id: `item-${val}-${idx}`,
    value: val
  }));
  
  const n = arr.length;
  const steps = [];

  // Initial step setup
  steps.push({
    array: [...arr],
    type: STEP_TYPES.INITIAL,
    indices: [],
    sortedIndices: [], // In search, we will store the found indices here
    highlightedLines: [1],
    explanation: `Initializing Linear Search. We are looking for target element: ${target}.`,
    operationText: `target = ${target}`
  });

  let foundIndex = -1;

  for (let i = 0; i < n; i++) {
    // Step 1: Highlight loop index comparison
    steps.push({
      array: [...arr],
      type: STEP_TYPES.COMPARE,
      indices: [i],
      sortedIndices: [],
      highlightedLines: [4, 5],
      explanation: `Checking index ${i}: Comparing arr[${i}] (${arr[i].value}) with target (${target}).`,
      operationText: `arr[${i}] == ${target}?`
    });

    if (arr[i].value === target) {
      foundIndex = i;
      // Step 2: Highlight match found index in green
      steps.push({
        array: [...arr],
        type: STEP_TYPES.SORTED, // Highlights emerald green
        indices: [i],
        sortedIndices: [i],
        highlightedLines: [6],
        explanation: `Match found! Target ${target} is at index ${i}.`,
        operationText: `Found: index ${i}`
      });
      break;
    }
  }

  // If not found, show final negative result step
  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [],
      highlightedLines: [9],
      explanation: `Completed scanning array. Target ${target} was not found. Returning -1.`,
      operationText: `Not Found`
    });
  }

  return steps;
}
