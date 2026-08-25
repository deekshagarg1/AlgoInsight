import { STEP_TYPES } from '../types';

/**
 * 8-Puzzle A* Search Solver Step Generator
 * 
 * Goal state: [1, 2, 3, 4, 5, 6, 7, 8, 0]
 * 
 * @param {number[]} originalArray - 1D array of 9 elements (0 to 8)
 * @returns {Array} List of step states
 */
export function generateEightPuzzleSteps(originalArray) {
  // Ensure array has exactly 9 elements
  let startState = [...originalArray];
  if (startState.length !== 9) {
    startState = [1, 2, 3, 0, 4, 6, 7, 5, 8]; // fallback preset
  }

  // Helper: Count Inversions
  function countInversions(arr) {
    let invCount = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
        if (arr[i] && arr[j] && arr[i] > arr[j]) {
          invCount++;
        }
      }
    }
    return invCount;
  }

  // Solvability check: Inversion count must be even
  const invs = countInversions(startState);
  const isSolvable = invs % 2 === 0;
  let autoSortedExplanation = '';

  if (!isSolvable) {
    // Correct unsolvable board by swapping first two non-zero elements
    let firstNonZero = -1;
    let secondNonZero = -1;
    for (let i = 0; i < 9; i++) {
      if (startState[i] !== 0) {
        if (firstNonZero === -1) {
          firstNonZero = i;
        } else {
          secondNonZero = i;
          break;
        }
      }
    }
    if (firstNonZero !== -1 && secondNonZero !== -1) {
      const tmp = startState[firstNonZero];
      startState[firstNonZero] = startState[secondNonZero];
      startState[secondNonZero] = tmp;
      autoSortedExplanation = ' Unsolvable board was auto-adjusted to guarantee solvability.';
    }
  }

  // Manhattan Distance Heuristic
  function getManhattan(state) {
    let dist = 0;
    for (let i = 0; i < 9; i++) {
      const val = state[i];
      if (val !== 0) {
        const goalRow = Math.floor((val - 1) / 3);
        const goalCol = (val - 1) % 3;
        const currRow = Math.floor(i / 3);
        const currCol = i % 3;
        dist += Math.abs(currRow - goalRow) + Math.abs(currCol - goalCol);
      }
    }
    return dist;
  }

  // Get neighbors helper
  function getNeighbors(state) {
    const neighbors = [];
    const zeroIdx = state.indexOf(0);
    const row = Math.floor(zeroIdx / 3);
    const col = zeroIdx % 3;

    const moves = [
      { r: -1, c: 0, label: 'Up' },
      { r: 1, c: 0, label: 'Down' },
      { r: 0, c: -1, label: 'Left' },
      { r: 0, c: 1, label: 'Right' }
    ];

    for (const move of moves) {
      const nextR = row + move.r;
      const nextC = col + move.c;
      if (nextR >= 0 && nextR < 3 && nextC >= 0 && nextC < 3) {
        const nextZeroIdx = nextR * 3 + nextC;
        const newBoard = [...state];
        // Swap empty tile 0 with adjacent tile
        newBoard[zeroIdx] = newBoard[nextZeroIdx];
        newBoard[nextZeroIdx] = 0;
        
        neighbors.push({
          board: newBoard,
          movedTile: newBoard[zeroIdx],
          moveLabel: move.label,
          swappedIdx: nextZeroIdx // index that became empty
        });
      }
    }
    return neighbors;
  }

  // A* Solver Execution
  const openSet = [];
  const closedSet = new Set();

  const startNode = {
    board: startState,
    g: 0,
    h: getManhattan(startState),
    parent: null,
    moveDetails: 'Initial Board'
  };

  // Push start state
  openSet.push(startNode);

  let goalNode = null;
  let exploredCount = 0;
  const maxStates = 6000; // prevent browser lockups

  while (openSet.length > 0) {
    // Sort openSet by f = g + h (smallest first)
    openSet.sort((a, b) => (a.g + a.h) - (b.g + b.h));
    const curr = openSet.shift();
    exploredCount++;

    if (curr.h === 0) {
      goalNode = curr;
      break;
    }

    closedSet.add(curr.board.toString());

    // Limit searches
    if (exploredCount > maxStates) {
      goalNode = curr; // fallback: return best attempt
      break;
    }

    const neighbors = getNeighbors(curr.board);
    for (const neighbor of neighbors) {
      const boardStr = neighbor.board.toString();
      if (!closedSet.has(boardStr)) {
        // Check if already in openSet with lower cost
        const existingNode = openSet.find(n => n.board.toString() === boardStr);
        const gCost = curr.g + 1;
        const hCost = getManhattan(neighbor.board);
        
        if (!existingNode || gCost < existingNode.g) {
          if (existingNode) {
            // Remove old node
            const idx = openSet.indexOf(existingNode);
            openSet.splice(idx, 1);
          }
          openSet.push({
            board: neighbor.board,
            g: gCost,
            h: hCost,
            parent: curr,
            moveDetails: `Moved Tile ${neighbor.movedTile} ${neighbor.moveLabel}`
          });
        }
      }
    }
  }

  // Reconstruct path
  const path = [];
  let current = goalNode;
  while (current !== null) {
    path.unshift(current);
    current = current.parent;
  }

  // Format Path nodes into dynamic Visualizer Step Frames
  const steps = [];
  const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  path.forEach((node, pIdx) => {
    // Map board values to objects
    const mappedArray = node.board.map((val, idx) => ({
      id: `tile-${val}`,
      value: val
    }));

    // Find correct sorted indexes (tiles in their correct goal positions)
    const sortedIndices = [];
    node.board.forEach((val, idx) => {
      if (val !== 0 && val === goalState[idx]) {
        sortedIndices.push(idx);
      }
    });

    const isLastStep = pIdx === path.length - 1 && node.h === 0;

    steps.push({
      array: mappedArray,
      type: isLastStep ? STEP_TYPES.SORTED : (pIdx === 0 ? STEP_TYPES.INITIAL : STEP_TYPES.COMPARE),
      indices: [], // empty for grid
      sortedIndices: sortedIndices,
      highlightedLines: isLastStep ? [24, 25] : (pIdx === 0 ? [18, 19, 20, 21] : [22, 23, 24, 29, 30, 31, 32]),
      i: node.board.indexOf(0), // empty index
      j: pIdx > 0 ? path[pIdx - 1].board.indexOf(0) : -1, // previous empty index to show swap
      minIdx: -1,
      explanation: pIdx === 0
        ? `Start Board State.${autoSortedExplanation} Initial Manhattan Distance h(n) = ${node.h}.`
        : `Step ${pIdx}: ${node.moveDetails}. Manhattan Distance h(n) = ${node.h}, Depth g(n) = ${node.g}.`,
      operationText: `f(n) = ${node.g} + ${node.h} = ${node.g + node.h}`
    });
  });

  return steps;
}
