"use client";

import Image from "next/image";
import { categories, type CategorySlug } from "@/data/categories";
import { cn } from "@/lib/utils";

export function CategoryFilter({
  value,
  onChange,
}: {
  value: CategorySlug;
  onChange: (slug: CategorySlug) => void;
}) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex min-w-max justify-start gap-6 px-1 sm:min-w-0 sm:justify-center sm:gap-10">
        {categories.map((category) => {
          const active = category.slug === value;
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => onChange(category.slug)}
              className="flex w-20 shrink-0 flex-col items-center gap-3 sm:w-24"
              aria-pressed={active}
            >
              <span
                className={cn(
                  "relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 sm:h-24 sm:w-24",
                  active
                    ? "border-[var(--color-fg)] ring-1 ring-[var(--color-fg)] ring-offset-2"
                    : "border-transparent",
                )}
              >
                {category.image ? (
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-[var(--color-surface)] font-display text-sm">
                    Все
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "text-xs transition-colors",
                  active
                    ? "border-b border-[var(--color-fg)] pb-0.5 text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)]",
                )}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
