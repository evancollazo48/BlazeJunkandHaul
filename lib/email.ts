import { Resend } from "resend";
import { siteConfig } from "./site-config";
import { formatPhone, type ContactFormValues } from "./validations";

export type LeadDeliveryResult =
  { ok: true; delivered: boolean } | { ok: false; reason: "not_configured" | "send_failed" };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/**
 * Emails a new estimate request to the business via Resend.
 *
 * Env vars (see .env.example):
 *   RESEND_API_KEY      required in production
 *   CONTACT_TO_EMAIL    defaults to siteConfig.email
 *   CONTACT_FROM_EMAIL  a sender on a domain verified in Resend
 *
 * Without an API key: development logs the lead to the terminal and reports
 * success (so the form can be tested); production reports failure so the
 * visitor is told to call instead of the lead silently disappearing.
 */
export async function sendLeadEmail(lead: ContactFormValues): Promise<LeadDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set — logging lead instead of emailing:", lead);
      return { ok: true, delivered: false };
    }
    console.error("[contact] RESEND_API_KEY is not configured — estimate request NOT delivered.");
    return { ok: false, reason: "not_configured" };
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Blaze Junk & Haul Website <onboarding@resend.dev>";
  const phone = formatPhone(lead.phone);
  const phoneDigits = lead.phone.replace(/\D/g, "");

  const rows: [label: string, value: string][] = [
    ["Name", lead.name],
    ["Phone", phone],
    ["Email", lead.email || "—"],
    ["City / ZIP", lead.location || "—"],
    ["What needs hauled", lead.message],
  ];

  const text = [
    "New free estimate request from the website:",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
      <h2 style="margin:0 0 12px">New free estimate request</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="vertical-align:top;border-bottom:1px solid #eee"><strong>${escapeHtml(label)}</strong></td><td style="border-bottom:1px solid #eee">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:16px">
        <a href="tel:+1${escapeHtml(phoneDigits.slice(-10))}">Call ${escapeHtml(phone)}</a>
        &nbsp;·&nbsp;
        <a href="sms:+1${escapeHtml(phoneDigits.slice(-10))}">Text ${escapeHtml(phone)}</a>
      </p>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: singleLine(
        `New estimate request — ${lead.name}${lead.location ? ` (${lead.location})` : ""}`,
      ),
      text,
      html,
      ...(lead.email ? { replyTo: lead.email } : {}),
    });

    if (error) {
      console.error("[contact] Resend returned an error:", error);
      return { ok: false, reason: "send_failed" };
    }
    return { ok: true, delivered: true };
  } catch (error) {
    console.error("[contact] Failed to send estimate email:", error);
    return { ok: false, reason: "send_failed" };
  }
}
