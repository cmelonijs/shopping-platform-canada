import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Menu from "@/components/share/menu";

export default function UserHeader() {
  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-3 flex justify-between items-center py-3">
        <div className="flex items-center  gap-4">
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
            href="/user/profile"
            className="text-l hover:bg-gray-200 py-2 px-3 rounded-md transition-colors "
          >
            Profile
          </Link>
          <Link
            href="/user/orders"
            className="text-l hover:bg-gray-200 py-2 px-3 rounded-md transition-colors"
          >
            Order
          </Link>
        </div>
        <Menu />
      </div>
    </div>
  );
}
