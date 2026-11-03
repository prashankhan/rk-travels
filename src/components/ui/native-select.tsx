import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { controlClass } from "./input";

/** Native select (best on mobile) styled like the inputs. */
export function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(controlClass, "h-[50px] cursor-pointer appearance-none pr-11 invalid:text-muted", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 size-[18px] -translate-y-1/2 text-navy" strokeWidth={1.75} />
    </div>
  );
}
