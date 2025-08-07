import Header from "@/components/share/header";
import Footer from "@/components/share/footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import PageLoaderWrapper from "@/components/PageLoaderWrapper";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <Header />
        <PageLoaderWrapper>
        {children}
        </PageLoaderWrapper>
        <Toaster />
        <Footer />
      </SessionProvider>
    </div>
  );
}
