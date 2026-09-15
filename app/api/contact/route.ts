import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmail } from "@/lib/email";
import { colors } from "@/lib/design-tokens";
import { siteConfig } from "@/lib/site-config";
import { contactSchema, type ContactApiResponse } from "@/lib/validations";

function json(body: ContactApiResponse, status = 200) {
  return NextResponse.json(body, { status });
}

/**
 * The estimate form posts JSON via fetch. If JavaScript fails to load, the
 * browser falls back to a native form POST (form data) to this same URL, so
 * leads still arrive and personal details never end up in a GET query string.
 */
function isNativeFormPost(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  return type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data");
}

function redirectTo(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

/** Minimal standalone page for no-JavaScript error responses (static text only). */
function htmlMessage(status: number, heading: string, message: string) {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${heading} | ${siteConfig.businessName}</title></head>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:${colors.black};color:${colors.silver};font:16px/1.6 system-ui,sans-serif">
<main style="max-width:32rem;text-align:center">
<h1 style="color:${colors.white};font-size:1.75rem;line-height:1.2">${heading}</h1>
<p>${message}</p>
<p><a href="${siteConfig.phoneHref}" style="color:${colors.orange};font-weight:700">Call or text ${siteConfig.phoneDisplay}</a></p>
<p><a href="/contact#estimate" style="color:${colors.white}">Back to the estimate form</a></p>
</main></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function POST(request: Request) {
  const nativeForm = isNativeFormPost(request);

  let body: unknown;
  try {
    body = nativeForm
      ? Object.fromEntries((await request.formData()).entries())
      : await request.json();
  } catch {
    return nativeForm
      ? redirectTo(request, "/contact#estimate")
      : json({ ok: false, message: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never see the "company" field. Pretend success for bots.
  if (
    typeof body === "object" &&
    body !== null &&
    "company" in body &&
    typeof body.company === "string" &&
    body.company.trim() !== ""
  ) {
    return nativeForm ? redirectTo(request, "/thank-you") : json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    if (nativeForm) {
      return htmlMessage(
        422,
        "Please check your details",
        "We need your name, a valid phone number, and a short description of what needs to be hauled.",
      );
    }
    return json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      422,
    );
  }

  const result = await sendLeadEmail(parsed.data);
  if (!result.ok) {
    const message = `Sorry — we couldn't send your request right now. Please call or text ${siteConfig.phoneDisplay} and we'll get you a quote fast.`;
    return nativeForm
      ? htmlMessage(503, "We couldn't send your request", message)
      : json({ ok: false, message }, 503);
  }

  return nativeForm ? redirectTo(request, "/thank-you") : json({ ok: true });
}
