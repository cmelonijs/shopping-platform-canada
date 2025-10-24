"use client";

import { useState } from "react";
import { ChevronDownIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RatingDropdownProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export function RatingDropdown({
  value,
  onChange,
  disabled = false,
}: RatingDropdownProps) {
  const [internalRating, setInternalRating] = useState(1);
  const currentRating = value ?? internalRating;

  const handleRatingChange = (rating: number) => {
    if (onChange) {
      onChange(rating);
    } else {
      setInternalRating(rating);
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4" />
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between gap-2"
          disabled={disabled}
        >
          <div className="flex items-center gap-1">
            <span className="font-medium">{currentRating}</span>
            <Star />
          </div>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {[1, 2, 3, 4, 5].map((rating) => (
          <DropdownMenuItem
            key={rating}
            onClick={() => handleRatingChange(rating)}
            className="cursor-pointer gap-2"
          >
            <span className="font-medium">{rating}</span>
            <div className="flex gap-0.5">{renderStars(rating)}</div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
