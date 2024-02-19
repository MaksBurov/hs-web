import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import "@/styles/main.scss";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Хендмейд мыло",
  description: "Декоративное мыло ручной работы",
  keywords: "мыло, хендмейд, ручная работа, декоративное мыло",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
