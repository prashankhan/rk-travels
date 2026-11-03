"use client";

/** Rendered on the client so a statically built page still shows the current year. */
export function CopyrightYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
