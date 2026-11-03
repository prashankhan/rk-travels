"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { contactSchema, contactTopics } from "@/lib/validations/enquiry";
import { whatsappMessages } from "@/lib/whatsapp";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Field, FormFooter, FormSuccess, Honeypot, useEnquirySubmit } from "./form-parts";

type In = z.input<typeof contactSchema>;
type Out = z.output<typeof contactSchema>;

export function ContactForm() {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const form = useForm<In, unknown, Out>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", whatsapp: "", email: "", message: "", website: "" },
  });
  const { register, handleSubmit, setError, formState: { errors } } = form;
  const { status, submit, reset } = useEnquirySubmit<In>("contact", "contact_form_submit");

  if (status.state === "success")
    return <FormSuccess whatsappMessage={whatsappMessages.contact} onReset={() => { form.reset(); reset(); }} />;

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v as In, setError))} className="relative flex flex-col gap-6" aria-label="General enquiry">
      <Honeypot register={register("website")} />
      <div className="grid gap-6 md:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.fullName?.message}>
          {(p) => <Input {...p} autoComplete="name" {...register("fullName")} />}
        </Field>
        <Field id={id("wa")} label="WhatsApp number" hint="Include your country code, e.g. +44." error={errors.whatsapp?.message}>
          {(p) => <Input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="+44 7700 900123" {...register("whatsapp")} />}
        </Field>
        <Field id={id("email")} label="Email" optional error={errors.email?.message}>
          {(p) => <Input {...p} type="email" autoComplete="email" {...register("email")} />}
        </Field>
        <Field id={id("topic")} label="What is your enquiry about?" error={errors.topic?.message}>
          {(p) => (
            <NativeSelect {...p} defaultValue="" {...register("topic")}>
              <option value="" disabled>Choose a topic</option>
              {contactTopics.map((t) => <option key={t} value={t}>{t}</option>)}
            </NativeSelect>
          )}
        </Field>
      </div>
      <Field id={id("msg")} label="Message" error={errors.message?.message}>
        {(p) => <Textarea {...p} placeholder="Tell us about your plans or question" {...register("message")} />}
      </Field>
      <FormFooter status={status} submitLabel="Send enquiry" whatsappMessage={whatsappMessages.contact} />
    </form>
  );
}
