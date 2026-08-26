import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

export default function GraphVisualizer({
  nodes = [],
  edges = [],
  visited = [],
  currentNode = null,
  activeEdge = null,
  queueStackState = [],
  distances = null,
  operationText = ''
}) {
  return (
    <div className="w-full bg-[#161720] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 text-left shadow-2xl relative overflow-hidden min-h-[340px]">
      
      {/* Header Info */}
      <div className="flex justify-between items-center w-full font-mono text-[10px] font-bold text-slate-500 border-b border-slate-900 pb-2">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Share2 className="w-3.5 h-3.5" /> Graph Engine (Nodes & Weighted Edges)
        </span>
        <span>Visited Nodes: <span className="text-emerald-400 font-mono">[{visited.join(', ')}]</span></span>
      </div>

      {/* SVG Canvas for Graph Node & Edge Rendering */}
      <div className="relative w-full h-60 flex items-center justify-center my-auto">
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {/* Edges with Weights */}
          {edges.map((edge, idx) => {
            const uNode = nodes.find(n => n.id === edge.u);
            const vNode = nodes.find(n => n.id === edge.v);
            if (!uNode || !vNode) return null;

            const isActiveEdge = activeEdge && 
              ((activeEdge.u === edge.u && activeEdge.v === edge.v) || (activeEdge.u === edge.v && activeEdge.v === edge.u));

            const midX = (uNode.x + vNode.x) / 2;
            const midY = (uNode.y + vNode.y) / 2;

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={uNode.x}
                  y1={uNode.y}
                  x2={vNode.x}
                  y2={vNode.y}
                  stroke={isActiveEdge ? '#facc15' : '#334155'}
                  strokeWidth={isActiveEdge ? '3' : '2'}
                />
                {/* Weight Label */}
                <rect x={midX - 10} y={midY - 9} width="20" height="18" rx="4" fill="#0f172a" stroke="#1e293b" />
                <text x={midX} y={midY + 4} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  {edge.w}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="relative w-full h-full">
          {nodes.map(node => {
            const isCurrent = currentNode === node.id;
            const isVisited = visited.includes(node.id);

            let nodeClass = 'border-slate-700 bg-[#1a1b24] text-slate-300';
            let glowStyle = {};

            if (isCurrent) {
              nodeClass = 'border-yellow-400 bg-yellow-950/60 text-yellow-400 font-extrabold scale-110 z-20';
              glowStyle = { boxShadow: '0 0 15px rgba(250, 204, 21, 0.5)' };
            } else if (isVisited) {
              nodeClass = 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-bold';
            }

            return (
              <motion.div
                key={`gnode-${node.id}`}
                layout
                style={{
                  position: 'absolute',
                  left: `${node.x - 20}px`,
                  top: `${node.y - 20}px`,
                  ...glowStyle
                }}
                className={`w-10 h-10 rounded-2xl border-2 flex flex-col items-center justify-center font-mono text-xs transition-all ${nodeClass}`}
              >
                <span>{node.label}</span>
                {distances && distances[node.id] !== undefined && (
                  <span className="text-[7.5px] text-amber-400 font-bold">
                    {distances[node.id] === Infinity ? '∞' : distances[node.id]}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Queue/Stack State Display */}
      {queueStackState && queueStackState.length > 0 && (
        <div className="flex items-center gap-2 text-[10px] font-mono border-t border-slate-900 pt-2">
          <span className="text-slate-500 uppercase tracking-widest font-bold">Front Buffer:</span>
          <span className="text-cyan-400 font-bold">[{queueStackState.join(', ')}]</span>
        </div>
      )}

      {/* Operation Text Footer */}
      <div className="w-full text-center border-t border-slate-900/60 pt-2">
        <span className="text-xs font-mono font-bold text-yellow-300">
          {operationText}
        </span>
      </div>
    </div>
  );
}
