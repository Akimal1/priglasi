"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { useOrderModal } from "@/context/OrderModalContext";

export function Footer() {
  const { whatsapp, instagram, telegram, phone } = siteConfig.contacts;
  const hasContacts = whatsapp || instagram || telegram || phone;
  const year = new Date().getFullYear();
  const { open: openOrder } = useOrderModal();

  return (
    <footer id="contacts" className="border-t border-[var(--color-line)]">
      <Container className="grid grid-cols-1 divide-y divide-[var(--color-line)] py-14 sm:py-16 md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="flex flex-col gap-4 pb-10 md:pb-0 md:pr-10">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)]">
            Цифровые приглашения для свадеб и самых важных событий — с вниманием к
            каждой детали.
          </p>
          <button
            type="button"
            onClick={() => openOrder()}
            className="mt-2 w-fit border-b border-current pb-0.5 text-xs tracking-caps uppercase"
          >
            Заказать приглашение →
          </button>
        </div>

        <div className="flex flex-col gap-3 py-10 md:px-10 md:py-0">
          <p className="mb-1 text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
            Разделы
          </p>
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm hover:opacity-60 w-fit"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => openOrder()}
            className="text-left text-sm hover:opacity-60 w-fit"
          >
            Заказать
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-10 md:pl-10 md:pt-0">
          <p className="mb-1 text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
            Связаться
          </p>
          {!hasContacts && (
            <p className="text-sm text-[var(--color-fg-muted)]">
              Контакты появятся здесь после настройки в конфигурации сайта.
            </p>
          )}
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-60 w-fit"
            >
              WhatsApp ↗
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-60 w-fit"
            >
              Instagram ↗
            </a>
          )}
          {telegram && (
            <a
              href={telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-60 w-fit"
            >
              Telegram ↗
            </a>
          )}
          {phone && <p className="text-sm">{phone}</p>}
        </div>
      </Container>

      <div className="border-t border-[var(--color-line)] py-6">
        <Container className="flex flex-col gap-2 text-xs text-[var(--color-fg-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Все права защищены.
          </p>
          <p>Цифровые приглашения с вниманием к деталям.</p>
        </Container>
      </div>
    </footer>
  );
}
