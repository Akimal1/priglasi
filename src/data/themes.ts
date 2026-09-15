import type { StaticImageData } from "next/image";
import designBlackwhite from "@/assets/images/design-blackwhite.jpg";

export type ThemeKey =
  | "swans"
  | "blue-envelope"
  | "blackwhite"
  | "olive"
  | "burgundy"
  | "kids-light"
  | "pearl"
  | "steps"
  | "teal-silver"
  | "gold-anniversary";

export interface ThemeDef {
  key: ThemeKey;
  /** Фон обложки-превью */
  bg: string;
  /** Второй тон фона (для градиентов/паттернов) */
  bgSoft: string;
  /** Основной цвет текста на обложке */
  text: string;
  /** Приглушённый цвет текста на обложке */
  textMuted: string;
  /** Акцентный цвет (кольца, линии, кнопки) */
  accent: string;
  /** Второй акцент для двухцветных декоров (опционально) */
  accent2?: string;
  photo?: StaticImageData;
}

export const themes: Record<ThemeKey, ThemeDef> = {
  swans: {
    key: "swans",
    bg: "#f7f4ee",
    bgSoft: "#efe6d6",
    text: "#3c352a",
    textMuted: "#8a7f6c",
    accent: "#a9895a",
  },
  "blue-envelope": {
    key: "blue-envelope",
    bg: "#1c2a44",
    bgSoft: "#0f1a2e",
    text: "#f3ead2",
    textMuted: "#b9c3d6",
    accent: "#d8b45c",
    accent2: "#8fa3c4",
  },
  blackwhite: {
    key: "blackwhite",
    bg: "#0e0e0e",
    bgSoft: "#1c1c1c",
    text: "#f7f7f5",
    textMuted: "#d3d1cb",
    accent: "#ffffff",
    photo: designBlackwhite,
  },
  olive: {
    key: "olive",
    bg: "#565c38",
    bgSoft: "#454a2d",
    text: "#f5f1e3",
    textMuted: "#d3d0b8",
    accent: "#dcce97",
  },
  burgundy: {
    key: "burgundy",
    bg: "#4c1420",
    bgSoft: "#3a0f18",
    text: "#f4e4c8",
    textMuted: "#dcb9a3",
    accent: "#d8b45c",
  },
  "kids-light": {
    key: "kids-light",
    bg: "#fdf6ea",
    bgSoft: "#fbecd6",
    text: "#4a3b2a",
    textMuted: "#93765a",
    accent: "#e2914a",
    accent2: "#5c9ab0",
  },
  pearl: {
    key: "pearl",
    bg: "#f7f1e8",
    bgSoft: "#ecdfcd",
    text: "#463f36",
    textMuted: "#8c8171",
    accent: "#b48a5a",
  },
  steps: {
    key: "steps",
    bg: "#eef1e6",
    bgSoft: "#dde5cf",
    text: "#3f4a3c",
    textMuted: "#788669",
    accent: "#8fa07d",
    accent2: "#c98f8f",
  },
  "teal-silver": {
    key: "teal-silver",
    bg: "#123334",
    bgSoft: "#0b2324",
    text: "#eef4f0",
    textMuted: "#a9c2bd",
    accent: "#c7ccc7",
    accent2: "#7fb8ae",
  },
  "gold-anniversary": {
    key: "gold-anniversary",
    bg: "#2a2118",
    bgSoft: "#1b150f",
    text: "#f2e6c8",
    textMuted: "#c7b284",
    accent: "#d8b45c",
  },
};
