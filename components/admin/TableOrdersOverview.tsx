
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getAllOrders } from "@/lib/actions/admin.actions";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function TableOrdersOverview() {
  const orders = await getAllOrders();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=" text-center">BUYER</TableHead>
          <TableHead className=" text-center">DATE</TableHead>
          <TableHead className=" text-center">TOTAL</TableHead>
          <TableHead className=" text-center">ACTION</TableHead>
        </TableRow>
      </TableHeader>
       <TableBody>
        {orders
        .slice(0,5)
          .map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.user?.name}</TableCell>
              <TableCell>{formatDate(order.createdAt)}
              </TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}
              </TableCell>
              <TableCell>
                <Link href={`/order/${order.id}`}>
                <Button variant={"link"}>Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody> 
    </Table>
  );
}
