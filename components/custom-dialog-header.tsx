"use client";

import { LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const CustomDialogHeader = ({
  title,
  subtitle,
  icon,
  iconClassName,
  titleClassName,
  subtitleClassName,
}: {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) => {
  const Icon = icon;
  return (
    <DialogHeader className="pt-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-3 mb-2">
          {Icon && (
            <Icon size={30} className={cn("stroke-primary", iconClassName)} />
          )}
          {title && (
            <p className={cn("text-xl, text-primary", titleClassName)}>
              {title}
            </p>
          )}
          {subtitle && (
            <p
              className={cn("text-sm text-muted-foreground", subtitleClassName)}
            >
              {subtitle}
            </p>
          )}
        </div>
      </DialogTitle>
    </DialogHeader>
  );
};

export default CustomDialogHeader;
