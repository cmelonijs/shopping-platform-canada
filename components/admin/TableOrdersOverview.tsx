
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getAllOrders } from "@/lib/actions/administration.actions";
import { formatCurrency, formatDate } from "@/lib/utils";

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
          .filter((order) => order.isPaid) 
          .map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.user?.name}</TableCell>
              <TableCell>{formatDate(order.createdAt)}
              </TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}
              </TableCell>
              <TableCell>
                <Button variant={"link"}>Details</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody> 
    </Table>
  );
}
