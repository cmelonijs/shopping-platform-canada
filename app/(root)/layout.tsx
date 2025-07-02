import { Button } from "@/components/ui/button";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";


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
              <RxHamburgerMenu className="text-2xl text-black" />
            </Button>
            <span className="text-3xl font-bold text-">SimpleShop</span>
          </div>

          {/* Button */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="p-4">
              <FaShoppingCart className="mr-2" />
              Cart
            </Button>

            <Button variant="outline" size="sm" className="p-4">
              <FaRegUser className="mr-2" />
                Login
            </Button>
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
