import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-24 text-center">
      <p className="text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
        Ошибка 404
      </p>
      <h1 className="font-display text-4xl sm:text-5xl">Страница не найдена</h1>
      <p className="max-w-sm text-sm text-[var(--color-fg-muted)]">
        Возможно, приглашение было перемещено или адрес введён неверно.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Button href="/">На главную</Button>
        <Link
          href="/catalog"
          className="border border-[var(--color-fg)] px-7 py-3.5 text-xs tracking-caps uppercase"
        >
          Открыть каталог
        </Link>
      </div>
    </Container>
  );
}
