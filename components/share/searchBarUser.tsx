"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  categories,
}: {
  categories: { category: string; count: number }[];
}) {
  const [selected, setSelected] = useState("all");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (selected !== "all") params.set("category", selected);
    if (searchText.trim()) params.set("q", searchText.trim());
    router.push(`/search?${params.toString()}`);
    setSearchText("");
    setSelected("all");
  };

  return (
    <div className="flex items-center space-x-0">
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="bg-gray-100  dark:bg-input/100 rounded-none rounded-l-md border-r-0 text-sm">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.category} value={cat.category}>
              {cat.category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative">
        <Input
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="rounded-none rounded-r-md border-l-0 pr-10"
        />
        <Button
          onClick={handleSubmit}
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 px-2 h-7"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
