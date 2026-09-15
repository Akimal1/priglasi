"use client";

import { useCountdown } from "@/hooks/useCountdown";

const units: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] = [
  { key: "days", label: "дней" },
  { key: "hours", label: "часов" },
  { key: "minutes", label: "минут" },
  { key: "seconds", label: "секунд" },
];

export function CountdownTimer({
  date,
  accentColor,
}: {
  date: string;
  accentColor: string;
}) {
  const countdown = useCountdown(date);

  if (!countdown) {
    return (
      <div className="grid grid-cols-4 gap-3 sm:gap-6" aria-hidden="true">
        {units.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1">
            <span className="font-display text-3xl tabular-nums opacity-30 sm:text-5xl">
              --
            </span>
            <span className="text-[10px] tracking-caps uppercase text-[var(--color-fg-muted)] sm:text-xs">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (countdown.isPast) {
    return (
      <p className="font-display text-2xl" role="status">
        Праздник уже состоялся — спасибо, что были с нами!
      </p>
    );
  }

  return (
    <div
      className="grid grid-cols-4 gap-3 sm:gap-6"
      role="timer"
      aria-label="Обратный отсчёт до мероприятия"
    >
      {units.map((unit) => (
        <div key={unit.key} className="flex flex-col items-center gap-1">
          <span
            className="font-display text-3xl tabular-nums sm:text-5xl"
            style={{ color: accentColor }}
          >
            {String(countdown[unit.key]).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-caps uppercase text-[var(--color-fg-muted)] sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
