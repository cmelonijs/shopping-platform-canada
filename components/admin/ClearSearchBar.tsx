"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ClearSearchBar({
  path,
  query,
}: {
  path: string;
  query?: string;
}) {
  const router = useRouter();

  if (!query) return null;

  return (
    <div className="text-sm text-gray-600 italic flex items-center gap-2">
      Filtered By <span className="font-medium">"{query}"</span>
      <Button variant="secondary" size="sm" onClick={() => router.push(path)}>
        Clear
      </Button>
    </div>
  );
}
