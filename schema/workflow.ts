import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const createWorkflowSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional(),
});

export type CreateWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;

export const createWorkflowSchemaResolver = zodResolver(createWorkflowSchema);
