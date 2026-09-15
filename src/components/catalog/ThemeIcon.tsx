import type { ThemeKey } from "@/data/themes";

/** Небольшие оригинальные декоративные иконки для каждой темы приглашения. */
export function ThemeIcon({ theme, className }: { theme: ThemeKey; className?: string }) {
  const common = { className, fill: "none", stroke: "currentColor" };

  switch (theme) {
    case "swans":
      return (
        <svg viewBox="0 0 64 40" {...common} strokeWidth={1.2}>
          <path d="M4 34c6-16 14-24 24-24 3 0 5 1.5 5 3.5S31 17 28 17" />
          <circle cx="30.5" cy="10.5" r="1.4" fill="currentColor" stroke="none" />
          <path d="M60 34c-6-16-14-24-24-24-3 0-5 1.5-5 3.5S33 17 36 17" />
          <circle cx="33.5" cy="10.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "blue-envelope":
      return (
        <svg viewBox="0 0 48 48" {...common} strokeWidth={1.2}>
          <circle cx="24" cy="24" r="15" />
          <path d="M24 12v24M14 24h20" strokeWidth={0.8} opacity={0.6} />
        </svg>
      );
    case "blackwhite":
      return (
        <svg viewBox="0 0 48 20" {...common} strokeWidth={1}>
          <path d="M2 10c6-8 12-8 22 0 10 8 16 8 22 0" />
        </svg>
      );
    case "olive":
      return (
        <svg viewBox="0 0 56 24" {...common} strokeWidth={1.2}>
          <path d="M2 20C16 6 40 6 54 20" />
          <path d="M14 15c2-3 4-4 6-4M24 10c2-3 4-4 6-4M34 10c2 -3 4-4 6-4M44 15c-2-3-4-4-6-4" />
        </svg>
      );
    case "burgundy":
      return (
        <svg viewBox="0 0 60 16" {...common} strokeWidth={1}>
          <path d="M2 8l6-6 6 6-6 6zM24 8l6-6 6 6-6 6zM46 8l6-6 6 6-6 6z" />
        </svg>
      );
    case "kids-light":
      return (
        <svg viewBox="0 0 56 40" {...common} strokeWidth={1.2}>
          <circle cx="16" cy="14" r="9" />
          <circle cx="38" cy="12" r="7" />
          <circle cx="28" cy="26" r="6" />
          <path d="M16 23v10M38 19v8M28 32v4" strokeWidth={0.8} opacity={0.6} />
        </svg>
      );
    case "pearl":
      return (
        <svg viewBox="0 0 64 12" {...common} strokeWidth={1}>
          {[4, 14, 24, 34, 44, 54, 60].map((x) => (
            <circle key={x} cx={x} cy={6} r={x === 4 || x === 60 ? 1.4 : 3} fill="currentColor" stroke="none" />
          ))}
        </svg>
      );
    case "steps":
      return (
        <svg viewBox="0 0 56 28" {...common} strokeWidth={1.1}>
          <ellipse cx="10" cy="20" rx="4" ry="6" />
          <ellipse cx="24" cy="8" rx="4" ry="6" />
          <ellipse cx="38" cy="20" rx="4" ry="6" />
          <ellipse cx="52" cy="8" rx="4" ry="6" />
        </svg>
      );
    case "teal-silver":
      return (
        <svg viewBox="0 0 48 32" {...common} strokeWidth={1.1}>
          <path d="M24 4a12 12 0 1 0 0 24 10 10 0 1 1 0-24z" fill="currentColor" stroke="none" opacity={0.9} />
          <path d="M8 26l1.5-3.5L13 21l-3.5-1.5L8 16l-1.5 3.5L3 21l3.5 1.5z" fill="currentColor" stroke="none" opacity={0.7} />
          <path d="M40 10l1-2.5L44 6l-3-1.5L40 2l-1 2.5L36 6l3 1.5z" fill="currentColor" stroke="none" opacity={0.7} />
        </svg>
      );
    case "gold-anniversary":
      return (
        <svg viewBox="0 0 56 32" {...common} strokeWidth={1.1}>
          <path d="M28 6c-8 4-12 12-10 22" />
          <path d="M28 6c8 4 12 12 10 22" />
          {[10, 15, 20].map((y) => (
            <path key={`l${y}`} d={`M${18 - (20 - y) * 0.2} ${y} q-4 1 -6 4`} strokeWidth={0.9} />
          ))}
          {[10, 15, 20].map((y) => (
            <path key={`r${y}`} d={`M${38 + (20 - y) * 0.2} ${y} q4 1 6 4`} strokeWidth={0.9} />
          ))}
        </svg>
      );
    default:
      return null;
  }
}
