"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useOrderModal } from "@/context/OrderModalContext";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openOrder } = useOrderModal();

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          transparent
            ? "bg-transparent text-white"
            : "border-b border-[var(--color-line)] bg-[var(--color-bg)]/95 text-[var(--color-fg)] backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">
          <Link href="/" className="flex shrink-0 items-center" aria-label={siteConfig.name}>
            <span className="sm:hidden">
              <Logo showWordmark={false} markClassName="h-7 w-7" />
            </span>
            <span className="hidden sm:inline-flex">
              <Logo showWordmark />
            </span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs tracking-caps uppercase transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openOrder()}
              className={cn(
                "hidden items-center justify-center px-6 py-3 text-xs tracking-caps uppercase transition-colors sm:inline-flex",
                transparent
                  ? "border border-white/80 text-white hover:bg-white hover:text-[var(--color-fg)]"
                  : "bg-[var(--color-fg)] text-white hover:bg-black",
              )}
            >
              Заказать
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-transform",
                  menuOpen && "translate-y-[6.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-opacity",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-transform",
                  menuOpen && "-translate-y-[6.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOrder={() => {
          setMenuOpen(false);
          openOrder();
        }}
      />
    </>
  );
}
