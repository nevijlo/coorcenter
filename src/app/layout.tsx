import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Координационный центр по противодействию идеологии терроризма и профилактике экстремизма САФУ",
  description:
    "Платформа для безопасной и своевременной передачи обращений в Координационный центр САФУ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("font-sans", inter.variable)}>
      <body>
        {children}
        <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}