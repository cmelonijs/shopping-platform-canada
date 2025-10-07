import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EllipsisVertical, Home, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme";
import UserButton from "./user-button";
import { auth } from "@/auth";

const Menu = async () => {
  const session = await auth();


  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start p-2">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <UserButton />
            <SheetClose asChild>
              <Button asChild variant="outline">
                <Link href="/">
                  <Home /> Home
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="outline">
                <Link href="/cart">
                  <ShoppingCart /> Cart
                </Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
