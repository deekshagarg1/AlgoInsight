export function generateQueueOpSteps(initialQueue = [10, 20, 30], operation = 'enqueue', val = 40) {
  const steps = [];
  let queue = [...initialQueue];

  if (operation === 'enqueue') {
    steps.push({
      queue: [...queue],
      frontIdx: 0,
      rearIdx: queue.length - 1,
      type: 'BEFORE_ENQUEUE',
      explanation: `Enqueueing value ${val} at Rear. Rear pointer will advance to index ${queue.length}.`,
      operationText: `Enqueue(${val})`
    });

    queue.push(val);
    steps.push({
      queue: [...queue],
      frontIdx: 0,
      rearIdx: queue.length - 1,
      type: 'ENQUEUED',
      explanation: `Enqueued ${val} at Rear (index ${queue.length - 1}). Front stays at index 0 (${queue[0]}).`,
      operationText: `Rear = ${val}`
    });
  } else if (operation === 'dequeue') {
    if (queue.length > 0) {
      const dequeuedVal = queue[0];
      steps.push({
        queue: [...queue],
        frontIdx: 0,
        rearIdx: queue.length - 1,
        type: 'BEFORE_DEQUEUE',
        explanation: `Dequeueing element ${dequeuedVal} from Front (index 0). FIFO constraint.`,
        operationText: `Dequeue() -> ${dequeuedVal}`
      });

      queue.shift();
      steps.push({
        queue: [...queue],
        frontIdx: 0,
        rearIdx: Math.max(0, queue.length - 1),
        type: 'DEQUEUED',
        explanation: `Dequeued ${dequeuedVal}. New Front element is ${queue.length > 0 ? queue[0] : 'None (Queue Empty)'}.`,
        operationText: `Dequeued ${dequeuedVal}`
      });
    }
  }

  return steps;
}
