export function generateHeapSortSteps(initialArray) {
  const steps = [];
  const array = initialArray.map((val, idx) => ({ id: `h-${val}-${idx}-${Math.random()}`, value: val }));
  const n = array.length;
  const sortedIndices = [];

  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'INITIAL',
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Initial unsorted array. Heap Sort will first build a Max-Heap structure.',
    operationText: ''
  });

  function heapify(arr, size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      steps.push({
        array: JSON.parse(JSON.stringify(arr)),
        type: 'COMPARE',
        indices: [left, largest],
        sortedIndices: [...sortedIndices],
        highlightedLines: [4],
        pass: i + 1,
        swapped: false,
        explanation: `Comparing left child arr[${left}] (${arr[left].value}) with current largest arr[${largest}] (${arr[largest].value}).`,
        operationText: `${arr[left].value} > ${arr[largest].value}`
      });
      if (arr[left].value > arr[largest].value) {
        largest = left;
      }
    }

    if (right < size) {
      steps.push({
        array: JSON.parse(JSON.stringify(arr)),
        type: 'COMPARE',
        indices: [right, largest],
        sortedIndices: [...sortedIndices],
        highlightedLines: [6],
        pass: i + 1,
        swapped: false,
        explanation: `Comparing right child arr[${right}] (${arr[right].value}) with current largest arr[${largest}] (${arr[largest].value}).`,
        operationText: `${arr[right].value} > ${arr[largest].value}`
      });
      if (arr[right].value > arr[largest].value) {
        largest = right;
      }
    }

    if (largest !== i) {
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      steps.push({
        array: JSON.parse(JSON.stringify(arr)),
        type: 'SWAP',
        indices: [i, largest],
        sortedIndices: [...sortedIndices],
        highlightedLines: [8],
        pass: i + 1,
        swapped: true,
        explanation: `Swapping root arr[${i}] with larger child arr[${largest}] to enforce Max-Heap property.`,
        operationText: `Swap(${arr[largest].value}, ${arr[i].value})`
      });

      heapify(arr, size, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }

  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'HEAP_BUILT',
    indices: [0],
    sortedIndices: [],
    highlightedLines: [10],
    pass: 1,
    swapped: false,
    explanation: `Max-Heap construction finished. Max element ${array[0].value} is now at root index 0.`,
    operationText: `Max Root = ${array[0].value}`
  });

  // One by one extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    sortedIndices.unshift(i);

    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: 'SWAP',
      indices: [0, i],
      sortedIndices: [...sortedIndices],
      highlightedLines: [12],
      pass: n - i,
      swapped: true,
      explanation: `Extracted max element ${temp.value} from root to sorted index ${i}. Heapifying remaining elements [0..${i - 1}].`,
      operationText: `Moved Max ${temp.value} to index ${i}`
    });

    heapify(array, i, 0);
  }
  sortedIndices.unshift(0);

  const allIndices = Array.from({ length: n }, (_, k) => k);
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'COMPLETED',
    indices: [],
    sortedIndices: allIndices,
    highlightedLines: [15],
    pass: n,
    swapped: false,
    explanation: 'Heap Sort completed successfully! Array is fully sorted.',
    operationText: 'Sorted!'
  });

  return steps;
}
