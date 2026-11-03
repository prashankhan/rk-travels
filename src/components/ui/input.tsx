import * as React from "react";
import { cn } from "@/lib/utils";

export const controlClass = cn(
  "w-full rounded-control border border-border-strong bg-white px-4 font-sans text-base leading-6 text-charcoal",
  "placeholder:text-muted transition-[border-color,box-shadow] duration-150 ease-brand",
  "hover:border-charcoal focus:outline-none focus-visible:outline-none focus:border-navy focus:shadow-[0_0_0_1px_var(--color-navy)]",
  "aria-invalid:border-error aria-invalid:shadow-[0_0_0_1px_var(--color-error)]",
  "disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-muted",
);

export function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return <input type={type} className={cn(controlClass, "h-[50px] min-w-0", className)} {...props} />;
}
