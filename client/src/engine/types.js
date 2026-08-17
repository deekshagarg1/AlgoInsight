/**
 * Action types for the visualization engine.
 * These act as states that the visualizer renderer will map to colors and animations.
 */
export const STEP_TYPES = {
  // Comparing two elements (usually highlights them in yellow/cyan)
  COMPARE: 'COMPARE',
  
  // Swapping two elements (highlights them in red and performs the physical swap animation)
  SWAP: 'SWAP',
  
  // Element is in its correct, final sorted position (highlights them in green)
  SORTED: 'SORTED',
  
  // Custom highlights or focus states (e.g. pivot in quick sort, bounds in binary search)
  HIGHLIGHT: 'HIGHLIGHT',
  
  // Initial state setup
  INITIAL: 'INITIAL'
};
