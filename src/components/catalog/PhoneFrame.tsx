import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19] w-full max-w-[220px] rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-white">
        {children}
      </div>
      <div className="absolute left-1/2 top-0 z-20 h-[16px] w-[38%] -translate-x-1/2 rounded-b-xl bg-neutral-900" />
    </div>
  );
}
