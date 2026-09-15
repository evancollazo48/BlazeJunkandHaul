import { z } from "zod";

const digitsOnly = (value: string) => value.replace(/\D/g, "");

/**
 * Estimate / contact form schema — shared by the client form (react-hook-form)
 * and the server route handler (app/api/contact/route.ts), so validation rules
 * can never drift apart.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name must be 80 characters or less."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number so we can reach you.")
    .refine((value) => {
      const digits = digitsOnly(value);
      return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
    }, "Please enter a valid 10-digit phone number."),
  email: z
    .string()
    .trim()
    .max(120, "Email must be 120 characters or less.")
    .refine(
      (value) => value === "" || z.email().safeParse(value).success,
      "Please enter a valid email address.",
    ),
  location: z.string().trim().max(80, "City or ZIP must be 80 characters or less."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about what needs to go (at least 10 characters).")
    .max(2000, "Please keep it under 2,000 characters."),
  /** Honeypot — hidden from humans. Bots that fill it in are silently ignored. */
  company: z.string().max(200),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** JSON shape returned by POST /api/contact. */
export interface ContactApiResponse {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
}

export const contactFormDefaults: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  location: "",
  message: "",
  company: "",
};

/** "6823342371" / "+1 682-334-2371" → "(682) 334-2371" */
export function formatPhone(value: string): string {
  const digits = digitsOnly(value).replace(/^1(?=\d{10}$)/, "");
  if (digits.length !== 10) return value;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
