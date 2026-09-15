import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  // Black text on orange (≈6.4:1). Hover flips to white on orange-dark (≈5.1:1).
  primary:
    "border-orange bg-orange text-black hover:border-orange-dark hover:bg-orange-dark hover:text-white",
  secondary: "border-white bg-black text-white hover:bg-white hover:text-black",
  outline: "border-orange bg-transparent text-orange hover:bg-orange hover:text-black",
};

// Every size meets the 44×44px minimum tap target.
const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-xs",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-7 text-[0.95rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-brand border-2 text-center font-display leading-tight font-bold tracking-wide uppercase transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonLinkProps = CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

/**
 * Renders a Next <Link> for internal routes, a plain <a> for tel:/sms:/mailto:,
 * hash and external links, or a <button> when no href is given.
 */
export function Button(props: ButtonLinkProps | NativeButtonProps) {
  if (props.href !== undefined) {
    const { href, variant, size, className, children, ...rest } = props;
    const classes = buttonClasses({ variant, size, className });
    const isPlainAnchor = /^(tel:|sms:|mailto:|https?:|#)/.test(href);

    if (isPlainAnchor) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
