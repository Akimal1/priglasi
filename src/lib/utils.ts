import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

const EVENT_TIMEZONE = "Asia/Bishkek";

/**
 * `design.demo.date` задан без смещения (например "2027-09-18T17:00:00") и
 * всегда означает время в Бишкеке (UTC+6, без перехода на летнее время).
 * Страницы приглашений собираются статически (generateStaticParams), поэтому
 * `new Date(iso)` на сборочном сервере и в браузере гостя — почти наверняка
 * в разных часовых поясах — дают разный момент времени, что и сдвигает
 * отображаемую дату/время, и ломает гидратацию (текст на сервере и на
 * клиенте расходится). Фиксируем смещение здесь, а не в generic `formatDate`,
 * чтобы не задеть локальные даты пользователя (например, поле даты в форме
 * заказа), которые должны читаться в его собственном часовом поясе.
 */
export function parseEventDate(iso: string): Date {
  return new Date(`${iso}+06:00`);
}

export function eventDateParts(iso: string): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(parseEventDate(iso));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return {
    year: get("year"),
    month: get("month") - 1,
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: EVENT_TIMEZONE,
  }).format(parseEventDate(iso));
}

export function formatEventTime(iso: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: EVENT_TIMEZONE,
  }).format(parseEventDate(iso));
}

export function formatEventDateTimeLong(iso: string): string {
  return `${formatEventDate(iso)} в ${formatEventTime(iso)}`;
}

/** "#rrggbb" -> "rgba(r,g,b,alpha)", для затемнения/осветления фото-обложек. */
export function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
