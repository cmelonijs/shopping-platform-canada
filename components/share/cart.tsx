import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Cart() {
  return (
    <Button variant="outline" size="sm" className="p-4 shadow-none">
        <ShoppingCart className="mr-2" />
        Cart
    </Button>
  );
}