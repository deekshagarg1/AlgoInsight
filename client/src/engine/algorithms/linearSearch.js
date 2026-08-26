export function generateLinearSearchSteps(initialArray, target = 22) {
  const steps = [];
  const array = initialArray.map((val, idx) => ({ id: `ls-${val}-${idx}`, value: val }));

  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'INITIAL',
    indices: [],
    target: target,
    currentIndex: -1,
    foundIndex: -1,
    comparisons: 0,
    highlightedLines: [1],
    explanation: `Searching for target value ${target} in array of size ${array.length}.`,
    operationText: `Target = ${target}`
  });

  let comparisons = 0;
  let found = false;

  for (let i = 0; i < array.length; i++) {
    comparisons++;
    const matches = array[i].value === target;

    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: matches ? 'FOUND' : 'COMPARE',
      indices: [i],
      target: target,
      currentIndex: i,
      foundIndex: matches ? i : -1,
      comparisons: comparisons,
      highlightedLines: matches ? [6] : [4],
      explanation: matches 
        ? `Target value ${target} FOUND at index ${i} after ${comparisons} comparisons!`
        : `Checking index ${i}: arr[${i}] (${array[i].value}) === ${target} ? False.`,
      operationText: `${array[i].value} === ${target} ? ${matches}`
    });

    if (matches) {
      found = true;
      break;
    }
  }

  if (!found) {
    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: 'NOT_FOUND',
      indices: [],
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
