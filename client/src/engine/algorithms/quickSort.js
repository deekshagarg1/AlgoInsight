export function generateQuickSortSteps(initialArray) {
  const steps = [];
  const array = initialArray.map((val, idx) => ({ id: `q-${val}-${idx}-${Math.random()}`, value: val }));
  
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'INITIAL',
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Initial unsorted array ready for Quick Sort.',
    operationText: ''
  });

  const sortedIndices = [];

  function quickSortHelper(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      sortedIndices.push(pi);
      
      steps.push({
        array: JSON.parse(JSON.stringify(arr)),
        type: 'PIVOT_SETTLED',
        indices: [pi],
        sortedIndices: [...sortedIndices],
        highlightedLines: [12],
        pass: low + 1,
        swapped: false,
        explanation: `Pivot element ${arr[pi].value} is now locked in its final sorted position at index ${pi}.`,
        operationText: `Pivot = ${arr[pi].value}`
      });

      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    } else if (low === high && !sortedIndices.includes(low)) {
      sortedIndices.push(low);
    }
  }

  function partition(arr, low, high) {
    const pivot = arr[high].value;
    let i = low - 1;

    steps.push({
      array: JSON.parse(JSON.stringify(arr)),
      type: 'SELECT_PIVOT',
      indices: [high],
      sortedIndices: [...sortedIndices],
      highlightedLines: [4],
      pass: low + 1,
      swapped: false,
      minIdx: high,
      i: i >= 0 ? i : 0,
      j: low,
      explanation: `Chosen pivot value ${pivot} at index ${high}. Partitioning subarray bounds [${low}..${high}].`,
      operationText: `Pivot = ${pivot}`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: JSON.parse(JSON.stringify(arr)),
        type: 'COMPARE',
        indices: [j, high],
        sortedIndices: [...sortedIndices],
        highlightedLines: [6],
        pass: low + 1,
        swapped: false,
        minIdx: high,
        i: i >= 0 ? i : 0,
        j: j,
        explanation: `Comparing arr[${j}] (${arr[j].value}) with pivot (${pivot}).`,
        operationText: `${arr[j].value} <= ${pivot} ? ${arr[j].value <= pivot}`
      });

      if (arr[j].value <= pivot) {
        i++;
        if (i !== j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            array: JSON.parse(JSON.stringify(arr)),
            type: 'SWAP',
            indices: [i, j],
            sortedIndices: [...sortedIndices],
            highlightedLines: [8],
            pass: low + 1,
            swapped: true,
            minIdx: high,
            i: i,
            j: j,
            explanation: `Swapping arr[${i}] (${arr[j].value}) and arr[${j}] (${arr[i].value}) to place elements <= pivot on the left.`,
            operationText: `Swap(${arr[j].value}, ${arr[i].value})`
          });
        }
      }
    }

    const tempPivot = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = tempPivot;

    steps.push({
      array: JSON.parse(JSON.stringify(arr)),
      type: 'SWAP',
      indices: [i + 1, high],
      sortedIndices: [...sortedIndices],
      highlightedLines: [10],
      pass: low + 1,
      swapped: true,
      minIdx: i + 1,
      explanation: `Placing pivot ${pivot} into its correct sorted position at index ${i + 1}.`,
      operationText: `Swap Pivot to index ${i + 1}`
    });

    return i + 1;
  }

  quickSortHelper(array, 0, array.length - 1);

  const allIndices = Array.from({ length: array.length }, (_, k) => k);
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'COMPLETED',
    indices: [],
    sortedIndices: allIndices,
    highlightedLines: [15],
    pass: array.length,
    swapped: false,
    explanation: 'Quick Sort completed successfully! Array is fully sorted.',
    operationText: 'Sorted!'
  });

  return steps;
}
