import type { JsonLdObject } from "@/lib/schema";

/**
 * Renders schema.org structured data. `<` is escaped so user-facing strings can
 * never break out of the script tag.
 */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
