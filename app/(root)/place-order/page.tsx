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

export default async function placeOrderpage() {
  const address = await getAddress();
  const PaymentMethod = await getPaymentMethod();
  const mycart = await getMyCart();

  return (
    <>
      <BreadcrumbBoard step="order" />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="flex flex-col">
            <div className="w-full max-w-max mx-auto p-6s min-h-screen">
              <h1 className="text-3xl font-bold mb-3">Place Order</h1>
              <p className="text-sm text-muted-foreground mb-2">
                Review your order and confirm
              </p>
              <div className="grid grid-1 md:grid-cols-3 gap-4 ">
                <div className="col-span-1 md:col-span-2 overflow-x-auto space-y-6">
                  <Card className="p-6 mt-3">
                    <h2 className="text-2xl font-semibold mb-4">
                      Shipping Address
                    </h2>
                    <CardContent className="space-y-3 grid grid-cols-2 gap-x-4 ">
                      {address ? (
                        <>
                          <CardTitle>Name:</CardTitle>
                          <CardDescription> {address.fullName}</CardDescription>
                          <CardTitle>Address: </CardTitle>
                          <CardDescription>{address.address}</CardDescription>
                          <CardTitle>City: </CardTitle>
                          <CardDescription>{address.city}</CardDescription>
                          <CardTitle>Postal:</CardTitle>
                          <CardDescription>
                            {address.postalCode}
                          </CardDescription>
                          <CardTitle>Country:</CardTitle>
                          <CardDescription>{address.country}</CardDescription>
                        </>
                      ) : (
                        <p>No shipping address found.</p>
                      )}
                      <Link href="/shipping-address">
                        <Button variant="secondary">Edit</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card className="p-6 mt-4">
                    <h2 className="text-2xl font-semibold mb-4">
                      Payment method
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
                        <p> No Payment Method found.</p>
                      )}
                      <Link href="/payment-method">
                        <Button variant="secondary">Edit</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <div className="overflow-x-auto ">
                    <Table className="col-span-1 md:col-span-2 text-center">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead></TableHead>
                          <TableHead className="text-center">
                            Quantity
                          </TableHead>
                          <TableHead className="text-center">Price</TableHead>
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
                    <h2 className="text-2xl font-semibold mb-4">Total</h2>
                    <CardContent className="space-y-4 grid grid-cols-2 gap-x-4">
                      {mycart ? (
                        <>
                          <CardTitle>Items:</CardTitle>
                          <CardDescription>
                            {formatCurrency(mycart.itemsPrice)}
                          </CardDescription>
                          <CardTitle>Tax price: </CardTitle>
                          <CardDescription>
                            {formatCurrency(mycart.taxPrice)}
                          </CardDescription>
                          <CardTitle>Shipping: </CardTitle>
                          <CardDescription>
                            {formatCurrency(mycart.ShippingPrice)}
                          </CardDescription>
                          <CardTitle>Total price:</CardTitle>
                          <CardDescription>
                            {formatCurrency(mycart.totalPrice)}
                          </CardDescription>
                        </>
                      ) : (
                        <p>Cart empty.</p>
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
