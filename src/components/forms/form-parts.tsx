"use client";

import * as React from "react";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";
import type { EnquiryType } from "@/lib/validations/enquiry";
import { cn } from "@/lib/utils";

/* ---------- Field ---------- */

type ControlProps = { id: string; "aria-invalid"?: true; "aria-describedby"?: string; "aria-required"?: true };

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  optional?: boolean;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {optional ? <span className="font-medium normal-case tracking-normal text-muted"> (optional)</span> : null}
      </Label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, "aria-required": optional ? undefined : true })}
      {hint ? (
        <p id={`${id}-hint`} className="type-caption text-muted">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-1.5 text-[13px] leading-[18px] font-medium text-error">
      <CircleAlert aria-hidden className="mt-px size-4 shrink-0" strokeWidth={1.75} />
      {message}
    </p>
  );
}

/* ---------- Status banner ---------- */

export function FormMessage({
  tone,
  title,
  children,
  action,
  focusOnMount,
}: {
  tone: "success" | "error" | "info";
  title?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  focusOnMount?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (focusOnMount) ref.current?.focus();
  }, [focusOnMount]);
  const Icon = tone === "success" ? CircleCheck : tone === "error" ? CircleAlert : Info;
  return (
    <div
      ref={ref}
      tabIndex={focusOnMount ? -1 : undefined}
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-menu border p-4 text-[15px] leading-[22px] text-charcoal focus:outline-none",
        tone === "success" && "border-success bg-success-tint",
        tone === "error" && "border-error bg-error-tint",
        tone === "info" && "border-border bg-warm-white",
      )}
    >
      <Icon aria-hidden className={cn("mt-px size-5 shrink-0", tone === "success" ? "text-success" : tone === "error" ? "text-error" : "text-navy")} strokeWidth={1.75} />
      <div className="flex flex-col gap-0.5">
        {title ? <p className="font-heading text-[15px] leading-[22px] font-semibold text-navy">{title}</p> : null}
        {children ? <div>{children}</div> : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
    </div>
  );
}

/* ---------- Honeypot ---------- */

export function Honeypot({ register }: { register: React.InputHTMLAttributes<HTMLInputElement> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  );
}

/* ---------- Submit logic ---------- */

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string; code?: string };

function newRequestId() {
  try {
    return crypto.randomUUID().replace(/-/g, "");
  } catch {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
  }
}

/**
 * Posts to /api/enquiry/[type]. Success is reported only when the server confirms the email
 * provider accepted the message. `generate_lead` fires only then.
 */
export function useEnquirySubmit<T extends FieldValues>(type: EnquiryType, event: AnalyticsEvent) {
  const [status, setStatus] = React.useState<Status>({ state: "idle" });
  const startedAt = React.useRef<number>(0);
  const requestId = React.useRef<string>("");
  const busy = React.useRef(false);

  React.useEffect(() => {
    startedAt.current = Date.now();
    requestId.current = newRequestId();
  }, []);

  async function submit(values: T, setError: UseFormSetError<T>) {
    if (busy.current) return;
    busy.current = true;
    setStatus({ state: "submitting" });
    try {
      const res = await fetch(`/api/enquiry/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current || undefined, requestId: requestId.current || undefined }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; code?: string; message?: string; fieldErrors?: Record<string, string> }
        | null;
      if (res.ok && data?.ok) {
        setStatus({ state: "success" });
        track("generate_lead", { form_type: type });
        track(event, { form_type: type });
        requestId.current = newRequestId();
        return;
      }
      if (data && !data.ok && data.fieldErrors) {
        for (const [name, message] of Object.entries(data.fieldErrors)) {
          setError(name as Path<T>, { type: "server", message });
        }
      }
      setStatus({
        state: "error",
        code: data && !data.ok ? data.code : undefined,
        message: (data && !data.ok && data.message) || "Your enquiry could not be sent. Please try again, or message us on WhatsApp.",
      });
    } catch {
      setStatus({ state: "error", message: "We could not reach the server. Check your connection and try again, or message us on WhatsApp." });
    } finally {
      busy.current = false;
    }
  }

  return { status, submit, reset: () => setStatus({ state: "idle" }) };
}

/* ---------- Layout pieces ---------- */

export function FormSuccess({ whatsappMessage, onReset }: { whatsappMessage: string; onReset: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <FormMessage
        tone="success"
        focusOnMount
        title="Thank you — your enquiry has been sent."
        action={
          <Button asChild size="sm" variant="outline">
            <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">
              <WhatsAppIcon /> Also message us on WhatsApp
            </a>
          </Button>
        }
      >
        We will reply on WhatsApp to confirm the details. Nothing is booked until we have confirmed it with you.
      </FormMessage>
      <button type="button" onClick={onReset} className="self-start text-[15px] text-navy underline decoration-border-strong underline-offset-[3px] hover:decoration-golden-yellow hover:decoration-2">
        Send another enquiry
      </button>
    </div>
  );
}

export function FormFooter({ status, submitLabel, whatsappMessage }: { status: Status; submitLabel: string; whatsappMessage: string }) {
  const submitting = status.state === "submitting";
  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      {status.state === "error" ? (
        <FormMessage
          tone="error"
          focusOnMount
          title={status.code === "email_not_configured" ? "Online enquiries are not available yet." : "Your enquiry could not be sent."}
          action={
            <Button asChild size="sm" variant="outline">
              <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">
                <WhatsAppIcon /> Message us on WhatsApp
              </a>
            </Button>
          }
        >
          {status.message}
        </FormMessage>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-caption max-w-[44ch] text-muted">
          Sending this form is an enquiry, not a booking. We reply on WhatsApp to confirm details and availability.
        </p>
        <Button type="submit" loading={submitting} className="sm:min-w-[200px]">
          {submitting ? "Sending enquiry" : submitLabel}
        </Button>
      </div>
    </div>
  );
}

/** Today's date as YYYY-MM-DD in the visitor's time zone (undefined during server render). */
function todayLocal() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
const noopSubscribe = () => () => {};
export function useToday(): string | undefined {
  return React.useSyncExternalStore(noopSubscribe, todayLocal, () => undefined);
}
