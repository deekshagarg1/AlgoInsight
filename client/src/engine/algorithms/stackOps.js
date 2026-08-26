export function generateStackOpSteps(initialStack = [10, 20, 30], operation = 'push', val = 40) {
  const steps = [];
  let stack = [...initialStack];

  if (operation === 'push') {
    steps.push({
      stack: [...stack],
      topIdx: stack.length - 1,
      animatingVal: val,
      type: 'BEFORE_PUSH',
      explanation: `Pushing value ${val} onto top of stack. Incrementing Top pointer to index ${stack.length}.`,
      operationText: `Push(${val})`
    });

    stack.push(val);
    steps.push({
      stack: [...stack],
      topIdx: stack.length - 1,
      animatingVal: null,
      type: 'PUSHED',
      explanation: `Pushed ${val} onto stack. Top element is now ${val} at index ${stack.length - 1}.`,
      operationText: `Top = ${val}`
    });
  } else if (operation === 'pop') {
    if (stack.length > 0) {
      const poppedVal = stack[stack.length - 1];
      steps.push({
        stack: [...stack],
        topIdx: stack.length - 1,
        animatingVal: poppedVal,
        type: 'BEFORE_POP',
        explanation: `Popping top element (${poppedVal}) from index ${stack.length - 1}. Decrementing Top pointer.`,
        operationText: `Pop() -> ${poppedVal}`
      });

      stack.pop();
      steps.push({
        stack: [...stack],
        topIdx: stack.length - 1,
        animatingVal: null,
        type: 'POPPED',
        explanation: `Popped ${poppedVal}. Top element is now ${stack.length > 0 ? stack[stack.length - 1] : 'None (Stack Empty)'}.`,
        operationText: `Popped ${poppedVal}`
      });
    }
  } else if (operation === 'peek') {
    if (stack.length > 0) {
      const peekVal = stack[stack.length - 1];
      steps.push({
        stack: [...stack],
        topIdx: stack.length - 1,
        animatingVal: null,
        type: 'PEEK',
        explanation: `Peek operation returns top element ${peekVal} at index ${stack.length - 1} without modifying stack.`,
        operationText: `Peek() = ${peekVal}`
      });
    }
  }

  return steps;
}
