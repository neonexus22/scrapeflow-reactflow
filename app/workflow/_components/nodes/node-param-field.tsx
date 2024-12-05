"use client";

import { TaskParam, TaskParamType } from "@/types/task";
import StringParam from "@/app/workflow/_components/nodes/param/string-param";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/app-node";
import { useCallback } from "react";
import BrowserInstanceParam from "./param/browser-instance-param";

const NodeParamField = ({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data?.inputs[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      const updatedInputs = { ...node.data.inputs };
      updateNodeData(nodeId, {
        inputs: {
          ...updatedInputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, param.name, node?.data?.inputs]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
