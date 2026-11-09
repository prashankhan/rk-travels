"use client";

import { useState } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Header / mobile CTA popup for a general journey enquiry. */
export function PlanJourneyDialog({ open, onOpenChange }: Props) {
  const [formKey, setFormKey] = useState(0);

  function handleOpenChange(next: boolean) {
    if (next) setFormKey((k) => k + 1);
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent aria-describedby="plan-journey-desc">
        <div className="relative overflow-y-auto px-5 pt-8 pb-8 sm:px-8 sm:pt-10 sm:pb-10">
          <span aria-hidden className="absolute top-0 left-5 h-1 w-16 bg-golden-yellow sm:left-8" />
          <div className="mb-8 flex max-w-[36ch] flex-col gap-3 pr-12">
            <p className="type-eyebrow text-golden-yellow">Plan your journey</p>
            <DialogTitle className="type-heading-1 text-navy">Tell us about your trip.</DialogTitle>
            <DialogDescription id="plan-journey-desc" className="type-lead text-charcoal">
              Share your dates and plans. We will reply on WhatsApp to talk it through.
            </DialogDescription>
          </div>
          {open ? <ContactForm key={formKey} /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
