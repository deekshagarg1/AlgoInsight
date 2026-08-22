import { STEP_TYPES } from '../types';

/**
 * Merge Sort Step Generator (Object Array version for stable keys)
 * 
 * Maps the input number array to an array of objects containing a stable id.
 * 
 * @param {number[]} originalArray - Raw number array
 * @returns {Array} Step states
 */
export function generateMergeSortSteps(originalArray) {
  const arr = originalArray.map((val, idx) => ({
    id: `item-${val}-${idx}`,
    value: val
  }));

  const steps = [];
  const n = arr.length;

  // Initial setup (Line 1: public void mergeSort(int[] arr, int l, int r) {)
  steps.push({
    array: [...arr],
    tempArray: [],
    type: STEP_TYPES.INITIAL,
    indices: [],
    sortedIndices: [],
    highlightedLines: [1],
    pass: 0,
    swapped: false,
    explanation: 'Start Merge Sort on array.',
    operationText: '',
    depth: 1,
    leftRange: [],
    rightRange: [],
    i: -1,
    j: -1
  });

  const mergeSort = (l, r, depth) => {
    if (l >= r) return;

    const m = l + Math.floor((r - l) / 2);

    // Line 4: int m = l + (r - l) / 2;
    steps.push({
      array: [...arr],
      tempArray: [],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [],
      highlightedLines: [4],
      pass: 0,
      swapped: false,
      explanation: `Divide: Split subarray from index ${l} to ${r} at middle index ${m}.`,
      operationText: `mid = ${m}`,
      depth,
      leftRange: [l, m],
      rightRange: [m + 1, r],
      i: -1,
      j: -1
    });

    // Line 7: mergeSort(arr, l, m);
    steps.push({
      array: [...arr],
      tempArray: [],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [],
      highlightedLines: [7],
      pass: 0,
      swapped: false,
      explanation: `Recursively sort left half: from index ${l} to ${m}.`,
      operationText: `sort [${l}...${m}]`,
      depth,
      leftRange: [l, m],
      rightRange: [],
      i: -1,
      j: -1
    });
    mergeSort(l, m, depth + 1);

    // Line 8: mergeSort(arr, m + 1, r);
    steps.push({
      array: [...arr],
      tempArray: [],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [],
      highlightedLines: [8],
      pass: 0,
      swapped: false,
      explanation: `Recursively sort right half: from index ${m + 1} to ${r}.`,
      operationText: `sort [${m + 1}...${r}]`,
      depth,
      leftRange: [],
      rightRange: [m + 1, r],
      i: -1,
      j: -1
    });
    mergeSort(m + 1, r, depth + 1);

    // Line 11: merge(arr, l, m, r);
    merge(l, m, r, depth);
  };

  const merge = (l, m, r, depth) => {
    // Create copy arrays
    const L = [];
    const R = [];
    const tempArray = []; // Accumulates sorted items dynamically

    for (let idxL = l; idxL <= m; idxL++) L.push({ ...arr[idxL] });
    for (let idxR = m + 1; idxR <= r; idxR++) R.push({ ...arr[idxR] });

    let i = 0;
    let j = 0;
    let k = l;

    // Line 15: merge phase starts
    steps.push({
      array: [...arr],
      tempArray: [],
      type: STEP_TYPES.HIGHLIGHT,
      indices: [],
      sortedIndices: [],
      highlightedLines: [15],
      pass: 0,
      swapped: false,
      explanation: `Merge: Combining sorted subarrays [${l}...${m}] and [${m + 1}...${r}].`,
      operationText: `merge [${l}...${r}]`,
      depth,
      leftRange: [l, m],
      rightRange: [m + 1, r],
      i: l,
      j: m + 1
    });

    while (i < L.length && j < R.length) {
      const leftIdx = l + i;
      const rightIdx = m + 1 + j;

      // Compare elements
      steps.push({
        array: [...arr],
        tempArray: [...tempArray],
        type: STEP_TYPES.COMPARE,
        indices: [leftIdx, rightIdx], 
        sortedIndices: [],
        highlightedLines: [25],
        pass: 0,
        swapped: false,
        explanation: `Compare left sub-element (${L[i].value}) with right sub-element (${R[j].value}).`,
        operationText: `${L[i].value} <= ${R[j].value}`,
        depth,
        leftRange: [l, m],
        rightRange: [m + 1, r],
        i: leftIdx,
        j: rightIdx
      });

      if (L[i].value <= R[j].value) {
        tempArray.push(L[i]);

        steps.push({
          array: [...arr],
          tempArray: [...tempArray],
          type: STEP_TYPES.SWAP,
          indices: [leftIdx],
          sortedIndices: [],
          highlightedLines: [26],
          pass: 0,
          swapped: true,
          explanation: `Take ${L[i].value} from the left run into temp[${tempArray.length - 1}].`,
          operationText: `temp[${tempArray.length - 1}] = ${L[i].value}`,
          depth,
          leftRange: [l, m],
          rightRange: [m + 1, r],
          i: leftIdx + 1,
          j: rightIdx
        });
        i++;
      } else {
        tempArray.push(R[j]);

        steps.push({
          array: [...arr],
          tempArray: [...tempArray],
          type: STEP_TYPES.SWAP,
          indices: [rightIdx],
          sortedIndices: [],
          highlightedLines: [28],
          pass: 0,
          swapped: true,
          explanation: `Take ${R[j].value} from the right run into temp[${tempArray.length - 1}].`,
          operationText: `temp[${tempArray.length - 1}] = ${R[j].value}`,
          depth,
          leftRange: [l, m],
          rightRange: [m + 1, r],
          i: leftIdx,
          j: rightIdx + 1
        });
        j++;
      }
      k++;
    }

    // Copy remaining elements of L[]
    while (i < L.length) {
      tempArray.push(L[i]);
      const leftIdx = l + i;

      steps.push({
        array: [...arr],
        tempArray: [...tempArray],
        type: STEP_TYPES.SWAP,
        indices: [leftIdx],
        sortedIndices: [],
        highlightedLines: [33],
        pass: 0,
        swapped: true,
        explanation: `Copy remaining element ${L[i].value} from left subarray to main array index ${k}.`,
        operationText: `temp[${tempArray.length - 1}] = ${L[i].value}`,
        depth,
        leftRange: [l, m],
        rightRange: [m + 1, r],
        i: leftIdx + 1,
        j: m + 1 + j
      });
      i++;
      k++;
    }

    // Copy remaining elements of R[]
    while (j < R.length) {
      tempArray.push(R[j]);
      const rightIdx = m + 1 + j;

      steps.push({
        array: [...arr],
        tempArray: [...tempArray],
        type: STEP_TYPES.SWAP,
        indices: [rightIdx],
        sortedIndices: [],
        highlightedLines: [36],
        pass: 0,
        swapped: true,
        explanation: `Copy remaining element ${R[j].value} from right subarray to main array index ${k}.`,
        operationText: `temp[${tempArray.length - 1}] = ${R[j].value}`,
        depth,
        leftRange: [l, m],
        rightRange: [m + 1, r],
        i: l + i,
        j: rightIdx + 1
      });
      j++;
      k++;
    }

    // Write back sorted tempArray into original arr array
    for (let s = 0; s < tempArray.length; s++) {
      arr[l + s] = tempArray[s];
    }

    // Highlight the merged partition as temporarily sorted
    const sortedSub = [];
    for (let s = l; s <= r; s++) sortedSub.push(s);

    steps.push({
      array: [...arr],
      tempArray: [], // Clear temp array after overwrite is complete
      type: STEP_TYPES.SORTED,
      indices: [],
      sortedIndices: sortedSub,
      highlightedLines: [11],
      pass: 0,
      swapped: true,
      explanation: `Subarray [${l}...${r}] merged and sorted successfully.`,
      operationText: `Merged [${l}...${r}]`,
      depth,
      leftRange: [],
      rightRange: [],
      i: -1,
      j: -1
    });
  };

  mergeSort(0, n - 1, 1);

  // Final sorted state
  const finalSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...arr],
    tempArray: [],
    type: STEP_TYPES.SORTED,
    indices: [],
    sortedIndices: finalSorted,
    highlightedLines: [13],
    pass: 0,
    swapped: false,
    explanation: 'Merge Sort complete! The entire array is sorted.',
    operationText: 'Completed',
    depth: 1,
    leftRange: [],
    rightRange: [],
    i: -1,
    j: -1
  });

  return steps;
}
