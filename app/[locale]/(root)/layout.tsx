import Header from "@/components/share/header";
import Footer from "@/components/share/footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
   params,
}: Readonly<{
  children: React.ReactNode;
   params: Promise<{locale: string}>;
}>) {
const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <NextIntlClientProvider>
        <Header />
        {children}
        <Toaster />
        <Footer />
        </NextIntlClientProvider>
      </SessionProvider>
    </div>
  );
}
