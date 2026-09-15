"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/config/site";

export function MobileMenu({
  open,
  onClose,
  onOrder,
}: {
  open: boolean;
  onClose: () => void;
  onOrder: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-30 flex flex-col bg-[var(--color-bg)] pt-16 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Меню навигации"
        >
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {siteConfig.nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 * i }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="font-display text-3xl"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="border-t border-[var(--color-line)] p-6">
            <button
              type="button"
              onClick={onOrder}
              className="block w-full bg-[var(--color-fg)] py-4 text-center text-xs tracking-caps uppercase text-white"
            >
              Заказать
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
