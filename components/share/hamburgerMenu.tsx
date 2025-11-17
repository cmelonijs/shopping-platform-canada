"use client";
import * as React from "react";
import { AlignLeft } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HamburgerMenuClient({
  categories,
}: {
  categories: { category: string; count: number }[];
}) {
  const t= useTranslations('hamb')
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <AlignLeft />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-row justify-between ">
          <DrawerTitle>{t("category")}</DrawerTitle>
          <DrawerTitle>{t("articles")}</DrawerTitle>
        </DrawerHeader>
        <DrawerClose asChild>
          <div className="space-y-2 px-2">
            {categories.map((cat) => (
              <Link
                key={cat.category}
                href={`/search?category=${encodeURIComponent(cat.category)}`}
                onClick={() => setOpen(false)}
                className="flex justify-between items-center px-4 py-2 hover:bg-muted rounded-md"
              >
                <span>{cat.category}</span>
                <span className="text-sm text-muted-foreground">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
