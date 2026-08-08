
"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import { useGraph } from "@/lib/hooks/useGraph";

export default function IOCRelationshipGraph() {
  const { data, isLoading } = useGraph();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
        Loading Relationship Graph...
      </div>
    );
  }

  const nodes =
    data?.nodes.map((node, index) => ({
      id: node.id,
      data: {
        label: node.label,
      },
      position: {
        x: 150 + index * 180,
        y: 180,
      },
    })) ?? [];

  const edges =
    data?.edges.map((edge, index) => ({
      id: String(index),
      source: edge.source,
      target: edge.target,
    })) ?? [];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-4">
        <h2 className="text-lg font-semibold text-white">
          IOC Relationship Graph
        </h2>

        <p className="text-sm text-slate-400">
          Visual relationships between indicators.
        </p>
      </div>

      <div className="h-[550px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}