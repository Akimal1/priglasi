import Image from "next/image";
import type { CSSProperties } from "react";
import type { Design } from "@/data/designs";
import { themes, type ThemeKey } from "@/data/themes";
import { ThemeIcon } from "./ThemeIcon";
import { ThemeDecoration } from "./ThemeDecoration";
import { cn, hexToRgba } from "@/lib/utils";

function backgroundStyle(bg: string, bgSoft: string, key: ThemeKey): CSSProperties {
  switch (key) {
    case "olive":
      return {
        backgroundColor: bg,
        backgroundImage: `repeating-linear-gradient(125deg, ${bgSoft} 0px, ${bgSoft} 1px, transparent 1px, transparent 7px), radial-gradient(circle at 50% 30%, transparent 40%, rgba(0,0,0,0.18) 100%)`,
      };
    case "kids-light":
      return {
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 15% 22%, ${bgSoft} 0 7px, transparent 8px), radial-gradient(circle at 82% 18%, ${bgSoft} 0 5px, transparent 6px), radial-gradient(circle at 75% 82%, ${bgSoft} 0 8px, transparent 9px), radial-gradient(circle at 22% 80%, ${bgSoft} 0 5px, transparent 6px)`,
      };
    case "blue-envelope":
      return {
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 50% 0%, ${bgSoft} 0%, transparent 55%), linear-gradient(180deg, ${bg}, ${bgSoft})`,
      };
    case "burgundy":
    case "gold-anniversary":
    case "teal-silver":
      return {
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 50% 35%, ${bgSoft} 0%, ${bg} 75%)`,
      };
    case "pearl":
      return {
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 50% 12%, ${bgSoft} 0%, transparent 50%), linear-gradient(180deg, ${bg}, ${bgSoft})`,
      };
    default:
      return {
        backgroundColor: bg,
        backgroundImage: `linear-gradient(175deg, ${bgSoft}, ${bg})`,
      };
  }
}

const nameStyleByTheme: Partial<Record<ThemeKey, string>> = {
  swans: "italic",
  pearl: "italic",
  "blue-envelope": "tracking-wide",
  burgundy: "tracking-wide",
  "gold-anniversary": "tracking-wide",
};

export function DesignScreen({
  design,
  size = "compact",
  priority = false,
}: {
  design: Design;
  size?: "compact" | "full";
  priority?: boolean;
}) {
  const theme = themes[design.theme];
  const isFull = size === "full";

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center"
      style={theme.photo ? { backgroundColor: theme.bg } : backgroundStyle(theme.bg, theme.bgSoft, theme.key)}
    >
      {theme.photo && (
        <>
          <Image
            src={theme.photo}
            alt=""
            fill
            sizes={isFull ? "100vw" : "320px"}
            priority={priority}
            className="object-cover"
            style={{ objectPosition: "50% 62%" }}
          />
          {theme.overlay === "light" ? (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(180deg, ${hexToRgba(theme.bg, 0.72)} 0%, ${hexToRgba(theme.bg, 0.32)} 45%, ${hexToRgba(theme.bg, 0.78)} 100%)`,
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />
          )}
        </>
      )}

      {!theme.photo && (
        <ThemeDecoration theme={theme.key} accent={theme.accent} accent2={theme.accent2} />
      )}

      <div
        className={cn(
          "relative z-10 flex flex-col items-center px-4",
          isFull ? "gap-5" : "gap-2.5",
        )}
        style={{ color: theme.text }}
      >
        <span style={{ color: theme.accent }}>
          <ThemeIcon theme={theme.key} className={isFull ? "h-9 w-16" : "h-4 w-8"} />
        </span>
        <p
          className={cn("tracking-caps-lg uppercase", isFull ? "text-xs" : "text-[7px]")}
          style={{ color: theme.textMuted }}
        >
          {design.demo.eventTypeLabel}
        </p>
        <p
          className={cn(
            "font-display leading-tight",
            isFull ? "text-4xl sm:text-6xl" : "text-base",
            nameStyleByTheme[theme.key],
          )}
        >
          {design.demo.heroNames}
        </p>
        {isFull && (
          <p className="max-w-xs text-sm sm:text-base" style={{ color: theme.textMuted }}>
            {design.demo.heroCaption}
          </p>
        )}
      </div>
    </div>
  );
}
