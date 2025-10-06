import { getAllCategoriesWithCount } from "@/lib/actions/products.actions";
import HamburgerMenuClient from "./hamburgerMenuClient";

export default async function HamburgerMenu() {
  const categories = await getAllCategoriesWithCount();
  return <HamburgerMenuClient categories={categories} />;}
