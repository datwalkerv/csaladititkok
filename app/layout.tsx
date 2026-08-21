import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import { TimezoneProvider } from "@/contexts/TimezoneContext";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Családi titkok — Adásrend",
  description: "Mikor megy a Családi titkok a tévében?",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${bebasNeue.variable} h-full`}>
      <body className="min-h-full">
        <TimezoneProvider>{children}</TimezoneProvider>
      </body>
    </html>
  );
}
