"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/app-node";
import { useEffect, useId, useState } from "react";

const StringParam = ({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex px-1">
        {param.name}{" "}
        {param?.required && <span className="text-red-600 ml-1">*</span>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        className="text-xs"
        value={internalValue}
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />
      <p className="text-xs text-muted-foreground px-1">{param.helperText}</p>
    </div>
  );
};

export default StringParam;
