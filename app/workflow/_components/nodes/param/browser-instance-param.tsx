"use client";

import { ParamProps } from "@/types/app-node";

const BrowserInstanceParam = ({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) => {
  return <p className="text-xs">{param.name}</p>;
};

export default BrowserInstanceParam;
