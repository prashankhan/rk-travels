"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} />;
}

/** Circle radio for stacked lists. */
export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "mt-px grid size-5 shrink-0 place-items-center rounded-full border border-border-strong bg-white",
        "transition-colors duration-150 hover:border-charcoal data-[state=checked]:border-navy",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="block size-2.5 rounded-full bg-navy" />
    </RadioGroupPrimitive.Item>
  );
}

/** Full-height option tile for two-to-four choice switches (e.g. pickup / drop-off). */
export function RadioTile({ className, children, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "flex min-h-[50px] items-center gap-3 rounded-control border border-border-strong bg-white px-4 text-left",
        "text-[15px] font-medium text-navy transition-colors duration-150 hover:border-charcoal",
        "data-[state=checked]:border-navy data-[state=checked]:bg-yellow-tint data-[state=checked]:shadow-[0_0_0_1px_var(--color-navy)]",
        "group",
        className,
      )}
      {...props}
    >
      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-border-strong bg-white group-data-[state=checked]:border-navy">
        <RadioGroupPrimitive.Indicator className="block size-2.5 rounded-full bg-navy" />
      </span>
      {children}
    </RadioGroupPrimitive.Item>
  );
}
