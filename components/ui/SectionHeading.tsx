import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-display text-xs font-bold tracking-[0.25em] text-orange uppercase sm:text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  /** Use "h1" only for the single page-level heading. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={cn(
          "font-display font-bold tracking-tight text-balance text-white uppercase",
          eyebrow && "mt-3",
          Heading === "h1"
            ? "text-4xl leading-[1.02] sm:text-5xl lg:text-6xl"
            : "text-3xl leading-[1.05] sm:text-4xl lg:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base text-pretty text-silver-dim sm:text-lg">{description}</p>
      )}
    </div>
  );
}
