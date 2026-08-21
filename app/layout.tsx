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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://csaladititkok.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Családi Titkok – Mikor megy a Super TV2-n? Adásrend és időpontok",
    template: "%s | Családi Titkok Adásrend",
  },

  description:
    "Mikor megy a Családi Titkok a Super TV2-n? Nézd meg az összes közelgő adás időpontját, epizódját és visszaszámlálóját. Valós idejű tévéprogram a Családi Titkok sorozathoz.",

  keywords: [
    "Családi Titkok",
    "Családi Titkok adásrend",
    "Családi Titkok mikor megy",
    "Családi Titkok Super TV2",
    "Családi Titkok műsoridő",
    "Családi Titkok epizódok",
    "Super TV2 műsor",
    "Super TV2 adásrend",
    "Super TV2 program",
    "magyar sorozat",
    "magyar reality",
    "tévéprogram",
    "tévéműsor",
    "TV műsor ma",
    "TV adásrend",
    "mikor megy a tévében",
    "Családi Titkok visszaszámláló",
    "Családi Titkok következő adás",
    "family secrets Hungary",
    "Super TV2 schedule",
  ],

  authors: [{ name: "Családi Titkok Adásrend" }],
  creator: "Családi Titkok Adásrend",
  publisher: "Családi Titkok Adásrend",

  alternates: {
    canonical: BASE_URL,
    languages: {
      "hu-HU": BASE_URL,
    },
  },

  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: BASE_URL,
    siteName: "Családi Titkok Adásrend",
    title: "Családi Titkok – Mikor megy a Super TV2-n?",
    description:
      "Valós idejű visszaszámláló és teljes adásrend a Családi Titkok sorozathoz a Super TV2 műsorán.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Családi Titkok – Adásrend",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Családi Titkok – Mikor megy a Super TV2-n?",
    description:
      "Valós idejű visszaszámláló és teljes adásrend a Családi Titkok sorozathoz.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
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
