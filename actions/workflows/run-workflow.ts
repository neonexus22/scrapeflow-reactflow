"use server";

import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan";
import { WorkflowExecutionPlan } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized access");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("Invalid workflowId");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  if (!flowDefinition) {
    throw new Error("Invalid flowDefinition");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("Flow definition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("Failed to generate execution plan");
  }

  executionPlan = result.executionPlan;

  console.log({ executionPlan });
}
