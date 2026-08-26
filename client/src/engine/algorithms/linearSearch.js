import { STEP_TYPES } from '../types';

/**
 * Linear Search Step Generator
 * 
 * @param {number[]} originalArray - Raw number array
 * @param {number} target - Element to search for
 * @returns {Array} Step states
 */
export function generateLinearSearchSteps(originalArray = [], target = 22) {
  const arr = originalArray.map((val, idx) => ({
    id: `ls-${val}-${idx}`,
    value: val
  }));
  
  const n = arr.length;
  const steps = [];

  steps.push({
    array: JSON.parse(JSON.stringify(arr)),
    type: STEP_TYPES?.INITIAL || 'INITIAL',
    indices: [],
    sortedIndices: [],
    target: target,
    currentIndex: -1,
    foundIndex: -1,
    comparisons: 0,
    highlightedLines: [1],
    explanation: `Searching for target value ${target} in array of size ${n}.`,
    operationText: `Target = ${target}`
  });

  let comparisons = 0;
  let found = false;

  for (let i = 0; i < n; i++) {
    comparisons++;
    const matches = arr[i].value === target;

    steps.push({
      array: JSON.parse(JSON.stringify(arr)),
      type: matches ? (STEP_TYPES?.SORTED || 'FOUND') : (STEP_TYPES?.COMPARE || 'COMPARE'),
      indices: [i],
      sortedIndices: matches ? [i] : [],
      target: target,
      currentIndex: i,
      foundIndex: matches ? i : -1,
      comparisons: comparisons,
      highlightedLines: matches ? [6] : [4, 5],
      explanation: matches 
        ? `Target value ${target} FOUND at index ${i} after ${comparisons} comparisons!`
        : `Checking index ${i}: arr[${i}] (${arr[i].value}) === ${target} ? False.`,
      operationText: matches ? `FOUND: index ${i}` : `${arr[i].value} === ${target} ? False`
    });

    if (matches) {
      found = true;
      break;
    }
  }

  if (!found) {
    steps.push({
      array: JSON.parse(JSON.stringify(arr)),
      type: STEP_TYPES?.HIGHLIGHT || 'NOT_FOUND',
      indices: [],
      sortedIndices: [],
      target: target,
      currentIndex: -1,
      foundIndex: -1,
      comparisons: comparisons,
      highlightedLines: [8],
      explanation: `Target value ${target} NOT FOUND in array after ${comparisons} total comparisons.`,
      operationText: 'Not Found'
    });
  }

  return steps;
}

    });
  }

  return steps;
}
