import catWedding from "@/assets/images/cat-wedding.jpg";
import catKyzUzatuu from "@/assets/images/cat-kyzuzatuu.jpg";
import catSunnotToi from "@/assets/images/cat-sunnottoi.jpg";
import catJubilee from "@/assets/images/cat-jubilee.jpg";
import catTushooKesuu from "@/assets/images/cat-tushookesuu.jpg";
import type { StaticImageData } from "next/image";

export type CategorySlug =
  | "all"
  | "wedding"
  | "kyz-uzatuu"
  | "sunnot-toi"
  | "jubilee"
  | "tushoo-kesuu";

export interface Category {
  slug: CategorySlug;
  label: string;
  image: StaticImageData | null;
}

export const categories: Category[] = [
  { slug: "all", label: "Все", image: null },
  { slug: "wedding", label: "Свадьба", image: catWedding },
  { slug: "kyz-uzatuu", label: "Кыз узатуу", image: catKyzUzatuu },
  { slug: "sunnot-toi", label: "Сүннөт той", image: catSunnotToi },
  { slug: "jubilee", label: "Юбилей", image: catJubilee },
  { slug: "tushoo-kesuu", label: "Тушоо кесүү", image: catTushooKesuu },
];

export const categoryLabel = (slug: CategorySlug): string =>
  categories.find((c) => c.slug === slug)?.label ?? slug;
