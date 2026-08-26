export function generateGraphOpSteps(algo = 'bfs', startNode = 'A') {
  const steps = [];

  // Default Graph structure with 6 nodes A, B, C, D, E, F
  const nodes = [
    { id: 'A', label: 'A', x: 100, y: 50 },
    { id: 'B', label: 'B', x: 250, y: 50 },
    { id: 'C', label: 'C', x: 400, y: 50 },
    { id: 'D', label: 'D', x: 100, y: 180 },
    { id: 'E', label: 'E', x: 250, y: 180 },
    { id: 'F', label: 'F', x: 400, y: 180 },
  ];

  const edges = [
    { u: 'A', v: 'B', w: 4 },
    { u: 'A', v: 'D', w: 2 },
    { u: 'B', v: 'C', w: 5 },
    { u: 'B', v: 'E', w: 1 },
    { u: 'C', v: 'F', w: 3 },
    { u: 'D', v: 'E', w: 8 },
    { u: 'E', v: 'F', w: 6 },
  ];

  const adj = {
    A: [{ node: 'B', w: 4 }, { node: 'D', w: 2 }],
    B: [{ node: 'A', w: 4 }, { node: 'C', w: 5 }, { node: 'E', w: 1 }],
    C: [{ node: 'B', w: 5 }, { node: 'F', w: 3 }],
    D: [{ node: 'A', w: 2 }, { node: 'E', w: 8 }],
    E: [{ node: 'B', w: 1 }, { node: 'D', w: 8 }, { node: 'F', w: 6 }],
    F: [{ node: 'C', w: 3 }, { node: 'E', w: 6 }],
  };

  if (algo === 'bfs') {
    const queue = [startNode];
    const visited = new Set([startNode]);

    steps.push({
      nodes,
      edges,
      visited: Array.from(visited),
      currentNode: startNode,
      queueStackState: [...queue],
      explanation: `Starting Breadth-First Search (BFS) from Node ${startNode}. Enqueued ${startNode}.`,
      operationText: `BFS Start (${startNode})`
    });

    while (queue.length > 0) {
      const u = queue.shift();

      steps.push({
        nodes,
        edges,
        visited: Array.from(visited),
        currentNode: u,
        queueStackState: [...queue],
        explanation: `Dequeued Node ${u}. Inspecting adjacent unvisited neighbors.`,
        operationText: `Processing ${u}`
      });

      for (const neighbor of adj[u]) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          queue.push(neighbor.node);

          steps.push({
            nodes,
            edges,
            visited: Array.from(visited),
            currentNode: neighbor.node,
            activeEdge: { u, v: neighbor.node },
            queueStackState: [...queue],
            explanation: `Discovered Node ${neighbor.node} via edge (${u} -> ${neighbor.node}). Enqueued ${neighbor.node}.`,
            operationText: `Visited ${neighbor.node}`
          });
        }
      }
    }
  } else if (algo === 'dfs') {
    const stack = [startNode];
    const visited = new Set();

    steps.push({
      nodes,
      edges,
      visited: Array.from(visited),
      currentNode: startNode,
      queueStackState: [...stack],
      explanation: `Starting Depth-First Search (DFS) from Node ${startNode}. Pushed ${startNode} onto stack.`,
      operationText: `DFS Start (${startNode})`
    });

    while (stack.length > 0) {
      const u = stack.pop();
      if (!visited.has(u)) {
        visited.add(u);

        steps.push({
          nodes,
          edges,
          visited: Array.from(visited),
          currentNode: u,
          queueStackState: [...stack],
          explanation: `Popped Node ${u} from stack. Marked as visited.`,
          operationText: `Visited ${u}`
        });

        for (const neighbor of adj[u]) {
          if (!visited.has(neighbor.node)) {
            stack.push(neighbor.node);
          }
        }
      }
    }
  } else if (algo === 'dijkstra') {
    const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity, F: Infinity };
    const visited = new Set();
    dist[startNode] = 0;

    steps.push({
      nodes,
      edges,
      visited: Array.from(visited),
      distances: { ...dist },
      currentNode: startNode,
      explanation: `Starting Dijkstra's Shortest Path algorithm from Node ${startNode}. Set dist[${startNode}] = 0, all others = ∞.`,
      operationText: `Dijkstra Start`
    });

    for (let i = 0; i < nodes.length; i++) {
      let u = null;
      let minDist = Infinity;

      for (const node of nodes) {
        if (!visited.has(node.id) && dist[node.id] < minDist) {
          minDist = dist[node.id];
          u = node.id;
        }
      }

      if (u === null) break;
      visited.add(u);

      steps.push({
        nodes,
        edges,
        visited: Array.from(visited),
        distances: { ...dist },
        currentNode: u,
        explanation: `Picked unvisited Node ${u} with minimum distance ${minDist}.`,
        operationText: `Locked ${u} (dist=${minDist})`
      });

      for (const neighbor of adj[u]) {
        const alt = dist[u] + neighbor.w;
        if (alt < dist[neighbor.node]) {
          dist[neighbor.node] = alt;
          steps.push({
            nodes,
            edges,
            visited: Array.from(visited),
            distances: { ...dist },
            currentNode: neighbor.node,
            activeEdge: { u, v: neighbor.node },
            explanation: `Relaxed edge (${u} -> ${neighbor.node}, w=${neighbor.w}). Updated dist[${neighbor.node}] = ${alt}.`,
            operationText: `Relaxed ${neighbor.node} = ${alt}`
          });
        }
      }
    }
  }

  return steps;
}
