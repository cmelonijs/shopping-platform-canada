// app/components/SearchBar.tsx
import { getAllCategoriesWithCount } from "@/lib/actions/products.actions";
import SearchBarClient from "./searchBarClient";


export default async function SearchBar() {
  const categories = await getAllCategoriesWithCount();

  return <SearchBarClient categories={categories} />;}