import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Menu from "./menu";
import HamburgerMenu from "./hamburgerMenu";

export default function Header() {
  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-3 flex justify-between items-center py-3">
        {/* Left Side */}
        <div className="flex items-center">
          <HamburgerMenu/>
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

        <Menu />
      </div>
    </div>
  );
}
