
import UserHeader from "./userHeader";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";


export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col min-h-screen">

        <UserHeader />
        {children}
        
     
    </div>
  );
}
