"use client";

import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SaveBtn from "./save-btn";

type ToolbarProps = {
  title: string;
  workflowId: string;
  subtitle?: string;
};

const Topbar = ({ title, subtitle, workflowId }: ToolbarProps) => {
  const router = useRouter();

  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex flex-1 gap-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft size={20} />
          </Button>
        </TooltipWrapper>
        <div className="">
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex gap-1 flex-1 justify-end">
          <SaveBtn workflowId={workflowId} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
