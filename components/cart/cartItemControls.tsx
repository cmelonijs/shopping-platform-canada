"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, Loader } from "lucide-react";
import { addItemToCart, removeItemFormCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { useTransition } from "react";
import { CartItem } from "@/types";



export default function CartItemControls({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();

  const handleIncreaseQuantity = () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      
      toast.success(res.message);
    });
  };

  const handleDecreaseQuantity = () => {
    startTransition(async () => {
      const res = await removeItemFormCart(item.productId);
      
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      
      toast.success(res.message);
    });
  };

  return (
    <>
      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleDecreaseQuantity}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </Button>
        <span className="w-8 text-center">{item.qty}</span>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleIncreaseQuantity}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </>
  );
}