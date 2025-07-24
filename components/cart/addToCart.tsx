"use client";

import { Loader2Icon, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CartItem } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addItemToCart, removeItemFormCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

interface AddToCartButtonProps {
  cartItem: CartItem;
  currentQuantity?: number;
}

export default function AddToCartButton({ cartItem, currentQuantity = 0 }: AddToCartButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Handle add to cart
  const handleAddToCart = async () => {
    startTransition(async () => {
      const result = await addItemToCart(cartItem);
      
      if (result.success) {
        toast.success("Product added to cart", {
          description: result.message,
          action: {
            label: "View Cart",
            onClick: () => router.push("/cart")
          }
        });
      }
      else {
        toast.error("Error", {
          description: result.message
        });
      }
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const result = await removeItemFormCart(cartItem.productId);
      
      if (result.success) {
        toast.success("Item updated", {
          description: result.message
        });
      }
      else {
        toast.error("Error", {
          description: result.message
        });
      }
    });
  };

  // If no items in cart, show Add to Cart button
  if (currentQuantity === 0) {
    return (
      <div className="w-full">
        <Button 
          variant="default" 
          className="w-1/2" 
          onClick={handleAddToCart}
          disabled={isPending}
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : "Add to Cart"}
        </Button>
      </div>
    );
  }

  // If items in cart, show quantity controls
  return (
    <div className="flex items-center space-x-3">
      {/* Decrease quantity button */}
      <Button
        onClick={handleRemoveFromCart}
        disabled={isPending || currentQuantity <= 0}
        className="text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 w-10 h-10"
      >
        <Minus className="text-gray-700 w-4 h-4" />
      </Button>

      {/* Current quantity display */}
      <span className="px-4 text-black font-medium min-w-[2rem] text-center">
        {currentQuantity}
      </span>

      {/* Increase quantity button */}
      <Button
        onClick={handleAddToCart}
        disabled={isPending}
        className="text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 w-10 h-10"
      >
        <Plus className="text-gray-700 w-4 h-4" />
      </Button>
    </div>
  );
}