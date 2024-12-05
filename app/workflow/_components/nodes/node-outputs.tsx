"use client";

import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";
import { ColorForHandle } from "./common";

const NodeOutputs = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1 divide-y">{children}</div>;
};

export default NodeOutputs;

export const NodeOutput = ({ output }: { output: TaskParam }) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!border-2 !border-background !-right-2 !size-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
};
