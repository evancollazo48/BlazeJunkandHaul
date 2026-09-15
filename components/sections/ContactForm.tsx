"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Flame, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  contactFormDefaults,
  contactSchema,
  type ContactApiResponse,
  type ContactFormValues,
} from "@/lib/validations";

type SubmitStatus = { state: "idle" } | { state: "success" } | { state: "error"; message: string };

const inputClasses =
  "min-h-12 w-full rounded-brand border border-line-strong bg-panel px-4 py-3 text-base text-white placeholder:text-silver-dim transition-colors hover:border-silver-dim focus:border-orange aria-invalid:border-danger";

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ id, label, optional = false, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-display text-xs font-bold tracking-[0.15em] text-silver uppercase"
      >
        {label}
        {optional ? (
          <span className="ml-1.5 tracking-normal text-silver-dim normal-case">(optional)</span>
        ) : (
          <span aria-hidden="true" className="ml-0.5 text-orange">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm text-danger">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Returns aria props that tie an input to its error message. */
function fieldA11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactFormDefaults,
    mode: "onTouched",
  });

  // Move focus to the confirmation so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
  }, [status.state]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus({ state: "idle" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({ ok: false }))) as ContactApiResponse;

      if (!response.ok || !data.ok) {
        for (const [field, messages] of Object.entries(data.fieldErrors ?? {})) {
          if (messages?.[0] && field in contactFormDefaults) {
            setError(field as keyof ContactFormValues, { message: messages[0] });
          }
        }
        setStatus({
          state: "error",
          message:
            data.message ??
            `Something went wrong sending your request. Please call or text ${siteConfig.phoneDisplay}.`,
        });
        return; // Keep everything the visitor typed.
      }

      reset(contactFormDefaults);
      setStatus({ state: "success" });
    } catch {
      setStatus({
        state: "error",
        message: `We couldn't reach our server. Check your connection and try again, or call or text ${siteConfig.phoneDisplay}.`,
      });
    }
  };

  if (status.state === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center justify-center border border-orange bg-orange/10 p-8 text-center sm:p-12"
      >
        <CircleCheck aria-hidden="true" className="size-12 text-orange" />
        <p className="mt-4 font-display text-2xl font-bold text-white uppercase">Got it!</p>
        <p className="mt-3 max-w-md text-silver">
          We&apos;ll get back to you shortly with your free estimate. Need it faster? Call or text{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-orange hover:underline">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
        <p className="mt-4 inline-flex items-center gap-2 font-display font-bold tracking-[0.15em] text-orange uppercase">
          {siteConfig.tagline}
          <Flame aria-hidden="true" className="size-5" />
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className={buttonClasses({ variant: "secondary", size: "md", className: "mt-8" })}
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      // method/action are the no-JavaScript fallback (see app/api/contact/route.ts);
      // when hydrated, handleSubmit prevents the native submit and posts JSON instead.
      method="post"
      action="/api/contact"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Free estimate request"
      className="relative border border-line bg-black p-6 sm:p-8"
    >
      <p className="mb-6 text-sm text-silver-dim">
        Fields marked <span className="text-orange">*</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="estimate-name" label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            {...fieldA11y("estimate-name", errors.name?.message)}
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            className={inputClasses}
          />
        </Field>

        <Field id="estimate-phone" label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            {...fieldA11y("estimate-phone", errors.phone?.message)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="(xxx) xxx-xxxx"
            className={inputClasses}
          />
        </Field>

        <Field id="estimate-email" label="Email" optional error={errors.email?.message}>
          <input
            {...register("email")}
            {...fieldA11y("estimate-email", errors.email?.message)}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={inputClasses}
          />
        </Field>

        <Field id="estimate-location" label="City or ZIP" optional error={errors.location?.message}>
          <input
            {...register("location")}
            {...fieldA11y("estimate-location", errors.location?.message)}
            type="text"
            autoComplete="address-level2"
            placeholder="Fort Worth, 76102…"
            className={inputClasses}
          />
        </Field>

        <Field
          id="estimate-message"
          label="What do you need hauled?"
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <textarea
            {...register("message")}
            {...fieldA11y("estimate-message", errors.message?.message)}
            rows={5}
            required
            placeholder="Tell us what needs to go — couches, appliances, yard debris, a full cleanout…"
            className={cn(inputClasses, "min-h-32 resize-y")}
          />
        </Field>
      </div>

      {/* Honeypot: visually hidden and skipped by keyboard/screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="estimate-company">Company</label>
        <input
          {...register("company")}
          id="estimate-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status.state === "error" && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 border border-danger/60 bg-danger/10 p-4 text-sm text-white"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
          <p>{status.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClasses({ size: "lg", className: "mt-6 w-full" })}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="size-5" />
            Send My Free Estimate Request
          </>
        )}
      </button>

      <p className="mt-4 text-center text-sm text-silver-dim">
        Have photos of the job?{" "}
        <a href={siteConfig.smsHref} className="font-semibold text-orange hover:underline">
          Text them to {siteConfig.phoneDisplay}
        </a>{" "}
        for the fastest quote.
      </p>
    </form>
  );
}
