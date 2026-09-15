import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="20.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M14 17.5c2.6-3 5.2-4.5 8-4.5s5.4 1.5 8 4.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M22 14v16" stroke="currentColor" strokeWidth="1" />
      <path d="M17 30h10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark className={cn("h-8 w-8 shrink-0", markClassName)} />
      {showWordmark && (
        <span className="font-display text-lg tracking-[0.18em] uppercase whitespace-nowrap">
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}
