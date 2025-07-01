import type { Metadata } from "next";
import { Bebas_Neue, Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
});

const bebas = Bebas_Neue ({
    subsets: ["latin"],
    variable: "--font-bebas_neue",
    display: "swap",
    weight: "400",
});

export const metadata: Metadata = {
  title: "Store",
  description: "CarlomJs E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} ${bebas.variable} antialiased`}>{children}</body>
    </html>
  );
}
