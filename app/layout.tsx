import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abubakar Group Ltd — Global Holdings",
  description: "Abubakar Group Ltd is a global holding company delivering value across e-commerce, trade, technology, education, real estate, and digital solutions.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
