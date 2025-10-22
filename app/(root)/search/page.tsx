// app/search/page.tsx
import {
  getAllCategoriesWithCount,
  getFilteredProducts,
} from "@/lib/actions/products.actions";
import Link from "next/link";
import FilteredProducts from "./filteredProduct";
import { buildQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/share/searchBar";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const categories = await getAllCategoriesWithCount();
  const products = await getFilteredProducts({
    q: params.q,
    category: params.category,
    price: params.price,
    rating: params.rating,
    sort: params.sort,
    page: params.page,
  });
  const activeFilters: { label: string; value: string }[] = [];
  const hasFilters =
    params.q ||
    (params.category && params.category !== "all") ||
    (params.price && params.price !== "all") ||
    (params.rating && params.rating !== "all") ||
    params.sort;

  if (params.category && params.category !== "all") {
    activeFilters.push({ label: "Category", value: params.category });
  }
  if (params.price && params.price !== "all") {
    activeFilters.push({ label: "Price", value: params.price });
  }
  if (params.rating && params.rating !== "all") {
    activeFilters.push({
      label: "Rating",
      value: `${params.rating} stars & up`,
    });
  }
  if (params.sort) {
    const sortLabels: Record<string, string> = {
      newest: "Newest",
      "price-low": "Lower Price",
      "price-high": "Higher Price",
      "rating-high": "Top Rated",
    };
    activeFilters.push({
      label: "Sort",
      value: sortLabels[params.sort] || params.sort,
    });
  }
  if (params.q) {
    activeFilters.push({ label: "Search", value: params.q });
  }

  return (
    <div className="min-h-screen p-6 md:p-10 flex flex-col md:flex-row gap-4">
      <section className="w-full md:max-w-xs flex flex-col gap-6 ">
        <div>
          <h1 className="text-lg font-semibold mb-2">Categories</h1>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.category}
                href={{
                  pathname: "/search",
                  query: buildQuery(params, { category: cat.category }),
                }}
                className={params.category === cat.category ? "font-bold" : ""}
              >
                {cat.category}
              </Link>
            ))}
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { category: "all" }),
              }}
              className={
                !params.category || params.category === "all" ? "font-bold" : ""
              }
            >
              All categories
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-lg font-semibold mb-2">Price</h1>
          <div className="flex flex-col gap-2">
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { price: "1-50" }),
              }}
              className={params.price === "1-50" ? "font-bold" : ""}
            >
              1 € to 50 €
            </Link>
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { price: "51-100" }),
              }}
              className={params.price === "51-100" ? "font-bold" : ""}
            >
              51 € to 100 €
            </Link>
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { price: "101-200" }),
              }}
              className={params.price === "101-200" ? "font-bold" : ""}
            >
              101 € to 200 €
            </Link>
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { price: "501-1000" }),
              }}
              className={params.price === "501-1000" ? "font-bold" : ""}
            >
              501 € to 1000 €
            </Link>
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { price: "all" }),
              }}
              className={
                !params.price || params.price === "all" ? "font-bold" : ""
              }
            >
              All prices
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-lg font-semibold mb-2">Customer Ratings</h1>
          <div className="flex flex-col gap-2">
            {["4", "3", "2", "1"].map((value) => (
              <Link
                key={value}
                href={{
                  pathname: "/search",
                  query: buildQuery(params, { rating: value }),
                }}
                className={params.rating === value ? "font-bold" : ""}
              >
                {value} stars & up
              </Link>
            ))}
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { rating: "all" }),
              }}
              className={
                !params.rating || params.rating === "all" ? "font-bold" : ""
              }
            >
              All ratings
            </Link>
          </div>
          <div className=" flex flex-col gap-4 mt-4 md:hidden">
            <SearchBar categories={categories} />
          </div>
        </div>
      </section>

      <section className="flex-1 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-lg font-semibold">
              {hasFilters ? "Filtered products" : "All products"}
            </h1>
            {activeFilters.length > 0 && (
              <div className="transition-opacity duration-300 opacity-100 flex flex-row items-center gap-2">
                <Link href="/search">
                  <Button>Clear Filter</Button>
                </Link>
                <div className="flex flex-wrap gap-2 text-sm ">
                  {activeFilters.map((filter, index) => (
                    <span key={index} className=" px-2 py-1 rounded  text-xs">
                      {filter.label}:{" "}
                      <span className="font-medium">{filter.value}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { sort: "newest" }),
              }}
              className={params.sort === "newest" ? "font-bold underline" : ""}
            >
              NEWEST
            </Link>
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { sort: "price-low" }),
              }}
              className={
                params.sort === "price-low" ? "font-bold underline" : ""
              }
            >
              LOWER
            </Link>
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { sort: "price-high" }),
              }}
              className={
                params.sort === "price-high" ? "font-bold underline" : ""
              }
            >
              HIGHER
            </Link>
            <Link
              href={{
                pathname: "/search",
                query: buildQuery(params, { sort: "rating-high" }),
              }}
              className={
                params.sort === "rating-high" ? "font-bold underline" : ""
              }
            >
              RATING
            </Link>
          </div>
        </div>
        {products.length > 0 ? (
          <FilteredProducts products={products} />
        ) : (
          <div className=" text-sm mt-10 text-red-600">
            No products found with the selected filters.
          </div>
        )}
      </section>
    </div>
  );
}
