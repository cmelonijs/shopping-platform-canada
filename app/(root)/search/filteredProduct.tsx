import ProductCard from "@/components/product/productCard";
import { Product } from "@/types";
import Link from "next/link";

export default function FilteredProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          href={`/product/${product.slug}`}
          className="no-underline"
          key={product.slug}
        >
          <ProductCard key={product.id} product={product} />
        </Link>
      ))}
    </div>
  );
}
