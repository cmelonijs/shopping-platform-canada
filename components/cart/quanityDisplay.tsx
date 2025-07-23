"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/types";

interface QuantityDisplayProps {
    product: Product;
}

export default function QuanityDisplay({ product }: QuantityDisplayProps) {
    return (
        <div className="flex items-center space-x-2">
            <Button 
                className="text-sm bg-gray-200 hover:bg-gray-200"
                onClick={() => {}}
            >
                <Minus className="text-gray-700" />
            </Button>
            <span className="px-4 text-black">1</span>
            <Button 
                className="text-sm bg-gray-200 hover:bg-gray-200"
                onClick={() => {}}
            >
                <Plus className="text-gray-700" />
            </Button>
        </div>
    );
}