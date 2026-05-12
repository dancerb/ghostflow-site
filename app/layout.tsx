import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ghost Flow LLC — Porting & Polishing",
  description:
    "Precision cylinder head porting, intake manifold porting, exhaust work, valve jobs, and mirror polishing. Race-proven results.",
  keywords: "cylinder head porting, intake porting, exhaust porting, valve job, mirror polish, performance engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-black text-brand-silver">
        {children}
      </body>
    </html>
  );
}
