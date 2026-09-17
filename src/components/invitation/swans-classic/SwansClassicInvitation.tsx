"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { Design } from "@/data/designs";
import { themes } from "@/data/themes";
import { useCountdown } from "@/hooks/useCountdown";
import { submitRsvp } from "@/lib/rsvp";
import { eventDateParts, formatEventDate } from "@/lib/utils";
import { useOrderModal } from "@/context/OrderModalContext";
import { Container } from "@/components/ui/Container";
import swansHeart from "@/assets/images/swans-classic/swans-heart.jpg";
import { Feather, SwanWatermark, SwanBadge, OrnateButton, OrnateLink, PaperGrain, MusicToggle } from "./decor";

const theme = themes["swans-classic"];
const INK = theme.text;
const GOLD = theme.accent;
const MUTED = theme.textMuted;
const CREAM = theme.bg;
const CREAM_SOFT = theme.bgSoft;

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

/**
 * Строит дни недели вокруг даты события через `Date.UTC` с готовыми
 * год/месяц/день в часовом поясе Бишкека — не через `new Date(dateIso)` и
 * локальные геттеры, которые зависят от часового пояса окружения и на
 * статической сборке дают другой день недели на сервере и в браузере гостя.
 */
function weekOf(dateIso: string): Date[] {
  const { year, month, day } = eventDateParts(dateIso);
  const anchor = new Date(Date.UTC(year, month, day));
  const mondayOffset = (anchor.getUTCDay() + 6) % 7;
  const monday = new Date(anchor);
  monday.setUTCDate(anchor.getUTCDate() - mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    return d;
  });
}

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Разлёт перьев при открытии конверта — decorative-only, ничего не читает мышью. */
function FeatherBurst() {
  const positions = [
    { x: -160, y: -120, r: -35, delay: 0 },
    { x: 150, y: -140, r: 28, delay: 0.03 },
    { x: -190, y: 10, r: -12, delay: 0.06 },
    { x: 190, y: 30, r: 18, delay: 0.09 },
    { x: -120, y: 140, r: -22, delay: 0.12 },
    { x: 130, y: 150, r: 32, delay: 0.15 },
    { x: -60, y: -170, r: -8, delay: 0.18 },
    { x: 70, y: 170, r: 12, delay: 0.21 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {positions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-16 w-4"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0.35, scale: 1, rotate: p.r }}
          transition={{ duration: 1.1, delay: p.delay, ease: "easeOut" }}
        >
          <Feather className="h-full w-full" color={INK} />
        </motion.div>
      ))}
    </div>
  );
}

function SectionDivider() {
  return <div className="mx-auto h-px w-16" style={{ backgroundColor: MUTED, opacity: 0.4 }} />;
}

export function SwansClassicInvitation({ design }: { design: Design }) {
  const [opened, setOpened] = useState(false);
  const { open: openOrder } = useOrderModal();
  const countdown = useCountdown(design.demo.date);

  const [groomName, brideName] = useMemo(
    () => design.demo.heroNames.split("&").map((s) => s.trim()),
    [design.demo.heroNames],
  );

  const { year, month, day, hour, minute } = useMemo(
    () => eventDateParts(design.demo.date),
    [design.demo.date],
  );
  const timeLabel = `${pad2(hour)}:${pad2(minute)}`;
  const week = useMemo(() => weekOf(design.demo.date), [design.demo.date]);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(design.demo.mapQuery)}`;

  const countdownLabel = countdown && !countdown.isPast
    ? `${countdown.days}:${pad2(countdown.hours)}:${pad2(countdown.minutes)}:${pad2(countdown.seconds)}`
    : null;

  return (
    <div className="relative" style={{ backgroundColor: CREAM, color: INK }}>
      {opened && (
        <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
          <MusicToggle color={INK} />
        </div>
      )}

      {/* Ворота — как в оригинале: закрытая обложка → анимация открытия на месте. */}
      <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-24 pt-28 text-center sm:pt-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <PaperGrain />
          <SwanWatermark className="absolute left-[-14%] top-[8%] h-[42%] w-auto" style={{ opacity: 0.06 }} />
          <SwanWatermark mirrored className="absolute right-[-14%] bottom-[6%] h-[38%] w-auto" style={{ opacity: 0.06 }} />
        </div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="closed"
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center gap-6 sm:gap-10"
            >
              <p className="text-xs tracking-[0.35em] uppercase">Вы приглашены</p>
              <Image
                src={swansHeart}
                alt=""
                priority
                className="h-[30vh] max-h-[300px] w-auto object-contain sm:h-[38vh] sm:max-h-[380px]"
                style={{ filter: "sepia(0.08) saturate(0.85)" }}
              />
              <OrnateButton onClick={() => setOpened(true)}>Открыть</OrnateButton>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <FeatherBurst />
              <p className="mb-3 text-sm tracking-[0.2em]">Мы женимся!</p>
              <p className="font-pinyon -mb-2 text-4xl" style={{ color: MUTED }}>
                Save the
              </p>
              <p className="font-display text-6xl sm:text-7xl" style={{ color: GOLD }}>
                {pad2(day)}
              </p>
              <p className="font-pinyon -mb-2 mt-1 text-4xl" style={{ color: MUTED }}>
                Date
              </p>
              <p className="font-display text-6xl sm:text-7xl">{pad2(month + 1)}</p>
              <p className="font-display text-6xl sm:text-7xl" style={{ color: GOLD }}>
                {String(year).slice(-2)}
              </p>

              <div className="mt-8 flex flex-col gap-1 text-xl tracking-[0.15em] uppercase sm:text-2xl">
                <span>{groomName}</span>
                <span>{brideName}</span>
              </div>

              {/* Cormorant italic, не Pinyon Script: инициалы кириллические,
                  а латинский Pinyon Script для них глифов не содержит. */}
              <p className="font-display mt-4 text-5xl italic" style={{ color: GOLD }}>
                {groomName[0]}&amp;{brideName[0]}
              </p>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="mt-8"
                aria-hidden="true"
              >
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                  <path d="M1 1l9 9 9-9" stroke={MUTED} strokeWidth={1.4} />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Обращение к гостям */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <SwanWatermark className="pointer-events-none absolute left-[-16%] top-[10%] h-[70%] w-auto" style={{ opacity: 0.045 }} />
        <Container className="relative z-10 max-w-xl">
          <p className="text-sm tracking-[0.3em] uppercase" style={{ color: GOLD }}>
            Уважаемые гости!
          </p>
          <p className="font-display mt-8 text-xl leading-relaxed sm:text-2xl">
            Наши дети {groomName} и {brideName} приглашают вас разделить радость этого
            особенного дня и стать почётными гостями торжественного вечера в честь их
            свадьбы!
          </p>
          <p className="mt-10 text-xs tracking-[0.3em] uppercase" style={{ color: MUTED }}>
            Хозяева торжества,
          </p>
          <p className="mt-3 text-lg tracking-[0.15em] uppercase">
            {groomName} &amp; {brideName}
          </p>
        </Container>
      </section>

      {/* Календарь-открытка */}
      <section className="relative overflow-hidden px-6 py-16 text-center">
        <Container className="relative z-10 flex flex-col items-center gap-6">
          <p className="font-pinyon text-4xl" style={{ color: GOLD }}>
            {MONTHS[month]}
          </p>
          <div className="grid grid-cols-7 gap-x-4 gap-y-4 sm:gap-x-8">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-[11px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>
                {w}
              </span>
            ))}
            {week.map((d) => {
              const isTarget =
                d.getUTCDate() === day && d.getUTCMonth() === month && d.getUTCFullYear() === year;
              return (
                <span key={d.toISOString()} className="relative flex h-10 items-center justify-center text-base">
                  {isTarget && (
                    <>
                      <span
                        className="absolute h-8 w-8 rounded-full"
                        style={{ backgroundColor: GOLD, opacity: 0.16 }}
                        aria-hidden="true"
                      />
                      <SwanBadge className="absolute -top-4 h-5 w-6" color={GOLD} />
                    </>
                  )}
                  <span
                    className={isTarget ? "font-display relative font-semibold" : "relative"}
                    style={isTarget ? { color: GOLD } : undefined}
                  >
                    {d.getUTCDate()}
                  </span>
                </span>
              );
            })}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* Место проведения */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <SwanWatermark mirrored className="pointer-events-none absolute right-[-16%] bottom-[-10%] h-[70%] w-auto" style={{ opacity: 0.045 }} />
        <Container className="relative z-10 flex max-w-lg flex-col items-center gap-3">
          <p className="font-pinyon text-3xl" style={{ color: GOLD }}>
            Location
          </p>
          <p className="text-lg tracking-[0.1em] uppercase">{design.demo.venueName}</p>
          <p className="text-sm" style={{ color: MUTED }}>
            {formatEventDate(design.demo.date)}
          </p>
          <p className="text-sm" style={{ color: MUTED }}>
            Начало в {timeLabel}
          </p>
          <p className="mt-1 text-sm">{design.demo.venueAddress}</p>
          <div className="mt-6">
            <OrnateLink href={mapUrl} target="_blank" rel="noopener noreferrer">
              Открыть карту
            </OrnateLink>
          </div>
        </Container>
      </section>

      {/* Программа торжества */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <Container className="relative z-10 flex max-w-lg flex-col items-center gap-2">
          <p className="font-pinyon text-3xl" style={{ color: GOLD }}>
            Timing
          </p>
          <p className="text-sm tracking-[0.25em] uppercase">Программа торжества</p>
          <div className="mt-10 flex w-full flex-col gap-12">
            {design.demo.program.map((item) => (
              <div key={`${item.time}-${item.title}`}>
                <p className="font-display text-4xl sm:text-5xl" style={{ color: GOLD }}>
                  {item.time}
                </p>
                <p className="mt-2 text-sm" style={{ color: INK }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* Анкета гостя */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <SwanWatermark className="pointer-events-none absolute left-[-18%] top-[-6%] h-[70%] w-auto" style={{ opacity: 0.045 }} />
        <Container className="relative z-10 max-w-md">
          <p className="font-pinyon text-3xl" style={{ color: GOLD }}>
            Rsvp
          </p>
          <p className="text-sm tracking-[0.25em] uppercase">Анкета гостя</p>
          <p className="mt-6 text-sm leading-relaxed" style={{ color: MUTED }}>
            Чтобы мы могли подготовить праздник как следует, пожалуйста, подтвердите
            своё участие заранее.
          </p>
          <RsvpBlock designSlug={design.slug} />
        </Container>
      </section>

      {/* Счётчик до свадьбы */}
      <section className="relative flex flex-col items-center gap-10 overflow-hidden px-6 py-24 text-center">
        <p className="text-sm tracking-[0.3em] uppercase">До свадьбы</p>
        {countdownLabel ? (
          <p className="font-display text-4xl tabular-nums sm:text-6xl" style={{ color: GOLD }}>
            {countdownLabel}
          </p>
        ) : (
          <p className="font-display text-2xl" role="status">
            {countdown?.isPast ? "Праздник уже состоялся — спасибо, что были с нами!" : "—"}
          </p>
        )}
        <Image
          src={swansHeart}
          alt=""
          className="h-auto w-[220px] object-contain sm:w-[300px]"
          style={{ filter: "sepia(0.08) saturate(0.85)" }}
        />
      </section>

      {/* Переход к заказу — единый сценарий каталога */}
      <div style={{ backgroundColor: CREAM_SOFT }}>
        <Container>
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-16 text-center">
            <p className="font-display text-2xl">Понравился этот шаблон?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openOrder(design.slug)}
                className="px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-white"
                style={{ backgroundColor: INK }}
              >
                Заказать такое приглашение
              </button>
              <Link
                href="/catalog"
                className="border px-7 py-3.5 text-xs tracking-[0.2em] uppercase"
                style={{ borderColor: INK }}
              >
                Назад в каталог
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

function RsvpBlock({ designSlug }: { designSlug: string }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Пожалуйста, укажите ваше имя");
      return;
    }
    if (!attending) {
      setError("Пожалуйста, отметьте, сможете ли вы прийти");
      return;
    }
    setError("");
    setStatus("sending");
    const result = await submitRsvp({ designSlug, name: name.trim(), attending, guests: 1 });
    setStatus(result.storedLocally ? "done" : "failed");
  }

  if (status === "done") {
    return (
      <div className="mt-8 border px-6 py-8" style={{ borderColor: MUTED }}>
        <p className="font-display text-2xl">Спасибо, {name.split(" ")[0]}!</p>
        <p className="mt-2 text-xs leading-relaxed" style={{ color: MUTED }}>
          Это демонстрационная форма примера — ваш ответ сохранён только в этом
          браузере и не отправлен настоящему организатору.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-8 text-left">
      <label className="flex flex-col gap-1">
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: MUTED }}>
          Ваше имя
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя и фамилия"
          className="border-b bg-transparent py-2 text-sm outline-none"
          style={{ borderColor: MUTED, color: INK }}
        />
      </label>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-xs tracking-[0.2em] uppercase" style={{ color: MUTED }}>
          Вы сможете быть на торжестве?
        </legend>
        {(
          [
            { value: "yes" as const, label: "Приду с радостью" },
            { value: "no" as const, label: "К сожалению, не смогу" },
          ]
        ).map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-3 text-sm">
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: INK }}
            >
              {attending === option.value && (
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: INK }} />
              )}
            </span>
            <input
              type="radio"
              name="attending"
              className="sr-only"
              checked={attending === option.value}
              onChange={() => setAttending(option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      {error && <p className="text-xs text-red-600">{error}</p>}
      {status === "failed" && (
        <p className="text-xs text-red-600">
          Не удалось сохранить ответ в этом браузере (например, из-за приватного режима).
          Попробуйте ещё раз или в другом браузере.
        </p>
      )}

      <div className="flex justify-center pt-2">
        <OrnateButton type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Отправка…" : "Отправить ответ"}
        </OrnateButton>
      </div>
    </form>
  );
}
