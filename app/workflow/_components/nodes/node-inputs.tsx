import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import React, { ReactNode } from "react";
import NodeParamField from "@/app/workflow/_components/nodes/node-param-field";
import { ColorForHandle } from "./common";

export const NodeInputs = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  const edges = useEdges();
  const isConnected = edges.find(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} disabled={!!isConnected} />

      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!border-2 !border-background !-left-2 !size-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};