import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "700", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "APEX PHYSIQUE | Elite Performance",
  description: "Ultra-Isolate Whey Protein engineered for elite performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-[#050505] text-[#d4cfc8] overflow-x-hidden">{children}</body>
    </html>
  );
}
