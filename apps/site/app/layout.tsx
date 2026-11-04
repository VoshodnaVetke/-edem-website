import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import "@edem/ui/styles.css";
import "@edem/ui/fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Эдем | Мастерская ролевых игр",
  description: "Сайт мастерской группы Эдема.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>
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
