"use client";

import { useEffect, useState } from "react";
import { parseEventDate } from "@/lib/utils";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeCountdown(targetIso: string): CountdownValue {
  const diff = parseEventDate(targetIso).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

/**
 * Возвращает null до монтирования на клиенте — время сервера и клиента может
 * отличаться, поэтому первый рендер намеренно совпадает с сервером (null),
 * а настоящее значение появляется сразу после гидратации без расхождений.
 */
export function useCountdown(targetIso: string): CountdownValue | null {
  const [value, setValue] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const tick = () => setValue(computeCountdown(targetIso));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return value;
}
