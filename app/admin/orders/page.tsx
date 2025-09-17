
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders } from "@/lib/actions/order.actions";
import { formatCurrency } from "@/lib/utils";

export default async function OrdersAdminPage() {
  const orders = await getAllOrders();

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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell title={order.id}>{"..." + order.id.slice(-4)}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString("it-IT", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</TableCell>
                <TableCell>{order.user?.name}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>{order.isPaid ? "Paid" : "Not paid"}</TableCell>
                <TableCell>{order.isDelivered && order.deliveredAt
                  ? new Date(order.deliveredAt).toLocaleDateString("it-IT")
                  : "Not delivered"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button className="bg-gray-200 text-black px-3 py-1 rounded text-sm hover:bg-gray-300">
                    Details
                  </Button>
                  <Button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
