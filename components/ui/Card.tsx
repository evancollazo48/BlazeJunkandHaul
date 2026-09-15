import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "li";
  /** Adds the orange top-edge + background shift on hover (for clickable cards). */
  interactive?: boolean;
}

export function Card({ as: Tag = "div", interactive = false, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative border border-line bg-panel",
        interactive &&
          "group transition-colors duration-200 before:absolute before:inset-x-0 before:-top-px before:h-[3px] before:origin-left before:scale-x-0 before:bg-orange before:transition-transform before:duration-300 focus-within:bg-panel-hover focus-within:before:scale-x-100 hover:bg-panel-hover hover:before:scale-x-100 motion-reduce:before:transition-none",
        className,
      )}
      {...props}
    />
  );
}
