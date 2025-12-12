import { getOrderById } from "@/lib/actions/order.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import MarkAsPaidButton from "@/components/order/paidButton";
import MarkAsDeliveredButton from "@/components/order/deliveredButton";
import { getTranslations } from "next-intl/server";
import Checkout from "@/components/share/checkout";
import { auth } from "@/auth";

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const t= await getTranslations('order')
  const { id } = await params;

  const orderData = await getOrderById(id);
  console.log(orderData);

  if (!orderData.success || !orderData.order) {
    return (
      <div className="mx-auto w-full max-w-7xl p-6 h-screen">
        Error: {orderData.message || "Order not found"}
      </div>
    );
  }

  const { order, userAddress } = orderData;
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="flex flex-col">
          <div className="w-full max-w-max mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">
              {t("yourOrderTitle")}
              {order.isPaid && (
                <span className="ml-4 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  {t("paidStatus")}
                </span>
              )}
              {order.isDelivered && (
                <span className="ml-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  {t("deliveredStatus")}
                </span>
              )}
            </h1>
            <div className="grid grid-1 md:grid-cols-3 gap-5 ">
              <div className="col-span-1 md:col-span-2 overflow-x-auto space-y-4">
                <Card className="p-6 mt-3">
                  <h2 className="text-2xl font-semibold mb-4">
                    {t("shippingTitle")}
                  </h2>
                  <CardContent className="space-y-4 grid grid-cols-2 gap-x-4 ">
                    {userAddress ? (
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <CardTitle>{t("name")}:</CardTitle>
                        <CardDescription>
                          {" "}
                          {userAddress.fullName}
                        </CardDescription>
                        <CardTitle>{t("address")}: </CardTitle>
                        <CardDescription>{userAddress.address}</CardDescription>
                        <CardTitle>{t("city")}: </CardTitle>
                        <CardDescription>{userAddress.city}</CardDescription>
                        <CardTitle>{t("postal")}:</CardTitle>
                        <CardDescription>
                          {userAddress.postalCode}
                        </CardDescription>
                        <CardTitle>{t("country")}:</CardTitle>
                        <CardDescription>{userAddress.country}</CardDescription>

                        <CardTitle>{t("deliveryStatus")}:</CardTitle>
                        <CardDescription>
                          <div className="space-y-1">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${order.isDelivered
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                }`}
                            >
                              {order.isDelivered
                                ? t("delivered")
                                : t("notDelivered")}
                            </span>

                            {order.deliveredAt && (
                              <span>{formatDate(order.deliveredAt)}</span>
                            )}
                          </div>
                        </CardDescription>
                      </div>
                    ) : (
                      <CardDescription>
                        {t("infoDelivery")}
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
                <Card className="p-6 mt-4">
                  <h2 className="text-2xl font-semibold mb-4">
                    {t("paymentMethod")}
                  </h2>
                  <CardContent className="space-y-4 grid grid-cols-2 gap-x-4">
                    <CardTitle>{t("paymentMethod")}:</CardTitle>
                    <CardDescription>{order.paymentMethod}</CardDescription>
                    <CardTitle>{t("paymentStatus")}:</CardTitle>
                    <CardDescription>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.isPaid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {order.isPaid ? t("paid") : t("notPaid")}
                      </span>
                      {order.paidAt && <span>{formatDate(order.paidAt)}</span>}
                    </CardDescription>
                  </CardContent>
                </Card>
                <Table className="col-span-1 md:col-span-2 overflows-x-auto p-4 ">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("table.product")}</TableHead>
                      <TableHead>{t("table.quantity")}</TableHead>
                      <TableHead>{t("table.price")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.orderItems.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell className="flex items-center gap-2">
                          <Link href={`/product/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="h-full w-full object-cover md:w-32 cursor-pointer hover:opacity-95 transition-opacity"
                            />
                          </Link>
                          {item.name}
                        </TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell>{formatCurrency(item.price)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div>
                <Card className="p-6 mt-4 h-auto">
                  <h2 className="text-2xl font-semibold mb-4">{t("mycart")}</h2>
                  <CardContent className="p-0 space-y-4 grid grid-cols-2 gap-x-4">
                    <CardTitle>{t("items")}:</CardTitle>
                    <CardDescription>
                      {" "}
                      {formatCurrency(order.itemsPrice)}
                    </CardDescription>
                    <CardTitle>{t("tax")}: </CardTitle>
                    <CardDescription>
                      {formatCurrency(order.taxPrice)}
                    </CardDescription>
                    <CardTitle>{t("shipping")}: </CardTitle>
                    <CardDescription>
                      {formatCurrency(order.shippingPrice)}
                    </CardDescription>
                    <CardTitle>{t("total")}:</CardTitle>
                    <CardDescription>
                      {formatCurrency(order.totalPrice)}
                    </CardDescription>
                    <div id="checkout" className="col-span-2 w-full">
                      {order.paymentMethod === "Stripe" && !order.isPaid && (
                        <Checkout orderId={order.id} />
                      )}
                    </div>
                    <div className="col-span-2 pt-2">
                      {session?.user && "role" in session.user && session.user.role === "admin" && (
                        <>
                          {!order.isPaid && <MarkAsPaidButton orderId={order.id} />}
                          {!order.isDelivered && order.isPaid && (
                            <MarkAsDeliveredButton orderId={order.id} />
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
