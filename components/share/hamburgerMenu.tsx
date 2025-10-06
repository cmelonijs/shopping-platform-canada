
import { AlignLeft } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategoriesWithCount } from "@/lib/actions/products.actions";

export default async function HamburgerMenu() {
    const categories =await getAllCategoriesWithCount();
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <AlignLeft />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Category</DrawerTitle>
        </DrawerHeader>
        {categories.map(cat => (
          <div key={cat.category} className="flex justify-between items-center px-4 py-2 hover:bg-muted rounded-md">
            <span>{cat.category}</span>
            <span className="text-sm text-muted-foreground">{cat.count}</span>
          </div>
        ))}
      </DrawerContent>
    </Drawer>
  );
}
