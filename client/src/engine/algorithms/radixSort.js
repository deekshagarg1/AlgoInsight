export function generateRadixSortSteps(initialArray) {
  const steps = [];
  let array = initialArray.map((val, idx) => ({ id: `r-${val}-${idx}-${Math.random()}`, value: val }));
  const n = array.length;

  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'INITIAL',
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Initial unsorted array. Radix Sort will process numbers digit-by-digit (LSD).',
    operationText: ''
  });

  const maxVal = Math.max(...array.map(item => item.value));

  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    const output = new Array(n);
    const count = new Array(10).fill(0);

    const placeName = exp === 1 ? 'Ones' : exp === 10 ? 'Tens' : 'Hundreds';

    // Store count of occurrences
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(array[i].value / exp) % 10;
      count[digit]++;

      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        type: 'COMPARE',
        indices: [i],
        sortedIndices: [],
        highlightedLines: [4],
        pass: exp,
        swapped: false,
        explanation: `Inspecting ${placeName} place digit of element ${array[i].value} (Digit: ${digit}). Incrementing count bucket ${digit}.`,
        operationText: `Digit(${array[i].value}, ${placeName}) = ${digit}`
      });
    }

    // Change count[i] so that count[i] contains actual position in output
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(array[i].value / exp) % 10;
      output[count[digit] - 1] = array[i];
      count[digit]--;
    }

    // Copy the output array to array
    array = output.map((item, idx) => ({ ...item, id: `r-${item.value}-${idx}-${Math.random()}` }));

    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: 'PASS_COMPLETE',
      indices: [],
      sortedIndices: [],
      highlightedLines: [8],
      pass: exp,
      swapped: true,
      explanation: `Completed sorting pass for ${placeName} place values (exp=${exp}).`,
      operationText: `Pass for ${placeName} done`
    });
  }

  const allIndices = Array.from({ length: n }, (_, k) => k);
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    type: 'COMPLETED',
    indices: [],
    sortedIndices: allIndices,
    highlightedLines: [10],
    pass: 100,
    swapped: false,
    explanation: 'Radix Sort completed successfully! Array is fully sorted across all digits.',
    operationText: 'Sorted!'
  });

  return steps;
}
