"use client";

import { useId } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { tourSchema } from "@/lib/validations/enquiry";
import { whatsappMessages } from "@/lib/whatsapp";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormFooter, FormSuccess, Honeypot, useEnquirySubmit, useToday } from "./form-parts";

type In = z.input<typeof tourSchema>;
type Out = z.output<typeof tourSchema>;

export function TourForm() {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const today = useToday();
  const form = useForm<In, unknown, Out>({
    resolver: zodResolver(tourSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", whatsapp: "", destinations: "", startDate: "", endDate: "", duration: "", travellers: "", pickupLocation: "", additionalRequirements: "", website: "" },
  });
  const { register, handleSubmit, control, setError, formState: { errors } } = form;
  const { status, submit, reset } = useEnquirySubmit<In>("tour", "tour_enquiry");
  const start = useWatch({ control, name: "startDate" });

  if (status.state === "success")
    return <FormSuccess whatsappMessage={whatsappMessages.tour} onReset={() => { form.reset(); reset(); }} />;

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v as In, setError))} className="relative flex flex-col gap-6" aria-label="Custom tour enquiry">
      <Honeypot register={register("website")} />
      <div className="grid gap-6 md:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.fullName?.message}>
          {(p) => <Input {...p} autoComplete="name" {...register("fullName")} />}
        </Field>
        <Field id={id("wa")} label="WhatsApp number" hint="Include your country code, e.g. +44." error={errors.whatsapp?.message}>
          {(p) => <Input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="+44 7700 900123" {...register("whatsapp")} />}
        </Field>
      </div>
      <Field id={id("dest")} label="Preferred destinations" hint="List the places you would like to see, or tell us the kind of trip you have in mind." error={errors.destinations?.message}>
        {(p) => <Textarea {...p} rows={3} className="min-h-[96px]" placeholder="e.g. Sigiriya, Kandy, Ella and a few days on the south coast" {...register("destinations")} />}
      </Field>
      <div className="grid gap-6 md:grid-cols-3">
        <Field id={id("start")} label="Travel start date" error={errors.startDate?.message}>
          {(p) => <Input {...p} type="date" min={today} {...register("startDate")} />}
        </Field>
        <Field id={id("end")} label="Travel end date" optional error={errors.endDate?.message}>
          {(p) => <Input {...p} type="date" min={start || today} {...register("endDate")} />}
        </Field>
        <Field id={id("dur")} label="Or trip length" optional hint="If you do not have an end date yet." error={errors.duration?.message}>
          {(p) => <Input {...p} placeholder="e.g. 7 days" {...register("duration")} />}
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field id={id("pax")} label="Number of travellers" error={errors.travellers?.message}>
          {(p) => <Input {...p} type="number" inputMode="numeric" min={1} max={99} {...register("travellers")} />}
        </Field>
        <Field id={id("pick")} label="Pickup location" error={errors.pickupLocation?.message}>
          {(p) => <Input {...p} placeholder="e.g. the airport or your hotel" {...register("pickupLocation")} />}
        </Field>
      </div>
      <Field id={id("more")} label="Additional requirements" optional hint="Interests, pace, children's ages, accessibility needs." error={errors.additionalRequirements?.message}>
        {(p) => <Textarea {...p} {...register("additionalRequirements")} />}
      </Field>
      <FormFooter status={status} submitLabel="Request a tour plan" whatsappMessage={whatsappMessages.tour} />
    </form>
  );
}
