import { SessionProvider } from "next-auth/react";
import UserHeader from "./userHeader";
import { NextIntlClientProvider } from "next-intl";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <NextIntlClientProvider>
          <UserHeader />
          {children}
        </NextIntlClientProvider>
      </SessionProvider>
    </div>
  );
}
