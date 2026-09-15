"use client";

import { useState, type FormEvent } from "react";
import { submitRsvp } from "@/lib/rsvp";
import { cn } from "@/lib/utils";

export function RsvpForm({ designSlug }: { designSlug: string }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Пожалуйста, укажите имя");
      return;
    }
    if (!attending) {
      setError("Пожалуйста, отметьте, придёте ли вы");
      return;
    }
    setError("");
    setStatus("sending");
    await submitRsvp({ designSlug, name: name.trim(), attending, guests });
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="border border-[var(--color-line-strong)] p-6 text-center">
        <p className="font-display text-2xl">Спасибо, {name.split(" ")[0]}!</p>
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
          Это демонстрационная форма примера — ваш ответ сохранён только в этом
          браузере и не отправлен настоящему организатору.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <p className="text-xs leading-relaxed text-[var(--color-fg-muted)]">
        Это демонстрационный пример приглашения. Ответы из этой формы никуда не
        отправляются организатору — они сохраняются только локально в вашем браузере.
      </p>

      <label className="flex flex-col gap-2">
        <span className="text-xs tracking-caps uppercase text-[var(--color-fg-muted)]">
          Ваше имя
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-[var(--color-line-strong)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--color-fg)]"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-xs tracking-caps uppercase text-[var(--color-fg-muted)]">
          Вы придёте?
        </legend>
        <div className="flex gap-3">
          {(
            [
              { value: "yes", label: "Приду" },
              { value: "no", label: "Не приду" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAttending(option.value)}
              className={cn(
                "flex-1 border px-4 py-3 text-xs tracking-caps uppercase transition-colors",
                attending === option.value
                  ? "border-[var(--color-fg)] bg-[var(--color-fg)] text-white"
                  : "border-[var(--color-line-strong)]",
              )}
              aria-pressed={attending === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      {attending === "yes" && (
        <label className="flex flex-col gap-2">
          <span className="text-xs tracking-caps uppercase text-[var(--color-fg-muted)]">
            Количество гостей
          </span>
          <input
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value) || 1)}
            className="border border-[var(--color-line-strong)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--color-fg)]"
          />
        </label>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-[var(--color-fg)] px-6 py-3.5 text-xs tracking-caps uppercase text-white transition-opacity disabled:opacity-60"
      >
        {status === "sending" ? "Отправка…" : "Подтвердить участие"}
      </button>
    </form>
  );
}
