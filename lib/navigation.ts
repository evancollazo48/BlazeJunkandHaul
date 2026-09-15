export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

/** id of <EstimateSection /> — the site's only estimate section. */
export const ESTIMATE_SECTION_ID = "estimate";
/** Where <EstimateLink /> goes when the current page has no estimate section. */
export const ESTIMATE_FALLBACK_HREF = `/contact#${ESTIMATE_SECTION_ID}`;
