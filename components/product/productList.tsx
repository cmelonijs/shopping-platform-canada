import { Product } from "@/types";
import ProductCard from "./productCard";
import { getLatestProducts } from "@/lib/actions/products.actions";
import Link from "next/link";

export default async function ProductList() {
  const products: Product[] = await getLatestProducts();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Newest Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <Link
            href={`/product/${product.slug}`}
            className="no-underline"
            key={product.slug}
          >
            <ProductCard key={product.slug} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
