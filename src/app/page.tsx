import { Hero } from "@/components/home/Hero";
import { CatalogExperience } from "@/components/home/CatalogExperience";
import { AboutSection } from "@/components/home/AboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="py-24 sm:py-28">
        <CatalogExperience limit={8} showAllLink />
      </div>
      <AboutSection />
    </>
  );
}
