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

export default function OrdersAdminPage() {
    return (

        <div className="container mx-auto px-3 py-3">
            <div className="flex justify-between items-center mb-4 px-3">
                <h1 className="font-bold text-xl">Orders</h1>
            </div>
            <div className="w-full h-full px-3 pb-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Order by</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Paid</TableHead>
                            <TableHead>Delivered</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>8-09-2025</TableCell>
                            <TableCell>Leon</TableCell>
                            <TableCell>12$</TableCell>
                            <TableCell>not paid</TableCell>
                            <TableCell>not delivered</TableCell>
                            <TableCell className="flex gap-2">
                                <Button className="bg-gray-200 text-black px-3 py-1 rounded text-sm hover:bg-gray-300">
                                    Details
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