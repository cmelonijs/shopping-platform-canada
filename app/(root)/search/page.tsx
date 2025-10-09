// app/search/page.tsx
import { getAllCategories, getFilteredProducts } from "@/lib/actions/products.actions"
import Link from "next/link";
import FilteredProducts from "./filteredProduct";
import { buildQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function SearchPage({ searchParams }: { searchParams: any }) {
    const categories = await getAllCategories();

    const products = await getFilteredProducts({
        category: searchParams.category,
        price: searchParams.price,
        rating: searchParams.rating,
        sort: searchParams.sort,
        page: searchParams.page,
    });

    return (
        <main className="min-h-screen p-6 md:p-10 flex flex-col md:flex-row gap-4">

            <section className="w-full md:max-w-xs flex flex-col gap-6">
                <div>
                    <h1 className="text-lg font-semibold mb-2">Categories</h1>
                    <div className="flex flex-col gap-2">
                        {categories.map((cat) => (
                            <Link
                                key={cat.category}
                                href={{ pathname: "/search", query: buildQuery(searchParams, { category: cat.category }) }}
                                className={searchParams.category === cat.category ? "font-bold" : ""}
                            >
                                {cat.category}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-lg font-semibold mb-2">Price</h1>
                    <div className="flex flex-col gap-2">
                        <Link
                            href={{ pathname: "/search", query: buildQuery(searchParams, { price: "1-50" }) }}
                            className={searchParams.price === "1-50" ? "font-bold" : ""}
                        >
                            1 € to 50 €
                        </Link>
                        <Link
                            href={{ pathname: "/search", query: buildQuery(searchParams, { price: "51-100" }) }}
                            className={searchParams.price === "51-100" ? "font-bold" : ""}
                        >
                            51 € to 100 €
                        </Link>
                        <Link
                            href={{ pathname: "/search", query: buildQuery(searchParams, { price: "101-200" }) }}
                            className={searchParams.price === "101-200" ? "font-bold" : ""}
                        >
                            101 € to 200 €
                        </Link>
                        <Link
                            href={{ pathname: "/search", query: buildQuery(searchParams, { price: "501-1000" }) }}
                            className={searchParams.price === "501-1000" ? "font-bold" : ""}
                        >
                            501 € to 1000 €
                        </Link>
                    </div>
                </div>
                <h1 className="text-lg font-semibold mb-2">Customer Ratings</h1>
                <div>
                    <h1 className="text-lg font-semibold mb-2">Customer Ratings</h1>
                    <div className="flex flex-col gap-2">
                        {["4", "3", "2", "1"].map((value) => (
                            <Link
                                key={value}
                                href={{ pathname: "/search", query: buildQuery(searchParams, { rating: value }) }}
                                className={searchParams.rating === value ? "font-bold" : ""}
                            >
                                {value} stars & up
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Link href="/search">
                            <Button variant="outline">Clear Filter</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="flex-1">
                <h1 className="text-lg font-semibold mb-4">Filterd products</h1>
                <FilteredProducts products={products} />
            </section>
        </main>

    );
}
