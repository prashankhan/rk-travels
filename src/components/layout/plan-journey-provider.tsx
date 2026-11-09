"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { PlanJourneyDialog } from "./plan-journey-dialog";

type PlanJourneyContextValue = {
  openPlanJourney: () => void;
};

const PlanJourneyContext = createContext<PlanJourneyContextValue | null>(null);

export function PlanJourneyProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo<PlanJourneyContextValue>(
    () => ({ openPlanJourney: () => setOpen(true) }),
    [],
  );

  return (
    <PlanJourneyContext.Provider value={value}>
      {children}
      <PlanJourneyDialog open={open} onOpenChange={setOpen} />
    </PlanJourneyContext.Provider>
  );
}

export function usePlanJourney() {
  const ctx = useContext(PlanJourneyContext);
  if (!ctx) throw new Error("usePlanJourney must be used within PlanJourneyProvider");
  return ctx;
}
