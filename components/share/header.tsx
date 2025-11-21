
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Menu from "./menu";
import { getAllCategoriesWithCount } from "@/lib/actions/products.actions";
import HamburgerMenu from "./hamburgerMenu";
import SearchBar from "./searchBarUser";
import LocaleSwitcher from "./LocaleSwitcher";

export default async function Header() {
  const categories = await getAllCategoriesWithCount();
  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-6 flex justify-between items-center py-3">
        {/* Left Side */}
        <div className="flex items-center">
          <HamburgerMenu categories={categories} />
          <Link href="/" className="shirnk-0">
            <Image
              src={logo}
              alt="Logo"
              width={50}
              height={50}
              className="scale-110 object-contain"
            />
          </Link>
          <Link
            href="/"
            className="text-4xl font-bold font-bebas tracking-logo"
          >
            SimpleShop
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <div className="hidden lg:flex gap-2">
            <SearchBar categories={categories} />
          </div>
          <Menu />
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}
