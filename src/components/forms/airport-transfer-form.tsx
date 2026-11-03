"use client";

import { useId } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { airportTransferSchema } from "@/lib/validations/enquiry";
import { whatsappMessages } from "@/lib/whatsapp";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioTile } from "@/components/ui/radio-group";
import { Field, FieldError, FormFooter, FormSuccess, Honeypot, useEnquirySubmit, useToday } from "./form-parts";

type In = z.input<typeof airportTransferSchema>;
type Out = z.output<typeof airportTransferSchema>;

export function AirportTransferForm() {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const today = useToday();
  const form = useForm<In, unknown, Out>({
    resolver: zodResolver(airportTransferSchema),
    mode: "onTouched",
    defaultValues: { transferType: "pickup", fullName: "", whatsapp: "", pickupLocation: "", dropoffLocation: "", travelDate: "", pickupTime: "", passengers: "", flightNumber: "", additionalRequirements: "", website: "" },
  });
  const { register, handleSubmit, control, setError, formState: { errors } } = form;
  const { status, submit, reset } = useEnquirySubmit<In>("airport-transfer", "airport_transfer_enquiry");
  const type = useWatch({ control, name: "transferType" });

  if (status.state === "success")
    return <FormSuccess whatsappMessage={whatsappMessages.airport} onReset={() => { form.reset(); reset(); }} />;

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v as In, setError))} className="relative flex flex-col gap-6" aria-label="Airport transfer enquiry">
      <Honeypot register={register("website")} />
      <fieldset className="flex flex-col gap-3" aria-describedby={errors.transferType ? id("type-error") : undefined}>
        <legend className="mb-3 text-sm leading-5 font-medium text-navy">Transfer type</legend>
        <Controller
          control={control}
          name="transferType"
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Transfer type">
              <RadioTile value="pickup">Airport pickup</RadioTile>
              <RadioTile value="dropoff">Airport drop-off</RadioTile>
            </RadioGroup>
          )}
        />
        <FieldError id={id("type-error")} message={errors.transferType?.message} />
      </fieldset>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.fullName?.message}>
          {(p) => <Input {...p} autoComplete="name" {...register("fullName")} />}
        </Field>
        <Field id={id("wa")} label="WhatsApp number" hint="Include your country code, e.g. +44." error={errors.whatsapp?.message}>
          {(p) => <Input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="+44 7700 900123" {...register("whatsapp")} />}
        </Field>
        <Field id={id("from")} label="Pickup location" error={errors.pickupLocation?.message}>
          {(p) => <Input {...p} placeholder={type === "pickup" ? "e.g. Bandaranaike International Airport" : "e.g. your hotel in Negombo"} {...register("pickupLocation")} />}
        </Field>
        <Field id={id("to")} label="Drop-off location" error={errors.dropoffLocation?.message}>
          {(p) => <Input {...p} placeholder={type === "pickup" ? "e.g. your hotel or address" : "e.g. Bandaranaike International Airport"} {...register("dropoffLocation")} />}
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Field id={id("date")} label="Travel date" error={errors.travelDate?.message}>
          {(p) => <Input {...p} type="date" min={today} {...register("travelDate")} />}
        </Field>
        <Field id={id("time")} label="Pickup time" error={errors.pickupTime?.message}>
          {(p) => <Input {...p} type="time" {...register("pickupTime")} />}
        </Field>
        <Field id={id("pax")} label="Number of passengers" error={errors.passengers?.message}>
          {(p) => <Input {...p} type="number" inputMode="numeric" min={1} max={60} {...register("passengers")} />}
        </Field>
      </div>

      <Field id={id("flight")} label="Flight number" optional hint="Helps us plan around your arrival time." error={errors.flightNumber?.message} className="md:max-w-[calc(50%-12px)]">
        {(p) => <Input {...p} placeholder="e.g. UL 504" autoCapitalize="characters" {...register("flightNumber")} />}
      </Field>

      <Field id={id("more")} label="Additional requirements" optional hint="Child seats, extra luggage, accessibility needs, a return journey." error={errors.additionalRequirements?.message}>
        {(p) => <Textarea {...p} {...register("additionalRequirements")} />}
      </Field>

      <FormFooter status={status} submitLabel="Request transfer" whatsappMessage={whatsappMessages.airport} />
    </form>
  );
}
