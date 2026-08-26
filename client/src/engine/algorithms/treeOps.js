export function generateTreeOpSteps(treeData = null, operation = 'inorder', val = 25) {
  const steps = [];

  // Default BST layout:
  //         50
  //       /    \
  //     30      70
  //    /  \    /  \
  //   20  40  60  80

  const nodes = [
    { id: 50, val: 50, x: 200, y: 30, left: 30, right: 70 },
    { id: 30, val: 30, x: 100, y: 90, left: 20, right: 40 },
    { id: 70, val: 70, x: 300, y: 90, left: 60, right: 80 },
    { id: 20, val: 20, x: 50, y: 150, left: null, right: null },
    { id: 40, val: 40, x: 150, y: 150, left: null, right: null },
    { id: 60, val: 60, x: 250, y: 150, left: null, right: null },
    { id: 80, val: 80, x: 350, y: 150, left: null, right: null },
  ];

  if (operation === 'inorder') {
    steps.push({
      nodes: nodes,
      visited: [],
      currentNode: null,
      traversalType: 'Inorder (Left -> Root -> Right)',
      explanation: 'Starting Inorder Traversal (Left Subtree -> Root Node -> Right Subtree). Yields sorted order.',
      operationText: 'Inorder Start'
    });

    const inorderOrder = [20, 30, 40, 50, 60, 70, 80];
    const visited = [];

    for (const nodeVal of inorderOrder) {
      visited.push(nodeVal);
      steps.push({
        nodes: nodes,
        visited: [...visited],
        currentNode: nodeVal,
        traversalType: 'Inorder',
        explanation: `Visited Node ${nodeVal}. Order so far: [${visited.join(', ')}].`,
        operationText: `Visited ${nodeVal}`
      });
    }
  } else if (operation === 'preorder') {
    steps.push({
      nodes: nodes,
      visited: [],
      currentNode: null,
      traversalType: 'Preorder (Root -> Left -> Right)',
      explanation: 'Starting Preorder Traversal (Root Node -> Left Subtree -> Right Subtree).',
      operationText: 'Preorder Start'
    });

    const preorderOrder = [50, 30, 20, 40, 70, 60, 80];
    const visited = [];

    for (const nodeVal of preorderOrder) {
      visited.push(nodeVal);
      steps.push({
        nodes: nodes,
        visited: [...visited],
        currentNode: nodeVal,
        traversalType: 'Preorder',
        explanation: `Visited Node ${nodeVal}. Order so far: [${visited.join(', ')}].`,
        operationText: `Visited ${nodeVal}`
      });
    }
  } else if (operation === 'postorder') {
    steps.push({
      nodes: nodes,
      visited: [],
      currentNode: null,
      traversalType: 'Postorder (Left -> Right -> Root)',
      explanation: 'Starting Postorder Traversal (Left Subtree -> Right Subtree -> Root Node).',
      operationText: 'Postorder Start'
    });

    const postorderOrder = [20, 40, 30, 60, 80, 70, 50];
    const visited = [];

    for (const nodeVal of postorderOrder) {
      visited.push(nodeVal);
      steps.push({
        nodes: nodes,
        visited: [...visited],
        currentNode: nodeVal,
        traversalType: 'Postorder',
        explanation: `Visited Node ${nodeVal}. Order so far: [${visited.join(', ')}].`,
        operationText: `Visited ${nodeVal}`
      });
    }
  } else if (operation === 'search') {
    const target = val || 60;
    steps.push({
      nodes: nodes,
      visited: [],
      currentNode: 50,
      explanation: `Searching for target ${target} in BST starting from Root (50).`,
      operationText: `Search(${target})`
    });

    let current = 50;
    const visited = [];

    while (current !== null) {
      visited.push(current);
      const currNode = nodes.find(n => n.id === current);
      
      if (currNode.val === target) {
        steps.push({
          nodes: nodes,
          visited: [...visited],
          currentNode: current,
          foundNode: current,
          explanation: `Target ${target} FOUND at node ${current}!`,
          operationText: `FOUND ${target}!`
        });
        break;
      } else if (target < currNode.val) {
        steps.push({
          nodes: nodes,
          visited: [...visited],
          currentNode: current,
          explanation: `Target ${target} < ${currNode.val}. Moving down LEFT branch.`,
          operationText: `${target} < ${currNode.val} -> Left`
        });
        current = currNode.left;
      } else {
        steps.push({
          nodes: nodes,
          visited: [...visited],
          currentNode: current,
          explanation: `Target ${target} > ${currNode.val}. Moving down RIGHT branch.`,
          operationText: `${target} > ${currNode.val} -> Right`
        });
        current = currNode.right;
      }
    }
  }

  return steps;
}
