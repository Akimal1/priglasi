import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Pinyon_Script } from "next/font/google";
import { MotionConfig } from "motion/react";
import { siteConfig } from "@/config/site";
import { OrderModalProvider } from "@/context/OrderModalContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Декоративный латинский курсив для шаблона "Swans" — замена
 *  недоступного коммерческого Bickham Script Pro с оригинала. */
const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — цифровые приглашения на свадьбу и торжества`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${manrope.variable} ${pinyonScript.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
        <MotionConfig reducedMotion="user">
          <OrderModalProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </OrderModalProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
