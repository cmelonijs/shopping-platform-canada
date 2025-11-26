import Menu from "./menu";
import { getAllCategoriesWithCount } from "@/lib/actions/products.actions";
import HamburgerMenu from "./hamburgerMenu";
import SearchBar from "./searchBarUser";
import LocaleSwitcher from "./LocaleSwitcher";
import LogoBrand from "./logoBrand";

export default async function Header() {
  const categories = await getAllCategoriesWithCount();
  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-6 flex justify-between items-center py-3">
        {/* Left Side */}
        <div className="flex items-center">
          <HamburgerMenu categories={categories} />
          <LogoBrand/>
        </div>
        <div className="flex gap-2 items-center">
          <div className="hidden lg:flex gap-2">
            <SearchBar categories={categories} />
          </div>
          <Menu />
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}
