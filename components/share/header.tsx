"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AlignLeft, EllipsisVertical, ShoppingCart, UserRound, LogOut, History, House } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./theme";
import logo from "@/assets/images/logo.png";

export default function Header() {
  const { data: session, status } = useSession();
  const initials = session?.user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="w-full border-b bg-background">
      <div className="container mx-auto px-3 flex justify-between items-center py-3">
        {/*Left side header*/}
        <div className="flex items-center">
          <Button variant="ghost" size="lg" className="p-3 shadow-none">
            <AlignLeft className="text-lg scale-150 md:text-2xl" />
          </Button>
          <Link href="/" className="flex items-center ml-2">
            <Image src={logo} alt="Logo"  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"/>
            <span className="ml-2 text-2xl font-bold font-bebas tracking-logo md:text-4xl">
              SimpleShop
            </span>
          </Link>
        </div>
        

        {/*Right side header*/}
        <div className="items-center space-x-4 hidden md:flex">
          <ModeToggle />

          <Link href="/">
            <Button variant="outline" size="sm" className="p-4 shadow-none">
              <ShoppingCart className="mr-2" />
              Cart
            </Button>
          </Link>

          {status === "loading" ? (
            <span>Loading...</span>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center p-2 w-10 h-10 rounded-full bg-orange-400 hover:bg-orange-300 transition-colors">
                  {initials}
                </div>
      
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-2">
                <DropdownMenuItem>
                  <Link href="/" className="flex items-center">
                    <UserRound className="mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/" className="flex items-center">
                    <History className="mr-2" />
                    Order History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <Button variant="default" size="sm" className="p-4 shadow-none">
                <UserRound className="mr-2" />
                Login
              </Button>
            </Link>
          )}

        </div>

        {/* Mobile Dropdown menu */}
        <div className="flex items-center space-x-2 md:hidden">
          <ModeToggle/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-4 bg-transparent shadow-none hover:bg-transparent"
              >
                <EllipsisVertical className="text-2xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="p-2 flex flex-col space-y-2"
              align="end"
            >
              {/* Always show Home */}
              <DropdownMenuItem>
                <Link href="/" className="inline-flex items-center space-x-2">
                  <House className="mr-2" /> Home
                </Link>
              </DropdownMenuItem>

              {/* Always show Cart */}
              <DropdownMenuItem>
                <Link href="/" className="inline-flex items-center space-x-2">
                  <ShoppingCart className="mr-2" /> Cart
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              {/* User section */}
              {status === "loading" ? (
                <DropdownMenuItem>
                  <span>Loading…</span>
                </DropdownMenuItem>
              ) : session ? (
                <>
                  <DropdownMenuItem>
                    <Link
                      href="/"
                      className="inline-flex items-center space-x-2"
                    >
                      <UserRound className="mr-2" /> Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link
                      href="/"
                      className="inline-flex items-center space-x-2"
                    >
                      <History className="mr-2" /> Order History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => signOut({ callbackUrl: "/" })}
                  >
                    <div className="inline-flex items-center space-x-2">
                      <LogOut className="mr-2" /> Sign Out
                    </div>
                  </DropdownMenuItem>
                </>
              ) : (
                
                <DropdownMenuItem>
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center space-x-2"
                  >
                    <UserRound className="mr-2" /> Login
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </div>
  );
}
