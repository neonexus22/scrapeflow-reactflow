"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowsForUsers() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized access");
  }
  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
