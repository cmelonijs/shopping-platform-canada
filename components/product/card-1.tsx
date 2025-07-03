import Image from "next/image";
import product1 from "@/assets/images/sample-products/p1-1.jpg";
import { Star } from "lucide-react";

export default function ProductCard() {
  return (
    <div className="rounded-lg border-gray-200 border shadow-md p-4 max-w-sm flex flex-col">
        <Image
          src={product1}
          alt="product image"
          width={280}
          height={280}
        />
        <div className="flex flex-col justify-between flex-1 mt-4">
          <h2 className="text-lg font-semibold">Polo</h2>
          <p className="text-gray-600">€140.00</p>
          <p className="text-gray-500">Made from breathable cotton with a tailored fit—perfect for casual or smart-casual looks.</p>
        </div>
        <div className="flex items-center mt-2">
          <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
          <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
          <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
          <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
          <Star className="text-gray-300 w-4 h-4 " />
          <div className="ml-2 text-gray-500">4.0</div>
        </div>
    </div>
  );
}