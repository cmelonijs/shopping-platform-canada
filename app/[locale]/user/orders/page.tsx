export const dynamic = "force-dynamic";

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
import { getTranslations } from "next-intl/server";

export default async function TotalOrdersPage() {
  const t= await getTranslations('order')
  const orders = await getAllMyOrders();

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{t("myOrder")}</h1>
      {!orders || orders.length === 0 ? (
        <div className="text-center">{t("noOrder")}</div>
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
                      <span className="text-muted-foreground">{t("date")}:</span>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t("payment")}:</span>
                      <p>{order.isPaid ? "Paid" : "Unpaid"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t("orderStatus")}:</span>
                      <p>{order.isDelivered ? "Delivered" : "Pending"}</p>
                    </div>
                  </div>
                  <Link
                    href={`/order/${order.id}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    {t("detail")}
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
                  <TableHead>{t("id")}</TableHead>
                  <TableHead>{t("date")}</TableHead>
                  <TableHead>{t("total")}</TableHead>
                  <TableHead>{t("paid")}</TableHead>
                  <TableHead>{t("delivered")}</TableHead>
                  <TableHead>{t("action")}</TableHead>
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
                    <TableCell>{order.isPaid ? t("paid") : t("notPaid")}</TableCell>
                    <TableCell>
                      {order.isDelivered ? t("delivered") : t("pending")}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/order/${order.id}`}
                        className="hover:underline"
                      >
                        {t("detail")}
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
