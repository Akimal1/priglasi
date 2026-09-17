import type { ThemeKey } from "@/data/themes";

interface DecorationProps {
  theme: ThemeKey;
  accent: string;
  accent2?: string;
}

/**
 * Более выразительный декоративный слой под текстом обложки —
 * у каждой темы своя композиция (без случайных чисел, чтобы не
 * ловить рассинхронизацию рендера сервера и клиента).
 *
 * preserveAspectRatio держим на "meet" (масштаб с сохранением пропорций,
 * без обрезки): карточка каталога почти совпадает по пропорциям с viewBox,
 * а на широкой обложке приглашения декор просто аккуратно центрируется
 * колонкой позади текста — без искажения кругов в эллипсы и без обрезки.
 */
export function ThemeDecoration({ theme, accent, accent2 }: DecorationProps) {
  const secondary = accent2 ?? accent;
  const par = "xMidYMid meet";

  switch (theme) {
    case "blue-envelope": {
      const notches = Array.from({ length: 14 }, (_, i) => i * (360 / 14));
      return (
        <svg viewBox="0 0 100 200" preserveAspectRatio={par} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <polygon points="6,0 50,58 94,0" fill="none" stroke={secondary} strokeWidth={0.4} opacity={0.4} />
          <polygon points="6,0 94,0 94,200 6,200" fill="none" stroke={secondary} strokeWidth={0.3} opacity={0.25} />
          <circle cx={9} cy={9} r={1.4} fill={secondary} opacity={0.5} />
          <circle cx={91} cy={9} r={1.4} fill={secondary} opacity={0.5} />
          <circle cx={9} cy={191} r={1.4} fill={secondary} opacity={0.5} />
          <circle cx={91} cy={191} r={1.4} fill={secondary} opacity={0.5} />
          {/* восковая печать на кончике клапана конверта */}
          <g opacity={0.65}>
            <circle cx={50} cy={44} r={9} fill="none" stroke={accent} strokeWidth={0.7} />
            {notches.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 50 + Math.cos(rad) * 9;
              const y1 = 44 + Math.sin(rad) * 9;
              const x2 = 50 + Math.cos(rad) * 10.8;
              const y2 = 44 + Math.sin(rad) * 10.8;
              return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth={0.4} />;
            })}
            <path d="M50 39l4 5-4 5-4-5z" fill={accent} stroke="none" />
          </g>
        </svg>
      );
    }

    case "olive":
      return (
        <svg viewBox="0 0 100 200" preserveAspectRatio={par} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M8 200 C 8 160 26 150 20 118 C 14 90 30 70 26 40"
            fill="none"
            stroke={accent}
            strokeWidth={0.5}
            opacity={0.45}
          />
          {[46, 66, 86, 106, 130, 152].map((y, i) => (
            <path
              key={y}
              d={`M${20 + (i % 2 === 0 ? 4 : -4)} ${y} q ${i % 2 === 0 ? 12 : -12} -6 ${i % 2 === 0 ? 16 : -16} -14`}
              fill="none"
              stroke={accent}
              strokeWidth={0.45}
              opacity={0.4}
            />
          ))}
        </svg>
      );

    case "burgundy": {
      const diamonds = [10, 26, 42, 58, 74, 90];
      return (
        <svg viewBox="0 0 100 200" preserveAspectRatio={par} className="absolute inset-0 h-full w-full" aria-hidden="true">
          {diamonds.map((x) => (
            <g key={`t-${x}`}>
              <rect x={x - 2} y={9} width={4} height={4} transform={`rotate(45 ${x} 11)`} fill="none" stroke={accent} strokeWidth={0.4} opacity={0.6} />
            </g>
          ))}
          {diamonds.map((x) => (
            <g key={`b-${x}`}>
              <rect x={x - 2} y={187} width={4} height={4} transform={`rotate(45 ${x} 189)`} fill="none" stroke={accent} strokeWidth={0.4} opacity={0.6} />
            </g>
          ))}
          <line x1={4} y1={20} x2={96} y2={20} stroke={accent} strokeWidth={0.25} opacity={0.4} />
          <line x1={4} y1={180} x2={96} y2={180} stroke={accent} strokeWidth={0.25} opacity={0.4} />
        </svg>
      );
    }

    case "kids-light": {
      const confetti = [
        { x: 14, y: 16, c: accent, s: 2.4, shape: "c" },
        { x: 82, y: 22, c: secondary, s: 2, shape: "r" },
        { x: 24, y: 168, c: secondary, s: 2.2, shape: "c" },
        { x: 76, y: 172, c: accent, s: 1.8, shape: "r" },
        { x: 50, y: 12, c: accent, s: 1.6, shape: "c" },
        { x: 12, y: 100, c: accent, s: 1.8, shape: "r" },
        { x: 88, y: 96, c: secondary, s: 2, shape: "c" },
        { x: 60, y: 180, c: accent, s: 1.6, shape: "c" },
      ];
      return (
        <svg viewBox="0 0 100 200" preserveAspectRatio={par} className="absolute inset-0 h-full w-full" aria-hidden="true">
          {confetti.map((c, i) =>
            c.shape === "c" ? (
              <circle key={i} cx={c.x} cy={c.y} r={c.s} fill={c.c} opacity={0.55} />
            ) : (
              <rect
                key={i}
                x={c.x - c.s}
                y={c.y - c.s}
                width={c.s * 2}
                height={c.s * 2}
                fill={c.c}
                opacity={0.5}
                transform={`rotate(20 ${c.x} ${c.y})`}
              />
            ),
          )}
          <path d="M10 34 q 40 -14 80 0" fill="none" stroke={secondary} strokeWidth={0.4} opacity={0.4} />
        </svg>
      );
    }

    case "pearl": {
      const pearls = [10, 22, 34, 46, 58, 66, 74, 82, 90];
      return (
        <svg viewBox="0 0 100 200" preserveAspectRatio={par} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M6 14 Q 50 34 94 14" fill="none" stroke={accent} strokeWidth={0.3} opacity={0.45} />
          {pearls.map((x) => {
            const y = 14 + Math.sin((x / 100) * Math.PI) * 12;
            return <circle key={x} cx={x} cy={y} r={1.4} fill={accent} opacity={0.55} />;
          })}
          <circle cx={20} cy={182} r={1.2} fill={accent} opacity={0.4} />
          <circle cx={80} cy={186} r={1.5} fill={accent} opacity={0.4} />
        </svg>
      );
    }

    case "steps": {
      const dots = [22, 30, 38, 46, 54, 62, 70, 78];
      return (
        <svg viewBox="0 0 100 200" preserveAspectRatio={par} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d={`M18 170 ${dots.map((y, i) => `Q ${i % 2 === 0 ? 40 : 60} ${y - 4} ${i % 2 === 0 ? 62 : 38} ${y - 10}`).join(" ")}`}
            fill="none"
            stroke={secondary}
            strokeWidth={0.4}
            strokeDasharray="2 3"
            opacity={0.45}
          />
          <circle cx={26} cy={20} r={4} fill="none" stroke={accent} strokeWidth={0.35} opacity={0.4} />
          <circle cx={74} cy={16} r={3} fill="none" stroke={accent} strokeWidth={0.35} opacity={0.35} />
        </svg>
      );
    }

    case "teal-silver":
      return (
        <svg viewBox="0 0 100 200" preserveAspectRatio={par} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <rect x={5} y={5} width={90} height={190} fill="none" stroke={accent} strokeWidth={0.3} opacity={0.35} />
          <rect x={8} y={8} width={84} height={184} fill="none" stroke={accent} strokeWidth={0.2} opacity={0.25} />
          {[30, 60, 90, 120, 150].map((y) => (
            <circle key={y} cx={50} cy={y} r={1.2} fill={secondary} opacity={0.5} />
          ))}
        </svg>
      );

    case "gold-anniversary":
      return (
        <svg viewBox="0 0 100 200" preserveAspectRatio={par} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx={50} cy={100} r={40} fill="none" stroke={accent} strokeWidth={0.3} opacity={0.35} />
          <circle cx={50} cy={100} r={44} fill="none" stroke={accent} strokeWidth={0.15} opacity={0.25} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 50 + Math.cos(rad) * 44;
            const y = 100 + Math.sin(rad) * 44;
            return <circle key={deg} cx={x} cy={y} r={0.8} fill={accent} opacity={0.5} />;
          })}
        </svg>
      );

    default:
      return null;
  }
}
