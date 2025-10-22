"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [q, setQ] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);

    const currentPath = window.location.pathname;
    window.location.href = `${currentPath}?${params.toString()}`;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setQ("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onKeyDown}
        className="min-w-[220px]"
        aria-label="Search query"
      />
    </div>
  );
}
