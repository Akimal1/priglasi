"use client";

import Image from "next/image";
import { motion } from "motion/react";
import heroImage from "@/assets/images/hero-wedding.jpg";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[560px] w-full items-center justify-center overflow-hidden">
      <Image
        src={heroImage}
        alt="Жених и невеста у винтажного автомобиля в аллее деревьев"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 35%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        className="relative z-10 flex flex-col items-center gap-5 px-6 text-center text-white"
      >
        <motion.div
          variants={item}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Logo showWordmark={false} markClassName="h-12 w-12 sm:h-14 sm:w-14" />
        </motion.div>

        <motion.h1
          variants={item}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-4xl tracking-[0.08em] sm:text-6xl md:text-7xl"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md text-sm text-white/90 sm:text-base"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-4"
        >
          <Button href="/catalog" variant="outline-light">
            Смотреть каталог
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
