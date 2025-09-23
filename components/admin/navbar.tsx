"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <Link href="/" className="shirnk-0">
        <Image
          src={logo}
          alt="Logo"
          width={50}
          height={50}
          className="scale-110 object-contain"
        />
      </Link>

      <Button asChild
        variant={pathname === "/admin/overview" ? "default" : "ghost"}
        className={pathname === "/admin/overview" ? "bg-primary" : ""}>
        <Link href="/admin/overview">Overview</Link>
      </Button>

      <Button asChild
        variant={pathname === "/admin/products" ? "default" : "ghost"}
        className={pathname === "/admin/products" ? "bg-primary" : ""}>
        <Link href="/admin/products">Product</Link>
      </Button>

      <Button asChild
        variant={pathname === "/admin/orders" ? "default" : "ghost"}
        className={pathname === "/admin/orders" ? "bg-primary" : ""}>
        <Link href="/admin/orders">Orders</Link>
      </Button>

      <Button asChild
        variant={pathname === "/admin/users" ? "default" : "ghost"}
        className={pathname === "/admin/users" ? "bg-primary" : ""}>
        <Link href="/admin/users">Users</Link>
      </Button>

    </div >
  );
}
