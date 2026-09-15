export interface RsvpData {
  designSlug: string;
  name: string;
  attending: "yes" | "no";
  guests: number;
}

export interface RsvpResult {
  ok: true;
  storedLocally: boolean;
}

/**
 * Демонстрационный слой отправки RSVP. Организатору ничего не уходит:
 * ответ только сохраняется в localStorage браузера, чтобы форму можно
 * было протестировать целиком.
 *
 * TODO: когда появится API, заменить тело функции на
 * fetch(`/api/invitations/${data.designSlug}/rsvp`, { method: 'POST', body: ... })
 * — сигнатура функции и место вызова в RsvpForm менять не придётся.
 */
export async function submitRsvp(data: RsvpData): Promise<RsvpResult> {
  let storedLocally = false;
  try {
    const key = `toi-invite-rsvp-${data.designSlug}`;
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]");
    existing.push({ ...data, submittedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
    storedLocally = true;
  } catch {
    storedLocally = false;
  }

  return { ok: true, storedLocally };
}
