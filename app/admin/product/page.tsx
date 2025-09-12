//product-admin page
'use client'
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ProductAdminPage() {
    return (

        <div className="container mx-auto px-3 py-3">
            <div className="flex justify-between items-center mb-4 px-3">
                <h1 className="font-bold text-xl">Product</h1>
                <Button className="bg-gray-800 text-white px-4 py-2 rounded">
                    Add Product
                </Button>
            </div>
            <div className="w-full h-full px-3 pb-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>€120</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>In Stock</TableCell>
                            <TableCell>4.5</TableCell>
                            <TableCell className="flex gap-2">
                                <Button className="bg-gray-200 text-black px-3 py-1 rounded text-sm hover:bg-gray-300">
                                    Edit
                                </Button>
                                <Button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </div>
        </div>
    );
}