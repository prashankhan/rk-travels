"use client";

import { useId } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { vehicleRentalSchema } from "@/lib/validations/enquiry";
import { whatsappMessages } from "@/lib/whatsapp";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FormFooter, FormSuccess, Honeypot, useEnquirySubmit, useToday } from "./form-parts";

type In = z.input<typeof vehicleRentalSchema>;
type Out = z.output<typeof vehicleRentalSchema>;

const driverOptions = [
  { value: "with-driver", label: "With a driver" },
  { value: "self-drive", label: "Self-drive" },
  { value: "no-preference", label: "Not sure yet" },
] as const;

export function VehicleRentalForm({ defaultCategory }: { defaultCategory?: In["vehicleCategory"] }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const today = useToday();
  const form = useForm<In, unknown, Out>({
    resolver: zodResolver(vehicleRentalSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", whatsapp: "", vehicleCategory: defaultCategory, startDate: "", endDate: "", pickupLocation: "", driverPreference: "", additionalRequirements: "", website: "" },
  });
  const { register, handleSubmit, control, setError, formState: { errors } } = form;
  const { status, submit, reset } = useEnquirySubmit<In>("vehicle-rental", "vehicle_rental_enquiry");
  const start = useWatch({ control, name: "startDate" });

  if (status.state === "success")
    return <FormSuccess whatsappMessage={whatsappMessages.rental} onReset={() => { form.reset(); reset(); }} />;

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v as In, setError))} className="relative flex flex-col gap-6" aria-label="Vehicle rental enquiry">
      <Honeypot register={register("website")} />
      <div className="grid gap-6 md:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.fullName?.message}>
          {(p) => <Input {...p} autoComplete="name" {...register("fullName")} />}
        </Field>
        <Field id={id("wa")} label="WhatsApp number" hint="Include your country code, e.g. +44." error={errors.whatsapp?.message}>
          {(p) => <Input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="+44 7700 900123" {...register("whatsapp")} />}
        </Field>
        <Field id={id("cat")} label="Preferred vehicle category" error={errors.vehicleCategory?.message}>
          {(p) => (
            <NativeSelect {...p} defaultValue={defaultCategory ?? ""} {...register("vehicleCategory")}>
              <option value="" disabled>Choose a category</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="tuk-tuk">Tuk-tuk</option>
            </NativeSelect>
          )}
        </Field>
        <Field id={id("pick")} label="Pickup location" error={errors.pickupLocation?.message}>
          {(p) => <Input {...p} placeholder="e.g. Negombo, or the airport" {...register("pickupLocation")} />}
        </Field>
        <Field id={id("start")} label="Rental start date" error={errors.startDate?.message}>
          {(p) => <Input {...p} type="date" min={today} {...register("startDate")} />}
        </Field>
        <Field id={id("end")} label="Rental end date" error={errors.endDate?.message}>
          {(p) => <Input {...p} type="date" min={start || today} {...register("endDate")} />}
        </Field>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm leading-5 font-medium text-navy">
          Driver preference <span className="font-normal text-muted">(optional)</span>
        </legend>
        <p className="type-caption text-muted">Driver availability is confirmed when we reply.</p>
        <Controller
          control={control}
          name="driverPreference"
          render={({ field }) => (
            <RadioGroup value={field.value ?? ""} onValueChange={field.onChange} className="gap-3 sm:grid-cols-3" aria-label="Driver preference">
              {driverOptions.map((o) => (
                <div key={o.value} className="flex items-start gap-3">
                  <RadioGroupItem value={o.value} id={id(o.value)} />
                  <Label htmlFor={id(o.value)} className="cursor-pointer text-[15px] leading-[22px] font-normal text-charcoal">{o.label}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError id={id("driver-error")} message={errors.driverPreference?.message} />
      </fieldset>

      <Field id={id("more")} label="Additional requirements" optional hint="Number of travellers, luggage, route plans, anything we should know." error={errors.additionalRequirements?.message}>
        {(p) => <Textarea {...p} {...register("additionalRequirements")} />}
      </Field>

      <FormFooter status={status} submitLabel="Request a vehicle" whatsappMessage={whatsappMessages.rental} />
    </form>
  );
}
