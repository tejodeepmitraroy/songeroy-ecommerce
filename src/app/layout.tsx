import type { Metadata } from "next";
import "./globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | KICKZ & CO.",
    default: "KICKZ & CO. | Modern Minimalist E-Commerce",
  },
  description:
    "Curated modern apparel, artisanal footwear, and lifestyle essentials with minimal aesthetics and functional design.",
  keywords: [
    "minimalist fashion",
    "sneakers",
    "essential tees",
    "Japanese workwear",
    "modern e-commerce",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col font-sans selection:bg-neutral-900 selection:text-white"
        suppressHydrationWarning
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
