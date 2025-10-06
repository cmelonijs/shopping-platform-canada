import { SessionProvider } from "next-auth/react";
import AdminHeader from "@/components/admin/AdminHeader";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (
    !session.user ||
    !("role" in session.user) ||
    session.user.role !== "admin"
  ) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <AdminHeader />
        {children}
        <Toaster />
      </SessionProvider>
    </div>
  );
}
