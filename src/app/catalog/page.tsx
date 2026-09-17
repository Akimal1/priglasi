import type { Metadata } from "next";
import { CatalogExperience } from "@/components/home/CatalogExperience";

export const metadata: Metadata = {
  title: "Каталог приглашений",
  description:
    "Каталог цифровых приглашений priglasi_design.kg: свадьба, кыз узатуу, сүннөт той, юбилей и тушоо кесүү.",
};

export default function CatalogPage() {
  return (
    <div className="pb-24 pt-32 sm:pb-28 sm:pt-40">
      <CatalogExperience eyebrow="Каталог" title="Все дизайны" />
    </div>
  );
}
