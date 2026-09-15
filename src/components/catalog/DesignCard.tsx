"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Design } from "@/data/designs";
import { categoryLabel } from "@/data/categories";
import { useOrderModal } from "@/context/OrderModalContext";
import { PhoneFrame } from "./PhoneFrame";
import { DesignScreen } from "./DesignScreen";

export function DesignCard({ design, index = 0 }: { design: Design; index?: number }) {
  const { open: openOrder } = useOrderModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06 }}
      className="group flex flex-col"
    >
      <Link
        href={`/invitations/${design.slug}`}
        className="block transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
        aria-label={`Посмотреть пример: ${design.name}`}
      >
        <PhoneFrame>
          <DesignScreen design={design} size="compact" />
        </PhoneFrame>
      </Link>

      <div className="mt-5 flex flex-col items-start gap-1 text-center sm:text-left">
        <h3 className="font-display text-xl">{design.name}</h3>
        <p className="text-xs tracking-caps uppercase text-[var(--color-fg-muted)]">
          {categoryLabel(design.category)}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Link
          href={`/invitations/${design.slug}`}
          className="border border-[var(--color-fg)] px-4 py-3 text-center text-xs tracking-caps uppercase transition-colors hover:bg-[var(--color-fg)] hover:text-white"
        >
          Посмотреть
        </Link>
        <button
          type="button"
          onClick={() => openOrder(design.slug)}
          className="bg-[var(--color-fg)] px-4 py-3 text-center text-xs tracking-caps uppercase text-white transition-colors hover:bg-black"
        >
          Заказать
        </button>
      </div>
    </motion.div>
  );
}
