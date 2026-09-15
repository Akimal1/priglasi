"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { designs } from "@/data/designs";
import type { CategorySlug } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DesignCard } from "@/components/catalog/DesignCard";
import { CategoryFilter } from "./CategoryFilter";

export function CatalogExperience({
  limit,
  showAllLink = false,
  eyebrow = "Каталог",
  title = "Наши дизайны",
}: {
  limit?: number;
  showAllLink?: boolean;
  eyebrow?: string;
  title?: string;
}) {
  const [category, setCategory] = useState<CategorySlug>("all");

  const filtered = useMemo(() => {
    const list =
      category === "all" ? designs : designs.filter((d) => d.category === category);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [category, limit]);

  return (
    <Container>
      <CategoryFilter value={category} onChange={setCategory} />

      <div className="mt-16 sm:mt-20">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          action={
            showAllLink ? (
              <Link
                href="/catalog"
                className="w-fit border-b border-current pb-0.5 text-xs tracking-caps uppercase"
              >
                Открыть каталог →
              </Link>
            ) : undefined
          }
        />

        <div className="mt-12 sm:mt-14">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-[var(--color-fg-muted)]">
              В этой категории пока нет дизайнов — загляните позже.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((design, i) => (
                <DesignCard key={design.slug} design={design} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
