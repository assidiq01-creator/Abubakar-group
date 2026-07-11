import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  title: "Abubakar Group Ltd — Global Holdings Gateway",
  description: "Abubakar Group Ltd is a diversified international holding company delivering excellence across trade, education, technology, real estate and digital innovation throughout Africa, Turkey and beyond.",
  keywords: [
    "Abubakar Group",
    "Abubakar Group Ltd",
    "international holding company",
    "Nigeria holding company",
    "Africa trade company",
    "ASM Academy",
    "ASM Consultancy",
    "ASM Real Estate",
    "Abubakar Shopping Mall",
    "Yerwa Global",
    "Comme S One",
    "Arewa Digital Solutions",
    "international trade Nigeria",
    "education consultancy Nigeria",
    "real estate Nigeria Turkey",
    "Abubakar Ibrahim Abubakar",
  ],
  authors: [{ name: "Abubakar Group Ltd", url: "https://abubakar-group.com" }],
  creator: "Abubakar Group Ltd",
  publisher: "Abubakar Group Ltd",
  metadataBase: new URL("https://abubakar-group.com"),
  alternates: { canonical: "https://abubakar-group.com" },
  openGraph: {
    type: "website",
    url: "https://abubakar-group.com",
    title: "Abubakar Group Ltd — Global Holdings Gateway",
    description: "A diversified international holding company delivering excellence across trade, education, technology, real estate and digital innovation throughout Africa, Turkey and beyond.",
    siteName: "Abubakar Group Ltd",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abubakar Group Ltd — Global Holdings Gateway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abubakar Group Ltd — Global Holdings Gateway",
    description: "A diversified international holding company delivering excellence across trade, education, technology, real estate and digital innovation throughout Africa, Turkey and beyond.",
    images: ["/og-image.png"],
    creator: "@abubakar_mall",
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
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`} style={{ background: '#081522' }}>
      <body>{children}</body>
    </html>
  );
}
