import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-control border border-transparent",
    "font-label font-bold uppercase tracking-tight no-underline cursor-pointer select-none",
    "transition-[background-color,border-color,color,transform] duration-150 ease-brand active:translate-y-px",
    "disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-muted disabled:border-transparent disabled:translate-y-0",
    "aria-disabled:cursor-not-allowed aria-disabled:bg-disabled-bg aria-disabled:text-muted aria-disabled:border-transparent",
    "[&_svg]:size-[18px] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-golden-yellow text-navy hover:bg-golden-yellow-hover",
        secondary: "bg-navy text-white hover:bg-navy-hover",
        outline: "bg-white border-navy text-navy hover:bg-warm-white",
        "outline-inverse": "bg-transparent border-white text-white hover:bg-white/12",
      },
      size: {
        md: "h-14 min-h-14 px-8 text-base leading-none",
        sm: "h-11 px-4 text-base leading-5",
      },
      fullWidth: { true: "flex w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean };

/** GT America Expanded, uppercase, square corners, 56px tall. */
export function Button({ className, variant, size, fullWidth, asChild = false, loading = false, disabled, children, ...props }: ButtonProps) {
  if (asChild) {
    return (
      <Slot.Root className={cn(buttonVariants({ variant, size, fullWidth }), className)} {...props}>
        {children}
      </Slot.Root>
    );
  }
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size, fullWidth }), loading && "cursor-progress", className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Loader2 aria-hidden className="animate-spin" /> : null}
      {children}
    </button>
  );
}
