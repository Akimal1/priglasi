"use client";

import { useMemo, useState, type FormEvent } from "react";
import { designs } from "@/data/designs";
import { categories } from "@/data/categories";
import { prepareOrder, type OrderResult } from "@/lib/order";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormState {
  designSlug: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  phone: string;
  comment: string;
}

const eventTypeOptions = categories
  .filter((c) => c.slug !== "all")
  .map((c) => c.label);

function initialState(designSlug?: string): FormState {
  const design = designSlug ? designs.find((d) => d.slug === designSlug) : undefined;
  return {
    designSlug: design?.slug ?? "",
    clientName: "",
    eventType: design?.demo.eventTypeLabel ?? "",
    eventDate: "",
    phone: "",
    comment: "",
  };
}

export function OrderForm({
  initialDesignSlug,
  onDone,
}: {
  initialDesignSlug?: string;
  onDone?: () => void;
}) {
  const [form, setForm] = useState<FormState>(() => initialState(initialDesignSlug));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [result, setResult] = useState<OrderResult | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedDesign = useMemo(
    () => designs.find((d) => d.slug === form.designSlug),
    [form.designSlug],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "designSlug") {
        const design = designs.find((d) => d.slug === value);
        if (design) next.eventType = design.demo.eventTypeLabel;
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.clientName.trim() || form.clientName.trim().length < 2) {
      next.clientName = "Введите имя (минимум 2 символа)";
    }
    if (!form.eventType) {
      next.eventType = "Выберите тип мероприятия";
    }
    if (!form.eventDate) {
      next.eventDate = "Укажите дату мероприятия";
    }
    const phoneDigits = form.phone.replace(/[^\d]/g, "");
    if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      next.phone = "Введите корректный номер телефона";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const orderResult = prepareOrder({
      designName: selectedDesign?.name ?? "не выбран",
      clientName: form.clientName.trim(),
      eventType: form.eventType,
      eventDate: form.eventDate,
      phone: form.phone.trim(),
      comment: form.comment,
    });

    if (orderResult.method === "whatsapp" && orderResult.whatsappUrl) {
      window.open(orderResult.whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setResult(orderResult);
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (result) {
    return (
      <div className="flex flex-col gap-5">
        {result.method === "whatsapp" ? (
          <>
            <p className="font-display text-2xl">Почти готово</p>
            <p className="text-sm text-[var(--color-fg-muted)]">
              Мы открыли WhatsApp в новой вкладке с готовым текстом заявки. Отправьте
              сообщение, чтобы менеджер получил его — сам сайт заявку не отправляет.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-2xl">Демонстрационный режим</p>
            <p className="text-sm text-[var(--color-fg-muted)]">
              WhatsApp ещё не подключён в настройках сайта, поэтому заявка никуда не
              отправлена. Скопируйте текст ниже и отправьте его удобным вам способом —
              как только в{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
                src/config/site.ts
              </code>{" "}
              появится номер WhatsApp, эта форма начнёт открывать чат автоматически.
            </p>
          </>
        )}

        <textarea
          readOnly
          value={result.message}
          rows={7}
          className="w-full resize-none border border-[var(--color-line-strong)] bg-black/[0.02] p-4 text-sm leading-relaxed"
        />

        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={handleCopy}>
            {copied ? "Скопировано" : "Скопировать текст"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setResult(null);
            }}
          >
            Изменить заявку
          </Button>
        </div>

        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-2 self-start text-xs tracking-caps uppercase text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            Закрыть
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Дизайн приглашения" error={errors.designSlug}>
        <select
          value={form.designSlug}
          onChange={(e) => update("designSlug", e.target.value)}
          className={selectClasses}
        >
          <option value="">Ещё не выбрал(а) дизайн</option>
          {designs.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Ваше имя *" error={errors.clientName}>
        <input
          type="text"
          value={form.clientName}
          onChange={(e) => update("clientName", e.target.value)}
          className={inputClasses}
          autoComplete="name"
          required
        />
      </Field>

      <Field label="Тип мероприятия *" error={errors.eventType}>
        <select
          value={form.eventType}
          onChange={(e) => update("eventType", e.target.value)}
          className={selectClasses}
        >
          <option value="">Выберите тип мероприятия</option>
          {eventTypeOptions.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Дата мероприятия *" error={errors.eventDate}>
        <input
          type="date"
          value={form.eventDate}
          onChange={(e) => update("eventDate", e.target.value)}
          className={inputClasses}
          required
        />
      </Field>

      <Field label="Телефон *" error={errors.phone}>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClasses}
          placeholder="+996 700 000 000"
          autoComplete="tel"
          required
        />
      </Field>

      <Field label="Комментарий">
        <textarea
          value={form.comment}
          onChange={(e) => update("comment", e.target.value)}
          rows={3}
          className={cn(inputClasses, "resize-none")}
        />
      </Field>

      <p className="text-xs text-[var(--color-fg-muted)]">
        {siteConfig.contacts.whatsapp
          ? "После отправки откроется WhatsApp с готовым сообщением — вам останется его отправить."
          : "WhatsApp пока не подключён: после заполнения формы вы получите готовый текст заявки для копирования (демо-режим)."}
      </p>

      <Button type="submit" className="mt-1">
        {siteConfig.contacts.whatsapp ? "Отправить в WhatsApp" : "Показать текст заявки"}
      </Button>
    </form>
  );
}

const inputClasses =
  "w-full border border-[var(--color-line-strong)] bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-fg)]";

const selectClasses = cn(inputClasses, "appearance-none bg-white");

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs tracking-caps uppercase text-[var(--color-fg-muted)]">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
