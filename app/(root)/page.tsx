import ProductList from "@/components/product/productList";
import BrandPolicy from "@/components/share/brandPolicy";
import DealOfTheMonth from "@/components/share/dealOftheMonth";

export default function Homepage() {
  return (
    <div className="flex flex-col h-full p-6 container w-full mx-auto gap-6">
      <ProductList />
      <DealOfTheMonth
        images={"/images/sample-products/p1-1.png"}
        product={{ slug: "polo-ralph-lauren-oxford-shirt" }}
      />
      <BrandPolicy />
    </div>
  );
}
