import ProductList from "@/components/product/productList";

export default function Homepage() {
  return (
    <div className="flex flex-col h-full p-4 container w-full mx-auto">
      <ProductList />
    </div>
  );
}
