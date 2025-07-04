import ProductCard from "./productCard";

export default function ProductList() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Newest Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {[].map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}
