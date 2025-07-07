import Image from "next/image";
import { Star } from "lucide-react";
import ProductPrice from "./ProductPrice";
import { Product } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-lg border-gray-200 border shadow-md p-4 max-w-sm flex flex-col items-start">
      <Image
        src={product.images[0]}
        alt="product image"
        width={280}
        height={280}
        className="self-center"
      />
      <div className="flex flex-col justify-between flex-1 mt-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <div className="flex-between gap-4">
          {product.stock > 0 ? (
            <ProductPrice value={product.price} />
          ) : (
            <p className="text-destructive">Out of stock</p>
          )}
        </div>
        <p className="text-gray-500">{product.description}</p>
      </div>

      {/* HARDCODED VALUE */}
      <div className="flex items-center mt-2">
        <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
        <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
        <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
        <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
        <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
        <div className="ml-2 text-gray-500">5.0</div>
      </div>
    </div>
  );
}
