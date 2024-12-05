"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

type TooltipWrapperProps = {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "left" | "right" | "bottom";
};

const TooltipWrapper = ({
  children,
  content,
  side = "top",
}: TooltipWrapperProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
