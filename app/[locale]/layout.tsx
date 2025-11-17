import type { Metadata } from "next";
import { Bebas_Neue, Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const rubik = Rubik({
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas_neue",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "SimpleShop",
  description: "CarlomJs E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.className} ${bebas.variable} antialiased`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
