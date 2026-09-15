/**
 * Brand/social icons as lightweight inline SVGs (lucide-react no longer ships
 * brand logos). They inherit `currentColor` and size from className.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M14 8.2h2.2V4.8h-2.6C10.9 4.8 9.6 6.5 9.6 9v2H7.5v3.3h2.1V21h3.4v-6.7h2.4l.5-3.3H13V9.3c0-.7.3-1.1 1-1.1Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
