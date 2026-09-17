import { useId, useRef, useState, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Авторская декоративная графика для шаблона "Swans" — оригинальные inline
 * SVG вместо ассетов swans-template.vercel.app (там фотореалистичные
 * лебеди/перья и коммерческий шрифт Bickham Script Pro, которые нельзя
 * переиспользовать). Формы подобраны так, чтобы читаться как перо/лебедь/
 * орнаментальная рамка даже при низкой непрозрачности water-mark слоя.
 */

const INK = "#63402e";

export function Feather({
  className,
  style,
  color = INK,
}: {
  className?: string;
  style?: CSSProperties;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 40 170" className={className} style={style} aria-hidden="true">
      <path
        d="M20 0C34 20 36 100 20 170C4 100 6 20 20 0Z"
        fill="#fff"
        stroke={color}
        strokeOpacity={0.35}
        strokeWidth={1}
      />
      <path d="M20 6V164" stroke={color} strokeOpacity={0.35} strokeWidth={0.8} />
      <path
        d="M20 20l-11 8M20 20l11 8M20 40l-12 8M20 40l12 8M20 60l-12 8M20 60l12 8M20 80l-12 8M20 80l12 8M20 100l-11 7M20 100l11 7M20 120l-10 6M20 120l10 6M20 140l-8 5M20 140l8 5"
        stroke={color}
        strokeOpacity={0.22}
        strokeWidth={0.7}
      />
    </svg>
  );
}

/** Крупный приглушённый водяной знак лебедя — фон секций (opacity задаётся снаружи). */
export function SwanWatermark({
  className,
  style,
  mirrored = false,
  color = INK,
}: {
  className?: string;
  style?: CSSProperties;
  mirrored?: boolean;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 150"
      className={className}
      style={{ ...style, transform: mirrored ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="90" cy="105" rx="48" ry="26" fill={color} fillOpacity={0.5} strokeOpacity={0.5} strokeWidth={1.6} />
        <path d="M70 100 C84 93 100 96 108 108" strokeOpacity={0.3} strokeWidth={1.4} />
        <path d="M124 94 C96 80 96 40 126 30 C138 26 130 14 144 8" strokeOpacity={0.55} strokeWidth={7} />
        <circle cx="145" cy="7" r="5.5" fill={color} fillOpacity={0.6} strokeOpacity={0.55} strokeWidth={1.6} />
        <path d="M150 5 L161 8 L150 11 Z" fill={color} fillOpacity={0.4} stroke="none" />
        <path d="M6 128 C40 138 90 141 140 135 C165 132 182 127 196 120" strokeOpacity={0.3} strokeWidth={1.4} />
        <path d="M0 138 C35 146 95 148 145 142 C170 139 186 134 200 127" strokeOpacity={0.2} strokeWidth={1.2} />
      </g>
    </svg>
  );
}

/** Крошечный золотой лебедь — метка выбранного дня в календаре. */
export function SwanBadge({ className, color = "#b98d54" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 34" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="18" cy="24" rx="12" ry="7" fill={color} fillOpacity={0.9} stroke="none" />
        <path d="M25 20 C19 15 19 8 27 5 C30 4 27 1 31 0" strokeWidth={2.6} strokeOpacity={0.95} />
        <circle cx="31.5" cy="0.5" r="1.6" fill={color} stroke="none" />
      </g>
    </svg>
  );
}

/** Двойная рамка с уголками-росчерками — как кнопки "Ачуу"/"Картаны ачуу" в оригинале. */
function OrnateFrame({ className, color = INK }: { className?: string; color?: string }) {
  const corner = "M10 26 C10 16 16 10 26 10 M10 34 C24 34 34 24 34 10";
  const dots = [
    [10, 34],
    [34, 10],
  ] as const;
  return (
    <svg
      viewBox="0 0 320 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    >
      <g stroke={color} fill="none" strokeWidth={1}>
        <rect x={6} y={6} width={308} height={108} strokeOpacity={0.55} />
        <rect x={12} y={12} width={296} height={96} strokeOpacity={0.35} />
        <g strokeOpacity={0.6}>
          <path d={corner} strokeWidth={1} />
          {dots.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.4} fill={color} stroke="none" />
          ))}
        </g>
        <g strokeOpacity={0.6} transform="translate(320,0) scale(-1,1)">
          <path d={corner} strokeWidth={1} />
          {dots.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}-b`} cx={cx} cy={cy} r={1.4} fill={color} stroke="none" />
          ))}
        </g>
        <g strokeOpacity={0.6} transform="translate(0,120) scale(1,-1)">
          <path d={corner} strokeWidth={1} />
          {dots.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}-c`} cx={cx} cy={cy} r={1.4} fill={color} stroke="none" />
          ))}
        </g>
        <g strokeOpacity={0.6} transform="translate(320,120) scale(-1,-1)">
          <path d={corner} strokeWidth={1} />
          {dots.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}-d`} cx={cx} cy={cy} r={1.4} fill={color} stroke="none" />
          ))}
        </g>
      </g>
    </svg>
  );
}

const ornateLabelClasses = "relative z-10 text-xs tracking-[0.3em] uppercase";

export function OrnateButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex min-w-[220px] items-center justify-center px-10 py-5",
        className,
      )}
      style={{ color: INK }}
    >
      <OrnateFrame />
      <span className={ornateLabelClasses}>{children}</span>
    </button>
  );
}

export function OrnateLink({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={cn(
        "relative inline-flex min-w-[220px] items-center justify-center px-10 py-5",
        className,
      )}
      style={{ color: INK }}
    >
      <OrnateFrame />
      <span className={ornateLabelClasses}>{children}</span>
    </a>
  );
}

/**
 * Плавающий play/pause-тоггл фоновой музыки — как `.stopbgmusic` в оригинале,
 * только без самого трека: лицензионный короткий mp3 ещё не подобран, поэтому
 * `<audio>` ссылается на `/audio/swans-bgm.mp3`, которого пока нет в `public/`.
 * `.play()` в этом случае молча отклоняется (перехвачено `catch`), кнопка
 * просто не звучит — как только файл появится по этому пути, плеер заработает
 * без правок кода.
 */
export function MusicToggle({ className, color = INK }: { className?: string; color?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/swans-bgm.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Выключить музыку" : "Включить музыку"}
        aria-pressed={playing}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border transition-opacity hover:opacity-100",
          className,
        )}
        style={{ borderColor: color, color, opacity: 0.55 }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          {playing ? (
            <g fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round">
              <path d="M9 6v12" />
              <path d="M15 6v12" />
            </g>
          ) : (
            <g fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </g>
          )}
        </svg>
      </button>
    </>
  );
}

/** Лёгкая бумажная зернистость на всю секцию — оригинальный SVG-шум вместо
 *  фото-текстуры перьев с оригинала (там лицензированный ассет). */
export function PaperGrain({ opacity = 0.05 }: { opacity?: number }) {
  const id = useId();
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}
