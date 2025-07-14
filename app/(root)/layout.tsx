import Header from "@/components/share/header";
import Footer from "@/components/share/footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <Header />
        {children}
        <Footer />
      </SessionProvider>
    </div>
  );
}
