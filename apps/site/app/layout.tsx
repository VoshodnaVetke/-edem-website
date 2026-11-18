import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteBackground } from "../components/layout/SiteBackground";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteBootstrap } from "../components/layout/SiteBootstrap";
import "@edem/ui/styles.css";
import "@edem/ui/fonts.css";
import "./globals.css";

const revision = process.env.EDEM_SITE_REVISION;
const pageBackground = "#05070c";

export const metadata: Metadata = {
  title: "Эдем | Мастерская ролевых игр",
  description: "Сайт мастерской группы Эдема.",
  other: revision ? { "edem-revision": revision } : undefined,
};

export const viewport: Viewport = {
  themeColor: pageBackground,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="ru"
      style={{ backgroundColor: pageBackground, colorScheme: "dark" }}
    >
      <head>
        <SiteBootstrap />
      </head>
      <body>
        <SiteBackground />
        <a className="site-skip-link" href="#main-content">
          Перейти к содержимому
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
