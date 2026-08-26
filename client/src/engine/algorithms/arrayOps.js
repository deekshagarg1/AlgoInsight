export function generateArrayOpSteps(initialArray, operation = 'insert', params = {}) {
  const steps = [];
  let array = initialArray.map((val, idx) => ({ id: `arr-${val}-${idx}`, value: val }));

  if (operation === 'traverse') {
    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: 'START',
      activeIndex: -1,
      explanation: 'Starting linear traversal through all array elements.',
      operationText: 'Traverse Array'
    });
    for (let i = 0; i < array.length; i++) {
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        type: 'TRAVERSE',
        activeIndex: i,
        explanation: `Visited index ${i} with value ${array[i].value}.`,
        operationText: `Visited A[${i}] = ${array[i].value}`
      });
    }
  } else if (operation === 'insert') {
    const val = params.val !== undefined ? params.val : 42;
    const pos = params.pos !== undefined ? Math.min(params.pos, array.length) : array.length;

    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      type: 'START',
      activeIndex: pos,
      explanation: `Inserting value ${val} at index ${pos}.`,
      operationText: `Insert(${val}, at index ${pos})`
    });

    const newArr = [...array];
    newArr.splice(pos, 0, { id: `arr-${val}-${Date.now()}`, value: val });

    steps.push({
      array: JSON.parse(JSON.stringify(newArr)),
      type: 'INSERTED',
      activeIndex: pos,
      explanation: `Inserted value ${val} at index ${pos}. Subsequent elements shifted right.`,
      operationText: `Inserted ${val}`
    });
  } else if (operation === 'delete') {
    const pos = params.pos !== undefined ? params.pos : 0;
    if (array.length > 0) {
      const removedVal = array[pos]?.value;
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        type: 'BEFORE_DELETE',
        activeIndex: pos,
        explanation: `Targeting element at index ${pos} (Value: ${removedVal}) for deletion.`,
        operationText: `Delete A[${pos}]`
      });

      const newArr = [...array];
      newArr.splice(pos, 1);

      steps.push({
        array: JSON.parse(JSON.stringify(newArr)),
        type: 'DELETED',
        activeIndex: pos,
        explanation: `Deleted element ${removedVal} from index ${pos}. Subsequent elements shifted left.`,
        operationText: `Deleted ${removedVal}`
      });
    }
  } else if (operation === 'update') {
    const pos = params.pos !== undefined ? params.pos : 0;
    const val = params.val !== undefined ? params.val : 99;
    if (array.length > pos) {
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        type: 'BEFORE_UPDATE',
        activeIndex: pos,
        explanation: `Updating element at index ${pos} from ${array[pos].value} to ${val}.`,
        operationText: `Update A[${pos}]`
      });

      const newArr = [...array];
      newArr[pos] = { ...newArr[pos], value: val };

      steps.push({
        array: JSON.parse(JSON.stringify(newArr)),
        type: 'UPDATED',
        activeIndex: pos,
        explanation: `Updated element at index ${pos} to ${val}.`,
        operationText: `Updated A[${pos}] = ${val}`
      });
    }
  }

  return steps;
}
