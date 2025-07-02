import { Button } from "@/components/ui/button";
import { AlignLeft, EllipsisVertical} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Cart  from "@/components/share/cart";
import Login from "@/components/share/login";
import Home from "@/components/share/home";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="w-full border-b">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size ="sm" className="p-4">
              <AlignLeft className="text-2xl text-black" />
            </Button>
            <span className="text-3xl font-bold text-">SimpleShop</span>
          </div>

          {/* Button */}
          <div className="items-center space-x-4 hidden md:flex">
            <Cart/>

            <Login/>
          </div>

          {/* Mobile Dropdown menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-4 bg-transparent shadow-none hover:bg-transparent">
                  <EllipsisVertical className="text-2xl text-black" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="p-2 flex flex-col space-y-2" align="end">
                  <Home/>
                  <Cart/>
                  <Login/>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {children}

      {/* Footer */}
      <footer className="w-full border-t py-4 text-center text-sm">
        2025 SimpleShop | STORE. All right are reserved.
      </footer>
    </div>
  );
}
