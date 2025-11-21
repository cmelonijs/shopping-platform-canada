export const dynamic = "force-dynamic";

import BreadcrumbBoard from "@/components/share/breadcrumbBoard";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getAddress } from "@/lib/actions/address.actions";
import { getPaymentMethod } from "@/lib/actions/payment.actions";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Button } from "@/components/ui/button";
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
import PlaceOrderButton from "@/components/share/placeOrderButton";
import { formatCurrency } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function placeOrderpage() {
  const t = await getTranslations('order')
  const address = await getAddress();
  const PaymentMethod = await getPaymentMethod();
  const mycart = await getMyCart();

  return (
    <>
      <BreadcrumbBoard step="order" />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="flex flex-col">
            <div className="w-full max-w-max mx-auto p-6s min-h-screen p-4">
              <h1 className="text-3xl font-bold mb-3">{t("title")}</h1>
              <p className="text-sm text-muted-foreground mb-2">
                {t("subtitle")}
              </p>
              <div className="grid grid-1 md:grid-cols-3 gap-4 ">
                <div className="col-span-1 md:col-span-2 overflow-x-auto space-y-6">
                  <Card className="p-6 mt-3">
                    <h2 className="text-2xl font-semibold mb-4">
                      {t("shippingTitle")}
                    </h2>
                    <CardContent className="space-y-3 grid grid-cols-2 gap-x-4 ">
                      {address ? (
                        <>
                          <CardTitle>{t("name")}:</CardTitle>
                          <CardDescription> {address.fullName}</CardDescription>
                          <CardTitle>{t("address")}: </CardTitle>
                          <CardDescription>{address.address}</CardDescription>
                          <CardTitle>{t("city")}:</CardTitle>
                          <CardDescription>{address.city}</CardDescription>
                          <CardTitle>{t("postal")}:</CardTitle>
                          <CardDescription>
                            {address.postalCode}
                          </CardDescription>
                          <CardTitle>{t("country")}:</CardTitle>
                          <CardDescription>{address.country}</CardDescription>
                        </>
                      ) : (
                        <p>{t("noShipping")}</p>
                      )}
                      <Link href="/shipping-address">
                        <Button variant="secondary">{t("edit")}</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card className="p-6 mt-4">
                    <h2 className="text-2xl font-semibold mb-4">
                      {t("paymentTitle")}
                    </h2>
                    <CardContent className="space-y-4 grid grid-cols-2 gap-x-4">
                      {PaymentMethod ? (
                        <>
                          <CardDescription>
                            {" "}
                            {PaymentMethod.paymentMethod}
                          </CardDescription>
                        </>
                      ) : (
                        <p>{t("noPayment")}</p>
                      )}
                      <Link href="/payment-method">
                        <Button variant="secondary">{t("edit")}</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <div className="overflow-x-auto ">
                    <Table className="col-span-1 md:col-span-2 text-center">
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("table.product")}</TableHead>
                          <TableHead></TableHead>
                          <TableHead className="text-center">
                            {t("table.quantity")}
                          </TableHead>
                          <TableHead className="text-center">{t("table.price")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mycart?.items.map((item) => (
                          <TableRow key={item.productId}>
                            <TableCell>
                              <Link href={`/product/${item.slug}`}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={100}
                                  height={100}
                                  className="flex-block h-full w-full object-cover md:w-32 cursor-pointer hover:opacity-95 transition-opacity"
                                />
                              </Link>
                            </TableCell>
                            <TableCell className="text-left">
                              {item.name}
                            </TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>{formatCurrency(item.price)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div>
                  <Card className="p-6 mt-4 h-auto">
                    <h2 className="text-2xl font-semibold mb-4">{t("summaryTitle")}</h2>
                    <CardContent className="space-y-4 grid grid-cols-2 gap-x-4">
                      {mycart ? (
                        <>
                          <CardTitle>{t("items")}:</CardTitle>
                          <CardDescription>
                            {formatCurrency(mycart.itemsPrice)}
                          </CardDescription>
                          <CardTitle>{t("tax")}: </CardTitle>
                          <CardDescription>
                            {formatCurrency(mycart.taxPrice)}
                          </CardDescription>
                          <CardTitle>{t("shipping")}: </CardTitle>
                          <CardDescription>
                            {formatCurrency(mycart.ShippingPrice)}
                          </CardDescription>
                          <CardTitle>{t("total")}:</CardTitle>
                          <CardDescription>
                            {formatCurrency(mycart.totalPrice)}
                          </CardDescription>
                        </>
                      ) : (
                        <p>{t("emptyCart")}</p>
                      )}
                      <PlaceOrderButton />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
