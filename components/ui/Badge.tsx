import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "accent";
}

export function Badge({ tone = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-brand border px-2.5 py-1 font-display text-[0.7rem] font-bold tracking-wider uppercase",
        tone === "accent" ? "border-orange text-orange" : "border-line-strong text-silver",
        className,
      )}
      {...props}
    />
  );
}
