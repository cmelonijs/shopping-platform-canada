"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/share/header";
import UserHeader from "@/components/share/user-header";

export default function DynamicHeader() {
  const pathname = usePathname();
  const isUserPage = pathname.startsWith("/user") || false;

  return isUserPage ? <UserHeader /> : <Header />;
}
//DinamycHeader