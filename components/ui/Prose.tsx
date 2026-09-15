import { cn } from "@/lib/utils";

/** Readable long-form typography for legal and policy pages. */
export function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-silver [&_a]:font-semibold [&_a]:text-orange [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:uppercase [&_li]:pl-1 [&_p]:mt-4 [&_strong]:text-white [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-orange",
        className,
      )}
      {...props}
    />
  );
}
