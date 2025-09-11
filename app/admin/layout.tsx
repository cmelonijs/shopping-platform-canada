import { SessionProvider } from "next-auth/react";
import AdminHeader from "../admin/adminHeader";

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <AdminHeader/>
        {children}
      </SessionProvider>
    </div>
  );
}