import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  action,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn(align === "center" && "flex flex-col items-center")}>
        {eyebrow && (
          <p className="mb-3 text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
            ({eyebrow})
          </p>
        )}
        <h2 className="font-display text-4xl sm:text-5xl leading-[1.05]">{title}</h2>
      </div>
      {action}
    </div>
  );
}
