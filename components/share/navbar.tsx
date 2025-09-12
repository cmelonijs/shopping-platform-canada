//navbar-adminpage
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-4  ">
            <Link
                href="/admin/overview"
                className={`text-l py-2 px-3 rounded-md transition-colors ${pathname === "/admin/overview" ? "bg-black text-white" : "hover:bg-gray-200"
                    }`}
            >
                Overview
            </Link>
            <Link
                href="/admin/product"
                className={`text-l py-2 px-3 rounded-md transition-colors ${pathname === "/admin/product" ? "bg-black text-white" : "hover:bg-gray-200"
                    }`}
            >
                Product
            </Link>
            <Link
                href="/admin/orders"
                className={`text-l py-2 px-3 rounded-md transition-colors ${pathname === "/admin/orders" ? "bg-black text-white" : "hover:bg-gray-200"
                    }`}
            >
                Orders
            </Link>
            <Link
                href="/admin/users"
                className={`text-l py-2 px-3 rounded-md transition-colors ${pathname === "/admin/users" ? "bg-black text-white" : "hover:bg-gray-200"
                    }`}
            >
                Users
            </Link>
        </div>


    );
}