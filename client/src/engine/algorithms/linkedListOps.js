export function generateLinkedListOpSteps(initialNodes = [10, 20, 30, 40], operation = 'traverse', params = {}) {
  const steps = [];
  let nodes = initialNodes.map((val, idx) => ({ id: `node-${val}-${idx}`, value: val, address: `0x${1000 + idx * 8}` }));

  if (operation === 'traverse') {
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      activeIdx: 0,
      explanation: 'Starting traversal from Head pointer (index 0).',
      operationText: 'Traverse Head -> Tail'
    });

    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        activeIdx: i,
        explanation: `Visited Node[${i}] = ${nodes[i].value} (Address: ${nodes[i].address}). Next -> ${i < nodes.length - 1 ? nodes[i + 1].address : 'NULL'}.`,
        operationText: `Visiting ${nodes[i].value}`
      });
    }
  } else if (operation === 'insertHead') {
    const val = params.val || 5;
    const newNode = { id: `node-${val}-${Date.now()}`, value: val, address: `0x${Math.floor(Math.random() * 8999 + 1000)}` };

    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      activeIdx: -1,
      newNode: newNode,
      explanation: `Created new Node(${val}) with address ${newNode.address}.`,
      operationText: `Create Node(${val})`
    });

    nodes.unshift(newNode);
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      activeIdx: 0,
      explanation: `Linked newNode.next -> old Head (${nodes[1]?.address || 'NULL'}). Updated Head pointer to newNode (${newNode.address}).`,
      operationText: `Head -> ${val}`
    });
  } else if (operation === 'insertTail') {
    const val = params.val || 50;
    const newNode = { id: `node-${val}-${Date.now()}`, value: val, address: `0x${Math.floor(Math.random() * 8999 + 1000)}` };

    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      activeIdx: nodes.length - 1,
      newNode: newNode,
      explanation: `Traversed to Tail node (${nodes[nodes.length - 1]?.value}). Linking Tail.next -> Node(${val}).`,
      operationText: `Tail.next -> ${val}`
    });

    nodes.push(newNode);
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      activeIdx: nodes.length - 1,
      explanation: `Appended Node(${val}) at tail. New Tail.next points to NULL.`,
      operationText: `Inserted ${val} at Tail`
    });
  } else if (operation === 'reverse') {
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      activeIdx: 0,
      explanation: 'Reversing Linked List using 3 pointers: prev = NULL, curr = Head, next = NULL.',
      operationText: 'Reverse List'
    });

    const reversed = [];
    for (let i = nodes.length - 1; i >= 0; i--) {
      reversed.push(nodes[i]);
      steps.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        activeIdx: i,
        explanation: `Flipping next pointer of Node(${nodes[i].value}).`,
        operationText: `Flipped Node(${nodes[i].value})`
      });
    }

    steps.push({
      nodes: JSON.parse(JSON.stringify(reversed)),
      activeIdx: 0,
      isReversed: true,
      explanation: 'Linked List reversal complete! Head now points to original tail node.',
      operationText: 'Reversal Done'
    });
  }

  return steps;
}
