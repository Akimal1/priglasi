"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    title: "Обратный отсчёт",
    description: "Таймер мягко напоминает гостям, что праздник становится ближе.",
  },
  {
    title: "Карта и маршрут",
    description: "Адрес и удобная ссылка на карту всегда под рукой у гостей.",
  },
  {
    title: "Подтверждение участия",
    description: "Гости отвечают прямо на странице приглашения — имя, участие, число гостей.",
  },
  {
    title: "Быстрая подготовка",
    description: "Персональное приглашение с вашими данными готовится без долгого ожидания.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="О нас"
          title={
            <>
              Личные цифровые
              <br />
              приглашения
            </>
          }
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg"
        >
          Мы создаём сайты-приглашения для свадеб, кыз узатуу, сүннөт той, юбилеев
          и тушоо кесүү — с вниманием к деталям и уважением к традициям.
          Каждый дизайн адаптируется под ваши имена, дату и место, а гости открывают
          приглашение одним касанием на любом устройстве.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-0 border-t border-[var(--color-line)] sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="flex flex-col gap-2 border-b border-[var(--color-line)] py-8"
            >
              <h3 className="font-display text-xl">{feature.title}</h3>
              <p className="text-sm text-[var(--color-fg-muted)]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
