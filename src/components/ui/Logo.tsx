import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-white shadow-sm",
        className,
      )}
    >
      <Image
        src="/logo.jpg"
        alt=""
        fill
        sizes="64px"
        className="object-cover"
        priority
      />
    </span>
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
