"use server";

import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflow";
import { auth } from "@clerk/nextjs/server";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";
import { AppNode } from "@/types/app-node";
import { Edge } from "@xyflow/react";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskType } from "@/types/task";

export async function CreateWorkflow(form: CreateWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized access");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  // lets add the flow entry point
  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      name: data.name,
      description: data.description || "",
    },
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}
