import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Narrow containers suit long-form reading (FAQ, legal pages). */
  size?: "default" | "narrow";
}

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-[1200px]",
        className,
      )}
      {...props}
    />
  );
}
