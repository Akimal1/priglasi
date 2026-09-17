import type { StaticImageData } from "next/image";
import designBlackwhite from "@/assets/images/design-blackwhite.jpg";
import designSwans from "@/assets/images/design-swans.jpg";

export type ThemeKey =
  | "swans"
  | "swans-classic"
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
  /** Затемнение фото-обложки: "dark" (по умолч.) — контраст для светлого текста,
   *  "light" — светлая кремовая вуаль для тёмного текста поверх светлого фото. */
  overlay?: "dark" | "light";
}

export const themes: Record<ThemeKey, ThemeDef> = {
  swans: {
    key: "swans",
    bg: "#fdfaf5",
    bgSoft: "#f2e8d9",
    text: "#4a3428",
    textMuted: "#7a6552",
    accent: "#8a5a3a",
    accent2: "#7a4632",
    photo: designSwans,
    overlay: "light",
  },
  "swans-classic": {
    key: "swans-classic",
    bg: "#fdfaf6",
    bgSoft: "#f2e8d8",
    text: "#63402e",
    textMuted: "#9c8672",
    accent: "#b98d54",
    accent2: "#63402e",
  },
  "blue-envelope": {
    key: "blue-envelope",
    bg: "#fffdf6",
    bgSoft: "#f3e6c8",
    text: "#112250",
    textMuted: "#5b6f9e",
    accent: "#b8903f",
    accent2: "#2a4888",
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
