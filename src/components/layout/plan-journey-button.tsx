"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { usePlanJourney } from "./plan-journey-provider";
import { cn } from "@/lib/utils";

type ButtonVariants = VariantProps<typeof buttonVariants>;

type Props = {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  fullWidth?: boolean;
};

/** Opens the shared Plan your journey enquiry popup. */
export function PlanJourneyButton({
  children = "Plan your journey",
  className,
  variant = "primary",
  size = "md",
  fullWidth,
}: Props) {
  const { openPlanJourney } = usePlanJourney();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={cn(className)}
      onClick={openPlanJourney}
    >
      {children}
    </Button>
  );
}
