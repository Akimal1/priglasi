import { siteConfig } from "@/config/site";
import { formatDate } from "./utils";

export interface OrderFormData {
  designName: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  phone: string;
  comment: string;
}

export function buildOrderMessage(data: OrderFormData): string {
  const lines = [
    `Здравствуйте! Хочу заказать цифровое приглашение «${siteConfig.name}».`,
    `Дизайн: ${data.designName || "не выбран"}`,
    `Тип мероприятия: ${data.eventType || "-"}`,
    `Дата: ${data.eventDate ? formatDate(data.eventDate) : "-"}`,
    `Имя: ${data.clientName}`,
    `Телефон: ${data.phone}`,
  ];
  if (data.comment.trim()) {
    lines.push(`Комментарий: ${data.comment.trim()}`);
  }
  return lines.join("\n");
}

export type OrderDeliveryMethod = "whatsapp" | "copy";

export interface OrderResult {
  method: OrderDeliveryMethod;
  message: string;
  whatsappUrl?: string;
}

/**
 * Слой отправки заявки. Сейчас бэкенда нет: если в конфиге указан WhatsApp,
 * формируем ссылку wa.me с готовым текстом (отправляет сам пользователь).
 * Если WhatsApp не настроен — возвращаем текст для копирования (демо-режим).
 *
 * TODO: когда появится API, добавить сюда fetch('/api/orders', { method: 'POST', ... })
 * и вернуть 'method: "api"' при успешной отправке, не меняя интерфейс OrderForm.
 */
export function prepareOrder(data: OrderFormData): OrderResult {
  const message = buildOrderMessage(data);
  const whatsapp = siteConfig.contacts.whatsapp.trim();

  if (whatsapp) {
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    return { method: "whatsapp", message, whatsappUrl };
  }

  return { method: "copy", message };
}
