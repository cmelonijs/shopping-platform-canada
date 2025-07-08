import { Button } from "@/components/ui/button";
import { AlignLeft, EllipsisVertical, ShoppingCart, House, UserRound} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./theme";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets//images/logo.png";



export default function Header() {

  return (
    <div className="w-full border-b">
        <div className="container mx-auto px-3 flex justify-between items-center py-3">
          <div className="flex items-center">
            <Button variant="ghost" size ="lg" className="p-3 shadow-none">
              <AlignLeft className="text-2xl scale-150" />
            </Button>
            <Link href="/" className="shirnk-0">
              <Image
                src={logo}
                alt="Logo"
                width={50}
                height={50}
                className="scale-110 object-contain"
              />
            </Link>
            <Link href="/" className="text-4xl font-bold font-bebas tracking-logo">SimpleShop</Link>
          </div>

          {/* Button */}
          <div className="items-center space-x-4 flex">
            {/* Mode Toggle Button */}
            <ModeToggle />

            <div className="hidden md:flex space-x-4">
            <Link href="/">
               <Button variant="outline" size="sm" className="p-4 shadow-none">
                  <ShoppingCart className="mr-2" />
                  Cart
              </Button>
            </Link>
            <Link href="/signIn">
              <Button variant="default" size="sm" className="p-4 shadow-none">
                  <UserRound className="mr-2" />
                  Login
              </Button>
            </Link>
            </div>
          </div>

          {/* Mobile Dropdown menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-4 bg-transparent shadow-none hover:bg-transparent">
                  <EllipsisVertical className="text-2xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 flex flex-col space-y-2" align="end">
                <DropdownMenuItem>
                    <Link href="/" className="inline-flex items-center space-x-2">
                    <House className="mr-2" />Home
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/" className="flex items-center space-x-2">
                      <ShoppingCart className="mr-2" />Cart
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/signIn" className="inline-flex items-center space-x-2">
                      <UserRound className="mr-2" />Login
                    </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
  );
}