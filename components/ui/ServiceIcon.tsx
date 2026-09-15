import { Building2, Hammer, House, Sofa, Trash2, Trees, type LucideIcon } from "lucide-react";
import type { ServiceIconKey } from "@/lib/services-data";
import { cn } from "@/lib/utils";

const serviceIcons: Record<ServiceIconKey, LucideIcon> = {
  junk: Trash2,
  cleanout: House,
  furniture: Sofa,
  yard: Trees,
  construction: Hammer,
  commercial: Building2,
};

export function ServiceIcon({ icon, className }: { icon: ServiceIconKey; className?: string }) {
  const Icon = serviceIcons[icon];
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-orange/60 bg-orange/10 text-orange",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-6" />
    </span>
  );
}
