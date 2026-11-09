"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} className={cn("border-t border-border", props.className)} />;
}

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-border", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="m-0">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex w-full cursor-pointer items-center justify-between gap-4 py-7 text-left",
          "font-display text-[22px] leading-7 text-navy md:text-[24px] md:leading-8",
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          aria-hidden
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full border border-border-strong text-navy",
            "transition-[transform,background-color,border-color] duration-200 ease-brand group-hover:border-navy",
            "group-data-[state=open]:rotate-45 group-data-[state=open]:border-golden-yellow group-data-[state=open]:bg-golden-yellow",
          )}
        >
          <Plus className="size-[18px]" strokeWidth={1.75} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden" {...props}>
      <div className={cn("pr-14 pb-6 text-base leading-[26px] text-charcoal [&_p+p]:mt-3", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
