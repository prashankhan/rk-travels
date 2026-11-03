import * as React from "react";
import { cn } from "@/lib/utils";
import { controlClass } from "./input";

export function Textarea({ className, rows = 5, ...props }: React.ComponentProps<"textarea">) {
  return <textarea rows={rows} className={cn(controlClass, "min-h-[132px] resize-y py-3", className)} {...props} />;
}
