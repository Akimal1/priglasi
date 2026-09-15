import type { ProgramItem } from "@/data/designs";

export function ProgramTimeline({
  program,
  accentColor,
}: {
  program: ProgramItem[];
  accentColor: string;
}) {
  return (
    <ol className="flex flex-col">
      {program.map((item, i) => (
        <li
          key={`${item.time}-${item.title}`}
          className="flex items-baseline gap-5 border-b border-[var(--color-line)] py-4 last:border-none"
        >
          <span
            className="font-display w-16 shrink-0 text-lg tabular-nums sm:text-xl"
            style={{ color: accentColor }}
          >
            {item.time}
          </span>
          <span className="text-sm text-[var(--color-fg-muted)] sm:text-base">
            {item.title}
          </span>
          <span className="sr-only">Пункт программы {i + 1}</span>
        </li>
      ))}
    </ol>
  );
}
