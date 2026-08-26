export function generateBinarySearchSteps(initialArray, target = 22) {
  const steps = [];
  // Ensure array is sorted for binary search
  const sortedValues = [...initialArray].sort((a, b) => a - b);
  const array = sortedValues.map((val, idx) => ({ id: `bs-${val}-${idx}`, value: val }));

  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'INITIAL',
    indices: [],
    target: target,
    low: 0,
    high: array.length - 1,
    mid: -1,
    foundIndex: -1,
    comparisons: 0,
    highlightedLines: [1],
    explanation: `Array sorted for Binary Search. Target = ${target}. Setting initial search range [low: 0, high: ${array.length - 1}].`,
    operationText: `Target = ${target}`
  });

  let low = 0;
  let high = array.length - 1;
  let comparisons = 0;
  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    const midVal = array[mid].value;

    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: 'CALC_MID',
      indices: [mid],
      target: target,
      low: low,
      high: high,
      mid: mid,
      foundIndex: -1,
      comparisons: comparisons,
      highlightedLines: [4],
      explanation: `Calculated mid index = Math.floor((${low} + ${high}) / 2) = ${mid}. Inspecting arr[${mid}] (${midVal}).`,
      operationText: `mid = ${mid}, arr[mid] = ${midVal}`
    });

    if (midVal === target) {
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        type: 'FOUND',
        indices: [mid],
        target: target,
        low: low,
        high: high,
        mid: mid,
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
        target: target,
        low: mid + 1,
        high: high,
        mid: mid,
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
        target: target,
        low: low,
        high: mid - 1,
        mid: mid,
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
      target: target,
      low: low,
      high: high,
      mid: -1,
      foundIndex: -1,
      comparisons: comparisons,
      highlightedLines: [12],
      explanation: `Search range exhausted (low > high). Target ${target} NOT FOUND after ${comparisons} comparisons.`,
      operationText: 'Not Found'
    });
  }

  return steps;
}
