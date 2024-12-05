"use client";

import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "@/app/workflow/_components/nodes/node-component";
import { DragEvent, useCallback, useEffect } from "react";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskType } from "@/types/task";
import { AppNode } from "@/types/app-node";
import DeletableEdge from "./edges/deletable-edge";
import { TaskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");

    if (!taskType || typeof taskType === undefined) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = CreateFlowNode(taskType as TaskType, position);
    setNodes((prev) => prev.concat(newNode));
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prevEdges) => addEdge({ ...connection }, prevEdges));
      if (!connection.targetHandle) return;
      // Remove input value if is present on connection
      const node = nodes.find((nd) => {
        return nd.id === connection.target;
      });
      if (!node) return;
      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [updateNodeData, setEdges, nodes]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No self connection allowed
      if (connection.source === connection.target) return false;

      // Same taskParam type connection
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);
      if (!sourceNode || !targetNode) {
        console.error("Invalid connection: source or target node not found");
        return false;
      }

      const sourceTask = TaskRegistry[sourceNode.data.type];
      const targetTask = TaskRegistry[targetNode.data.type];

      const output = sourceTask.outputs.find(
        (o) => o.name === connection.sourceHandle
      );
      const input = targetTask.inputs.find(
        (i) => i.name === connection.targetHandle
      );
      if (input?.type !== output?.type) {
        console.error("Invalid connection: incompatible taskParam types");
        return false;
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };
      const detectedCycle = hasCycle(targetNode);
      return !detectedCycle;
    },
    [nodes, edges]
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
