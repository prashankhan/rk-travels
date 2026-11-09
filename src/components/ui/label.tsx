import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn("font-label text-sm leading-5 font-semibold uppercase tracking-tight text-navy", className)}
      {...props}
    />
  );
}
