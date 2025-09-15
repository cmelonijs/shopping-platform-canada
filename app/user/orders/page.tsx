import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllMyOrders } from "@/lib/actions/order.actions";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default async function TotalOrdersPage() {
  const orders = await getAllMyOrders();

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">My Orders</h1>
      {!orders || orders.length === 0 ? (
        <div className="text-center">No orders found</div>
      ) : (
        <div>
          {/* Mobile Card Layout */}
          <div className="block md:hidden space-y-3">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm">
                      ..{order.id.slice(-6)}
                    </CardTitle>
                    <span className="font-semibold">
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payment:</span>
                      <p>{order.isPaid ? "Paid" : "Unpaid"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p>{order.isDelivered ? "Delivered" : "Pending"}</p>
                    </div>
                  </div>
                  <Link
                    href={`/order/${order.id}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block">
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="h-16">
                    <TableCell className="font-medium">
                      ..{order.id.slice(-6)}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                    <TableCell>{order.isPaid ? "Paid" : "Unpaid"}</TableCell>
                    <TableCell>
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/order/${order.id}`}
                        className="hover:underline"
                      >
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
