import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

export default function TreeVisualizer({
  nodes = [],
  visited = [],
  currentNode = null,
  foundNode = null,
  traversalType = '',
  operationText = ''
}) {
  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 text-left shadow-2xl relative overflow-hidden min-h-[320px]">
      
      {/* Header Info */}
      <div className="flex justify-between items-center w-full font-mono text-[10px] font-bold text-slate-500 border-b border-slate-900 pb-2">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Network className="w-3.5 h-3.5" /> Binary Search Tree (BST)
        </span>
        <span>Visited List: <span className="text-emerald-400 font-mono">[{visited.join(', ')}]</span></span>
      </div>

      {/* SVG Canvas for Tree Node Rendering */}
      <div className="relative w-full h-56 flex items-center justify-center my-auto">
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {/* Branch Lines */}
          {nodes.map(node => {
            const leftChild = nodes.find(n => n.id === node.left);
            const rightChild = nodes.find(n => n.id === node.right);
            return (
              <React.Fragment key={`lines-${node.id}`}>
                {leftChild && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={leftChild.x}
                    y2={leftChild.y}
                    stroke="#334155"
                    strokeWidth="2"
                  />
                )}
                {rightChild && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={rightChild.x}
                    y2={rightChild.y}
                    stroke="#334155"
                    strokeWidth="2"
                  />
                )}
              </React.Fragment>
            );
          })}
        </svg>

        {/* Tree Nodes */}
        <div className="relative w-full h-full">
          {nodes.map(node => {
            const isCurrent = currentNode === node.id;
            const isVisited = visited.includes(node.id);
            const isFound = foundNode === node.id;

            let circleClass = 'border-slate-700 bg-[#1a1b24] text-slate-300';
            let glowStyle = {};

            if (isFound) {
              circleClass = 'border-emerald-450 bg-emerald-950/60 text-emerald-400 font-extrabold scale-125 z-20';
              glowStyle = { boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)' };
            } else if (isCurrent) {
              circleClass = 'border-yellow-400 bg-yellow-950/50 text-yellow-400 font-extrabold scale-110 z-20';
              glowStyle = { boxShadow: '0 0 15px rgba(250, 204, 21, 0.5)' };
            } else if (isVisited) {
              circleClass = 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-bold';
            }

            return (
              <motion.div
                key={`node-${node.id}`}
                layout
                style={{
                  position: 'absolute',
                  left: `${node.x - 18}px`,
                  top: `${node.y - 18}px`,
                  ...glowStyle
                }}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono text-xs transition-all ${circleClass}`}
              >
                {node.val}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Operation Footer */}
      <div className="w-full text-center border-t border-slate-900/60 pt-2.5">
        <span className="text-xs font-mono font-bold text-yellow-300">
          {operationText}
        </span>
      </div>
    </div>
  );
}
