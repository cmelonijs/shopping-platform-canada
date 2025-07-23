"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const router = useRouter();
    const isOutOfStock = product.stock === 0;

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        // Add to cart action 
    };

    return (
        <Button 
            variant="default" 
            className="w-full" 
            disabled={isOutOfStock}
            onClick={() => {
                handleAddToCart();
                toast("Product added to cart", {
                    description: `${product.name} has been added to your cart.`,
                    action: {
                        label: "View Cart",
                        onClick: () => {
                            router.push("/cart");
                        }
                    }
                });
            }}
        >
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
        </Button>
    );
}