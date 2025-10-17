import ClearSearchBar from "@/components/admin/ClearSearchBar";
import DeleteButton from "@/components/admin/DeleteButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteOrdertById, getAllOrders } from "@/lib/actions/admin.actions";
import { formatCurrency, formatDate, formatId } from "@/lib/utils";
import Link from "next/link";

export default async function OrdersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const q = sp?.q;
  const orders = await getAllOrders(q);

  return (
    <div className="container mx-auto px-3 py-3">
      <div className="sm:col-col-1 md:flex justify-between items-center mb-4 px-3">
        <div className="flex items-center gap-4 ">
          <h1 className="font-bold text-xl">Orders</h1>
          <ClearSearchBar path="/admin/orders" query={q} />
        </div>
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
                <TableCell title={order.id}>{formatId(order.id)}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.user?.name}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-md ${
                      order.isPaid ? "bg-green-600/50" : "bg-red-600/50"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Not paid"}
                  </span>
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDate(order.deliveredAt)
                    : "Not delivered"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Link href={`/order/${order.id}`}>
                    <Button variant="outline">Details</Button>
                  </Link>
                  <DeleteButton
                    action={deleteOrdertById}
                    itemId={order.id}
                    itemType="orderId"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
