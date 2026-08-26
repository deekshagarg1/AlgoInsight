import { STEP_TYPES } from '../types';

/**
 * Binary Search Step Generator
 * 
 * @param {number[]} initialArray - Raw number array
 * @param {number} target - Element to search for
 * @returns {Array} Step states
 */
export function generateBinarySearchSteps(initialArray = [], target = 22) {
  const steps = [];
  // Ensure array is sorted for binary search
  const isSorted = initialArray.every((val, idx) => idx === 0 || val >= initialArray[idx - 1]);
  const sortedValues = isSorted ? [...initialArray] : [...initialArray].sort((a, b) => a - b);
  const array = sortedValues.map((val, idx) => ({ id: `bs-${val}-${idx}`, value: val }));

  let low = 0;
  let high = array.length - 1;
  let comparisons = 0;
  let found = false;

  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: STEP_TYPES?.INITIAL || 'INITIAL',
    indices: [],
    sortedIndices: [],
    target: target,
    low: 0,
    high: array.length - 1,
    mid: -1,
    i: 0,
    j: array.length - 1,
    minIdx: -1,
    foundIndex: -1,
    comparisons: 0,
    highlightedLines: [1],
    explanation: `Array sorted for Binary Search. Target = ${target}. Setting initial search range [low: 0, high: ${array.length - 1}].`,
    operationText: `Target = ${target}`
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    const midVal = array[mid].value;

    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: STEP_TYPES?.HIGHLIGHT || 'CALC_MID',
      indices: [mid],
      sortedIndices: [],
      target: target,
      low: low,
      high: high,
      mid: mid,
      i: low,
      j: high,
      minIdx: mid,
      foundIndex: -1,
      comparisons: comparisons,
      highlightedLines: [4],
      explanation: `Calculated mid index = Math.floor((${low} + ${high}) / 2) = ${mid}. Inspecting arr[${mid}] (${midVal}).`,
      operationText: `mid = ${mid}, arr[mid] = ${midVal}`
    });

    if (midVal === target) {
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        type: STEP_TYPES?.SORTED || 'FOUND',
        indices: [mid],
        sortedIndices: [mid],
        target: target,
        low: low,
        high: high,
        mid: mid,
        i: low,
        j: high,
        minIdx: mid,
        foundIndex: mid,
        comparisons: comparisons,
        highlightedLines: [6],
        explanation: `Target value ${target} MATCHES arr[${mid}] (${midVal})! Found in ${comparisons} comparisons.`,
        operationText: `FOUND at index ${mid}!`
      });
      found = true;
      break;
    } else if (midVal < target) {
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        type: 'ADJUST_LOW',
        indices: [mid],
        sortedIndices: [],
        target: target,
        low: mid + 1,
        high: high,
        mid: mid,
        i: mid + 1,
        j: high,
        minIdx: mid,
        foundIndex: -1,
        comparisons: comparisons,
        highlightedLines: [8],
        explanation: `arr[${mid}] (${midVal}) < ${target}. Target lies in right half. Adjusting low = mid + 1 (${mid + 1}).`,
        operationText: `${midVal} < ${target} => low = ${mid + 1}`
      });
      low = mid + 1;
    } else {
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        type: 'ADJUST_HIGH',
        indices: [mid],
        sortedIndices: [],
        target: target,
        low: low,
        high: mid - 1,
        mid: mid,
        i: low,
        j: mid - 1,
        minIdx: mid,
        foundIndex: -1,
        comparisons: comparisons,
        highlightedLines: [10],
        explanation: `arr[${mid}] (${midVal}) > ${target}. Target lies in left half. Adjusting high = mid - 1 (${mid - 1}).`,
        operationText: `${midVal} > ${target} => high = ${mid - 1}`
      });
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: 'NOT_FOUND',
      indices: [],
      sortedIndices: [],
      target: target,
      low: low,
      high: high,
      mid: -1,
      i: low,
      j: high,
      minIdx: -1,
      foundIndex: -1,
      comparisons: comparisons,
      highlightedLines: [12],
      explanation: `Search range exhausted (low > high). Target ${target} NOT FOUND after ${comparisons} comparisons.`,
      operationText: 'Not Found'
    });
  }

  return steps;
}

    });
  }

  return steps;
}
