//navbar-adminpage
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-4  ">
            <Button asChild variant="ghost">
                <Link
                    href="/admin/overview"
                >
                    Overview
                </Link>
            </Button>
            <Button asChild variant="ghost">
                <Link
                    href="/admin/product"
                >
                    Product
                </Link>
            </Button>
            <Button asChild variant="ghost">
                <Link
                    href="/admin/orders"
                >
                    Orders
                </Link>
            </Button>
            <Button asChild variant="ghost">
                <Link
                    href="/admin/users"
                >
                    Users
                </Link>
            </Button>
        </div>


    );
}