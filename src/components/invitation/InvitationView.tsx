"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Design } from "@/data/designs";
import { themes } from "@/data/themes";
import { DesignScreen } from "@/components/catalog/DesignScreen";
import { Container } from "@/components/ui/Container";
import { useOrderModal } from "@/context/OrderModalContext";
import { formatEventDateTimeLong } from "@/lib/utils";
import { CountdownTimer } from "./CountdownTimer";
import { ProgramTimeline } from "./ProgramTimeline";
import { RsvpForm } from "./RsvpForm";

export function InvitationView({ design }: { design: Design }) {
  const theme = themes[design.theme];
  const { open: openOrder } = useOrderModal();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    design.demo.mapQuery,
  )}`;

  return (
    <div>
      <section className="relative h-[100svh] min-h-[560px] w-full">
        <DesignScreen design={design} size="full" priority />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.8 },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
          style={{ color: theme.textMuted }}
          aria-hidden="true"
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 1l9 9 9-9" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </motion.div>
      </section>

      <Container>
        <div className="mx-auto max-w-2xl py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <p className="text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
              Дата и время
            </p>
            <p className="font-display text-2xl sm:text-3xl">
              {formatEventDateTimeLong(design.demo.date)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex justify-center"
          >
            <CountdownTimer date={design.demo.date} accentColor={theme.accent} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-20 flex flex-col items-center gap-2 border-t border-[var(--color-line)] pt-16 text-center"
          >
            <p className="text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
              Место проведения
            </p>
            <p className="font-display text-2xl sm:text-3xl">{design.demo.venueName}</p>
            <p className="text-sm text-[var(--color-fg-muted)]">
              {design.demo.venueAddress}
            </p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 border-b border-current pb-0.5 text-xs tracking-caps uppercase"
            >
              Открыть на карте ↗
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-20 border-t border-[var(--color-line)] pt-16"
          >
            <p className="mb-6 text-center text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
              Программа мероприятия
            </p>
            <ProgramTimeline program={design.demo.program} accentColor={theme.accent} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-20 border-t border-[var(--color-line)] pt-16"
          >
            <p className="mb-6 text-center text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
              Подтверждение участия
            </p>
            <RsvpForm designSlug={design.slug} />
          </motion.div>

          <div className="mt-20 flex flex-col items-center gap-4 border-t border-[var(--color-line)] pt-16 text-center">
            <p className="font-display text-2xl">Понравился этот дизайн?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openOrder(design.slug)}
                className="bg-[var(--color-fg)] px-7 py-3.5 text-xs tracking-caps uppercase text-white"
              >
                Заказать такое приглашение
              </button>
              <Link
                href="/catalog"
                className="border border-[var(--color-fg)] px-7 py-3.5 text-xs tracking-caps uppercase"
              >
                Назад в каталог
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
